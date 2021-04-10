import { FC, ReactElement, useRef } from "react";

//const Add = (onSubmit: Function) => {
const Add: FC<{onSubmit:Function}> = (({ onSubmit }): ReactElement => {

  //для упрощения получения значения текста нового элемента
  //будем пользоваться рефом на соотв. инпут
  const inputEl = useRef<HTMLInputElement>(null);

  //обработчик события клика по кнопке
  //получаем value инпута по его рефу и передаем в родительский компонент через параметр-функцию onSubmit
  const handleSubmit = () => {
    let taskText: string = '';
    if(inputEl && inputEl.current) {
      taskText = inputEl.current.value;
      if(taskText !== '') {
        inputEl.current.value = '';
        onSubmit(taskText);  
      }
    }
  }

  return (
     <div className="container-fluid ms-0 p-0 mt-3">
        <form className="d-flex">
          <input  className="form-control me-2"
                  type="search"
                  placeholder="Название задачи"
                  required
                  ref={inputEl}
                  aria-label="Добавить" />
          <button className="btn btn-primary" type="button" onClick={handleSubmit}>Добавить</button>
        </form>
      </div>
  );
});

export default Add;
