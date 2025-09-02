import { FireTruck, PaymentOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import { useReducer } from "react";

function resultReducer(resultState, action) {
  console.log("Calling----->", resultState, action);

  let type = action.type;
  let { firstNum, secNum } = action.Payload;
  if (type == "added") {
    return Number(firstNum) + Number(secNum);
  } else if (type == "sub") {
    return Number(firstNum) - Number(secNum);
  }
}

const Reducer = () => {
  let [firstInput, setFirstInput] = useState(null);
  let [secInput, setSecInput] = useState(null);
  let [result2, dispatch] = useReducer(resultReducer, 10);

  let handelSumClick = () => {
    dispatch({
      type: "added",
      Payload: {
        firstNum: firstInput,
        secNum: secInput,
      },
    });
  };
  let handelSubClick = () => {
    dispatch({
      type: "sub",
      Payload: {
        firstNum: firstInput,
        secNum: secInput,
      },
    });
  };

  return (
    <div className="h-lvh bg-cyan-800">
      <div className="flex items-center flex-col w-1/2 mx-auto pt-20">
        <input
          type="text"
          placeholder="Number"
          className="my-5 p-3 outline-none shadow-xl shadow-cyan-900"
          value={firstInput}
          onChange={(e) => setFirstInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="Number"
          className="my-5 p-3 outline-none shadow-xl shadow-cyan-900"
          value={secInput}
          onChange={(e) => setSecInput(e.target.value)}
        />
        <button
          className="border-2 w-1/2 mb-5 p-5 hover:bg-cyan-900 duration-300 hover:text-white"
          onClick={handelSumClick}
        >
          +
        </button>
        <button
          className="border-2 w-1/2 p-5 hover:bg-cyan-900 duration-300 hover:text-white"
          onClick={handelSubClick}
        >
          -
        </button>
        <h2 className="text-cyan-950 text-xl mt-3">Result Is :- {result2}</h2>
      </div>
    </div>
  );
};

export default Reducer;
