import { useState } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const useTodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), title: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: number, completed: boolean) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !completed } : todo))
    );
  };

  const startEdit = (id: number, title: string) => {
    setEditingId(id);
    setEditText(title);
  };

  const saveEdit = () => {
    setTodos(
      todos.map((todo) => (todo.id === editingId ? { ...todo, title: editText } : todo))
    );
    setEditingId(null);
    setEditText('');
  };

  return {
    todos,
    newTodo,
    editingId,
    editText,
    setNewTodo,
    setEditText,
    addTodo,
    deleteTodo,
    toggleComplete,
    startEdit,
    saveEdit,
    setEditingId,
  };
};

export { useTodoApp };


