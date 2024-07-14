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
} from "@chakra-ui/react";
import { CloseButton } from "@chakra-ui/react";
import Header from "./detail_area/Header";
import Profile from "./detail_area/Profile";
import { Link } from "react-router-dom";

const profile = {
  name: "杉本大志",
  username: "kachikachichinko",
  reviewCount: 2.0,
  valueCount: 10.0,
  description: "かちかちちんこ",
  followCount: 2.0,
  followedCount: 3.0,
};

function FollowPage() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box pt={2.5} pb={4} bg="gray.100" borderRadius="normal">
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
                <Text fontSize="lg" fontWeight="light">
                  フォロー 1,301
                </Text>
                <Link to="/home/mypage">
                  <CloseButton />
                </Link>
              </Flex>
              <Divider my={2} borderWidth="2px" borderColor="gray.500" />
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default FollowPage;
