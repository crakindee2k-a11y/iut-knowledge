# অলীকবচন Ledger

Verified-findings site for team **Make America Great Again** — Bengali LLM Hallucination Detection Challenge.

Live (unlisted, `noindex`): https://crakindee2k-a11y.github.io/iut-knowledge/

## Add a finding

1. Edit `src/data/findings.json`. Each finding needs a verdict, a verbatim evidence quote, a source, and a date.
2. Corrections: bump `version`, append to `changelog` — never overwrite the old value.
3. Fix member handles/names in `src/data/team.json` (they are placeholders).
4. Commit + push to `master`. The GitHub Action builds and deploys automatically.

## Local dev

```bash
npm install
npm run dev      # preview at localhost:4321/iut-knowledge
npm run build    # output in dist/
```

## Notes

- `redact: true` marks competitive-edge findings. The site is public (unlisted). Strip them before sharing the URL beyond the team.
- Findings source of truth is `findings.json`. The private code repo keeps its own internal memory notes.
