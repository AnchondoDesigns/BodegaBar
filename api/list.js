// Bodega Bar ATL — /api/list
// Homepage "Get on the List" → Airtable → Bodega Bar HQ → Guest List.
// Uses the same AIRTABLE_TOKEN env var as /api/apply.

const BASE = process.env.AIRTABLE_BASE || "appZC0s6Jg5pr2DXi";
const TABLE = "tblnMZ8G3Nq4q9pmH";
const str = (v, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "POST only" });
  if (!process.env.AIRTABLE_TOKEN) return res.status(500).json({ ok: false, error: "Server not configured" });
  let b = req.body; if (typeof b === "string") { try { b = JSON.parse(b); } catch { b = {}; } } b = b || {};
  if (str(b.website)) return res.status(200).json({ ok: true }); // honeypot

  const email = str(b.email);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return res.status(400).json({ ok: false, error: "Valid email required" });
  const cell = str(b.cell, 40);

  const fields = { "Email": email, "Source": "Website", "Signed Up": new Date().toISOString() };
  if (cell) { fields["Cell"] = cell; fields["SMS OK"] = true; }

  const r = await fetch(`https://api.airtable.com/v0/${BASE}/${TABLE}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ records: [{ fields }], typecast: true }),
  });
  if (!r.ok) { console.error("Airtable error", r.status, await r.text()); return res.status(502).json({ ok: false, error: "Could not save" }); }
  return res.status(200).json({ ok: true });
}
