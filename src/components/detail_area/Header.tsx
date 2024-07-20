import {
  Box,
  Flex,
  Image,
  HStack,
  useBreakpointValue,
  Button,
  Input,
  Text,
  VStack,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
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
import { HamburgerIcon } from "@chakra-ui/icons";

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
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const NavButtons = () => (
    <>
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
    </>
  );

  return (
    <Box w="full" borderRadius="normal">
      <Flex
        zIndex={10}
        gap={5}
        justifyContent="space-between"
        alignItems="center"
        px={[2, 5, 10]}
        py={2}
        w="full"
        bg="blue.400"
        borderRadius="normal"
        flexWrap="wrap"
      >
        <HStack spacing={[2, 4]}>
          <Link to="/">
            <Box
              border="1px"
              borderColor="whiteAlpha.900"
              h={["50px", "67px"]}
              borderRadius="normal"
              w={["140px", "183px"]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text
                fontFamily="Jomhuria, serif"
                color="white"
                userSelect="none"
                fontSize={["70px", "100px"]}
              >
                PAPER
              </Text>
            </Box>
          </Link>
          {!isMobile && (
            <HStack>
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
          )}
        </HStack>
        {isMobile ? (
          <HStack>

            <IconButton
              aria-label="Menu"
              icon={<HamburgerIcon />}
              onClick={onOpen}
            />
          </HStack>
        ) : (
          <HStack spacing={4}>
            <NavButtons />
            <Link to="./mypage">
              <Image
                src={"https://placehold.jp/65x65.png" || user?.photoURL }
                w="65px"
                h="65px"
                borderRadius="full"
                objectFit="cover"
              />
            </Link>
          </HStack>
        )}
      </Flex>
      {isMobile && (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <VStack spacing={4} align="stretch">
                <NavButtons />
                <Link to="./mypage" onClick={onClose}>
                  <Image
                    src={"https://placehold.jp/65x65.png" || user?.photoURL}
                    w="65px"
                    h="65px"
                    borderRadius="full"
                    objectFit="cover"
                  />
                </Link>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
      {isMobile && (
        <Box px={2} py={2} bg="blue.400">
          <HStack>
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
      )}
    </Box>
  );
};

export default Header;
