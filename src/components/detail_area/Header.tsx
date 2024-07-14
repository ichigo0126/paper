import {
  Box,
  Flex,
  Image,
  HStack,
  useBreakpointValue,
  Button,
  Input,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase"; // firebaseの初期化ファイルからauthをインポート
import { GrLogout } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { IoBookmarks } from "react-icons/io5";
import { MdOutlineNoteAdd } from "react-icons/md";
import { IoMdOptions } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

type ModalProp = {
  setIsReviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ setIsReviewOpen, setIsSearchOpen }: ModalProp) => {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  async function handleSignOut() {
    try {
      await signOut(auth);
      // ログアウト後の処理（例：ログインページへのリダイレクト）をここに追加
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <div>
      <Box w="full" borderRadius="normal">
        <Flex
          zIndex={10}
          gap={5}
          justifyContent="space-between"
          alignItems="flex-start"
          px={10}
          pb={2}
          w="full"
          bg="blue.400"
          borderRadius="normal"
          flexWrap={isMobile ? "wrap" : "nowrap"}
        >
          <HStack>
            <Link to="/">
              <Box
                mt="4px"
                border="1px"
                borderColor="whiteAlpha.900"
                h="67px"
                borderRadius="normal"
                w="183px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  pt="14px"
                  fontFamily="Jomhuria, serif"
                  color="white"
                  userSelect="none"
                  fontSize="100px"
                >
                  PAPER
                </Text>
              </Box>
            </Link>
            <Box>
              <HStack pl="20px">
                <Button onClick={() => setIsSearchOpen(true)}>
                  <IoMdOptions />
                </Button>
                <Input placeholder="search" bg="gray.100" />
                <Button>
                  <CiSearch />
                </Button>
              </HStack>
            </Box>
          </HStack>
          <Flex gap={5} justifyContent="space-between" mt={1.5}>
            <HStack gap={5} my="auto">
              <Button
                w="40px"
                h="40px"
                p="5px"
                border="1px"
                borderColor="whiteAlpha.900"
                onClick={() => setIsReviewOpen(true)}
              >
                <MdOutlineNoteAdd />
              </Button>
              <Link to="./mypage/bookmarkpage">
                <Button
                  w="40px"
                  h="40px"
                  p="5px"
                  border="1px"
                  borderColor="whiteAlpha.900"
                >
                  <IoBookmarks />
                </Button>
              </Link>
              <Link to="./mypage/mylikepage">
                <Button
                  w="40px"
                  h="40px"
                  p="5px"
                  border="1px"
                  borderColor="whiteAlpha.900"
                >
                  <FaHeart />
                </Button>
              </Link>
              <Button
                w="40px"
                h="40px"
                p="4px"
                border="1px"
                borderColor="whiteAlpha.900"
                onClick={handleSignOut}
              >
                <GrLogout />
              </Button>
            </HStack>
            <Link to="./mypage">
              <Image
                src="https://via.placeholder.com/65"
                w="65px"
                borderRadius="full"
              />
            </Link>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
};

export default Header;
