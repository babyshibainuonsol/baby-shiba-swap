export default async function handler(req, res) {
  try {
    // ✅ parse safely
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body;

    console.log("BODY:", body);

    const response = await fetch("https://quote-api.jup.ag/v6/swap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await response.text();
    console.log("JUP RAW:", text);

    // ✅ SAFE PARSE (NO CRASH)
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({
        error: "Invalid JSON from Jupiter",
        raw: text,
      });
    }

    return res.status(200).json(data);

  } catch (err) {
    console.error("SERVER ERROR:", err);

    return res.status(500).json({
      error: err.message,
    });
  }
}
