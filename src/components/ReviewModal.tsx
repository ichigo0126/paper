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
} from "@chakra-ui/react";
import React from "react";
import { Radio, RadioGroup } from "@chakra-ui/react";

type ModalProp = {
  isReviewOpen: boolean;
  setIsReviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReviewModal = ({ isReviewOpen, setIsReviewOpen }: ModalProp) => {
  return (
    <>
      <Modal isOpen={isReviewOpen} onClose={() => setIsReviewOpen(false)}>
        <ModalContent maxWidth="800px">
          <ModalHeader textAlign="center">投稿</ModalHeader>
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
            <HStack pt="10px">
              <Text>検索：</Text>
              <Input placeholder="search" bg="gray.100" h="40px" w="500px" />
              <Button bg="blue.300" color="white">
                DB内を検索
              </Button>
            </HStack>
            <Stack>
              <Text>評価内容：</Text>
              <Textarea placeholder="250文字以内" />
            </Stack>
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
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsReviewOpen(false)}>閉じる</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReviewModal;
