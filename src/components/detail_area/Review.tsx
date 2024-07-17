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
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { User } from "firebase/auth";

export interface ReviewProps {
  name: string;
  photoURL: string | null;
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
  createdAt: Date | { toDate: () => Date } | string;
  username: string;
  currentUsername: string;
  tags?: string[];
}

export default function Review({
  username,
  photoURL,
  description,
  targetType,
  bookId,
  engineerSkillLevel,
  id,
  valueCount,
  bookmarkCount,
  bookDetails,
  createdAt,
  tags = [],
}: ReviewProps) {
  const location = useLocation();
  const { likedReviews, toggleLike } = useLike();
  const { bookmarkedReviews, toggleBookmark } = useBookmark();
  const isLiked = likedReviews.some((r) => r.id === id);
  const isBookmarked = bookmarkedReviews.some((r) => r.id === id);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

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
    base: "90%",
    md: "80%",
    lg: "80%",
  });

  const specificBoxWidth = () => {
    if (/^\/home\/[^/]+/.test(location.pathname)) return "150%";
    if (/^\/mypage/.test(location.pathname)) return "150%";
    if (location.pathname === "/home") return "500%";
    return boxWidth;
  };

  return (
    <Container centerContent>
      <Box
        w={specificBoxWidth()}
        bg="gray.50"
        border="1px"
        borderColor="gray.300"
        borderRadius="30px"
      >
        <Box textAlign="right">
          <Box pt="8px" pr="24px">
            <Button>DELETE</Button>
          </Box>
        </Box>
        <Flex alignItems="center" justifyContent="space-between" padding="20px">
          <Box>
            <VStack>
              <HStack>
                <Link to={`/home/${username}`}>
                  <Image
                    src={photoURL|| "https://via.placeholder.com/65"}
                    w="65px"
                    h="65px"
                    borderRadius="full"
                    objectFit="cover"
                  />
                </Link>
                <Stack pl="16px">
                  <Link to={`/home/${username}`}>
                    <Text>{username}</Text>
                  </Link>{" "}
                  <Text>{formatDate(createdAt)}</Text>
                </Stack>
              </HStack>
              <Stack pl="30px">
                <HStack>
                  <Button>{targetType}</Button>
                  <Button>{engineerSkillLevel}</Button>
                </HStack>
              </Stack>
            </VStack>
          </Box>

          <HStack align="end">
            <VStack>
              <Text>{formatDate(createdAt)}</Text>
              {bookDetails && <Text as="p">{bookDetails.title}</Text>}
            </VStack>

            {bookDetails && (
              <>
                <Image
                  src={bookDetails.thumbnail}
                  alt={bookDetails.title}
                  w="80px"
                  h="100px"
                />
              </>
            )}
          </HStack>
        </Flex>
        <Divider mb="8px" />
        <Text px="20px">{description}</Text>
        <Divider mt="8px" />
        <Box padding="16px">
          <Flex justifyContent="space-between">
            <HStack>
              <HStack>
                <IconButton
                  aria-label="like-button"
                  borderRadius="full"
                  backgroundColor="white"
                  onClick={() =>
                    toggleLike({
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
                    })
                  }
                  icon={isLiked ? <FaHeart /> : <CiHeart />}
                />
                <Text>{valueCount}</Text>
              </HStack>
              <HStack pl="20px">
                <IconButton
                  aria-label="bookmark-button"
                  borderRadius="full"
                  backgroundColor="white"
                  onClick={() =>
                    toggleBookmark({
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
                    })
                  }
                  icon={isBookmarked ? <IoBookmarks /> : <CiBookmark />}
                />
                <Text>{bookmarkCount}</Text>
              </HStack>
            </HStack>
            <Link to={`./comment/${id}`}>
              <Button mt="2">返信</Button>
            </Link>
          </Flex>
          <HStack mt="4">
            {tags.map((tag) => (
              <Tag key={tag}>
                <TagLabel>{tag}</TagLabel>
              </Tag>
            ))}
          </HStack>
        </Box>
      </Box>
    </Container>
  );
}
