import React, { useEffect, useState } from "react";
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
import { Auth, User } from "firebase/auth";
import { auth, getUserById, getReviewById, getUserLikes } from "../firebase";
import { useLike } from "../components/LikeContext";

const MyLikePage = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { likedReviews } = useLike();
  const [reviewsWithUserInfo, setReviewsWithUserInfo] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = (auth as Auth).onAuthStateChanged((user: User | null) => {
      console.log("Auth state changed:", user?.uid);
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserLikes = async () => {
      if (currentUser) {
        setIsLoading(true);
        try {
          console.log("Fetching likes for user:", currentUser.uid);
          const userLikes = await getUserLikes(currentUser.uid);
          console.log("User likes:", userLikes);
    
          if (userLikes.length === 0) {
            console.log("No likes found for user");
            setReviewsWithUserInfo([]);
            setIsLoading(false);
            return;
          }
    
          const updatedReviews = await Promise.all(
            userLikes.map(async (likeData) => {
              console.log("Fetching review:", likeData.reviewId);
              try {
                const reviewData = await getReviewById(likeData.reviewId);
                console.log("Review data:", reviewData);
                if (reviewData) {
                  const userData = await getUserById(reviewData.userId);
                  console.log("User data:", userData);
                  return {
                    ...reviewData,
                    photoURL: userData?.photoURL || null,
                    username: userData?.displayName || "Unknown",
                  };
                } else {
                  console.log("Review not found:", likeData.reviewId);
                }
              } catch (error) {
                console.error("Error fetching review:", likeData.reviewId, error);
              }
              return null;
            })
          );
    
          const filteredReviews = updatedReviews.filter((review) => review !== null);
          console.log("Filtered reviews:", filteredReviews);
          setReviewsWithUserInfo(filteredReviews);
        } catch (error) {
          console.error("Error fetching user likes:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.log("No current user");
        setIsLoading(false);
      }
    };

    if (currentUser) {
      fetchUserLikes();
    } else {
      setIsLoading(false);
    }
  }, [currentUser, likedReviews]);

  console.log("Rendering. reviewsWithUserInfo:", reviewsWithUserInfo);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box pt={2.5} pb={4} bg="gray.100" borderRadius="normal" minH="100vh">
      <Container maxW="1587px" mt={6}>
        <Flex gap={5} flexDirection={isMobile ? "column" : "row"}>
          <VStack spacing={4} align="stretch" w="full">
            {reviewsWithUserInfo.length > 0 ? (
              reviewsWithUserInfo.map((review) => (
                <Review
                  key={review.id}
                  {...review}
                  id={review.id.toString()}
                  name={review.username}
                  username={review.username}
                  photoURL={review.photoURL}
                  currentUsername={currentUser?.displayName || ""}
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
