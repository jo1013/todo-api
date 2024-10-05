import React from 'react';
import { useTodoApp } from './useTodoApp';
import { Trash2, Edit, Check, X } from 'lucide-react';
const App: React.FC = () => {
  const {
    todos,
    newTodo,
    setNewTodo,
    editingId,
    editText,
    setEditText,
    addTodo,
    toggleComplete,
    deleteTodo,
    startEdit,
    saveEdit,
    setEditingId
  } = useTodoApp();


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Todo App</h1>
      <form onSubmit={addTodo} className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
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

export default App;