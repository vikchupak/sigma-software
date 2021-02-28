import React from "react";
import TodoCard from "./TodoCard";

const TodosList = ({ todos, onDelete }) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoCard key={todo._id} todo={todo} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TodosList;
