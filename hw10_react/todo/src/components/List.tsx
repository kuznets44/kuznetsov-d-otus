import { FC, ReactElement } from "react";
import { ToDo } from "../interfaces/ToDo";

const List: FC<{todoList:ToDo[], onChangeItem:Function}> = (({ todoList = [], onChangeItem }): ReactElement => {

  //обработчик события изменения состояния флажка элемента
  //получаем value флажка, равный id элемента, и передаем в родительский компонент через параметр-функцию onChangeItem
  const handleChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChangeItem(e.target.value);
  }

  const listItems = todoList.map((item) =>
    <li className={["list-group-item", item.isCompleted ? "completed" : ""].join(' ')} key={item.id}>
      <input  className="form-check-input me-1" type="checkbox"
              checked={item.isCompleted}
              value={item.id}
              onChange={handleChange}
              aria-label="..." />
      {item.text}
    </li>
  );
  return (
    <ul className="list-group mt-5">
      {listItems}
    </ul>
  );
});

export default List;