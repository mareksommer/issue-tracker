import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import Pagination from "../components/Pagination";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Metadata } from "next";
interface Props {
  searchParams: IssueQuery;
}

async function IssuesPage({ searchParams }: Props) {
  const statuses = Object.values(Status);
  const getStatus = () => {
    if (!searchParams.status) return undefined;
    return statuses.includes(searchParams.status)
      ? searchParams.status
      : undefined;
  };
  const where = {
    status: getStatus(),
  };
  const getSortOrder = () => {
    const defaultSortOrder = "asc";
    if (!searchParams.sortOrder) return defaultSortOrder;
    if (searchParams.sortOrder !== "asc" && searchParams.sortOrder !== "desc")
      return defaultSortOrder;
    return searchParams.sortOrder;
  };

  const getOrderBy = () => {
    if (!searchParams.orderBy) return undefined;
    if (!columnNames.includes(searchParams.orderBy)) return undefined;

    return {
      [searchParams.orderBy]: getSortOrder(),
    };
  };

  const page = parseInt(searchParams.page || "1");
  const pageSize = 10;
  const issueCount = await prisma.issue.count({
    where,
  });

  const issues = await prisma.issue.findMany({
    where,
    orderBy: getOrderBy(),
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return (
    <Flex direction="column" gap="2">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
}

export const dynamic = "force-dynamic";

export default IssuesPage;

export const metadata: Metadata = {
  title: "Issue tracker - list",
  description: "List of issues",
}
