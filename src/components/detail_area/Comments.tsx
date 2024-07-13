import React from 'react'
import Review  from './Review'
import { Link, useParams } from 'react-router-dom';
import { Box, Button, Container, Divider, Flex, HStack, Stack, Text, VStack, Image } from '@chakra-ui/react';

const reviews = [
  {name: "秋田君", username: "katikati_yane", description: "技術書として非常に優れています。著者の田中一郎は、最新のプログラミング技術とトレンドを網羅し、読者に分かりやすく解説しています。特に、AIやブロックチェーン、量子コンピューティングといった先端技術に関する章は必見です。実際のプロジェクトで使える具体例が豊富で、すぐに実践に移せる点も魅力です。また、各章末には練習問題が用意されており、学習内容の定着を助けます。初心者から上級者まで幅広く対応した、未来志向の技術書として一読の価値があります。",  year: "YYYY/MM/dd", title: "次世代プログラミング: 未来のコードを書く", id: 1},
  {name: "祖父江君", username: "katikati_yane_2", description: "技術書として非常に優れています。著者の田中一郎は、最新のプログラミング技術とトレンドを網羅し、読者に分かりやすく解説しています。特に、AIやブロックチェーン、量子コンピューティングといった先端技術に関する章は必見です。実際のプロジェクトで使える具体例が豊富で、すぐに実践に移せる点も魅力です。また、各章末には練習問題が用意されており、学習内容の定着を助けます。初心者から上級者まで幅広く対応した、未来志向の技術書として一読の価値があります。", title: "あああああああ", year: "YYYY/MM/dd", tilte: "カチカチ概論", id: 2},
  {name: "祖父江君", username: "katikati_yane_2", description: "技術書として非常に優れています。著者の田中一郎は、最新のプログラミング技術とトレンドを網羅し、読者に分かりやすく解説しています。特に、AIやブロックチェーン、量子コンピューティングといった先端技術に関する章は必見です。実際のプロジェクトで使える具体例が豊富で、すぐに実践に移せる点も魅力です。また、各章末には練習問題が用意されており、学習内容の定着を助けます。初心者から上級者まで幅広く対応した、未来志向の技術書として一読の価値があります。", title: "ああああ", year: "YYYY/MM/dd", tilte: "カチカチ概論", id: 3}
]


const Comments = () => {
  const { id } = useParams();
  const review = reviews.find((review) => review.id === parseInt(id));

  if (!review) {
    return <Text>レビューが見つかりませんでした。</Text>;
  }

  return (
    <Container centerContent>
    <Box w="1200px" bg="gray.50">
      {/* ヘッダー */}
      <Flex alignItems="center" justifyContent="space-between" padding="20px">
        <Box>
          <VStack>
            <HStack>
              <Image
                src="https://via.placeholder.com/65"
                w="65px"
                borderRadius="full"
              />
              <Stack pl="20px">
                <Text>
                {review.name} ({review.username})
                </Text>
                <Text>{review.year}</Text>
              </Stack>
            </HStack>
            <Stack pl="30px">
              <HStack>
                <Button>記事</Button>
                <Button>G</Button>
              </HStack>
            </Stack>
          </VStack>
        </Box>

        <VStack align="end">
          <Text as="p">{review.title}</Text>
          <Image src="https://via.placeholder.com/65" w="80px" h="100px" />
        </VStack>
      </Flex>

      {/* 書籍情報 */}

      {/* 書籍紹介 */}
      <Divider pt="10px" />
      <Text pt="10px" px="20px">
      {review.description}
      </Text>
    </Box>
  </Container>
  );
};

export default Comments