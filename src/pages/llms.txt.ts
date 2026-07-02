import data from '../data/findings.json';
import team from '../data/team.json';

// llms.txt — plain-markdown dump for AI agents (see llmstxt.org convention).
// Every finding, every field, flat and greppable. No JS, no CSS, no nav chrome.
export async function GET() {
  const t = team.team;
  const handle = (k) => team.members[k]?.handle || `@${k}`;
  const L = [];
  L.push(`# ${t.name} — Knowledge Ledger`);
  L.push('');
  L.push(`> Verified findings for the Kaggle competition "${t.competition}" (slug: ${t.competitionSlug}). Phase-1 deadline ${t.phase1Deadline}. Each finding has a verdict, verbatim evidence, and a date. Machine-readable JSON at /iut-knowledge/findings.json.`);
  L.push('');
  L.push(`Generated: ${new Date().toISOString().slice(0, 10)} · ${data.findings.length} findings`);
  L.push('');

  for (const f of data.findings) {
    L.push(`## ${f.id} — ${f.title}`);
    L.push('');
    L.push(`- Category: ${f.category}`);
    L.push(`- Verdict: ${f.verdict} (confidence: ${f.confidence}${f.critical ? ', critical' : ''})`);
    L.push(`- Tier: ${f.tier}${f.redact ? ' · REDACT (competitive edge)' : ''}`);
    L.push(`- Version: v${f.version} · found by ${handle(f.author)} · verified by ${handle(f.verifier)}${f.mentions?.length ? ' · cc ' + f.mentions.map(handle).join(', ') : ''}`);
    L.push(`- Updated: ${f.updated}`);
    L.push('');
    if (f.glance) L.push(`**Glance:** ${f.glance}`);
    if (f.summary) L.push(`**Summary:** ${f.summary}`);
    if (f.why) L.push(`**Why it matters:** ${f.why}`);
    if (f.body) L.push(`**Detail:** ${f.body}`);
    if (f.keyEvidence) L.push(`**How we know:** ${f.keyEvidence}`);
    if (f.action) L.push(`**Action:** ${f.action}`);
    if (f.caveat) L.push(`**Caveat:** ${f.caveat}`);
    L.push('');
    if (f.evidence?.length) {
      L.push('**Evidence:**');
      for (const e of f.evidence) L.push(`- "${e.quote}" — ${e.source} (${e.date})`);
      L.push('');
    }
    if (f.changelog?.length) {
      L.push('**Changelog:**');
      for (const c of f.changelog) L.push(`- v${c.version} (${c.date}): ${c.note}`);
      L.push('');
    }
    L.push('---');
    L.push('');
  }

  return new Response(L.join('\n'), {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}
