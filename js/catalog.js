/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint no-underscore-dangle: "warn" */
/* eslint-env browser */

export default class Catalog {

  constructor(config) {
    const data = { ...config };
    delete data.tasks;
    Object.assign(this, data);
    this.tasks = config.tasks;
  }

  set tasks(newTasks) {
    this._tasks = newTasks;
    this.render();
  }

  get tasks() {
    return this._tasks;
  }

  render() {
    const ul = document.createElement('ul');
    ul.classList.add('tasks', `tasks--${this.title}`);
    const h2 = document.createElement('h2');
    h2.textContent = this.title;
    ul.appendChild(h2);
    this.tasks.forEach((item) => {
      const task = document.createElement('li');
      task.appendChild(item.node);
      task.classList.add('task');
      ul.appendChild(task);
    });
    this.node = ul;
  }
}
