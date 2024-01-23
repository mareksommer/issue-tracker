'use client'

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";

const status: { label: string; value: Status | 'ALL' }[] = [
  { label: "All", value: "ALL"},
  { label: "Open", value: "OPEN" },
  { label: "Open", value: "IN_PROGRESS" },
  { label: "Done", value: "DONE" },
];

function IssueStatusFIlter() {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {status.map((item) => (
          <Select.Item value={item.value} key={item.value}>
            {item.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}

export default IssueStatusFIlter;
