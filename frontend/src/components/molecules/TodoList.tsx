import React from 'react';
import TodoItem from '../atoms/TodoItem.tsx';
import { Todo } from '../../types/todoType.ts';

interface TodoListProps {
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;