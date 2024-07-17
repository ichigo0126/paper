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

type ProfileType = {
  username: string;
  reviewCount: number;
  valueCount: number;
  description: string;
  followCount: number;
  followedCount: number;
};

function Profile({
  username,
  reviewCount,
  valueCount,
  description,
  followCount,
  followedCount,
}: ProfileType) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isFollowed, setIsFollow] = useState<boolean>(false);
  const toast = useToast();

  const handleFollow = () => {
    setIsFollow((pre) => !pre);

    if (isFollowed == false) {
      toast({
        title: "フォローしました",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } else if (isFollowed == true) {
      toast({
        title: "フォローを外しました",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const pathname = useLocation().pathname;

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
        <HStack fontWeight="semibold">
          <VStack align="flex-start" flex={1}>
            {pathname.includes("mypage") ? (
              <></>
            ) : isFollowed ? (
              <Button colorScheme="gray" size="sm" onClick={handleFollow}>
                フォロー済
              </Button>
            ) : (
              <Button colorScheme="green" size="sm" onClick={handleFollow}>
                フォロー
              </Button>
            )}
          </VStack>
          <VStack align="flex-end" flex={1}>
            <Link to="/home/mypage/setting">
              <Button>
                <SettingsIcon boxSize={8} />
              </Button>
            </Link>
          </VStack>
        </HStack>
        <Image
          src="https://via.placeholder.com/111"
          w="111px"
          alignSelf="center"
        />
        <Text fontSize="md" color="gray.600" textAlign="center">
          {username}
        </Text>
        <Text fontSize="md" color="gray.700" textAlign="center">
          {description}
        </Text>
        <Flex justifyContent="space-between" ml={4} mr={4}>
          <Text ml={4} fontSize="lg" color="gray.600">
            投稿数: {reviewCount}
          </Text>
          <Text fontSize="lg" color="gray.600">
            評価数: {valueCount}
          </Text>
        </Flex>
        <Divider />
        <HStack justifyContent="space-around" w="full">
          <Button w="50%" py="45px" bg="gray.50">
            <Link to="/home/mypage/followpage">
              <VStack>
                <Text fontSize="sm">フォロー</Text>
                <Text fontSize="xl">{followCount}</Text>
              </VStack>
            </Link>
          </Button>
          <Divider orientation="vertical" h="67px" />
          <Button w="50%" py="45px" bg="gray.50">
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

export default Profile;
