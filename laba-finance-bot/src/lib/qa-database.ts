import type { QAEntry } from "./types";

function extractContacts(answer: string): string[] {
  const contacts: string[] = [];
  const lower = answer.toLowerCase();
  if (lower.includes("natalie") || lower.includes("natálie"))
    contacts.push("natalie");
  if (lower.includes("michaela")) contacts.push("michaela");
  return contacts;
}

function qa(
  id: string,
  question: string,
  answer: string,
  category: QAEntry["category"],
  alts: string[] = []
): QAEntry {
  return {
    id,
    question,
    alternativeQuestions: alts,
    answer,
    category,
    contacts: extractContacts(answer),
    source: "base",
  };
}

export const BASE_QA: QAEntry[] = [
  qa(
    "refund-check",
    "Byl tady refund? Proběhl tady refund? Byl provedený refund?",
    "1. Zkontroluj Deal stage v HubSpot.\n2. Pro ověření kontaktuj Natalie Misova.",
    "refundy",
    ["Proběhl refund?", "Byl proveden refund?", "Udělal se refund?"]
  ),
  qa(
    "fakturacni-udaje-uhrazeno",
    "Můžeš změnit fakturační údaje, i když je proforma uhrazená?",
    "Ano, v některých případech to jde. Kontaktuj Natalie Misova.",
    "fakturace",
    [
      "Změna údajů na uhrazené faktuře",
      "Úprava fakturačních údajů po zaplacení",
    ]
  ),
  qa(
    "fakturacni-udaje-neuhrazeno",
    "Můžeš změnit fakturační údaje, i když není proforma ještě uhrazená?",
    "Ano, kontaktuj Michaela Kubalova nebo Natalie Misova.",
    "fakturace",
    ["Změna údajů na neuhrazené faktuře", "Úprava fakturace před platbou"]
  ),
  qa(
    "cislo-objednavky",
    "Přidáš mi do proforma faktury číslo objednávky?",
    "Ano, kontaktuj Michaela Kubalova nebo Natalie Misova.",
    "fakturace",
    ["Číslo objednávky na fakturu", "Doplnit objednávku do proformy"]
  ),
  qa(
    "faktura-nevygenerovana",
    "Nevygenerovala se mi faktura.",
    "V případě, že čekáš na fakturu v HubSpot déle jak 10 minut, kontaktuj Natalie Misova.",
    "hubspot",
    [
      "Faktura se nevytvořila",
      "Kde je moje faktura?",
      "Faktura se nezobrazuje",
    ]
  ),
  qa(
    "prisla-platba",
    "Přišla tato platba?",
    'Platbu si můžeš ověřit přímo v HubSpot, kam se informace ohledně úhrady natáhne s datem platby. Případně si můžeš platbu ověřit z každodenního updatu v channelu "sales_invoices", kde se každý den přidává tabulka s přehledem aktuálních plateb. V případě, že platbu nenajdeš, kontaktuj Natalie Misova.',
    "platby",
    [
      "Ověření platby",
      "Dorazila platba?",
      "Zaplatil klient?",
      "Kde najdu info o platbě?",
    ]
  ),
  qa(
    "payment-id",
    "Můžeš mi poslat Payment ID?",
    "Informace ohledně Payment ID se do HubSpot natahuje automaticky. V případě, že tato informace chybí, kontaktuj Natalie Misova.",
    "platby",
    ["Payment ID chybí", "Kde najdu Payment ID?"]
  ),
  qa(
    "podepsat-objednavku",
    "Můžeš podepsat objednávku?",
    "Ano, kontaktuj Natalie Misova.",
    "fakturace",
    ["Podpis objednávky", "Kdo podepisuje objednávky?"]
  ),
  qa(
    "zmena-textu-faktura",
    "Můžeš v proforma faktuře změnit text / popisek na faktuře?",
    "Ano, kontaktuj Michaela Kubalova.",
    "fakturace",
    [
      "Změna popisku na faktuře",
      "Jiný text na faktuře",
      "Upravit název na faktuře",
    ]
  ),
  qa(
    "uprava-ceny",
    "Můžeš upravit cenu na faktuře?",
    "Ano, kontaktuj Michaela Kubalova nebo Natalie Misova.",
    "fakturace",
    ["Změna ceny na faktuře", "Oprava částky"]
  ),
  qa(
    "cena-s-dph-omyl",
    "Omylem jsem zadal cenu s DPH.",
    "Kontaktuj Natalie Misova.",
    "dph",
    ["Špatně zadané DPH", "Chyba v DPH na faktuře"]
  ),
  qa(
    "cena-bez-dph-omyl",
    "Omylem jsem nezadal cenu s DPH.",
    "Kontaktuj Natalie Misova.",
    "dph",
    ["Zapomněl jsem DPH", "Chybí DPH"]
  ),
  qa(
    "rozdil-dph-vratit",
    "Pokud je rozdíl v ceně kvůli DPH, musíme to vrátit?",
    "Ano, vyřeš s Natalie Misova.",
    "refundy",
    ["Vrácení rozdílu DPH", "Musíme vracet DPH rozdíl?"]
  ),
  qa(
    "finalni-faktura",
    "Co znamená finální faktura?",
    "Finální faktura neboli konečná faktura je účetní a daňový doklad, který dodavatel vystavuje po úhradě kurzu. Slouží k zúčtování zaplacených záloh. Podle zákona o DPH je plátce povinen vystavit fakturu do 15 dnů od data uskutečnění zdanitelného plnění (DUZP), tedy ode dne, kdy byl kurz zaplacen.",
    "pojmy",
    ["Co je konečná faktura?", "Vysvětli finální fakturu"]
  ),
  qa(
    "danovy-doklad",
    "Co znamená daňový doklad?",
    "Je to faktura (nebo jiný účetní doklad), která obsahuje všechny povinné náležitosti pro účely DPH, aby z ní mohl příjemce uplatnit odpočet daně.",
    "pojmy",
    ["Co je daňový doklad?", "Vysvětli daňový doklad"]
  ),
  qa(
    "danovy-doklad-platba",
    "Co znamená daňový doklad k přijaté platbě?",
    "Pokud zákazník zaplatí zálohu předem, dodavatel vystaví daňový doklad k přijaté platbě (aby mohl přiznat a odvést DPH z přijaté částky). Tento doklad slouží zároveň jako potvrzení o tom, že peníze opravdu přišly.",
    "pojmy",
    ["Doklad k přijaté platbě", "Co je daňový doklad k záloze?"]
  ),
  qa(
    "posunout-fakturu",
    "Můžeme posunout fakturu do jiného měsíce po zaplacení?",
    "Ne.",
    "fakturace",
    ["Přesun faktury do dalšího měsíce", "Změna měsíce faktury"]
  ),
  qa(
    "doklad-prijata-platba",
    "Můžeme vystavit doklad k přijaté platbě?",
    "Ano, kontaktuj Natalie Misova.",
    "fakturace",
    ["Vystavení dokladu k platbě"]
  ),
  qa(
    "faktura-ve-slozce",
    "Nevidím fakturu ve složce.",
    "Pokud si fakturu hledal/a přímo tady ve složce a faktura tam není, kontaktuj Natalie Misova nebo Michaela Kubalova.",
    "fakturace",
    [
      "Faktura chybí ve složce",
      "Kde je faktura?",
      "Nenašel jsem fakturu",
    ]
  ),
  qa(
    "vymazat-mail-faktura",
    "Můžeš vymazat mail z proforma faktury?",
    "Ano, kontaktuj Michaela Kubalova nebo Natalie Misova.",
    "fakturace",
    ["Smazání emailu z faktury", "Odstranit email z proformy"]
  ),
  qa(
    "uprava-splatnosti",
    "Můžeš upravit splatnost na faktuře?",
    "Ano, kontaktuj Michaela Kubalova nebo Natalie Misova.",
    "fakturace",
    ["Změna splatnosti", "Prodloužení splatnosti faktury"]
  ),
  qa(
    "mail-konecna-faktura",
    "Na jaký e-mail se zaslala konečná faktura?",
    "Pro zjištění kontaktuj Michaela Kubalova nebo Natalie Misova.",
    "fakturace",
    ["Kam šla konečná faktura?", "Email konečné faktury"]
  ),
  qa(
    "prevod-vs-stripe",
    "Klient uhradil platbu převodem, ale proforma faktura byla vystavená přes Stripe.",
    "Kontaktuj Natalie Misova.",
    "platby",
    [
      "Platba převodem místo Stripe",
      "Nesedí způsob platby",
      "Stripe vs převod",
    ]
  ),
  qa(
    "ico-dph",
    "Co je IČ DPH?",
    "IČO = Identifikační číslo organizace — obecné identifikační číslo firmy, 8místné (12345678).\nDIČ = Daňové identifikační číslo — číslo přidělené finanční správou, 10místné (2023456789).\nIČ DPH = Identifikační číslo pro DPH — jen pro plátce DPH, má předponu CZ/SK (CZ12345678 / SK2023456789). Uvádí se na fakturách, používá se při obchodu v rámci EU.",
    "pojmy",
    [
      "Rozdíl mezi IČO, DIČ a IČ DPH",
      "Co je DIČ?",
      "Co je IČO?",
      "Jaký je rozdíl mezi IČ a DIČ?",
    ]
  ),
  qa(
    "rozdelit-platbu",
    "Můžeš rozdělit platbu na 2 částky?",
    "Ano, pro dohodnutí se na postupu kontaktuj Natalie Misova.",
    "platby",
    ["Rozdělení platby", "Platba na dvě části", "Splátky"]
  ),
  qa(
    "overit-platbu-potvrzeni",
    "Můžeš podle tohoto potvrzení o platbě ověřit platbu v bance?",
    "Ano, kontaktuj Natalie Misova. Měl bys ale vidět úhradu i v HubSpot.",
    "platby",
    [
      "Ověření platby podle potvrzení",
      "Kontrola platby v bance",
    ]
  ),
  qa(
    "vat-zahranici",
    "VAT do zahraničí — jaké mají DPH nebo jestli mají dát DPH?",
    "Informaci k DPH nalezneš v manuálu s názvem Fakturace LABA.",
    "dph",
    [
      "DPH do zahraničí",
      "Zahraniční DPH sazby",
      "Jaké DPH mají v jiných zemích?",
      "DPH pro EU země",
    ]
  ),
  qa(
    "klient-neni-platce-dph",
    "Co mám napsat klientovi, který mi tvrdí, že není plátce DPH?",
    "Potřebuji si s vámi potvrdit, jestli máte přidělené IČ pro DPH. Pokud ano, v rámci SK vám vystavíme proforma fakturu bez DPH v režimu reverse charge. Pokud IČ DPH nemáte, musíme fakturovat s českou DPH.",
    "dph",
    [
      "Klient říká že není plátce DPH",
      "Jak odpovědět na dotaz o DPH",
      "Klient nechce DPH",
    ]
  ),
  qa(
    "reverse-charge",
    "Co je to reverse charge a jak to případně vysvětlit klientovi?",
    'Reverse charge (přenesení daňové povinnosti) je mechanismus, kdy povinnost přiznat a odvést DPH nemá dodavatel, ale odběratel (pokud je registrován jako plátce DPH). Používá se především při přeshraničním obchodě mezi plátci DPH v rámci EU.\n\nPro klienta: „Reverse charge znamená, že fakturu od nás dostanete bez DPH. Neznamená to, že byste DPH neplatili — jen jste povinni si daň sami dopočítat a přiznat ji ve své zemi. Pokud máte nárok na odpočet, hned si ji zase odečtete, takže pro vás to bývá neutrální. Je to běžný postup v EU u obchodů mezi firmami."',
    "pojmy",
    [
      "Co je reverse charge?",
      "Přenesená daňová povinnost",
      "Jak vysvětlit reverse charge",
    ]
  ),
  qa(
    "poslat-konecnou-fakturu",
    "Můžeš poslat konečnou fakturu?",
    "Kontaktuj Michaela Kubalova.",
    "fakturace",
    ["Zaslání konečné faktury", "Odeslat finální fakturu"]
  ),
  qa(
    "payment-type-hs",
    "Jaký mám dát payment type v HubSpot?",
    "Company + VAT = firma s IČO/DIČ (české firmy).\nCompany without VAT = slovenské firmy s IČ DPH ve statusu reverse charge.\nIndividual + VAT = fyzická osoba s IČO (ČR/SK).",
    "hubspot",
    [
      "Payment type v HubSpotu",
      "Jaký typ platby nastavit?",
      "Company vs Individual v HS",
    ]
  ),
  qa(
    "dalsi-faktury-firma",
    "Má tato firma / klient nějaké další faktury?",
    "Pro ověření kontaktuj Natalie Misova.",
    "fakturace",
    ["Kontrola dalších faktur", "Existují další faktury?"]
  ),
  qa(
    "formulace-hs-faktura",
    "Jaká má být správná formulace textu v faktuře vystavené přes HubSpot?",
    'Zálohové faktury vystavené přes HubSpot piš v tomto znění: „Účtujeme Vám zálohu za kurz [NÁZEV KURZU] konaný v termínu [DATUM]"',
    "hubspot",
    ["Text na faktuře z HubSpotu", "Jak formulovat fakturu v HS?"]
  ),
  qa(
    "formulace-stripe-faktura",
    "Jaká má být správná formulace textu v faktuře vystavené přes Stripe?",
    'Zálohové faktury vystavené přes Stripe piš v tomto znění: „Účtujeme Vám platbu za kurz [NÁZEV KURZU] konaný v termínu [DATUM]"',
    "hubspot",
    ["Text na faktuře ze Stripe", "Jak formulovat Stripe fakturu?"]
  ),
];
