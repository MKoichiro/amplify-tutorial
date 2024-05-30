/* eslint-disable no-useless-catch */
// todoの作成

import { DataStore } from "aws-amplify/datastore";
import { Todo } from "../../../models";

export const createTodoApi = async (data: { content: string }) => {
  const { content } = data;
  try {
    // 作成処理の実行
    await DataStore.save(
      new Todo({
        content,
        isDone: false,
      })
    );
  } catch (error) {
    throw error;
  }
};

// todo一覧の取得
export const fetchTodoListApi = async () => {
  try {
    // 取得処理の実行
    const todoList = await DataStore.query(Todo);
    return todoList;
  } catch (error) {
    throw error;
  }
};

// todoの更新
export const updateTodoApi = async (data: {id: string; isDone: boolean}) => {
  const { id, isDone } = data;
  try {
    // 変更するtodoの取得
    const original = await DataStore.query(Todo, id);

    // originalが存在しない場合はエラーをthrow
    if (!original) {
      alert('Todo not found');
      return;
    }
    // 更新処理の実行
    await DataStore.save(
      Todo.copyOf(original, updated => {
        updated.isDone = isDone;
      })
    );
  } catch (error) {
    throw error;
  }
};

// todoの削除
export const deleteTodoApi = async (id: string) => {
  try {
    // 削除するtodoの取得
    const original = await DataStore.query(Todo, id);

    // originalが存在しない場合はエラーをthrow
    if (!original) {
      alert('Todo not found');
      return;
    }
    // 削除処理の実行
    await DataStore.delete(original);
  } catch (error) {
    throw error;
  }
};