/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint no-underscore-dangle: "warn" */
/* eslint-env browser */

export default class Catalog {

  constructor(config) {
    const self = this;
    const data = { ...config };
    delete data.tasks;
    Object.assign(this, data);
    this.tasks = config.tasks;

    this.node.addEventListener('task-remove', (e) => {
      self.onTaskRemoved(e.detail);
    });

    this.node.addEventListener('task-move-up', (e) => {
      self.onTaskMoveUp(e.detail);
    });

    this.node.addEventListener('task-move-down', (e) => {
      self.onTaskMoveDown(e.detail);
    });
  }

  set tasks(newTasks) {
    this._tasks = newTasks;
    this.render();
  }

  get tasks() {
    return this._tasks;
  }

  render() {
    this.node.innerHTML = '';
    this.node.classList.add('tasks', `tasks--${this.title}`);
    const ul = document.createElement('ul');
    const h2 = document.createElement('h2');
    h2.textContent = this.title;
    ul.appendChild(h2);
    this.tasks.forEach((item) => {
      const task = document.createElement('li');
      task.appendChild(item.node);
      task.classList.add('task');
      ul.appendChild(task);
    });
    [...ul.children].forEach(c => this.node.appendChild(c));
  }
}
