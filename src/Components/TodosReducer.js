import { v4 as uuidv4 } from "uuid";
import Sweat from "./Sweat";

export default function TodosReducer(currentTodos, action) {
  switch (action.type) {
    case "added": {
      let newTask = {
        id: uuidv4(),
        title: action.payload.title,
        details: action.payload.details,
        isCompleted: false,
      };
      let updated = [...currentTodos, newTask];
      localStorage.setItem("todo", JSON.stringify(updated));
      return updated;
    }
    case "deleted": {
      let updateDelete = currentTodos.filter(
        (task) => task.id !== action.payload.id
      );
      localStorage.setItem("todo", JSON.stringify(updateDelete));
      return updateDelete;
    }
    case "edit": {
      let updateEdit = currentTodos.map((task) =>
        task.id === action.payload.id
          ? {
              ...task,
              title: action.payload.title,
              details: action.payload.details,
            }
          : task
      );
      localStorage.setItem("todo", JSON.stringify(updateEdit));
      return updateEdit;
    }
    case "get": {
      if (!localStorage.getItem("todo")) {
        localStorage.setItem("todo", JSON.stringify(action.payload.init));
      }
      let storageTodos = JSON.parse(localStorage.getItem("todo"));
      return storageTodos;
    }
    case "check": {
      let updatedTodos = currentTodos.map((task) =>
        task.id === action.payload.id
          ? { ...task, isCompleted: action.payload.e.target.checked }
          : task
      );
      localStorage.setItem("todo", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    default: {
      throw Error("Unknown Action" + action.type);
    }
  }
  return [];
}
