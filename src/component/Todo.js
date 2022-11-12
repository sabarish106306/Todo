import React, { useState } from "react";
import "../style/todoSheet.css";
import { uniqueIdGen } from "../utils/helper";

function Todo() {
  const [todoData, setTodoData] = useState([]);
  const [curTodo, setCurTodo] = useState({
    title: "",
    isChecked: false,
  });
  const formReset = () => {
    setCurTodo({
      title: "",
      isChecked: false,
    });
  };
  const handleTodoChange = (e) => {
    const todo = e.target.value;
    setCurTodo((prev) => {
      return {
        ...prev,
        title: todo,
        isChecked: false,
      };
    });
  };
  const handleTodoSubmit = (e) => {
    e.preventDefault();
    const isEdit = curTodo && curTodo.id && !!curTodo.id;
    if (!isEdit) {
      const curTodoWithId = { ...curTodo };
      curTodoWithId["id"] = uniqueIdGen();
      setTodoData((prev) => {
        return [...prev, curTodoWithId];
      });
      formReset();
    } else {
      const updatedTodo = [...todoData];
      const todoIndex = updatedTodo.findIndex((todo) => todo.id === curTodo.id);
      updatedTodo[todoIndex] = curTodo;
      setTodoData(updatedTodo);
      formReset();
    }
  };

  const handleCheck = (selectedTodoData, todoIndex, check) => {
    selectedTodoData[todoIndex].isChecked = !check;
    setTodoData(selectedTodoData);
  };

  const handleDeleteTodo = (data, todoIndex) => {
    const selectedTodoData = [...data];
    selectedTodoData.splice(todoIndex, 1);
    console.log(selectedTodoData, "todaya");
    setTodoData(selectedTodoData);
  };

  const handleTodo = (type, id, check) => {
    const selectedTodoData = [...todoData];
    const todoIndex = selectedTodoData.findIndex((todo) => todo.id === id);
    switch (type) {
      case "check":
        return handleCheck(selectedTodoData, todoIndex, check);
      case "delete":
        return handleDeleteTodo(selectedTodoData, todoIndex);

      default:
        return null;
    }
  };

  const handleEditTodo = (todo) => {
    setCurTodo(todo);
  };
  console.log(curTodo, "curtodo");
  return (
    <main className="todoContainer">
      <div className="todoList">
        <div className="cover-img">
          <div className="cover-inner">
            <h3 id="dayName">TO DO LIST</h3>
          </div>
        </div>

        <div className="content">
          <form className="add" onSubmit={handleTodoSubmit}>
            <input
              type="text"
              name="add"
              placeholder="Add item..."
              onChange={handleTodoChange}
              value={curTodo.title}
            />
            <div className="input-buttons">
              <a
                href="javascript:void(0)"
                className="add-todo"
                onClick={handleTodoSubmit}
              >
                <i className="fas fa-plus add plus-icon"></i>
              </a>
            </div>
          </form>
          <ul className="todos align">
            {todoData && todoData.length > 0 ? (
              todoData.map((todo, todoIndex) => {
                return (
                  <li
                    key={todoIndex}
                    className={`todoList_li ${
                      curTodo &&
                      curTodo.id &&
                      curTodo.id === todo.id &&
                      "selected_li"
                    }`}
                  >
                    <span
                      className={`${todo.isChecked && "check"} checkbox`}
                      onClick={() =>
                        handleTodo("check", todo.id, todo.isChecked)
                      }
                    ></span>
                    <label
                      htmlFor={`todo_${todoIndex}`}
                      onClick={() =>
                        handleTodo("check", todo.id, todo.isChecked)
                      }
                    >
                      {todo.title}
                    </label>
                    <span
                      className="deleteIcon"
                      onClick={() => handleEditTodo(todo)}
                    >
                      <i class="fa-solid fa-pen"></i>
                    </span>
                    {todo.isChecked && (
                      <span
                        className="deleteIcon"
                        onClick={() => handleTodo("delete", todo.id)}
                      >
                        <i class="fa-solid fa-trash"></i>
                      </span>
                    )}
                  </li>
                );
              })
            ) : (
              <div>No Data</div>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Todo;
