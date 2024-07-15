const tags = [
  "Python", "AWS", "TypeScript", "React", "JavaScript", "Next.js", "Flutter", "Docker", "Go", "Rails", "Ruby", "GitHub", 
  "Rust", "iOS", "PHP", "Linux", "HTML", "Swift", "Android", "Git", "VS code", "Unity", "Node.js", "Dart", "CSS", "Azure", 
  "Laravel", "Java", "ChatGPT", "AI", "Firebase", "AtCorder", "C#", "Vue.js", "MySQL", "Kotlin", "Ubuntu", "OpenAI", 
  "C++", "Terraform"
];

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
  Box,
  RadioGroup,
  Radio,
  VStack
} from "@chakra-ui/react";
import React, { useState } from "react";

type ModalProp = {
  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchModal = ({ isSearchOpen, setIsSearchOpen }: ModalProp) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags) => 
      prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
    );
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
              <RadioGroup>
                <HStack direction="row">
                  <Radio value="1">本</Radio>
                  <Radio value="2">記事</Radio>
                </HStack>
              </RadioGroup>
            </HStack>
            <Divider />
            <HStack>
              <Text>難易度：</Text>
              <RadioGroup>
                <HStack direction="row">
                  <Radio value="easy">Easy</Radio>
                  <Radio value="normal">Normal</Radio>
                  <Radio value="hard">Hard</Radio>
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
          <Button onClick={() => setIsSearchOpen(false)}>閉じる</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SearchModal;
