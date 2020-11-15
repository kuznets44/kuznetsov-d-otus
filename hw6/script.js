const fs = require('fs');
const readline = require('readline');
const events = require('events');
const {createInitialFile, partSortAndWrite} = require('./helper');

const NUMBERS_AMOUNT = 6000000;           //всего чисел
const MAX_NUMBER = Number.MAX_SAFE_INTEGER;             //максимальное число
const PART_NUMBERS_AMOUNT = 100000;       //размер части
const IN_FILENAME = 'files/in.txt';     //входной файл
const OUT_FILENAME = 'files/out.txt';   //выходной файл
const PARTS_DIR = 'files/parts';        //директория для файлов-частей


//обработка файлов-частей и запись итога
const processParts = () => {

  console.log(`3. Объединяем части в ${OUT_FILENAME}`);
  //асинхронно читаем директорию с частями
  fs.readdir(PARTS_DIR,(err,files) => {
    if(err) {
      throw new Error(err);
    }
    //создаем поток на запись результата
    const outWriteStream = fs.createWriteStream(OUT_FILENAME);

    //определяем переменную, в которой будут содержаться текущие считанные значения из всех потоков.
    //индекс массива - индекс потока
    //каждый элемент представляет собой массив считываемых значений из потока
    //каждый элемент до чтения из потока инициализируется пустым массивом
    //значения массива будут пополняться через событие line объекта readLine (значений может быть несколько в зависимости от размера чанка входного потока)
    //когда поток закончен, элемент массива устанавливается undefined. Это говорит о том, что поток отработал
    const currentValues = [];

    //при каждом чтении потока (и пополнении массива currentValues) эмитируется событие streamRead, обработчик которого:
    //  проверяет, все ли элементы, которые не undefined, заполнены (содержат хотя бы 1 элемент)
    //  если заполнены все,
    //    в цикле, пока все элементы заполнены, просматриваем все нулевые элементы массивов, выявляем наименьшее значение и его индекс
    //    пишем его в выходной поток
    //    удаляем нулевое значение из массива с соотв. индексом
    //    если массив пустой
    //      запрашиваем состояние потока
    //      если поток readable, разрешаем считывание следующей порции, пишем в массив
    //      иначе делаем элемент массива undefined
    const eventEmitter = new events.EventEmitter();
    eventEmitter.addListener('streamRead',() => {

      //определяем, есть ли пустые элементы (все ли потоки считаны)
      let emptyStreams = currentValues.reduce( (count,item) => {
        if(item !== undefined && item.length === 0) {
          return count + 1;
        } else {
          return count;
        }
      },0);

      if(emptyStreams === 0) {  //если все потоки считаны, продолжаем, иначе ждем следующего пополнения массива
        while(true) { //крутим цикл, пока все потоки считаны или пока есть активные потоки
          //определяем мин. значение и его индекс (индекс потока, который его отдал)
          let minValue = MAX_NUMBER + 1;
          let minValueIndex = null;
          currentValues.forEach( (item,itemIndex) => {
            if(item !== undefined && (item[0] < minValue)) {
              minValue = item[0];
              minValueIndex = itemIndex;
            }
          });
          //отправляем минимальное значение в поток на запись
          outWriteStream.write(`${minValue}\n`);
          //убираем переданное значение
          currentValues[minValueIndex].shift();
          if(currentValues[minValueIndex].length === 0) { //если в массиве значений нет элементов, пытаемся запросить следующую порцию в потоке
            if(streams[minValueIndex].readable) {
              //поток читаемый, запускаем его и ждем события readStream
              streams[minValueIndex].resume();
              break;
            } else {
              //в потоке ничего нет, делаем элемент массива undefined
              currentValues[minValueIndex] = undefined;

              //определяем, остались ли в массиве неотработанные значения из потоков
              let liveStreams = currentValues.reduce( (count,item) => {
                if(item !== undefined) {
                  return count + 1;
                } else {
                  return count;
                }
              },0);
              if(liveStreams === 0) {
                //завершаем запись в поток
                outWriteStream.end();
                break;
              }
            }
          }  
        }
      }
    });

    //определяем переменную-массив с потоками
    const streams = [];

    //для каждого файла создаем поток на чтение и записываем в массив с соответствующими индексами
    //для считывания по строке создаем для каждого потока readline, потоком дальше будем управлять через него
    files.forEach( (item,index) => {
      if(!/\d+\.txt/.test(item)) {
        return;
      }
      //console.log(item);
      const readStream = fs.createReadStream(`${PARTS_DIR}/${item}`,{highWaterMark:120});
      const readLine = readline.createInterface(readStream);

      currentValues[index] = [];
      streams[index] = readStream;

      //при получении очередного значения пишем его в массив по индексу, соответствующему потоку, и ставим поток на паузу
      //для дальнейшей обработки эмитируем событие
      readLine.on('line', line => {
        currentValues[index].push(parseInt(line));
        readLine.pause();
        eventEmitter.emit('streamRead');
      });
      
    });  
  
  });
}

///////////////////////////////////////////////////////////////////////////////


//ЭТАП 1. Создаем поток на запись, пишем туда числа
console.log("1. Создаем исходный файл...");
createInitialFile(IN_FILENAME, NUMBERS_AMOUNT, MAX_NUMBER, () => {

  //ЭТАП 2. Разбиваем исходный файл на части
  console.log(`2. Разбиваем файл на части`);
  //создаем поток на чтение
  const readInitial = fs.createReadStream(IN_FILENAME);
  //привязываем интерфейс для считывания по строкам
  const readLineInitial = readline.createInterface(readInitial);

  //начальные значения для разделения на части
  let counter = 0;      //счетчик элементов внутри части
  let partIndex = 0;    //счетчик частей
  let part = [];        //массив, содержащий часть

  //обрабатываем событие получения очередной линии
  readLineInitial.on('line',line => {
    //console.log(counter,line);
    //если достигли максимального размера части
    if(counter === PART_NUMBERS_AMOUNT) {
      //сортируем и сбрасываем часть в файл
      partSortAndWrite(part, `${PARTS_DIR}/${partIndex}.txt`);
      console.log(`\t${PARTS_DIR}/${partIndex}.txt`);

      //обнуляем данные для следующего массива
      part = [];    
      counter = 0;
      partIndex++;  //увеличиваем счетчик частей
    }

    //заполняем массив, соответствующий части входного файла
    part.push(line);
    counter++;
  });

  //при окончании считывания сортируем и сбрасываем остаток в файл
  readLineInitial.on('close', () => {
    if(part.length > 0) {
      partSortAndWrite(part, `${PARTS_DIR}/${partIndex}.txt`);
      console.log(`\t${PARTS_DIR}/${partIndex}.txt`);
    }
    //обрабатываем части и выводим результат
    processParts();
  });
});