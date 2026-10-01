import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

function archprintCli() {
  let root = dirname(fileURLToPath(import.meta.resolve('archprint')));
  while (!existsSync(join(root, 'package.json'))) root = dirname(root);
  return join(root, JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).bin.archprint);
}

const client = new Client({ name: 'archprint-demo', version: '1.0.0' });
await client.connect(new StdioClientTransport({ command: process.execPath, args: [archprintCli(), 'mcp'] }));

const { tools } = await client.listTools();
console.log(`Connected to archprint over MCP. Tools: ${tools.map((tool) => tool.name).join(', ')}\n`);

console.log('Calling archprint_scan on this repo...\n');
const result = await client.callTool({ name: 'archprint_scan', arguments: { path: '.' } });
const [app] = JSON.parse(result.content[0].text).apps;
for (const rule of app.rules) {
  const confidence = `${Math.round(rule.confidenceFloor * 100)}%`;
  const evidence = `${rule.observations - rule.violatingFiles}/${rule.observations} files`;
  const id = rule.family === 'forbidden-imports' ? `${rule.label}: ` : '';
  const exceptions = rule.exceptions.length > 0 ? ` (except ${rule.exceptions.join(', ')})` : '';
  console.log(`  ${rule.status.padEnd(8)}${confidence.padEnd(5)}${evidence.padEnd(13)}${id}${rule.statement}${exceptions}`);
}

await client.close();
