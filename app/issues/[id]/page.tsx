import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

async function IssueDetailPage({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();
  return <div>
    <h1>{issue.title}</h1>
    <div>{issue.description}</div>
    <p>{issue.status}</p>
    <p>{issue.createdAt.toDateString()}</p>
  </div>;
}

export default IssueDetailPage;
