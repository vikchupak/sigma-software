import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import useHttp from "../hooks/useHttp";
import useMessage from "../hooks/useMessage";
import AuthContext from "../context/authContext";
import { Link } from "react-router-dom";

const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [request] = useHttp();
  const message = useMessage();
  const [todoData, setTodoData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (ev) => {
    setTodoData({
      ...todoData,
      [ev.target.id]: ev.target.value,
    });
  };

  const onCreate = async () => {
    try {
      await request(
        "/todo/create",
        "POST",
        { ...todoData },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      history.push("/todos");
    } catch (e) {
      message(e.message);
    }
  };

  return (
    <div className="row" style={{ marginTop: "100px" }}>
      <div className="col s6 offset-s3">
        <div className="card cyan darken-3">
          <div className="card-content white-text">
            <span className="card-title" style={{ marginBottom: "30px" }}>
              Create a todo
            </span>
            <div className="input-field">
              <input
                placeholder="Enter title"
                autoComplete="off"
                id="title"
                type="text"
                onChange={handleChange}
              />
              <label htmlFor="title" className="active">
                Title
              </label>
            </div>
            <div className="input-field" style={{ marginBottom: "0px" }}>
              <input
                placeholder="Enter content"
                autoComplete="off"
                id="content"
                type="text"
                onChange={handleChange}
              />
              <label htmlFor="content" className="active">
                Content
              </label>
            </div>
          </div>
          <div className="card-action">
            <button
              className="waves-effect waves-light btn"
              style={{ marginRight: "14px" }}
              onClick={onCreate}
            >
              Create
            </button>
            <Link to="/todos" className="waves-effect waves-light btn">
              Close
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
