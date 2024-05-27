import TodoItem from './TodoItem';
import { Center, Flex, Heading, StackDivider, Text, VStack } from '@chakra-ui/react';

const TodoList = () => {
  const todoList = [
    {
      id: "aaa",
      content: "aaa content",
      isDone: true,
    },
    {
      id: "bbb",
      content: "bbb content",
      isDone: false,
    },
    {
      id: "ccc",
      content: "ccc content",
      isDone: true,
    },
    {
      id: "ddd",
      content: "ddd content",
      isDone: false,
    },
    {
      id: "eee",
      content: "eee content",
      isDone: true,
    },
    {
      id: "fff",
      content: "fff content",
      isDone: false,
    },
    {
      id: "ggg",
      content: "ggg content",
      isDone: true,
    },
    {
      id: "hhh",
      content: "hhh content",
      isDone: false,
    },
    {
      id: "iii",
      content: "iii content",
      isDone: true,
    },
    {
      id: "jjj",
      content: "jjj content",
      isDone: false,
    },
  ];
  return (
    <Flex flexDir='column' align="center">
      <Center mb={8}>
        <Heading>
          TodoList
        </Heading>
      </Center>
      <VStack
        divider={<StackDivider borderColor="gray.200"/>}
        align="stretch"
        w={{
          base: "100%",
          sm: "80vw",
          md: "70vw",
          lg: "60vw"
        }}
        border="2px"
        borderColor="gray.300"
        borderRadius="md"
        p={4}
        maxH="65vh"
        overflow="auto"
      >
        {todoList.length === 0
          ? (
            <Text align="center" fontWeight="bold" fontSize="lg">No Todo</Text>
          ) : (
            todoList.map(item => (
              <TodoItem
                id={item.id}
                content={item.content}
                isDone={item.isDone}
              />
            ))
          )}
      </VStack>
    </Flex>
  )
}

export default TodoList;