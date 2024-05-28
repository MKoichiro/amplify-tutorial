import { Flex, Icon, Text } from '@chakra-ui/react';
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from 'react-icons/ri';
import { BsFillTrashFill } from 'react-icons/bs';
import { deleteTodo, updateTodo } from '../../stores/Slices/todo/todoSlice';
import { useAppDispatch } from '../../stores/hooks';


type Props = {
  id: string;
  content: string;
  isDone: boolean;
}


const TodoItem = ({id, content, isDone}: Props) => {

  const dispatch = useAppDispatch();
  const handleDeleteClick = () => {
    dispatch(deleteTodo({ id }));
  };
  const handleCheckClick = () => {
    dispatch(updateTodo({ id }));
  };

  return (
    <Flex w="100%" align="center" justify="space-between">
      <Flex align="center">
        <Icon
          onClick={handleCheckClick}
          as={ isDone ? RiCheckboxCircleFill : RiCheckboxBlankCircleLine }
          color="teal"
          cursor="pointer"
          // height = 4px * 6 = 24px
          h={6}
          // margin-right = 4px * 2 = 8px
          mr={2}
          // width = 4px * 6 = 24px
          w={6}
        />
        <Text fontSize="xl">
          {content}
        </Text>
      </Flex>
      <Icon
        onClick={handleDeleteClick}
        as={BsFillTrashFill}
        color="pink"
        cursor="pointer"
        h={5}
        w={5}
      />
    </Flex>
  )
}

export default TodoItem