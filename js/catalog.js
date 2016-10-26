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
    this.node.innerHTML = '';
    this.node.classList.add('tasks', `tasks--${this.title}`);
    this.node.id = `sortable-${this.title}`;
    const ul = document.createElement('ul');
    this.tasks.forEach((item) => {
      const task = document.createElement('li');
      task.appendChild(item.node);
      task.classList.add('task');
      ul.appendChild(task);
    });
    [...ul.children].forEach(c => this.node.appendChild(c));
  }
}
