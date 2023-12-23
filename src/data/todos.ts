import {v4 as uuid} from 'uuid';

export type Todo = {
  id: string;
  name: string;
  done: boolean;
};

export type TodoFilter = 'all' | 'active' | 'completed';

export let todos: Todo[] = [];
createTodo('Learn Astro', true);
createTodo('Learn htmx');

export function clearCompleted() {
  todos = todos.filter(todo => !todo.done);
}

export function createTodo(name: string, done = false) {
  const newTodo = {id: uuid(), name, done};
  todos.push(newTodo);
  return newTodo;
}

export function deleteById(id: string) {
  todos = todos.filter(todo => todo.id !== id);
}

export function getActiveItemsCount() {
  return todos.filter(todo => !todo.done).length;
}

export function getCompletedItemsCount() {
  return todos.filter(todos => todos.done).length;
}

export function getItemsLeft() {
  return todos.filter(todo => !todo.done).length;
}

export function getTodoById(id: string) {
  return todos.find(todo => todo.id === id);
}

export function getTodos(filter: TodoFilter) {
  return filter === 'active'
    ? todos.filter(todo => !todo.done)
    : filter === 'completed'
      ? todos.filter(todo => todo.done)
      : todos;
}

export function updateTodo(id: string, data: Partial<Exclude<Todo, 'id'>>) {
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) throw new Error(`Todo "${id}" not found`);
  todos[index] = {...todos[index], ...data} as Todo;
  return todos[index]!;
}
