import {
    Box,
  //   Flex,
  //   Image,
    Text,
  //   Button,
  //   Divider,
  //   VStack,
  //   HStack,
  //   Container,
    useBreakpointValue,
  } from "@chakra-ui/react";
  // import { CloseButton } from "@chakra-ui/react";
  // import Header from "./detail_area/Header";
  // import Profile from "./detail_area/Profile";
  // import { Link } from "react-router-dom";
  
  // // type ContentType = {
  //   name: string;
  //   username: string;
  //   description: string;
  //   isFollowing: boolean;
  // };
  
  // function UserCard({ name, username, description, isFollowing }: ContentType) {
  //   return (
  //     <HStack spacing={5} alignItems="flex-start">
  //       <Image
  //         src="https://via.placeholder.com/68"
  //         w="68px"
  //         border="1px"
  //         borderColor="gray.400"
  //         borderRadius="md"
  //       />
  //       <VStack align="stretch" flex={1}>
  //         <Flex justifyContent="space-between" alignItems="center">
  //           <Text fontSize="lg" fontWeight="semibold">
  //             {name} ({username})
  //           </Text>
  //           <Button size="sm" colorScheme={isFollowing ? "gray" : "green"}>
  //             {isFollowing ? "フォロー済" : "フォロー"}
  //           </Button>
  //         </Flex>
  //         <Text fontSize="md" fontWeight="light">
  //           {description}
  //         </Text>
  //       </VStack>
  //     </HStack>
  //   );
  // }
  
  // const postContents = [
  //   {
  //     name: "秋田君",
  //     username: "katikati_yane",
  //     description:
  //       "本と記事のレビューが大好きな人、集まれ！新しい作品を発見し、レビューして、いいね＆ブックマークで応援しよう！",
  //     isFollowing: true,
  //   },
  //   {
  //     name: "秋田君_1",
  //     username: "katikati_yan",
  //     description:
  //       "読書好きの集まる場所でレビューを書いてシェアしましょう！面白い作品に出会ったら、いいね＆ブックマークもよろしく！",
  //     isFollowing: false,
  //   },
  //   {
  //     name: "秋田君_2",
  //     username: "katikati",
  //     description:
  //       "本と記事のレビューを通じて、読書仲間とつながる場所です。あなたのおすすめ作品をレビューして共有し、他のユーザーと感想を交換しょう。気に入った作品にはいいねを、また読みたい作品にはブックマークを！一緒に読書の楽しさを広げましょう。",
  //     isFollowing: false,
  //   },
  //   {
  //     name: "秋田君_3",
  //     username: "katikati",
  //     description:
  //       "本と記事のレビューが大好きな人、集まれ！新しい作品を発見し、レビューして、いいね＆ブックマークで応援しよう！",
  //     isFollowing: true,
  //   },
  //   {
  //     name: "秋田君_4",
  //     username: "katikati",
  //     description:
  //       "本と記事が大好きな読書家。レビューを書いて、他の読書好きとつながろう！お気に入りの作品を見つけて、いいね＆ブックマークも忘れずに。",
  //     isFollowing: true,
  //   },
  //   {
  //     name: "秋田君_5",
  //     username: "katikati",
  //     description:
  //       "読書コミュニティの一員として、レビューを投稿して感想を共有しましょう。みんなのおすすめ作品にいいねとブックマークを！",
  //     isFollowing: false,
  //   },
  // ];
  
  // const profile = {
  //   name: "杉本大志",
  //   username: "test",
  //   reviewCount: 2.0,
  //   valueCount: 10.0,
  //   description: "test",
  //   followCount: 2.0,
  //   followedCount: 3.0,
  // };
  
  function FollowPage() {
  //   const isMobile = useBreakpointValue({ base: true, md: false });
  
    return (
      <Box pt={2.5} pb={4} bg="gray.100" borderRadius="normal">
        {/* <Container maxW="1587px" mt={6}>
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
                    フォロー 1,301
                  </Text>
                  <Link to="/home/mypage">
                    <CloseButton />
                  </Link>
                </Flex>
  
                <Divider my={2} borderWidth="2px" borderColor="gray.500" />
                <VStack spacing={6} align="stretch">
                  {postContents.map(
                    ({ name, username, description, isFollowing }, index) => (
                      <div>
                        <UserCard
                          name={name}
                          username={username}
                          description={description}
                          isFollowing={isFollowing}
                        />
                        {index === postContents.length - 1 ? (
                          <></>
                        ) : (
                          <Divider
                            mt={6}
                            borderWidth="1px"
                            borderColor="gray.400"
                          />
                        )}
                      </div>
                    )
                  )}
                </VStack>
              </Box>
            </Box>
          </Flex>
        </Container> */}
        <Text>comming soon...</Text>
      </Box>
    );
  }
  
  export default FollowPage;
  