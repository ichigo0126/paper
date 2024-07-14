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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useState } from "react";
import { CiBookmark, CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { IoBookmarks } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { SettingsIcon } from "@chakra-ui/icons";

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
};

export default function Review({
  username,
  currentUsername,
  description,
  targetType,
  bookId,
  engineerSkillLevel,
  id,
  valueCount,
  bookmarkCount,
  bookDetails,
  createdAt,
}: ReviewProps) {
  const pathname = useLocation().pathname;

  const [isLike, setIsLike] = useState(false);
  const [isbookmark, setIsBookmark] = useState(false);

  // タイムスタンプを日付文字列に変換する関数
  const formatDate = (timestamp: { toDate: () => Date }) => {
    const date = timestamp.toDate();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0"); // 正しく修正された部分
    const minute = String(date.getMinutes()).padStart(2, "0"); // 正しく修正された部分
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
    if (pathname.includes("/mypage")) return "150%";
    if (pathname.includes("/")) return "500%";
    return boxWidth; // デフォルトの幅
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
        <Flex>
          <Box w="100%">
            <Flex
              alignItems="center"
              justifyContent="space-between"
              padding="20px"
            >
              <Box>
                <VStack>
                  <HStack>
                    <Link to="">
                      <Image
                        src="https://via.placeholder.com/65"
                        w="65px"
                        borderRadius="full"
                      />
                    </Link>
                    <Stack pl="16px">
                      <Text>{username} (ユーザ名)</Text>
                      <Text>{formatDate(createdAt)}</Text>
                    </Stack>
                  </HStack>
                </VStack>
              </Box>

              <HStack align="end">
                <VStack align="end">
                  {bookDetails && (
                    <Text fontSize="20px" textDecoration="underline">
                      {bookDetails.title}
                    </Text>
                  )}

                  <HStack  align="flex-end">
                    <Stack>
                      <HStack>
                        <Button>{targetType}</Button>
                        <Button>{engineerSkillLevel}</Button>
                      </HStack>
                    </Stack>
                    {bookDetails && (
                      <>
                        <Image
                          src={bookDetails.thumbnail}
                          alt={bookDetails.title}
                          w="80px"
                          h="100px"
                        />
                        {/* <Text as="p">{bookDetails.title}</Text> */}
                      </>
                    )}
                  </HStack>
                </VStack>
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
                      onClick={(pre) => setIsLike(!pre)}
                      icon={isLike ? <FaHeart /> : <CiHeart />}
                    />
                    <Text>{valueCount}</Text>
                  </HStack>
                  <HStack pl="20px">
                    <IconButton
                      aria-label="like-button"
                      borderRadius="full"
                      backgroundColor="white"
                      onClick={(pre) => setIsBookmark(!pre)}
                      icon={isbookmark ? <IoBookmarks /> : <CiBookmark />}
                    />
                    <Text>{bookmarkCount}</Text>
                  </HStack>
                </HStack>
                <Link to={`./comment/${id}`}>
                  <Button mt="2">返信</Button>
                </Link>
              </Flex>
            </Box>
          </Box>
          <Box pt="8px" pr="24px">
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<SettingsIcon />}
                variant="outline"
              />
              <MenuList>
                <MenuItem icon={<SettingsIcon />} command="⌘T">
                  New Tab
                </MenuItem>
                <MenuItem icon={<SettingsIcon />} command="⌘N">
                  New Window
                </MenuItem>
                <MenuItem icon={<SettingsIcon />} command="⌘⇧N">
                  Open Closed Tab
                </MenuItem>
                <MenuItem icon={<SettingsIcon />} command="⌘O">
                  Open File...
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Box>
    </Container>
  );
}
