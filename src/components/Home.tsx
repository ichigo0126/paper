import { Box, Flex, VStack, Container, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getReviews } from "../firebase";
import Review from "./detail_area/Review";

function Home() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsData = await getReviews();
      setReviews(reviewsData);
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
                {reviews.map(({ userId, description, stars, targetType, bookId, engineerSkillLevel, id }) => (
                  <Review
                    key={id}
                    userId={userId}
                    description={description}
                    targetType={targetType}
                    bookId={bookId}
                    engineerSkillLevel={engineerSkillLevel}
                    id={id}
                  />
                ))}
              </VStack>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default Home;