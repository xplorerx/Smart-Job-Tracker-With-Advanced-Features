import { prisma } from "../src/lib/prisma";
import { hash } from "bcryptjs";
import { generateAliasLocal } from "../src/lib/alias";

async function main() {
  const email = "demo@example.com";
  const aliasLocal = generateAliasLocal(email);
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "Demo User",
      aliasLocal,
      passwordHash: await hash("demo1234", 10)
    }
  });

  const company = await prisma.company.create({
    data: { name: "Acme Corp", website: "https://acme.example" }
  });

  const job = await prisma.job.create({
    data: { title: "Frontend Engineer", sourceUrl: "https://jobs.example/frontend" }
  });

  const app1 = await prisma.application.create({
    data: {
      userId: user.id,
      companyId: company.id,
      jobId: job.id,
      status: "APPLIED",
      appliedDate: new Date(),
      source: "company.com",
      notes: "Referred by Jane",
      tags: ["frontend", "react"]
    }
  });

  const app2 = await prisma.application.create({
    data: { userId: user.id, status: "SAVED", notes: "To apply later", tags: ["backend", "node"] }
  });

  await prisma.interview.create({
    data: {
      applicationId: app1.id,
      type: "Screen",
      scheduledAt: new Date(Date.now() + 3 * 24 * 3600 * 1000),
      location: "Zoom"
    }
  });

  await prisma.emailThread.create({
    data: {
      applicationId: app1.id,
      subject: "Thanks for applying!",
      fromEmail: "recruiter@company.com",
      toEmail: `${aliasLocal}+apply@example.com`,
      snippet: "We received your application."
    }
  });

  console.log("Seed complete. Alias local:", aliasLocal);
}

main().finally(() => prisma.$disconnect());
