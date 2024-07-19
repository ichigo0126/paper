import {
  Box,
  Flex,
  VStack,
  Container,
  useBreakpointValue,
  Text,
  Divider,
  HStack,
  Image,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Review from "./Review";
import { getReviews, getUserByUsername, getUserById } from "../../firebase";
import { Link, useParams } from "react-router-dom";
import { SettingsIcon } from "@chakra-ui/icons";

interface MyPageProps {
  currentUserId: string | null;
}

interface ReviewData {
  userId: string;
  photoURL: string;
  name: string;
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
  };
  createdAt: {
    toDate: () => Date;
  };
  username: string;
}

interface UserProfileData {
  id: string;
  name: string;
  username: string;
  reviewCount: number;
  valueCount: number;
  description: string;
  followCount: number;
  followedCount: number;
  photoURL: string;
}

type ProfileType = {
  username: string;
  name: string;
  reviewCount: number;
  valueCount: number;
  description: string;
  followCount: number;
  followedCount: number;
  photoURL: string;
};

function OtherMypage({ currentUserId }: MyPageProps) {
  const { username } = useParams<{ username: string }>();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);

  useEffect(() => {
    const fetchUserDataAndReviews = async () => {
      if (username) {
        try {
          // ユーザー情報を取得
          const userData = await getUserByUsername(username);
          if (userData) {
            setUserProfile(userData as UserProfileData);
          }

          // すべてのレビューを取得
          const reviewsData = await getReviews();
          console.log("Fetched reviews:", reviewsData);
          const reviewsWithDetails = await Promise.all(
            reviewsData.map(async (review) => {
              const bookDetails = await getBookDetails(review.bookId);
              const reviewUserData = await getUserById(review.userId);
              let reviewUsername = "Unknown User";
              let reviewPhotoURL = "";
              if (reviewUserData) {
                reviewUsername = reviewUserData.username;
                reviewPhotoURL = reviewUserData.photoURL || "";
              }
              return {
                ...review,
                bookDetails: bookDetails,
                username: reviewUsername,
                photoURL: reviewPhotoURL,
              };
            })
          );
          setReviews(reviewsWithDetails);
        } catch (error) {
          console.error("Error fetching user data and reviews:", error);
        }
      }
    };

    fetchUserDataAndReviews();
  }, [username]);

  const [isFollowed, setIsFollow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const OtherProfile = ({
    username,
    name,
    reviewCount,
    valueCount,
    description,
    followCount,
    followedCount,
    photoURL,
  }: ProfileType) => {
    const handleFollow = () => {
      setIsLoading(true);
      setTimeout(() => {
        // ここにフォロー処理を記述
        setIsFollow((prev) => !prev);
        setIsLoading(false);
      }, 1000);
    };
    return (
      <Box w={isMobile ? "full" : "25%"}>
        <VStack
          align="stretch"
          p={2.5}
          bg="gray.50"
          borderRadius="xl"
          border="1px"
          borderColor="gray.300"
          shadow="sm"
        >
          <HStack>
            <VStack align="flex-end" flex={1}>
              <Button>
                <SettingsIcon boxSize={6} />
              </Button>
              <Image
                src={photoURL || "https://via.placeholder.com/111"}
                w="111px"
                borderRadius="full"
                alignSelf="center"
              />
            </VStack>
          </HStack>
          <Text fontSize="sm" color="gray.600" textAlign="center">
            {username}
          </Text>
          <Text fontSize="sm" color="gray.700" textAlign="center">
            {description}
          </Text>
          <Flex justifyContent="space-between" mx={4}>
            <Text fontSize="lg" color="gray.600">
              投稿数: {reviewCount}
            </Text>
            <Text fontSize="lg" color="gray.600">
              評価数: {valueCount}
            </Text>
          </Flex>
          <Button
            colorScheme={isFollowed ? "blue" : "green"}
            isLoading={isLoading}
            size="sm"
            onClick={handleFollow}
          >
            {isFollowed ? "フォロー済" : "フォロー"}
          </Button>
          <Divider />
          <HStack justifyContent="space-around" w="full">
            <Button
              w="50%"
              py="4"
              bg="gray.50"
              h="100px"
              display="inline-block"
            >
              <Link to="/home/mypage/followpage">
                <VStack>
                  <Text fontSize="sm">フォロー</Text>
                  <Text fontSize="xl">{followCount}</Text>
                </VStack>
              </Link>
            </Button>
            <Divider orientation="vertical" h="67px" />
            <Button
              w="50%"
              py="4"
              bg="gray.50"
              h="100px"
              display="inline-block"
            >
              <Link to="/home/mypage/followedpage">
                <VStack>
                  <Text fontSize="sm">フォロワー</Text>
                  <Text fontSize="xl">{followedCount}</Text>
                </VStack>
              </Link>
            </Button>
          </HStack>
        </VStack>
      </Box>
    );
  };

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

  // ユーザーのレビューだけをフィルタリング
  const userReviews = reviews.filter((review) => review.username === username);
  console.log("Filtered user reviews:", userReviews);

  return (
    <Box pt={2.5} pb={4} bg="gray.100" borderRadius="normal">
      <Container maxW="1587px" mt={6}>
        <Flex gap={5} flexDirection={isMobile ? "column" : "row"}>
          {userProfile && (
            <OtherProfile
              name={userProfile.name}
              username={userProfile.username}
              reviewCount={userReviews.length}
              valueCount={userProfile.valueCount}
              description={userProfile.description}
              followCount={userProfile.followCount}
              followedCount={userProfile.followedCount}
              photoURL={userProfile.photoURL}
            />
          )}
          <Box w={isMobile ? "full" : "69%"}>
            <Box p={4} pb={20} bg="gray.50" borderRadius="3xl" shadow="sm">
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="lg" fontWeight="light">
                  フォロー {userProfile?.followCount || 0}
                </Text>
              </Flex>

              <Divider my={2} borderWidth="2px" borderColor="gray.500" />
              <VStack spacing={6} align="stretch">
                {userReviews.length > 0 ? (
                  userReviews.map((review, index) => (
                    <Box
                      key={review.id}
                      width="100%"
                      bg="white"
                      borderRadius="md"
                      p={4}
                      shadow="md"
                    >
                      <Review
                        currentUsername={currentUserId || ""}
                        username={review.username}
                        description={review.description}
                        id={review.id}
                        valueCount={review.valueCount}
                        bookmarkCount={review.bookmarkCount}
                        targetType={review.targetType}
                        bookId={review.bookId}
                        engineerSkillLevel={review.engineerSkillLevel}
                        bookDetails={review.bookDetails}
                        createdAt={review.createdAt}
                        name={review.name}
                        photoURL={review.photoURL}
                      />
                      {index !== userReviews.length - 1 && (
                        <Divider
                          mt={6}
                          borderWidth="1px"
                          borderColor="gray.400"
                        />
                      )}
                    </Box>
                  ))
                ) : (
                  <Text>レビューが見つかりませんでした。</Text>
                )}
              </VStack>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default OtherMypage;
