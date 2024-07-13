import {
  Box,
  Flex,
  VStack,
  Container,
  useBreakpointValue,
} from "@chakra-ui/react";
import Header from "./detail_area/Header";
import Review from "./detail_area/Review";
import { useState } from "react";
import { CiBookmark } from "react-icons/ci";

const postContent = [
  {
    name: "秋田君",
    username: "katikati_yane",
    description:
      "技術書として非常に優れています。著者の田中一郎は、最新のプログラミング技術とトレンドを網羅し、読者に分かりやすく解説しています。特に、AIやブロックチェーン、量子コンピューティングといった先端技術に関する章は必見です。実際のプロジェクトで使える具体例が豊富で、すぐに実践に移せる点も魅力です。また、各章末には練習問題が用意されており、学習内容の定着を助けます。初心者から上級者まで幅広く対応した、未来志向の技術書として一読の価値があります。",
    year: "YYYY/MM/dd",
    title: "次世代プログラミング: 未来のコードを書く",
    id: 1,
    valueCount: 2000,
    bookmarkCount: 300,
  },
  {
    name: "祖父江君",
    username: "katikati_yane_2",
    description:
      "技術書として非常に優れています。著者の田中一郎は、最新のプログラミング技術とトレンドを網羅し、読者に分かりやすく解説しています。特に、AIやブロックチェーン、量子コンピューティングといった先端技術に関する章は必見です。実際のプロジェクトで使える具体例が豊富で、すぐに実践に移せる点も魅力です。また、各章末には練習問題が用意されており、学習内容の定着を助けます。初心者から上級者まで幅広く対応した、未来志向の技術書として一読の価値があります。",
    title: "あああああああ",
    year: "YYYY/MM/dd",
    tilte: "カチカチ概論",
    id: 2,
    valueCount: 2000,
    bookmarkCount: 300,
  },
  {
    name: "祖父江君",
    username: "katikati_yane_2",
    description:
      "技術書として非常に優れています。著者の田中一郎は、最新のプログラミング技術とトレンドを網羅し、読者に分かりやすく解説しています。特に、AIやブロックチェーン、量子コンピューティングといった先端技術に関する章は必見です。実際のプロジェクトで使える具体例が豊富で、すぐに実践に移せる点も魅力です。また、各章末には練習問題が用意されており、学習内容の定着を助けます。初心者から上級者まで幅広く対応した、未来志向の技術書として一読の価値があります。",
    title: "ああああ",
    year: "YYYY/MM/dd",
    tilte: "カチカチ概論",
    id: 3,
    valueCount: 2000,
    bookmarkCount: 300,
  },
];

function Home() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box pb={4} bg="gray.100" borderRadius="normal">
      <Container centerContent>
        <Flex gap={5} flexDirection={isMobile ? "column" : "row"}>
          <Box w={isMobile ? "full" : "69%"}>
            <Box p={4} pb={20} borderRadius="3xl" shadow="sm" w="300px">
              <VStack spacing={4} align="stretch">
                {postContent.map(
                  ({
                    name,
                    username,
                    year,
                    title,
                    description,
                    id,
                    valueCount,
                    bookmarkCount,
                  }) => (
                    <Review
                      name={name}
                      username={username}
                      year={year}
                      title={title}
                      description={description}
                      id={id}
                      valueCount={valueCount}
                      bookmarkCount={bookmarkCount}
                    />
                  )
                )}
              </VStack>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default Home;
