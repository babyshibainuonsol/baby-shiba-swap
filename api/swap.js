export default async function handler(req, res) {
  try {
    const body = req.body;

    // 🛑 DEBUG
    console.log("BODY:", body);

    if (!body || !body.quoteResponse) {
      return res.status(400).json({
        error: "Missing body or quoteResponse",
      });
    }

    const response = await fetch(
      "https://api.jup.ag/swap/v1/swap",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quoteResponse: body.quoteResponse,
          userPublicKey: body.userPublicKey,
          wrapAndUnwrapSol: true,
        }),
      }
    );

    const data = await response.json();

    res.status(200).json(data);

  } catch (err) {
    console.error("API ERROR:", err);
    res.status(500).json({ error: err.message });
  }
}
