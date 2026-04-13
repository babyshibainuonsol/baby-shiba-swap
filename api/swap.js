export default async function handler(req, res) {
  try {
    const { route, userPublicKey } = req.body;

    if (!route || !userPublicKey) {
      return res.status(400).json({ error: "Missing params" });
    }

    const response = await fetch(
      "https://quote-api.jup.ag/v6/swap",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          route,
          userPublicKey,
          wrapAndUnwrapSol: true,
        }),
      }
    );

    const data = await response.json();

    return res.status(200).json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
