// ----------------------------------- 55
"use strict";

//var 1
// const numbers = [1, 2, 3, 4, 5, 6];

// const newNumbers = numbers.map(function (number, element, index, array) {
//   return number * 2;
// });

// console.log(newNumbers);

//var 2

// const users = [
//   { name: "Alex", age: 24, isAdmin: false },
//   { name: "Bob", age: 13, isAdmin: false },
//   { name: "John", age: 31, isAdmin: true },
//   { name: "Jane", age: 20, isAdmin: false },
// ];

//var1 map
// const newUsers = users.map((user) => {
//   return user.name;
// });

//var 2 map
// const newUsers = users.map((user) => {
//   user.isAdmin = true;
//   return user;
// });

//console.log(newUsers);

// filter

// const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

// // const evenNumbers = numbers.filter((number) => {
// //   //   return true;
// //   //   if (number % 2 === 0) {
// //   //     return true;
// //   //   } else {
// //   //     return false;
// //   //   } длинная запись варианта

// //   return number % 2 === 0; // сокращенние
// // });

// const evenNumbers = numbers.filter((number) => number % 2 === 0);

// console.log(evenNumbers);

// const users = [
//   { name: "Alex", age: 24, isAdmin: true },
//   { name: "Bob", age: 13, isAdmin: false },
//   { name: "John", age: 31, isAdmin: true },
//   { name: "Jane", age: 20, isAdmin: false },
// ];

// // const admins = users.filter((user) => {
// //   //   if (user.isAdmin === true) {
// //   //     return true;
// //   //   } else {
// //   //     return false;
// //   //   } простой вариант

// // //   return user.isAdmin === true; сокращенный вариант
// // });

// const admins = users.filter((user) => user.isAdmin === true);

// console.log(admins);

// ----------------------------------- 56

//дефолт пример find

// const numbers = [1, 2, 3, 4, 5, 6];

// const number = numbers.find((number) => {
//   return number > 3;
// });

// if (number === undefined) {
//   console.log("Нет числа");
// } else {
//   console.log(number.toString());
// }

// пример с поиском маркета

// const products = [
//   { title: "Ноутбук", price: 80000, quantity: 5 },
//   { title: "Ипон", price: 50000, quantity: 10 },
//   { title: "Планшет", price: 30000, quantity: 7 },
//   { title: "Наушники", price: 30000, quantity: 7 },
// ];

// const laptop = products.find((product) => {
//   return product.title === "Ноутбук";
// });

// console.log(laptop);

// вариант 1

// const numbers = [2, 3, 545, 5, 231, 457];

// const numberIndex = numbers.findIndex((number) => {
//   return number === 5;
// });

// console.log(numberIndex);

// //вариант 2
// const numbers = [2, 3, 545, 5, 5, 457];

// const numberIndex = numbers.indexOf(5, 4);

// console.log(numberIndex);

// includes
// const numbers = [2, 3, 545, 5, 5, 457];

// console.log(numbers.includes(545));

// ----------------------------------- 57 some / Every

// const products = [
//   { title: "Ноутбук", price: 80000, quantity: 5 },
//   { title: "Ипон", price: 50000, quantity: 10 },
//   { title: "Планшет", price: 30000, quantity: 7 },
//   { title: "Наушники", price: 30000, quantity: 7 },
// ];

// some
// const laptop = products.some((product) => {
//   return product.title === "Ноутбук";
// }); // some - выводит буллевое значение

// console.log(laptop);

// Every
// console.log(products.every((product) => product.quantity > 4));

// ----------------------------------- 58 reduce / sort

//вариант 1

// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// // let sum = 0; // аккум(временная переменная)

// const sum = numbers.reduce(function (acc, number) {
//   return acc + number;
// }, 0); // ',10' = let sum = 10;

// console.log(sum);

// let sum = 0;
// numbers.forEach(function(number){
//     sum += number;
// })

//вариант 2

// const products = [
//   { title: "Ноутбук", price: 80000, quantity: 5 },
//   { title: "Ипон", price: 50000, quantity: 10 },
//   { title: "Планшет", price: 30000, quantity: 7 },
//   { title: "Наушники", price: 30000, quantity: 7 },
// ];

// const sum = products.reduce(function (acc, product) {
//   return acc + product.quantity;
// }, 0);

// console.log(sum);

// sort

//вариант 1

// const name = ["John", "Bob", "Alex", "Ann"];

// console.log(name.sort());

// вариант 2

// const number = [
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
// ];

// console.log(
//   number.sort((a, b) => {
//     return b - a;
//   }),
// );

// вариант 3

// const products = [
//   { title: "Ноутбук", price: 30000, quantity: 5 },
//   { title: "Ипон", price: 80000, quantity: 10 },
//   { title: "Планшет", price: 15000, quantity: 7 },
//   { title: "Наушники", price: 350000, quantity: 7 },
// ];

// const sortProduct = products.toSorted((a, b) => b.price - a.price);

// console.log(sortProduct);

// ----------------------------------- 59 Slice and Spice

// slice

// const numbers = [10, 24, 36, 50, 12, 5];

// const newNumbers = numbers.slice(1, 4);
// console.log(newNumbers);

// splice

// const numbers = [10, 24, 36, 50, 12, 5];

// numbers.splice(0, 2, 100, 200);
// console.log(numbers);

// join

// const numbers = [10, 24, 36, 50, 12, 5];

// console.log(numbers.join("x"));

//пример

// const persons = ["Alex", "John", "Emma", "Bill"];
// // const personsStr = persons.join(",");

// // console.log(personsStr.split(" "));

// console.log(persons.join().toLowerCase().split(","));

// function abbrevName(name) {
//   name = "Sam Harris";
//   const names = name.split(" ").splice(".");
//   const initials = names.map((name) => name[0].toUpperCase());

//   return initials.join(".");
// }

// console.log(abbrevName());

//------------------------------------------- 63 Todo

// // 1. Объявите и инициализируйте массив todos
// let todos = []; // или const todos = [];

// // Теперь вы можете безопасно использовать todos
// todos.push("Купить продукты");
// todos.push("Выучить JavaScript");

// console.log(todos); // Выведет: ["Купить продукты", "Выучить JavaScript"]

// // Если вы хотите отобразить их в консоли по одному
// todos.forEach((todo) => {
//   console.log("Задача: " + todo);
// });
