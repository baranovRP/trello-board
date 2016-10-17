/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint no-underscore-dangle: "warn" */
/* eslint-env browser */

export default class Board {

  constructor(config) {
    const data = { ...config };
    delete data.catalogs;
    Object.assign(this, data);
    this.catalogs = config.catalogs;
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
    this.catalogs.forEach((item) => {
      const catalog = document.createElement('li');
      catalog.appendChild(item.node);
      catalog.classList.add('catalog');
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
