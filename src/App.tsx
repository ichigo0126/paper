import React from "react";
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
  useBreakpointValue,
} from "@chakra-ui/react";

function UserCard({ name, username, description, isFollowing }) {
  return (
    <HStack spacing={5} alignItems="flex-start">
      <Image
        src="https://via.placeholder.com/68"
        w="68px"
        border="1px"
        borderColor="gray.400"
        borderRadius="md"
      />
      <VStack align="stretch" flex={1}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="lg" fontWeight="semibold">
            {name} ({username})
          </Text>
          <Button
            size="sm"
            colorScheme={isFollowing ? "gray" : "green"}
          >
            {isFollowing ? "フォロー済" : "フォロー"}
          </Button>
        </Flex>
        <Text fontSize="md" fontWeight="light">
          {description}
        </Text>
      </VStack>
    </HStack>
  );
}

function MyComponent() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box pt={2.5} pb={4} bg="gray.100" borderRadius="normal">
      <Box pb={7} w="full" borderRadius="normal">
        <Flex
          zIndex={10}
          gap={5}
          justifyContent="space-between"
          alignItems="flex-start"
          px={7}
          pb={2}
          w="full"
          bg="blue.400"
          borderRadius="normal"
          flexWrap={isMobile ? "wrap" : "nowrap"}
        >
          <Box
            border="1px"
            borderColor="whiteAlpha.900"
            h="67px"
            borderRadius="normal"
            w="183px"
          />
          <Flex gap={5} justifyContent="space-between" mt={1.5}>
            <HStack gap={5} my="auto">
              {[1, 2, 3].map((_, index) => (
                <Image
                  key={index}
                  src={`https://via.placeholder.com/40`}
                  w="40px"
                  border="1px"
                  borderColor="whiteAlpha.900"
                  borderRadius={index === 2 ? "md" : "none"}
                />
              ))}
            </HStack>
            <Image src="https://via.placeholder.com/65" w="65px" />
          </Flex>
        </Flex>
      </Box>
      <Container maxW="1587px" mt={6}>
        <Flex gap={5} flexDirection={isMobile ? "column" : "row"}>
          <Box w={isMobile ? "full" : "31%"}>
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
                  <Button colorScheme="green" size="sm">
                    フォロー
                  </Button>
                  <Text ml={4} fontSize="lg" color="gray.600">
                    投稿数: 2,000
                  </Text>
                </VStack>
                <VStack align="flex-end" flex={1}>
                  <Image
                    src="https://via.placeholder.com/40"
                    w="40px"
                  />
                  <Text fontSize="lg" color="gray.600">
                    評価数: 3,642
                  </Text>
                </VStack>
              </HStack>
              <Image src="https://via.placeholder.com/111" w="111px" alignSelf="center" />
              <Text fontSize="md" textAlign="center">
                杉本大志
              </Text>
              <Text fontSize="md" color="gray.600" textAlign="center">
                (haha_kusa)
              </Text>
              <Text fontSize="md" color="gray.700" textAlign="center">
                愛媛大学元助教
                <br />
                好きなものは車とTensorFlow
                <br />
                しぐれうい推し
              </Text>
              <Divider />
              <HStack justifyContent="space-around" w="full">
                <VStack>
                  <Text fontSize="sm">フォロー</Text>
                  <Text fontSize="xl">1,000k</Text>
                </VStack>
                <Divider orientation="vertical" h="67px" />
                <VStack>
                  <Text fontSize="sm">フォロワー</Text>
                  <Text fontSize="xl">1,000</Text>
                </VStack>
              </HStack>
            </VStack>
          </Box>
          <Box w={isMobile ? "full" : "69%"}>
            <Box
              p={4}
              pb={20}
              bg="gray.50"
              borderRadius="3xl"
              shadow="sm"
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="2xl" fontWeight="light">
                  フォロー 1,301
                </Text>
                <Image
                  src="https://via.placeholder.com/40"
                  w="40px"
                />
              </Flex>
              <Divider my={2} borderWidth="3px" borderColor="gray.400" />
              <VStack spacing={6} align="stretch">
                <UserCard
                  name="秋田君"
                  username="eene_0620"
                  description="本と記事が大好きな読書家。レビューを書いて、他の読書好きとつながろう！お気に入りの作品を見つけて、いいね＆ブックマークも忘れずに。"
                  isFollowing={false}
                />
                <Divider />
                <UserCard
                  name="秋田君_1"
                  username="eene_0621"
                  description="本と記事のレビューが大好きな人、集まれ！新しい作品を発見し、レビューして、いいね＆ブックマークで応援しよう！"
                  isFollowing={true}
                />
                <Divider />
                <UserCard
                  name="秋田君_2"
                  username="eene_0622"
                  description="読書コミュニティの一員として、レビューを投稿して感想を共有しましょう。みんなのおすすめ作品にいいねとブックマークを！"
                  isFollowing={true}
                />
                <Divider />
                <UserCard
                  name="秋田君_3"
                  username="eene_0623"
                  description="本と記事のレビューを通じて、読書仲間とつながる場所です。あなたのおすすめ作品をレビューして共有し、他のユーザーと感想を交換しましょう。気に入った作品にはいいねを、また読みたい作品にはブックマークを！一緒に読書の楽しさを広げましょう。"
                  isFollowing={false}
                />
                <Divider />
                <UserCard
                  name="秋田君_3"
                  username="eene_0623"
                  description="本と記事のレビューを通じて、読書仲間とつながる場所です。あなたのおすすめ作品をレビューして共有し、他のユーザーと感想を交換しましょう。気に入った作品にはいいねを、また読みたい作品にはブックマークを！一緒に読書の楽しさを広げましょう。"
                  isFollowing={false}
                />
                <Divider />
                <UserCard
                  name="秋田君_3"
                  username="eene_0623"
                  description="本と記事のレビューを通じて、読書仲間とつながる場所です。あなたのおすすめ作品をレビューして共有し、他のユーザーと感想を交換しましょう。気に入った作品にはいいねを、また読みたい作品にはブックマークを！一緒に読書の楽しさを広げましょう。"
                  isFollowing={false}
                />
                <Divider />
                <UserCard
                  name="秋田君_3"
                  username="eene_0623"
                  description="本と記事のレビューを通じて、読書仲間とつながる場所です。あなたのおすすめ作品をレビューして共有し、他のユーザーと感想を交換しましょう。気に入った作品にはいいねを、また読みたい作品にはブックマークを！一緒に読書の楽しさを広げましょう。"
                  isFollowing={false}
                />
                <Divider />
                <UserCard
                  name="秋田君_3"
                  username="eene_0623"
                  description="本と記事のレビューを通じて、読書仲間とつながる場所です。あなたのおすすめ作品をレビューして共有し、他のユーザーと感想を交換しましょう。気に入った作品にはいいねを、また読みたい作品にはブックマークを！一緒に読書の楽しさを広げましょう。"
                  isFollowing={false}
                />
                <Divider />
                <UserCard
                  name="秋田君_3"
                  username="eene_0623"
                  description="本と記事のレビューを通じて、読書仲間とつながる場所です。あなたのおすすめ作品をレビューして共有し、他のユーザーと感想を交換しましょう。気に入った作品にはいいねを、また読みたい作品にはブックマークを！一緒に読書の楽しさを広げましょう。"
                  isFollowing={false}
                />
                <Divider />
                <UserCard
                  name="秋田君_3"
                  username="eene_0623"
                  description="本と記事のレビューを通じて、読書仲間とつながる場所です。あなたのおすすめ作品をレビューして共有し、他のユーザーと感想を交換しましょう。気に入った作品にはいいねを、また読みたい作品にはブックマークを！一緒に読書の楽しさを広げましょう。"
                  isFollowing={false}
                />
                <Divider />
                <UserCard
                  name="秋田君_4"
                  username="eene_0624"
                  description="読書好きの集まる場所でレビューを書いてシェアしましょう！面白い作品に出会ったら、いいね＆ブックマークもよろしく！"
                  isFollowing={false}
                />
              </VStack>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default MyComponent;