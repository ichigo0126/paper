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
import { useState } from "react";
import { CiBookmark, CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { IoBookmarks } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

type ReviewProps = {
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
  currentUsername: string;
  tags?: string[];
};

export default function Review({
  username,
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
  const pathname = useLocation().pathname;

  const [isLike, setIsLike] = useState(false);
  const [isbookmark, setIsBookmark] = useState(false);

  // タイムスタンプを日付文字列に変換する関数
  const formatDate = (timestamp: { toDate: () => Date }) => {
    const date = timestamp.toDate();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    return `${year}/${month}/${day} ${hour}:${minute}`;
  };

  // ブレークポイントに応じて幅を動的に設定
  const boxWidth = useBreakpointValue({
    base: "90%", // モバイルデバイス
    md: "80%", // タブレットデバイス
    lg: "80%", // デスクトップデバイスのデフォルト
  });

  // 特定のパスに基づいて幅を変更
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
        {/* ヘッダー */}
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
                    src="https://via.placeholder.com/65"
                    w="65px"
                    borderRadius="full"
                  />
                </Link>
                <Stack pl="16px">
                  <Link to={`/home/${username}`}>
                    <Text>{username} (ユーザ名)</Text>
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
                  onClick={() => setIsLike(!isLike)}
                  icon={isLike ? <FaHeart /> : <CiHeart />}
                />
                <Text>{valueCount}</Text>
              </HStack>
              <HStack pl="20px">
                <IconButton
                  aria-label="bookmark-button"
                  borderRadius="full"
                  backgroundColor="white"
                  onClick={() => setIsBookmark(!isbookmark)}
                  icon={isbookmark ? <IoBookmarks /> : <CiBookmark />}
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
