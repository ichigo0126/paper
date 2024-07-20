import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  Divider,
  VStack,
  HStack,
  Container,
  Stack,
  IconButton,
  useBreakpointValue,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { CiBookmark, CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { IoBookmarks } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useLike } from "../LikeContext";
import { useBookmark } from "../BookmarkContext";

export interface ReviewProps {
  name: string;
  id: string;
  username: string;
  photoURL: string | null;
  description: string;
  targetType: string;
  bookId: string;
  engineerSkillLevel: string;
  valueCount: number;
  bookmarkCount: number;
  bookDetails: {
    title: string;
    thumbnail: string;
  } | null;
  createdAt: Date | { toDate: () => Date } | string;
  tags?: string[];
  currentUsername?: string;
}

export default function Review({
  id,
  username,
  photoURL,
  description,
  targetType,
  bookId,
  engineerSkillLevel,
  valueCount,
  bookmarkCount,
  bookDetails,
  createdAt,
  currentUsername,
  tags = [],
}: ReviewProps) {
  const location = useLocation();
  const { isLiked, toggleLike } = useLike();
  const { isBookmarked, toggleBookmark } = useBookmark();
  const isReviewLiked = isLiked(id);
  const isReviewBookmarked = isBookmarked(id);

  const handleLike = async () => {
    await toggleLike({
      id,
      username,
      description,
      targetType,
      bookId,
      engineerSkillLevel,
      valueCount,
      bookmarkCount,
      bookDetails,
      createdAt,
      tags,
      photoURL,
    });
  };

  const handleBookmark = async () => {
    await toggleBookmark({
      id,
      username,
      description,
      targetType,
      bookId,
      engineerSkillLevel,
      valueCount,
      bookmarkCount,
      bookDetails,
      createdAt,
      tags,
      photoURL,
    });
  };

  const formatDate = (timestamp: Date | { toDate: () => Date } | string) => {
    let date: Date;
    if (timestamp instanceof Date) {
      date = timestamp;
    } else if (typeof timestamp === "object" && "toDate" in timestamp) {
      date = timestamp.toDate();
    } else if (typeof timestamp === "string") {
      date = new Date(timestamp);
    } else {
      console.error("Invalid timestamp format", timestamp);
      return "Invalid Date";
    }

    if (isNaN(date.getTime())) {
      console.error("Invalid date", date);
      return "Invalid Date";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    return `${year}/${month}/${day} ${hour}:${minute}`;
  };

  const boxWidth = useBreakpointValue({
    base: "95%",
    sm: "10%",
    md: "70%",
    lg: "80%",
  });

  const specificBoxWidth = () => {
    if (/^\/home\/[^/]+/.test(location.pathname))
      return { base: "95%", md: "100%" };
    if (/^\/mypage/.test(location.pathname))
      return { base: "180%", sm: "200%", md: "350%" };
    if (location.pathname === "/home")
      return { base: "180%", sm: "200%", md: "350%" };
    return boxWidth;
  };

  // const flexDirection = useBreakpointValue({ base: "column", md: "row" });
  const imageSize = useBreakpointValue({ base: "50px", md: "65px" });
  const bookImageSize = useBreakpointValue({ base: "60px", md: "80px" });
  const fontSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <Container centerContent>
      <Box
        w={specificBoxWidth()}
        bg="gray.50"
        border="1px"
        borderColor="gray.300"
        borderRadius="30px"
        p={4}
      >
        <Flex
          padding="20px"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box mb={{ base: 4, md: 0 }}>
            <VStack align="start" spacing={2}>
              <HStack>
                <Link
                  to={
                    username === currentUsername
                      ? "/home/mypage"
                      : `/home/${username}`
                  }
                >
                  <Image
                    src={"https://placehold.jp/65x65.png" || photoURL}
                    w={imageSize}
                    h={imageSize}
                    borderRadius="full"
                    objectFit="cover"
                  />
                </Link>
                <Stack>
                  <Link to={`/home/${username}`}>
                    <Text fontSize={fontSize}>{username}</Text>
                  </Link>
                  <Text fontSize={fontSize}>{formatDate(createdAt)}</Text>
                </Stack>
              </HStack>
              <HStack>
                <Button size="sm">{targetType}</Button>
                <Button size="sm">{engineerSkillLevel}</Button>
              </HStack>
            </VStack>
          </Box>

          <HStack align="center" spacing={2}>
            <VStack align="end">
              {bookDetails && (
                <Text as="p" fontWeight="bold" fontSize={fontSize}>
                  {bookDetails.title || "Unknown Title"}
                </Text>
              )}
            </VStack>

            {bookDetails && (
              <Image
                src={
                  "https://placehold.jp/128x196.png" || bookDetails.thumbnail
                }
                alt={bookDetails.title || "Unknown Title"}
                w={bookImageSize}
                h="100pxx"
                objectFit="cover"
              />
            )}
          </HStack>
        </Flex>
        <Divider my={4} />
        <Text px={2} fontSize={fontSize}>
          {description}
        </Text>
        <Divider my={4} />
        <Box>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
          >
            <HStack spacing={4}>
              <HStack>
                <IconButton
                  aria-label="like-button"
                  size="sm"
                  borderRadius="full"
                  backgroundColor="white"
                  onClick={handleLike}
                  icon={isReviewLiked ? <FaHeart color="red" /> : <CiHeart />}
                />
                <Text fontSize={fontSize}>{valueCount}</Text> 
              </HStack>
              <HStack>
                <IconButton
                  aria-label="bookmark-button"
                  size="sm"
                  borderRadius="full"
                  backgroundColor="white"
                  onClick={handleBookmark}
                  icon={
                    isReviewBookmarked ? (
                      <IoBookmarks color="blue" />
                    ) : (
                      <CiBookmark />
                    )
                  }
                />
                <Text fontSize={fontSize}>{bookmarkCount}</Text>
              </HStack>
            </HStack>
            <Link to={`./comment/${id}`}>
              <Button size="sm" mt={{ base: 2, md: 0 }}>
                Reply
              </Button>
            </Link>
          </Flex>
          <Flex mt={4} flexWrap="wrap">
            {tags.map((tag) => (
              <Tag key={tag} size="sm" m={1}>
                <TagLabel>{tag}</TagLabel>
              </Tag>
            ))}
          </Flex>
        </Box>
      </Box>
    </Container>
  );
}
