import React, { useState } from 'react';

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

const useTodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const newTodoItem: Todo = {
        id: Math.random().toString(36).substring(2, 9),
        title: newTodo.trim(),
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const toggleComplete = (id: string, completed: boolean) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEdit = (id: string, title: string) => {
    setEditingId(id);
    setEditText(title);
  };

  const saveEdit = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editingId ? { ...todo, title: editText } : todo
      )
    );
    setEditingId(null);
    setEditText('');
  };

  return {
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
    setEditingId,
  };
};

export default useTodoApp;