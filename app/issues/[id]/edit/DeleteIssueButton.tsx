import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

function DeleteIssueButton({ issueId }: { issueId: Number }) {
  return (
    <Button color="red">
      <TrashIcon /> Delete Issue
    </Button>
  );
}

export default DeleteIssueButton;