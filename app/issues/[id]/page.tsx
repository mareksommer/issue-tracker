import prisma from "@/prisma/client";
import { Box, Grid, Flex } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./edit/DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";
interface Props {
  params: { id: string };
}

const fetchIssue = cache((issueId: number) => {
  return prisma.issue.findUnique({
    where: { id: issueId },
  });
});

async function IssueDetailPage({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));
  if (!issue) notFound();

  const session = await getServerSession(authOptions);
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
}

export default IssueDetailPage;

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));

  return {
    title: issue?.title,
    description: `Issue details for ${issue?.id}`,
  };
}
