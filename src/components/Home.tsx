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
  Stack,
} from "@chakra-ui/react";
import { Link } from 'react-router-dom'




type ContentType = {
  name: string,
  username: string,
  description: string,
  year: string
  title: string
}

const postContent = [
  {name: "秋田君", username: "katikati_yane", description: "技術書として非常に優れています。著者の田中一郎は、最新のプログラミング技術とトレンドを網羅し、読者に分かりやすく解説しています。特に、AIやブロックチェーン、量子コンピューティングといった先端技術に関する章は必見です。実際のプロジェクトで使える具体例が豊富で、すぐに実践に移せる点も魅力です。また、各章末には練習問題が用意されており、学習内容の定着を助けます。初心者から上級者まで幅広く対応した、未来志向の技術書として一読の価値があります。",  year: "YYYY/MM/dd", title: "次世代プログラミング: 未来のコードを書く"},
  {name: "祖父江君", username: "katikati_yane_2", description: "技術書として非常に優れています。著者の田中一郎は、最新のプログラミング技術とトレンドを網羅し、読者に分かりやすく解説しています。特に、AIやブロックチェーン、量子コンピューティングといった先端技術に関する章は必見です。実際のプロジェクトで使える具体例が豊富で、すぐに実践に移せる点も魅力です。また、各章末には練習問題が用意されており、学習内容の定着を助けます。初心者から上級者まで幅広く対応した、未来志向の技術書として一読の価値があります。", title: "ああああ", year: "YYYY/MM/dd", tilte: "カチカチ概論"},
  {name: "祖父江君", username: "katikati_yane_2", description: "技術書として非常に優れています。著者の田中一郎は、最新のプログラミング技術とトレンドを網羅し、読者に分かりやすく解説しています。特に、AIやブロックチェーン、量子コンピューティングといった先端技術に関する章は必見です。実際のプロジェクトで使える具体例が豊富で、すぐに実践に移せる点も魅力です。また、各章末には練習問題が用意されており、学習内容の定着を助けます。初心者から上級者まで幅広く対応した、未来志向の技術書として一読の価値があります。", title: "ああああ", year: "YYYY/MM/dd", tilte: "カチカチ概論"}
]


function PostCard({ name, username, title, year, description }: ContentType) {
  return (
    <Container centerContent>
    <Box w="1200px" bg="gray.50">

    {/* ヘッダー */}
    <Flex alignItems="center" justifyContent="space-between" padding="20px">
      <Box>
        <VStack>
        <HStack>
         <Image src="https://via.placeholder.com/65" w="65px"borderRadius="full" />
         <VStack pl="20px">
         <Text>{name} ({username})</Text>
         <Text>{year}</Text>
         </VStack>
        </HStack>
        <Stack pl="30px">
       <HStack>
      <Button>記事</Button>
      <Button>G</Button>
       </HStack>
      </Stack>
        </VStack>

      </Box>


        <VStack>
         <Text as="p">{title}</Text>
         <Image src="https://via.placeholder.com/65" w="80px" h="100px" />
        </VStack>
    </Flex>

    {/* 書籍情報 */}

    {/* 書籍紹介 */}
      <Divider pt="10px" />
      <Text pt="10px" px="20px">{description}</Text>

    {/* 購入ボタン */}
    <Box padding="20px">
      <Flex direction="row-reverse">
      <Button></Button>
      </Flex>
    </Box>
  </Box>
    </Container>
  );
}


function Home() {
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
            w="1800px"
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
            <Link to="/FollowPage">
            <Image src="https://via.placeholder.com/65" w="65px"borderRadius="full" />
            </Link>
          </Flex>
        </Flex>
      </Box>

      <Container >
        <Flex gap={5} flexDirection={isMobile ? "column" : "row"}>
          <Box w={isMobile ? "full" : "69%"}>
            <Box
              p={4}
              pb={20}
              // bg="gray.50"
              borderRadius="3xl"
              shadow="sm"
              w="300px"
            >
              <VStack spacing={6} align="stretch">
                {postContent.map(({name, username, year,title, description})  => (
                  <PostCard name={name} username={username} year={year} title={title} description={description} />
                ))
                }
              </VStack>
            </Box>
          </Box>
        </Flex>
      </Container>

    </Box>
  );
}

export default Home;