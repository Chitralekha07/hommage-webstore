# Hommage

Experiential retail store website — TanStack Start (React 19 + Vite 8) with Supabase for auth, database and media storage.

## Local development

```bash
npm install
cp .env.example .env   # fill in your Supabase values
npm run dev
```

## Build

```bash
npm run build   # outputs static assets to dist/ and the SSR function to .netlify/functions-internal/
```

## Deploying to Netlify

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- Functions are emitted automatically by the Nitro `netlify` preset (`netlify.toml` is included).

### Environment variables (set in Netlify → Site settings → Environment variables)

| Variable | Scope | Notes |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | client | `https://<project-ref>.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | client | Publishable/anon key |
| `VITE_SUPABASE_PROJECT_ID` | client | Project ref |
| `SUPABASE_URL` | server | Same URL, used by SSR & server functions |
| `SUPABASE_PUBLISHABLE_KEY` | server | Same publishable key |
| `SUPABASE_PROJECT_ID` | server | Project ref |
| `SUPABASE_SERVICE_ROLE_KEY` | server (secret) | Required for the admin panel / media proxy. Never expose. |

`VITE_*` values are inlined into the browser bundle at build time, so they must be present during the Netlify build.
