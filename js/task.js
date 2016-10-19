/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint no-underscore-dangle: "warn" */
/* eslint-env browser */

export default class Task {

  constructor(config) {
    const self = this;
    if (config.name === '') {
      return;
    }
    const data = { ...config };
    this.name = data.name;
    this.description = data.description;
    this.status = data.status;
    this.order = data.order;
    this.node = document.createElement('div');
    this.node.classList.add('card');

    this.node.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn--del')) {
        self.node.dispatchEvent(new CustomEvent('task-remove', {
          detail: { task: this },
          bubbles: true,
          composed: true,
        }));
      } else if (e.target.classList.contains('btn--up')) {
        self.node.dispatchEvent(new CustomEvent('task-move-up', {
          detail: { task: this },
          bubbles: true,
          composed: true,
        }));
      } else if (e.target.classList.contains('btn--down')) {
        self.node.dispatchEvent(new CustomEvent('task-move-down', {
          detail: { task: this },
          bubbles: true,
          composed: true,
        }));
      } else if (e.target.classList.contains('btn--right')) {
        self.node.dispatchEvent(new CustomEvent('task-move-right', {
          detail: { task: this },
          bubbles: true,
          composed: true,
        }));
      } else if (e.target.classList.contains('btn--left')) {
        self.node.dispatchEvent(new CustomEvent('task-move-left', {
          detail: { task: this },
          bubbles: true,
          composed: true,
        }));
      }
    });
    this.render();
  }

  render() {
    this.node.innerHTML = '';
    const div = document.createElement('div');
    div.innerHTML = `
      <h3 class="card_title">${this.name}</h3>
      <div class="card_description">${this.description}</div>
      <div class="card_state">
        <span class="card_status">${this.status}</span>
        <span class="card_order">${this.order}</span>
      </div>
      <button class="btn  btn--up">&uArr;</button>
      <button class="btn  btn--right">&rArr;</button>
      <button class="btn  btn--down">&dArr;</button>
      <button class="btn  btn--left">&lArr;</button>
      <button class="btn  btn--del">x</button>
      `;

    [...div.children].forEach(c => this.node.appendChild(c));
  }

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
}
