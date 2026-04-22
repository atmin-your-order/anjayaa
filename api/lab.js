module.exports = (req, res) => {
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=60");
  res.status(200).json([
    {
      title: "Mini Queue Worker",
      progress: 40,
      note: "Belajar konsep job queue tanpa Redis, pakai file-based dulu.",
    },
    {
      title: "Self-host Webhook Relay",
      progress: 25,
      note: "Coba pahami flow webhook -> validasi -> forward.",
    },
    {
      title: "Log Viewer Sederhana",
      progress: 60,
      note: "UI kecil untuk baca log JSON line-by-line.",
    },
  ]);
};
