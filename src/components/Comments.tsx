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

  const [displayReplyForm, setDisplayReplyForm] = useState<boolean>(false);

  if (!id) {
    return;
  }

  useEffect(() => {
    const getReviewByReviewId = async () => {
      try {
        console.log(id);
        const q = await getUserReviewsByReviewId(id);
        console.log(q); // レスポンス全体をログに出力して、データの構造を確認
        setFocusReview(q); // qが実際にレスポンスのデータを含んでいることを確認
      } catch (error) {
        console.error("Error fetching review:", error);
      }
    };

    getReviewByReviewId();


  }, [id]);
  if (!focusReview) {
    return;
  }

  const replies = [
    { id: 1, text: "First reply" },
    { id: 2, text: "Second reply" },
    { id: 3, text: "Second reply" },
    // { id: 3, text: "Second reply" },
    // { id: 3, text: "Second reply" },
  ];

  const PostReview = (focusReview: any) => {
    return (
      <Container centerContent>
        
        <Box
          bg="gray.50"
          border="1px"
          borderColor="gray.300"
          borderRadius="30px"
          w="220%"
        >
          <Flex>
            <Box>
              <VStack>
                <HStack>
                  <Link to={`/home/:id`}>
                    <Image
                      src="https://via.placeholder.com/65"
                      w="65px"
                      borderRadius="full"
                    />
                  </Link>
                
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
                <Text>{focusReview.username}</Text>
              </VStack>
            </HStack>
          </Flex>
          <Flex justifyContent="space-between">
            <Box>ssss</Box>
            <Box pr="30px" pb="16px">
              <Button onClick={() => setDisplayReplyForm(!displayReplyForm)}>
                Reply
              </Button>
            </Box>
          </Flex>
        </Box>
      </Container>
    );
  };

  const ReplyComment = ({ text }: any) => {
    return (
      <Box
        bg="gray.50"
        w="1000px"
        h="130px"
        borderRadius="10px"
        border="1px"
        color="gray.400"
      >
        <Flex>
          <VStack>
            <Image
              src={"https://via.placeholder.com/65"}
              mt="6px"
              ml="20px"
              w="65px"
              h="65px"
              borderRadius="full"
            />
            <Text pl="15px">{text}(aaaaaaaaaaa)</Text>
          </VStack>
          <Box pt="10px" pl="20px" w="90%">
            <Box border="1px" w="96%" borderColor="gray.400" h="90px">
              <Text></Text>
            </Box>
          </Box>
        </Flex>
      </Box>
    );
  };

  const Reply = ({ text }) => (
    <HStack align="start" spacing={2}>
      <Box borderTop="1px" borderColor="gray.400" width="32px" />

      <Box borderLeft="1px" borderColor="gray.400" height="100%" />
      <ReplyComment text={text} />
    </HStack>
  );

  return (
    <Box bg="gray.100" pt="30px">
      <Container>
        <PostReview focusReview={focusReview} />
        <Box position="relative" right="200px">
          <VStack align="start">
            {replies.length != 0 ? (
              replies.map((reply) => (
                <>
                  <HStack align="start" spacing={2}>
                    <Box
                      borderLeft="1px"
                      borderColor="gray.400"
                      height="40px"
                    />
                  </HStack>
                  <Reply key={reply.id} text={reply.text} />
                </>
              ))
            ) : (
              <Box pt="70px" pl="100px">
                <Text>返信がありません。</Text>
              </Box>
            )}
          </VStack>
        </Box>
      </Container>

      {displayReplyForm && (
        <Box
          bg="gray.50"
          ml="300px"
          w="1000px"
          position="fixed"
          left="170px"
          bottom="8px"
          h="120px"
          borderRadius="10px"
          border="1px"
          color="gray.400"
        >
          <Flex>
            <VStack>
              <Image
                src={"https://via.placeholder.com/65"}
                mt="6px"
                ml="20px"
                w="65px"
                h="65px"
                borderRadius="full"
              />
              <Text pl="15px">名前 (sssss)</Text>
            </VStack>
            <Box pt="10px" pl="20px" w="90%">
              <Textarea placeholder="@ユーザ名" />
            </Box>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default Comments;
