import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  HStack,
  Text,
  Divider,
  Wrap,
  WrapItem,
  RadioGroup,
  Radio,
  VStack,
  useToast,
  Spacer
} from "@chakra-ui/react";
import React, { useState } from "react";

const tags = [
  "Python", "AWS", "TypeScript", "React", "JavaScript", "Next.js", "Flutter", "Docker", "Go", "Rails", "Ruby", "GitHub", 
  "Rust", "iOS", "PHP", "Linux", "HTML", "Swift", "Android", "Git", "VS code", "Unity", "Node.js", "Dart", "CSS", "Azure", 
  "Laravel", "Java", "ChatGPT", "AI", "Firebase", "AtCorder", "C#", "Vue.js", "MySQL", "Kotlin", "Ubuntu", "OpenAI", 
  "C++", "Terraform"
];

type ModalProp = {
  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSearch: (tags: string[], mediaType: string, difficulty: string) => void;
};

const SearchModal = ({ isSearchOpen, setIsSearchOpen, onSearch }: ModalProp) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [mediaType, setMediaType] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const toast = useToast();

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags) => 
      prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
    );
  };
  
  const handleSearch = () => {
    onSearch(selectedTags, mediaType, difficulty);
    toast({
      title: "検索実行",
      description: `選択されたタグ: ${selectedTags.join(", ")}`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
    setIsSearchOpen(false);
  };

  return (
    <Modal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)}>
      <ModalContent maxWidth="400px">
        <ModalHeader textAlign="center">詳細検索</ModalHeader>
        <Divider />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <HStack>
              <Text>媒体の種類：</Text>
              <RadioGroup onChange={setMediaType} value={mediaType}>
                <HStack direction="row">
                  <Radio value="BOOK">本</Radio>
                  <Radio value="ARTICLE">記事</Radio>
                </HStack>
              </RadioGroup>
            </HStack>
            <Divider />
            <HStack>
              <Text>難易度：</Text>
              <RadioGroup onChange={setDifficulty} value={difficulty}>
                <HStack direction="row">
                  <Radio value="Easy">Easy</Radio>
                  <Radio value="Normal">Normal</Radio>
                  <Radio value="Hard">Hard</Radio>
                </HStack>
              </RadioGroup>
            </HStack>
            <Divider />
            <Text>タグ：</Text>
            <Wrap spacing={2}>
              {tags.map((tag) => (
                <WrapItem key={tag}>
                  <Button
                    size="sm"
                    variant={selectedTags.includes(tag) ? "solid" : "outline"}
                    onClick={() => handleTagClick(tag)}
                    colorScheme={selectedTags.includes(tag) ? "blue" : "gray"}
                  >
                    {tag}
                  </Button>
                </WrapItem>
              ))}
            </Wrap>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSearch}>
            検索
          </Button>
          <Spacer />
          <Button onClick={() => setIsSearchOpen(false)}>閉じる</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SearchModal;