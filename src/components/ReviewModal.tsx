import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Stack,
  HStack,
  Text,
  Input,
  Textarea,
  RadioGroup,
  Radio,
  VStack,
  Box,
  Image,
  useToast,
} from "@chakra-ui/react";
import Select from 'react-select';
import { createReview, saveUserToFirestore } from "../firebase";
import { User } from "firebase/auth";

type ModalProp = {
  isReviewOpen: boolean;
  setIsReviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: User | null;
};

type Book = {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string;
};

interface ReviewData {
  userId: string;
  username: string | null;
  description: string;
  stars: number;
  targetType: "BOOK" | "ARTICLE";
  bookId: string;
  engineerSkillLevel: "Easy" | "Normal" | "Hard";
  tags: string[];
  bookDetails: {
    title: string;
    thumbnail: string;
  };
}

const tags = [
  "Python", "AWS", "TypeScript", "React", "JavaScript", "Next.js", "Flutter", "Docker", "Go", "Rails", "Ruby", "GitHub", 
  "Rust", "iOS", "PHP", "Linux", "HTML", "Swift", "Android", "Git", "VS code", "Unity", "Node.js", "Dart", "CSS", "Azure", 
  "Laravel", "Java", "ChatGPT", "AI", "Firebase", "AtCorder", "C#", "Vue.js", "MySQL", "Kotlin", "Ubuntu", "OpenAI", 
  "C++", "Terraform"
];

const ReviewModal = ({ isReviewOpen, setIsReviewOpen, currentUser }: ModalProp) => {
  const [mediaType, setMediaType] = useState<"BOOK" | "ARTICLE">("BOOK");
  const [searchQuery, setSearchQuery] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [difficulty, setDifficulty] = useState<"Easy" | "Normal" | "Hard">("Normal");
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [stars, setStars] = useState(0);
  const [selectedTags, setSelectedTags] = useState<{ value: string, label: string }[]>([]);
  const toast = useToast();

  const searchBooks = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=5`
      );
      const data = await response.json();
      const formattedBooks: Book[] = data.items.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || [],
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
      }));
      setBooks(formattedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
      toast({
        title: "検索エラー",
        description: "本の検索中にエラーが発生しました。",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSubmitReview = async () => {
    if (!currentUser) {
      toast({
        title: "エラー",
        description: "レビューを投稿するにはログインが必要です。",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!selectedBook) {
      toast({
        title: "エラー",
        description: "レビューする本を選択してください。",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (reviewContent.length === 0) {
      toast({
        title: "エラー",
        description: "レビュー内容を入力してください。",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (reviewContent.length > 200) {
      toast({
        title: "エラー",
        description: "レビューは200文字以内で入力してください。",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const reviewData: ReviewData = {
        userId: currentUser.uid,
        username: currentUser.displayName,
        description: reviewContent,
        stars: stars,
        targetType: mediaType,
        bookId: selectedBook.id,
        engineerSkillLevel: difficulty,
        tags: selectedTags.map(tag => tag.value),
        bookDetails: {
          title: selectedBook.title,
          thumbnail: selectedBook.thumbnail
        }
      };

      const reviewId = await createReview(reviewData);
      toast({
        title: "レビューを投稿しました",
        description: `レビューID: ${reviewId}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsReviewOpen(false);
      // フォームをリセット
      setSearchQuery("");
      setReviewContent("");
      setSelectedBook(null);
      setBooks([]);
      setStars(0);
      setSelectedTags([]);
      await saveUserToFirestore(currentUser);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "エラー",
        description: "レビューの投稿中にエラーが発生しました。",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleTagChange = (selectedOptions: any) => {
    setSelectedTags(selectedOptions || []);
  };

  const tagOptions = tags.map(tag => ({ value: tag, label: tag }));

  return (
    <Modal isOpen={isReviewOpen} onClose={() => setIsReviewOpen(false)}>
      <ModalContent maxWidth="800px">
        <ModalHeader textAlign="center">投稿</ModalHeader>
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <HStack>
              <Text>媒体の種類：</Text>
              <RadioGroup value={mediaType} onChange={(value) => setMediaType(value as "BOOK" | "ARTICLE")}>
                <HStack direction="row">
                  <Radio value="BOOK">本</Radio>
                  <Radio value="ARTICLE">記事</Radio>
                </HStack>
              </RadioGroup>
            </HStack>
            <HStack>
              <Text>検索：</Text>
              <Input
                placeholder="本のタイトルや著者名を入力"
                bg="gray.100"
                h="40px"
                w="500px"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button bg="blue.300" color="white" onClick={searchBooks}>
                検索
              </Button>
            </HStack>
            {books.length > 0 && (
              <VStack align="stretch" spacing={2}>
                {books.map((book) => (
                  <Box
                    key={book.id}
                    borderWidth={1}
                    borderRadius="md"
                    p={2}
                    cursor="pointer"
                    onClick={() => setSelectedBook(book)}
                    bg={selectedBook?.id === book.id ? "blue.100" : "white"}
                  >
                    <HStack>
                      <Image src={book.thumbnail} alt={book.title} boxSize="50px" />
                      <VStack align="start">
                        <Text fontWeight="bold">{book.title}</Text>
                        <Text>{book.authors.join(", ")}</Text>
                      </VStack>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            )}
            <Stack>
              <Text>評価内容：</Text>
              <Textarea
                placeholder="200文字以内"
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
              />
              <Text fontSize="sm" color={reviewContent.length > 200 ? "red.500" : "gray.500"}>
                {reviewContent.length}/200文字
              </Text>
            </Stack>
            <HStack>
              <Text>難易度：</Text>
              <RadioGroup value={difficulty} onChange={(value) => setDifficulty(value as "Easy" | "Normal" | "Hard")}>
                <HStack direction="row">
                  <Radio value="Easy">Easy</Radio>
                  <Radio value="Normal">Normal</Radio>
                  <Radio value="Hard">Hard</Radio>
                </HStack>
              </RadioGroup>
            </HStack>
            <HStack>
              <Text>タグ：</Text>
              <Select
                isMulti
                placeholder="タグを選択"
                options={tagOptions}
                onChange={handleTagChange}
                value={selectedTags}
              />
            </HStack>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmitReview} colorScheme="blue" mr={3}>
            投稿
          </Button>
          <Button onClick={() => setIsReviewOpen(false)}>閉じる</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReviewModal;