import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Container,
  useBreakpointValue,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import Review from "./detail_area/Review";
import { User } from "firebase/auth";
import { auth } from "../firebase";
import { useLike } from "../components/LikeContext";

const MyLikePage = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { likedReviews } = useLike();
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
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Text>ログインしてください。</Text>
      </Box>
    );
  }

  return (
    <Box pt={2.5} pb={4} bg="gray.100" borderRadius="normal" minH="100vh">
      <Container maxW="1587px" mt={6}>
        <Flex gap={5} flexDirection={isMobile ? "column" : "row"}>
          <VStack spacing={4} align="stretch" w="full">
            {likedReviews.length > 0 ? (
              likedReviews.map((review) => (
                <Review
                  key={review.id}
                  {...review}
                  id={review.id}
                  name={review.username}
                  username={review.username}
                  photoURL={review.photoURL || null}
                  currentUsername={currentUser.displayName || ""}
                />
              ))
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="50vh"
              >
                <Text>いいねしたレビューはまだありません。</Text>
              </Box>
            )}
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default MyLikePage;