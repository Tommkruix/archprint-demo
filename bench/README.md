# Tokens with and without archprint

`agent-tokens.sh` asks Claude Code the same question about this repo with and without archprint's MCP server and
records what each run cost.

- **Question:** "What architecture rules does this repo already follow? Keep it short."
- **Repo:** this demo at a pinned commit, with the README, licence, editor and MCP configs, demo scripts, this
  `bench/` folder and npm scripts removed first, so both setups see only the application code and nothing that
  names a rule.
- **Tools:** both setups get Read, Grep and Glob and no shell, so the setup without archprint cannot run it. The
  setup with archprint adds its three read-only MCP tools.
- **Runs:** five per setup, alternating which goes first, through `claude -p` in a clean environment.
- **Recorded:** tokens read (input plus cache), tokens written, cost, time, turns and tool calls from Claude Code's
  own run report, plus every answer, so correctness can be checked by reading them.

Run it with Claude Code signed in (set `CLAUDE_CONFIG_DIR` to use a separate profile):

```bash
sh bench/agent-tokens.sh
```

`results/2026-10-01/` holds the run quoted in the archprint README: `summary.json` (per-run metrics, tool calls and
answers) and `provenance.txt` (date, model, Claude Code and archprint versions, commit, prompt).
