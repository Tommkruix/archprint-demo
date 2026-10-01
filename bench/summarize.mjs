import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.argv[2];
const runs = [];
for (const name of readdirSync(dir).filter((n) => n.endsWith('.jsonl')).sort()) {
  const events = readFileSync(join(dir, name), 'utf8').split('\n').filter(Boolean).map((l) => {
    try { return JSON.parse(l); } catch { return null; }
  }).filter(Boolean);
  const result = events.find((e) => e.type === 'result');
  const toolCalls = events.filter((e) => e.type === 'assistant')
    .flatMap((e) => e.message.content).filter((c) => c.type === 'tool_use').map((c) => c.name);
  const u = result?.usage ?? {};
  runs.push({
    arm: name.split('-')[0],
    run: name,
    inputTokens: (u.input_tokens ?? 0) + (u.cache_creation_input_tokens ?? 0) + (u.cache_read_input_tokens ?? 0),
    outputTokens: u.output_tokens ?? 0,
    costUsd: result?.total_cost_usd ?? null,
    durationS: result ? result.duration_ms / 1000 : null,
    turns: result?.num_turns ?? null,
    toolCalls: toolCalls.length,
    tools: toolCalls,
    answer: result?.result ?? '',
  });
}
const median = (xs) => { const s = [...xs].sort((a, b) => a - b); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const stats = {};
for (const arm of ['without', 'with']) {
  const rs = runs.filter((r) => r.arm === arm);
  stats[arm] = {};
  for (const k of ['inputTokens', 'outputTokens', 'costUsd', 'durationS', 'turns', 'toolCalls']) {
    const xs = rs.map((r) => r[k]);
    stats[arm][k] = { median: median(xs), min: Math.min(...xs), max: Math.max(...xs) };
  }
}
writeFileSync(join(dir, 'summary.json'), JSON.stringify({ stats, runs }, null, 2));
console.log(JSON.stringify(stats, null, 1));
