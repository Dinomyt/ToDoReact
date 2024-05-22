import Styles from "./Todo.module.css";
import { useState, ChangeEvent } from "react";

interface TodoItem {
  id: number;
  todo: string;
  completed: boolean;
}

const Todo = () => {
  const [input, setInput] = useState("");
  const [list, setList] = useState<TodoItem[]>([]);
  const [editValue, setEditValue] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const addTodo = () => {
    if (input.trim() === "") return;

    const newTodo: TodoItem = {
      id: Math.floor(Date.now() + Math.random() * 1000),
      todo: input,
      completed: false,
    };

    setList([...list, newTodo]);
    setInput("");
  };

  const removeTodo = (id: number) => {
    setList(list.filter((item) => item.id !== id));
  };

  const editTodo = (id: number, edit: string) => {
    setList(
      list.map((item) => (item.id === id ? { ...item, todo: edit } : item))
    );
  };

  const startEditing = (item: TodoItem) => {
    setEditId(item.id);
    setEditValue(item.todo);
  };

  const saveEdit = (id: number) => {
    editTodo(id, editValue);
    setEditId(null);
    setEditValue("");
  };

  const handleEditChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditValue(event.target.value);
  };

  const toggleComplete = (id: number) => {
    setList(
      list.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <h1 className="text-center">Todo List</h1>
          <input type="text" value={input} onChange={handleInputChange} />
          <button className={Styles.addButton} onClick={addTodo}>
            Add
          </button>
        </div>
        <div className="row">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Todo</th>
                <th scope="col">Completed?</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <tr key={item.id}>
                  <th scope="col">{item.id}</th>
                  <td
                    style={{
                      textDecoration: item.completed ? "line-through" : "none",
                    }}
                  >
                    {editId === item.id ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={handleEditChange}
                      />
                    ) : (
                      item.todo
                    )}
                  </td>
                  <td className={Styles.centerContent}>
                    <>
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleComplete(item.id)}
                      />
                    </>
                  </td>
                  <td>
                    {editId === item.id ? (
                      <button
                        onClick={() => saveEdit(item.id)}
                        className={Styles.removeButton}
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => removeTodo(item.id)}
                          className={Styles.removeButton}
                        >
                          Remove
                        </button>
                        /
                        <button
                          onClick={() => startEditing(item)}
                          className={Styles.removeButton}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Todo;
