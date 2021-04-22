ДЗ№12. Структура & Routing для приложения "Устный счет"

Цель:
SPA-игра "Устный счет". 
Игра состоит из двух экранов - на первом экране пользователь выбирает настройки, 
которые будут использовать в игре - типы вычислений, сложность, время раунда. 
На этой же странице показывается статистика тренировок. 
Вторая страница - сама игра. Пользователь должен решить максимальное количество задач на заданное время. 
Мокапы - https://app.moqups.com/korzio@gmail.com/bTYyBLCtpU/edit/page/ad64222d5

Подготовить общую структуру приложения - компоненты контейнеры для страниц приложения. 
Сделать первую страницу приложения - форму настроек. 
Реализовать второй экран - игру "калькулятор". 
Настроить переходы по страницам приложения.

------------------

РЕШЕНИЕ

Игра будет состоять из 3 страниц:
/ - стартовая страница (соответствующая стр. 1 мокапа) - настройки
/play - страница игры
/results


Уровни сложности
Будем определять уровни исходя из след. соображений

1. Всего предусмотрим 5 уровней
2. Уровень сложности будет определяться показателями:
  - макс. количество разрядов в элементах (digitsAmountMax)
  - количество элементов в вычислении (elementsAmount)
  - количество неизвестных (unknownAmount)
  - позиция неизвестных (могут быть только в результате или еше и в компонентах) (unknowPosition = resultOnly | any)

3. Опишем уровни объектом:
{
  "1": {
    digitsAmountMax: 1,
    elementsAmount: 2,
    unknownAmount: 1,
    unknowPosition: "resultOnly"
  },
  "2": {
    digitsAmountMax: 1,
    elementsAmount: 2,
    unknownAmount: 1,
    unknowPosition: "any"
  },
  "3": {
    digitsAmountMax: 1,
    elementsAmount: 3,
    unknownAmount: 1,
    unknowPosition: "resultOnly"
  },
  "4": {
    digitsAmountMax: 1,
    elementsAmount: 3,
    unknownAmount: 1,
    unknowPosition: "any"
  },
  "5": {
    digitsAmountMax: 1,
    elementsAmount: 3,
    unknownAmount: 2,
    unknowPosition: "resultOnly"
  },
  "6": {
    digitsAmountMax: 1,
    elementsAmount: 3,
    unknownAmount: 2,
    unknowPosition: "any"
  },
  "7": {
    digitsAmountMax: 2,
    elementsAmount: 3,
    unknownAmount: 1,
    unknowPosition: "resultOnly"
  },
  "8": {
    digitsAmountMax: 2,
    elementsAmount: 3,
    unknownAmount: 1,
    unknowPosition: "any"
  },
  "9": {
    digitsAmountMax: 2,
    elementsAmount: 3,
    unknownAmount: 2,
    unknowPosition: "resultOnly"
  },
  "10": {
    digitsAmountMax: 2,
    elementsAmount: 3,
    unknownAmount: 2,
    unknowPosition: "any"
  },
}

4. Проведем декомпозицию
<App> - корневой компонент
  <ViewSettings> - страница настроек
  <ViewPlay> - страница игры
    <TimeCountdown> - таймер времени в игре
    <Expression> - выражение для расчета
    <Calculator> - калькулятор
  <ViewResults> - страница результатов