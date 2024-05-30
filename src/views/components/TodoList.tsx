import { useEffect } from 'react';
import { deleteTodoRealTime, fetchTodoListAsync, fetchTodoRealTime, selectTodoList, updateTodoRealTime } from '../../stores/Slices/todo/todoSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import TodoItem from './TodoItem';
import { Center, Flex, Heading, StackDivider, Text, VStack } from '@chakra-ui/react';
import { DataStore } from 'aws-amplify/datastore';
import { Todo } from '../../models';

const TodoList = () => {
  const todoList = useAppSelector(selectTodoList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // todoListの取得処理
    const fetchTodoList = async () => {
      await dispatch(fetchTodoListAsync());
    };
    fetchTodoList();
  }, [dispatch]);

  useEffect(() => {
    // todoテーブルの変更をリアルタイムに検知
    const subscribeTodoList = DataStore.observe(Todo).subscribe((msg) => {
      switch (msg.opType) {
        case 'INSERT':
          dispatch(fetchTodoRealTime(msg.element));
          break;
        case 'UPDATE':
          dispatch(updateTodoRealTime(msg.element));
          break;
        case 'DELETE':
          dispatch(deleteTodoRealTime(msg.element));
          break;
        default:
          break;
      }
    });

    // subscribeTodoList.subscribe();

    return () => {
      subscribeTodoList.unsubscribe();
    };
  }, [dispatch]);

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
                key={item.id}
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