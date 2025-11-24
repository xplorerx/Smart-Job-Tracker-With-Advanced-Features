import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateAliasLocal, aliasAddress } from "@/lib/alias";
import { hash } from "bcryptjs";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, name, password } = body;
  if (!email || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: "User exists" }, { status: 409 });

  const aliasLocal = generateAliasLocal(email);
  const user = await prisma.user.create({
    data: { email, name, aliasLocal, passwordHash: await hash(password, 10) }
  });

  return NextResponse.json({
    id: user.id,
    email: user.email,
    aliasLocal: user.aliasLocal,
    aliasAddress: aliasAddress(user.aliasLocal, process.env.APP_EMAIL_DOMAIN || "example.com")
  });
}
