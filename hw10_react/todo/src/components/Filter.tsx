import { FC, ReactElement, useState } from "react";
import { FilterItem } from "../interfaces/FilterItem";

const Filter: FC<{ items:FilterItem[], onClickItem:Function }> = (({ items = [], onClickItem }): ReactElement => {

  //состояние меню
  const [menuExpanded, setMenuExpanded] = useState(false);
  
  //обработчик события клика по фильтру
  //получаем код текущего элемента фильтра и передаем в родительский компонент через параметр-функцию onCLickItem
  const handleClick:React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if(e.target instanceof HTMLAnchorElement) {
      onClickItem(e.target.dataset.code);
    }
  }

  //готовим элементы фильтра к выводу
  const filterList = items.map( (item) => 
    <li className="nav-item" key={item.id}>
      <a className={["nav-link",item.active ? "active" : ""].join(' ')} aria-current="page" data-code={item.id} onClick={handleClick}>{item.text}</a>
    </li>
  );

  //выводим
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <span className="navbar-brand" >Показать задачи:</span>
        <button className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded={menuExpanded}
                onClick={() => setMenuExpanded(!menuExpanded)}
                aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={["collapse","navbar-collapse", menuExpanded ? "show" : ""].join(' ')} id="navbarSupportedContent">
          <ul className="navbar-nav navbar-nav__filter me-auto mb-2 mb-lg-0 ">
            {filterList}
          </ul>
        </div>
      </div>
    </nav>
  );
});

export default Filter;