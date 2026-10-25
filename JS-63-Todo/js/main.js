"use strict";
const todos = [];

const errTodoNotFound = (todoId) => `Todo with id ${todoId} not found`;

// const getNewId = (todos) => {
//   return (
//     todos.reduce((maxId, todo) => {
//       //   if (todo.id > maxId) {
//       //     return todo.id;
//       //   } else {
//       //     return maxId;
//       //   }
//       return Math.max(maxId, todo.id);
//     }, -1) + 1
//   );
// };

// const getNewId = (todos) => {
//   return (
//     todos.reduce((maxId, todo) => {
//       return Math.max(maxId, todo.id);
//     }, -1) + 1
//   );
// };

const todoKeys = {
  id: "id",
  datе: "date",
  text: "text",
  is_completed: "is_completed",
};

// const changeToFormateTime = (data) => {
//   const data = new Date();
//   const optionsRu = {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: false,
//   };
//   return data.toLocaleString("ru-RU", optionsRu);
// };

const data = new Date();
const optionsRu = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
};

const changeToFormateTime = data.toLocaleString("ru-RU", optionsRu);

const getNewId = (todos) =>
  todos.reduce((maxId, todo) => Math.max(maxId, todo[todoKeys.id]), 0) + 1;

const createTodo = (todos, text, date) => {
  const newTodo = {
    [todoKeys.id]: getNewId(todos),
    [todoKeys.date]: changeToFormateTime,
    [todoKeys.text]: text,
    [todoKeys.is_completed]: false,
  };
  todos.push(newTodo);
  return newTodo;
  // [...todos,{}]
};

// const changeTodo = (todos, todoId) => {};

const completeTodoById = (todos, todoId) => {
  const todo = todos.find((todo) => todo[todoKeys.id] === todoId);
  if (todo === undefined) {
    console.error(errTodoNotFound(todoId));
    return null;
  }
  todo[todoKeys.is_completed] = !todo[todoKeys.is_completed];
  return todo;
};

const deleteTodoById = (todos, todoId) => {
  const todoIndex = todos.findIndex((todo) => todo[todoKeys.id] === todoId);

  if (todoIndex == -1) {
    console.error(errTodoNotFound(todoId));
    return todos;
  }
  todos.splice(todoIndex, 1);
  return todos;
};

// const deleteTodoById = (todos, todoId) => {
//   return todos.filter((todo) => todo[todoKeys.id] !== todoId);
// };
