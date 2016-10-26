/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint no-underscore-dangle: "warn" */
/* eslint-env browser */

import jQuery from 'jquery';
import sortable from 'jquery-ui-bundle';

export default class Board {

  constructor(config) {
    const self = this;
    const data = { ...config };
    delete data.catalogs;
    Object.assign(this, data);
    this.catalogs = config.catalogs;

    this.node.addEventListener('click', (e) => {
      if (!e.target.classList.contains('add-form_button')) {
        return;
      }
      const name = self.node.querySelector('.add-form_name').value;
      const description = self.node.querySelector('.add-form_description').value;
      if (name === '') {
        return;
      }

      self.onTaskCreated({ name, description });
    });

    this.node.addEventListener('task-remove', (e) => {
      self.onTaskRemoved(e.detail.task);
    });

    this.node.addEventListener('task-move-up', (e) => {
      self.onTaskMoveUp(e.detail.task);
    });

    this.node.addEventListener('task-move-down', (e) => {
      self.onTaskMoveDown(e.detail.task);
    });

    this.node.addEventListener('task-move-right', (e) => {
      self.onTaskMoveRight(e.detail.task);
    });

    this.node.addEventListener('task-move-left', (e) => {
      self.onTaskMoveLeft(e.detail.task);
    });
  }

  render() {
    this.node.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('add-form');

    div.innerHTML = `
      <input class="add-form_name" type="text" placeholder="add todo" name="todo-name">
      <textarea class="add-form_description" placeholder="add description" name="description"></textarea>
      <button class="add-form_button">Добавить</button>`;
    this.node.appendChild(div);

    const ul = document.createElement('ul');
    ul.classList.add('catalogs');
    const size = this.catalogs.length;

    this.catalogs.forEach((item, idx) => {
      const self = this;
      const catalog = document.createElement('li');
      const h2 = document.createElement('h2');
      h2.textContent = item.title;
      catalog.appendChild(h2);
      catalog.appendChild(item.node);
      catalog.classList.add('catalog');
      if (item.node.querySelector('.btn--up')) {
        [...item.node.querySelectorAll('.btn--up')].forEach(i => i.disabled = false);
        [...item.node.querySelectorAll('.btn--up')][0].disabled = true;
      }
      if (item.node.querySelector('.btn--down')) {
        [...item.node.querySelectorAll('.btn--down')].forEach(i => i.disabled = false);
        [...item.node.querySelectorAll('.btn--down')][item.tasks.length - 1].disabled = true;
      }
      if (idx === 0) {
        [...item.node.querySelectorAll('.btn--left')].forEach(i => i.disabled = true);
      }
      if (idx === (size - 1)) {
        [...item.node.querySelectorAll('.btn--right')].forEach(i => i.disabled = true);
      }
      jQuery(item.node).sortable({
        placeholder: 'task-placeholder',
        connectWith: '.tasks',
        dropOnEmpty: true,
      });
      jQuery(item.node).on('sortremove', (event, ui) => {
        self.onTaskSortRemove(item);
      });
      ul.appendChild(catalog);
    });
    this.node.appendChild(ul);
  }

  get catalogs() {
    return this._catalogs;
  }

  set catalogs(newCatalogs) {
    this._catalogs = newCatalogs;
    this.render();
  }
}
