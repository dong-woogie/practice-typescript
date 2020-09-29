import { deprecated, createReducer, ActionType } from "typesafe-actions";
const { createStandardAction } = deprecated;

let nextId = 1;

const ADD_TODO = "todos/ADD_TODO" as const;
const TOGGLE_TODO = "todos/TOGGLE_TODO";
const REMOVE_TODO = "todos/REMOVE_TODO";

export const addTodo = (text: string) => ({
  type: ADD_TODO,
  payload: {
    id: nextId++,
    text,
  },
});
export const toggleTodo = createStandardAction(TOGGLE_TODO)<number>();
export const removeTodo = createStandardAction(REMOVE_TODO)<number>();

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export type TodoState = Todo[];

const initialState: TodoState = [];

const actions = { addTodo, removeTodo, toggleTodo };
type TodoAction = ActionType<typeof actions>;

const todos = createReducer<TodoState, TodoAction>(initialState, {
  [ADD_TODO]: (state, action) =>
    state.concat({
      ...action.payload,
      done: false,
    }),
  [TOGGLE_TODO]: (state, action) =>
    state.map((todo) =>
      todo.id === action.payload ? { ...todo, done: !todo.done } : todo
    ),
  [REMOVE_TODO]: (state, action) =>
    state.filter((todo) => todo.id !== action.payload),
});

export default todos;
