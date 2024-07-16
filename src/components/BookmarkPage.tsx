import {
  Box,
  Flex,
  VStack,
  Text,
  Container,
  useBreakpointValue,
} from "@chakra-ui/react";
import Review from "./detail_area/Review";
import { useBookmark } from './BookmarkContext';

function BookmarkPage() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { bookmarkedReviews } = useBookmark();

  return (
    <Box pt={2.5} pb={4} bg="gray.100" borderRadius="normal" h="100vh">
      <Container maxW="1587px" mt={6}>
        <Flex gap={5} flexDirection={isMobile ? "column" : "row"}>
          <VStack spacing={4} align="stretch" w="full">
            {bookmarkedReviews.length > 0 ? (
              bookmarkedReviews.map((review) => (
                <Review key={review.id} {...review} />
              ))
            ) : (
              <Text>ブックマークしたレビューはまだありません。</Text>
            )}
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
}

export default BookmarkPage;