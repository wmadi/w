const E = {
  open: "Sayt ochildi",
  back: "Saytga qayta kirdi",
  next: "«nima ekan» tugmasini bosdi",
  yes: "«HA» dedi! 🎉",
  food: "Ovqat tanladi",
  play: "Qo'shiqni boshladi",
  end: "Qo'shiq oxirigacha tugadi",
  again: "Qo'shiqni yana eshitishni tanladi",
  final: "Oxirigacha yetib keldi 🌸"
};

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  const token = process.env.TG_TOKEN;
  const chat = process.env.TG_CHAT;
  if (!token || !chat) return res.status(500).end();
  let b = req.body;
  try { if (typeof b === "string") b = JSON.parse(b); } catch (e) { b = {}; }
  const base = E[b && b.e];
  if (!base) return res.status(400).end();
  const d = String((b && b.d) || "").slice(0, 80);
  const text = d ? base + ": " + d : base;
  try {
    await fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chat, text: text })
    });
  } catch (e) {}
  res.status(200).json({ ok: true });
};
