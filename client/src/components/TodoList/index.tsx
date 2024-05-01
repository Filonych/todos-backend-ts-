import React from 'react'
import { useFetch } from '../../hooks/useFetch'
import { ITodo } from '../../types/types'
import { Button } from '../ui/Button'

interface TodoListProps {
	todoList: ITodo[]
	updateTodoList: () => void
	setSelectedItem: (item: ITodo | null) => void
}

export const TodoList: React.FC<TodoListProps> = ({
	todoList,
	updateTodoList,
	setSelectedItem,
}) => {
	const fetchData = useFetch()

	const deleteTodo = async (title: string) => {
		setSelectedItem(null)

		try {
			const url = 'http://localhost:3002/api/todos/delete'
			const method = 'DELETE'
			const body = { title }
			await fetchData(url, method, body)

			updateTodoList()
		} catch (error: any) {
			console.log(error.message)
		}
	}

	const onClick = (todo: ITodo) => {
		setSelectedItem(todo)
	}

	return (
		<>
			{!todoList.length && <>Loading...</>}
			{todoList.map((todo: ITodo) => (
				<div key={todo._id}>
					{todo.title} &nbsp;
					<Button onClick={() => deleteTodo(todo.title)}>Удалить</Button>
					<Button onClick={() => onClick(todo)}>Редактировать</Button>
				</div>
			))}
		</>
	)
}
