const getPath = require('./getPath');

const docMock = `
<html>
  <head>
    <title>test</title>
  </head>
  <body>
    <div id="first_block">
      first block
      <span id="span1">Span 1</span>
      <span id="span2">Span 2</span>
    </div>
    <div id="second_block">second block
      <span id="span3">Span 3</span>
      <span id="span4">Span 4</span>
      <span class="span5">Span 5</span>
    </div>
    <div id="third_block">third block
      <span>Span 6</span>
      <span>Span 7</span>
    </div>
  </body>
</html>    
`;

test('getPath should be defined',() => {
  expect(getPath).toBeDefined();
});

test('mocked argument should be HTMLElement',() => {
  document.body.innerHTML = docMock;

  const div1 = document.getElementById('first_block');
  expect(div1).toBeInstanceOf(HTMLElement);
});
2
test('getPath should throw an error if the argument is not a HTMLElement',() => {
  expect(() => {
    getPath('string argument')
  }).toThrow();
});

test('getPath should return "body" in the beginning of the output',() => {
  document.body.innerHTML = docMock;

  const div1 = document.getElementById('first_block');
  expect(getPath(div1)).toMatch(/body.*/);
});

test('getPath should return 2 strings divided by space for the first div',() => {
  document.body.innerHTML = docMock;

  const div1 = document.getElementById('first_block');
  expect(getPath(div1).split(' ')).toHaveLength(2);
});

test('getPath should return 3 strings divided by space for the third span',() => {
  document.body.innerHTML = docMock;

  const span3 = document.getElementById('span3');
  expect(getPath(span3).split(' ')).toHaveLength(3);
});

test('getPath should distinguish elements by their classes',() => {
  document.body.innerHTML = docMock;

  const span5 = document.querySelector('.span5');
  expect(getPath(span5)).toMatch(/\.span5/);
});

test('getPath should distinguish elements by their ids',() => {
  const span1 = document.querySelector('#span1');
  const span2 = document.querySelector('#span2');
  expect(getPath(span1)).not.toBe(getPath(span2));
});

test('getPath should distinguish elements by position',() => {
  const spansOfThirdBlock = document.querySelectorAll('#third_block span');
  let span6 = spansOfThirdBlock[0];
  let span7 = spansOfThirdBlock[1];
  expect(getPath(span6)).not.toBe(getPath(span7));
});

test('querySelectorAll from the first span of the third block should return one element',() => {
  const span6 = document.querySelector('#third_block span');
  const funcResult = getPath(span6);
  expect(document.querySelectorAll(funcResult)).toHaveLength(1);
});


