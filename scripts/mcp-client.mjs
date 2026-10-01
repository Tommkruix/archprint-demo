import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const client = new Client({ name: 'archprint-demo', version: '1.0.0' });
await client.connect(new StdioClientTransport({ command: 'npx', args: ['archprint', 'mcp'] }));

const { tools } = await client.listTools();
console.log(`Connected to archprint over MCP. Tools: ${tools.map((tool) => tool.name).join(', ')}\n`);

console.log('Calling archprint_scan on this repo...\n');
const result = await client.callTool({ name: 'archprint_scan', arguments: { path: '.' } });
const [app] = JSON.parse(result.content[0].text).apps;
console.log(`  ${'gate'.padEnd(8)}${'rule'.padEnd(22)}${'floor'.padEnd(6)}evidence`);
for (const rule of app.rules) {
  const confidence = `${Math.round(rule.confidenceFloor * 100)}%`;
  const evidence = `${rule.observations - rule.violatingFiles}/${rule.observations} files conform`;
  console.log(`  ${rule.status.padEnd(8)}${rule.label.padEnd(22)}${confidence.padEnd(6)}${evidence}`);
}

await client.close();
