import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions as any);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session as any).userId as string;

  const counts = await prisma.application.groupBy({
    by: ["status"],
    where: { userId },
    _count: { status: true }
  });

  const totalApps = await prisma.application.count({ where: { userId } });
  const responses = await prisma.emailThread.count({ where: { application: { userId } } });
  const offers = await prisma.application.count({ where: { userId, status: "OFFER" } });

  const recentEmails = await prisma.emailThread.findMany({
    where: { application: { userId } },
    orderBy: { receivedAt: "desc" },
    take: 10,
    select: { subject: true, fromEmail: true, receivedAt: true, applicationId: true }
  });

  return NextResponse.json({
    counts,
    totalApps,
    responseRate: totalApps ? responses / totalApps : 0,
    offerRate: totalApps ? offers / totalApps : 0,
    recentEmails
  });
}
