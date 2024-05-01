import React, { FC } from 'react';
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Error } from "../ui/Error";
import { ITodo } from '../../types/types'

interface AddTodoItemProps {
  setSelectedItem: (item: ITodo | null) => void,
  updateTodoList: () => void,
}

export const AddTodoItem: FC<AddTodoItemProps> = ({ updateTodoList, setSelectedItem }) => {
  const [title, setTitle] = useState<string | null>(null);
  const [error, setError] = useState(null);

  const disabled = !title || (title && !title.trim());

  const fetchData = useFetch();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const url = "http://localhost:3002/api/todos/add";
      const method = "POST";
      const body = { title };
      const response = await fetchData(url, method, body);

      if (response.error) {
        setError(response.error);
        return;
      }
      setTitle(null);
      setError(null);
      updateTodoList();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={title || ""}
        onChange={(e) => setTitle((prev) => e.target.value)}
        onClick={() => setSelectedItem(null)}
      />
      {error && <Error>{error}</Error>}
      <br />
      <br />
      <button type="submit" disabled={!!disabled}>
        Добавить
      </button>
    </form>
  );
};
