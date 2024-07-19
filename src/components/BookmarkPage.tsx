import {
  Box,
  Flex,
  VStack,
  Text,
  Container,
  useBreakpointValue,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Review from "./detail_area/Review";
import { useBookmark } from "./BookmarkContext";
import { getReviews, getUserById } from "../firebase";

const BookmarkPage = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { bookmarkedReviews } = useBookmark();
  const [reviews, setReviews] = useState(bookmarkedReviews);

  useEffect(() => {
    setReviews(bookmarkedReviews);
  }, [bookmarkedReviews]);

  if (!reviews.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Text>ブックマークしたレビューはまだありません。</Text>
      </Box>
    );
  }

  return (
    <Box pt={2.5} pb={4} bg="gray.100" borderRadius="normal" h="100vh">
      <Container maxW="1587px" mt={6}>
        <Flex gap={5} flexDirection={isMobile ? "column" : "row"}>
          <VStack spacing={4} align="stretch" w="full">
            {reviews.map((review) => (
              <Review name={review.name} currentUsername={review.currentUsername} key={review.id} {...review} />
            ))}
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default BookmarkPage;
