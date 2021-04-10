ДОМАШНЕЕ ЗАДАНИЕ №11. Веб-приложение погоды

На странице приложения должна быть возможность добавлять города в список избранных. По каждому городу показывается информация о температуре, ветре, другие параметры.

Реализовать компонент фильтра и поиска городов. Данные по городам сохранять в браузерном хранилище. Добавить страницу погоды по конкретному городу. При переходе на нее должен меняться url, показываться информация на несколько дней вперед.

https://openweathermap.org/



--------------------------------

РЕШЕНИЕ

1. Приложение будет состоять из следующих страниц:

Мои города    - / - будет содержать форму поиска и список избранных городов. По каждому городу будет показана краткая текущая информация о погоде. Рядом с каждым городом будет кнопка удаления из избранного
Поиск         - /search - страница результатов. Тот же список городов с краткой информацией, но согласно поиску
/:cityId - страница города. Содержит развернутую информацию по текущему дню, а также прогноз на 7 дней вперед. Также содержит кнопку для добавления в избранное
/:cityId/:date - прогноз погоды в городе на выбранную дату. Дата задается в формате ddmmyyyy

2. В постановке задачи не были приведены макеты, поэтому разработаем свой мок-ап приложения: https://app.moqups.com/Qqa2kYkddr/view/page/ae8fe8eb0

3. Произведем декомпозицию компонентов

<App> - родительский
  <SearchForm> - форма поиска
  <HomeButton> - кнопка возврата на главную
  <PageMyCities> - страница избранных городов. В нее входят:
    <CityList>   - список городов в избранном
      <CityListItem> - элемент списка городов
        <ForecastShort> - краткий вывод прогноза

  <PageSearch>   - страница поиска
    <CityList>   - список найденных городов
      <CityListItem> - элемент списка городов
        <ForecastShort> - краткий вывод прогноза

  <PageCity>     - страница прогноза по городу

  <PageNotFound> - компонент для несуществующей страницы


4. Подготовим окружение. В рамках этого задания для понимания среды
будем настраивать окружение с нуля согласно рекомендуемой в руководстве по React статье:
https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658
Дополнительно настроим TypeScript, CSS-препроцессор и тестовую среду

4.1. Внутри выбранной директории создаем новый проект
npm init
4.2. Создаем первоначальную структуру папок проекта
app
|_  public    - это публичная часть приложения. Там будет размещен index.html, а также статика
|_  src       - это директория с исходными кодами
4.3. Устанавливаем Babel 
Он потребуется нам только в процессе разработке, поэтому ставить будем с ключом --save-dev

npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react @babel/preset-typescript

Нам потребуются следующие пакеты:
  @babel/core - ядро
  @babel/cli  - пакет для возможности транспиляции из командной строки
  @babel/preset-env - пакет для осуществления транспиляции кода ES6+ в ES5, поддерживаемый браузерами
  @babel/preset-react - пакет для транспиляции JSX
  @babel/preset-typescript - пакет для транспиляции TypeScript

4.4. Добавим установленные пресеты в проект.
Одним из вариантов этого шага будет добавить необходимые настройки в качестве отдельной секции в package.json (но есть вариант создать .babelrc в корне и разместить настройки там)

    "babel": {
      "presets": [
        "@babel/env",
        "@babel/preset-react",
        "@babel/preset-typescript"
      ]
    }

4.5. Установим сборщик Webpack c минимально необходимым для сборки набором пакетов. Установленные пакеты будут нам необходимы только в процессе разработки, поэтому при установке
также используем ключ --save-dev

npm install --save-dev webpack webpack-cli webpack-dev-server babel-loader

Здесь:
  webpack - основной пакет
  webpack-cli - пакет для работы с командной строкой
  webpack-dev-server - дев-сервер
  babel-loader - пакет для осуществления транспиляции

4.6. Создадим в корне проекта базовый конфиг webpack (файл webpack.config.js)

const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.jsx", //точка входа
  mode: "development",
  module: {
    rules: [
      //правило для обработки js и jsx-файлов. Для них используем babel-loader
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: { //директория для сборки
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {  //параметры дев-сервера
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]   //плагин для поддержки горячей перезагрузки
};

4.7. Создадим точки входа
- в папке public создадим файл index.html с содержимым согласно статье. В этом файле указываем ссылку на js-бандл, который будет собирать webpack
Согласно конфигу это ./dist/bundle.js
- в папке src создадим index.jsx с минимальным для проверки работы содержимым

4.8. В package.json добавим скрипт для запуска проекта в дев-режиме
Для этого в секцию "scripts" добавим строку:
  "dev": "webpack serve --open --mode development"

4.9. Запустим проект
npm run dev
Несмотря на то, что установлен плагин для горячей перезагрузки и мы теперь можем в консоли видеть результаты пересборки проекта после сохранения файлов,
изменения не отражаются в браузере сразу. Для этого нужно донастроить горячую перезагрузку, что можно будет сделать после установки React

4.10. Установим React
npm install --save react react-dom

4.11. Добавим простейшее приложение Hello World
Для этого:
- в index.jsx добавим строки
  
  import React from "react";
  import ReactDOM from "react-dom";
  import App from "./App";

  ReactDOM.render(<App />, document.getElementById("root"));

- в корень проекта добавим файл App.jsx:
  
  import React from "react";

  const  App = () => {
    return <h1>Hello, World!</h1>
  };

  export default App;

4.12. Добавим поддержку TypeScript
- установим пакеты @types/react и @types/react-dom
  npm install --save-dev @types/react @types/react-dom

- переименуем index.jsx в index.tsx
- переименуем App.jsx в App.tsx
- в конфиг вебпака внесем изменения для обработки ts и tsx:
    ...
    entry: "./src/index.tsx",
    ...
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
    ...
    resolve: { extensions: ["*", ".js", ".jsx", ".ts", ".tsx"] },
    ...
- добавим типы в код компонента. Теперь в файле App.tsx будет примерно следующее:

  import React, { FC }  from "react";

  const  App: FC = () => {
    let name: string = 'World';
    return <h1>Hello, {name}!</h1>
  };

  export default App;

4.13. Донастроим горячую перезагрузку
 - установим пакет react-hot-loader
 npm install --save-dev react-hot-loader
 - обернем вызов корневого компонента следующим образом

App.tsx

import React, { FC }  from "react";
import {hot} from "react-hot-loader";

const  App: FC = () => {
  let name: string = 'World';
  return <h1>Hello, {name}!</h1>
};

export default hot(module)(App);

  Теперь изменения в исходниках, выполненные после запуска npm run dev будут приводить к перезагрузке страницы и отображению изменений в браузере

4.14. Добавим поддержку css и препроцессоров
Если сейчас в компонент добавить импорт стилей из файла css, мы получим ошибку при запуске проекта.
Это связано с тем, что webpack пока не знает, как обращаться с файлами стилей.
  - Добавим соотв. лоадеры
  npm install --save-dev style-loader css-loader
  - укажем в конфиге вебпака правила обработки таких файлов (новый элемент в секции rules)
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
  - для поддержки препроцессоров (напр. SASS) нужно:
    - установить пакеты sass и sass-loader
      
      npm install --save-dev sass sass-loader

    - скорректировать в конфиге вебпака правило обработки стилей след. образом:
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      }

4.15. Добавим тестовую среду Jest
Будем использовать порядок, описанный в руководстве
https://jestjs.io/ru/docs/tutorial-react

4.15.1. Установим необходимые пакеты
npm install --save-dev jest babel-jest react-test-renderer @testing-library/react

4.15.2. Добавим тест для компонента App.tsx, разместив его в предварительно созданной папке src/tests

  import React from "react";
  import { render, screen } from '@testing-library/react';
  import App from './App';

  test('should render the title containing "Hello, World"', () => {
    render(<App />);
    const linkElement = screen.getByText(/Learn React/i);
    expect(linkElement).toBeTruthy();
  })

4.15.3. Поправим секцию scripts/test файла package.json
  "test": "jest"

4.15.4. Запустим тест
  npm run test

4.15.5. Добавим поддержку импорта CSS-модулей.
Если в компонентах был настроен импорт CSS (см. п. 4.14), будет ошибка, связанная с тем, что jest не знает, как обрабатывать CSS-модули
Для таких случаев нужно создать мок-объект и добавить правило обработки в настройку jest:
  - создадим папку src/tests/mocks, а в ней - файл stylesMock.js с содержимым:
    module.exports = {};
  - в package.json добавим секцию jest:

    "jest": {
      "moduleNameMapper": {
        "\\.(css|scss)$": "<rootDir>/src/tests/mocks/stylesMock.js"
      }
    },

  Теперь после запуска npm run test ошибки не будет


4.16 Настроим сборку проекта для production
  - Добавим в раздел scripts файла package.json строку
  "build": "webpack --mode production"
  - Проверим работоспособность путем вызова команды npm run build


5. Особенности реализации
- для управления маршрутами используется штатный роуте
- для упрощения работы с Date используется пакет moment
- для обеспечения единого стиля кода используются функциональные компоненты в сочетании с хуками, в т.ч. кастомными
- Список избранных городов хранится в localStorage
- в проекте используется store на основе Redux в качестве системы кэширования ответов API сервиса погоды. Это позволяет не обращаться к внешнему API при каждом клике
- в сторе используются следующие редьюсеры:
  - searchQueries - запросы по городам. Данные хранятся в разрезе поисковых фраз и кэшируются, тк информация по городам (название, координаты) является условно-постоянной
  - cities - данные городов (наименование, страна, координаты). Данные поступают в стор одновременно с поисковыми запросами по городам и кэшируются
  - forecasts - данные прогнозов. Эти данные хранятся в разрезе городов с временными штампами. При каждом следующем запросе прогноза проверяется время предыдущего, и если это время отличается от текущего на величину, большую, чем время жизни кэша, производится запрос к сервису погоды
- настройки подключения к API сервиса погоды, ключ для localStorage, а также время кэширования ответов по прогнозам хранятся в .env