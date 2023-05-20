import { createSlice } from "@reduxjs/toolkit";

// GETTING FROM LOCALSTORAGE DATA OTHERWISE RETURN []
const getInitialTodos = () => {
  const localTodoList = window.localStorage.getItem("todoList");
  if (localTodoList) {
    return JSON.parse(localTodoList);
  }
  window.localStorage.setItem("todoList", JSON.stringify([]));
  return [];
};

const initialValue = {
  todoList: getInitialTodos(),
  todo: {},
};

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialValue,
  reducers: {
    // ACTION FOR ADD NEW TODO
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      // CHECK FOR TODO LIST IS EXIST IN LS
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        // I'M PUSHING NEW TODO IN EXISTED TODO LIST IN LS
        todoListArr.push({
          ...action.payload,
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
      } else {
        window.localStorage.setItem(
          "todoList",
          JSON.stringify([{ ...action.payload }])
        );
      }
    },
    // ACTION PERFORM FOR DELETE TODO BY ID
    deleteTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        // APPLY FOREACH AND SPLICE THE REQ ID TODO FROM LIST
        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoListArr.splice(index, 1);
          }
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
    // ACTION PERFORM FOR UPDATE TODO BY ID
    updateTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        // APPLY FOREACH AND THE REQ ID TODO REPLACE WITH NEW DATA IN LIST
        todoListArr.forEach((todo) => {
          if (todo.id === action.payload.id) {
            todo.title = action.payload.title;
            todo.desc = action.payload.desc;
          }
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
    // ACTION PERFORM FOR GETTING SINGLE TODO DETAILS
    todoDetails: (state, action) => {
      state.todo = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, todoDetails } =
  todoSlice.actions;
export default todoSlice.reducer;
