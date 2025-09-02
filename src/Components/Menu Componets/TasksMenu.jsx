import React from "react";

const TasksMenu = ({ icon = "", title = "" }) => {
  return (
    <div
      className="p-2 flex items-center group cursor-pointer hover:translate-x-1 duration-300" /**hover:bg-gray-300/80 duration-300 rounded-md */
    >
      <div className="text-slate-400 flex items-end  duration-300">{icon}</div>
      <div className="ml-2 duration-300 text-[12px]">{title}</div>
    </div>
  );
};

export default TasksMenu;
