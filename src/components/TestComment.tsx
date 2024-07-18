import React from 'react';
import { Box, VStack, HStack, Text } from '@chakra-ui/react';

const replies = [
  { id: 1, text: 'First reply' },
  { id: 2, text: 'Second reply' },
];

const Reply = ({ text, isFirst }) => (
  <HStack align="start" spacing={2}>
    {isFirst ? null : <Box borderTop="1px" borderColor="gray.400" width="16px" />}
    <Box borderLeft="1px" borderColor="gray.400" height="100%" />
    <Text>{text}</Text>
  </HStack>
);

const App = () => (
  <Box p={4}>
    <Text mb={4}>Post Content</Text>
    <HStack align="start" spacing={2}>
      <Box borderLeft="1px" borderColor="gray.400" height={`${replies.length * 40}px`} mt="4px" />
      <VStack align="start" spacing={4}>
        {replies.map((reply, index) => (
          <Reply key={reply.id} text={reply.text} isFirst={index === 0} />
        ))}
      </VStack>
    </HStack>
  </Box>
);

export default App;