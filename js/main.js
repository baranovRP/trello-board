/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import Task from './task';
import Catalog from './catalog';
import Board from './board';

const MOVE = {
  UP: -1,
  RIGHT: -1,
  DOWN: 1,
  LEFT: 1,
};

/**
 * Remove task from the catalog
 * @param {Object<Task>}t
 * @param {Array<Task>} tasks
 * @returns {*[]}
 */
function removeTask(t, tasks) {
  let counter = 0;
  const l = tasks.map((i) => {
    if (i.order !== t.order) {
      return new Task({
        name: i.name,
        description: i.description,
        status: i.status,
        order: (counter++),
        node: document.createElement('div'),
      });
    }
  }).filter(r => r);
  return [...l];
}

function addTask(t, title, tasks) {
  tasks.push(new Task({
    name: t.name,
    description: t.description,
    status: title,
    order: (tasks.length),
    node: document.createElement('div'),
  }));
  return [...tasks];
}

function moveTaskVert(t, tasks, direction) {
  function findTask(item) {
    return item.order === t.order;
  }

  const task = tasks.find(findTask);
  const idx = tasks.indexOf(task);
  const temp = Object.create(
    Object.getPrototypeOf(tasks[idx + direction]),
    Object.getOwnPropertyDescriptors(tasks[idx + direction]));
  tasks[idx + direction] = Object.create(
    Object.getPrototypeOf(tasks[idx]),
    Object.getOwnPropertyDescriptors(tasks[idx]));
  tasks[idx + direction].order = temp.order;
  temp.order = tasks[idx].order;
  tasks[idx] = Object.create(
    Object.getPrototypeOf(temp),
    Object.getOwnPropertyDescriptors(temp));
  return [...tasks];
}

function moveTaskHoriz(t, catalogs, direction) {
  function findList(list) {
    return list.title === t.status;
  }

  const tasksList = catalogs.find(findList);
  const idxCatalog = catalogs.indexOf(tasksList);

  function findTask(item) {
    return item.order === t.order;
  }

  const task = tasksList.tasks.find(findTask);
  tasksList.onTaskRemoved(task);
  catalogs[idxCatalog - direction].onTaskAdd(task);
  return [...catalogs];
}

const task1 = new Task({
  name: 'task1',
  description: 'description for task1',
  status: 'todo',
  order: 0,
  node: document.createElement('div'),
});
const task2 = new Task({
  name: 'task2',
  description: 'description for task2',
  status: 'todo',
  order: 1,
  node: document.createElement('div'),
});
const task3 = new Task({
  name: 'task3',
  description: 'description for task3',
  status: 'todo',
  order: 2,
  node: document.createElement('div'),
});
const task4 = new Task({
  name: 'task4',
  description: 'description for task4',
  status: 'inprogress',
  order: 0,
  node: document.createElement('div'),
});
const task5 = new Task({
  name: 'task5',
  description: 'description for task5',
  status: 'inprogress',
  order: 1,
  node: document.createElement('div'),
});
const task6 = new Task({
  name: 'task6',
  description: 'description for task6',
  status: 'done',
  order: 0,
  node: document.createElement('div'),
});

const todoTasks = [task1, task2, task3];
const inProgressTasks = [task4, task5];
const doneTasks = [task6];

const todo = new Catalog({
  tasks: todoTasks,
  title: 'todo',
  node: document.createElement('ul'),
  onTaskAdd(t) {
    this.tasks = addTask(t, this.title, [...this.tasks]);
  },
  onTaskRemoved(t) {
    this.tasks = removeTask(t, [...this.tasks]);
  },
  onTaskMoveUp(t) {
    this.tasks = moveTaskVert(t, [...this.tasks], MOVE.UP);
  },
  onTaskMoveDown(t) {
    this.tasks = moveTaskVert(t, [...this.tasks], MOVE.DOWN);
  },
});
const inProgress = new Catalog({
  tasks: inProgressTasks,
  title: 'inprogress',
  node: document.createElement('ul'),
  onTaskAdd(t) {
    this.tasks = addTask(t, this.title, [...this.tasks]);
  },
  onTaskRemoved(t) {
    this.tasks = removeTask(t, [...this.tasks]);
  },
  onTaskMoveUp(t) {
    this.tasks = moveTaskVert(t, [...this.tasks], MOVE.UP);
  },
  onTaskMoveDown(t) {
    this.tasks = moveTaskVert(t, [...this.tasks], MOVE.DOWN);
  },
});
const done = new Catalog({
  tasks: doneTasks,
  title: 'done',
  node: document.createElement('ul'),
  onTaskAdd(t) {
    this.tasks = addTask(t, this.title, [...this.tasks]);
  },
  onTaskRemoved(t) {
    this.tasks = removeTask(t, [...this.tasks]);
  },
  onTaskMoveUp(t) {
    this.tasks = moveTaskVert(t, [...this.tasks], MOVE.UP);
  },
  onTaskMoveDown(t) {
    this.tasks = moveTaskVert(t, [...this.tasks], MOVE.DOWN);
  },
});

const catalogs = [todo, inProgress, done];
new Board({
  catalogs,
  node: document.querySelector('board'),
  onTaskCreated({ name, description }) {
    function findTodoList(list) {
      return list.title === 'todo';
    }

    const todoList = this.catalogs.find(findTodoList);
    this.catalogs.shift();
    todoList.onTaskAdd(new Task({
      name,
      description,
      title: todoList.title,
      order: todoList.length,
      node: document.createElement('div'),
    }));
    this.catalogs.unshift(todoList);
    this.catalogs = [...this.catalogs];
  },
  onTaskMoveRight(t) {
    this.catalogs = moveTaskHoriz(t, [...this.catalogs], MOVE.RIGHT);
  },
  onTaskMoveLeft(t) {
    this.catalogs = moveTaskHoriz(t, [...this.catalogs], MOVE.LEFT);
  },
});
