import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions as any);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const apps = await prisma.application.findMany({
    where: { userId: (session as any).userId },
    include: { company: true, job: true, interviews: true, emails: true },
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json(apps);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions as any);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();

  const app = await prisma.application.create({
    data: {
      userId: (session as any).userId,
      status: body.status || "SAVED",
      appliedDate: body.appliedDate ? new Date(body.appliedDate) : null,
      source: body.source || null,
      notes: body.notes || null,
      tags: body.tags || [],
      company: body.company
        ? { create: { name: body.company.name, website: body.company.website ?? null } }
        : undefined,
      job: body.job
        ? { create: { title: body.job.title, sourceUrl: body.job.sourceUrl ?? null } }
        : undefined
    }
  });

  return NextResponse.json(app);
}
