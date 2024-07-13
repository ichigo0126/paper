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
  Divider,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { Radio, RadioGroup } from "@chakra-ui/react";

type ModalProp = {
  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchModal = ({ isSearchOpen, setIsSearchOpen }: ModalProp) => {
  return (
    <>
      <Modal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)}>
        <ModalContent maxWidth="400px">
          <ModalHeader textAlign="center">詳細検索</ModalHeader>
          <Divider />
          <ModalBody>
            <HStack>
              <Text>媒体の種類：</Text>
              <RadioGroup>
                <HStack direction="row">
                  <Radio value="1">本</Radio>
                  <Radio value="2">記事</Radio>
                </HStack>
              </RadioGroup>
            </HStack>
            <Divider pb="10px" />
            <HStack pt="10px">
              <Text>難易度：</Text>
              <RadioGroup>
                <HStack direction="row">
                  <Radio value="easy">Easy</Radio>
                  <Radio value="normal">Normal</Radio>
                  <Radio value="hard">Hard</Radio>
                </HStack>
              </RadioGroup>
            </HStack>
            <Divider pb="10px" />
            <HStack pt="10px">
              <Flex>
                <Button>Python</Button>
                <Button>React</Button>
                <Button>Golang</Button>
                <Button>Svelte</Button>
                <Button>AWS</Button>
              </Flex>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsSearchOpen(false)}>閉じる</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchModal;
