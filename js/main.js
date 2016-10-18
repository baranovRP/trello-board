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
const todo = new Catalog({
  tasks: todoTasks,
  title: 'todo',
  node: document.createElement('ul'),
  onTaskAdd({ name, description }) {
    this.tasks.push(new Task({
      name,
      description,
      status: this.title,
      order: (this.tasks.length),
    }));
    this.tasks = [...this.tasks];
  },
  onTaskRemoved(t) {
    let counter = 0;
    const l = this.tasks.map((i) => {
      if (i.order !== t.task.order) {
        return new Task({
          name: i.name,
          description: i.description,
          status: i.status,
          order: (counter++),
        });
      }
    }).filter(r => r);
    this.tasks = [...l];
  },
  onTaskMoveUp(t) {
    function findTask(item) {
      return item.order === t.task.order;
    }

    const task = this.tasks.find(findTask);
    const idx = this.tasks.indexOf(task);
    const temp = new Task({
      name: this.tasks[idx - 1].name,
      description: this.tasks[idx - 1].description,
      status: this.tasks[idx - 1].status,
      order: this.tasks[idx - 1].order,
    });
    this.tasks[idx - 1] = new Task({
      name: this.tasks[idx].name,
      description: this.tasks[idx].description,
      status: this.tasks[idx].status,
      order: this.tasks[idx - 1].order,
    });
    this.tasks[idx] = new Task({
      name: temp.name,
      description: temp.description,
      status: temp.status,
      order: this.tasks[idx].order,
    });
    this.tasks = [...this.tasks];
  },
  onTaskMoveDown(t) {
    function findTask(item) {
      return item.order === t.task.order;
    }

    const task = this.tasks.find(findTask);
    const idx = this.tasks.indexOf(task);
    const temp = new Task({
      name: this.tasks[idx + 1].name,
      description: this.tasks[idx + 1].description,
      status: this.tasks[idx + 1].status,
      order: this.tasks[idx + 1].order,
    });
    this.tasks[idx + 1] = new Task({
      name: this.tasks[idx].name,
      description: this.tasks[idx].description,
      status: this.tasks[idx].status,
      order: this.tasks[idx + 1].order,
    });
    this.tasks[idx] = new Task({
      name: temp.name,
      description: temp.description,
      status: temp.status,
      order: this.tasks[idx].order,
    });
    this.tasks = [...this.tasks];
  },
});
const inProgress = new Catalog({
  tasks: inProgressTasks,
  title: 'inprogress',
  node: document.createElement('ul'),
  onTaskRemoved(t) {
    let counter = 0;
    const l = this.tasks.map((i) => {
      if (i.order !== t.task.order) {
        return new Task({
          name: i.name,
          description: i.description,
          status: i.status,
          order: (counter++),
        });
      }
    }).filter(r => r);
    this.tasks = [...l];
  },
  onTaskMoveUp(t) {
    function findTask(item) {
      return item.order === t.task.order;
    }

    const task = this.tasks.find(findTask);
    const idx = this.tasks.indexOf(task);
    const temp = new Task({
      name: this.tasks[idx - 1].name,
      description: this.tasks[idx - 1].description,
      status: this.tasks[idx - 1].status,
      order: this.tasks[idx - 1].order,
    });
    this.tasks[idx - 1] = new Task({
      name: this.tasks[idx].name,
      description: this.tasks[idx].description,
      status: this.tasks[idx].status,
      order: this.tasks[idx - 1].order,
    });
    this.tasks[idx] = new Task({
      name: temp.name,
      description: temp.description,
      status: temp.status,
      order: this.tasks[idx].order,
    });
    this.tasks = [...this.tasks];
  },
  onTaskMoveDown(t) {
    function findTask(item) {
      return item.order === t.task.order;
    }

    const task = this.tasks.find(findTask);
    const idx = this.tasks.indexOf(task);
    const temp = new Task({
      name: this.tasks[idx + 1].name,
      description: this.tasks[idx + 1].description,
      status: this.tasks[idx + 1].status,
      order: this.tasks[idx + 1].order,
    });
    this.tasks[idx + 1] = new Task({
      name: this.tasks[idx].name,
      description: this.tasks[idx].description,
      status: this.tasks[idx].status,
      order: this.tasks[idx + 1].order,
    });
    this.tasks[idx] = new Task({
      name: temp.name,
      description: temp.description,
      status: temp.status,
      order: this.tasks[idx].order,
    });
    this.tasks = [...this.tasks];
  },
});
const done = new Catalog({
  tasks: doneTasks,
  title: 'done',
  node: document.createElement('ul'),
  onTaskRemoved(t) {
    let counter = 0;
    const l = this.tasks.map((i) => {
      if (i.order !== t.task.order) {
        return new Task({
          name: i.name,
          description: i.description,
          status: i.status,
          order: (counter++),
        });
      }
    }).filter(r => r);
    this.tasks = [...l];
  },
  onTaskMoveUp(t) {
    function findTask(item) {
      return item.order === t.task.order;
    }

    const task = this.tasks.find(findTask);
    const idx = this.tasks.indexOf(task);
    const temp = new Task({
      name: this.tasks[idx - 1].name,
      description: this.tasks[idx - 1].description,
      status: this.tasks[idx - 1].status,
      order: this.tasks[idx - 1].order,
    });
    this.tasks[idx - 1] = new Task({
      name: this.tasks[idx].name,
      description: this.tasks[idx].description,
      status: this.tasks[idx].status,
      order: this.tasks[idx - 1].order,
    });
    this.tasks[idx] = new Task({
      name: temp.name,
      description: temp.description,
      status: temp.status,
      order: this.tasks[idx].order,
    });
    this.tasks = [...this.tasks];
  },
  onTaskMoveDown(t) {
    function findTask(item) {
      return item.order === t.task.order;
    }

    const task = this.tasks.find(findTask);
    const idx = this.tasks.indexOf(task);
    const temp = new Task({
      name: this.tasks[idx + 1].name,
      description: this.tasks[idx + 1].description,
      status: this.tasks[idx + 1].status,
      order: this.tasks[idx + 1].order,
    });
    this.tasks[idx + 1] = new Task({
      name: this.tasks[idx].name,
      description: this.tasks[idx].description,
      status: this.tasks[idx].status,
      order: this.tasks[idx + 1].order,
    });
    this.tasks[idx] = new Task({
      name: temp.name,
      description: temp.description,
      status: temp.status,
      order: this.tasks[idx].order,
    });
    this.tasks = [...this.tasks];
  },
});

const catalogs = [todo, inProgress, done];
new Board({
  catalogs,
  node: document.querySelector('board'),
  onTaskAdd({ name, desc }) {
    function findTodoList(list) {
      return list.title === 'todo';
    }

    const todoList = this.catalogs.find(findTodoList);
    this.catalogs.shift();
    todoList.onTaskAdd({ name, desc });
    this.catalogs.unshift(todoList);
    this.catalogs = [...this.catalogs];
  },
});
