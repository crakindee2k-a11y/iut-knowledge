import data from '../data/findings.json';
import team from '../data/team.json';

// Machine-readable full dump for AI agents. All findings, all tiers, all fields.
export async function GET() {
  const body = JSON.stringify(
    {
      team: team.team,
      members: team.members,
      generated: new Date().toISOString().slice(0, 10),
      count: data.findings.length,
      findings: data.findings,
    },
    null,
    2
  );
  return new Response(body, {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}
