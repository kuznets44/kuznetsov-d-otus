
ДЗ№4. Перевести проект на TypeScript
Цель: Перевести проект на JavaScript к TypeScript
- Добавить типы
- Добавить зависимости
- Исправить ошибки типизации
Можно использовать свой репозиторий или любой опенсерсовый проект, например
- https://github.com/korzio/djv/tree/ts

В качестве базового решил использовать предыдущее задание (необязательное) по svelte, переработав его в TypeScript.
https://github.com/kuznets44/kuznetsov-d-otus/pull/6



Порядок подготовки среды и выполнения задания.

0. Скопировал папку с проектом из предыдущего задания. Далее использовал https://svelte.dev/blog/svelte-and-typescript

1. npm install --save-dev @tsconfig/svelte typescript svelte-preprocess svelte-check - добавил дев-зависимости
2. npm install --save-dev @rollup/plugin-typescript - добавил плагин для rollup
3. Добавил необходимые настройки в rollup.config.js
4. Переименовал файлы js ы ts, в компонентах поставил lang="ts"
5. Определил специфические типы для расхода (Outcome) и категории (OutcomeCategory) через интерфейсы с необходимыми свойствами
6. При помощи инструментов svelte-check и официального расширения svelte для VS Code стал отслеживать и править ошибки. 

Из интересных моментов:
1. Я использовал один из шаблонов Material Design Lite, поэтому старался все виджеты брать оттуда.
Диалоги там строятся на основе экспериментального тэга <dialog> (понимаю, в продакшен рано такое, но для задания, думаю, будет достаточно), который определяется как HTMLDialogElement
При анализе ts-кода svelte-check отдавал ошибку при получении методом document.getElementById, пришлось явно приводить:
  const dialog:HTMLDialogElement = document.getElementById('category_dialog') as HTMLDialogElement;

2. Странно себя ведет use:active (недоработана поддержка ts или ошибка при экспорте? или по-другому нужно импортировать) 
Анализатор ts считает ошибкой эту конструкцию. Обратил внимание, что есть разница при импорте:
	import {link} from "svelte-spa-router";
	import active from "svelte-spa-router/active";

  В исходнике модуля active экспортируется как export default function active, похоже это потом является проблемой. Пробовал убрать default
  и импортировать как import {active} from "svelte-spa-router/active" - все нормально, ошибок svelte-check нет