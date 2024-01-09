import Server from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../validationSchemas";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(request: Server.NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return Server.NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();

  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return Server.NextResponse.json(validation.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return Server.NextResponse.json(newIssue, { status: 201 });
}
