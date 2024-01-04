import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

function LoadingIssueDetailPage() {
  return (
    <Box>
      <Heading>
        <Skeleton className="max-w-xl"/>
      </Heading>
      <Flex gap="3" my="2">
        <Skeleton width="5rem" />
        <Text>
          <Skeleton width="8rem" />
        </Text>
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
}

export default LoadingIssueDetailPage;
