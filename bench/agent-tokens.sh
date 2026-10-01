#!/bin/sh
set -eu

DEMO_REPO=https://github.com/Tommkruix/archprint-demo.git
DEMO_COMMIT=${DEMO_COMMIT:-2d264cc6cb5c0f9c9512e51ad51db734d82c424e}
MODEL=${MODEL:-claude-opus-5-5}
PROMPT='What architecture rules does this repo already follow? Keep it short.'
RUNS=${RUNS:-5}

here=$(cd "$(dirname -- "$0")" && pwd)
out="$here/results/$(date -u +%Y-%m-%dT%H%M%SZ)"
mkdir -p "$out"

demo=$(mktemp -d /tmp/archprint-demo.XXXX)
trap 'rm -rf "$demo"' EXIT
git clone -q "$DEMO_REPO" "$demo"
git -C "$demo" checkout -q "$DEMO_COMMIT"
(cd "$demo" && npm ci --no-audit --no-fund >/dev/null 2>&1)
(cd "$demo" && rm -rf README.md LICENSE .mcp.json .cursor .claude .stackblitzrc scripts bench .git &&
  node -e "const f='package.json',p=JSON.parse(require('fs').readFileSync(f));delete p.scripts;require('fs').writeFileSync(f,JSON.stringify(p,null,2))")

printf '{"mcpServers":{}}' > "$out/none.json"
printf '{"mcpServers":{"archprint":{"command":"npx","args":["-y","archprint","mcp"]}}}' > "$out/archprint.json"

run_arm() {
  arm=$1 config=$2 tools=$3 i=$4
  (cd "$demo" && env -i HOME="$HOME" USER="$USER" LOGNAME="${LOGNAME:-$USER}" TMPDIR="${TMPDIR:-/tmp}" SHELL=/bin/sh PATH="$PATH" LANG=en_US.UTF-8 \
    ${CLAUDE_CONFIG_DIR:+CLAUDE_CONFIG_DIR="$CLAUDE_CONFIG_DIR"} \
    claude -p "$PROMPT" --model "$MODEL" --strict-mcp-config --mcp-config "$config" \
      --allowedTools "$tools" --disallowedTools "Bash,Write,Edit,WebFetch,WebSearch,Task,Agent" \
      --output-format stream-json --verbose </dev/null) > "$out/$arm-$i.jsonl"
}

base='Read,Grep,Glob'
with_archprint="$base,mcp__archprint__archprint_scan,mcp__archprint__archprint_explain,mcp__archprint__archprint_recommend"
i=1
while [ "$i" -le "$RUNS" ]; do
  if [ $((i % 2)) -eq 1 ]; then
    run_arm without "$out/none.json" "$base" "$i"
    run_arm with "$out/archprint.json" "$with_archprint" "$i"
  else
    run_arm with "$out/archprint.json" "$with_archprint" "$i"
    run_arm without "$out/none.json" "$base" "$i"
  fi
  i=$((i + 1))
done

{
  echo "date=$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo "model=$MODEL"
  echo "claude=$(claude --version | head -1)"
  echo "archprint=$(cd "$demo" && npx archprint --version)"
  echo "demo_commit=$DEMO_COMMIT"
  echo "runs_per_arm=$RUNS"
  echo "repo_prep=removed README, LICENSE, MCP/editor configs, demo scripts and npm scripts so only application code remains"
  echo "prompt=$PROMPT"
} > "$out/provenance.txt"
node "$here/summarize.mjs" "$out"
