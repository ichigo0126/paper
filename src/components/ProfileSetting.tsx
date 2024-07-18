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
  Input,
  Textarea,
} from "@chakra-ui/react";
import { CloseButton } from "@chakra-ui/react";
import Header from "./detail_area/Header";
import Profile from "./detail_area/Profile";
import { Link } from "react-router-dom";

const profile = {
  name: "杉本大志",
  username: "test",
  reviewCount: 2.0,
  valueCount: 10.0,
  description: "test",
  followCount: 2.0,
  followedCount: 3.0,
};

function ProfileSetting() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box pt={2.5} pb={4} bg="gray.100" borderRadius="normal" h="100vh">
      <Container maxW="1587px" mt={6}>
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
                <Text>プロフィール設定</Text>
                <Link to="/home/mypage">
                  <CloseButton />
                </Link>
              </Flex>
              <Divider my={2} borderWidth="2px" borderColor="gray.500" />
              <Box pl="40px">
                <Box>
                  <Flex mt="10px" align="center">
                    <Text>1, 変更したいユーザ名を入力してください</Text>
                    <Input
                      ml="20px"
                      width="auto"
                      placeholder="現在のユーザ名"
                    />
                    <Button ml="20px">変更</Button>
                  </Flex>
                </Box>
                <Box>
                  <Flex mt="30px" align="center">
                    <Text>2, 変更したいユーザIDを入力してください</Text>
                    <Input
                      ml="20px"
                      width="auto"
                      placeholder="現在のユーザID"
                    />
                    <Button ml="20px">変更</Button>
                  </Flex>
                </Box>
                <Box mt="30px">
                  <Text>3, ステータスメッセージ</Text>
                  <HStack>
                    <Textarea
                      value="すでに描かれているステータスメッセージ"
                      w={isMobile ? "full" : "69%"}
                      mt="8px"
                    />
                    <Button ml="10px">変更</Button>
                  </HStack>
                </Box>
                <Box mt="30px">
                  <Flex align="center">
                    <Text>4, プロフィール画像の変更</Text>
                    <Input ml="30px" type="file" width="auto" />
                    <Button ml="10px">変更</Button>
                  </Flex>
                </Box>
                <Box mt="30px">
                  <Flex align="center">
                    <Text>5, ブロックリスト</Text>
                    <Button ml="50px">表示</Button>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default ProfileSetting;
