import Styles from './Todo.module.css'
import { useState, ChangeEvent } from 'react';

interface TodoItem {
  id: number;
  todo: string;
  completed: boolean;
}

const Todo = () => {
  const [input, setInput] = useState('');
  const [list, setList] = useState<TodoItem[]>([]);
  const [editValue, setEditValue] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const addTodo = () => {
    if (input.trim() === '') return;

    const newTodo: TodoItem = {
      id: Math.random(),
      todo: input,
      completed: false
    };

    setList([...list, newTodo]);
    setInput('');
  };

  const removeTodo = (id: number) => {
    setList(list.filter(item => item.id !== id));
  };

  const editTodo = (id: number, edit: string) => {
    setList(list.map(item => item.id === id ? {...item, todo: edit} : item));
  };

  const startEditing = (item: TodoItem) => {
    setEditId(item.id);
    setEditValue(item.todo);
  };

  const saveEdit = (id: number) => {
    editTodo(id, editValue);
    setEditId(null);
    setEditValue('');
  }

  const handleEditChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditValue(event.target.value);
  };

  const toggleComplete = (id: number) => {
    setList(list.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
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
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.id}>
                <td style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                  {editId === item.id ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={handleEditChange}
                  />
                ) : ( 
                  item.todo
                )}</td>
                <td>
                  {editId === item.id ? (
                    <button onClick={() => saveEdit(item.id)} className={Styles.saveButton}>Save</button>
                  ) : (
                    <>
                    <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleComplete(item.id)}
                      />

                      <button onClick={() => removeTodo(item.id)} className={Styles.removeButton}>Remove</button>
                      <button onClick={() => startEditing(item)} className={Styles.removeButton}>Edit</button>
                      
                    </>
                  )}

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
