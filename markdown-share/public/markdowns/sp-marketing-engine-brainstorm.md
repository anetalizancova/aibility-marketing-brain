# SP™ Marketing Engine — Kompletní dokument pro brainstorming

**Datum:** 27. března 2026
**Pro:** Marketing team meeting
**Cíl:** Projít celý engine, rozdělit ownership, odsouhlasit co a jak budeme dělat

---

## Obsah

0. [Kontext](#0-kontext)
1. [Produktová architektura](#1-produktová-architektura)
2. [Jeden funnel, jeden směr](#2-jeden-funnel-jeden-směr)
3. [Marketing Engine — architektura](#3-marketing-engine--architektura)
4. [Flow: Free Assessment](#4-flow-free-assessment)
5. [Flow: Paid Report](#5-flow-paid-report)
6. [Flow: SP™ Programy (Foundation / Build / Coach)](#6-flow-sp-programy)
7. [Flow: Webináře & Events](#7-flow-webináře--events)
8. [Flow: Kampaně (lead gen + assessment promo)](#8-flow-kampaně)
9. [Flow: Content & Social](#9-flow-content--social)
10. [Flow: Newsletter](#10-flow-newsletter)
11. [AI agenti — detail](#11-ai-agenti)
12. [Automatizace & email sekvence](#12-automatizace--email-sekvence)
13. [Kanály](#13-kanály)
14. [Sdílený tooling — commands, rules, MCPs](#14-sdílený-tooling)
15. [Dashboard & reporting](#15-dashboard--reporting)
16. [Tracking stack](#16-tracking-stack)
17. [B2B motion](#17-b2b-motion)
18. [Action plan](#18-action-plan)
19. [Ownership](#19-ownership)
20. [Otevřené otázky](#20-otevřené-otázky)

---

## 0. Kontext

### 📝 Poznámky z meetingu (live)
- Rozhodnutí:
- Otázky:
- TODO:
- Poznámky z Wisprflow:

### Finanční realita (meeting 25.3.)

- **Runway:** ~6–9 měsíců (cíl break-even do června/července)
- **Revenue YTD:** 2.1M CZK, výdaje 4.2M CZK → minus 2M
- **Pipeline B2B:** ~4M CZK (NN, Notino, Řecko/Španělsko, Slovensko...)
- **Důsledek:** Každá aktivita musí mít přímou linku na revenue.

### Co se změnilo od brainstormingu 23.2.

| Oblast | Únor 2026 | Březen 2026 |
|--------|-----------|-------------|
| **Focus** | SP™ jako nový produkt v portfoliu | SP™ = JEDINÝ fokus celé firmy na Q2 |
| **Produkt** | Free + Paid assessment | Free → Paid → Foundation → Build → Coach → B2B |
| **Marketing** | Promovat víc věcí (webináře, Edu, Aimee, SP) | JEDEN funnel, JEDEN směr — všechno je SP™ |
| **Engine** | Make.com scenária | Code-based, Cursor-centric, git jako source of truth |
| **Urgence** | "Připravit launch" | "Generovat revenue TEĎ" |

### Klíčové citace z meetingu

> *"Musíme se všichni brutálně zaměřit na to, abychom generovali revenue."* — Martin

> *"Všechno bude kolem té metodiky SP™. Jeden směr."* — Martin

> *"Marketing musí být postavený na newsletter, webinářích a contentu. Furt tam bude SP™."* — Martin

---

## 1. Produktová architektura

### 📝 Poznámky z meetingu (live)
- Rozhodnutí:
- Otázky:
- TODO:
- Poznámky z Wisprflow:

```
┌────────────────────────────────────────────────────────────────────┐
│                         FREE TIER                                  │
│                                                                    │
│  SP™ Free Assessment (10 min)                                      │
│  → Archetyp + top 3 superpowers + growth edge + shareable card     │
│  → Email capture → Funnel start                                    │
│  Cíl: VOLUME, lead gen, viral loop                                 │
└────────────────┬───────────────────────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────────────────────┐
│                         PAID ASSESSMENT                            │
│                                                                    │
│  SP™ Full Report ($29–49 / testovat!)                              │
│  → 20 sub-kompetencí, certifikát, learning path, prompty           │
│  → Personalizované custom instructions + agent setup               │
│  Cíl: REVENUE z B2C, ověření WTP                                   │
└────────────────┬───────────────────────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────────────────────┐
│                    SP™ FOUNDATION (~5k CZK)                        │
│                                                                    │
│  Assessment + 3h online workshop + personalizované prompty          │
│  "Chat, cowork, základy" — pro každého profesionála                │
│  Jednou za 2 měsíce, cíl 100+ účastníků                           │
│  Cíl: Vzdělávací revenue, community building                       │
└────────────────┬───────────────────────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────────────────────┐
│                    SP™ BUILD (~10–20k CZK)                         │
│                                                                    │
│  Assessment + 10h školení (vibe coding, Cursor, agenti)            │
│  Pro pokročilejší, kteří chtějí stavět                             │
│  Jednou za 2 měsíce, menší skupina                                │
│  Cíl: Higher-ticket revenue, community lídři                       │
└────────────────┬───────────────────────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────────────────────┐
│                    SP™ COACH / AMBASSADOR (~50k CZK)               │
│                                                                    │
│  Certifikační program pro kouče a ambasadory                       │
│  Kohortový, delší (týdny), metodika + praxe + certifikát           │
│  Cíl: Škálování přes partnery do firem                             │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│                    B2B / ENTERPRISE                                 │
│                                                                    │
│  Team assessment + report + workshop                               │
│  Model A: Full service (my analyzujeme)                            │
│  Model B: Lokální (firma analyzuje, my benchmarkujeme)             │
│  Model C: Metodika licence (firma vše sama)                        │
│  Cíl: Hlavní revenue driver. Desítky–stovky tisíc za deal.        │
│  Reference: NN = 380k CZK / 300 lidí                              │
└────────────────────────────────────────────────────────────────────┘
```

### Priorita produktového vývoje (Q2)

1. **P0: Free assessment** — musí fungovat bezchybně, self-service
2. **P0: Paid report** — testovat pricing ($29–49), musí mít reálnou hodnotu
3. **P1: B2B assessment + team report** — pro stávající klienty (NN, Notino, Slovensko)
4. **P2: SP Foundation** — naplánovat první běh (květen/červen)
5. **P3: SP Build** — po ověření Foundation
6. **P3: SP Coach** — po ověření celého modelu

---

## 2. Jeden funnel, jeden směr

### 📝 Poznámky z meetingu (live)
- Rozhodnutí:
- Otázky:
- TODO:
- Poznámky z Wisprflow:

```
VŠECHNY kanály → JEDEN message → JEDEN CTA
                                      ↓
                            "Jaký jsi AI archetyp?"
                            → superpowered.pro
                                      ↓
                            Assessment START (hned, bez emailu)
                                      ↓
                            Email capture (až pro zobrazení výsledků)
                                      ↓
                            Výsledek + share card
                                      ↓
                        ┌─────────────┴─────────────┐
                        │                           │
                   B2C path                    B2B path
                        │                           │
              Paid report ($29-49)        Demo / pilot / workshop
                        │                           │
              Foundation / Build          Team rollout + coaching
                        │                           │
              Coach / Ambassador           Rozšíření + renewal
```

### Co to znamená pro každodenní marketing

| Dřív | Teď |
|------|-----|
| Promo na různé webináře | Každý webinář = "SP™ pro [téma]" |
| Newsletter = mix témat | Newsletter = SP™ newsletter s jedním CTA |
| Social = různé akce | Social = SP™ framework, archetypy, data |
| Emaily = ad hoc | Email sekvence = automatizovaný SP™ funnel |
| Kampaně na Edu, Aimee, events | Kampaně = free assessment, lead magnets + SP™ programy |

### Messaging hierarchy

1. **Primary (všude):** "Jaký jsi AI archetyp? Zjisti to zdarma." → Free assessment
2. **Secondary (nurture):** "Staň se Superpowered Professional" → Paid report / programy
3. **Tertiary (B2B):** "Změřte AI připravenost vašeho týmu" → B2B demo

### Flow: Lead magnety (prioritní vstup)

```
Ad / Social / Newsletter / Community
  │
  ▼
Lead magnet landing 
  │
  ├─ Testujeme: copy bloky + CTA + téma
  │
  ▼
Opt-in / micro-conversion
  │
  ├─→ Brevo segment + sekvence
  ├─→ Airtable lead
  └─→ Tracking v PostHog/GA4
  │
  ▼
CTA do free assessmentu
  │
  ▼
Assessment start (hned, bez emailu)
```

---

## 3. Marketing Engine — architektura

### 📝 Poznámky z meetingu (live)
- Rozhodnutí:
- Otázky:
- TODO:
- Poznámky z Wisprflow:

### Principy

1. **Code-based, Cursor-centric** — commands, rules, MCP servery. Verzované v gitu, sdílené pro celý tým.
2. **AI generuje, člověk rozhoduje** — AI navrhuje varianty, člověk vybere a schválí. AI formátuje a publishuje.
3. **Content as code** — emaily, posty, šablony, brand voice = soubory v git repu. Git = single source of truth.
4. **Sdílené pro celý tým** — stejné rules, skills, commands, MCP konfigurace pro každého. Jeden setup, jedna kvalita.

### Vrstvy engine

```
┌─────────────────────────────────────────────────────────────────┐
│                     👤 HUMAN LAYER                               │
│                                                                 │
│  Strategický směr │ Kreativní koncept │ Schválení │ Quality     │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                   🎛️  CONTROL LAYER (Cursor)                     │
│                                                                 │
│  Commands         Rules/Skills       MCP Servery    Agenti      │
│  /sp-campaign     brand-voice        Circle         Campaign    │
│  /sp-atomize      utm-gen            Brevo          Atomizer    │
│  /sp-newsletter   direct-copy        Web/API        Newsletter  │
│  /sp-publish      sp-assess          Meta           Dashboard   │
│  /sp-dashboard    atomizer           Upload Post               │
│  /brevo           newsletter         GitHub                    │
│  /upload-social   positioning                                  │
│                                                                 │
│  📁 Firemní Git repo = vše verzované a sdílené                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                   📝 CONTENT LAYER                               │
│                                                                 │
│  AI tvorba → Atomizace → Per-platform adaptace                  │
│  Brand voice auto │ UTM auto │ Vizuály z šablon │ SP™ CTA auto │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                   📤 DISTRIBUTION LAYER                          │
│                                                                 │
│  Email (Brevo) │ Social (Upload Post API) │ Circle │ Web (superpowered.pro + LP A/B) │
│  Paid (Meta, LinkedIn, Reddit, TikTok, X Ads) │ GitHub │ Slack notifikace              │
│                                                                 │
│  Unified publish: jeden approve → distribuce do všech kanálů    │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                   📊 INTELLIGENCE LAYER                          │
│                                                                 │
│  SP Dashboard (vibecodovaný, Vercel)                            │
│  Campaign metriky │ Content performance │ Slack report + GitHub + AI doporučení │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Flow: Free Assessment

### 📝 Poznámky z meetingu (live)
- Rozhodnutí:
- Otázky:
- TODO:
- Poznámky z Wisprflow:

Co potřebujeme, aby free assessment fungoval jako lead gen mašina.

### User journey

```
Člověk narazí na SP™ (social, NL, webinář, ad, doporučení)
  │
  ▼
superpowered.pro — "Jaký jsi AI archetyp?"
  │
  ▼
Assessment START — hned, bez emailu, bez bariéry
  (10 min, self-service)
  │
  ▼
Assessment HOTOVÝ — chce vidět výsledky
  │
  ▼
Email capture (jméno + email) — gate na výsledky
  │
  ├──→ Airtable (lead record + UTM zdroj + assessment data)
  ├──→ Brevo (kontakt + tagy: "sp-completed", "sp-{archetype}" + custom fields)
  ├──→ Brevo: spustí Post-assessment email sekvenci (= první sekvence vůbec)
  ├──→ Slack #sp-leads + #sp-completions
  │
  ▼
Výsledek: Archetyp + Top 3 Superpowers + Growth Edge + Share Card
  │
  ▼
Uživatel sdílí kartu na LinkedIn / social
  → viral loop → noví lidé na superpowered.pro
```

**Klíčové:** Email capture = assessment completion. Žádná Welcome sekvence "přijď udělat test" — uživatel test už udělal. Share card dostává už po FREE výsledku (viral loop). Soft upsell na paid musí být už od prvního touchpointu (result page + email #1), ale s hodnotou, ne hard sell.

→ **OVĚŘIT NA MEETINGU:** Platí, že assessment začíná bez emailu a email je gate až na výsledky?

### Co na to potřebujeme

| Co | Stav | Kdo | Priorita |
|----|------|-----|----------|
| Assessment self-service ready (start bez emailu) | Ověřit | TBD | P0 |
| Email capture gate na výsledky | Ověřit / implementovat | TBD | P0 |
| Lead capture → AT + Brevo + Slack | Nastavit (Make nebo vlastní) | TBD | P0 |
| Post-assessment email sekvence (4-5 emailů) | Vytvořit | TBD | P0 |
| Share card automatické generování | Existuje, doladit | TBD | P1 |
| Tracking (UTM, GA4 events) | Nastavit | TBD | P0 |

### Email sekvence: Post-assessment (= PRVNÍ sekvence po email capture)

| # | Den | Subject | Jádro | CTA |
|---|-----|---------|-------|-----|
| 1 | 0 | Tvůj výsledek: [Archetyp] | Shrnutí výsledku + co to znamená + link na detail. | Sdílet na LinkedIn |
| 2 | 1 | Sdílel/a jsi svůj výsledek? | Social sharing nudge + předvyplněný text. | Sdílet kartu |
| 3 | 3 | Co ti tvůj archetyp říká o tvém potenciálu | Archetyp deep-dive, superpowers, growth edge. | Prozkoumej svůj profil |
| 4 | 7 | Co kdybys věděl/a víc? | Teaser paid reportu — co navíc dostaneš (20 sub-kompetencí, custom instructions, agent setup). | Koupit full report |
| 5 | 21 | Tvoje AI skills se mění | Re-assessment nudge + co se změnilo v AI za poslední měsíc. | Udělat znovu |

---

## 5. Flow: Paid Report

### 📝 Poznámky z meetingu (live)
- Rozhodnutí:
- Otázky:
- TODO:
- Poznámky z Wisprflow:

### User journey

```
Uživatel má výsledky free assessmentu
  │
  ▼
Post-assessment email sekvence (email #4, den 7)
  + CTA na stránce výsledků (permanent upsell)
  + CTA v share card
  │
  ▼
Platba ($29–49, testovat pricing)
  │
  ├──→ Brevo: tag "sp-paid", spustí Paid sekvenci
  ├──→ Airtable: update status
  ├──→ Abra (účetní systém — jen placené)
  └──→ Slack #sp-revenue
  │
  ▼
Doručení paid reportu:
  → 20 sub-kompetencí detail
  → Personalizované custom instructions
  → Agent setup prompty
  → Certifikát
  → Learning path
  │
  ▼
Follow-up: upsell na Foundation / Build program / B2B
```

### Co na to potřebujeme

| Co | Stav | Kdo | Priorita |
|----|------|-----|----------|
| Paid report obsah (co přesně dostane uživatel) | Definovat | TBD | P0 |
| Platební flow (Stripe?) | Nastavit | TBD | P0 |
| Abra integrace (jen placené) | Nastavit | TBD | P1 |
| Paid follow-up email sekvence | Vytvořit | TBD | P1 |
| Pricing test na upsellu (po free completion) | Nastavit | TBD | P0 |

### Jak testovat cenu paid reportu bez chaosu

- **Pravidlo:** testovat max 2 varianty současně (ne 4).
- **Kde testujeme:** až po free completion (result page + post-assessment sekvence), ne v top-of-funnel akvizici.
- **Varianta A:** upsell cena 29.
- **Varianta B:** upsell cena 49.
- **Vyhodnocení:** conversion to paid, CAC, drop-off mezi completed → paid.
- **Disciplína:** při pricing testu neměnit zároveň messaging/offer strukturu.

---

## 6. Flow: SP™ Programy (Foundation / Build / Coach)

### 📝 Poznámky z meetingu (live)
- Rozhodnutí:
- Otázky:
- TODO:
- Poznámky z Wisprflow:

### SP™ Foundation (~5k CZK)

```
Promo kampaň (email + social + Circle + paid ads)
  │
  ▼
Registrace + platba
  │
  ├──→ Brevo: tag "sp-foundation", segment
  ├──→ Airtable: účastník record
  ├──→ Abra: fakturace
  ├──→ After-registration email (potvrzení + co čekat)
  ├──→ Reminder email: 1 den před
  └──→ Reminder email: 1 hodinu před
  │
  ▼
Workshop (3h online)
  Assessment + cowork + personalizované prompty
  │
  ▼
Follow-up:
  → Záznam + materiály
  → CTA: SP Build pro pokročilejší
  → Feedback form
  → Circle community pozvánka
```

### SP™ Build (~10–20k CZK)

Stejný flow jako Foundation, ale:
- Delší program (10h)
- Menší skupina
- Upsell → Coach / Ambassador
- Vyšší cena → silnější promo kampaň

### SP™ Coach / Ambassador (~50k CZK)

Stejný flow, ale:
- Kohortový program (týdny)
- Osobní certifikace
- Cíl: tito lidé pak školí ve firmách → škálování B2B

### Co na to potřebujeme (pro všechny programy)

| Co | Stav | Kdo | Priorita |
|----|------|-----|----------|
| After-registration email template | Vytvořit (auto-generovaný per akce) | TBD | P1 |
| 2 reminder emaily (1 den + 1h před) | Vytvořit template, automatizovat | TBD | P1 |
| Follow-up email po programu | Vytvořit | TBD | P1 |
| Promo kampaň flow (viz sekce 8) | Campaign Agent | TBD | P0 |
| Automatizace registrace: Brevo nebo AT? | Rozhodnout | TBD | P1 |

→ **ROZHODNOUT:** After-registration + reminders — zůstat na AT automatizacích (funguje to), nebo přesunout do Brevo (silnější, dá se řídit z Cursoru)?

---

## 7. Flow: Webináře & Events

### 📝 Poznámky z meetingu (live)
- Rozhodnutí:
- Otázky:
- TODO:
- Poznámky z Wisprflow:

Webináře = hlavní lead gen nástroj. Každý webinář je "SP™ pro [téma]".

### Webinář lifecycle

```
PŘÍPRAVA:
  /sp-campaign webinar "SP pro HR manažery" --datum 2026-04-22
    │
    Agent vygeneruje kompletní kampaň (viz sekce 8)
    │
    ▼
  Review + approve → /sp-publish

PROMO (2-3 týdny před):
  → Brevo: promo emaily (3× — announcement, reminder, last chance)
  → Social: posty per platforma (LI, IG, FB, X, Threads)
  → Circle: community post
  → Paid ads: pokud budget (Meta retargeting, LinkedIn B2B)

REGISTRACE:
  → After-registration email (potvrzení + co čekat)
  → Reminder: 1 den před
  → Reminder: 1 hodinu před

PO WEBINÁŘI:
  → Follow-up email (záznam + shrnutí + CTA assessment)
    = existující pipeline: transcript → /fupwebinar → /brevo → autopost
    (funguje dobře, kandidát na cron job)
  → Circle post (shrnutí + záznam)
  → Content atomizace z přepisu → social posty na 2-3 týdny
```

### Co na to potřebujeme

| Co | Stav | Kdo | Priorita |
|----|------|-----|----------|
| Campaign Agent (generuje kompletní promo) | Vytvořit | TBD | P0 |
| Follow-up pipeline | Funguje (transcript → fupwebinar → brevo → autopost) | — | Doladit detaily |
| After-registration + 2 reminders | AT automatizace fungují / přesunout do Brevo? | TBD | P1 |
| Content atomizace z přepisu | Existující atomizer, rozšířit o SP™ framing | TBD | P0 |

---

## 8. Flow: Kampaně (lead gen + assessment promo)

### 📝 Poznámky z meetingu (live)
- Rozhodnutí:
- Otázky:
- TODO:
- Poznámky z Wisprflow:

Tohle je srdce engine. Jeden command → kompletní kampaň.

### Dva typy kampaní

**A) Assessment promo kampaně** — cíl: přivést lidi přímo na free assessment
```
Messaging: "Jaký jsi AI archetyp? Zjisti zdarma."
Kanály: Social, newsletter, paid ads
CTA: superpowered.pro/test nebo přímo /assessment/start (direct-to-assessment ads)
```

**B) Lead gen kampaně** — cíl: přivést lidi přes hodnotný content (lead magnet, webinář)
```
Messaging: "AI Skills Map 2026" / "SP™ pro HR" / webinář
Kanály: Social, newsletter, paid ads, Circle
CTA: registrace / download → email capture → nurture → assessment
```

**Poznámka:** Top-of-funnel akvizice běží přes FREE vstupy (lead magnety + free assessment). Paid report je až upsell po free completion.

### Jak kampaň vzniká

```
/sp-campaign [typ] [název] --datum [datum]

  Campaign Agent přečte brief a vygeneruje:
  │
  ├─ 📧 Promo email
  │    ├─ text.md (pro review)
  │    └─ promo.html (brandovaný, s UTM)
  │
  ├─ 📱 Social posty
  │    ├─ linkedin.md
  │    ├─ instagram.md
  │    ├─ facebook.md
  │    ├─ x.md
  │    └─ threads.md
  │
  ├─ 🎨 Vizuály
  │    ├─ promo-1080x1080.png (feed)
  │    ├─ promo-1080x1920.png (story)
  │    └─ promo-1200x630.png (OG / email header)
  │
  ├─ 💬 Circle post
  │    └─ circle-post.md
  │
  ├─ 📧 After-registration email (template)
  │    └─ registration-confirm.html
  │
  ├─ ⏰ Reminder emaily (auto-generované templates)
  │    ├─ reminder-1d.html (den před)
  │    └─ reminder-1h.html (hodinu před)
  │
  ├─ 📧 Follow-up email (draft pro po akci)
  │    └─ follow-up-draft.md
  │
  └─ 📋 Checklist
       └─ campaign-checklist.md

  Uloženo v: content/campaigns/[datum]-[název]/
```

### Jak se kampaň publishne

```
Review + approve [člověk]
  │
  ▼
/sp-publish content/campaigns/[datum]-[název]/
  │
  ├─→ Brevo: nahraje promo email jako draft
  ├─→ Upload Post API: naplánuje social posty
  ├─→ Circle MCP: publikuje Circle post
  └─→ Slack: "#sp-marketing: Kampaň '[název]' připravena k odeslání"
```

---

## 9. Flow: Content & Social

### 📝 Poznámky z meetingu (live)
- Rozhodnutí:
- Otázky:
- TODO:
- Poznámky z Wisprflow:

### Content pipeline

```
ZDROJE (vstupy):
├─ Webinář přepisy
├─ Newsletter obsah
├─ Filipovy přednášky / talks
├─ Assessment data (anonymizovaná)
├─ SP™ metodologie (archetypy, skills, modes)
├─ Novinky z AI
└─ Klientské stories / testimonials

         │
         ▼

/sp-atomize [zdroj.md]
  Content Atomizer vezme 1 zdroj → vygeneruje:
  ├─ 3-5 LinkedIn postů (různé formáty)
  ├─ 2-3 Instagram captions + carousel texty
  ├─ X/Threads posty
  ├─ Newsletter snippet
  ├─ Email snippet
  └─ Návrhy vizuálů (popis pro generování)
  Každý výstup má SP™ CTA.

         │
         ▼

Review + approve [člověk]

         │
         ▼

/upload-social nebo /sp-publish
  → naplánuje a odešle na všechny platformy

         │
         ▼

Dashboard: co fungovalo → feedback do budoucí tvorby
```

### Content pilíře

| Pilíř | % | Příklady |
|-------|---|----------|
| **Archetyp Identity** | 30% | "Který AI archetyp jsi?", archetyp stories, quiz |
| **AI Skills & Superpowers** | 25% | Tipy propojené s 10 skills, "jak se zlepšit v X" |
| **Data & Insights** | 20% | "78% přeceňuje", statistiky z assessmentů, trendy |
| **Stories & Social Proof** | 15% | Příběhy uživatelů, before/after, leaderboard |
| **Metodika & Thought Leadership** | 10% | Behind the scenes, Filipovy insights |

---

## 10. Flow: Newsletter

### 📝 Poznámky z meetingu (live)
- Rozhodnutí:
- Otázky:
- TODO:
- Poznámky z Wisprflow:

### Jak newsletter vzniká

```
/sp-newsletter
  │
  Newsletter Agent připraví draft:
  │
  ├─ SP™ Insight (datový nugget / novinka)
  ├─ Archetyp spotlight (rotace 6 archetypů)
  ├─ Tip / prompt týdne (navázaný na skills)
  ├─ Aktuální program / webinář promo
  └─ CTA: free assessment
  │
  ▼
Výstup: text.md + newsletter.html
  │
  ▼
Review + approve [člověk]
  │
  ▼
/brevo → nahraje do Brevo jako draft → schedule

Uloženo v: content/emails/SP-newsletter/[datum]/
```

→ **ROZHODNOUT:** Standalone SP™ newsletter, nebo přetransformovat stávající Aibility newsletter?

---

## 11. AI agenti — detail

### 📝 Poznámky z meetingu (live)
- Rozhodnutí:
- Otázky:
- TODO:
- Poznámky z Wisprflow:

### Přehled

| # | Agent | Spouštění | Priorita |
|---|-------|-----------|----------|
| 1 | SP™ Campaign Agent | `/sp-campaign [typ] [název] --datum` | P0 |
| 2 | SP™ Content Atomizer | `/sp-atomize [zdroj.md]` | P0 |
| 3 | SP™ Newsletter Agent | `/sp-newsletter` | P1 |
| 4 | SP™ Dashboard Agent | `/sp-dashboard` (+ cron pondělí) | P1 |
| 5 | SP™ Vizuál Generator | `/sp-visual [typ] [brief]` | P1 |
| 6 | SP™ B2B Report Agent | `/sp-team-report [firma] [data]` | P1 |

### Agent 1: SP™ Campaign Agent (P0)

**Co dělá:** Z jednoho briefu vygeneruje kompletní kampaň — email, social posty, vizuály, Circle post, registration emaily, follow-up draft, UTM, checklist.

**Spouštění:** `/sp-campaign [typ] [název] --datum [datum]`

**Typy:**
- `webinar` — komplet promo pro webinář
- `program` — promo pro SP Foundation/Build/Coach
- `assessment` — promo kampaň na free assessment
- `lead-magnet` — promo pro lead magnet (ebook, quiz)
- `launch` — launch kampaň

**Čte:** brand-voice rule, UTM rule, email šablony, naming convention, CREATIVE-BRIEF.md

**Ukládá do:** `content/campaigns/[datum]-[název]/`

**Quick win verze:** Začít jen s generováním textu (email + social + Circle). Vizuály a unified publish přidat postupně.

### Agent 2: SP™ Content Atomizer (P0)

**Co dělá:** Vezme 1 zdrojový content → vygeneruje posty na všechny platformy s SP™ framingem.

**Spouštění:** `/sp-atomize [soubor.md]`

**Input:** Webinář přepis, článek, newsletter, přednáška, poznámky

**Output:**
- 3-5 LinkedIn postů (text, carousel outline, poll)
- 2-3 Instagram captions + carousel texty
- X/Threads posty
- Newsletter snippet
- Email snippet
- Návrhy vizuálů (popis pro generování)
- Pokud relevantní: 6× archetyp-specific variace

**Klíčové:** Každý výstup má SP™ CTA. Žádný post bez "Zjisti svůj AI archetyp" nebo ekvivalentu.

**Quick win verze:** Rozšířit existující content-atomizer skill o SP™ framing a automatické CTA.

### Agent 3: SP™ Newsletter Agent (P1)

**Co dělá:** Připraví kompletní SP™ newsletter — data, archetyp spotlight, tip, CTA.

**Spouštění:** `/sp-newsletter` (manuální) nebo cron

**Output:** Draft v markdown + HTML verze v `content/emails/SP-newsletter/[datum]/`

### Agent 4: SP™ Dashboard Agent (P1)

**Co dělá:** Sbírá data a generuje týdenní report.

**Spouštění:** Automaticky (cron pondělí ráno) nebo `/sp-dashboard`

**Sbírá z:** Airtable (leads), Brevo (email stats), PostHog/GA4 (traffic + eventy), Git (nové profily)

**Output:**
- Slack zpráva do #sp-marketing (klíčová čísla + doporučení)
- Zápis do vibecodovaného dashboard appky (Vercel)
- Markdown report do repa (historie a audit trail)

### Agent 5: SP™ Vizuál Generator (P1)

**Co dělá:** Generuje vizuály z šablon pro social posty a emaily.

**Spouštění:** `/sp-visual [typ] [text/brief]`

**Typy:** `promo-square`, `promo-story`, `og-image`, `carousel-slide`, `email-header`

**Tech:** Existující Banner Ad Tool / Social Visual Editor rozšířený o SP™ šablony + Puppeteer export

### Agent 6: SP™ B2B Report Agent (P1)

**Co dělá:** Generuje team-level report pro B2B klienty.

**Spouštění:** `/sp-team-report [firma] [data-folder]`

**Input:** Složka s individuálními assessment JSON soubory

**Output:**
- Team dashboard HTML (archetyp distribuce, průměrné skóre, skills gaps)
- Top performers identifikace
- Doporučení pro firmu
- Porovnání s benchmarkem

---

## 12. Automatizace & email sekvence

### 📝 Poznámky z meetingu (live)
- Rozhodnutí:
- Otázky:
- TODO:
- Poznámky z Wisprflow:

### Lead capture + assessment completion automatizace (P0)

Email capture a assessment completion probíhají současně — uživatel dá email až pro zobrazení výsledků (assessment už je hotový).

```
Trigger: Email capture na superpowered.pro (po dokončení assessmentu)
  │
  ├─→ Airtable: Create record (UTM fields + assessment data: score, archetype)
  ├─→ Brevo: Create/Update contact
  │     ├─ List: "SP Leads"
  │     ├─ Tags: ["sp-lead", "sp-completed", "sp-{archetype}", utm_campaign]
  │     ├─ Custom fields: SP_SCORE, SP_ARCHETYPE, TOP_SUPERPOWER
  │     └─ Trigger: Post-assessment email sekvence
  ├─→ Slack: #sp-leads + #sp-completions
  │
  Výsledek se ihned zobrazí na webu.

Implementace: Make scenario (jako u jiných produktů) NEBO vlastní automatizace
→ ROZHODNOUT na meetingu
```

### Platba automatizace (P1)

```
Trigger: Platba za paid report / program
  │
  ├─→ Brevo: tag "sp-paid" + příslušný segment
  ├─→ Airtable: update status
  ├─→ Abra: fakturace (JEN placené, ne free)
  └─→ Slack: #sp-revenue
```

### Registrace na akce automatizace (P1)

```
Trigger: Registrace na webinář / program
  │
  ├─→ After-registration email (automaticky)
  ├─→ Reminder: 1 den před (automaticky)
  └─→ Reminder: 1 hodinu před (automaticky)

Implementace: AT automatizace (funguje teď) NEBO Brevo flows (silnější)
→ ROZHODNOUT na meetingu
```

### Re-assessment nudge (P2)

```
Trigger: Cron (týdně)
  │
  ├─ Kontakty s "sp-completed" > 30 dní → email: "Tvoje AI skills se mohly změnit"
  └─ Nová verze metodologie → email blast: "Framework update"

Implementace: Brevo automation
```

### Přehled email sekvencí

| Sekvence | Trigger | Emailů | Platforma | Priorita |
|----------|---------|--------|-----------|----------|
| **Post-assessment** | Email capture (= dokončil assessment + dal email pro výsledky) | 5 (den 0-21) | Brevo | P0 |
| **Webinář registrace** | Registrace na webinář | 3 (potvrzení + 2 reminders) | AT nebo Brevo | P1 |
| **Webinář follow-up** | Po webináři | 1-2 | Brevo (existující pipeline) | Funguje |
| **Paid follow-up** | Koupil paid report | 2-3 | Brevo | P2 |
| **Re-engagement** | 30+ dní neaktivní | 3 | Brevo | P2 |

---

## 13. Kanály

### 📝 Poznámky z meetingu (live)
- Rozhodnutí:
- Otázky:
- TODO:
- Poznámky z Wisprflow:

### Kanálový plán

**LinkedIn (primární, 3-4× týdně)**
- Archetyp carousels (reusable, high engagement)
- Data insight posty (Dunning-Kruger angle, statistiky)
- Behind the scenes, methodology insights
- B2B angle (HR, L&D, team assessment)
- User stories (sdílené karty, testimonials)

**Instagram (3× týdně)**
- Archetyp karty (vizuálně silné, shareable)
- Stories: ankety, quiz, countdown
- Reels: 30-60s explainers

**X / Threads (3× týdně)**
- Zkrácené verze LinkedIn postů
- Quick insights, hot takes

**Newsletter (1× týdně nebo 2× měsíčně)**
- SP™ focused — data nugget, archetyp spotlight, tip, CTA

**Circle (per akce + 1× týdně organicky)**
- Community engagement, promo, recapy

**Webináře (1× měsíčně free, 1× za 2 měsíce placený)**
- Free: "Jak se stát SP" / "SP pro HR" / "SP v praxi"
- Placený: SP Foundation workshop

**Blog (2× měsíčně)**
- SEO content propojený s assessmentem

**Paid ads (multi-channel)**
- LinkedIn: B2B cílení, HR/L&D
- Meta: retargeting, lookalike audiences
- Reddit: niche komunity, high-intent témata
- TikTok: short-form explainer/test hooks
- X Ads: threads + thought leadership amplifikace

**Lead magnety (testovat víc variant, zjistit co táhne)**
- "AI Archetyp Quick Guide" — per archetyp: co to znamená, jak využít, 3 prompty. → CTA: full report
- "AI Skills Benchmark 2026" — data z assessmentů, kde stojí průměrný profesionál. → Hook: "Jsi nad nebo pod?"
- "5 AI Promptů pro tvůj workflow" — personalizované per archetyp. → CTA: zjisti svůj archetyp
- "Team AI Readiness Checklist" — B2B self-assessment pro firmy. → CTA: team assessment
- Možné další: mini e-book, interaktivní kalkulačka, video série...

### Kadence (cíl)

| Kanál | Frekvence | Kdo |
|-------|-----------|-----|
| LinkedIn | 3-4× týdně | TBD |
| Instagram | 3× týdně | TBD |
| X / Threads | 3× týdně | TBD |
| Newsletter | 1× týdně nebo 2× měsíčně | TBD |
| Circle | Per akce + 1× týdně | TBD |
| Blog | 2× měsíčně | TBD |
| Webinář | 1× měsíčně | TBD |

---

## 14. Sdílený tooling — commands, rules, MCPs

### 📝 Poznámky z meetingu (live)
- Rozhodnutí:
- Otázky:
- TODO:
- Poznámky z Wisprflow:

### Princip: Celý tým používá stejný setup

Všechno musí být ve firemním repu, sdílené, verzované. Každý člen týmu má:
- Stejné Cursor rules a skills → stejná kvalita AI výstupů
- Stejné commands → stejné workflow
- Stejnou MCP konfiguraci → přístup ke stejným službám

### Co vyladit, finalizovat a sdílet do firemního repa

Nejdřív vyladit (společně, ne sólo), pak teprve commitnout finální verze.

| Typ | Co | Kdo vyladí | Kde v repu | Priorita |
|-----|-----|-----------|-----------|----------|
| **Rules** | brand-voice (Aneta + Verča vyladit), utm-gen, sp-assess, naming-convention | TBD | `.cursor/rules/` | P0 |
| **Skills** | direct-response-copy (vyladit na SP™), content-atomizer (+ SP™ framing), newsletter, positioning-angles | TBD | `.cursor/skills/` | P0 |
| **Commands** | /sp-campaign, /sp-atomize, /sp-newsletter, /sp-publish, /sp-dashboard, /brevo, /upload-social + co dalšího tým potřebuje? | TBD | `.cursor/commands/` | P0 |
| **MCP config** | Stávající + nové: Circle, Brevo, Upload Post, GitHub, Airtable, Slack, Stripe, PostHog, GA4, LinkedIn, Reddit/TikTok/X ads konektory, HeyGen... | TBD | `.cursor/mcp.json` | P0 |
| **Templates** | Email šablony, social post formáty, vizuál šablony, ad kreativy | TBD | `templates/` | P1 |
| **Brand assets** | Archetyp vizuály, certifikáty, badges, loga | TBD | `brand/` | P1 |

### Co kdo používá teď

| Kdo | Nástroje / commands / MCPs | Typický workflow | Co mu chybí |
|-----|---------------------------|------------------|-------------|
| _______ | | | |
| _______ | | | |
| _______ | | | |
| _______ | | | |
| _______ | | | |

Každý člen týmu doplní svůj stack a workflow asynchronně.

---

## 15. Dashboard & reporting

### 📝 Poznámky z meetingu (live)
- Rozhodnutí:
- Otázky:
- TODO:
- Poznámky z Wisprflow:

Žádné tabulky. Rovnou vibecodovaný dashboard.

### Co dashboard ukazuje

**Hlavní čísla (viditelná okamžitě):**
- Nové leads tento týden (vs minulý)
- Dokončené assessmenty tento týden
- Newsletter subscribers (delta)
- Web traffic (sources)
- Revenue (paid assessments + programy + B2B)

**Detail sekce:**
- Email metriky: open rate, CTR, nové kontakty per sekvence
- Social metriky: engagement per platforma per post
- Campaign overview: aktivní kampaně, spend, výsledky
- Funnel: leads → assessment started → completed → paid → shared
- B2B pipeline (pro přehled, detailní správu řeší Žaneta)

### Data zdroje

| Zdroj | Co | API |
|-------|-----|-----|
| Airtable | Leads, deals, pipeline | Airtable API |
| Brevo | Email stats, kontakty, tagy | Brevo API |
| PostHog | Produktové eventy, funnel drop-off, cohorty | PostHog API |
| GA4 / Plausible | Web traffic, sources, events | GA4 API / Plausible API |
| GitHub | Leaderboard profily, content commits | GitHub API |
| Meta Ads | Ad spend, impressions, conversions | Meta Marketing API |
| LinkedIn Ads | Ad spend, impressions, conversions | LinkedIn API |

### Tech a reporting

- **Frontend:** Next.js / React na Vercel
- **Data:** API calls do zdrojů, cache/refresh interval
- **Auth:** Jednoduchý login
- **Deploy:** Vercel
- **Slack bot:** Týdenní report (doporučeně pátek) do #sp-marketing + link na dashboard
- **Report archiv:** Markdown report commit do repa (např. `marketing-wiki/sp-weekly/`)
- **AI vrstva:** OpenRouter nad daty → automatické "co fungovalo / co ne / co vyladit"

→ **ROZHODNOUT:** Kdo vibecoduje? Co je MVP? Který den reportu chceme (pátek vs pondělí)?

---

## 16. Tracking stack

### 📝 Poznámky z meetingu (live)
- Rozhodnutí:
- Otázky:
- TODO:
- Poznámky z Wisprflow:

Musí být nastavený PŘED kampaněmi.

- [ ] GTM container na superpowered.pro
- [ ] GA4 property + custom events
- [ ] PostHog event tracking (primární analytika produktu)
- [ ] Meta Pixel + CAPI (pro retargeting)
- [ ] LinkedIn Insight Tag (pro B2B retargeting)
- [ ] Plausible jako backup (privacy-friendly)
- [ ] Conversion events definovat:
  - `assessment_started`
  - `assessment_completed`
  - `email_captured`
  - `card_shared`
  - `paid_purchased`
  - `program_registered`
- [ ] UTM naming convention (dle existující Aibility konvence)
- [ ] Tracking schema: co se propisuje do AT, Brevo, PostHog, GA4 (eventy, fieldy, tagy)
- [ ] Event taxonomy: jednotné názvy eventů/kampaní/source-medium

---

## 17. B2B motion

### 📝 Poznámky z meetingu (live)
- Rozhodnutí:
- Otázky:
- TODO:
- Poznámky z Wisprflow:

B2B řeší primárně Žaneta. Marketing dodává:

### B2B marketing support

| Co | Stav | Kdo | Priorita |
|----|------|-----|----------|
| Enterprise one-pager (PDF) | Vytvořit | TBD | P1 |
| Sample team report (anonymizovaný) | Vytvořit (B2B Report Agent) | TBD | P1 |
| Case study template | Vytvořit (po prvním pilotu) | TBD | P2 |
| LinkedIn Ads (HR/L&D cílení) | Nastavit | TBD | P2 |
| B2B email sekvence (po demo callu) | Vytvořit v Brevo | TBD | P2 |

### B2B sales flow (pro kontext)

```
1. Identifikace → Žaneta + tým networking + inbound
2. Kvalifikace → Jaká firma, kolik lidí, rozpočet
3. Demo → Ukázka assessmentu + sample team reportu
4. Pilot → 10-20 lidí → team report
5. Proposal → "Tady jste, tady můžete být"
6. Rollout → Celá firma/divize
7. Follow-up → Re-assessment za 3 měsíce, rozšíření
```

---

## 18. Action plan

### 📝 Poznámky z meetingu (live)
- Rozhodnutí:
- Otázky:
- TODO:
- Poznámky z Wisprflow:

Všechno paralelně, AI-first, think big. Nejdřív si říct co a jak, pak jet.

### KROK 0: Zmapovat a rozhodnout

Než cokoliv stavíme nebo sdílíme, musíme vědět co máme a co chceme:

- [ ] **Zmapovat celý tým** — co kdo používá, jaké nástroje, jaký workflow, jaké MCPs, co funguje, co ne (asynchronně doplnit tabulku v sekci 14)
- [ ] **Zvizualizovat aktuální procesy** — jak teď reálně probíhá kampaň, content, webinář, lead gen — celý tým, ne jen jeden člověk
- [ ] **Rozhodnout co nechat, co vyhodit, co přidat** — které nástroje, automatizace, MCPs, procesy dávají smysl pro SP™ engine
- [ ] **Nakreslit cílový stav** — jak to bude fungovat s agenty, automatizacemi, sdíleným repem (základ je v tomhle dokumentu, upřesnit na meetingu)
- [ ] **Rozdělit ownership** — kdo co vlastní, kdo co staví (sekce 19)

### 🔴 QUICK WINS — udělat ASAP (hodiny práce, obrovský dopad)

**Engine — vyladit a sdílet (NE jen přesunout, ale finalizovat):**
- [ ] **Brand voice** — Aneta + Verča sednou a vyladí. Finální verze → firemní git.
- [ ] **Direct-response copy skill** — projít, doladit na SP™ kontext. Finální verze → git.
- [ ] **Content atomizer** — rozšířit o SP™ framing, CTA, archetyp variace. → git.
- [ ] **UTM + naming convention** — zkontrolovat, rozšířit pro SP™. → git.
- [ ] **MCP audit** — zjistit jaké MCPs existují v celém týmu (ne jen stávající), co ještě můžeme napojit. Vytvořit sdílenou konfiguraci.
- [ ] **Commands audit** — co existuje, co chybí, co jde hned udělat.

**Agenti — stavět okamžitě:**
- [ ] **Content Atomizer v1** — SP™ framing + automatické CTA + archetyp variace. Hotový za odpoledne.
- [ ] **Campaign Agent v1** — z briefu generuje kompletní textový balíček (email + social + Circle + follow-up). Přidat postupně: vizuály, unified publish.

**Analytika — musí být PŘED jakoukoliv kampaní:**
- [ ] GTM container na superpowered.pro
- [ ] GA4 + custom events (`assessment_started`, `assessment_completed`, `email_captured`, `paid_purchased`, `card_shared`)
- [ ] Meta Pixel + CAPI
- [ ] LinkedIn Insight Tag
- [ ] Plausible jako backup

**Content:**
- [ ] **Content sprint** — vzít VŠECHNO co máme (5 EN blog postů, assessment metodologie, 6 archetypů, 10 superpowers, 4 AI modes, webinář přepisy, kreativní brief) a atomizovat:
  - LinkedIn posty (text, carousels, polls, personal stories, data hooks)
  - Instagram (archetyp karty, reels skripty, story templates, carousel vizuály)
  - X/Threads (quick takes, hot takes, threads)
  - → Cíl: mít 4-6 týdnů content nachystaného PŘEDEM
- [ ] **Vizuály a storytelling** — ne jen text. Archetyp vizuály, "before/after" AI skills, ukázky výsledků (anonymizované), infografiky z dat. Lidé chtějí VIDĚT jak to vypadá.
- [ ] **Video content** — krátká videa: "Co je tvůj AI archetyp?", ukázka assessmentu, reaction na výsledky. HeyGen/Synthesia nebo Remotion pro animace.
- [ ] **Interaktivní content** — mini quiz na stories ("Poznáš svůj archetyp?"), ankety, "guess your score"

**Lead magnety — víc, kreativnější, testovat co funguje:**
- [ ] **Lead magnet 1: "AI Archetyp Quick Guide"** — pro každý archetyp: co to znamená, jak to využít, 3 prompty na míru. Návaznost: "chceš full report? → paid assessment"
- [ ] **Lead magnet 2: "AI Skills Benchmark 2026"** — data z assessmentů (anonymizovaná): kde stojí průměrný profesionál, kde jsou největší gapy. Hook: "Jsi nad nebo pod průměrem?"
- [ ] **Lead magnet 3: "5 AI Promptů, které změní tvůj workflow"** — per archetyp personalizované. Hook: "Zjisti svůj archetyp → dostaneš prompty na míru."
- [ ] **Lead magnet 4: "Team AI Readiness Checklist"** — pro B2B. Firma si může sama zhodnotit, kde jsou. CTA: "Chcete přesná data? → team assessment."
- [ ] Testovat všechny 3-4 varianty → zjistit co lidi táhne

**Free assessment flow — připravit kompletně:**
- [ ] Celá user journey od A do Z: landing → start (bez emailu) → assessment → email gate → výsledky → share card → email sekvence → paid upsell
- [ ] Copy pro každý krok (landing page, assessment intro, email gate, výsledková stránka, share CTA)
- [ ] Share card design a mechanika (předvyplněný LinkedIn post, OG tagy)
- [ ] Retargeting audiences (kdo začal a nedokončil, kdo dokončil a nekoupil paid)

### 🟡 PŘIPRAVIT PRO LAUNCH — paralelně

**Priorita #1 bez závislosti na dalších lidech:** Assessment + Lead magnety (to můžeme pustit sami ASAP).

**Lead flow:**
- [ ] SP™ lead flow (AT + Brevo + Slack) — Make nebo vlastní automatizace
- [ ] Brevo list "SP Leads" + custom attributes + segmenty
- [ ] Slack kanály pro notifikace

**Email sekvence:**
- [ ] Post-assessment sekvence v Brevo (5 emailů) — texty, flow, A/B subject lines
- [ ] After-registration + 2 reminder templates
- [ ] Upsell pricing test na paid reportu (29 vs 49) po free completion

**Kampaně připravit (i bez finálního GO):**
- [ ] Assessment promo kampaň — kompletní balíček (email + social per platforma + Circle + vizuály + paid ad kreativy)
- [ ] Lead magnet promo kampaně (per magnet — testovat)
- [ ] Landing A/B test: minimálně 2 landing varianty (copy + layout)
- [ ] Experiment: direct-to-assessment ads (klik z reklamy rovnou do testu)
- [ ] První free webinář naplánovat + promo materiály

**Dashboard:**
- [ ] Vibecodovat MVP dashboard (Next.js + Vercel)
- [ ] Hlavní čísla: leads, assessmenty, revenue, traffic, email metriky, social engagement

**Produkt (ověřit s týmem):**
- [ ] Free assessment ready? Start bez emailu, email gate na výsledky?
- [ ] Paid report — co přesně, pricing, platební flow

### 🟢 PO LAUNCH — iterovat a škálovat

**Engine:**
- [ ] Newsletter Agent
- [ ] Vizuál Generator (SP™ šablony + auto-export)
- [ ] Unified publish (`/sp-publish`)
- [ ] B2B Report Agent

**Kampaně:**
- [ ] LinkedIn Ads (B2B)
- [ ] Meta retargeting
- [ ] Další webináře
- [ ] SP Foundation promo

**Content systém:**
- [ ] Pravidelný publishing na všech kanálech
- [ ] SP™ newsletter
- [ ] Blog / SEO

**Email:**
- [ ] Paid follow-up sekvence
- [ ] Re-engagement sekvence

### Co musí být ready pro první kampaň

- [ ] Assessment self-service ready (start bez emailu, email gate na výsledky)
- [ ] Lead flow funguje: email capture → AT + Brevo + Slack
- [ ] Post-assessment email sekvence v Brevo (alespoň 3 emaily)
- [ ] Tracking: GTM + GA4 + PostHog + Meta Pixel na superpowered.pro
- [ ] UTM parametry
- [ ] Content ready: promo email + social posty per platforma + Circle post + vizuály
- [ ] Landing / výsledková stránka na superpowered.pro funkční
- [ ] Share card mechanika funguje (OG tagy, LinkedIn preview)
- [ ] Alespoň 1 lead magnet ready

### Revenue milestones (cíle pro Q2)

- [ ] 500+ dokončených free assessmentů
- [ ] 40+ paid reportů
- [ ] 2+ B2B piloty
- [ ] SP Foundation #1 proběhl
- [ ] Pravidelný content publishing běží
- [ ] Dashboard live, weekly Slack report + AI doporučení

### Revenue model (doplnit čísla a průběžně přepočítávat)

| Metrika | Vzorec | Naše číslo |
|--------|--------|------------|
| **CPL** | Spend / Leads | ____ |
| **Assessment completion rate** | Completed / Started | ____ |
| **Paid conversion rate** | Paid / Completed | ____ |
| **CAC** | Spend / Paid customers | ____ |
| **Revenue** | Paid customers × cena reportu + další produkty | ____ |
| **Churn / drop-off** | Opuštění mezi kroky funnelu | ____ |

Použít tento model pro plánování: kolik leadů potřebujeme, jaký budget dává smysl, kdy pustit další akce.

---

## 19. Ownership

### 📝 Poznámky z meetingu (live)
- Rozhodnutí:
- Otázky:
- TODO:
- Poznámky z Wisprflow:

Tato sekce zůstává záměrně otevřená (pro komentáře/doplnění v live verzi).

### Ownership by task (doplnit)

- [ ] Engine & agenti
- [ ] Tracking & analytics
- [ ] Paid ads channels
- [ ] Lead magnet production
- [ ] Assessment campaign
- [ ] Email sekvence
- [ ] Dashboard & reporting
- [ ] Content distribution

**Poznámka:** Jména doplnit později do sdílené/live verze dokumentu.
---

## 20. Otevřené otázky

### 📝 Poznámky z meetingu (live)
- Rozhodnutí:
- Otázky:
- TODO:
- Poznámky z Wisprflow:

### Tým & tooling

1. Co používá každý člen týmu? Zmapovat commands, MCPs, skills, nástroje.
2. Co dát do firemního repa hned? (rules, skills, commands, MCP config)
3. SP™ lead flow — Make (jako u jiných produktů) nebo vlastní automatizace?

### Engine & procesy

4. After-registration + reminders — zůstat na AT, nebo přejít na Brevo?
5. Newsletter — standalone SP™, nebo přetransformovat stávající Aibility NL?
6. Content kalendář — kde ho vést? Git, AT, nebo dashboard?

### Produkt

7. Free assessment — je self-service ready?
8. Paid report — co přesně je v něm navíc? Za kolik? ($29 vs $49)
9. SP Foundation — kdy první běh? Co je obsah?

### Revenue & budget

10. Paid ads budget — rozhodnout podle modelu (CPL, CAC, conversion rate), ne pocitově
11. Jaké minimum leadů/paid potřebujeme týdně, aby to dávalo revenue smysl?
12. Road show — kdo, kolik měst, kdy?

### Growth experimenty

13. Direct-to-assessment ads: umíme technicky poslat lidi z reklamy rovnou do testu?
14. Landing A/B pro FREE akvizici: jak přesně nastavíme test design (max 2 varianty)?
15. Pricing A/B pro PAID upsell: kde přesně testujeme (result page vs email), jak dlouho a podle čeho vyhodnocujeme?

### Ownership

16. Kdo vlastní engine stavbu? (agenti, commands, pipeline)
17. Kdo vibecoduje dashboard?


