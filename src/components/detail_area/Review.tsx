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

type ReviewProps = {
  userId: string;
  description: string;
  targetType: string;
  bookId: string;
  engineerSkillLevel: string;
  id: string;
};

export default function Review({
  userId,
  description,
  targetType,
  bookId,
  engineerSkillLevel,
  id,
}: ReviewProps) {
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
                  <Text>ユーザーID: {userId}</Text>
                </Stack>
              </HStack>
              <Stack pl="30px">
                <HStack>
                  <Button>{targetType}</Button>
                  <Button>{engineerSkillLevel}</Button>
                </HStack>
              </Stack>
            </VStack>
          </Box>

          <VStack align="end">
            {/* <Text as="p">書籍ID: {bookId}</Text> */}
            <Image src="https://via.placeholder.com/65" w="80px" h="100px" />
          </VStack>
        </Flex>

        {/* 書籍情報 */}

        {/* 書籍紹介 */}
        <Divider pt="10px" />
        <Text pt="10px" px="20px">
          {description}
        </Text>

        {/* 返信ボタン */}
        <Box padding="20px">
          <Link to={`/review/${id}`}>
            <Button mt="2">返信</Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}