// Bodega Bar ATL — /api/contact
// Contact page "order ticket" → Airtable → Bodega Bar HQ → Contact Messages.
// An Airtable automation emails contact@atlbodegabar.com on every new record.
// Uses the same AIRTABLE_TOKEN env var as /api/apply.

const BASE = process.env.AIRTABLE_BASE || "appZC0s6Jg5pr2DXi";
const TABLE = "tblpCElRA00nZsru2";
const TOPICS = { general: "General", press: "Press", events: "Private Events", artists: "Artist", vendors: "Vendors" };
const str = (v, max = 3000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "POST only" });
  if (!process.env.AIRTABLE_TOKEN) return res.status(500).json({ ok: false, error: "Server not configured" });
  let b = req.body; if (typeof b === "string") { try { b = JSON.parse(b); } catch { b = {}; } } b = b || {};
  if (str(b.website)) return res.status(200).json({ ok: true }); // honeypot

  const name = str(b.name, 120), email = str(b.email, 200), message = str(b.message, 3000);
  if (!name || !email || !message) return res.status(400).json({ ok: false, error: "Missing required fields" });

  const details = Object.entries(b.extras || {})
    .filter(([k, v]) => typeof v === "string" && v.trim())
    .map(([k, v]) => `${k}: ${v.trim().slice(0, 300)}`).join("\n");

  const fields = {
    "Name": name, "Email": email, "Message": message,
    "Topic": TOPICS[b.topic] || "General", "Status": "New",
    "Received": new Date().toISOString(),
  };
  if (details) fields["Details"] = details;

  const r = await fetch(`https://api.airtable.com/v0/${BASE}/${TABLE}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ records: [{ fields }], typecast: true }),
  });
  if (!r.ok) { console.error("Airtable error", r.status, await r.text()); return res.status(502).json({ ok: false, error: "Could not send" }); }
  return res.status(200).json({ ok: true });
}
