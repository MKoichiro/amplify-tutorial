import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTodoListApi } from "./todoAPI";

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

export const fetchTodoListAsync = createAsyncThunk(
  "todo/fetchTodoList",
  async () => {
    // 取得処理の実行
    const response = await fetchTodoListApi();
    return response;
  }
);


export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    fetchTodoRealTime: (state, action) => {
      state.todoList.push(action.payload);
    },
    updateTodoRealTime: (state, action) => {
      const targetTodo = state.todoList.find(todo => todo.id === action.payload.id);
      if (targetTodo) {
        targetTodo.isDone = action.payload.isDone;
      }
    },
    deleteTodoRealTime: (state, action) => {
      state.todoList = state.todoList.filter(todo => todo.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodoListAsync.fulfilled, (state, action) => {
      state.todoList = action.payload;
    });
  },
  selectors: {
    selectTodoList: (state: TodoState) => state.todoList,
  }
});


export const { fetchTodoRealTime, updateTodoRealTime, deleteTodoRealTime } = todoSlice.actions;
export const { selectTodoList } = todoSlice.selectors;