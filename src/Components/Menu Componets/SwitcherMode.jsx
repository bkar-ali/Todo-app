import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
// import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";

const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase": {
    color: "#303030", //! لون الزر قبل التفعيل
    "&:hover": {
      backgroundColor: alpha("#fff", theme.palette.action.hoverOpacity), // لون الخلفية عند الـ hover
    },
  },
  // 💡 التراك (المسار) وهو غير مفعل
  "& .MuiSwitch-track": {
    backgroundColor: "#303030", // لون المسار قبل التفعيل
  },

  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#303030",
    "&:hover": {
      backgroundColor: alpha("#000", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#303030",
  },
}));

const label = { inputProps: { "aria-label": "Color switch demo" } };

export default function ColorSwitches({ rotate, theme, check }) {
  //? Dark Mood
  // let [theme, setTheme] = useState(
  //   localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  // );
  let ele = document.documentElement;
  useEffect(() => {
    if (theme === "dark") {
      ele.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      ele.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);
  return (
    <div
    // onClick={() => {
    // setTheme(theme === "light" ? "dark" : "light");
    // }}
    >
      <PinkSwitch
        {...label}
        // defaultChecked
        checked={check}
        color="secondary"
        // colMood
        sx={{
          transform: rotate ? "rotate(90deg)" : "",
          margin: rotate ? "5px 0px 5px 0px;" : "",
        }}
      />
    </div>
  );
}
