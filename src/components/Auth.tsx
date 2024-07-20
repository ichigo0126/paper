import React, { useEffect, useState } from "react";
import { Box, Button, Image, Text, Flex } from "@chakra-ui/react";

type GoogleLoginButtonProps = {
  text: string;
  onClick: () => void;
};

interface TypingAnimationProps {
  messages: string[];
  speed: number;
}

interface AuthProps {
  onSignIn: () => Promise<void>;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ messages, speed }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    let currentIndex = 0;
    let currentMessage = messages[currentMessageIndex];
    let timeoutId: NodeJS.Timeout;

    const typeCharacter = () => {
      if (currentIndex < currentMessage.length) {
        setDisplayedText(currentMessage.substring(0, currentIndex + 1));
        currentIndex += 1;
        timeoutId = setTimeout(typeCharacter, speed);
      } else {
        timeoutId = setTimeout(() => {
          setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
          setDisplayedText("");
        }, 5000);
      }
    };

    typeCharacter();

    return () => {
      clearTimeout(timeoutId);
      setDisplayedText("");
    };
  }, [messages, speed, currentMessageIndex]);

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
      src="https://img.icons8.com/fluency/48/google-logo.png"
      w="5"
      h="5"
      alt="google-logo"
    />
    <Text flexGrow={1} textAlign="center">
      {text}
    </Text>
  </Button>
);

const Auth: React.FC<AuthProps> = ({ onSignIn }) => {
  const [error, setError] = useState<string | null>(null);

  const messages = [
    "スキルレベルで選べる、エンジニアのための洞察力あふれる書評プラットフォーム",
    "技術書の深い理解を促進する、エンジニアスキル可視化型レビューサービス",
    "エンジニアの成長が見える、スキル連動型書籍レビューコミュニティ",
  ];

  async function handleSignIn() {
    try {
      await onSignIn();
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
        <TypingAnimation messages={messages} speed={100} />
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
          onClick={handleSignIn}
        />
      </Flex>
      {error && <Text color="red.500">{error}</Text>}
    </Box>
  );
};

export default Auth;