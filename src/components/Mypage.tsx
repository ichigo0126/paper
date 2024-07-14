import {
  Box,
  Flex,
  VStack,
  Container,
  useBreakpointValue,
  Text,
  Divider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Profile from "./detail_area/Profile";
import Review from "./detail_area/Review"; // Reviewコンポーネントをインポート
import { getReviews, getUserById } from "../firebase"; // レビューを取得するための関数をインポート

interface MyPageProps {
  currentUserId: string | null;
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
  bookDetails: {
    title: string;
    thumbnail: string;
  };
  createdAt: {
    toDate: () => Date;
  };
  username: string;
}

const profile = {
  name: "杉本大志",
  username: "kachikachichinko",
  reviewCount: 2.0,
  valueCount: 10.0,
  description: "かちかちちんこ",
  followCount: 2.0,
  followedCount: 3.0,
};

function MyPage({ currentUserId }: MyPageProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [reviews, setReviews] = useState<ReviewData[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsData = await getReviews();
      console.log("Fetched reviews:", reviewsData); // デバッグ用ログ
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
      console.log("Reviews with usernames:", reviewsWithUsernames); // デバッグ用ログ
    };

    fetchReviews();
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

  // 自分の投稿だけをフィルタリング
  console.log("Current User ID:", currentUserId); // currentUserIdをログに出力
  const myPosts = reviews.filter((post) => {
    console.log("Post User ID:", post.userId); // 各レビューのuserIdをログに出力
    return post.userId === currentUserId;
  });
  console.log("Filtered my posts:", myPosts); // デバッグ用ログ

  return (
    <Box pt={2.5} pb={4} bg="gray.100" borderRadius="normal">
      <Container maxW="1587px" mt={6}>
        <Flex gap={5} flexDirection={isMobile ? "column" : "row"}>
          <Profile
            name={profile.name}
            username={profile.username}
            reviewCount={profile.reviewCount}
            valueCount={profile.valueCount}
            description={profile.description}
            followCount={profile.followCount}
            followedCount={profile.followedCount}
          />
          <Box w={isMobile ? "full" : "69%"}>
            <Box p={4} pb={20} bg="gray.50" borderRadius="3xl" shadow="sm">
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="lg" fontWeight="light">
                  フォロー 13
                </Text>
              </Flex>

              <Divider my={2} borderWidth="2px" borderColor="gray.500" />
              <VStack spacing={6} align="stretch">
                {myPosts.length > 0 ? (
                  myPosts.map(
                    (
                      {
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
                      },
                      index
                    ) => (
                      <Box key={id} width="100%" bg="white" borderRadius="md" p={4} shadow="md">
                        <Review
                          currentUsername={currentUserId || ""} // 現在のユーザーIDを渡す
                          username={username} // 投稿者のユーザー名を渡す
                          description={description}
                          id={id}
                          valueCount={valueCount}
                          bookmarkCount={bookmarkCount}
                          targetType={targetType}
                          bookId={bookId}
                          engineerSkillLevel={engineerSkillLevel}
                          bookDetails={bookDetails}
                          createdAt={createdAt}
                          name={name}
                        />
                        {index === myPosts.length - 1 ? (
                          <></>
                        ) : (
                          <Divider
                            mt={6}
                            borderWidth="1px"
                            borderColor="gray.400"
                          />
                        )}
                      </Box>
                    )
                  )
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
