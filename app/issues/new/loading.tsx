import { Box } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function LoadingNewIssuePage() {
  return (
    <Box className="max-w-xl">
      <Skeleton width="4rem" />
      <Skeleton height="20rem" />
    </Box>
  );
}

export default LoadingNewIssuePage;
