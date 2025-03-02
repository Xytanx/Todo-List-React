import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

export default function TodoList() {
  const [todos, setTodos] = useState([{ task: "sample", id: uuidv4(), isDone: false }]);
  const [newTodo, setNewTodo] = useState("");
  const [deletingTodoId, setDeletingTodoId] = useState(null);
  const [showTrash, setShowTrash] = useState(false);

  const addNewTask = () => {
    if (newTodo.trim() === "") return;
    setTodos((prevTodos) => [
      ...prevTodos,
      { task: newTodo, id: uuidv4(), isDone: false }
    ]);
    setNewTodo("");
  };

  const updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  const deleteTodo = (id) => {
    setDeletingTodoId(id);
    setShowTrash(true);
    // Wait for the animation to finish (1s), then remove todo and hide trash bin
    setTimeout(() => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      setDeletingTodoId(null);
      setShowTrash(false);
    }, 1000);
  };

  const doneAll = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({ ...todo, isDone: true }))
    );
  };

  const doneOne = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, isDone: true } : todo))
    );
  };

  return (
    <div className="todo-container">
      <h1 className="title">📝 Stylish To-Do List</h1>
      <div className="input-group">
        <input
          className="todo-input"
          placeholder="Add a new task..."
          value={newTodo}
          onChange={updateTodoValue}
        />
        <button className="add-btn" onClick={addNewTask}>
          ➕ Add
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            id={todo.id}
            className={`todo-item ${todo.isDone ? "done" : ""} ${
              deletingTodoId === todo.id ? "move-to-trash" : ""
            }`}
          >
            <span>{todo.task}</span>
            <div className="buttons">
              <button className="done-btn" onClick={() => doneOne(todo.id)}>
                ✅ Done
              </button>
              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                ❌ Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button className="done-all-btn" onClick={doneAll}>
        ✅ Mark All As Done
      </button>
      {showTrash && <div className="trash-bin">🗑️</div>}
    </div>
  );
}
