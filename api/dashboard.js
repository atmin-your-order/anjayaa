module.exports = (req, res) => {
  // Stateless: tiap invocation berdiri sendiri di lingkungan serverless.
  // Sengaja tidak pakai database -> data di sini bersifat snapshot per-request.
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({
    runtime: "node serverless function",
    node: process.version,
    region: process.env.VERCEL_REGION || "local",
    deployment: process.env.VERCEL_ENV || "local",
    serverTime: new Date().toISOString(),
    note: "Stateless. Tidak ada DB. Untuk metric persistent perlu storage eksternal.",
  });
};
