const { resolve } = require('path');
const fsPromises = require('fs').promises;

const readDirAsync = (dirPath) => {
  //определяем промис, в резолве которого будем возвращать результат
  return new Promise((resolve) => {
    let result = {"dirs":[],"files":[]};
    //читаем директорию (сразу с типами файлов, чтобы не вызывать еще один промис на stat)
    fsPromises.readdir(dirPath,{withFileTypes:true})
      .then(( items ) => {
        //определяем стэк промисов, в который будем складывать вызовы чтения поддиректорий
        const promisesStack = [];
        items.forEach(item => {
          const itemPath = dirPath + item.name;

          if(item.isDirectory()) {  //если это директория, нужно положить ее путь в dirs, а затем рекурсивно вызвать функцию для нее
            result.dirs.push(itemPath);

            const promise = readDirAsync(itemPath + "/")
              .then((innerResult) => {     //после резолва нужно положить содержимое в возвращаемую переменную
                innerResult.dirs.forEach(innerDir => result.dirs.push(innerDir));
                innerResult.files.forEach(innerFile => result.files.push(innerFile));
              });
            //добавляем этот промис в стэк
            promisesStack.push(promise);
          } else {
            //просто пишем путь к файлу в результат
            result.files.push(itemPath);
          }
        });
        //ждем выполнения внутренних промисов, по окончанию - резолвим
        Promise.all(promisesStack)
          .then(() => resolve(result));
      })  
  });
};

//читаем параметры. Первые 2 - системные, наш следующий
const path = process.argv[2] || undefined;

if(path == undefined) {
  throw new Error('Path is not defined');
} else if(path[path.length - 1] !== '/') {
  throw new Error('Please specify path with trailing slash!');
}

//определяем, что это: директория или файл. Директорию читаем, в противном случае отдаем ошибку
fsPromises.stat(path)
  .then(stats => {
    if(stats.isDirectory()) {
      readDirAsync(path)
        .then((result) => {
          console.log("result",result);
        })
    } else {
      throw new Error('Path has to be directory, not file!');
    }
  }, err => {
    throw new Error("Directory doesn't exist!");
  });
