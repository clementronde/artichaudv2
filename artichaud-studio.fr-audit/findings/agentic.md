# Agent-readiness: https://artichaud-studio.fr (checked 2026-10-17)

## Scores
- Lighthouse Agentic Browsing: not measurable (PSI HTTP 429 daily quota exceeded, mobile and desktop). Fix: configure a Google API key (/seo google setup) and re-run.
- Agent-UX heuristic: 100/100 (complete) on /, /contact, /simulateur. Separate from Lighthouse; heuristic only.

## Evidence
- Server rendering: 518 words without JS, no JS-shell marker (pass).
- A11y tree: / 766 nodes, 47 interactive, 0 unnamed; /contact 311 nodes, 39 interactive, 0 unnamed; /simulateur 462 nodes, 38 interactive, 0 unnamed. 0 div-onclick widgets. /simulateur has 1 input without aria attributes (but with a label) - minor.
- Static scan found 0 <form> elements on the home page; the /contact form is rendered/mounted client-side. Turnstile was not exercised: an agent cannot pass the challenge by design (see P2).
- robots.txt: 200, 16 groups, deliberate groups for GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot. No search crawler blocked at root.
- Content-Signal: absent.
- llms.txt: 200 text/plain, 9323 bytes, llms-full.txt 200, Lighthouse rules pass.
- Markdown delivery: none (Accept: text/markdown returns HTML, no Vary: Accept, no alternate link, /index.md 404).
- 404 handling: real 404.
- /.well-known: api-catalog, oauth-*, ai-catalog.json, agent-card.json, ucp all 404 (not applicable, no such services).
- WebMCP: 0 registerTool call sites, no navigator.modelContext (draft).

## Access policy
- Training (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot): named groups present; see robots.txt for allow/deny per group.
- Search (OAI-SearchBot, Claude-SearchBot, PerplexityBot): not blocked at root.
- User-triggered (ChatGPT-User, Claude-User, Perplexity-User): not blocked at root. Claude-User honours robots; Perplexity-User and Google-Agent generally ignore it; ChatGPT-User may not apply.

## Findings
- P0: none.
- P1: PSI Lighthouse fraction unavailable (quota). Re-run with API key.
- P1 (optional): no Content-Signal line. Draft/preference, not enforcement; Google does not act on it (checked 2026-09-23). Add e.g. `Content-Signal: search=yes, ai-input=yes, ai-train=no` per group if policy is desired.
- P2: Turnstile on forms blocks autonomous agent submission. Acceptable for spam control; offer an agent-friendly alternative (visible mailto/tel, booking link) and ensure the widget iframe has an accessible title. Optional: WebMCP imperative tool for contact (W3C CG draft, not a standard; checked 2026-09-23).
- P2/P3 opportunities (not defects): Markdown delivery (Accept: text/markdown + Vary: Accept), ai-catalog.json (ARD draft, only if agent resources exist), Web Bot Auth (proposal).
- P3: label the one unlabelled-aria input on /simulateur.

## audit-data.json entries (AI Search Readiness)
[
 {"title":"Lighthouse Agentic Browsing not measured","severity":"medium","description":"PSI returned 429 quota exceeded for mobile and desktop.","recommendation":"Configure a Google API key and re-run lighthouse_agentic.py."},
 {"title":"Turnstile blocks agent form submission","severity":"low","description":"Contact form protected by Cloudflare Turnstile; agents cannot complete it.","recommendation":"Expose alternative contact paths; consider a WebMCP tool (draft) later."},
 {"title":"No Content-Signal or Markdown delivery","severity":"low","description":"Optional drafts/practices absent; no ranking effect promised.","recommendation":"Add Content-Signal lines per robots group; offer Markdown via content negotiation."}
]
