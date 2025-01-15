import React, { useState } from "react";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);
	const [hoverItem, setHoverItem] = useState(null)

	const handleChange = (event) => {
		setInputValue(event.target.value);
	}
	return (

		<div className="container">
			<div id="title" className="rounded">
				<h1>TODO LIST </h1>
			</div>
			<ul>
				<div>
					<input
						className="todo-list"
						type="text"
						value={inputValue}
						placeholder={todos.length === 0 ? "No things to do, add task" : "What needs to be done?"}
						onChange={handleChange}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								setTodos(todos.concat(inputValue));
								setInputValue("");
							}
						}
						}>
					</input>

					{todos.map((item, index) => (
						<div
							key={index}
							onMouseEnter={() => setHoverItem(index)}
							onMouseLeave={() => setHoverItem(null)}
						>

							<li> {item}{""}{" "}
								{hoverItem === index && <i className="fa-solid fa-trash p-20"
									onClick={() =>
										setTodos(todos.filter(
											(todos, currentIndex) =>
												index != currentIndex
										))
									}
								></i>}
							</li>

						</div>
					))}
					<div className="task"> {todos.length} tasks left</div>
				</div>

			</ul>

		</div>


	);
};

export default Home;
