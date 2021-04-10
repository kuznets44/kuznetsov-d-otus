ДЗ №10 REACT
------------------------------------------------------
Развернуть приложение с помощью CRA (по желанию)
Настроить кастомный webpack + babel проект (+2 балла)
Заставить работать TypeScript через babel (+1 бал)
Написать хелло ворлд (todo app или любое другое), сделать базовую верстку вашего приложения, поработать с JSX (+2 бал)
Создать структуру приложения, создать компоненты контейнеры.

Документация по webpack https://webpack.js.org/guides/getting-started/

Документация по babel https://babeljs.io/docs/en/

Typescript preset https://babeljs.io/docs/en/babel-preset-typescript

Можете взять за основу простое todo приложение

https://codesandbox.io/s/github/reduxjs/redux/tree/master/examples/todos

----------------

Разработанное приложение имеет след. интерфейс
https://i.imgur.com/Z0nfjtZ.png

Для решения задачи создания приложения "ToDo List" произведем декомпозицию на компоненты:
App - корневой компонент. Будет содержать базовую разметку, состояния и функции-хуки для осуществления изменения состояний
Остальные компоненты будут включены в App:
Filter - будет отрисовывать фильтр по состоянию задач в списке и выводиться в виде списка ссылок
List - будет выводить список задач и содержать чекбоксы для изменения их состояний
Add - будет инициировать добавление элемента в список задач и содержать инпут для ввода названия задачи и кнопку добавления

Все компоненты будут выполнены в стиле функциональных с использованием необходимых хуков.

Для решения задачи в части настройки кастомного webpack и babel будем использовать TypeScript.
CRA при создании проекта предполагает использование JS, поэтому произведем его настройку для поддержки ТS
Для оформления UI будем использовать Bootstrap

Развертывание проекта через CRA
1. npx create-react-app todo
2. cd todo
3. npm start - проверяем работоспособность


Установка TS
1. npm install --save-dev typescript - добавляем TS в проект
2. npm install --save-dev @babel/preset-typescript - пресет babel для TS
3. Добавляем пресет для babel в package.json
"babel": {
    "presets": [
      "@babel/preset-typescript"
    ]
  }
3. npm i --save-dev @types/react @types/react-dom - добавляем поддержку типов
4. Переименовываем .js-файлы в .tsx
5. npm test, npm start - проверяем раотоспособность проекта и тестов

Установка Bootstrap
1. npm install --save bootstrap@next
2. npm i --save-dev @types/bootstrap - поддержка типоы
3. Импортируем в index.tsx
import 'bootstrap/dist/css/bootstrap.css';

