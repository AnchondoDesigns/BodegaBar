// Bodega Bar ATL — /api/apply
// Vercel serverless function. Receives the careers.html form and creates a record
// in Airtable → Bodega Bar HQ → Applicants. The Airtable token lives in Vercel env
// (AIRTABLE_TOKEN) and never touches the browser.
//
// Vercel env vars required:
//   AIRTABLE_TOKEN  — personal access token with data.records:write on base appZC0s6Jg5pr2DXi
//   AIRTABLE_BASE   — optional override (default appZC0s6Jg5pr2DXi)
//   AIRTABLE_TABLE  — optional override (default tblCibFQv5vDuLWQU)

const BASE = process.env.AIRTABLE_BASE || "appZC0s6Jg5pr2DXi";
const TABLE = process.env.AIRTABLE_TABLE || "tblCibFQv5vDuLWQU";

const POSITIONS = ["General Manager","Bartender","Barback","Server","Host","Line Cook","Prep Cook","Dishwasher","Security / Door"];
const SECOND = [...POSITIONS, "Open to anything"];
const HOURS = ["Full-time","Part-time","Either"];
const EXP = ["None — willing to learn","Under 1 year","1–3 years","3–5 years","5+ years"];
const AVAIL = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun","Days","Nights","Late night (after 12am)"];
const CERTS = ["ServSafe Food Handler","ServSafe Manager","TIPS / Alcohol Server","CPR / First Aid","Security Guard License","None yet"];

const pick = (v, allowed) => (allowed.includes(v) ? v : undefined);
const pickMany = (arr, allowed) => (Array.isArray(arr) ? arr.filter(x => allowed.includes(x)) : []);
const str = (v, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "POST only" });
  if (!process.env.AIRTABLE_TOKEN) return res.status(500).json({ ok: false, error: "Server not configured" });

  let b = req.body;
  if (typeof b === "string") { try { b = JSON.parse(b); } catch { b = {}; } }
  b = b || {};

  // honeypot — bots fill it, humans never see it
  if (str(b.website)) return res.status(200).json({ ok: true });

  const name = str(b.name, 120);
  const email = str(b.email, 200);
  const phone = str(b.phone, 40);
  const position = pick(b.position, POSITIONS);
  if (!name || !email || !phone || !position || b.consent !== true) {
    return res.status(400).json({ ok: false, error: "Missing required fields" });
  }

  const fields = {
    "Full Name": name,
    "Position Applying For": position,
    "Second Choice Position": pick(b.second, SECOND),
    "Status": "New",
    "Source": "Online form",
    "Phone": phone,
    "Email": email,
    "Neighborhood / ZIP": str(b.zip, 80),
    "18 or Older": b.over18 === true,
    "21 or Older": b.over21 === true,
    "Authorized to Work in US": b.authorized === true,
    "Availability": pickMany(b.availability, AVAIL),
    "Desired Hours": pick(b.hours, HOURS),
    "Start Date": /^\d{4}-\d{2}-\d{2}$/.test(str(b.start)) ? b.start : undefined,
    "Years of Experience": pick(b.experience, EXP),
    "Most Recent Job": str(b.job1, 300),
    "Previous Job": str(b.job2, 300),
    "Certifications": pickMany(b.certs, CERTS),
    "Why Bodega Bar": str(b.why, 3000),
    "Fun Fact": str(b.funfact, 1000),
    "Resume Link": /^https?:\/\//.test(str(b.resume)) ? str(b.resume, 500) : undefined,
    "Instagram": /^https?:\/\//.test(str(b.instagram)) ? str(b.instagram, 200) : undefined,
    "Referred By": str(b.referred, 120),
    "Reference 1": str(b.ref1, 300),
    "Reference 2": str(b.ref2, 300),
    "Signature Consent": true,
  };
  // drop undefined / empty
  Object.keys(fields).forEach(k => {
    const v = fields[k];
    if (v === undefined || v === "" || (Array.isArray(v) && !v.length)) delete fields[k];
  });
  // Instagram field is a URL type — accept bare handles too
  if (!fields["Instagram"] && str(b.instagram)) {
    fields["Instagram"] = "https://instagram.com/" + str(b.instagram, 60).replace(/^@/, "");
  }

  const r = await fetch(`https://api.airtable.com/v0/${BASE}/${TABLE}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ records: [{ fields }], typecast: true }),
  });

  if (!r.ok) {
    const t = await r.text();
    console.error("Airtable error", r.status, t);
    return res.status(502).json({ ok: false, error: "Could not save application" });
  }
  return res.status(200).json({ ok: true });
}
