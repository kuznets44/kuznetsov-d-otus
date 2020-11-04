const getPath = function(el) {
  if(! (el instanceof HTMLElement) ) {
    throw new Error('getPath should take HTMLElement as an argument');
  }

  let result = '';

  let elements = [];

  let parentElement = el;
  while(parentElement instanceof HTMLElement && parentElement.tagName != 'BODY') {
    let element = parentElement.tagName.toLowerCase();
    if(parentElement.className != '') {
      element += `.${parentElement.className.replace(' ','.')}`;
    }
    if(parentElement.id != '') {
      element += `#${parentElement.id}`;
    }
    if(parentElement.nextElementSibling != undefined || parentElement.previousElementSibling != undefined) {
      if(parentElement.previousElementSibling == undefined) {
        element += ':first-child';
      } else if( parentElement.nextElementSibling == undefined ) {
          element += ':last-child';
      } else {
        let k = 0;
        let currentSibling = parentElement;
        while(currentSibling != undefined) {
          k++;
          currentSibling = currentSibling.previousElementSibling;
        }
        element += `:nth-child(${k})`;
      }
    }

    elements.push(element);
    parentElement = parentElement.parentElement;
  }

  elements.push('body');

  elements = elements.reverse();

  result = elements.join(' ');
  console.log(result);
  
  return elements.join(' ');
}

if (typeof module === 'object') {
  module.exports = getPath;
}

