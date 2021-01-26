# Veiviser for økonomi- og gjeldsrådgivning

Ny veiviser for økonomi- og gjeldsrådgivning

Veiviseren bruker nextjs for server side rendring av innhold. Innholdet hentes fra Sanity

TODO: Mer oppdatert informasjon over sommeren

## Komme i gang

Konfigurasjon og kildekode for next appen ligger i rotmappen.

`npm install` for å installere avhengigheter

`npm run dev` for å starte utviklingsmiljø

Opprett en `.env.local` fil på root folder der du legger inn
ønskede enviorment-variable feks:
`DECORATOR_URL="https://www.nav.no/dekoratoren/" APP_URL="https://www.nav.no/okonomi-og-gjeld" SANITY_DATASET="test"`

Sanity Studio ligger i mappen `/sanity`

For å starte Sanity studio lokalt:

`npm install -g @sanity/cli` installerer Sanity CLI

`cd sanity`  
`npm install`  
`sanity start`

TODO: Fylle inn med informasjon om bygg og deploy når dette er på plass

Test

## Kodekvalitet

Prettier brukes til å formatere kode. Reglene for formatering ligger i `.prettierrc.js`. Det kjøres en egen hook som formaterer koden ved commit.

---

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på GitHub

## For NAV-ansatte

Interne henvendelser kan sendes på Slack i kanalen #digisos
