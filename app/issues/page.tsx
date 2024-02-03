import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { Link, IssueStatusBadge } from "@/app/components";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "../components/Pagination";
interface Props {
  searchParams: {
    status?: Status;
    orderBy?: keyof Issue;
    sortOrder?: "asc" | "desc";
    page?: string;
  };
}

async function IssuesPage({ searchParams }: Props) {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const getOrderBy = () => {
    if (!searchParams.orderBy) return undefined;
    if (!columns.map((column) => column.value).includes(searchParams.orderBy))
      return undefined;

    return {
      [searchParams.orderBy]: getSortOrder(),
    };
  };
  const where = {
    status: status,
  }

  const getSortOrder = () => {
    const defaultSortOrder = "asc";
    if (!searchParams.sortOrder) return defaultSortOrder;
    if (searchParams.sortOrder !== "asc" && searchParams.sortOrder !== "desc")
      return defaultSortOrder;
    return searchParams.sortOrder;
  };

  const page = parseInt(searchParams.page || "1");
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy: getOrderBy(),
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where
  });

  const getArrowIcon = (column: keyof Issue) => {
    if (column !== searchParams.orderBy) return null;
    if (searchParams.sortOrder === "asc")
      return <ArrowUpIcon className="inline" />;
    return <ArrowDownIcon className="inline" />;
  };

  return (
    <div>
      <IssueActions />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    pathname: "/issues",
                    query: {
                      ...searchParams,
                      orderBy: column.value,
                      sortOrder:
                        searchParams.sortOrder === "asc" ? "desc" : "asc",
                    },
                  }}
                >
                  {column.label}
                </NextLink>
                {getArrowIcon(column.value)}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={page} />
    </div>
  );
}

export const dynamic = "force-dynamic";

export default IssuesPage;
