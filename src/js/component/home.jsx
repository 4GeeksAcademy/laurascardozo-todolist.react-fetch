import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);


	const apiUrl = 'https://playground.4geeks.com/todo'
	const [user, setUser] = useState('laurascardozo')

	async function getTodos() {
		const response = await fetch(`${apiUrl}/users/${user}`)
		console.log(response)
		const data = await response.json()
		if (response.ok) {
			console.log(data)
			setTodos(data.todos)
			return true
		}
		console.log(data)
		setTodos(false)
		return false
	}
	async function createUser() {
		const response = await fetch(`${apiUrl}/users/${user}`, { method: 'POST' })
		console.log(response)
		const data = await response.json()
		if (response.ok) {
			console.log(data)
			return true
		}
		console.log(data)
		return false
	}
	async function createTodo(todo) {
		const response = await fetch(`${apiUrl}/todos/${user}`, {
			method: 'POST',
			body: JSON.stringify({
				"label": todo,
				"is_done": false
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		console.log(response)
		const data = await response.json()
		if (response.ok) {
			console.log(data)
			setInputValue('')
			getTodos()
			return true
		}
		console.log(data)
		return false
	}
	async function deleteTodo(id) {
		const response = await fetch(`${apiUrl}/todos/${id}`, { method: 'DELETE' })
		console.log(response)
		const data = response
		if (response.ok) {
			console.log(data)
			getTodos()
			return true
		}
		console.log(data)
		return false
	}

	useEffect(() => {
		createUser()
		getTodos()

	}, [])

	return (

		<div className="container">
			<div id="title" className="rounded">
				<h1>TODO LIST </h1>
			</div>
			<div className="todoList">
				<input
					className="todosInput"
					type="text"
					value={inputValue}
					placeholder={todos.length === 0 ? "No things to do, add task" : "What needs to be done?"}
					onChange={(e) => {
						setInputValue(e.target.value);
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							createTodo(inputValue);
						};
					}
					}
				>
				</input>

				<div>
					{
						todos.map((todos, index) => {
							if (index >= 0) {
								return (
									<div className="list" key={todos.id}>
										{todos.label}
										<i class="fa-solid fa-trash" onClick={() => deleteTodo(todos.id)} style={{ padding: "5px" }}
										></i>
									</div>
								)
							}
						})
					}
				</div>
				<div className="task"> {todos.length} tasks left</div>
			</div>

		</div>
	)
}



export default Home;
