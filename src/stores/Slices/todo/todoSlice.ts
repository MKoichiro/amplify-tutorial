// import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface TodoState {
  todoList: {
    id: string;
    content: string;
    isDone: boolean;
  }[];
}

const initialState: TodoState = {
  todoList: [],
}

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    createTodo: (state, action) => {
      const newTodo = {
        id: uuidv4(),
        content: action.payload,
        isDone: false,
      };
      state.todoList.push(newTodo);
    },

    updateTodo: (state, action) => {
      const todo = state.todoList.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.isDone = !todo.isDone;
      }
    },

    deleteTodo: (state, action) => {
      state.todoList = state.todoList.filter(todo => todo.id !== action.payload.id);
    },
  },
  selectors: {
    selectTodoList: (state: TodoState) => state.todoList,
  }
});


export const { createTodo, updateTodo, deleteTodo } = todoSlice.actions;
export const { selectTodoList } = todoSlice.selectors;

// export default todoSlice.reducer;