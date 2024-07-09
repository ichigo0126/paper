import {
  Box,
  Flex,
  Image,
  HStack,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { supabase } from "../../supabase";
import FollowPage from "../FollowPage";
import { useEffect, useState } from "react";


const Header = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error signing out:", error);
  }

  return (
    <div>
      {" "}
      <Box pb={7} w="full" borderRadius="normal">
        <Flex
          zIndex={10}
          gap={5}
          justifyContent="space-between"
          alignItems="flex-start"
          px={7}
          pb={2}
          w="full"
          bg="blue.400"
          borderRadius="normal"
          flexWrap={isMobile ? "wrap" : "nowrap"}
        >
          <Link to="/">
            <Box
              border="1px"
              borderColor="whiteAlpha.900"
              h="67px"
              borderRadius="normal"
              w="183px"
            />
          </Link>
          <Flex gap={5} justifyContent="space-between" mt={1.5}>
            <HStack gap={5} my="auto">
              <Button
                w="40px"
                h="40px"
                p="5px"
                border="1px"
                borderColor="whiteAlpha.900"
                onClick={handleSignOut}
              >
                <ExternalLinkIcon />
              </Button>
              <Button
                w="40px"
                h="40px"
                p="5px"
                border="1px"
                borderColor="whiteAlpha.900"
                onClick={handleSignOut}
              >
                <ExternalLinkIcon />
              </Button>
              <Button
                w="40px"
                h="40px"
                p="5px"
                border="1px"
                borderColor="whiteAlpha.900"
                onClick={handleSignOut}
              >
                <ExternalLinkIcon />
              </Button>
              <Button
                w="40px"
                h="40px"
                p="5px"
                border="1px"
                borderColor="whiteAlpha.900"
                onClick={handleSignOut}
              >
                <ExternalLinkIcon />
              </Button>
            </HStack>
            <Link to="/FollowPage">
            <Image src="https://via.placeholder.com/65" w="65px" />
            </Link>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
};

export default Header;
