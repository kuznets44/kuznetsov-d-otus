import {html,css,LitElement} from 'lit-element';


export class MyLeaf extends LitElement {

  static get styles() {
    return css  `
      .tree__leaf {
          margin-left:20px;
          color:green;
          border:1px solid green;
          margin-bottom:5px;
          line-height:20px;
        }
    `;
  }

  render() {
  return html `<h3 class="tree__leaf">${this.textContent}</h3>`;
  }

}

customElements.define('my-leaf',MyLeaf);