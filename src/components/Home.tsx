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
import { supabase } from "../supabase";
import Header from "./detail_area/Header";
import Review from "./detail_area/Review";




type ContentType = {
  name: string,
  username: string,
  description: string,
  year: string,
  title: string,
  id: number
}

const postContent = [
  {name: "秋田君", username: "katikati_yane", description: "技術書として非常に優れています。著者の田中一郎は、最新のプログラミング技術とトレンドを網羅し、読者に分かりやすく解説しています。特に、AIやブロックチェーン、量子コンピューティングといった先端技術に関する章は必見です。実際のプロジェクトで使える具体例が豊富で、すぐに実践に移せる点も魅力です。また、各章末には練習問題が用意されており、学習内容の定着を助けます。初心者から上級者まで幅広く対応した、未来志向の技術書として一読の価値があります。",  year: "YYYY/MM/dd", title: "次世代プログラミング: 未来のコードを書く", id: 1},
  {name: "祖父江君", username: "katikati_yane_2", description: "技術書として非常に優れています。著者の田中一郎は、最新のプログラミング技術とトレンドを網羅し、読者に分かりやすく解説しています。特に、AIやブロックチェーン、量子コンピューティングといった先端技術に関する章は必見です。実際のプロジェクトで使える具体例が豊富で、すぐに実践に移せる点も魅力です。また、各章末には練習問題が用意されており、学習内容の定着を助けます。初心者から上級者まで幅広く対応した、未来志向の技術書として一読の価値があります。", title: "あああああああ", year: "YYYY/MM/dd", tilte: "カチカチ概論", id: 2},
  {name: "祖父江君", username: "katikati_yane_2", description: "技術書として非常に優れています。著者の田中一郎は、最新のプログラミング技術とトレンドを網羅し、読者に分かりやすく解説しています。特に、AIやブロックチェーン、量子コンピューティングといった先端技術に関する章は必見です。実際のプロジェクトで使える具体例が豊富で、すぐに実践に移せる点も魅力です。また、各章末には練習問題が用意されており、学習内容の定着を助けます。初心者から上級者まで幅広く対応した、未来志向の技術書として一読の価値があります。", title: "ああああ", year: "YYYY/MM/dd", tilte: "カチカチ概論", id: 3}
]





function Home() {
  const isMobile = useBreakpointValue({ base: true, md: false });


  return (
    <Box pt={2.5} pb={4} bg="gray.100" borderRadius="normal">
      <Header />

      <Container centerContent>
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
              <VStack spacing={4} align="stretch">
                {postContent.map(({name, username, year,title, description, id})  => (
                  <Review name={name} username={username} year={year} title={title} description={description} id={id} />
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