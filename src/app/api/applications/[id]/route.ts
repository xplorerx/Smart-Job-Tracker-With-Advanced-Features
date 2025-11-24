import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions as any);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();

  const app = await prisma.application.update({
    where: { id: params.id },
    data: {
      status: body.status,
      notes: body.notes,
      tags: body.tags,
      appliedDate: body.appliedDate ? new Date(body.appliedDate) : undefined
    }
  });

  return NextResponse.json(app);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions as any);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.application.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
