import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Error } from "../ui/Error";

export const AddTodoItem = ({ updateTodoList, setSelectedItem }) => {
  const [title, setTitle] = useState(null);
  const [error, setError] = useState(null);

  const disabled = !title || (title && !title.trim()) ;

  const fetchData = useFetch();

  const onSubmit = async (e) => {
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
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={title || ""}
        onChange={(e) => setTitle((prev) => e.target.value)}
        onClick={() => setSelectedItem({})}
      />
      {error && <Error>{error}</Error>}
      <br />
      <br />
      <button type="submit" disabled={disabled}>
        Добавить
      </button>
    </form>
  );
};
