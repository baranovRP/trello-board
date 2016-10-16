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
