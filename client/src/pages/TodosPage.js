import React, { useState, useContext, useCallback, useEffect } from "react";
import useHttp from "../hooks/useHttp";
import useMessage from "../hooks/useMessage";
import AuthContext from "../context/authContext";
import TodosList from "../components/TodosList";

const TodosPage = () => {
  const message = useMessage();
  const [todos, setTodos] = useState([]);
  const [request] = useHttp();
  const { token } = useContext(AuthContext);

  const fetchTodos = useCallback(async () => {
    try {
      const fetchedTodos = await request("/todo", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setTodos(fetchedTodos);
    } catch (e) {
      message(e.message);
    }
  }, [token, request, message]);

  const onDelete = async(id) => {
    try {
      await request(`/todo/${id}`, "DELETE", null, {
        Authorization: `Bearer ${token}`,
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (e) {
      message(e.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  if (todos.length === 0) {
    return <p style={{textAlign: "center", fontSize: "24px"}}>No todos yet</p>
  }

  return <TodosList todos={todos} onDelete={onDelete} />;
};

export default TodosPage;
