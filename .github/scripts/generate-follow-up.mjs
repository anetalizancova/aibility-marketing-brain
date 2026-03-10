#!/usr/bin/env node

/**
 * Webinar Follow-up Generator
 *
 * Polls aibilitycz/content repo for new transcripts,
 * fetches metadata from Airtable, uses AI to extract key points,
 * generates follow-up email (.md + .html), commits to this repo,
 * and sends a Slack DM.
 *
 * Runs from: anetalizancova/aibility-marketing-brain (GitHub Action)
 * Reads from: aibilitycz/content/prepisy-webinaru-edu/ (GitHub API)
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { basename, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));

const CONTENT_REPO = process.env.CONTENT_REPO || 'aibilitycz/content';
const TRANSCRIPT_DIR = process.env.TRANSCRIPT_DIR || 'prepisy-webinaru-edu';
const PROCESSED_FILE = '.github/scripts/processed-transcripts.json';

const AIRTABLE_BASE_ID = 'apprWm5AZiUAg1SGF';
const AIRTABLE_TABLE_ID = 'tblNKetDg4clKVyrf';
const AIRTABLE_VIEW_ID = 'viwTDjhMOmO7AQAm2';
const FEEDBACK_URL = 'https://airtable.com/apprWm5AZiUAg1SGF/pagKo4kCojw2MqEPE/form';
const DEFAULT_HERO_IMAGE = 'https://img.mailinblue.com/7541826/images/content_library/original/671be011405d49ae3aa8c628.png';

// ── Helpers ──────────────────────────────────────────────────────

function loadProcessed() {
  const fullPath = join(process.cwd(), PROCESSED_FILE);
  if (existsSync(fullPath)) {
    return JSON.parse(readFileSync(fullPath, 'utf-8'));
  }
  return { processed: [] };
}

function saveProcessed(data) {
  const fullPath = join(process.cwd(), PROCESSED_FILE);
  mkdirSync(dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, JSON.stringify(data, null, 2) + '\n');
}

// ── Fetch transcripts from GitHub ────────────────────────────────

async function listTranscripts() {
  const token = process.env.GITHUB_TOKEN;
  const url = `https://api.github.com/repos/${CONTENT_REPO}/contents/${TRANSCRIPT_DIR}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!res.ok) throw new Error(`Failed to list transcripts: ${res.status}`);
  const files = await res.json();
  return files.filter(f => f.name.endsWith('.md')).map(f => f.name);
}

async function downloadTranscript(filename) {
  const token = process.env.GITHUB_TOKEN;
  const url = `https://api.github.com/repos/${CONTENT_REPO}/contents/${TRANSCRIPT_DIR}/${encodeURIComponent(filename)}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3.raw',
    },
  });

  if (!res.ok) throw new Error(`Failed to download transcript: ${res.status}`);
  return await res.text();
}

// ── Filename parsing ─────────────────────────────────────────────

function parseTranscriptFilename(filename) {
  const name = basename(filename, '.md');

  // EDU: "03_Název webináře - DD.MM.YYYY přepis..."
  const eduMatch = name.match(/^03_(.+?)\s*[-–]\s*(\d{1,2})\.(\d{1,2})\.(\d{4})\s/);
  if (eduMatch) {
    return {
      type: 'EDU',
      webinarName: eduMatch[1].trim(),
      day: parseInt(eduMatch[2]),
      month: parseInt(eduMatch[3]),
      year: parseInt(eduMatch[4]),
      get date() { return `${this.day}.${this.month}.${this.year}`; },
      get isoDate() { return `${this.year}-${String(this.month).padStart(2,'0')}-${String(this.day).padStart(2,'0')}`; },
    };
  }

  // AIMS: "AIMS D.M.YYYY přepis..."
  const aimsMatch = name.match(/^AIMS\s+(\d{1,2})\.(\d{1,2})\.(\d{4})\s/);
  if (aimsMatch) {
    return {
      type: 'AIMS',
      webinarName: 'AI Morning Show',
      day: parseInt(aimsMatch[1]),
      month: parseInt(aimsMatch[2]),
      year: parseInt(aimsMatch[3]),
      get date() { return `${this.day}.${this.month}.${this.year}`; },
      get isoDate() { return `${this.year}-${String(this.month).padStart(2,'0')}-${String(this.day).padStart(2,'0')}`; },
    };
  }

  return null;
}

// ── Airtable lookup ──────────────────────────────────────────────

async function findWebinarInAirtable(parsed) {
  const token = process.env.AIRTABLE_TOKEN;
  if (!token) {
    console.warn('  ⚠️  AIRTABLE_TOKEN not set, skipping lookup');
    return null;
  }

  const formula = encodeURIComponent(
    `IS_SAME({Datum a čas}, '${parsed.isoDate}', 'day')`
  );
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}?filterByFormula=${formula}&view=${AIRTABLE_VIEW_ID}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    console.warn(`  ⚠️  Airtable error: ${res.status}`);
    return null;
  }

  const data = await res.json();

  if (data.records.length === 0) {
    const nameFormula = encodeURIComponent(
      `SEARCH("${parsed.webinarName.substring(0, 30)}", {Název})`
    );
    const nameUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}?filterByFormula=${nameFormula}&view=${AIRTABLE_VIEW_ID}`;
    const nameRes = await fetch(nameUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (nameRes.ok) {
      const nameData = await nameRes.json();
      if (nameData.records.length > 0) return nameData.records[0].fields;
    }
    return null;
  }

  return data.records[0].fields;
}

// ── AI processing ────────────────────────────────────────────────

async function extractKeyPointsWithAI(transcript, webinarName) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('OPENROUTER_API_KEY not set');

  const truncated = transcript.length > 80000
    ? transcript.substring(0, 80000) + '\n\n[... přepis zkrácen ...]'
    : transcript;

  const systemPrompt = `Jsi zkušený content marketér pro českou AI vzdělávací společnost Aibility. Píšeš follow-up emaily po webinářích - přátelským, profesionálním tónem. Tykáš čtenářům. Používáš "my" za tým Aibility.`;

  const userPrompt = `Přečti tento přepis webináře "${webinarName}" a vytvoř:

1. **uvodni_text**: Krátký úvodní odstavec (2-3 věty) pro follow-up email. Začni "Díky, že jste s námi strávili čas na webináři **${webinarName}**." a pokračuj krátkým shrnutím, o čem webinář byl.

2. **key_points**: Přesně 4-5 klíčových bodů, které jsme na webináři probrali. Každý bod má:
   - **title**: Krátký nadpis (3-5 slov)
   - **description**: Stručný popis (1-2 věty) co konkrétně jsme probrali

Odpověz POUZE ve formátu JSON:
{
  "uvodni_text": "...",
  "key_points": [
    { "title": "...", "description": "..." },
    ...
  ]
}

PŘEPIS WEBINÁŘE:
${truncated}`;

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'anthropic/claude-sonnet-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenRouter API error: ${res.status} - ${errText}`);
  }

  const data = await res.json();
  const content = data.choices[0].message.content;
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('AI response did not contain valid JSON');

  return JSON.parse(jsonMatch[0]);
}

// ── Generate output files ────────────────────────────────────────

function generateMarkdown(parsed, airtable, aiResult) {
  const yt = airtable?.['Odkaz na záznam'] || 'ODKAZ_NA_ZAZNAM';
  const podcast = airtable?.['Odkaz na podcast'] || 'ODKAZ_NA_PODCAST';
  const materialy = airtable?.['Další materiály'] || 'ODKAZ_NA_MATERIALY';
  const feedback = airtable?.['Form zpětné vazby odkaz'] || FEEDBACK_URL;

  const keyPointsMd = aiResult.key_points
    .map(kp => `**${kp.title}**\n- ${kp.description}`)
    .join('\n\n');

  return `# Follow-up email: ${parsed.webinarName} – ${parsed.date}

## Předmět
Díky, že jste byli u toho! | ${parsed.webinarName} ${parsed.date}

---

## Úvodní text

**Díky, že jste byli u toho!**

${aiResult.uvodni_text}

Pokud jste nestihli všechno nebo si chcete připomenout konkrétní body, tady je vše důležité.

---

## Tlačítko: Záznam z webináře

🎥 **Záznam z webináře najdete tady**
${yt}

---

## Materiály

Abyste se mohli k webináři vracet i jinak než ze záznamu, posíláme vám doplňkové materiály 👉🏻 [Podívat se na materiály](${materialy})

---

## Tlačítko: Podcast

🎧 **Poslechněte si webinář jako podcast**
${podcast}

---

## Co jsme probrali:

${keyPointsMd}

---

## Zpětná vazba

💬 Napište nám, co vás zaujalo – a co byste rádi viděli příště jinak. Tvoříme webináře podle vás a vašich potřeb. 👉 [Zpětná vazba na webinář](${feedback})

---

## AI Edu Stream

**Chcete se naučit využívat AI naplno?**

Pokud vás zajímají naše další webináře a chcete získat superschopnosti s AI, určitě vás rádi uvidíme v **AI Edu Streamu**.

**Co je součástí členství:**
- **2–3 prémiové webináře měsíčně** – kvalitní obsah, top hosté, praktické ukázky
- **Kompletní archiv všech záznamů** – okamžitý přístup ke všem minulým webinářům včetně materiálů a přepisů
- **Exkluzivní komunita v Circle** – diskuze, sdílení zkušeností a networking s profesionály
- **Přímý kontakt s experty** – na akcích i webinářích se můžete ptát těch nejlepších z nejlepších

[**Stát se členem AI Edu Stream**](https://aibility.cz/skoleni/ai-edu-stream/)

---

## Závěr

Budeme se těšit zase příště!

**Tým Aibility**

---

## Footer

Sledujte nás na [LinkedInu](https://linkedin.com/company/aibility-org) nebo navštivte [naše webové stránky](https://aibility.cz)

© 2026 Aibility. Všechna práva vyhrazena.
`;
}

function generateHTML(parsed, airtable, aiResult) {
  const templatePath = join(__dirname, 'templates', 'follow-up-email.html');
  let html = readFileSync(templatePath, 'utf-8');

  const yt = airtable?.['Odkaz na záznam'] || '#ODKAZ_NA_ZAZNAM';
  const podcast = airtable?.['Odkaz na podcast'] || '#ODKAZ_NA_PODCAST';
  const materialy = airtable?.['Další materiály'] || '#ODKAZ_NA_MATERIALY';
  const feedback = airtable?.['Form zpětné vazby odkaz'] || FEEDBACK_URL;

  const keyPointsHtml = aiResult.key_points
    .map(kp =>
      `<li style="margin: 0; margin-bottom: 12px;"><p style="margin: 0; orphans: 2; widows: 2;"><strong>${kp.title}</strong> – ${kp.description}</p></li>`
    )
    .join('\n');

  html = html.replace(/\{\{NAZEV_WEBINARE\}\}/g, parsed.webinarName);
  html = html.replace(/\{\{DATUM\}\}/g, parsed.date);
  const uvodni = aiResult.uvodni_text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\{\{UVODNI_TEXT\}\}/g, uvodni);
  html = html.replace(/\{\{YOUTUBE_URL\}\}/g, yt);
  html = html.replace(/\{\{PODCAST_URL\}\}/g, podcast);
  html = html.replace(/\{\{MATERIALY_URL\}\}/g, materialy);
  html = html.replace(/\{\{FEEDBACK_URL\}\}/g, feedback);
  html = html.replace(/\{\{HERO_IMAGE_URL\}\}/g, DEFAULT_HERO_IMAGE);
  html = html.replace(/\{\{KEY_POINTS_HTML\}\}/g, keyPointsHtml);

  return html;
}

// ── Git operations ───────────────────────────────────────────────

function commitAndPush(files, message) {
  try {
    for (const f of files) {
      execSync(`git add "${f}"`, { stdio: 'pipe' });
    }
    execSync(`git add "${PROCESSED_FILE}"`, { stdio: 'pipe' });
    execSync(`git config user.name "Follow-up Bot"`, { stdio: 'pipe' });
    execSync(`git config user.email "bot@aibility.cz"`, { stdio: 'pipe' });
    execSync(`git commit -m "${message}"`, { stdio: 'pipe' });
    execSync(`git push`, { stdio: 'pipe' });
    console.log('  ✅ Committed and pushed');
    return true;
  } catch (err) {
    console.error('  ❌ Git error:', err.message);
    return false;
  }
}

// ── Slack notification ───────────────────────────────────────────

async function sendSlackNotification(parsed, missingLinks) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn('  ⚠️  SLACK_WEBHOOK_URL not set, skipping Slack');
    return;
  }

  const repoUrl = 'https://github.com/anetalizancova/aibility-marketing-brain';
  let text = `📧 *Follow-up draft: ${parsed.webinarName}* (${parsed.date})\n`;
  text += `Nový follow-up email vygenerován z přepisu webináře.\n`;
  text += `👉 <${repoUrl}|Otevřít repo> → \`content/emails/Webinars/\`\n`;

  if (missingLinks.length > 0) {
    text += `\n⚠️ *Chybějící odkazy:*\n${missingLinks.map(l => `• ${l}`).join('\n')}`;
  } else {
    text += `\n✅ Všechny odkazy nalezeny v Airtable`;
  }

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (res.ok) {
    console.log('  ✅ Slack notification sent');
  } else {
    console.warn(`  ⚠️  Slack webhook error: ${res.status}`);
  }
}

// ── Main ─────────────────────────────────────────────────────────

async function main() {
  const manualFile = process.env.MANUAL_FILE?.trim();
  const force = process.env.FORCE === 'true';

  console.log('🔄 Webinar Follow-up Generator');
  console.log(`   Content repo: ${CONTENT_REPO}`);
  console.log(`   Manual file: ${manualFile || '(auto-detect)'}`);
  console.log(`   Force: ${force}\n`);

  // Load processed list
  const processedData = loadProcessed();
  console.log(`📋 Already processed: ${processedData.processed.length} transcripts\n`);

  // Get list of transcripts
  let filesToProcess;
  if (manualFile) {
    filesToProcess = [manualFile];
  } else {
    const allFiles = await listTranscripts();
    console.log(`📂 Found ${allFiles.length} transcripts in ${CONTENT_REPO}\n`);

    filesToProcess = allFiles.filter(f => {
      if (force) return true;
      return !processedData.processed.includes(f);
    });

    if (filesToProcess.length === 0) {
      console.log('✅ No new transcripts to process. Done.');
      return;
    }
  }

  console.log(`🆕 New transcripts to process: ${filesToProcess.length}`);
  filesToProcess.forEach(f => console.log(`   - ${f}`));
  console.log('');

  const createdFiles = [];

  for (const filename of filesToProcess) {
    console.log(`\n━━━ Processing: ${filename} ━━━`);

    try {
      // 1. Parse filename
      const parsed = parseTranscriptFilename(filename);
      if (!parsed) {
        console.warn(`  ⚠️  Cannot parse filename, skipping: ${filename}`);
        continue;
      }
      console.log(`  Type: ${parsed.type} | Name: "${parsed.webinarName}" | Date: ${parsed.date}`);

      // 2. Download transcript
      console.log('  📥 Downloading transcript...');
      const transcript = await downloadTranscript(filename);
      console.log(`  📄 ${transcript.length} characters`);

      // 3. Airtable lookup
      console.log('  🔍 Looking up in Airtable...');
      const airtable = await findWebinarInAirtable(parsed);
      if (airtable) {
        console.log(`  ✅ Found: "${airtable['Název'] || 'N/A'}"`);
        if (airtable['Odkaz na záznam']) console.log(`     📹 YouTube: ✓`);
        if (airtable['Odkaz na podcast']) console.log(`     🎧 Podcast: ✓`);
        if (airtable['Další materiály']) console.log(`     📁 Materiály: ✓`);
      } else {
        console.log('  ⚠️  Not found in Airtable → using placeholders');
      }

      // 4. AI extraction
      console.log('  🤖 Extracting key points with AI...');
      const aiResult = await extractKeyPointsWithAI(transcript, parsed.webinarName);
      console.log(`  ✅ Got ${aiResult.key_points.length} key points`);

      // 5. Generate files
      const mdContent = generateMarkdown(parsed, airtable, aiResult);
      const htmlContent = generateHTML(parsed, airtable, aiResult);

      const outputDir = join(process.cwd(), 'content/emails/Webinars');
      mkdirSync(outputDir, { recursive: true });

      const mdPath = `content/emails/Webinars/${parsed.webinarName} - ${parsed.date} follow up text.md`;
      const htmlPath = `content/emails/Webinars/${parsed.webinarName} - ${parsed.date} follow up.html`;

      writeFileSync(join(process.cwd(), mdPath), mdContent);
      writeFileSync(join(process.cwd(), htmlPath), htmlContent);
      console.log(`  ✅ Created: ${mdPath}`);
      console.log(`  ✅ Created: ${htmlPath}`);

      createdFiles.push(mdPath, htmlPath);

      // 6. Mark as processed
      if (!processedData.processed.includes(filename)) {
        processedData.processed.push(filename);
      }
      saveProcessed(processedData);

      // 7. Slack notification
      const missingLinks = [];
      if (!airtable?.['Odkaz na záznam']) missingLinks.push('YouTube záznam');
      if (!airtable?.['Odkaz na podcast']) missingLinks.push('Podcast');
      if (!airtable?.['Další materiály']) missingLinks.push('Materiály');

      await sendSlackNotification(parsed, missingLinks);

    } catch (err) {
      console.error(`\n  ❌ Error: ${err.message}`);
    }
  }

  // Commit all created files
  if (createdFiles.length > 0) {
    console.log('\n📤 Committing files...');
    commitAndPush(createdFiles, `🤖 Auto follow-up: ${filesToProcess.map(f => basename(f, '.md')).join(', ')}`);
  }

  console.log('\n✅ All done!');
}

main();
