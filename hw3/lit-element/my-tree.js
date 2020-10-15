import {html,css,LitElement} from 'lit-element';

export class MyTree extends LitElement {

  static get styles() {
    return css  `
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
    `;
  }

  static get properties() {
    return {
      /**
       * The list to render.
       */
      list: {
        type: Array,
        converter: { 
          fromAttribute: (value, type) => { 
            let jsonValue = JSON.parse(value);

            if(jsonValue instanceof Object && !Array.isArray(jsonValue)) {
              jsonValue = [jsonValue]; 
            }
            return jsonValue
          },
        }
      },

      closed: {
        type:String
      }
    };
  }

  render() {
    return html`
      ${this.list.map(element => {
        if(element.items != undefined) {
          return html`
            <div class="subtree__wrapper">
              <h2 class="subtree__title">${element.id}</h2>
              <div class="subtree__elements ${this.closed}">
                <my-tree .list="${element.items}"></my-tree>
              </div>
            </div>
          `;
        } else {
          return html`<my-leaf>${element.id}</my-leaf>`
        }
      })}
    `;
  }

  
  constructor() {
    super();
    this.list = [];
    this.closed = "";

    this.addEventListener(
      'click', e => {
        this.closed = this.closed == '' ? 'closed' : '';
        e.stopPropagation();
    });
  }
}

customElements.define('my-tree',MyTree);