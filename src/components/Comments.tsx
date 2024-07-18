import  { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  HStack,
  Stack,
  Text,
  VStack,
  Image,
  Textarea,
} from "@chakra-ui/react";
import { getUserReviewsByReviewId } from "../firebase";

const Comments = () => {
  const { id } = useParams<{ id: string }>();
  const [focusReview, setFocusReview] = useState();

  if (!id) {
    return;
  }

  useEffect(() => {
    const getReviewByReviewId = async () => {
      console.log(id);
      const q = await getUserReviewsByReviewId(id);
      setFocusReview(q);
    };

    getReviewByReviewId();
  }, []);

  if (!focusReview) {
    return;
  }

  return (
    <Box h="100vh" bg="gray.100" pt="30px">
      <Container centerContent>
        <Box
          bg="gray.50"
          border="1px"
          borderColor="gray.300"
          borderRadius="30px"
          w="200%"
        >
          <Box textAlign="right">
            <Box pt="8px" pr="24px">
              <Button>DELETE</Button>
            </Box>
          </Box>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            padding="20px"
          >
            <Box>
              <VStack>
                <HStack>
                  <Link to={`/home`}>
                    <Image
                      src="https://via.placeholder.com/65"
                      w="65px"
                      borderRadius="full"
                    />
                  </Link>
                  <Stack pl="16px">
                    <Link to={`/home`}>
                      <Text> {focusReview.description}</Text>
                    </Link>
                    <Text></Text>
                  </Stack>
                </HStack>
                <Stack pl="30px">
                  <HStack>
                    <Button></Button>
                    <Button></Button>
                  </HStack>
                </Stack>
              </VStack>
            </Box>

            <HStack align="end">
              <VStack>
                <Text></Text>
              </VStack>
            </HStack>
          </Flex>
          <Divider mb="8px" />
          <Text px="20px">aaajjj</Text>
          <Divider mt="8px" />
          <Box padding="16px">
            {/* <HStack mt="4">
              {tags.map((tag) => (
                <Tag key={tag}>
                  <TagLabel>{tag}</TagLabel>
                </Tag>
              ))}
            </HStack> */}
          </Box>
          <Flex justifyContent="space-between">
            <Box>ssss</Box>
            <Box pr="30px" pb="16px">
              <Button>Reply</Button>
            </Box>
          </Flex>
        </Box>
      </Container>
      <Box>
        <Flex align="center" ml="200px">
          <Box
            width="4px"
            height="100px"
            backgroundColor="blue.200"
            margin="20px 0"
          />
          <Box
            width="40px"
            height="4px"
            backgroundColor="blue.200"
            margin="20px 0"
          />
          <Box
            mt="24px"
            w="600px"
            bg="gray.50"
            h="80px"
            borderRadius="10px"
          ></Box>
        </Flex>
      </Box>
      <Box
        bg="gray.50"
        ml="100px"
        w="900px"
        position="fixed"
        bottom="0"
        h="70px"
      >
        <Box>
          <Textarea />
        </Box>
      </Box>
    </Box>
  );
};

export default Comments;
