import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssue from "./LatestIssue";
import IssueChart from "./IssueChart";
import { Grid, Flex } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "DONE" } });

  return (
    <>
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Flex direction="column" gap="5">
          <IssueSummary open={open} inProgress={inProgress} closed={closed} />
          <IssueChart open={open} inProgress={inProgress} closed={closed} />
        </Flex>
        <LatestIssue />
      </Grid>
    </>
  );
}

export const metadata: Metadata = {
  title: "Issue tracker dashboard",
  description: "Dashboard for issues",
}
