import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Todo.css";
import axios, { Axios } from "axios";
const Todo = () => {
  const [input, setInput] = useState();
  const [items, setItems] = useState(() => {
    return JSON.parse(localStorage.getItem("todo-list")) || [];
  });
  const navigate = useNavigate();
  // const [checked, setChecked] = useState(false);

  const [datalist, setdatalist] = React.useState(null);

  const addHandler = (e) => {
    console.log("....", input);
    e.preventDefault();
    if (input) {
      setItems([...items, { name: input, ischecked: false }]);
      setInput("");
    }
    //   axios
    //     .post("http://localhost:3002/todoItems", {
    //       name: input,
    //       ischecked: false,
    //     })
    //     .then((response) => {
    //       setItems([...items, { name: input, ischecked: false }]);
    //       setInput("");
    //     });
    // }
  };

  const deleteHandler = (ele) => {
    setItems(items.filter((x) => x !== ele));
  };
  const cbHandler = (position) => {
    items[position].ischecked = !items[position].ischecked;
    setItems([...items]);
  };

  useEffect(() => {
    // console.log(Object.keys(localStorage.getItem("okta-token-storage")).length);
    if (Object.keys(localStorage.getItem("okta-token-storage")).length <= 2) {
      navigate("/");
    }
    localStorage.setItem("todo-list", JSON.stringify(items)); // local storage get
    // axios.get("http://localhost:3002/todoItems").then((response) => {
    //   // console.log(response.data);
    //   setItems(response.data);
    //   });
  }, [items]);

  return (
    <div className="todo-form">
      <form onSubmit={addHandler} style={{ marginBottom: "15px" }}>
        <div className="title" data-testid="todo-1">
          <label> TODO LIST </label>{" "}
        </div>
        <div>
          <input
            style={{ width: "84%", float: "left", padding: "10px 5px" }}
            type="text"
            id="inputTodo"
            name="inputTodo"
            placeholder="Please add your task"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button
            type="submit"
            style={{ width: "15%", float: "right", padding: "10px 5px" }}
          >
            Add
          </button>
        </div>
        <div style={{ clear: "both" }}></div>
      </form>

      <div>
        {items.map((ele, i) => {
          return (
            <div
              key={i}
              style={{
                border: "1px solid #454545",
                margin: "2px",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              <input
                type="checkbox"
                onChange={() => cbHandler(i)}
                checked={ele.ischecked}
              />

              {ele.ischecked ? (
                <label style={{ textDecoration: "line-through" }}>
                  {" "}
                  {ele.name}
                </label>
              ) : (
                <label> {ele.name}</label>
              )}
              <button
                onClick={() => deleteHandler(ele)}
                style={{ float: "right", padding: "7px", margin: "-6px" }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Todo;
