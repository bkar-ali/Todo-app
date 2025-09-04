import Marquee from "react-fast-marquee";
import { AnimatePresence } from "framer-motion";
// import { title } from "framer-motion/client";
// import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
// let { pageColor } = useContext(colorContext);
// import { useContext } from "react";ى
import AddIcon from "@mui/icons-material/Add";
import Todo from "./Todo";
import Sweat from "./Sweat";
//? useReducer & Context Data Transform
import { useContext, useEffect } from "react";
import { TodoContext } from "../Context/TodoContext";
import TodosReducer from "./TodosReducer";
// TODO UUID
import { Margin, PaymentOutlined } from "@mui/icons-material";
// uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
import { useMemo } from "react";

export default function TodoList() {
  let { dispatch, todo, /*setTodo,*/ filter, todo2 } = useContext(TodoContext);

  //!! let [todo, dispatch] = useReducer(TodosReducer, []);
  let filterTodos = useMemo(() => {
    if (filter === "all") {
      return todo;
    } else if (filter === "done") {
      return todo.filter((t) => t.isCompleted);
    } else if (filter === "not") {
      return todo.filter((t) => !t.isCompleted);
    }
  }, [todo, filter]);
  // if (filter === "all") {
  //   console.log("HEY");
  //   filterTodos = todo;
  // } else if (filter === "done") {
  //   filterTodos = todo.filter((t) => t.isCompleted);
  // } else if (filter === "not") {
  //   filterTodos = todo.filter((t) => !t.isCompleted);
  // }

  /* //? Instead Of Context
  let [todo, setTodo] = useState([
    {
      id: uuidv4(),
      title: "React",
      Details: "Study This Course",
      isCompleted: false,
    },
    {
      id: uuidv4(),
      title: "React",
      Details: "Study This Course",
      isCompleted: false,
    },
  ]);
  */

  useEffect(() => {
    //!! Reducer
    dispatch({
      type: "get",
      payload: {
        init: todo2,
      },
    });
    // console.log("USEEEEEEEEEEEE");
    // if (!localStorage.getItem("todo")) {
    //   localStorage.setItem("todo", JSON.stringify(todo));
    // }
    // let storageTodos = JSON.parse(localStorage.getItem("todo"));
    // setTodo(storageTodos);
  }, []);

  async function handleAddTask() {
    let result = await Sweat();
    if (result.isConfirmed) {
      dispatch({
        type: "added",
        payload: {
          title: result.value.title,
          details: result.value.details,
        },
      });
    }
    //! Reducer
    // let result = await Sweat();
    // if (result.isConfirmed) {
    //   let newTask = {
    //     id: uuidv4(),
    //     title: result.value.title,
    //     details: result.value.details,
    //     isCompleted: false,
    //   };
    //   let updated = [...todo, newTask];
    //   setTodo(updated);
    //   localStorage.setItem("todo", JSON.stringify(updated));
    // }
  }
  // ! Faded Border Line
  let borderLine = {
    borderBottom: "2px solid",
    borderImage: "linear-gradient(to right, transparent, gray, transparent) 1",
  };

  return (
    <div
      className="relative overflow-hidden bg-sky-50 dark:bg-[rgb(33,33,33)] px-10 duration-300 min-w-[33%] flex-grow"
      // style={{ backgroundColor: "#191b1f" }}
    >
      <div className="absolute top-[65%] left-0 w-full opacity-10 z-0">
        <Marquee speed={40} gradient={false}>
          <span className="text-[100px] font-bold text-gray-700 dark:text-gray-700 mx-10">
            TODO LIST • TODO LIST • TODO LIST • TODO LIST •
          </span>
        </Marquee>
      </div>
      <div className="z-10">
        <h2
          className="text-black dark:text-white text-5xl font-bold py-5 text-center"
          style={borderLine}
        >
          Todo-List
        </h2>
        <AnimatePresence mode="wait">
          {filter === "all" && (
            <motion.div
              // key="add-task"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center text-black dark:text-white pt-3 pb-3 mb-3 ml-5 cursor-pointer duration-300"
              style={borderLine}
              onClick={handleAddTask}
            >
              <span className="mr-3">
                <AddIcon />
              </span>
              Add New Task
            </motion.div>
          )}
        </AnimatePresence>
        {filterTodos.length === 0 && (
          <motion.div
            className="pt-3 pb-3 mb-3 text-center font-semibold text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-black dark:text-white">No Tasks To Show</div>
          </motion.div>
        )}
        <div className="max-h-[73vh] overflow-y-auto overflow-x-hidden">
          <AnimatePresence>
            {filterTodos.map((t) => (
              <Todo key={t.id} todoObject={t} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
