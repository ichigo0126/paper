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
import { signOut, User } from "firebase/auth";
import { auth } from "../../firebase";
import { GrLogout } from "react-icons/gr";
import { MdOutlineNoteAdd } from "react-icons/md";
import { IoMdOptions } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from "react";
import { CiBookmark, CiHeart } from "react-icons/ci";

type HeaderProps = {
  setIsReviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSearch: (searchText: string) => void;
};

const Header = ({
  setIsReviewOpen,
  setIsSearchOpen,
  onSearch,
}: HeaderProps) => {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [searchText, setSearchText] = useState("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  async function handleSignOut() {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

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
                <Input
                  placeholder="search"
                  bg="gray.100"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button onClick={handleSearch}>
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
                  <CiBookmark />
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
                  <CiHeart />
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
                src={"https://placehold.jp/65x65.png" || user?.photoURL }
                w="65px"
                h="65px"
                borderRadius="full"
                objectFit="cover"
              />
            </Link>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
};

export default Header;
