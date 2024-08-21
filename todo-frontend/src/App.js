import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Check, X } from 'lucide-react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch('http://localhost:8080/todos');
    const data = await response.json();
    setTodos(data);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const response = await fetch('http://localhost:8080/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodo, completed: false }),
    });

    if (response.ok) {
      setNewTodo('');
      fetchTodos();
    }
  };

  const toggleComplete = async (id, completed) => {
    const response = await fetch(`http://localhost:8080/todos?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    });

    if (response.ok) {
      fetchTodos();
    }
  };

  const deleteTodo = async (id) => {
    const response = await fetch(`http://localhost:8080/todos?id=${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchTodos();
    }
  };

  const startEdit = (id, title) => {
    setEditingId(id);
    setEditText(title);
  };

  const saveEdit = async () => {
    if (!editText.trim()) return;

    const response = await fetch(`http://localhost:8080/todos?id=${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editText }),
    });

    if (response.ok) {
      setEditingId(null);
      fetchTodos();
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Todo App</h1>
      <form onSubmit={addTodo} className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Add Todo
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between p-2 border-b">
            {editingId === todo.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-grow p-1 border border-gray-300 rounded"
              />
            ) : (
              <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.title}
              </span>
            )}
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id, todo.completed)}
                className="mr-2"
              />
              {editingId === todo.id ? (
                <>
                  <button onClick={saveEdit} className="p-1 text-green-600 hover:text-green-800">
                    <Check size={20} />
                  </button>
                  <button onClick={() => setEditingId(null)} className="p-1 text-red-600 hover:text-red-800">
                    <X size={20} />
                  </button>
                </>
              ) : (
                <button onClick={() => startEdit(todo.id, todo.title)} className="p-1 text-blue-600 hover:text-blue-800">
                  <Edit size={20} />
                </button>
              )}
              <button onClick={() => deleteTodo(todo.id)} className="p-1 text-red-600 hover:text-red-800">
                <Trash2 size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;