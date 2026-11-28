import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { scoreEngine } from "../js/engine/scoreEngine.js";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = path => readFileSync(resolve(repositoryRoot, path), "utf8");
const existsFromRoot = path =>
  existsSync(resolve(repositoryRoot, path.replace(/^\.\//, "")));

test("HTML loads the diagnostic tree before the app as an ES module", () => {
  const html = read("index.html");
  const app = read("js/app.js");

  assert.match(html, /<script src="js\/engine\/diagnostics\.js"><\/script>/);
  assert.match(html, /<script type="module" src="js\/app\.js"><\/script>/);
  assert.ok(
    html.indexOf("js/engine/diagnostics.js") < html.indexOf("js/app.js")
  );
  assert.match(app, /scoreEngine\(state\)/);
  assert.match(app, /Ranked likely causes/);
  assert.match(app, /\.register\("\.\/service-worker\.js"\)/);
});

test("all local page, manifest, and service-worker resources exist", () => {
  const html = read("index.html");
  const manifest = JSON.parse(read("manifest.json"));
  const worker = read("service-worker.js");
  const cachedBlock = worker.match(/const FILES_TO_CACHE = \[([\s\S]*?)\];/);

  assert.ok(cachedBlock, "service worker cache list exists");

  const references = [
    ...[...html.matchAll(/(?:href|src)="([^"#]+)"/g)].map(match => match[1]),
    ...manifest.icons.map(icon => icon.src),
    ...[...cachedBlock[1].matchAll(/["']([^"']+)["']/g)].map(match => match[1])
  ];

  for (const reference of references) {
    assert.ok(existsFromRoot(reference), `missing local resource: ${reference}`);
  }
});

test("diagnostic scoring ranks matching causes without false low-compression evidence", () => {
  const results = scoreEngine({ noStart: true, compression: null });

  assert.equal(results[0].id, "fuelDelivery");
  assert.equal(results[0].score, 10);
  assert.ok(
    results.every((result, index) =>
      index === 0 || results[index - 1].score >= result.score
    )
  );
  assert.equal(results.find(result => result.id === "lowCompression").score, 6);
  assert.equal(results[0].procedure.title, "Fuel System Inspection and Repair");
});

test("compression evidence contributes to the low-compression ranking", () => {
  const results = scoreEngine({ compression: 80 });

  assert.equal(results[0].id, "lowCompression");
  assert.equal(results[0].score, 40);
});
