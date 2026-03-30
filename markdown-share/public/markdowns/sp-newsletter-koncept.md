# Superpowered Weekly — Koncept newsletteru

> Verze: 30. 3. 2026 | Status: Draft ke schválení

---

## Proč jeden newsletter, ne dva

Inspirace z researche:

**Every.to** začínali jako bundle 13 separátních newsletterů. Nefungovalo to. Přešli na jeden unified newsletter s různými "columns" (Chain of Thought, Napkin Math, Context Window, Vibe Check) — ale pořád jeden email od jedné značky. Dnes mají $1.2M+ ARR a 100k+ subscriberů.

**Gallup/CliftonStrengths** dělá: (1) personalizovanou onboarding sekvenci po assessmentu, a (2) jeden obecný CliftonStrengths Insights Newsletter pro všechny (142k subscriberů). Ne dva newslettery — jeden newsletter + jedna automatizace.

**Poučení:** Nedělejte dva newslettery. Dělejte jeden newsletter + chytré automatizace.

---

## Architektura: 1 newsletter, 3 vrstvy

```
VRSTVA 1: AUTOMATIZACE (trigger-based, jednorázové)
├── Post-lead-magnet nurture (4 emaily / 10 dní)
├── Post-assessment onboarding (Tomáš, 7 emailů / 14 dní)
└── Reassessment reminder (kvartálně)

VRSTVA 2: NEWSLETTER (1x týdně, pro celou bázi)
├── Sdílený obsah (80–90 %)
└── Podmíněný blok v Brevo (10–20 %)
    ├── BEZ archetypu → "Zjisti svůj archetyp" CTA
    └── S archetypem → personalizovaný tip + reassessment CTA

VRSTVA 3: OBČASNÉ KAMPANĚ (ad-hoc, mimo NL)
├── Launch programu (Foundation / Build)
├── Event pozvánky (webináře, AI Morning Show)
└── Speciální akce (Product Hunt, milestones)
```

Po dokončení jakékoli automatizace z Vrstvy 1 člověk "spadne" do týdenního newsletteru a dostává ho dál.

Dva newslettery = 2x produkce obsahu, 2x unsub raty, 2x open raty, dvě značky v hlavě. Jeden s podmíněnými bloky = 80 % úspora práce, stejný efekt.

---

## Segmenty v jednom emailu

| Segment | Odkud přišli | Co dostanou | CTA v podmíněném bloku |
|---------|-------------|-------------|------------------------|
| Starý NL subscriber | Existující báze | Newsletter + blok A | Udělej si assessment |
| Lead magnet subscriber | Stáhli PDF / cheat sheet | Nejdřív nurture, pak NL + blok A | Udělej si assessment |
| Post-assessment FREE | Udělali Spark | Nejdřív onboarding, pak NL + blok B | Upgrade na Full / reassessment |
| Post-assessment PAID | Koupili Full Profile | Onboarding + NL + blok B | Program Foundation / Build |

---

## Struktura jednoho vydání

### Název: Superpowered Weekly (pracovní)
Alternativy: SP Pulse, AI Superpowers, The AI Edge

### Frekvence: 1x týdně, fixní den (středa nebo čtvrtek)
Konzistence > frekvence. Lepší pravidelný průměrný než nepravidelný skvělý.

### Délka: Max 5 minut čtení

---

### 1. SP INSIGHT (stálá rubrika — náš "Napkin Math")

Jeden datový nugget z assessmentu, z komunity nebo z AI světa. 3–5 vět, konkrétní číslo + co to znamená.

Příklady:
- "Z prvních 500 lidí, kteří si udělali assessment, je 43 % Navigátorů. Nejméně častý archetyp? Pioneer (7 %). To dává smysl — systémové myšlení s AI je zatím vzácné."
- "Lidé, kteří skórují vysoko v práci s nástroji, často skórují nízko v Super Perception. Plynulost v rozhraní ≠ AI-first mindset."
- "88 % zaměstnanců nemá žádné AI školení. Přitom 67 % z nich si myslí, že AI umí."

Tohle je naše unikátní zbraň — proprietární data, která žádný jiný český newsletter nemá.

---

### 2. HLAVNÍ OBSAH (rotující formáty — náš "Chain of Thought")

Každý týden JEDEN z těchto formátů (ne všechny najednou):

| Týden | Formát | Příklad |
|-------|--------|---------|
| 1 | **Build story** (z praxe Aibility) | "Jak jsme za 47 minut postavili generátor bannerů" |
| 2 | **AI mindset esej** (myšlenkový kus — Verča, občas) | "Proč plynulost v rozhraní není totéž co AI-first mindset" |
| 3 | **Chlubírna** (community showcase) | "3 věci, které tento týden vytvořili lidi z komunity" |
| 4 | **Tool / workflow** (praktický tip) | "Cursor + Claude: workflow, který používáme každý den" |

Ne celý článek — highlight + kontext + proč je to důležité + odkaz na plnou verzi (na blogu). Esejový formát není povinný každý týden — jen když Verča má téma. Inspirace Every.to: osobní tón, konkrétní situace, ne abstrakce.

---

### 3. OD NÁS ZE SLACKU (2–3 krátké položky)

Tohle NENÍ "AI novinky." Je to náš interní inspirace kanál — co nás zaujalo, co jsme si poslali, co doporučujeme. Nemusí to být nové, musí to být užitečné.

- Tip na nástroj, který jsme objevili (ne nutně "nový" — prostě něco, co funguje)
- Zajímavý článek / video / thread + proč to stojí za pozornost
- Postřeh z praxe ("Všimli jsme si, že když AI dáte kontext v markdownu místo plain textu, výstupy jsou výrazně lepší")
- Novinka, pokud je fakt relevantní — ale nejsme na ní závislí
- Use case od někoho z týmu ("Aneta tento týden nechala AI napsat 6 variant subject line a ta nejlepší měla 48 % open rate")

Formát: **Bold headline** + 1–2 věty. Jako by vám kolega přeposlal link a napsal "mrkni na tohle."

---

### 4. PODMÍNĚNÝ BLOK (Brevo dynamic content — tady je ta magie)

**Varianta A — pro lidi BEZ archetypu** (nemají tag `sp-archetype-*`):

> 🎯 ZJISTI SVŮJ AI ARCHETYP
>
> Který ze 6 archetypů jsi ty?
> Navigator, Builder, Catalyst, Architect, Amplifier nebo Pioneer?
>
> [10 minut, zdarma →]

**Varianta B — pro lidi S archetypem** (personalizovaný):

> ⚡ PRO TVŮJ ARCHETYP: NAVIGATOR
>
> Navigátoři tento týden: Zkus dát AI přístup k celému projektu,
> ne jen k jednotlivým úkolům. Tvoje superschopnost Super Perception
> ti umožňuje vidět, kde AI přinese největší hodnotu.
>
> [Podívej se, jak se tvůj profil změnil → Reassessment]

Technicky: Brevo dynamic content block, IF has tag `sp-assessed` → blok B, ELSE → blok A. Personalizaci per archetyp (6 variant bloku B) můžeme přidat postupně — ze začátku stačí jeden obecný "assessed" blok.

**Game changer varianta na později:** Newsletter dostanete JENOM po assessmentu. "Personalizovaný AI newsletter na základě vašeho profilu." To je sám o sobě lead magnet. (Ale to až fáze 2.)

---

### 5. PATIČKA (stálá, vždy stejná)

- "Superpowered Weekly — pro lidi, kteří chtějí s AI pracovat líp, ne jen víc."
- Social links, unsubscribe

---

## Rotace formátů — měsíční plán

| Týden | Hlavní obsah | Od nás ze Slacku | SP Insight |
|-------|-------------|-------------------|------------|
| 1 | Quick tip / workflow z praxe | 2–3 položky | ✓ |
| 2 | Build story / chlubírna | 2–3 položky | ✓ |
| 3 | Quick tip / workflow z praxe | 2–3 položky | ✓ |
| 4 | Esejový článek (pokud je) NEBO use case kompilace | 2–3 položky | ✓ |

SP Insight + Od nás ze Slacku + podmíněný blok je v KAŽDÉM vydání.

---

## Subject lines — přístup

Vždy konkrétní, nikdy generické. Tři typy:

1. **Datový hook:** "78 % lidí přeceňuje své AI dovednosti"
2. **Praktický tip:** "Řekněte AI, jaký nástroj má použít — jinak si vybere sama"
3. **Kontroverzní tvrzení:** "Prompt engineering není skill budoucnosti"

Nikdy: "Newsletter #7" / "Novinky z Aibility" / "Co je nového v AI"

---

## Chlubírna ze Slacku — tři způsoby zapojení

1. **Jako formát hlavního obsahu** (1x za měsíc) — "3 věci, které tento měsíc vytvořili lidi z komunity" s krátkým příběhem ke každé

2. **Jako quick bite v "Od nás ze Slacku"** (1x za 2 týdny) — jeden nejlepší use case, 2 věty, hotovo: "Adam z komunity si postavil AI agenta, který mu skenuje trh. Za 20 minut."

3. **Jako sociální důkaz v podmíněném bloku A** — "Tohle všechno vytvořili lidi, kteří znají svůj archetyp. [Zjisti ten svůj →]"

---

## Automatizace (odděleně od newsletteru)

Trigger-based sekvence, které běží jednou a pak skončí:

### Post-lead-magnet nurture (4 emaily / 10 dní)
- Den 2: Hodnota navázaná na lead magnet + soft assessment zmínka
- Den 5: "Co odlišuje lidi, kteří AI fakt využívají" + assessment CTA
- Den 7: Social proof (čísla z assessmentu, příběh)
- Den 10: Poslední šance — přímý assessment CTA
- Pokud udělají assessment → stop, přesuň do post-assessment sekvence

### Post-assessment onboarding (Tomáš, 7 emailů / 14 dní)
- Personalizované podle archetypu
- V přípravě

### Reassessment reminder (kvartálně)
- "Tvůj profil je 3 měsíce starý. Posunul ses?"
- Jeden email, trigger: 90 dní od posledního assessmentu

---

## Co z toho dělá newsletter, který lidi CHTĚJÍ odebírat

| Every.to princip | Náš ekvivalent |
|---|---|
| **Columns s jasnou identitou** (Chain of Thought, Napkin Math, Vibe Check) | **SP Insight** (data), **hlavní obsah** (rotující formáty), **Od nás ze Slacku** (inspirace) |
| **Osobní tón, ne firemní broadcast** | Brand voice: "autoritativní průvodce", ne "my v Aibility" |
| **Praktická hodnota** ("How to Build Your Own Bloomberg Terminal With AI") | **Build stories** a **workflow tipy** — "tohle použiju zítra ráno" |
| **Proprietární produkty jako bonus** (Spiral, Cora, Sparkle) | **Assessment + personalizovaný blok** jako bonus pro subscribery |
| **Konzistence** (5x týdně!) | **1x týdně**, ale vždy ve stejný den, vždy stejná struktura |

Hlavní důvody k odběru:
1. **Proprietární data** (SP Insight) — tohle jinde nedostanete
2. **Praktická hodnota** — tipy, co můžete zkusit hned, ne teorie
3. **Autenticita** — sdílíme, co nás baví a co fakt používáme
4. **Pocit komunity** — chlubírna, use casy z praxe, lidi kolem vás dělají cool věci
5. **Personalizace** (po assessmentu) — pocit, že to je "pro mě"

---

## Technické požadavky (Brevo)

- [ ] Tagy: `sp-archetype-navigator`, `sp-archetype-builder`, `sp-archetype-catalyst`, `sp-archetype-architect`, `sp-archetype-amplifier`, `sp-archetype-pioneer`
- [ ] Boolean tag: `sp-assessed` (true/false)
- [ ] Tag zdroje: `sp-lead-lm` (lead magnet), `sp-lead-nl` (newsletter signup), `sp-lead-old` (stará báze)
- [ ] Dynamic content blok v šabloně: IF `sp-assessed` = true → blok B, ELSE → blok A
- [ ] Šablona s fixní strukturou (SP Insight, hlavní obsah, Od nás ze Slacku, podmíněný blok, patička)

---

## První kroky

1. Schválit strukturu a název
2. Nastavit tagy v Brevo
3. Vytvořit HTML šablonu s podmíněným blokem
4. Napsat 1. vydání (draft)
5. Poslat re-intro email staré bázi: "Měníme newsletter. Tady je, co čekat."
6. Launch
