export default async function handler(req, res) {
  try {
    // ✅ FIX: parse body safely
    const body = typeof req.body === "string"
      ? JSON.parse(req.body)
      : req.body;

    console.log("BODY RECEIVED:", body);

    const response = await fetch("https://api.jup.ag/swap/v1/swap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await response.text();
    console.log("JUP RESPONSE:", text);

    const data = JSON.parse(text);

    res.status(200).json(data);

  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
}
