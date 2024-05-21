import Styles from './Todo.module.css'
import { useState, ChangeEvent } from 'react';

interface TodoItem {
  id: number;
  todo: string;
}

const Todo = () => {
  const [input, setInput] = useState('');
  const [list, setList] = useState<TodoItem[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const addTodo = () => {
    if (input.trim() === '') return;

    const newTodo: TodoItem = {
      id: Math.random(),
      todo: input
    };

    setList([...list, newTodo]);
    setInput('');
  };

  const removeTodo = (id: number) => {
    setList(list.filter(item => item.id !== id));
  };

  return (
    <>
      <div className={Styles.myContainer}>
        <div className="row">
          <h1>Todo List</h1>
          <input type="text" value={input} onChange={handleInputChange} />
          <button className={Styles.addButton} onClick={addTodo}>Add</button>
        </div>
        <table>
          <thead>
            <tr>
            <th style={{ textAlign: 'left' }}>To do</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.id}>
                <td>{item.todo}</td>
                <td>
                  <button onClick={() => removeTodo(item.id)} className={Styles.removeButton}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Todo;
