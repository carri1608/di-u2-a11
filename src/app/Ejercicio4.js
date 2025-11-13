import { useState } from 'react';
import { useImmer } from 'use-immer';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Comprar leche', done: true },
  { id: 1, title: 'Comer tacos', done: false },
  { id: 2, title: 'Preparar té', done: false },
];

export default function TaskApp() {
  const [todos, updateTodos] = useImmer(
    initialTodos
  );

  function handleAddTodo(title) {
    if(title !== ""){
      updateTodos(draft => 
        {draft.push({id: nextId++,
            title: title,
            done: false
          })
        }
      )
    }
  }

  function handleChangeTodo(nextTodo) {
    updateTodos(draft =>{
      const todo = draft.find(t =>
      t.id === nextTodo.id
      );
      todo.title = nextTodo.title;
      todo.done = nextTodo.done;
    })
  }

  function handleDeleteTodo(todoId) {
    const index = todos.findIndex(todo => todo.id === todoId)
    updateTodos(draft => {draft.splice(index,1)})
    
  }

  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
