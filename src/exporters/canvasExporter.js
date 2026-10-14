/**
 * Sanctum Studio - Design Canvas (*.dc.html + canvas.json) Exporter
 * Generates artifacts 100% compatible with Claude Design Artifacts & docs/design/sanctum-ux/canvas-src/
 */

export function exportToDesignCanvas(doc) {
  const canvasJson = {
    v: 3,
    attachments: {},
    boards: {},
    order: []
  };

  const files = {};

  // 1. Generate Main.dc.html (single source of truth prototype)
  const mainHtml = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${doc.meta.title} — clickable prototype</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&amp;family=IBM+Plex+Sans:wght@400;500;600;700&amp;display=swap">
<style>
:root{--base-font-size:16px}
body{margin:0;font-family:'IBM Plex Sans',system-ui,sans-serif}
.s-app{width:100%;min-height:100vh;box-sizing:border-box;background:#0B0C10;color:#ECEEF5;padding:1.5em;container-type:inline-size;container-name:app}
.s-card{background:#1A1D26;border:1px solid #272B37;border-radius:0.75em;padding:1.25em;display:flex;flex-direction:column;gap:0.75em}
.s-btn{display:inline-flex;align-items:center;justify-content:center;min-height:2.75em;padding:0.5em 1.25em;border-radius:0.5em;background:#9A8CFF;color:#0B0C10;font-weight:600;border:none;cursor:pointer}
.s-btn:focus-visible{outline:3px solid #9A8CFF;outline-offset:2px}
.s-pill{display:inline-flex;align-items:center;padding:0.25em 0.75em;border-radius:99px;font-family:'IBM Plex Mono',monospace;font-size:0.75em;background:rgba(154,140,255,0.2);color:#9A8CFF}
@container app (max-width: 30em) {
  .s-app { padding: 0.75em; }
  .s-card { padding: 0.85em; }
}
</style>
</helmet>
<div class="s-app">
  <div class="s-card">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <h1 style="margin:0;font-size:1.5em">${doc.meta.title}</h1>
      <span class="s-pill" id="state-pill">{{state}}</span>
    </div>
    <p style="margin:0;color:#959CB1">Subtype: ${doc.meta.subtype}</p>
    <button class="s-btn" type="button" onclick="this.innerText='Running...';document.getElementById('state-pill').innerText='RUNNING'">Execute Action</button>
  </div>
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":1280,"height":800}}'>
class Component extends DCLogic {
  renderVals() { return { state: "READY" }; }
}
</script>
</body>
</html>`;

  files['Main.dc.html'] = mainHtml;
  canvasJson.boards['Main.dc.html'] = {
    x: 0,
    y: 0,
    w: 1280,
    h: 800,
    page: 'proto',
    title: `${doc.meta.title} — Clickable Prototype`,
    is_interactive: true
  };
  canvasJson.order.push('Main.dc.html');

  // 2. Generate scenario artboards
  let offsetX = 1360;
  for (const scenario of doc.scenarios || []) {
    const filename = `S-${scenario.id}.dc.html`;
    const wrapperHtml = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${scenario.title}</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<style>body{margin:0;overflow:hidden}</style>
</helmet>
<div style="width: 100vw; height: 100vh; overflow: hidden; position: relative">
  <dc-import name="Main" scenario="${scenario.activeState}" scale="${scenario.scale}" mode="${scenario.theme}" hint-size="${scenario.viewport.width}px,${scenario.viewport.height}px"></dc-import>
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":${scenario.viewport.width},"height":${scenario.viewport.height}}}'>
class Component extends DCLogic {
  renderVals() { return {}; }
}
</script>
</body>
</html>`;

    files[filename] = wrapperHtml;
    canvasJson.boards[filename] = {
      x: offsetX,
      y: 0,
      w: scenario.viewport.width,
      h: scenario.viewport.height,
      page: 'screens',
      title: scenario.title
    };
    canvasJson.order.push(filename);
    offsetX += scenario.viewport.width + 80;
  }

  files['canvas.json'] = JSON.stringify(canvasJson, null, 2);
  return files;
}
