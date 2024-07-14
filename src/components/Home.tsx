import { Box, Flex, VStack, Container, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getReviews } from "../firebase";
import Review from "./detail_area/Review";
import { useState } from "react";
import { CiBookmark } from "react-icons/ci";

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
                {postContent.map(
                  ({
                    name,
                    username,
                    year,
                    title,
                    description,
                    id,
                    valueCount,
                    bookmarkCount,
                  }) => (
                    <Review
                      name={name}
                      username={username}
                      year={year}
                      title={title}
                      description={description}
                      id={id}
                      valueCount={valueCount}
                      bookmarkCount={bookmarkCount}
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