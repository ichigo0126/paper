import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase"; // Firebaseの初期化ファイルからauthをインポート
import { Box, Button, Image, Text, Flex } from "@chakra-ui/react";

type GoogleLoginButtonProps = {
  text: string;
  onClick: () => void;
};

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  text,
  onClick,
}) => (
  <Button
    onClick={onClick}
    display="flex"
    alignItems="center"
    gap={5}
    px={3.5}
    py={2.5}
    maxW="full"
    bg="white"
    borderRadius="lg"
    w="400px"
    _hover={{ bg: "gray.100" }}
  >
    <Image
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/a42a6655ec4dd7355c27ca4470b82e9c66e8b42c742357a0879477b5744dedce?apiKey=d597a574c8504c4cb8ec72afd71f5d0f&"
      w="5"
      h="5"
      alt="Google logo"
    />
    <Text flexGrow={1} textAlign="center">
      {text}
    </Text>
  </Button>
);

export default function Auth() {
  const [error, setError] = useState<string | null>(null);

  async function signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // ログイン成功時の処理はここに追加（必要に応じて）
    } catch (error) {
      setError((error as Error).message);
    }
  }

  return (
    <Box
      as="main"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      fontSize="base"
      fontWeight="medium"
      lineHeight="6"
      whiteSpace="nowrap"
      bg="lime.100"
      borderRadius="normal"
      color="black"
      alignItems="center"
      gap={20}
      padding={20}
    >
      <Text
        fontFamily="Jomhuria, serif"
        fontWeight={400}
        fontSize="200px"
        color="white"
        pt="30px"
        userSelect="none"
      >
        PAPER
      </Text>
      <Text fontWeight="bold" fontSize="30px">
        この文章カチカチやね
      </Text>{" "}
      <Flex
        as="section"
        justifyContent="center"
        alignItems="center"
        px={{ base: 5, md: 16 }}
        py={20}
        w="full"
        borderRadius="normal"
      >
        <GoogleLoginButton
          text="Sign in with Google"
          onClick={signInWithGoogle}
        />
      </Flex>
      {error && <Text color="red.500">{error}</Text>}
    </Box>
  );
}