# Auto Follow-up Webinar Command

Když uživatel napíše **"autofup"** nebo **"/autofup"**, spustí automatické generování follow-up emailů z nových přepisů webinářů.

## Co to dělá

1. Spustí GitHub Action `Generate Webinar Follow-up` v repu `anetalizancova/aibility-marketing-brain`
2. Action zkontroluje `aibilitycz/content/prepisy-webinaru-edu/` na nové přepisy
3. Pro každý nový přepis:
   - Stáhne přepis z GitHubu
   - Najde odkazy (YouTube, podcast, materiály) v Airtable
   - AI extrahuje klíčové body
   - Vygeneruje follow-up email (.md + .html)
   - Commitne do `content/emails/Webinars/`
   - Pošle Slack notifikaci

## Použití

### Zpracovat všechny nové přepisy:

```bash
gh workflow run generate-follow-up.yml --repo anetalizancova/aibility-marketing-brain
```

### Zpracovat konkrétní přepis:

```bash
gh workflow run generate-follow-up.yml --repo anetalizancova/aibility-marketing-brain -f transcript_file="03_Název webináře - DD.MM.YYYY přepis.md"
```

### Znovu zpracovat už zpracovaný přepis:

```bash
gh workflow run generate-follow-up.yml --repo anetalizancova/aibility-marketing-brain -f force=true
```

### Sledovat průběh:

```bash
gh run watch --repo anetalizancova/aibility-marketing-brain
```

## Workflow

1. Uživatel napíše `autofup` → spustí se příkaz
2. Pokud uživatel specifikuje název přepisu, použije se `-f transcript_file="..."`
3. Po spuštění se zobrazí odkaz na Action run
4. Po dokončení se soubory objeví v `content/emails/Webinars/`

## Příklady

- `autofup` → zpracuje všechny nové přepisy
- `autofup 03_Vibe coding v praxi – 10.3.2026 přepis.md` → zpracuje konkrétní přepis
- `autofup --force` → znovu zpracuje i už zpracované
