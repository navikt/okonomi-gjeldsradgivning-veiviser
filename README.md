# Veiviser for økonomi- og gjeldsrådgivning

Ny veiviser for økonomi- og gjeldsrådgivning

Veiviseren bruker nextjs for server side rendring av innhold. Innholdet hentes fra Sanity

TODO: Mer oppdatert informasjon over sommeren

## Komme i gang

Konfigurasjon og kildekode for next appen ligger i rotmappen.

`npm install` for å installere avhengigheter

`npm run dev` for å starte utviklingsmiljø

Opprett en `.env.local` fil på root folder der du legger inn
ønskede environment-variable. Feks:

```shell
DECORATOR_ENV="dev"
NEXT_PUBLIC_APP_URL="https://www.nav.no/okonomi-og-gjeld"
NEXT_PUBLIC_SANITY_DATASET="test"`
```

Sanity Studio ligger i mappen `/sanity`

For å starte Sanity studio lokalt:

`cd sanity`  
`npm install`  
`npm run sanity start`

## Bygg og deploy

Det er satt opp automatisk bygg og deploy til produksjon ved fletting til `main`.

## Sentry

Vi bruker Sentry for logging av feilmeldinger og overvåkning av ytelse. Sentry er skrudd på som default i `dev-gcp` og `prod-gcp`.

For å kjøre appen med Sentry lokalt må følge env-variabler legges til i lokal `.env.local`:
`ENABLE_SENTRY=true`
`NEXT_PUBLIC_ENVIRONMENT=localhost`

Ved bygging av app lokalt (`next build`) hvor Sentry er skrudd på må [auth-token](https://sentry.gc.nav.no/settings/account/api/auth-tokens/) også legges til i `.sentryclirc`.
`[auth] token=kjempehemmeligtokensomeropprettetunderbrukerinnstillingerisentry`

`.sentryclirc` ligger i `.gitignore` og skal ikke sjekkes inn i repoet.

## Kodekvalitet

Prettier brukes til å formatere kode. Reglene for formatering ligger i `.prettierrc.js`. Det kjøres en egen hook som formaterer koden ved commit.

---

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på GitHub

## For NAV-ansatte

Interne henvendelser kan sendes på Slack i kanalen #digisos
