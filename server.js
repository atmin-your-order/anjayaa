// Local dev shim. Di Vercel, file ini TIDAK dipakai —
// Vercel langsung menjalankan tiap file di /api sebagai serverless function
// dan menyajikan /public sebagai static.
//
// Di sini kita hanya meniru perilaku itu supaya bisa preview lokal.

const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// auto-mount tiap file di /api/*.js -> route /api/<nama>
const apiDir = path.join(__dirname, "api");
if (fs.existsSync(apiDir)) {
  for (const file of fs.readdirSync(apiDir)) {
    if (!file.endsWith(".js")) continue;
    const route = "/api/" + file.replace(/\.js$/, "");
    const handler = require(path.join(apiDir, file));
    app.all(route, (req, res) => handler(req, res));
    console.log("mounted", route);
  }
}

// SPA fallback
app.get(/^\/(?!api).*/, (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`dev server on http://0.0.0.0:${PORT}`);
});
