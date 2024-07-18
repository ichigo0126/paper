import {
  Box,
  Flex,
  VStack,
  Container,
  useBreakpointValue,
  Text,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Profile from "./detail_area/Profile";
import Review from "./detail_area/Review";
import { getReviews, getUserById } from "../firebase";

interface MyPageProps {
  currentUserId: string | null;
}

interface ReviewData {
  userId: string;
  photoURL: string;
  username: string;
  description: string;
  targetType: string;
  bookId: string;
  engineerSkillLevel: string;
  id: string;
  valueCount: number;
  bookmarkCount: number;
  bookDetails: {
    title: string;
    thumbnail: string;
  } | null;
  createdAt: {
    toDate: () => Date;
  };
  tags: string[];
}

interface UserProfile {
  username: string;
  reviewCount: number;
  valueCount: number;
  description: string;
  followCount: number;
  followedCount: number;
  photoURL: string;
}

interface UserData {
  id: string;
  displayName?: string;
  valueCount?: number;
  description?: string;
  followCount?: number;
  followedCount?: number;
  photoURL?: string;
}

function MyPage({ currentUserId }: MyPageProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (currentUserId) {
        try {
          // ユーザープロフィールの取得
          const userData: UserData | null = await getUserById(currentUserId);
          if (userData) {
            setUserProfile({
              username: userData.displayName || "ユーザー名なし",
              reviewCount: 0, // この値は後で更新します
              valueCount: userData.valueCount || 0,
              description: userData.description || "",
              followCount: userData.followCount || 0,
              followedCount: userData.followedCount || 0,
              photoURL: userData.photoURL || "",
            });
          }

          // レビューの取得
          const reviewsData = await getReviews();
          const myReviews = reviewsData.filter(review => review.userId === currentUserId);

          const reviewsWithDetails = await Promise.all(
            myReviews.map(async (review) => {
              const bookDetails = await getBookDetails(review.bookId);
              return {
                ...review,
                bookDetails: bookDetails,
                username: userData?.displayName || "Unknown User",
                photoURL: userData?.photoURL || "",
              };
            })
          );
          setReviews(reviewsWithDetails);

          // ユーザープロフィールのレビュー数を更新
          setUserProfile(prevProfile => ({
            ...prevProfile!,
            reviewCount: reviewsWithDetails.length,
          }));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [currentUserId]);

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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!userProfile) {
    return (
      <Box textAlign="center" mt={10}>
        <Text fontSize="xl">ユーザー情報が見つかりません。ログインしてください。</Text>
      </Box>
    );
  }

  return (
    <Box pt={2.5} pb={4} bg="gray.100" borderRadius="normal">
      <Container maxW="1587px" mt={6}>
        <Flex gap={5} flexDirection={isMobile ? "column" : "row"}>
          <Profile
            name={userProfile.username}
            reviewCount={userProfile.reviewCount}
            valueCount={userProfile.valueCount}
            description={userProfile.description}
            followCount={userProfile.followCount}
            followedCount={userProfile.followedCount}
            photoURL={userProfile.photoURL}
          />
          <Box w={isMobile ? "full" : "69%"}>
            <Box p={4} pb={20} bg="gray.50" borderRadius="3xl" shadow="sm">
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="lg" fontWeight="light">
                  フォロー {userProfile.followCount}
                </Text>
              </Flex>

              <Divider my={2} borderWidth="2px" borderColor="gray.500" />
              <VStack spacing={6} align="stretch">
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <Box key={review.id} width="100%" bg="white" borderRadius="md" p={4} shadow="md">
                      <Review
                        {...review}
                        name={review.username || ""}
                        id={review.id}
                        />
                      {index !== reviews.length - 1 && (
                        <Divider mt={6} borderWidth="1px" borderColor="gray.400" />
                      )}
                    </Box>
                  ))
                ) : (
                  <Text>自分のレビューが見つかりませんでした。</Text>
                )}
              </VStack>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default MyPage;