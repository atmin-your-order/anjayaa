// tiny SPA router (path-based, history API)

const view = document.getElementById("view");
document.getElementById("year").textContent = new Date().getFullYear();

const routes = {
  "/": renderHome,
  "/projects": renderProjects,
  "/dashboard": renderDashboard,
  "/about": renderAbout,
  "/lab": renderLab,
};

function setActive(path) {
  document.querySelectorAll(".nav nav a").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === path);
  });
}

async function navigate(path, push = true) {
  const fn = routes[path] || renderNotFound;
  if (push) history.pushState({}, "", path);
  setActive(path);
  view.innerHTML = '<div class="fade-in" style="padding:40px 0"><span class="loader"></span> <span class="muted" style="margin-left:8px">memuat…</span></div>';
  window.scrollTo({ top: 0, behavior: "instant" });
  try {
    await fn();
    bindCardHover();
  } catch (e) {
    view.innerHTML = `<div class="card"><h3>Gagal memuat halaman</h3><p class="muted">${e.message}</p></div>`;
  }
}

document.addEventListener("click", (e) => {
  const a = e.target.closest("a[data-link]");
  if (!a) return;
  e.preventDefault();
  const href = a.getAttribute("href");
  if (href === location.pathname) return;
  navigate(href);
});
window.addEventListener("popstate", () => navigate(location.pathname, false));
window.addEventListener("DOMContentLoaded", () => navigate(location.pathname, false));

// ---------- helpers ----------
const el = (html) => {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
};
const escape = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;" }[c]));

function typing(node, lines, speed = 32) {
  let li = 0, ci = 0;
  function tick() {
    if (li >= lines.length) { li = 0; node.textContent = ""; }
    const line = lines[li];
    node.textContent = line.slice(0, ci);
    if (ci < line.length) { ci++; setTimeout(tick, speed); }
    else { ci = 0; li++; setTimeout(tick, 1600); }
  }
  tick();
}

// glow follows cursor on cards
function bindCardHover() {
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - r.left + "px");
      card.style.setProperty("--my", e.clientY - r.top + "px");
    });
  });
}

// inline icons
const icons = {
  arrow: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>`,
  spark: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6 2.1-2.1"/></svg>`,
  flask: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M10 3v7L4 20a2 2 0 0 0 1.7 3h12.6A2 2 0 0 0 20 20l-6-10V3"/></svg>`,
  code: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 16-4-4 4-4M16 8l4 4-4 4M14 4l-4 16"/></svg>`,
  shield: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z"/></svg>`,
};

// SVG anime-ish avatar (placeholder)
const avatarSVG = `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="hair" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#1a1f2c"/><stop offset="1" stop-color="#0b0c10"/>
    </linearGradient>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#1a1230"/><stop offset="1" stop-color="#0a1426"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" fill="url(#bg)"/>
  <circle cx="100" cy="170" r="70" fill="#1c2030"/>
  <circle cx="100" cy="100" r="46" fill="#f1d6c0"/>
  <path d="M50,98 C52,55 90,40 110,46 C140,54 152,80 150,104 C144,90 122,80 110,86 C100,90 92,96 86,104 C80,114 72,120 60,118 Z" fill="url(#hair)"/>
  <path d="M58,108 C66,120 80,124 90,118" stroke="#0b0c10" stroke-width="2" fill="none"/>
  <ellipse cx="86" cy="112" rx="4" ry="5" fill="#8b6dff"/>
  <ellipse cx="116" cy="112" rx="4" ry="5" fill="#56a8ff"/>
  <path d="M92,130 q8,4 16,0" stroke="#7a4a3a" stroke-width="2" fill="none" stroke-linecap="round"/>
  <rect x="60" y="148" width="80" height="40" rx="10" fill="#14171f"/>
  <text x="100" y="174" text-anchor="middle" font-family="ui-monospace, monospace" font-size="10" fill="#8a93a6">kiyy</text>
</svg>`;

// ---------- pages ----------
function renderHome() {
  view.innerHTML = "";
  const root = el(`
    <div class="fade-in">
      <section class="hero">
        <div>
          <div class="tag"><span class="pulse"></span> available — masih belajar setiap hari</div>
          <h1>Halo, saya Kiyy.<br/><span class="gradient-text">Saya bangun hal kecil yang benar-benar jalan.</span></h1>
          <p class="lead">
            16 tahun. Self-taught. Fokus ke backend, automation, dan tools.
            Saya pakai AI untuk bantu menulis kode, lalu saya baca, modif, dan debug sampai paham.
          </p>
          <div class="typing" id="typing"></div>
          <div class="btns">
            <a class="btn primary" href="/projects" data-link>lihat project ${icons.arrow}</a>
            <a class="btn" href="/about" data-link>cara saya kerja</a>
            <a class="btn" href="/lab" data-link>${icons.flask} lab / WIP</a>
          </div>
        </div>
        <div class="avatar-wrap">
          <span class="corner"><span class="d"></span> kiyy / 16</span>
          <img src="/avatar.png" alt="Kiyy" />
        </div>
      </section>

      <section>
        <h2><span class="num">01</span> Mindset — KISS (Keep It Simple, Stupid)</h2>
        <div class="grid cols-3">
          <div class="card">
            <div class="head">
              <h3>Solusi sesederhana mungkin</h3>
              <span class="badge info">prinsip</span>
            </div>
            <p class="muted">Saya pilih cara paling sederhana yang masih menyelesaikan masalah. Tidak semua hal butuh sistem kompleks.</p>
          </div>
          <div class="card">
            <div class="head">
              <h3>Skala kecil → cara kecil</h3>
              <span class="badge">contoh</span>
            </div>
            <ul class="list">
              <li>Web 1–2 user → HTML + sedikit JS</li>
              <li>Tool internal → PIN di backend cukup</li>
              <li>Production → baru pakai auth + DB lengkap</li>
            </ul>
          </div>
          <div class="card">
            <div class="head">
              <h3>Sederhana ≠ asal</h3>
              <span class="badge warn">trade-off</span>
            </div>
            <p class="muted">Saya sadar kapan harus naik level: saat data sensitif, saat user bertambah, saat ada uang yang lewat sistem.</p>
          </div>
        </div>
      </section>

      <section>
        <h2><span class="num">02</span> Security & decision making</h2>
        <div class="grid cols-2">
          <div class="panel">
            <div class="kicker">production</div>
            <h3 style="margin-bottom:10px">Standar yang saya pegang</h3>
            <ul class="list">
              <li>Tidak hardcode data sensitif</li>
              <li>Hindari kebocoran data (env, log, response)</li>
              <li>Autentikasi: email + approval bila perlu</li>
              <li>Logging IP & aktivitas penting</li>
            </ul>
          </div>
          <div class="panel">
            <div class="kicker">pribadi / one-time</div>
            <h3 style="margin-bottom:10px">Boleh longgar, tapi sadar</h3>
            <ul class="list">
              <li>Boleh hardcode kalau memang sekali pakai</li>
              <li>Fokus ke kecepatan & efisiensi, bukan skalabilitas</li>
              <li>Yang penting: saya tahu risikonya, bukan tidak sadar</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2><span class="num">03</span> Workflow</h2>
        <div class="panel">
          <div class="kicker">cara kerja</div>
          <h3 style="margin-bottom:14px">Dari ide ke sistem yang jalan</h3>
          <p class="mono muted" style="font-size:13.5px">
            ide → flow → AI generate → pahami → modifikasi → test → debug
          </p>
          <p style="margin-top:14px">
            Saya tidak mengklaim menulis semua kode sendiri.
            Yang saya kerjakan: merancang sistem, alur, penanganan error, dan keputusan teknis.
          </p>
          <a class="arrow-link" href="/about" data-link>baca lebih detail di /about ${icons.arrow}</a>
        </div>
      </section>
    </div>
  `);
  view.appendChild(root);
  typing(root.querySelector("#typing"), [
    "$ whoami → kiyy, 16, masih belajar",
    "$ stack → node, supabase, sedikit html/css",
    "$ goal → bikin sistem kecil yang benar-benar jalan",
  ]);
}

async function renderProjects() {
  const data = await fetch("/api/projects").then((r) => r.json());
  view.innerHTML = "";
  const root = el(`
    <div class="fade-in">
      <section>
        <h1>Projects</h1>
        <p class="muted" style="max-width:560px">
          Bukan portfolio "wow", tapi hal-hal yang saya bangun sambil belajar.
          Setiap project punya satu pertanyaan yang ingin saya jawab sendiri.
        </p>
      </section>

      <section>
        <h2><span class="num">★</span> daftar project (${data.length})</h2>
        <div class="grid cols-2" id="list"></div>
      </section>
    </div>
  `);
  const list = root.querySelector("#list");
  data.forEach((p, i) => {
    const badgeClass = p.status === "production" ? "good" : p.status === "ongoing" ? "warn" : "info";
    list.appendChild(el(`
      <div class="card">
        <div class="head">
          <div>
            <div class="num-tag">PROJECT / ${String(i + 1).padStart(2, "0")}</div>
            <h3 style="margin-top:4px">${escape(p.title)}</h3>
          </div>
          <span class="badge ${badgeClass}">${escape(p.status)}</span>
        </div>
        <p>${escape(p.summary)}</p>
        <p class="muted" style="font-size:13.5px">${escape(p.detail)}</p>
        <div class="tags">${p.stack.map((s) => `<span>${escape(s)}</span>`).join("")}</div>
      </div>
    `));
  });
  view.appendChild(root);
}

async function renderDashboard() {
  const d = await fetch("/api/dashboard").then((r) => r.json());
  view.innerHTML = "";
  const root = el(`
    <div class="fade-in">
      <section>
        <h1>Dashboard</h1>
        <p class="muted" style="max-width:580px">
          Snapshot status function. Tiap kali halaman ini dibuka, request baru dijalankan ke serverless function — tidak ada state yang disimpan.
        </p>
      </section>

      <section>
        <h2><span class="num">◆</span> runtime snapshot</h2>
        <div class="stats">
          <div class="stat"><div class="v">${escape(d.runtime)}</div><div class="k">runtime</div></div>
          <div class="stat"><div class="v">${escape(d.node)}</div><div class="k">node version</div></div>
          <div class="stat"><div class="v">${escape(d.region)}</div><div class="k">region</div></div>
          <div class="stat"><div class="v">${escape(d.deployment)}</div><div class="k">env</div></div>
        </div>
      </section>

      <section>
        <h2><span class="num">◆</span> server time</h2>
        <div class="panel">
          <div class="kicker">live</div>
          <p>Diambil saat function dijalankan: <span class="mono muted">${escape(d.serverTime)}</span></p>
          <p class="muted">Refresh halaman ini untuk memicu invocation baru.</p>
        </div>
      </section>

      <section>
        <h2><span class="num">◆</span> catatan jujur</h2>
        <div class="panel">
          <div class="kicker">why stateless</div>
          <p class="muted">${escape(d.note)}</p>
          <p class="muted">
            Sengaja stateless dan tanpa database. Sesuai prinsip KISS:
            kalau memang belum perlu menyimpan apa-apa, tidak perlu menambah ketergantungan.
            Saat butuh metric persistent, baru ditambah storage eksternal.
          </p>
        </div>
      </section>
    </div>
  `);
  view.appendChild(root);
}

async function renderAbout() {
  const a = await fetch("/api/about").then((r) => r.json());
  view.innerHTML = "";
  const root = el(`
    <div class="fade-in">
      <section>
        <h1>About</h1>
        <p style="max-width:620px">
          Saya ${escape(a.name)}, ${a.age} tahun. ${escape(a.role)} di bidang
          ${a.focus.map(escape).join(", ")}.
        </p>
        <p class="muted" style="max-width:620px">
          Saya belajar lewat praktik, eksperimen, dan trial-error — bukan dari teori formal.
          Yang saya kejar adalah memahami bagaimana sistem benar-benar bekerja, bukan sekadar bisa "jalan".
        </p>
      </section>

      <section>
        <h2><span class="num">01</span> cara saya membuat project</h2>
        <div class="panel">
          <div class="kicker">workflow</div>
          <p>Saya jelaskan logika, flow, dan kebutuhan sistem ke AI. AI menghasilkan kode awal. Lalu saya baca ulang, pahami, modif, dan debug sampai sesuai keinginan.</p>
          <p class="mono muted" style="font-size:13.5px;margin-top:10px">${a.workflow.join(" → ")}</p>
        </div>
      </section>

      <section>
        <h2><span class="num">02</span> kelebihan & kekurangan</h2>
        <div class="grid cols-2">
          <div class="panel">
            <div class="kicker">keunggulan</div>
            <h3 style="margin-bottom:10px">Yang saya rasa kuat</h3>
            <ul class="list">
              <li>Fokus ke logika & flow, bukan sekadar copy-paste</li>
              <li>Cepat belajar dari praktik nyata</li>
              <li>Paham trade-off: sederhana vs kompleks</li>
              <li>Adaptif memakai AI sebagai alat bantu</li>
            </ul>
          </div>
          <div class="panel">
            <div class="kicker">kekurangan</div>
            <h3 style="margin-bottom:10px">Yang masih jadi PR</h3>
            <ul class="list">
              <li>Masih bergantung ke AI untuk menulis kode</li>
              <li>Belum sepenuhnya menguasai coding manual</li>
              <li>Banyak project masih berstatus eksperimen</li>
              <li>Fokus kadang terbagi antar ide</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2><span class="num">03</span> kontak</h2>
        <div class="panel">
          <div class="kicker">reach me</div>
          <p class="muted">Belum saya buka secara publik. Kalau perlu, hubungi via channel yang sudah kita pakai sebelumnya.</p>
        </div>
      </section>
    </div>
  `);
  view.appendChild(root);
}

async function renderLab() {
  const items = await fetch("/api/lab").then((r) => r.json());
  view.innerHTML = "";
  const root = el(`
    <div class="fade-in">
      <section>
        <h1>Lab</h1>
        <p class="muted" style="max-width:560px">
          Eksperimen yang belum selesai. Sengaja ditampilkan supaya jelas: ini proses belajar, bukan etalase.
        </p>
      </section>

      <section>
        <h2><span class="num">⚗</span> sedang dikerjakan (${items.length})</h2>
        <div class="grid cols-2" id="list"></div>
      </section>

      <section>
        <h2><span class="num">★</span> aturan main</h2>
        <div class="panel">
          <div class="kicker">rules</div>
          <ul class="list">
            <li>Tidak harus rapi.</li>
            <li>Tidak harus berhasil.</li>
            <li>Yang penting: ada yang dipelajari.</li>
          </ul>
        </div>
      </section>
    </div>
  `);
  const list = root.querySelector("#list");
  items.forEach((it, i) => {
    list.appendChild(el(`
      <div class="card">
        <div class="head">
          <div>
            <div class="num-tag">EXPERIMENT / ${String(i + 1).padStart(2, "0")}</div>
            <h3 style="margin-top:4px">${escape(it.title)}</h3>
          </div>
          <span class="badge warn">${it.progress}%</span>
        </div>
        <p class="muted" style="font-size:13.5px">${escape(it.note)}</p>
        <div class="bar"><div style="width:${Number(it.progress)}%"></div></div>
      </div>
    `));
  });
  view.appendChild(root);
}

function renderNotFound() {
  view.innerHTML = `
    <div class="fade-in">
      <section style="text-align:center;padding:60px 0">
        <h1 class="gradient-text" style="font-size:96px;margin-bottom:8px">404</h1>
        <p class="muted">Halaman tidak ditemukan.</p>
        <div class="btns" style="justify-content:center">
          <a class="btn primary" data-link href="/">kembali ke home</a>
        </div>
      </section>
    </div>`;
}
