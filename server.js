const express = require("express");
const speedTest = require("speedtest-net");

const app = express();
const PORT = 3000;

// Hız testi endpoint'i
app.get("/speedtest", async (req, res) => {
  try {
    const result = await speedTest({ acceptLicense: true });
    res.json({
      downloadSpeed: `${result.download.bandwidth / 125000} Mbps`,
      uploadSpeed: `${result.upload.bandwidth / 125000} Mbps`,
      ping: `${result.ping.latency} ms`,
    });
  } catch (error) {
    res.status(500).json({ error: "Hız testi başarısız oldu", details: error.message });
  }
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
