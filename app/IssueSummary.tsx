import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

function IssueSummary({ open, inProgress, closed }: Props) {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In Progress", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed", value: closed, status: "DONE" },
  ];
  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" align="center" gap="1">
            <Link
              className="text-sm font-meidum"
              href={`/issues/?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}

export default IssueSummary;
