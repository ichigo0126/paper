import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  VStack,
  Text,
  Container,
  useBreakpointValue,
  Spinner,
} from "@chakra-ui/react";
import Review from "./detail_area/Review";
import { useBookmark } from "./BookmarkContext";
import { auth } from "../firebase";
import { User } from "firebase/auth";

const BookmarkPage = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { bookmarkedReviews } = useBookmark();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!currentUser) {
    return (
      <Box
        display="flex"
        bg="gray.100"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Text>ログインしてください。</Text>
      </Box>
    );
  }

  if (!bookmarkedReviews.length) {
    return (
      <Box
        display="flex"
        bg="gray.100"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Text>ブックマークしたレビューはまだありません。</Text>
      </Box>
    );
  }

  return (
    <Box pt={2.5} pb={4} borderRadius="normal" minH="100vh" bg="gray.100">
      <Container maxW="1587px" mt={6}>
        <Flex gap={5} flexDirection={isMobile ? "column" : "row"}>
          <VStack spacing={4} align="stretch" w="full">
            {bookmarkedReviews.map((review) => (
              <Review
                key={review.id}
                {...review}
                name={review.username}
                currentUsername={currentUser.displayName || ""}
              />
            ))}
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default BookmarkPage;
