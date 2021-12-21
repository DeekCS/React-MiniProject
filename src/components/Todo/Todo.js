import React, { useState, useEffect } from "react";
import "./todo.css";

const Todo = ({isSuccess,setIsSuccess}) => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSuccess) {
      let todoStorage = JSON.parse(localStorage.getItem("todos"));
      if (todoStorage) {
        todoStorage.push(todo);
        localStorage.setItem("todos", JSON.stringify(todoStorage));
      } else {
        localStorage.setItem("todos", JSON.stringify([todo]));
      }
      setTodos(todoStorage);
      setTodo("");
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          title: todo,
          completed: false,
        },
      ]);
      setTodo("");
    }
    else {
      alert("Please login first to add todos!");
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleComplete = (id) => {
    if(isSuccess) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
    }
    else {
      alert("Please login first to complete todos!");
    }

    let todoStorage = JSON.parse(localStorage.getItem("todos"));
    //save all todos except the one that is completed
    todoStorage = todos.filter((todo) => todo.id !== id);
    //save the completed todo
    todoStorage.push(todos.find((todo) => todo.id === id));
    //save to local storage
    localStorage.setItem("todos", JSON.stringify(todoStorage));
  };

  useEffect(() => {
    setIsLoading(true);
    let todoStorage = JSON.parse(localStorage.getItem("todos"));
    if (todoStorage) {
      setTodos(todoStorage);
    }
    setIsLoading(false);
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          name="todo"
          onChange={handleChange}
          required
        />
        <button type="submit">Add</button>
      </form>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
              <button onClick={() => handleComplete(todo.id)}>
                {todo.completed ? "Undo" : "Complete"}
              </button>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ):<>
        <h2>No todos yet!</h2>
        <h3>Add a todo to get started!</h3>
      </>}
    </div>
  );
};

export default Todo;
