/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import Task from './task';
import Catalog from './catalog';
import Board from './board';

// const todo = new
// const task = new Task({
//   t,
//   onTaskMoveTop: function (id) {
//
//   },
//   onTaskMoveRight: function (id) {
//
//   },
//   onTaskMoveBottom: function (id) {
//
//   },
//   onTaskMoveLeft: function (id) {
//
//   },
//   onTaskRemoved: function (id) {
//
//   },
//   onTaskAdd: function () {
//
//   },
// });

const task1 = new Task({
  name: 'task1',
  description: 'description for task1',
  status: 'todo',
  order: 0,
});
const task2 = new Task({
  name: 'task2',
  description: 'description for task2',
  status: 'todo',
  order: 1,
});
const task3 = new Task({
  name: 'task3',
  description: 'description for task3',
  status: 'todo',
  order: 2,
});
const task4 = new Task({
  name: 'task4',
  description: 'description for task4',
  status: 'inprogress',
  order: 4,
});
const task5 = new Task({
  name: 'task5',
  description: 'description for task5',
  status: 'inprogress',
  order: 5,
});
const task6 = new Task({
  name: 'task6',
  description: 'description for task6',
  status: 'done',
  order: 6,
});
const todoTasks = [task1, task2, task3];
const inProgressTasks = [task4, task5];
const doneTasks = [task6];
const todo = new Catalog({ tasks: todoTasks, title: 'todo' });
const inProgress = new Catalog({ tasks: inProgressTasks, title: 'inprogress' });
const done = new Catalog({ tasks: doneTasks, title: 'done' });

const catalogs = [todo, inProgress, done];
new Board({ catalogs, node: document.querySelector('board') });
