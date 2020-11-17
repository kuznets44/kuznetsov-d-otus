const fs = require('fs');

const createInitialFile = (path, numbersAmount, maxNumber,cb) => {
  let initialFileStream = fs.createWriteStream(path);


  let i = 0;

  //мы вынуждены предусмотреть ситуацию, когда поток недоступен для записи 
  //(слишком большая скорость записи, поток не справляется с передачей по назначению, что ведет к переполнению буфера)
  //на каждом шаге цикла проверяем, доступен ли поток дальше. 
  //если нет - ждем события drain, после чего возобновляем запись
  
  const writeToInitial = () => {
    while( i < numbersAmount) {
      let data = parseInt(Math.random() * maxNumber);
      let isDataWritten = initialFileStream.write(`${data}\n`);
      i++;
      
      if(!isDataWritten) {
        return false;
      } 
    }
    //цикл успешно прошел, закрываем поток и вызываем коллбэк для дальнейших действий
    initialFileStream.end();
    cb();
  }
  
  writeToInitial();
  initialFileStream.on('drain', () => {
    writeToInitial();
  });
};

//сортировка файла-части и запись в файл
const partSortAndWrite = (part, path) => {
  const writeStream = fs.createWriteStream(path);
  //сортируем встроенными средствами, числовая сортировка
  let partSorted = part.sort( (a,b) => (a - b) );
  writeStream.write(partSorted.join("\n"));
  writeStream.end();
}

module.exports.createInitialFile = createInitialFile;
module.exports.partSortAndWrite = partSortAndWrite;