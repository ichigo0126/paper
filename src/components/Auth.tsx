import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase"; // Firebaseの初期化ファイルからauthをインポート
import React, { useEffect, useState, useRef } from "react";
import { supabase } from "../supabase";
import { Box, Button, Image, Text, Flex } from "@chakra-ui/react";

type GoogleLoginButtonProps = {
  text: string;
  onClick: () => void;
};

interface TypingAnimationProps {
  text: string;
  speed: number;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ text, speed }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;

    const typeCharacter = () => {
      if (currentIndex < text.length) {
        setDisplayedText((prev) => prev + text[currentIndex]);
        currentIndex += 1;
        setTimeout(typeCharacter, speed);
      }
    };

    typeCharacter();

    // クリーンアップ関数を追加
    return () => {
      setDisplayedText(''); // コンポーネントがアンマウントされた場合に状態をリセット
    };
  }, [text, speed]);

  return <div>{displayedText}</div>;
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
  const [error, setError] = useState(null);
  const [isDisplayMessage, setIsDisplayMessage] = useState<string>("")

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
          {/* この文章カチカチやね */}
          <TypingAnimation text={isDisplayMessage} speed={100}/>
        </Text>

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