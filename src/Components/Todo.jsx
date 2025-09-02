// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import Swal from "sweetalert2";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

//? Context Data Transform
import { useContext, useReducer } from "react";
import { TodoContext } from "../Context/TodoContext";
import TodosReducer from "./TodosReducer";
import { details, title } from "framer-motion/client";
import { Title } from "@mui/icons-material";
// if (filter === "all") {
// import { title } from "framer-motion/client";

const Todo = ({ todoObject }) => {
  let { dispatch /*todo,setTodo*/ } = useContext(TodoContext);
  //!! let [todo, dispatch] = useReducer(TodosReducer, []);
  function handelClick(e) {
    //!! Reducer
    dispatch({
      type: "check",
      payload: {
        id: todoObject.id,
        e: e,
      },
    });
    // let updatedTodos = todo.map((task) =>
    //   task.id === todoObject.id
    //     ? { ...task, isCompleted: e.target.checked }
    //     : task
    // );
    // setTodo(updatedTodos);
    // localStorage.setItem("todo", JSON.stringify(updatedTodos));
  }
  function editSweat(title, details) {
    return Swal.fire({
      title: "Edit Task",
      html: `<input class="swal2-input title" placeholder="Edit Title" value="${title}"/>
        <input class="swal2-input details" placeholder="Edit Details" value="${details}"/>
        `,
      showCancelButton: true,
      confirmButtonText: "Edit",
      focusConfirm: false,
      preConfirm: () => {
        const titleValue = document.querySelector(".title").value;
        const detailsValue = document.querySelector(".details").value;

        if (!titleValue || !detailsValue) {
          Swal.showValidationMessage("Please fill in both fields");
        }

        return { title: titleValue, details: detailsValue };
      },

      customClass: {
        confirmButton: "bg-[#7066e0]",
        cancelButton: "bg-[#6e7881]",
      },
    });
  }

  function handelDeleteClick() {
    dispatch({
      type: "deleted",
      payload: {
        id: todoObject.id,
      },
    });
    //! Reducer
    //   let updateDelete = todo.filter((task) => task.id !== todoObject.id);
    // setTodo(updateDelete);
    // localStorage.setItem("todo", JSON.stringify(updateDelete));
  }

  async function handelEditClick() {
    let result = await editSweat(todoObject.title, todoObject.details);
    if (result.isConfirmed) {
      dispatch({
        type: "edit",
        payload: {
          id: todoObject.id,
          title: result.value.title,
          details: result.value.details,
        },
      });
    }
  }
  //   let result = await editSweat();
  //   if (result.isConfirmed) {
  //     let updateEdit = todo.map((task) =>
  //       task.id === todoObject.id
  //         ? {
  //             ...task,
  //             title: result.value.title,
  //             details: result.value.details,
  //           }
  //         : task
  //     );
  //     setTodo(updateEdit);
  //     localStorage.setItem("todo", JSON.stringify(updateEdit));
  //   }
  // }
  return (
    <motion.div
      key={todoObject.id}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.3 }}
      className="my-1"
    >
      <Accordion sx={{ background: "#283593", color: "white" }}>
        <div className="hover:py-2 duration-300 transition-all">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">
              <div className="flex items-center">
                <Checkbox
                  checked={todoObject.isCompleted}
                  onClick={(e) => {
                    e.stopPropagation();
                    handelClick(e);
                  }}
                  {...label}
                  // defaultChecked
                  color="success"
                />
                <div
                  style={{
                    textDecoration: todoObject.isCompleted
                      ? "line-through"
                      : "",
                  }}
                >
                  {todoObject.title}
                </div>
              </div>
              {/* <Button
                variant="contained"
                color="success"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                sx={{ marginRight: "20px" }}
              >
                Done
              </Button> */}
            </Typography>
          </AccordionSummary>
        </div>
        <AccordionDetails>
          {todoObject.details}
          <Stack
            direction="row"
            spacing={2}
            sx={{ marginTop: "20px", marginBottom: "10px" }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handelEditClick}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                Swal.fire({
                  title: "Delete?",
                  text: "Are You Sure, Want To Delete?",
                  icon: "question",
                  confirmButtonText: "Delete",
                  showCancelButton: true,
                  customClass: {
                    confirmButton: "bg-[#7066e0]",
                    cancelButton: "bg-[#6e7881]",
                  },
                }).then((result) => {
                  if (result.isConfirmed) {
                    handelDeleteClick();
                    toast.success("Task deleted successfully!", {
                      position: "bottom-right",
                      autoClose: 4000,
                      closeOnClick: true,
                      pauseOnHover: false,
                      closeButton: false,
                    });
                    // Swal.fire({
                    //   title: "Deleted!",
                    //   icon: "success",
                    //   draggable: true,
                    //   customClass: {
                    //     confirmButton: "bg-[#7066e0]",
                    //   },
                    // });
                  }
                });
              }}
            >
              Delete
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </motion.div>
  );
};

export default Todo;
