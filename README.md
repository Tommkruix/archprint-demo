# archprint demo

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/Tommkruix/archprint-demo)

A small Next.js API (20 resources, 40 route handlers, a service layer over Drizzle) for trying
[archprint](https://github.com/Tommkruix/archprint) in the browser. Nothing to install: open it in StackBlitz
and the scan runs on its own.

The app is a fixture for archprint to read, not a service to run. There is no database behind it.

## Try it

1. **See the rules this code already follows.** The terminal runs this for you when the project opens:

   ```bash
   npm run scan
   ```

   Every route reaches the database through `lib/services/`, never directly, and archprint finds that rule
   on its own, with the evidence (40 of 40 route files conform).

2. **Ask why a rule is trusted.**

   ```bash
   npm run explain
   ```

3. **Enforce the rules in ESLint.**

   ```bash
   npx archprint init
   npx archprint wire
   ```

4. **Break one.** Make `app/api/users/route.ts` query the database directly, then lint:

   ```ts
   import { NextResponse } from 'next/server';
   import { db } from '@/lib/db';
   import { users } from '@/lib/schema';

   export async function GET() {
     return NextResponse.json(await db.select().from(users));
   }
   ```

   ```bash
   npm run lint
   ```

   ESLint now reports `archprint/no-db-client-in-request-entry` on that import.

5. **Ask over MCP, as an AI agent would.**

   ```bash
   npm run mcp
   ```

   `scripts/mcp-client.mjs` starts `archprint mcp`, connects to it over stdio the way Claude Code or Cursor
   does, lists its tools, and calls `archprint_scan`.

6. **Or just ask your agent.** Open this folder in Claude Code (`.mcp.json`) or Cursor (`.cursor/mcp.json`)
   and the archprint server is already configured. Ask in plain words, for example:

   > What architecture rules does this repo already follow?

   The agent calls archprint's read-only tools on its own and answers with the evidence. `.claude/settings.json`
   pre-approves those read-only tools for Claude Code, and Claude Code shows that when you first trust the
   folder.

   If Cursor or another desktop app says the server failed to start, it cannot see `node` on its `PATH` (common
   with nvm or Homebrew when the app is opened from the Dock). See
   [the fix in archprint's docs](https://github.com/Tommkruix/archprint#use-with-ai-agents-mcp), or open the
   editor from a terminal.

To undo step 3, run `npx archprint eject`.

## Locally

```bash
git clone https://github.com/Tommkruix/archprint-demo
cd archprint-demo
npm install
npm run scan
```

## License

MIT
