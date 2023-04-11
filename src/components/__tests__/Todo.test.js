import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Todo from "../Todo/Todo";
import { BrowserRouter } from "react-router-dom";

afterEach(() => {
  cleanup();
});

describe("Todo component", () => {
  test("should render todo title", () => {
    render(
      <BrowserRouter>
        <Todo />
      </BrowserRouter>
    );
    const todoTitle = screen.getByTestId("todo-title");
    expect(todoTitle).toBeInTheDocument();
    expect(todoTitle.textContent).toBe("TODO LIST");
  });

  test("should add a new task to the list", () => {
    render(
      <BrowserRouter>
        <Todo />
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText("Please add your task");
    const addButton = screen.getByText("Add");
    fireEvent.change(input, { target: { value: "New task" } });
    fireEvent.click(addButton);
    const task = screen.getByText("New task");
    expect(task).toBeInTheDocument();
  });

  test("should delete a task from the list", () => {
    render(
      <BrowserRouter>
        <Todo />
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText("Please add your task");
    const addButton = screen.getByText("Add");
    fireEvent.change(input, { target: { value: "Task to be deleted" } });
    fireEvent.click(addButton);
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);
    const task = screen.queryByText("Task to be deleted");
    expect(task).not.toBeInTheDocument();
  });

  test("should mark a task as completed", () => {
    render(
      <BrowserRouter>
        <Todo />
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText("Please add your task");
    const addButton = screen.getByText("Add");
    fireEvent.change(input, { target: { value: "Task to be completed" } });
    fireEvent.click(addButton);
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    const task = screen.getByText("Task to be completed");
    expect(task).toHaveStyle("text-decoration: line-through");
  });
});
