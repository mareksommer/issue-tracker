import Server from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../validationSchemas";

export async function POST(request: Server.NextRequest) {
  const body = await request.json();
  
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success)
    return Server.NextResponse.json(validation.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return Server.NextResponse.json(newIssue, { status: 201 });
}
