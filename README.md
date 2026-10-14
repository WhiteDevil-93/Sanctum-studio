# Sanctum Studio
### Desktop Design Application & Agentic Code-Generation Engine

Sanctum Studio uses the [Sanctum Cross-Platform Product Design Handbook](docs/design/sanctum-ux/DESIGN_PROCESS.md) as its general design reference. The platform profiles, interface subtype patterns, library catalogue, token guidance, and validation rules are included in [`docs/design/sanctum-ux/`](docs/design/sanctum-ux/). The [source note](docs/design/sanctum-ux/HANDBOOK_SOURCE.md) explains where this snapshot came from and how to refresh it.

---

## Key Features

1. **23 Interface Subtype Presets**:
   - Built-in templates based on [`INTERFACE_PATTERNS.md`](docs/design/sanctum-ux/INTERFACE_PATTERNS.md):
     - **AI Assistant & Delegation Center** (multi-agent orchestration, approval gates, task racks)
     - **Creative & PMV Studio** (video viewport, beat sync timeline, clip parameter inspector)
     - **Developer Sandbox** (isolated harness, diff viewer, terminal emulator)
     - **CRUD & Record Administration** (data tables, filter chips, destructive modal guards)
     - **Export & Render Farm** (render queue, byte verification checks, spend guards)
     - ... and 18 additional specialized domain presets.

2. **Multi-Scale Canvas & Layout Engine**:
   - Preview scenarios for **100%**, **150%**, and **200%** text scales; these are inspection scenarios, not proof that every generated layout is clipping-free.
   - Responsive layout uses container queries where appropriate; each exported design still needs checks in its target runtime and supported text settings.
   - **Stress Background Toggle**: Lets reviewers inspect text on a high-contrast checkerboard surface (`bg-stress.svg`); it is a visual aid, not an automated legibility test.

3. **Multi-Target Code Generation**:
   - **Compose Multiplatform (Kotlin Desktop / Android)**: Emits `@Composable` functions, sealed class state contracts, and Material 3 theme mappings matching [`desktop/`](file:///mnt/a/New%20folder%20%284%29/white-devil-release-1.0.6/desktop).
   - **PyQt6 / PySide6 (Python)**: Emits elevated `CardWidget` frames and QSS stylesheets matching [`HypnoForge/`](file:///mnt/a/HypnoForge).
   - **React & Tailwind (Web)**: Emits semantic HTML with `@container` queries and CSS variable bindings.
   - **DTCG 2025.10 token export**: An interchange option; validate the generated structure against the selected specification/toolchain before claiming compatibility.
   - **Design Canvas (`*.dc.html` + `canvas.json`)**: Bidirectional export/import compatible with Claude Design Artifacts.

4. **Model Context Protocol (MCP) Server**:
   - Run via stdio: `node bin/sanctum-mcp-server.js`
   - Exposes tools to external AI agents (Claude, Antigravity, Venice, Codex):
     - `design_list_templates`: Browse all 23 subtype presets.
     - `design_get_active_doc`: Inspect active AST and tokens.
     - `design_apply_template`: Apply any preset with live canvas update.
     - `design_validate_qa`: Run limited automated checks for selected token-color pairs, presence of declared states, and presence of a scaled scenario. It does not inspect rendered clipping and is not a full WCAG audit or conformance certification.
     - `design_export_code`: Generate Compose, PyQt6, React, or DTCG code on demand.

5. **Bi-Directional Plugin System**:
   - **As a Plugin**: Bundled as an **Antigravity UI Extension** (`plugin/`) with a Node.js sidecar that renders directly in Antigravity's side pane.
   - **Hosting Plugins**: Extensible architecture supporting custom component packs and custom framework exporters.

---

## Quickstart

### 1. Launch Sanctum Studio

Install dependencies once from the project directory:

```bash
npm install
```

For **browser-only mode**, start the local server:

```bash
npm start
```

Open **`http://127.0.0.1:4180`** in your browser. Stop the server with `Ctrl+C`.

For the **Windows desktop app**, launch the Electron window (it starts its own embedded server):

```powershell
Set-Location 'A:\DesignBase'
npm run desktop
```

Close the Electron window to stop desktop mode. Do not run browser-only and desktop modes simultaneously; both use port 4180.

### 2. Run as an MCP Server in Claude Desktop / Sanctum Desktop
Add to your `mcp-servers.json`:
```json
{
  "mcpServers": {
    "sanctum-design": {
      "command": "node",
      "args": ["/mnt/a/DesignBase/bin/sanctum-mcp-server.js"]
    }
  }
}
```

### 3. Run Automated Tests
```bash
npm test
```
Run the tests against the current checkout and use their current output as the result; this README does not assert that the current suite passes.
