/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint no-underscore-dangle: "warn" */
/* eslint-env browser */

export default class Task {

  constructor(config) {
    if (config.name === '') {
      return;
    }
    const data = { ...config };
    this.name = data.name;
    this.description = data.description;
    this.status = data.status;
    this.order = data.order;
    this.node = this.render();
  }

  render() {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <h3 class="card_title">${this.name}</h3>
      <div class="card_description">${this.description}</div>
      <div class="card_state">
        <span class="card_status">${this.status}</span>
        <span class="card_order">${this.order}</span>
      </div>
      <!--<div class="card-nav">-->
        <!--<button class="btn  btn&#45;&#45;top">&uArr;</button>-->
        <!--<button class="btn  btn&#45;&#45;right">&rArr;</button>-->
        <!--<button class="btn  btn&#45;&#45;bottom">&dArr;</button>-->
        <!--<button class="btn  btn&#45;&#45;left">&lArr;</button>-->
        <!--<button class="btn  btn&#45;&#45;del">x</button>-->
      <!--</div>-->
      `;

    return div;
  }

  // _disableButtons(el) {
  //   const elem = el.cloneNode(true);
  //   if (this.order === 0) {
  //     elem.querySelector('.btn--top').disabled = true;
  //   }
  //   if (this.status === 'todo') {
  //     elem.querySelector('.btn--left').disabled = true;
  //   }
  //   if (this.status === 'done') {
  //     elem.querySelector('.btn--right').disabled = true;
  //   }
  //   if (this.last) {
  //     elem.querySelector('.btn--bottom').disabled = true;
  //   }
  //   return elem;
  // }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value === '') {
      return;
    }
    this._name = value;
  }

  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
  }

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
  }

  get order() {
    return this._order;
  }

  set order(value) {
    this._order = value;
  }

  get node() {
    return this._node;
  }

  set node(value) {
    this._node = value.cloneNode(true);
  }
}
