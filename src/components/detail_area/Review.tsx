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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

type ContentType = {
  name: string;
  username: string;
  description: string;
  year: string;
  title: string;
  id: number;
};

export default function Review({
  name,
  username,
  title,
  year,
  description,
  id,
}: ContentType) {
  return (
    <Container centerContent>
      <Box w="1000px" bg="gray.50">
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
                    {name} ({username})
                  </Text>
                  <Text>{year}</Text>
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
            <Text as="p">{title}</Text>
            <Image src="https://via.placeholder.com/65" w="80px" h="100px" />
          </VStack>
        </Flex>

        {/* 書籍情報 */}

        {/* 書籍紹介 */}
        <Divider pt="10px" />
        <Text pt="10px" px="20px">
          {description}
        </Text>

        {/* 購入ボタン */}
        <Box padding="20px">
          <Link to={`/review/${id}`}>
            <Button mt="2">返信</Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
