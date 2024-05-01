import React, { FC } from 'react';
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Error } from "../ui/Error";
import { ITodo } from '../../types/types'

interface EditTodoItemProps {
  selectedItem: ITodo,
  setSelectedItem: (item: ITodo | null) => void,
  setTodoList: (item: ITodo[] | []) => void,
}

export const EditTodoItem: FC<EditTodoItemProps> = ({
  selectedItem,
  setSelectedItem,
  setTodoList,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState<string | null>(null);
  const [prevTitle, setPrevTitle] = useState<string | null>(null);
  const fetchData = useFetch();

  const disabled = !Object.keys(selectedItem).length;

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedItem) return
    setPrevTitle(selectedItem.title);

    // код ниже решает проблему, но хотелось бы понять, 
    // как работать с обновлением состояния через предыдущее состояние prev
    // в связке с Typescript

    // const updatedTodo = {...selectedItem, [e.target.name]: e.target.value}
    // setSelectedItem(updatedTodo);

    setSelectedItem((prev: ITodo) => ({
      ...prev,
      [e.target.name]: e.target.value,
    })); 


    setValue(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value === prevTitle) {
      setError("Измените заголовок");
      return;
    }

    try {
      const url = "http://localhost:3002/api/todos/edit";
      const method = "PUT";
      const response = await fetchData(url, method, selectedItem);

      if (response.error) {
        setError(response.error);
      } else {
        setError(null);
        setTodoList(response.todos);
        setSelectedItem(null);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        disabled={disabled}
        type="text"
        name="title"
        value={selectedItem.title || ""}
        onChange={(e) => onHandleChange(e)}
      />
      {error && <Error>{error}</Error>}
      <br />
      <br />
      <button type="submit" disabled={disabled}>
        Редактировать
      </button>
    </form>
  );
};
