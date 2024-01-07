import { Skeleton } from "@/app/components";
import { Box } from "@radix-ui/themes";
import React from "react";

function IssueFormSkeleton() {
  return (
    <Box className="max-w-xl">
      <Skeleton width="20rem" height="2rem" />
      <Skeleton height="20rem" />
    </Box>
  );
}

export default IssueFormSkeleton;
