import React, { useState, useEffect } from "react";
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
  username: string;
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
  } | null;
  createdAt: Date | { toDate: () => Date } | string;
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
  valueCount: initialValueCount,
  bookmarkCount: initialBookmarkCount,
  bookDetails,
  createdAt,
  tags = [],
}: ReviewProps) {
  const location = useLocation();
  const { toggleLike, isLiked } = useLike();
  const { toggleBookmark, isBookmarked } = useBookmark();
  const [localValueCount, setLocalValueCount] = useState(initialValueCount);
  const [localBookmarkCount, setLocalBookmarkCount] = useState(initialBookmarkCount);
  const [isLocalLiked, setIsLocalLiked] = useState(isLiked(id));
  const [isLocalBookmarked, setIsLocalBookmarked] = useState(isBookmarked(id));

  useEffect(() => {
    setIsLocalLiked(isLiked(id));
    setLocalValueCount(initialValueCount);
  }, [isLiked, id, initialValueCount]);

  useEffect(() => {
    setIsLocalBookmarked(isBookmarked(id));
    setLocalBookmarkCount(initialBookmarkCount);
  }, [isBookmarked, id, initialBookmarkCount]);

  const handleLike = () => {
    const newIsLiked = !isLocalLiked;
    const newValueCount = newIsLiked ? localValueCount + 1 : localValueCount - 1;
    setIsLocalLiked(newIsLiked);
    setLocalValueCount(newValueCount);
    toggleLike({
      id,
      username,
      description,
      targetType,
      bookId,
      engineerSkillLevel,
      valueCount: newValueCount,
      bookmarkCount: localBookmarkCount,
      bookDetails,
      createdAt,
      tags,
    });
  };

  const handleBookmark = () => {
    const newIsBookmarked = !isLocalBookmarked;
    const newBookmarkCount = newIsBookmarked ? localBookmarkCount + 1 : localBookmarkCount - 1;
    setIsLocalBookmarked(newIsBookmarked);
    setLocalBookmarkCount(newBookmarkCount);
    toggleBookmark({
      id,
      username,
      description,
      targetType,
      bookId,
      engineerSkillLevel,
      valueCount: localValueCount,
      bookmarkCount: newBookmarkCount,
      bookDetails,
      createdAt,
      tags,
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
                    src={photoURL || "https://via.placeholder.com/65"}
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
              {bookDetails && (
                <Text as="p" fontWeight="bold">
                  {bookDetails.title || "Unknown Title"}
                </Text>
              )}
            </VStack>

            {bookDetails && (
              <Image
                src={
                  bookDetails.thumbnail ||
                  "https://via.placeholder.com/128x196?text=No+Image"
                }
                alt={bookDetails.title || "Unknown Title"}
                w="80px"
                h="100px"
                objectFit="cover"
              />
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
                  onClick={handleLike}
                  icon={isLocalLiked ? <FaHeart color="red" /> : <CiHeart />}
                />
                <Text>{localValueCount}</Text>
              </HStack>
              <HStack pl="20px">
                <IconButton
                  aria-label="bookmark-button"
                  borderRadius="full"
                  backgroundColor="white"
                  onClick={handleBookmark}
                  icon={isLocalBookmarked ? <IoBookmarks color="blue" /> : <CiBookmark />}
                />
                <Text>{localBookmarkCount}</Text>
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