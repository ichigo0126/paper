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

interface HomeProps {
  currentUserId: string | null;
  searchParams: {
    tags: string[];
    mediaType: string;
    difficulty: string;
  };
}

interface ReviewData {
  userId: string;
  name: string;
  description: string;
  targetType: string;
  bookId: string;
  engineerSkillLevel: string;
  id: number;
  valueCount: number;
  bookmarkCount: number;
  tags: string[];
  bookDetails: {
    title: string;
    thumbnail: string;
  };
  createdAt: {
    toDate: () => Date;
  };
  username: string;
}

function Home({ currentUserId, searchParams }: HomeProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<ReviewData[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsData = await getReviews();
      const reviewsWithUsernames = await Promise.all(
        reviewsData.map(async (review) => {
          const bookDetails = await getBookDetails(review.bookId);
          let username = "Unknown User";
          const userData = await getUserById(review.userId);
          if (userData) {
            username = userData.username;
          }
          return {
            ...review,
            bookDetails: bookDetails,
            username,
          };
        })
      );
      setReviews(reviewsWithUsernames);
      setFilteredReviews(reviewsWithUsernames);
    };

    fetchReviews();
  }, [currentUserId]);

  useEffect(() => {
    const { tags, mediaType, difficulty } = searchParams;
    const filtered = reviews.filter((review) => {
      const hasMatchingTags = tags.length === 0 || tags.some(tag => review.tags.includes(tag));
      const matchesMediaType = mediaType === "" || review.targetType === mediaType;
      const matchesDifficulty = difficulty === "" || review.engineerSkillLevel === difficulty;
      return hasMatchingTags && matchesMediaType && matchesDifficulty;
    });
    setFilteredReviews(filtered);
  }, [searchParams, reviews]);

  const getBookDetails = async (bookId: string) => {
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
                {filteredReviews.map(
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
                    tags,
                  }) => (
                    <Review
                      key={id}
                      currentUsername={currentUserId || ""}
                      username={username}
                      description={description}
                      id={id}
                      valueCount={valueCount}
                      bookmarkCount={bookmarkCount}
                      targetType={targetType}
                      bookId={bookId}
                      engineerSkillLevel={engineerSkillLevel}
                      bookDetails={bookDetails}
                      createdAt={createdAt}
                      tags={tags}
                      name={""}
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