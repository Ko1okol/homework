"use strict";

const todoKeys = {
  id: "id",
  text: "text",
  is_completed: "is_completed",
};

const todos = [];

const errTodoNotFound = (todoId) => `Todo with id ${todoId} not found`;

const getNewTodoId = (todos) =>
  todos.reduce((maxId, todo) => Math.max(maxId, todo[todoKeys.id]), 0) + 1;

const createTodo = (todos, text) => {
  const newTodo = {
    [todoKeys.id]: getNewTodoId(todos),
    [todoKeys.text]: text,
    [todoKeys.is_completed]: false,
  };
  todos.push(newTodo);
  return newTodo;
};

const completeTodoById = (todos, todoId) => {
  const todo = todos.find((todo) => todo[todoKeys.id] === todoId);

  if (!todo) {
    console.error(errTodoNotFound(todoId));
    return null;
  }
  todo[todoKeys.is_completed] = !todo[todoKeys.is_completed];
  return todo;
};

const deleteTodoById = (todos, todoId) => {
  const todoIndex = todos.findIndex((todo) => todo[todoKeys.id] === todoId);
  if (todoIndex === -1) {
    console.error(errTodoNotFound(todoId));
    return todos;
  }
  todos.splice(todoIndex, 1);
  return todos;
};

// При помощи метода querySelector получаем элементы .form, .input и .todos

const form = document.querySelector(".form");
const input = document.querySelector(".input");
const list = document.querySelector(".todos");

// Создаем функцию createTodoElement(text), которая будет создавать todo в виде разметки
function createTodoElement(text) {
  const todoElement = document.createElement("li");
  todoElement.className = "todo";

  todoElement.innerHTML = `
  <div class="todo-text">${input}</div>
  <div class="todo-actions">
  <button class="button-complete button" type="button">&#10004;</button>
  <button class="button-delete button" type="button">&#10006;</button>
  </div>
  `;

  todoElement.querySelector(".todo-text").textContent = text;
  list.append(todoElement);
}

// Создаем функцию handleCreateTodo(todos, text), которая будет вызывать createTodo и createTodoElement

function handelCreateTodo(todos, text) {
  const newTodo = createTodo(todos, text);
  const todoElement = createTodoElement(
    newTodo[todoKeys.text],
    newTodo[todoKeys.id],
  );
  list.append(todoElement);
}

createTodoElement(123);
