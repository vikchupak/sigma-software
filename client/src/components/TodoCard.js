import React from "react";

const TodoCard = ({ todo, onDelete }) => {
  return (
    <div className="card blue-grey darken-1">
      <div className="card-content white-text">
        <h3>{todo.title}</h3>
        <p style={{ fontSize: "24px" }}>{todo.content}</p>
      </div>
      <div className="card-action">
        <button
          className="waves-effect waves-light btn"
          onClick={() => onDelete(todo._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
