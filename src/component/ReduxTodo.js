import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../style/todoSheet.css";
import { uniqueIdGen } from "../utils/helper";

function ReduxTodo() {
  const [curTodo, setCurTodo] = useState({
    title: "",
    isChecked: false,
  });
  const dispatch = useDispatch();
  const { todoData } = useSelector(mapStateToProps);

  const formReset = () => {
    setCurTodo({
      title: "",
      isChecked: false,
    });
  };
  const handleChange = (e) => {
    const todoVal = e.target.value;
    setCurTodo((prev) => {
      return { ...prev, title: todoVal, isChecked: false };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const curDataWithId = { ...curTodo };
    curDataWithId.id = uniqueIdGen();
    dispatch({ type: "Add", payload: curDataWithId });
    formReset();
  };
  const handleCheck = (id, check) => {
    dispatch({ type: "check", payload: { id, check } });
  };
  const handleDelete = (id) => {
    dispatch({ type: "delete", payload: id });
  };
  return (
    <main className="todoContainer">
      <div className="todoList">
        <div className="cover-img">
          <div className="cover-inner">
            <h3 id="dayName">TO DO LIST</h3>
          </div>
        </div>

        <div className="content">
          <form className="add" onSubmit={handleSubmit}>
            <input
              type="text"
              name="add"
              placeholder="Add item..."
              value={curTodo.title}
              onChange={handleChange}
            />
            <div className="input-buttons">
              <a href="javascript:void(0)" className="add-todo">
                <i className="fas fa-plus add plus-icon"></i>
              </a>
            </div>
          </form>
          <ul className="todos align">
            {todoData && todoData.length > 0 ? (
              todoData.map((todo, todoIndex) => {
                return (
                  <li key={todoIndex} className={`todoList_li`}>
                    <span
                      className={`checkbox ${todo.isChecked && "check"}`}
                      onClick={() => handleCheck(todo.id, todo.isChecked)}
                    ></span>
                    <label>{todo.title}</label>
                    <span className="deleteIcon">
                      <i className="fa-solid fa-pen"></i>
                    </span>

                    {todo.isChecked && (
                      <span
                        className="deleteIcon"
                        onClick={() => handleDelete(todo.id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    )}
                  </li>
                );
              })
            ) : (
              <div>No data</div>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}

const mapStateToProps = (state) => {
  return {
    todoData: state.todo.todoData,
  };
};

export default ReduxTodo;
