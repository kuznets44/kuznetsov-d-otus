import {MyLeaf} from '../my-leaf.js';
import {fixture, html} from '@open-wc/testing';

const assert = chai.assert;

suite('my-leaf', () => {
  test('is defined', () => {
    const el = document.createElement('my-leaf');
    assert.instanceOf(el, MyLeaf);
  });

  test('renders as h3 element with innerText inside', async () => {
    const el = await fixture(html`<my-leaf>Test</my-leaf>`);
    assert.shadowDom.equal(
      el,
      `
      <h3 class="tree__leaf">Test</h3>
    `
    );
  });

});
