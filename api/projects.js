module.exports = (req, res) => {
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=60");
  res.status(200).json([
    {
      id: "rcon",
      title: "Web RCON Tool",
      stack: ["Node.js", "WebSocket", "HTML"],
      status: "stable",
      summary:
        "Web sederhana untuk kirim command ke server game/aplikasi dan menampilkan response-nya secara langsung.",
      detail:
        "Dibuat untuk memahami cara kerja komunikasi client-server: bagaimana request dikirim, bagaimana server merespon, dan bagaimana menangani koneksi yang putus. Tidak ada UI yang fancy, fokusnya ke alur data.",
    },
    {
      id: "panel",
      title: "Web Auto Deploy Panel (Pterodactyl Reseller)",
      stack: ["Node.js", "Supabase", "Email Auth", "Logging"],
      status: "production",
      summary:
        "Sistem otomatis pembuatan akun panel Pterodactyl untuk reseller, dengan approval dan logging.",
      detail:
        "Mencakup register dengan email, sistem approval manual sebelum akun aktif, logging IP user, dan notifikasi email saat status berubah. Fokusnya ke automation + kontrol akses, bukan ke tampilan.",
    },
    {
      id: "backend-exp",
      title: "Backend Experiments",
      stack: ["Node.js", "Express", "REST"],
      status: "ongoing",
      summary:
        "Kumpulan eksperimen kecil: API testing, pola error handling, dan observasi perilaku sistem.",
      detail:
        "Bukan satu project besar, tapi banyak file kecil untuk mencoba ide: bagaimana retry yang baik, kapan harus throw vs return error, bagaimana log yang berguna saat debugging.",
    },
  ]);
};
