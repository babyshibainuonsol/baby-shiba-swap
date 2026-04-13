export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const body = req.body;

    const response = await fetch("https://quote-api.jup.ag/v6/swap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await response.text();

    // 👇 VERY IMPORTANT (debug + prevents crash)
    try {
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch (e) {
      console.error("INVALID JSON FROM JUPITER:", text);
      return res.status(500).json({ error: "Invalid response from Jupiter", raw: text });
    }

  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}
