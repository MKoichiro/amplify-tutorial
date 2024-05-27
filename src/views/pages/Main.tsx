import { VStack } from '@chakra-ui/react'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'

const Main = () => {
  return (
    <VStack spacing={4} align="stretch">
      <TodoList />
      <AddTodo />
    </VStack>
  )
}

export default Main