class MyTree extends HTMLElement {
  get list()  {
    return JSON.parse(this.getAttribute('list'));
  }

  connectedCallback() {
    console.log('connected');
  }

  constructor() {
    super();
    console.log('constructor');
  }
}

customElements.define('my-tree',MyTree);