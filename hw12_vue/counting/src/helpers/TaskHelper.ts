import { Level } from "@/interfaces";

export class TaskHelper {
  level: Level;
  useSum = true;
  useMultiplication = false;
  useSubtraction = false;
  signs = [];

  constructor(options) {
    this.level = options.level;
    this.useSum = options.useSum || true;
    this.useMultiplication = options.useMultiplication || false;
    this.useSubtraction = options.useSubtraction || false;

    if(this.useSum) this.signs.push('+');
    if(this.useSubtraction) this.signs.push('-');
    if(this.useMultiplication) this.signs.push('*');

    return this;
  }

  private getNextElement() {
    let maxValue = Math.pow(10,this.level.digitsAmount);
    return Math.floor(Math.random() * maxValue);
  }

  private getNextSign() {
    let randomIndex = Math.floor(Math.random() * this.signs.length);
    return this.signs[randomIndex];
  }

  public getTask() {
    const elements = [];
    const signs = [];
    const expression = [];

    for( let i = 0; i < this.level.elementsAmount; i++ ) {
      let nextElement = this.getNextElement();
      elements.push(nextElement);
      expression.push(nextElement);
      if( i < this.level.elementsAmount - 1) {
        let nextSign = this.getNextSign();
        signs.push(nextSign);
        expression.push(nextSign);
      }
    }

    let result = eval(expression.join(''));
    expression.push('=');
    expression.push(result);
    elements.push(result);

    let elementToRemove = elements[Math.floor(Math.random() * elements.length)];
    let isElementRemoved = false;
    const expressionFinal = expression.map ( item => {
      if (!isElementRemoved && item === elementToRemove) {
        isElementRemoved = true;
        return '';
      } else {
        return item;
      }
    });

    console.log('elements',elements);
    console.log('signs',signs);
    console.log('expression',expression);

    const task = {
      expression: expressionFinal,
      answer: elementToRemove
    }

    console.log('ret',task);

    return task;
  }
}