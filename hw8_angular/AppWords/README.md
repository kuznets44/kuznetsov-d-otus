ДОМАШНЕЕ ЗАДАНИЕ ДЛЯ БЛОКА ANGULAR
---------------------------------------
Структура приложения для запоминания иностранных слов
Приложение для запоминания иностранных слов.
В этом приложении пользователь сможет добавлять слова для изучения, проходить тесты для запоминания слов.
Это Single Page Application состоит из 3 страниц:
- Последние добавленные слова (Recently Added)
- Упражнениями (Go)
- Настройки (Settings)
На главном экране, на странице Recently Added пользователь видит список последних добавленных слов, может добавить новое слово в словарь.

На странице упражнений пользователь занимается тестированием своих знаний. Ему показывается слово на одном языке, и он должен написать его перевод на другой язык. Если перевод правильный, слово засчитывается, иначе показываем ошибку. Мы начнем с двух языков - русского и английского, будем расширять возможности приложения по мере написания программы.

На странице настроек пользователь выбирает языки, количество слов в упражнении, отводимое на упражнение время.

Навигация по страницам происходит с помощью ссылок в верхней части страниц, каждой странице соответствует отдельный url.

---

Декомпозировать приложение для запоминания иностранных слов.
Создать структуру и компоненты контейнеры приложения.

Создать сервисы для работы с текстом
- Сервис перевода слова - должен запрашивать перевод через API (например, https://tech.yandex.com/translate/)
- Сервис хранения словаря - небольшая обертка для управления словарем с помощью `localStorage`
- Сервис добавления слов - должен разбивать текст на отдельные слова, запрашивать их перевод и сохранять в словарь для приложения.

Сервисы должны общаться с помощью библиотеки `RxJS`.



РЕШЕНИЕ
Учитывая состав макетов приложения https://i.imgur.com/7N8inuG.png
предлагается следующая декомпозиция на компоненты

1. Корневой компонент, класс AppComponent, селектор <app-root>, как контейнер для дочерних компонентов
2. Компонент табов, класс TabsComponent, селектор <app-tabs>, который будет выполнять роль панели навигации
3. Компонент для страницы Recently Added, класс PageRecentlyAddedComponent, селектор <app-page-recenlty-added>. Будет служить контейнером для компонентов страницы (см. пп.4,5)
4. Компонент для вывода списка добавленных слов, WordsListComponent, селектор <app-words-list>. Будет размещаться внутри компонента из п.3
5. Компонент-форма для добавления нового слова, класс NewWordComponent, селектор <app-new-word>.  Будет размещаться внутри компонента из п.3
6. Компонент для страницы Education, класс PageEducationComponent, селектор <app-page-education>. Будет служить контейнером для компонентов страницы
7. Компонент-форма для проведения тестирования, класс EducationComponent, селектор <app-education>
8. Компонент для страницы настроек, класс PageSettingsComponent, селектор <app-page-settings>. Будет служить контейнером для компонентов страницы
9. Компонент-форма настроек, класс SettingsFormComponent, селектор <app-settings-form>

                            ----------------------------------
                            |           AppWords             |
                            ----------------------------------
                                            |
                               ----------------------------
                               |      TabsComponent       |
                               ----------------------------
                                            |
                    ---------------------------------------------------------------------
                    |                                       |                           |
      -------------------------------             --------------------------  --------------------------
      | PageRecentlyAddedComponent  |             | PageEducationComponent |  |  PageSettingsComponent |                   
      -------------------------------             --------------------------  --------------------------
              |                                             |                           |
         ----------------------------                       |                           |
         |                          |                       |                           |
   ----------------------  --------------------   ----------------------      -------------------------
   | WordsListComponent |  | NewWordComponent |   | EducationComponent |      | SettingsFormComponent |
   ----------------------  --------------------   ----------------------      -------------------------