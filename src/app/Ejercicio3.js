import { useState } from 'react';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Comprar leche', done: true },
  { id: 1, title: 'Comer tacos', done: false },
  { id: 2, title: 'Preparar té', done: false },
];

export default function TaskApp() {
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAddTodo(title) {
    //Controlamos que no este vacío
    if(title != ""){
      setTodos([
        //Introducimos nuevo valor al array
        {id: nextId++,
          title: title,
          done: false
        },
        //hacemos copia de todo el resto
      ...todos])
    }
  }

  function handleChangeTodo(nextTodo) {
    const todo = todos.map(todo => {
      if(todo.id === nextTodo.id){
        return {...todo, title:nextTodo.title, done: nextTodo.done}
      }else{
        return todo
      }
    })
    setTodos(todo)
  }

  function handleDeleteTodo(todoId) {
    setTodos(todos.filter(todo => todo.id !== todoId))
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
