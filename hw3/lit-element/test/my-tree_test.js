import {MyTree} from '../my-tree.js';
import {fixture, html} from '@open-wc/testing';

const assert = chai.assert;

suite('my-tree', () => {
  test('is defined', () => {
    const el = document.createElement('my-tree');
    assert.instanceOf(el, MyTree);
  });

  test('renders empty string when is called without attributes', async () => {
    const el = await fixture(html`<my-tree></my-tree>`);
    
    assert.shadowDom.equal(
      el,
      ``
    );
    
  });

  test('contains "list" property', () => {
    const el = new MyTree;
 
    assert.isDefined(el.list);
    
  });

  test('"list" property is filled with "list" attribute value and it is an empty array', async () => {
    const el = await fixture('<my-tree list="[]"></my-tree>');
    
    assert.instanceOf(el.list, Array);
    
  });

  
  test('"list" property value is correctly converted to the Array if object is set as value', async () => {
    const el = await fixture(`<my-tree list='{"id":1}'></my-tree>`);
    assert.equal(el.list.length, 1);
  });

  test('renders subtree element containing item child', async () => {
    const el = await fixture(`<my-tree list='{"id":1,"items":[{"id":2},{"id":3}]}'></my-tree>`);

    assert.equal(
      el.shadowRoot.querySelectorAll('my-tree').length,
      1
    );
  });

  test('handles a click', async () => {
    const el = await fixture(`<my-tree list='{"id":1,"items":[{"id":2},{"id":3}]}'></my-tree>`);
    el.click();
    assert.equal(el.closed,"closed");
  });

});
