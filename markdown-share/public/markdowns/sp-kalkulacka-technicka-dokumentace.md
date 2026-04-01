# SP Lead Magnets — Technická dokumentace & Architektura

**Poslední aktualizace:** 1. dubna 2026
**Stav:** Kalkulačka live, AT + Brevo napojeno, results URL funguje, email sekvence navržena (TBD build v Brevo)

---

## 1. Přehled

Systém pro generování leadů pro Superpowered Professional™. Jeden sdílený backend (API + Airtable + Brevo) pro všechny lead magnety. Každý LM má vlastní frontend, ale data tečou stejnou pipeline.

**Aktuálně live:** Kalkulačka "Kolik času ztrácíte bez AI?"
- Člověk zodpoví 8 otázek o své práci
- Dostane výsledek (kolik hodin týdně ztrácí)
- Dostane 3 hotové AI prompty vybrané podle odpovědí (top 3 kategorie z 8)
- Email gate před výsledky (volitelný skip)

**Důležité:** Prompty NEJSOU personalizované — jsou předpřipravené (8 kusů, strukturované ve stylu impeccable skills s anti-patterny), zobrazí se top 3 dle odpovědí. Slovo "personalizované" v copy nepoužíváme. Opravdová personalizace přijde až s assessment + LLM backendem.

---

## 2. Live URL & Repozitáře

| Co | Odkaz |
|----|-------|
| **Kalkulačka (live)** | https://sp-kalkulacka.vercel.app |
| **GitHub repo** | https://github.com/anetalizancova/sp-kalkulacka |
| **Vercel projekt** | anetas-projects-cfd29e99/sp-kalkulacka |
| **Airtable base** | `appaUN6cVBKvJZP91` — "SP Lead Magnets" |
| **Airtable tabulka** | `Leads` (tblJJxG1w6P822f2E) |
| **Brevo složka** | "Superpowered Professional" (folder 231) |

---

## 3. Architektura — jak to funguje

```
[Jakýkoliv SP Lead Magnet frontend]
    │
    │  POST /api/lead-magnet
    │  { email, tag, results, utm }
    │
    ▼
┌─────────────────────────────────────────────────┐
│  Vercel Serverless Function                      │
│  /api/lead-magnet.js                             │
│                                                  │
│  1. Vygeneruje results token z odpovědí          │
│     → base64url zakódované odpovědi              │
│     → vytvoří unikátní results URL               │
│                                                  │
│  2. Uloží do Airtable                            │
│     → tabulka "Leads"                            │
│     → tag určuje lead magnet                     │
│                                                  │
│  3. Vytvoří kontakt v Brevo                      │
│     → master list (232)                          │
│     → specifický list dle tagu                   │
│     → nastaví atributy:                          │
│        SP_LEAD_MAGNET = tag                      │
│        SP_CALCULATOR_HOURS = hodiny              │
│        SP_RESULTS_URL = unikátní link            │
└─────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────┐
│  Brevo Automation                                │
│                                                  │
│  Trigger: přidání do listu 232                   │
│  → Branch dle SP_LEAD_MAGNET:                    │
│     → Email #1 (separátní per LM)                │
│  → Merge → sdílené Emaily #2–5                   │
│     (s krátkými podmíněnými bloky)               │
│  → sp-completed check před každým emailem        │
└─────────────────────────────────────────────────┘
```

**Klíčový princip:** Jeden API endpoint, jedna AT tabulka, jeden master list, jedna automation. Rozlišení lead magnetů = `tag` parametr.

---

## 4. Airtable — tabulka "Leads"

**Base ID:** `appaUN6cVBKvJZP91`
**Tabulka:** `Leads` (tblJJxG1w6P822f2E)

| Sloupec | Typ | Popis |
|---------|-----|-------|
| Email | email | Primární identifikátor |
| Lead Magnet | singleSelect | Tag: `sp-lm-kalkulacka`, `sp-lm-prompty`, atd. |
| Results | multilineText | JSON s odpověďmi a výsledky (struktura závisí na LM) |
| UTM Source | singleLineText | utm_source |
| UTM Medium | singleLineText | utm_medium |
| UTM Campaign | singleLineText | utm_campaign |

### Lead Magnet tagy (single select choices v AT)

| Tag | Lead Magnet | Stav |
|-----|-------------|------|
| `sp-lm-kalkulacka` | Kolik času ztrácíte bez AI? (kalkulačka) | **Live** |
| `sp-lm-prompty` | 10 AI promptů pro profesionály | Plánovaný |
| `sp-lm-report` | AI Readiness Report | Plánovaný |
| `sp-lm-toolkit` | SP Toolkit | Plánovaný |
| `sp-lm-mozek` | Druhý Mozek s AI | Plánovaný |
| `sp-lm-skill` | AI Skill Assessment | Plánovaný |
| `sp-lm-cheatsheet` | AI Cheat Sheet | Plánovaný |
| `sp-lm-navyky` | 5 AI Návyků | Plánovaný |
| `sp-lm-obor` | AI pro tvůj obor | Plánovaný |

### Results JSON — příklad (kalkulačka)

```json
{
  "answers": {"q1": 15, "q2": 5, "q3": 5, "q4": 3, "q5": 2, "q6": 3, "q7": 2, "q8": 2},
  "weeklyHours": 12.3,
  "monthlyHours": 53,
  "yearlyHours": 590,
  "workDays": 74
}
```

Jiné lead magnety budou mít jinou strukturu `results` — je to volný JSON, AT ho uloží jako text.

---

## 5. Brevo — kompletní logika

### 5.1 Složka: Superpowered Professional (folder 231)

| List | ID | Účel |
|------|----|------|
| **SP Lead Magnet Leads** | **232** | Master list — VŠECHNY LM leady. Trigger pro automation. |
| SP LM Kalkulačka | 233 | Segmentace kalkulačkových leadů |
| SP LM 10 Promptů | 234 | Budoucí LM |
| SP LM Report | 235 | Budoucí LM |
| SP LM Toolkit | 236 | Budoucí LM |
| SP LM Druhý Mozek | 237 | Budoucí LM |
| SP LM AI Skill | 238 | Budoucí LM |
| SP LM Cheat Sheet | 239 | Budoucí LM |
| SP LM 5 Návyků | 240 | Budoucí LM |
| SP LM AI pro Obor | 241 | Budoucí LM |

### 5.2 Contact attributes (custom)

| Atribut | Typ | Popis | Příklad | Použití v emailu |
|---------|-----|-------|---------|------------------|
| `SP_LEAD_MAGNET` | text | Tag posledního LM. Podmíněné bloky. | `sp-lm-kalkulacka` | `{% if contact.SP_LEAD_MAGNET == '...' %}` |
| `SP_CALCULATOR_HOURS` | float | Týdenní ztráta hodin z kalkulačky. | `12.3` | `{{ contact.SP_CALCULATOR_HOURS }}` |
| `SP_RESULTS_URL` | text | Unikátní URL s výsledky kontaktu. | `https://sp-kalkulacka.vercel.app?r=MTUs...` | `{{ contact.SP_RESULTS_URL }}` |

### 5.3 Jak Brevo logika funguje — a proč

**Problém:** Brevo nemá jednoduché "tagy" jako např. ConvertKit. Má listy, atributy, a segmenty.

**Naše řešení (3 vrstvy):**

1. **Master list (232)** = trigger pro automation
   - Jeden automation workflow pro VŠECHNY lead magnety
   - Trigger: "Contact added to list 232"
   - Výhoda: nemusíš vytvářet nový workflow pro každý LM

2. **Specifické listy (233–241)** = přehled a reporting
   - V Brevo UI vidíš, kolik lidí přišlo z kalkulačky vs. promptů vs. reportu
   - Můžeš poslat jednorázový email jen lidem z konkrétního LM
   - Kontakt je VŽDY ve dvou listech: master + specifický

3. **Atributy** = podmíněný obsah + dynamická data v emailech
   - `SP_LEAD_MAGNET` → rozhoduje, co se zobrazí v podmíněných blocích
   - `SP_CALCULATOR_HOURS` → vtáhne konkrétní číslo do emailu
   - `SP_RESULTS_URL` → unikátní link na osobní výsledky

**Proč ne jen tagy?** Brevo "tagy" existují, ale nejsou propojené s automation triggers. Listy ano. Proto master list = trigger, atribut = podmíněný obsah.

### 5.4 Co se děje při submitu (krok po kroku)

```
1. Frontend pošle POST /api/lead-magnet
   { email: "jan@firma.cz", tag: "sp-lm-kalkulacka", results: {...}, utm: {...} }

2. API vygeneruje results token
   Odpovědi: {q1:15, q2:5, q3:5, q4:3, q5:2, q6:3, q7:2, q8:2}
   → join(",") → "15,5,5,3,2,3,2,2"
   → base64url → "MTUsNSw1LDMsMiwzLDIsMg"
   → resultsUrl = "https://sp-kalkulacka.vercel.app?r=MTUsNSw1LDMsMiwzLDIsMg"

3. API → Airtable
   Vytvoří nový řádek v tabulce Leads:
   Email: jan@firma.cz | Lead Magnet: sp-lm-kalkulacka | Results: {JSON} | UTM...

4. API → Brevo POST /v3/contacts
   {
     email: "jan@firma.cz",
     updateEnabled: true,
     attributes: {
       SP_LEAD_MAGNET: "sp-lm-kalkulacka",
       SP_CALCULATOR_HOURS: 12.3,
       SP_RESULTS_URL: "https://sp-kalkulacka.vercel.app?r=MTUsNSw..."
     },
     listIds: [232, 233]
   }

5. Brevo automation se spustí
   Trigger: kontakt přidán do listu 232
   → Branch dle SP_LEAD_MAGNET → Email #1 (kalkulačka verze)
   → Den 2: Email #2, Den 5: #3, Den 7: #4, Den 10: #5
```

### 5.5 Results URL — jak funguje a jak replikovat

**Problém:** Výsledky kalkulačky existují jen v paměti prohlížeče. Zavřeš stránku = pryč. Potřebujeme unikátní link pro každého člověka, aby se mohl vrátit k výsledkům a aby ho šlo dát do emailu.

**Řešení: Odpovědi zakódované v URL parametru**

```
Odpovědi: {q1:15, q2:5, q3:5, q4:3, q5:2, q6:3, q7:2, q8:2}
    ↓ vezmi hodnoty v pořadí, join(",")
"15,5,5,3,2,3,2,2"
    ↓ base64url encode (Buffer.from(...).toString('base64url'))
"MTUsNSw1LDMsMiwzLDIsMg"
    ↓
URL: https://sp-kalkulacka.vercel.app?r=MTUsNSw1LDMsMiwzLDIsMg
```

**Co dělá frontend:** Na load stránky detekuje `?r=` parametr → dekóduje → naplní `ans` objekt → přeskočí otázky → zobrazí výsledky.

**Co dělá API:** Vygeneruje token z `results.answers`, vytvoří plnou URL, uloží jako `SP_RESULTS_URL` Brevo atribut.

**Proč ne databázový lookup:** Token v URL je self-contained — funguje navždy, nepotřebuje API call, žádná expirace. Odpovědi jsou jen 8 malých čísel = krátký token.

**Jak replikovat pro nový LM:**
1. Nový LM pošle `results` v libovolné struktuře
2. V `api/lead-magnet.js` přidej logiku pro generování tokenu z odpovědí nového LM
3. Frontend nového LM musí umět detekovat `?r=` parametr a zobrazit výsledky
4. API uloží URL jako `SP_RESULTS_URL` — Brevo ho automaticky má k dispozici

**V emailu:** `<a href="{{ contact.SP_RESULTS_URL }}">Zobrazit moje výsledky</a>`

### 5.6 Nový lead magnet = co přidat

Při přidání nového lead magnetu (např. "10 AI promptů"):

**Backend (většinou nic):**
1. **API:** Nic — `TAG_TO_LIST` mapování už obsahuje `sp-lm-prompty → 234`
2. **Airtable:** Nic — tag `sp-lm-prompty` už je v single select choices
3. **Brevo listy:** Nic — list 234 už existuje

**Frontend:**
4. **Nová HTML stránka** — POST na `/api/lead-magnet` s `tag: 'sp-lm-prompty'`
5. **Results URL logika** (pokud LM generuje unikátní výsledky):
   - Přidat token generování do API pro nový tag
   - Přidat `?r=` detekci do frontendu nového LM

**Email sekvence (viz `SP-EMAIL-SEKVENCE-NAVRH.md`):**
6. **Napsat nový Email #1** — separátní šablona v Brevo pro tento LM
7. **Přidat větev** do branch node na začátku automation
8. **Přidat `{% elif %}` blok** v Emailu #2 a #4 (2–3 věty, viz šablony v návrhu)
9. Emaily #3 a #5 — nic (jsou univerzální)

**Dokumentace:**
10. **Aktualizovat stav** v tomto souboru (z "Plánovaný" na "Live")

**Shrnutí: Pro většinu LM = nový frontend + nový Email #1 + 2 krátké podmíněné bloky. ~2 hodiny práce.**

---

## 6. Vercel — konfigurace

### Environment variables

| Proměnná | Hodnota | Poznámka |
|----------|---------|----------|
| `AIRTABLE_API_TOKEN` | `pat6X56bg...` | Personal Access Token |
| `AIRTABLE_BASE_ID` | `appaUN6cVBKvJZP91` | SP Lead Magnets base |
| `BREVO_API_KEY` | `xkeysib-bee018...` | Dedikovaný klíč pro SP |
| `BREVO_LIST_ID` | `232` | Master list ID |
| `BASE_URL` | `https://sp-kalkulacka.vercel.app` | Pro generování results URL |

### vercel.json

```json
{
  "rewrites": [
    { "source": "/kalkulacka", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "POST, OPTIONS" }
      ]
    }
  ]
}
```

---

## 7. API endpoint: `/api/lead-magnet`

**Soubor:** `api/lead-magnet.js`
**Metoda:** POST
**Content-Type:** application/json

### Request body

```json
{
  "email": "user@example.com",
  "tag": "sp-lm-kalkulacka",
  "results": {
    "answers": {"q1": 15, "q2": 5, "q3": 5, "q4": 3, "q5": 2, "q6": 3, "q7": 2, "q8": 2},
    "weeklyHours": 12.3,
    "monthlyHours": 53,
    "yearlyHours": 590,
    "workDays": 74
  },
  "utm": {
    "source": "linkedin",
    "medium": "social",
    "campaign": "sp-kalkulacka-launch"
  }
}
```

- `email` — povinný
- `tag` — identifikátor lead magnetu (default: `sp-lm-kalkulacka`)
- `results` — volný JSON, struktura závisí na typu LM
- `utm` — volitelné, zachytí se automaticky z URL parametrů

### Co API dělá (v pořadí)

1. **Generuje results token** z `results.answers` → base64url → přidá k BASE_URL → `resultsUrl`
2. **Ukládá do Airtable** → nový řádek v tabulce Leads
3. **Vytváří/aktualizuje kontakt v Brevo** → master + specifický list + atributy (SP_LEAD_MAGNET, SP_CALCULATOR_HOURS, SP_RESULTS_URL)

### Response

| Status | Body | Význam |
|--------|------|--------|
| `200` | `{"success": true}` | Vše OK (AT i Brevo) |
| `207` | `{"success": true, "partial": true, "errors": ["brevo"]}` | AT OK, Brevo selhalo (nebo naopak) |
| `400` | `{"error": "Email is required"}` | Chybí email |
| `405` | `{"error": "Method not allowed"}` | Špatná HTTP metoda |

### Tag → List mapping (hardcoded v API)

```javascript
const TAG_TO_LIST = {
  'sp-lm-kalkulacka': 233,
  'sp-lm-prompty':    234,
  'sp-lm-report':     235,
  'sp-lm-toolkit':    236,
  'sp-lm-mozek':      237,
  'sp-lm-skill':      238,
  'sp-lm-cheatsheet': 239,
  'sp-lm-navyky':     240,
  'sp-lm-obor':       241,
};
```

Pokud přidáš nový LM mimo těchto 9, přidej řádek sem + vytvoř nový list v Brevo.

---

## 8. Email nurture sekvence — architektura

> Kompletní copy a podmíněné bloky viz `SP-EMAIL-SEKVENCE-NAVRH.md`

### Princip: Separátní Email #1 + sdílené #2–5

```
Trigger: Kontakt přidán do listu 232
    │
    ▼
┌─ BRANCH dle SP_LEAD_MAGNET ─────────────────────┐
│  sp-lm-kalkulacka → "Email #1: Kalkulačka"      │
│  sp-lm-prompty    → "Email #1: Prompty"          │
│  sp-lm-mozek      → "Email #1: Mozek"            │
│  sp-lm-skill      → "Email #1: Skill"            │
│  (default)        → "Email #1: Obecný"           │
└──────────────┬───────────────────────────────────┘
               │ (merge)
               ▼
         [Čekej 2 dny]
         [sp-completed?] → ANO → EXIT
         Pošli Email #2 (sdílený + {% if %} bloky)
               │
         [Čekej 3 dny]
         [sp-completed?] → ANO → EXIT
         Pošli Email #3 (univerzální — žádné podmínky)
               │
         [Čekej 2 dny]
         [sp-completed?] → ANO → EXIT
         Pošli Email #4 (sdílený + {% if %} bloky)
               │
         [Čekej 3 dny]
         [sp-completed?] → ANO → EXIT
         Pošli Email #5 (univerzální — žádné podmínky)
               │
         KONEC → kontakt zůstává v newsletteru
```

### Co je podmíněné a co univerzální

| Email | Den | Podmíněné (per LM) | Univerzální | Podpis |
|-------|-----|---------------------|-------------|--------|
| **#1 Doručení** | 0 | **Celý email** — separátní šablona | — | Tým Aibility |
| **#2 Bonus tip** | 2 | Úvodní odstavec (3–5 vět) | Bridge + assessment CTA (80 %) | Tým Aibility |
| **#3 Příběh** | 5 | **Nic** | Celý email — příběh + vysvětlení assessmentu | Tým Aibility |
| **#4 Personalizace** | 7 | Úvodní odstavec (2–3 věty) | "Obecné vs. na míru" srovnání + CTA (85 %) | Tým Aibility |
| **#5 Closer** | 10 | **Nic** | Celý email — shrnutí + newsletter expectation | Tým Aibility |

### Klíčové Brevo proměnné v emailech

```html
<!-- Dynamické hodnoty: -->
{{ contact.SP_CALCULATOR_HOURS }}    → "12.3" (hodiny z kalkulačky)
{{ contact.SP_RESULTS_URL }}         → unikátní link na osobní výsledky

<!-- Podmíněné bloky: -->
{% if contact.SP_LEAD_MAGNET == 'sp-lm-kalkulacka' %}
  <p>Kalkulačka ukázala, že ztrácíte {{ contact.SP_CALCULATOR_HOURS }} hodin týdně.</p>
  <a href="{{ contact.SP_RESULTS_URL }}">Zobrazit moje výsledky</a>
{% elif contact.SP_LEAD_MAGNET == 'sp-lm-prompty' %}
  <p>Stáhli jste si sadu 10 AI promptů. Tady je tip...</p>
{% elif contact.SP_LEAD_MAGNET == 'sp-lm-mozek' %}
  <p>Začali jste stavět druhý mozek s AI. Tady je trik...</p>
{% else %}
  <p>Díky za zájem o Superpowered Professional.</p>
{% endif %}
```

### Oslovení a podpis — pravidla

- **Žádné "Ahoj"** — emaily začínají rovnou textem ("Díky za vyplnění kalkulačky.")
- **Podpis:** "Tým Aibility" — píšeme za firmu, ne za konkrétní osobu
- **Tón:** Přátelský, věcný, bez zbytečných formalit

### Přidat nový LM do sekvence

1. Napsat nový Email #1 (separátní Brevo šablona)
2. Přidat větev do branch node na začátku
3. Přidat `{% elif %}` v Emailu #2 (bonus tip, 3–5 vět)
4. Přidat `{% elif %}` v Emailu #4 (úvodní odstavec, 2–3 věty)
5. Emaily #3 a #5 — nic

**Čas: ~30 minut v Brevo UI** (za předpokladu, že copy je hotová)

---

## 9. Kalkulačka — obsah & flow

### Struktura (14 kroků, steps 0–13)

| Step | Typ | Obsah |
|------|-----|-------|
| 0 | Hero | "Kolik času ztrácíte bez AI?" — CTA start |
| 1 | Q1 | Emaily a komunikace (denní počet) |
| 2 | Q2 | Reporty a prezentace (týdně) |
| 3 | Q3 | Meetingy a zápisy (týdně) |
| 4 | **Interstitial** | 4 AI interakční módy z SP metodiky |
| 5 | Q4 | Research a hledání (týdně) |
| 6 | Q5 | Manuální práce s daty (týdně) |
| 7 | **Interstitial** | 78 % přeceňuje AI dovednosti (Dunning-Kruger) |
| 8 | Q6 | Tvorba obsahu (týdně) |
| 9 | Q7 | Plánování a rozhodování (týdně) |
| 10 | **Interstitial** | 6 AI archetypů z SP metodiky |
| 11 | Q8 | Učení a rozvoj (týdně) |
| 12 | Email gate | Email input + skip možnost |
| 13 | Results | Výsledky + 3 prompty vybrané dle odpovědí + CTA na assessment |

### Prompty — výběr, ne generování

Na základě odpovědí se vyberou **TOP 3 kategorie s největší ztrátou času**. Pro každou se zobrazí prompt card s hotovým promptem.

Každý prompt je strukturovaný ve stylu [impeccable skills](https://github.com/pbakaus/impeccable):
- **POSTUP** — konkrétní kroky, co AI má dělat
- **PRAVIDLA** — jak to dělat dobře
- **NEDĚLEJ** — explicitní anti-patterny (co AI nemá dělat)

| Kategorie | Prompt | AI Mód | Klíčová hodnota |
|-----------|--------|--------|-----------------|
| q1 — Emaily | Email Accelerator | Konverzační | 2 verze odpovědi (krátká/standard), zákaz klišé |
| q2 — Reporty | Report Generator | Builder | KEY INSIGHT na sekci, čísla vždy s kontextem |
| q3 — Meetingy | Meeting Summarizer | Orchestrační | Sekce "Skryté signály" (konflikty, obavy) |
| q4 — Research | Research Assistant | Konverzační | Třístupňové hodnocení: ZNÁMO/SPORNÉ/NEZNÁMO |
| q5 — Data | Data Automator | Orchestrační | Triage 🟢🟡🔴, řešení od nejjednoduššího |
| q6 — Obsah | Content Co-Creator | Kreativní | 3 úhly (kontroverzní/příběhový/datový), AI red flags |
| q7 — Plánování | Decision Framework | Konverzační | Pre-mortem, reversibility test, 10/10/10 |
| q8 — Učení | Learning Accelerator | Konverzační | Feynmanova metoda, PŘECEŇOVANÉ kategorie |

### Úspory podle kategorie

| Kategorie | AI úspora | Hodinové varianty v odpovědích |
|-----------|-----------|-------------------------------|
| Emaily | ~55 % | 5 / 15 / 30 / 50 emailů denně |
| Reporty | ~65 % | 0,5 / 2 / 5 / 8 hod. týdně |
| Meetingy | ~50 % | 2 / 5 / 10 / 15 hod. týdně |
| Research | ~60 % | 1 / 3 / 6 / 10 hod. týdně |
| Data | ~75 % | 0,5 / 2 / 5 / 8 hod. týdně |
| Obsah | ~55 % | 0,5 / 3 / 6 / 10 hod. týdně |
| Plánování | ~45 % | 0,5 / 2 / 5 / 8 hod. týdně |
| Učení | ~50 % | 0,5 / 2 / 5 / 8 hod. týdně |

---

## 10. Design & UX (kalkulačka)

- **Theme:** Dark (bg `#0C0C18`, cards `#14142A`, accent `#C0ADFF`)
- **Fonty:** Hedvig Letters Serif (nadpisy), Geist (body)
- **Animace:** Staggered fade-up entrance, smooth step transitions, button feedback
- **Navigace:** Clickable question dots (1–8) pro návrat na zodpovězenou otázku
- **Results URL:** `?r=` parametr s base64url tokenem → stránka zobrazí výsledky bez otázek
- **Accessibility:** `prefers-reduced-motion` support
- **Česká typografie:** `&nbsp;` pro jednopísmenné předložky (k, s, v, z, o, u, i, a), číslo+jednotka (78&nbsp;%, 12&nbsp;hodin)

---

## 11. Jak přidat nový lead magnet — kompletní checklist

### A. Backend & data (většinou nic)

| # | Co | Kde | Potřeba? |
|---|---|-----|----------|
| 1 | Ověřit tag v AT | Base `appaUN6cVBKvJZP91` | Už existuje pro všech 9 LM |
| 2 | Ověřit list v Brevo | Folder 231 | Už existuje pro všech 9 LM |
| 3 | Ověřit mapping v API | `TAG_TO_LIST` v `api/lead-magnet.js` | Už existuje pro všech 9 LM |
| 4 | (Volitelné) Nový Brevo atribut | Brevo contact attributes | Jen pokud LM generuje specifická data |

### B. Frontend

| # | Co | Kde | Poznámka |
|---|---|-----|----------|
| 5 | Vytvořit HTML stránku | Nový soubor v repo nebo nové repo | POST na `/api/lead-magnet` s příslušným `tag` |
| 6 | Results URL | Frontend + API | Přidat token logiku pokud LM má unikátní výsledky |
| 7 | Přidat rewrite do vercel.json | `vercel.json` | Pokud je to další stránka ve stejném repo |

### C. Email sekvence

| # | Co | Kde | Poznámka |
|---|---|-----|----------|
| 8 | Napsat Email #1 | Nová Brevo šablona | Separátní email — doručení obsahu LM |
| 9 | Přidat branch v automation | Brevo automation workflow | Nová větev pro SP_LEAD_MAGNET = nový tag |
| 10 | Přidat `{% elif %}` v Email #2 | Brevo šablona Email #2 | Bonus tip, 3–5 vět |
| 11 | Přidat `{% elif %}` v Email #4 | Brevo šablona Email #4 | Úvodní odstavec, 2–3 věty |
| 12 | Emaily #3 a #5 | — | Nic — jsou univerzální |

### D. Dokumentace

| # | Co | Kde |
|---|---|-----|
| 13 | Změnit stav z "Plánovaný" na "Live" | Tento soubor, sekce 4 |
| 14 | Přidat results JSON příklad | Tento soubor, sekce 4 |

### Časový odhad

| Typ LM | Frontend | Email sekvence | Celkem |
|--------|----------|---------------|--------|
| Statický (PDF, cheat sheet) | ~2 hodiny | ~1 hodina | ~3 hodiny |
| Interaktivní (kalkulačka, toolkit) | ~1–2 dny | ~1 hodina | ~1–2 dny |

---

## 12. Otevřené úkoly

- [ ] Smazat testovací záznamy z AT a Brevo (`test@aibility.com`, `sp-test@aibility.com`, `sp-test2@aibility.com`)
- [ ] Smazat defaultní "Table 1" v AT base
- [ ] **Sestavit automation workflow v Brevo UI** (branch → Email #1 per LM → merge → shared #2–5)
- [ ] **Vytvořit HTML šablony emailů v Brevo** (Aibility design systém)
- [ ] Finalizovat copy emailů (viz `SP-EMAIL-SEKVENCE-NAVRH.md`)
- [ ] Otestovat end-to-end: submit → AT → Brevo → Email #1 → delay → #2 → ... → #5
- [ ] Zvážit backend AI evaluaci (LLM generuje personalizované prompty místo rule-based výběru)
- [ ] Assessment propojení — tag `sp-completed` (závisí na Tomášovi)
- [ ] Přesunout do firemního repa po schválení
- [ ] Nastavit custom doménu (volitelné)
- [ ] UTM parametry — dohodnout naming convention pro kampaně

---

## 13. Souvisící dokumenty

| Dokument | Co obsahuje |
|----------|-------------|
| `SP-EMAIL-SEKVENCE-NAVRH.md` | **Kompletní copy emailů #1–5**, podmíněné bloky, Brevo implementační detaily, A/B testy |
| `SP-Lead-Magnets-Customer-Journey.md` | Celková strategie LM, customer journey, 9 návrhů LM, Brevo automation návrh |
| `Mkt sync.txt` | Zápis z meetingu 30.3., rozhodnutí o tazích a flow |
| `SP-NEWSLETTER-KONCEPT.md` | Koncept SP newsletteru (navazuje po nurture sekvenci) |

---

## 14. Rozhodnutí a důvody (decision log)

| Datum | Rozhodnutí | Důvod |
|-------|-----------|-------|
| 1.4.2026 | Jeden master list + specifické listy místo "tagů" | Brevo tagy nejsou propojené s automation triggers. Listy ano. |
| 1.4.2026 | Atribut `SP_LEAD_MAGNET` pro podmíněný obsah | Jeden automation workflow s podmíněnými bloky místo separátních workflows. |
| 1.4.2026 | Jeden sdílený API endpoint pro všechny LM | Nový LM = jen nový frontend, backend je hotový. |
| 1.4.2026 | Prompty = výběr z předpřipravených, ne generování | Kvalitní (impeccable skills styl). LLM generování = nice-to-have pro v2. |
| 1.4.2026 | "Hotové prompty" místo "personalizované prompty" v copy | Upřímnost. Slovo "personalizované" si necháme na assessment. |
| 1.4.2026 | Prompty přepsány ve stylu impeccable skills | Strukturované s POSTUP, PRAVIDLA, NEDĚLEJ. Reálně použitelné. |
| 1.4.2026 | Results URL = base64url token v URL parametru | Self-contained, žádná DB lookup, funguje navždy, krátký token. |
| 1.4.2026 | SP_RESULTS_URL jako Brevo atribut | Email může linkovat na osobní výsledky: `{{ contact.SP_RESULTS_URL }}`. |
| 1.4.2026 | Email #1 separátní per LM, #2–5 sdílené | Čistý design #1 + minimální údržba #2–5. Nový LM = 1 email + 2 podmíněné bloky (~30 min). |
| 1.4.2026 | Emaily #3 a #5 plně univerzální | Assessment pitch je stejný nezávisle na LM. Není důvod personalizovat. |
| 1.4.2026 | `{% else %}` fallback v každém podmíněném bloku | Nový LM bez podmíněného bloku = obecná verze, ne prázdný email. |
| 1.4.2026 | Podpis "Tým Aibility", žádné "Ahoj" | Píšeme za firmu. Emaily začínají rovnou textem. |
