class MyLeaf extends HTMLElement {

  constructor() {
    super();
    let shadowRoot = this.attachShadow({mode:"open"});
    shadowRoot.innerHTML = `
      <style>
        .tree__leaf {
          margin-left:20px;
          color:green;
          border:1px solid green;
          margin-bottom:5px;
          line-height:20px;
        }
      </style>
      <h3 class="tree__leaf">${this.innerHTML}</h3>
    `;
  }
}

customElements.define('my-leaf',MyLeaf);

class MyTree extends HTMLElement {

  static get observedAttributes() {
    return ['closed'];
  }

  get list()  {
    let list = JSON.parse(this.getAttribute('list').trim());
    if(list instanceof Object && !Array.isArray(list)) {
      list = [list]; 
    }
    
    return list;
  }

  get closed() {
    return this.hasAttribute('closed');
  }

  set closed(value) {
    if(value) {
      this.setAttribute('closed','');
    } else {
      this.removeAttribute('closed');
    }
  }

  
  get shadowRoot() {
    return this._shadowRoot;
  }

  set shadowRoot(obj) {
    this._shadowRoot = obj;
  }
  

  attributeChangedCallback(attrName, oldVal, newVal) {
    let subTree = this.shadowRoot.querySelector('.subtree__elements');
    if(subTree) {
      if(this.closed) {
        subTree.classList.add('closed');
      } else {
        subTree.classList.remove('closed');
      }  
    }
  }

  connectedCallback() {
    this.list.forEach(element => {
      if(element.items != undefined) {
        this.shadowRoot.innerHTML += `<div class="subtree__wrapper">
                  <h2 class="subtree__title">${element.id}</h2>
                  <div class="subtree__elements">
                    <my-tree list='${JSON.stringify(element.items)}'></my-tree>
                 </div>`;
      } else {
        this.shadowRoot.innerHTML += `<my-leaf>${element.id}</my-leaf>`;
      }       
    });

    this.addEventListener(
      'click', e => {
        this.closed = !this.closed;
        e.stopPropagation();
    });
  }

  constructor() {
    super();

    this.closed = false;
    
    this.shadowRoot = this.attachShadow({mode:'open'});
    this.shadowRoot.innerHTML = `
      <style>
        h2 {
          color: red;
          cursor:pointer;
        }
        .subtree__elements {
          margin-left:20px;
          border:1px solid red;          
        }
        .subtree__elements.closed {
          display:none;
        }
      </style>
    `;
  }
}

customElements.define('my-tree',MyTree);