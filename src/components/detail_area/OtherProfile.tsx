import {
  Box,
  Image,
  Text,
  Button,
  Divider,
  VStack,
  HStack,
  useBreakpointValue,
  Flex,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface OtherProfileProps {
  name: string;
  username: string;
  reviewCount: number;
  valueCount: number;
  description: string;
  followCount: number;
  followedCount: number;
  photoURL: string;
}

function OtherProfile({
  username,
  reviewCount,
  valueCount,
  description,
  followCount,
  followedCount,
  photoURL,
}: OtherProfileProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isFollowed, setIsFollow] = useState<boolean>(false);
  const toast = useToast();
  const pathname = useLocation().pathname;

  const handleFollow = () => {
    setIsFollow((pre) => !pre);

    if (!isFollowed) {
      toast({
        title: "フォローしました",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } else {
      toast({
        title: "フォローを外しました",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    }
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
            <Link to="/home/mypage/setting">
              <Button>
                <SettingsIcon boxSize={6} />
              </Button>
            </Link>
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
        {!pathname.includes("mypage") && (
          <Button
            colorScheme={isFollowed ? "blue" : "green"}
            size="sm"
            onClick={handleFollow}
          >
            {isFollowed ? "フォロー済" : "フォロー"}
          </Button>
        )}
        <Divider />
        <HStack justifyContent="space-around" w="full">
          <Button w="50%" py="4" bg="gray.50">
            <Link to="/home/mypage/followpage">
              <VStack>
                <Text fontSize="sm">フォロー</Text>
                <Text fontSize="xl">{followCount}</Text>
              </VStack>
            </Link>
          </Button>
          <Divider orientation="vertical" h="67px" />
          <Button w="50%" py="4" bg="gray.50">
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
}

export default OtherProfile;
