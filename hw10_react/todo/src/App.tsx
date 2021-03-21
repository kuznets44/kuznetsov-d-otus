import logo from './logo.svg';
import Filter from './components/Filter';
import Add from './components/Add';
import List from './components/List';
import { FC, useState } from 'react';

//интерфейсы для списка и фильтра
import { ToDo } from './interfaces/ToDo';
import { FilterItem } from './interfaces/FilterItem';

const App:FC = () => {

  const appTitle: string = 'ToDo List';

  //определяем состояние для списка
  const [list, setList] = useState<ToDo[]>([]);

  //состояние фильтра
  const [filter, setFilter] = useState<FilterItem[]>([
    {
      id: 'all',
      active: true,
      text: 'Все',
    },
    {
      id: 'completed',
      active: false,
      text: 'Завершенные',
    },
    {
      id: 'active',
      active: false,
      text: 'Активные',
    },
  ]);

  //функция-обработчик события добавления элемента в список. Вызывается из дочернего компонента
  const addToDoItem:Function = (text:string) => {
    let listToAdd = [...list];
    listToAdd.push({
      id: list.length + 1,
      text: text,
      isCompleted: false
    });
    console.log(listToAdd);
    setList(listToAdd);
  }

  //функция-переключатель состояния элемента. Вызывается из дочернего компонента
  const toggleToDoItem:Function = (id:number) => {
    let itemInList = list.find( listItem => listItem.id == id);
    console.log('itemInList',itemInList);
    if(itemInList) {
      itemInList.isCompleted = !itemInList?.isCompleted;
      setList([...list]);
    }    
  }

  //функция-обработчик события клика по фильтру. Вызывается из дочернего компонента
  const processFilter:Function = (code: string) => {
    const newFilter = filter.map( item => {
      item.active = item.id === code ? true : false;
      return item;
    });
    setFilter(newFilter);
  }

  //в компоненте списка должен отображаться список задач с учетом фильтра
  //формируем его здесь
  const currentFilter = filter.find( item => item.active === true);
  let listFiltered = [...list];
  if(currentFilter) {
    switch(currentFilter.id) {
      case 'active':
        listFiltered = list.filter( item => item.isCompleted === false);
        break;
      case 'completed':
        listFiltered = list.filter( item => item.isCompleted === true);
        break;
      }
  }

  return (
    <div className="container mt-3">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <img className="float-start" alt={appTitle} height="45" src={logo} /><h1 className="toobar-header">{appTitle}</h1>
        </div>
        <div className="card-body">
          <Filter items={filter} onClickItem={processFilter} />
          <List todoList={listFiltered} onChangeItem={toggleToDoItem} />
          <Add onSubmit={addToDoItem} />
        </div>
      </div>
    </div>
  );
}

export default App;
