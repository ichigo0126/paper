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
    searchText: string;
  };
}

interface ReviewData {
  name: string
  userId: string | undefined;
  description: string;
  targetType: string;
  id: string;
  bookId: string;
  engineerSkillLevel: string;
  valueCount: number;
  bookmarkCount: number;
  tags: string[];
  bookDetails: {
    title: string;
    thumbnail: string;
  } | null;
  createdAt: {
    toDate: () => Date;
  };
  username: string;
  photoURL: string | null;
}

interface UserData {
  id: string;
  displayName?: string;
  photoURL?: string | null;
}

interface BookDetails {
  title: string;
  thumbnail: string;
}

function Home({ currentUserId, searchParams }: HomeProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<ReviewData[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const rawReviewsData = await getReviews();
      console.log("Raw reviews data:", rawReviewsData); // デバッグ用ログ

      const reviewsData: ReviewData[] = rawReviewsData.map((review) => ({
        name: review.name,
        userId: review.userId || "",
        description: review.description || "",
        targetType: review.targetType || "",
        id: review.id,
        bookId: review.bookId,
        engineerSkillLevel: review.engineerSkillLevel || "",
        valueCount: review.valueCount || 0,
        bookmarkCount: review.bookmarkCount || 0,
        tags: review.tags || [],
        bookDetails: null,
        createdAt: review.createdAt || { toDate: () => new Date() },
        username: "",
        photoURL: null,
      }));

      const reviewsWithUserInfo = await Promise.all(
        reviewsData.map(async (review) => {
          const bookDetails = await getBookDetails(review.bookId); // bookIdを使用
          let username = "Unknown User";
          let photoURL = null;
          if (review.userId) {
            const userData: UserData | null = await getUserById(review.userId);
            if (userData) {
              username = userData.displayName || "Unknown User";
              photoURL = userData.photoURL || null;
            }
          }
          return {
            ...review,
            bookDetails: bookDetails || { title: "Unknown", thumbnail: "" },
            username,
            photoURL,
          };
        })
      );
      setReviews(reviewsWithUserInfo);
      setFilteredReviews(reviewsWithUserInfo);
    };

    fetchReviews();
  }, [currentUserId]);

  useEffect(() => {
    const { tags, mediaType, difficulty, searchText } = searchParams;
    const filtered = reviews.filter((review) => {
      const hasMatchingTags =
        tags.length === 0 || tags.some((tag) => review.tags.includes(tag));
      const matchesMediaType =
        mediaType === "" || review.targetType === mediaType;
      const matchesDifficulty =
        difficulty === "" || review.engineerSkillLevel === difficulty;
      const matchesSearchText =
        searchText === "" ||
        review.description.toLowerCase().includes(searchText.toLowerCase()) ||
        (review.bookDetails &&
          review.bookDetails.title
            .toLowerCase()
            .includes(searchText.toLowerCase()));
      return (
        hasMatchingTags &&
        matchesMediaType &&
        matchesDifficulty &&
        matchesSearchText
      );
    });
    setFilteredReviews(filtered);
  }, [searchParams, reviews]);

  const getBookDetails = async (
    bookId: string
  ): Promise<BookDetails | null> => {
    if (!bookId) {
      console.error("Invalid bookId:", bookId);
      return null;
    }
    console.log(`Fetching book details for ID: ${bookId}`);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${bookId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Book API response:", JSON.stringify(data, null, 2));

      if (!data.volumeInfo) {
        console.error("volumeInfo not found in API response");
        return null;
      }

      const bookDetails = {
        title: data.volumeInfo.title || "Unknown Title",
        thumbnail:
          data.volumeInfo.imageLinks?.thumbnail ||
          "https://via.placeholder.com/128x196?text=No+Image",
      };
      console.log("Processed book details:", bookDetails);
      return bookDetails;
    } catch (error) {
      console.error("Error fetching book details:", error);
      return null;
    }
  };

  return (
    <Box pb={4} bg="gray.100" borderRadius="normal" h="100vh">
      <Container centerContent>
        <Flex gap={5} flexDirection={isMobile ? "column" : "row"}>
          <Box w={isMobile ? "full" : "69%"}>
            <Box
              mt="80px"
              p={4}
              pb={20}
              borderRadius="3xl"
              shadow="sm"
              w="300px"
            >
              <VStack spacing={4} align="stretch">
                {filteredReviews.map(
                  ({
                    description,
                    id,
                    bookId,
                    valueCount,
                    bookmarkCount,
                    targetType,
                    engineerSkillLevel,
                    bookDetails,
                    createdAt,
                    username,
                    tags,
                    photoURL,
                    name,
                  }) => (
                    <Review
                      name={name}
                      key={id}
                      username={username}
                      photoURL={photoURL}
                      description={description}
                      bookId={bookId}
                      valueCount={valueCount}
                      id={id}
                      bookmarkCount={bookmarkCount}
                      targetType={targetType}
                      engineerSkillLevel={engineerSkillLevel}
                      bookDetails={
                        bookDetails || { title: "Unknown", thumbnail: "" }
                      }
                      createdAt={createdAt.toDate()}
                      tags={tags}
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
