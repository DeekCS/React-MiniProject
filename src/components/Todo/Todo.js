import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import "./todo.css";
import Swal from "sweetalert2";

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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please login first to Add todos!!',
      })
    }
  };

  const handleDelete = (id) => {
    if(isSuccess) {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
            let todoStorage = JSON.parse(localStorage.getItem("todos"));
            todoStorage = todoStorage.filter((todo) => todo.id !== id);
            localStorage.setItem("todos", JSON.stringify(todoStorage));
            setTodos(todoStorage);
          }
        })
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please login first to Delete todos!!',
      })
    }
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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please login first to Complete todos!!',
      })
    }

    let todoStorage;
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
    <div className="todo-container container">
      <h1 className="mt-5">Todo List</h1>
      <form className="todo-form " onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          name="todo"
          onChange={handleChange}
          required
          placeholder={isSuccess ? "Add Todo" : "Login to add todos"}
          className="form-control w-50"
        />
        <button className="btn btn-primary m-5" type="submit">Add</button>
      </form>
      {todos.length > 0 ? (
          <div className="row">
        <ul className="list-group">
          {todos.map((todo) => (

            <li className="list-group-item  w-100 todo-item col-md-4" key={todo.id}>
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
              {
                todo.completed?
                <button className="btn btn-warning m-2" onClick={() => handleComplete(todo.id)}>
                  <i className="fas fa-redo"/>
                </button>
                :
                <button className="btn btn-success m-2" onClick={() => handleComplete(todo.id)}>
                  <i className="fas fa-check"/>
                </button>

              }
              <button className="btn btn-danger m-2" onClick={() => handleDelete(todo.id)}>
                <i className="fas fa-trash"/>
              </button>
            </li>
          ))}
        </ul>
            </div>
      ):<>
        <h2>No todos yet!</h2>
        <h3>Add a todo to get started!</h3>
      </>}
    </div>
  );
};

export default Todo;
