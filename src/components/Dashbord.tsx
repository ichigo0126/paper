import { signOut } from 'firebase/auth';
import { auth } from '../firebase'; // firebaseの初期化ファイルからauthをインポート
import { Box, Text, Button } from "@chakra-ui/react";

interface DashboardProps {
  user: {
    email: string | null;
  };
}

export default function Dashboard({ user }: DashboardProps) {
  async function handleSignOut() {
    try {
      await signOut(auth);
      // ログアウト後の処理（例：ログインページへのリダイレクト）をここに追加
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  return (
    <Box
      as="main"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bg="lime.100"
      padding={20}
    >
      <Text fontSize="3xl" fontWeight="bold" mb={4}>
        Welcome, {user.email || 'User'}!
      </Text>
      <Button onClick={handleSignOut} colorScheme="red">
        Sign Out
      </Button>
    </Box>
  );
}