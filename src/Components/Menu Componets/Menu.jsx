//TODO Condition &&( هو Logical AND operator بيُستخدم كتريك (short-circuit rendering) لعرض JSX أو تنفيذ حاجة معينة لو الشرط اتحقق.
import "../../app.css";
import { useContext, useState, useEffect } from "react";
import { colorContext } from "../../Context/colorContext";
import { TodoContext } from "../../Context/TodoContext";
//? Icons
import { FaAnchor } from "react-icons/fa6";
import SettingsIcon from "@mui/icons-material/Settings";
import Checkbox from "@mui/material/Checkbox";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import ChecklistIcon from "@mui/icons-material/Checklist";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import SunnyIcon from "@mui/icons-material/Sunny";
import MenuBookIcon from "@mui/icons-material/MenuBook";
//? Icons
import SearchBar from "./SearchBar";
import TasksMenu from "./TasksMenu";
import SwitcherMode from "./SwitcherMode";
import { Tooltip } from "@mui/material";
import { GoSidebarCollapse } from "react-icons/go";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
// import { pink } from "@mui/material/colors";

let menuList = [
  {
    id: 1,
    icon: KeyboardDoubleArrowRightIcon,
    title: "All Tasks",
    filter: "all",
  },
  {
    id: 2,
    icon: ChecklistIcon,
    title: "Done",
    filter: "done",
  },
  {
    id: 3,
    icon: StickyNote2Icon,
    title: "Not Completed",
    filter: "not",
  },
  // {
  //   id: 4,
  //   icon: CalendarMonthIcon,
  //   title: "Calendar",
  //   filter: "",
  // },
];

let menuBookList = [
  {
    id: 1,
    color: "blue",
    bg: "#0000ff36",
    main: "blue",
    sidecolor: "#3b82f6",
  },
  {
    id: 2,
    color: "red",
    bg: "#ff000030",
    main: "red",
    sidecolor: "#ef4444",
  },
  {
    id: 3,
    color: "green",
    bg: "#00800030",
    main: "green",
    sidecolor: "#22c55e",
  },
  {
    id: 4,
    color: "purple",
    bg: "#f800ff36",
    main: "purple",
    sidecolor: "#a855f7",
  },
];

const Menu = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  // let [bgColor, setBgColor] = useState("#0000ff36");
  let [selectedIDMenu, setSelectedIDMenu] = useState(1);
  let [menuToggle, setMenuToggle] = useState(() => {
    return localStorage.getItem("toggle") === "true" ? true : false;
  });
  let [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  let [check, setCheck] = useState(
    localStorage.getItem("check") === "true" ? true : false
  );
  // ! مهم عشان اللوكال ستوريج
  useEffect(() => {
    localStorage.setItem("check", check);
  }, [check]);
  let {
    selectedID,
    setSelectedID,
    sidecolor,
    setSidecolor,
    bgColor,
    setBgColor,
    setPageColor,
    pageColor,
  } = useContext(colorContext);
  let { setFilter } = useContext(TodoContext);
  let colorize = {
    backgroundImage: `linear-gradient(90deg, ${pageColor}, #91CFFF)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    color: "transparent",
    display: "inline-block",
    minHeight: "1rem",
    // ? Border Line
    borderBottom: "2px solid",
    borderImage: "linear-gradient(to right, transparent, black, transparent) 1",
  };
  // //? Dark Mood
  // let [theme, setTheme] = useState(
  //   // localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  //   "dark"
  // );
  // let ele = document.documentElement;
  // useEffect(() => {
  //   if (theme === "dark") {
  //     ele.classList.add("dark");
  //     localStorage.setItem("theme", "dark");
  //   } else {
  //     ele.classList.remove("dark");
  //     localStorage.setItem("theme", "light");
  //   }
  // });
  return (
    <div
      className={`bg-sky-100 dark:bg-[rgb(24,24,24)] duration-300 group ${
        menuToggle ? "" : "cursor-e-resize"
      }`} //?bg-[rgb(24,24,24)] /*bg-gray-200 bg-gradient-to-b from-pink-500/30 to-black*/
      style={{ width: menuToggle ? "400px" : "90px" }}
      onClick={() => {
        if (!menuToggle) {
          setMenuToggle(true);
          localStorage.setItem("toggle", true);
        }
      }}
    >
      <div
        className={
          menuToggle
            ? "px-4 py-2 flex flex-col"
            : "px-4 py-2 flex flex-col items-center"
        }
      >
        <div
          className={`h-14${menuToggle ? "" : "flex items-center"}`}
          style={{ borderBottom: "1px solid #303030cf" }}
        >
          <h1>
            {menuToggle ? (
              //! Menu Opened
              <div className="flex text-black dark:text-white items-center text-xl justify-between">
                <div className="flex items-center">
                  <FaAnchor />
                  <span className="ml-2 font-semibold">Menu</span>
                </div>
                <Tooltip title={"Close Sidebar"} placement="right" arrow>
                  <Checkbox
                    onClick={() => {
                      setMenuToggle(!menuToggle);
                      localStorage.setItem("toggle", !menuToggle);
                    }}
                    {...label}
                    icon={
                      <TbLayoutSidebarLeftCollapse className="setting-icon !text-black dark:!text-white " />
                    }
                    checkedIcon={
                      <TbLayoutSidebarLeftCollapse className="setting-icon !text-black dark:!text-white " />
                    }
                  />
                </Tooltip>
              </div>
            ) : (
              //! Menu Closed
              <div className="flex text-black dark:text-white items-center justify-center text-xl w-[46px] h-[46px]">
                <FaAnchor className="group-hover:hidden " />
                <span className=" hidden group-hover:block">
                  <Tooltip title={"Open Sidebar"} placement="right" arrow>
                    <Checkbox
                      // className="hidden group-hover:block"
                      onClick={() => {
                        setMenuToggle(!menuToggle);
                        localStorage.setItem("toggle", !menuToggle);
                      }}
                      {...label}
                      icon={
                        <TbLayoutSidebarLeftExpand className="setting-icon !text-black dark:!text-white " />
                      }
                      checkedIcon={
                        <TbLayoutSidebarLeftExpand className="setting-icon !text-black dark:!text-white " />
                      }
                      sx={{
                        // color: pink[800],
                        "&.Mui-checked": {
                          color: pageColor, // !Color Of Setting Icon
                        },
                      }}
                    />
                  </Tooltip>
                </span>
              </div>
            )}
          </h1>
          {/* <SettingsRoundedIcon className="cursor-pointer" /> */}
          {
            //! Toggle Icon
            /* <Checkbox
            onClick={() => setMenuToggle(!menuToggle)}
            {...label}
            icon={<TbLayoutSidebarLeftExpand className="setting-icon" />}
            checkedIcon={
              <TbLayoutSidebarLeftCollapse className="setting-icon" />
            }
            sx={{
              // color: pink[800],
              "&.Mui-checked": {
                color: pageColor, // !Color Of Setting Icon
              },
            }}
          /> */
          }
        </div>
        {/* {menuToggle ? <SearchBar /> : ""} */}
        {/* Tasks Section */}
        <div className="">
          <h1
            className="text-xs font-bold duration-300 transition-all leading-tight"
            style={colorize}
          >
            {/* TASKS */}
          </h1>

          <div className="ml-1 relative">
            {menuList.map((task) => (
              <Tooltip
                key={task.id}
                title={!menuToggle ? task.title : ""}
                placement="right"
                arrow
              >
                <div
                  className={`relative flex items-center px-2 py-2 cursor-pointer duration-300  ${
                    task.id === selectedIDMenu
                      ? "rounded-md text-black dark:text-white font-semibold mark duration-300"
                      : "text-slate-400 rounded-md " //? hover:bg-gray-300/80 hover:text-gray-700
                  }`}
                  style={{
                    backgroundColor: task.id === selectedIDMenu ? bgColor : "",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIDMenu(task.id);
                    setFilter(task.filter);
                  }}
                >
                  <TasksMenu
                    icon={<task.icon sx={{ fontSize: "18px" }} />}
                    title={menuToggle ? task.title : ""}
                    selected={selectedID}
                    task={task.id}
                  />
                  {task.id === selectedIDMenu && (
                    <div
                      className={`absolute right-1 top-1/2 transform -translate-y-1/2 w-[4px] h-7 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse`}
                      style={{ backgroundColor: sidecolor }}
                    ></div>
                  )}
                </div>
              </Tooltip>
            ))}
            {/* //! Destructuring
             <TasksMenu
              icon={<KeyboardDoubleArrowRightIcon />}
              title={"Upcoming"}
            />
            <TasksMenu
              icon={<ChecklistIcon sx={{ fontSize: "18px" }} />}
              title={"Today"}
            />
            <TasksMenu icon={<CalendarMonthIcon />} title={"Calendar"} />
            <TasksMenu icon={<StickyNote2Icon />} title={"Sticky Wall"} /> */}
          </div>
        </div>
        {/* List Section */}
        <div className="mt-5">
          <h1 className="text-gray-700 text-xs font-bold" style={colorize}>
            LISTS
          </h1>

          <div className="ml-1">
            {menuList.map((task) => (
              <Tooltip
                key={task.id}
                title={!menuToggle ? task.title : ""}
                placement="right"
                arrow
              >
                <div
                  className={
                    "rounded-md text-slate-400 font-semibold duration-300"
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <TasksMenu
                    icon={<task.icon sx={{ fontSize: "18px" }} />}
                    title={menuToggle ? task.title : ""}
                  />
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
        <div className="mt-5">
          <h1
            className="text-gray-700 text-xs font-bold mb-3"
            style={{ color: pageColor }}
          >
            Advanced Settings
          </h1>
          <div className="flex">
            {menuToggle ? (
              //! Opened
              <div
                className="mr-12 w-40 px-4 py-1 border-2 border-gray-400/40 rounded-lg flex flex-col items-center cursor-pointer duration-300"
                style={{ display: menuToggle ? "block" : "none" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setTheme(theme === "light" ? "dark" : "light");
                  setCheck(!check);
                  // localStorage.setItem("check", check);
                }}
              >
                <span className="dark:text-white font-bold mx-[40px]">
                  Mood
                </span>
                <div className="flex w-full justify-between items-center">
                  <BedtimeIcon className="dark:text-white" />
                  <SwitcherMode theme={theme} check={check} />
                  <SunnyIcon className="dark:text-white" />
                </div>
              </div>
            ) : (
              //! Closed
              <div
                className="flex flex-col w-full justify-between items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setTheme(theme === "light" ? "dark" : "light");
                  setCheck(!check);
                  // localStorage.setItem("check", check);
                }}
              >
                <BedtimeIcon className="dark:text-white" />
                <SwitcherMode
                  rotate={!menuToggle}
                  theme={theme}
                  check={check}
                />
                <SunnyIcon className="dark:text-white" />
              </div>
            )}

            {/* <div className="max-w-40 px-4 py-1 border-2 border-gray-400/40 rounded-lg flex flex-col items-center cursor-pointer duration-300">
              <div className="flex w-full justify-between items-center">
                <SunnyIcon />
                <SwitcherMode />
                <BedtimeIcon />
              </div>
              <span className="font-bold">Mood</span>
            </div> */}
          </div>
        </div>
        <div
          className=" w-40 mt-2 border-2 border-gray-300 rounded-lg "
          style={{ display: menuToggle ? "block" : "none" }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="grid grid-cols-2 justify-center justify-items-center items-center gap-2 p-2">
            {menuBookList.map((book) => (
              <div
                key={book.id}
                data-color={book.bg}
                data-pagecolor={book.main}
                data-sidecolor={book.sidecolor}
                style={{
                  backgroundColor: book.id === selectedID ? bgColor : "",
                }}
                className="flex justify-center items-center w-1/2 p-1 rounded-md"
                onClick={(e) => {
                  e.stopPropagation();
                  setBgColor(e.currentTarget.dataset.color);
                  setSelectedID(book.id);
                  setPageColor(e.currentTarget.dataset.pagecolor);
                  setSidecolor(e.currentTarget.dataset.sidecolor);
                  localStorage.setItem();
                }}
              >
                {/* {console.log(book.id === selectedID && book.main)} */}
                <MenuBookIcon sx={{ color: book.color }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
