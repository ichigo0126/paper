import {
  Box,
  Flex,
  Text,
  Container,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import Review from "./detail_area/Review";
import { useLike } from '../components/LikeContext';

function MyLikePage() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { likedReviews } = useLike();

  return (
    <Box pt={2.5} pb={4} bg="gray.100" borderRadius="normal" h="100vh">
      <Container maxW="1587px" mt={6}>
        <Flex gap={5} flexDirection={isMobile ? "column" : "row"}>
          <VStack spacing={4} align="stretch" w="full">
            {likedReviews.length > 0 ? (
              likedReviews.map((review) => (
                <Review key={review.id} {...review} />
              ))
            ) : (
              <Text>いいねしたレビューはまだありません。</Text>
            )}
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
}

export default MyLikePage;