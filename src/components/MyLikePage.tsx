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
import { useEffect, useState } from 'react';
import { Auth, User } from 'firebase/auth';
import { auth, getUserById, getReviewById } from '../firebase';

function MyLikePage() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { likedReviews } = useLike();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [reviewsWithUserInfo, setReviewsWithUserInfo] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = (auth as Auth).onAuthStateChanged((user: User | null) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("Liked reviews:", likedReviews); // デバッグ用

    const fetchReviewsAndUserInfo = async () => {
      const updatedReviews = await Promise.all(
        likedReviews.map(async (likedReview) => {
          const reviewData = await getReviewById(likedReview.id);
          const userData = await getUserById(reviewData.userId);
          return {
            ...reviewData,
            photoURL: userData?.photoURL || null,
            username: userData?.displayName || "Unknown",
          };
        })
      );
      console.log("Updated reviews:", updatedReviews); // デバッグ用
      setReviewsWithUserInfo(updatedReviews);
    };

    fetchReviewsAndUserInfo();
  }, [likedReviews]);

  console.log("Rendering reviews:", reviewsWithUserInfo); // デバッグ用

  return (
    <Box pt={2.5} pb={4} bg="gray.100" borderRadius="normal" h="100vh">
      <Container maxW="1587px" mt={6}>
        <Flex gap={5} flexDirection={isMobile ? "column" : "row"}>
          <VStack spacing={4} align="stretch" w="full">
            {reviewsWithUserInfo.length > 0 ? (
              reviewsWithUserInfo.map((review) => (
                <Review 
                  key={review.id} 
                  {...review} 
                  id={review.id}
                  name={review.username}
                  username={review.username}
                  photoURL={review.photoURL}
                  currentUsername={currentUser?.displayName || ""}
                />
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