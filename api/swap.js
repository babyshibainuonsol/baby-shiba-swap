export default async function handler(req, res) {
  // ✅ Allow frontend to call backend
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const response = await fetch(
      "https://api.jup.ag/swap/v1/swap",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();

    return res.status(200).json(data);
  } catch (err) {
    console.error("SWAP ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}
