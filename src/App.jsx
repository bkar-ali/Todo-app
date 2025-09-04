// ? Choose Colors
// ? Menu Page Over The Content
// ? Menu Page Remove List
// ? Menu Page Closed Center'
// ? Dark Mood
// ? Switch Color To All The Content
// TODO Start Page Before The Main Page
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TodosReducer from "./Components/TodosReducer";

import "./index.css";
// import Reducer from "./Reducer";
// import "./app.css";
import Menu from "./Components/Menu Componets/Menu";
import { colorContext } from "./Context/colorContext";
import { TodoContext } from "./Context/TodoContext";
import { useState, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./Components/TodoList";
// import { data } from "autoprefixer";
function App() {
  //! Colors Control
  let getColor = JSON.parse(localStorage.getItem("dataColor"));
  let [bgColor, setBgColor] = useState(getColor.bgColor || "#0000ff36");
  let [pageColor, setPageColor] = useState(getColor.pageColor || "blue");
  let [sidecolor, setSidecolor] = useState(getColor.sidecolor || "#3b82f6");
  let [filter, setFilter] = useState("all");
  let [selectedID, setSelectedID] = useState(getColor.selectedID || 1);

  let dataColor = {
    bgColor: bgColor,
    pageColor: pageColor,
    sidecolor: sidecolor,
    selectedID: selectedID,
  };

  localStorage.setItem("dataColor", JSON.stringify(dataColor));

  //! Data Transform
  // let init = [
  //   {
  //     id: uuidv4(),
  //     title: "React Tarmez",
  //     details: "Study This Course",
  //     isCompleted: false,
  //   },
  //   {
  //     id: uuidv4(),
  //     title: "React Tarmezzzz",
  //     details: "Study This Coursezzz",
  //     isCompleted: true,
  //   },
  // ];

  let [todo, dispatch] = useReducer(TodosReducer, []);
  let [todo2, setTodo] = useState([
    {
      id: uuidv4(),
      title: "React Tarmez",
      details: "Study This Course",
      isCompleted: false,
    },
    {
      id: uuidv4(),
      title: "React Tarmezzzz",
      details: "Study This Coursezzz",
      isCompleted: true,
    },
  ]);

  return (
    <div className="">
      <colorContext.Provider
        value={{
          selectedID,
          setSelectedID,
          sidecolor,
          setSidecolor,
          bgColor,
          setBgColor,
          pageColor,
          setPageColor,
        }}
      >
        {/* grid grid-cols-3 gap-3 */}
        <div className="">
          <div className="flex h-[100vh] ">
            <TodoContext.Provider
              value={{ todo2, dispatch, todo, setTodo, filter, setFilter }}
            >
              <Menu />
              <TodoList />
            </TodoContext.Provider>
            {/* <Task /> */}
          </div>
        </div>
      </colorContext.Provider>
      <ToastContainer />
      {/* <Reducer /> */}
    </div>
  );
}

export default App;

/*
? Tailw d
? MUI & MUI Icons

TODO import MenuBookIcon from '@mui/icons-material/MenuBook'; //? Colors (Presets)
TODO import BedtimeIcon from '@mui/icons-material/Bedtime'; //? Night Mode
TODO import AddIcon from '@mui/icons-material/Add'; //? Add Icon  

*/

/*
TODO
✅ المطلوب:
الـ Menu تظهر فوق المحتوى (مش جزء منه).

تكون position: fixed.

لما تتفتح تغطي جزء من الشاشة (مثلاً 400px من اليسار).

وتكون بـ animation / transition.

وتقدر تقفلها بزر.

✨ خطوات التنفيذ:
✅ 1. عدل الـ Wrapper بتاع الـ Menu:
jsx
Copy
Edit
<div
  className="fixed top-0 left-0 h-full bg-gray-200 rounded-s-lg duration-300 z-50 shadow-lg"
  style={{ width: menuToggle ? "400px" : "90px" }}
>
✅ 2. عدل مكانه بالنسبة لباقي الصفحة:
ضيف شرط عشان لما يتقفل يسحب نفسه شمال.

jsx
Copy
Edit
<div
  className={`fixed top-0 left-0 h-full bg-gray-200 duration-300 z-50 shadow-lg`}
  style={{
    width: menuToggle ? "400px" : "90px",
    transform: menuToggle ? "translateX(0)" : "translateX(-100%)",
  }}
>
🔔 كده لما تضغط على زر الإعدادات (Checkbox)، هيظهر ويختفي على شكل Overlay.

✅ 3. (اختياري) ضيف خلفية معتمة لما المينيو تتفتح:
🔧 أضف في الأب (مثلاً App.js):
jsx
Copy
Edit
{menuToggle && (
  <div
    className="fixed top-0 left-0 w-screen h-screen bg-black/50 z-40"
    onClick={() => setMenuToggle(false)}
  ></div>
)}
<Menu />
الـ z-40 للـ Background
الـ z-50 للـ Menu

✅ النتيجة:
المينيو بقت طبقة مستقلة (Overlay).

فيها Animation.

بتتقفل لما تضغط خارجها.

مناسبة جدًا للموبايل والديسكتوب.

🧠 لو عاوز:
تضيف Animation انسيابي أكثر بـ Tailwind.

أو تخليها تطلع من اليمين مش الشمال.

أو تتحكم فيها بـ مفتاح ESC.

كل ده أقدر أجهزهولك، بس قولي شكل الاستخدام النهائي اللي تحبه ❤️



#191b1f

*/
