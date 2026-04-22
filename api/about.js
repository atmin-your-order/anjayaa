module.exports = (req, res) => {
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=60");
  res.status(200).json({
    name: "Kiyy",
    age: 16,
    role: "Self-taught Developer",
    focus: ["backend", "automation", "system tools"],
    workflow: ["ide", "flow", "AI generate", "pahami", "modifikasi", "test", "debug"],
  });
};
