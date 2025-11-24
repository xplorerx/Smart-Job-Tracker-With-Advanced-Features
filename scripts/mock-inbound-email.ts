import crypto from "crypto";
import fetch from "node-fetch";

const endpoint = process.env.MOCK_ENDPOINT || "http://localhost:3000/api/email/inbound";
const secret = process.env.EMAIL_WEBHOOK_SECRET || "dev-secret";

async function main() {
  const payload = {
    to: process.env.MOCK_TO || "demo-123+apply@example.com",
    from: "recruiter@company.com",
    subject: "Interview invitation for Senior Engineer",
    snippet: "We’d like to invite you to a technical screen...",
    receivedAt: new Date().toISOString(),
    providerId: "mock-123"
  };
  const raw = JSON.stringify(payload);
  const sig = crypto.createHmac("sha256", secret).update(raw).digest("hex");

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json", "x-webhook-signature": sig },
    body: raw
  });

  const text = await res.text();
  console.log(res.status, text);
}

main().catch((e) => { console.error(e); process.exit(1); });
