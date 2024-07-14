import { Box, Flex, VStack, Container, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getReviews, getUserById } from "../firebase";
import Review from "./detail_area/Review";
import { CiBookmark } from "react-icons/ci";

function Home() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsData = await getReviews();
      const reviewsWithUsernames = await Promise.all(
        reviewsData.map(async (review) => {
          const user = await getUserById(review.userId);
          return {
            ...review,
            username: user ? user.name : "",
          };
        })
      );
      setReviews(reviewsWithUsernames);
    };

    fetchReviews();
  }, []);

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
                  }) => (
                    <Review
                      key={id}
                      name={name}
                      description={description}
                      id={id}
                      valueCount={valueCount}
                      bookmarkCount={bookmarkCount}
                      targetType={targetType}
                      bookId={bookId}
                      engineerSkillLevel={engineerSkillLevel}
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