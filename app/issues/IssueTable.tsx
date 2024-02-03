import { IssueStatusBadge, Link } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

export interface IssueQuery {
  status?: Status;
  orderBy?: keyof Issue;
  sortOrder?: "asc" | "desc";
  page?: string;
}

async function IssueTable({ searchParams, issues }: Props) {
  const getArrowIcon = (column: keyof Issue) => {
    if (column !== searchParams.orderBy) return null;
    if (searchParams.sortOrder === "asc")
      return <ArrowUpIcon className="inline" />;
    return <ArrowDownIcon className="inline" />;
  };

  return (
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
  );
}

export default IssueTable;

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map((column) => column.value);
