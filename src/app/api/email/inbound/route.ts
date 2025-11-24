import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const raw = await req.text();
  const signature = req.headers.get("x-webhook-signature") || "";
  const secret = process.env.EMAIL_WEBHOOK_SECRET || "";
  const expected = crypto.createHmac("sha256", secret).update(raw).digest("hex");

  const ok = signature.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  if (!ok) return NextResponse.json({ error: "Invalid signature" }, { status: 401 });

  const payload = JSON.parse(raw) as {
    to: string; from: string; subject: string;
    snippet?: string; receivedAt?: string; providerId?: string;
  };

  const localPart = payload.to.split("@")[0];
  const aliasLocal = localPart.split("+")[0];

  const user = await prisma.user.findFirst({ where: { aliasLocal } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const domain = payload.from.split("@")[1]?.toLowerCase();
  const app = await prisma.application.findFirst({
    where: { userId: user.id, OR: [{ source: { contains: domain } }, { notes: { contains: domain } }] },
    orderBy: { createdAt: "desc" }
  });

  const email = await prisma.emailThread.create({
    data: {
      applicationId: app?.id,
      subject: payload.subject,
      fromEmail: payload.from,
      toEmail: payload.to,
      snippet: payload.snippet,
      providerId: payload.providerId,
      receivedAt: payload.receivedAt ? new Date(payload.receivedAt) : new Date()
    }
  });

  return NextResponse.json({ ok: true, emailId: email.id, linkedApplicationId: app?.id ?? null });
}
