import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions as any);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();

  const interview = await prisma.interview.create({
    data: {
      applicationId: body.applicationId,
      type: body.type,
      scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : null,
      location: body.location ?? null
    }
  });

  return NextResponse.json(interview);
}
