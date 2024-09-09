import React, { useState } from "react";
import Draggable from "./Draggable";
import Input from "./Input";
import constants from "../resources/constants";

export const RepeatControl = ({ draggable, data = "10", onBlur }) => {
  const [repeat, setRepeat] = useState(data);
  return (
    <Draggable
      id={constants.REPEAT_CONTROL}
      draggable={draggable}
      extraData={repeat}
    >
      <div className="flex flex-row flex-wrap gap-1 items-center w-full bg-orange-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        <span>{"Repeat "}</span>
        <Input
          tabIndex="0"
          type="number"
          className="text-clip text-center p-1 border rounded-xl outline-none cursor-text whitespace-nowrap font-bold text-xs w-auto text-black"
          value={repeat}
          onBlur={() => {
            if (onBlur) onBlur(repeat);
          }}
          onChange={(e) => {
            setRepeat(e.target.value);
          }}
        />
        <span>{" times"}</span>
      </div>
    </Draggable>
  );
};
