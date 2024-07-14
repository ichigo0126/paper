import {
  Box,
  Flex,
  VStack,
  Container,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getReviews, getUserById } from "../firebase";
import Review from "./detail_area/Review";
import { CiBookmark } from "react-icons/ci";

interface HomeProps {
  currentUserId: string | null;
}

function Home({ currentUserId }: HomeProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsData = await getReviews();
      const reviewsWithUsernames = await Promise.all(
        reviewsData.map(async (review) => {
          const bookDetails = await getBookDetails(review.bookId);
          let username = "Unknown User";
          if (review.userId === currentUserId) {
            const userData = await getUserById(review.userId);
            if (userData) {
              username = userData.username;
            }
          }
          console.log("Review object:", review);
          console.log("User ID from review:", review.userId);
          return {
            ...review,
            bookDetails: bookDetails,
            username
          };
        })
      );
      setReviews(reviewsWithUsernames);
    };

    fetchReviews();
  }, [currentUserId]);

  const getBookDetails = async (bookId: any) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${bookId}`
      );
      const data = await response.json();
      return {
        title: data.volumeInfo.title,
        thumbnail: data.volumeInfo.imageLinks?.thumbnail || "",
      };
    } catch (error) {
      console.error("Error fetching book details:", error);
      return null;
    }
  };

  return (
    <Box pb={4} bg="gray.100" borderRadius="normal">
      <Container centerContent>
        <Flex gap={5} flexDirection={isMobile ? "column" : "row"}>
          <Box w={isMobile ? "full" : "69%"}>
            <Box p={4} pb={20} borderRadius="3xl" shadow="sm" w="300px">
              <VStack spacing={4} align="stretch">
                {reviews.map(
                  ({
                    name,
                    description,
                    id,
                    valueCount,
                    bookmarkCount,
                    targetType,
                    bookId,
                    engineerSkillLevel,
                    bookDetails,
                    createdAt,
                    username,
                    review
                  }) => (
                    <Review
                      key={review}
                      name={name}
                      description={description}
                      id={id}
                      valueCount={valueCount}
                      bookmarkCount={bookmarkCount}
                      targetType={targetType}
                      bookId={bookId}
                      engineerSkillLevel={engineerSkillLevel}
                      bookDetails={bookDetails}
                      createdAt={createdAt}
                      username={username} // Add this line
                    />
                  )
                )}
              </VStack>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default Home;
