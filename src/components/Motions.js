import React, { useState } from "react";

import Draggable from "./Draggable";
import Input from "./Input";
import Icon from "./Icon";
import constants from "../resources/constants";

export const MoveSteps = ({ draggable = true, data = "10", onBlur }) => {
  const [value, setValue] = useState(data);

  return (
    <Draggable
      draggable={draggable}
      extraData={value}
      id={constants.MOVE_STEPS}
    >
      <div className="flex flex-row flex-wrap w-full gap-1 items-center bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        <Input
          label="Move"
          type="number"
          tabIndex="0"
          className="text-clip text-center p-1 border rounded-xl outline-none cursor-text whitespace-nowrap font-bold text-xs w-auto text-black"
          value={value}
          onBlur={() => {
            if (onBlur) onBlur(value);
          }}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <span>steps</span>
      </div>
    </Draggable>
  );
};

export const GoTo = ({ draggable = true, data = ["10", "10"], onBlur }) => {
  const [x, setX] = useState(data[0]);
  const [y, setY] = useState(data[1]);

  return (
    <Draggable draggable={draggable} id={constants.GO_TO} extraData={[x, y]}>
      <div className="flex flex-row gap-1 flex-wrap items-center w-full bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        <span>{"Go to "}</span>
        <Input
          label={"x: "}
          type="number"
          tabIndex="0"
          className="text-clip text-center p-1 border rounded-xl outline-none cursor-text whitespace-nowrap font-bold text-xs w-auto text-black"
          value={x}
          onBlur={() => {
            if (onBlur) onBlur([x, y]);
          }}
          onChange={(e) => {
            setX(e.target.value);
          }}
        />
        <Input
          type="number"
          label={"y: "}
          tabIndex="0"
          className="text-clip text-center p-1 border rounded-xl outline-none cursor-text whitespace-nowrap font-bold text-xs w-auto text-black"
          value={y}
          onBlur={() => {
            if (onBlur) onBlur([x, y]);
          }}
          onChange={(e) => {
            setY(e.target.value);
          }}
        />
      </div>
    </Draggable>
  );
};

export const RotateClockwise = ({ draggable = true, data = "15", onBlur }) => {
  const [degrees, setDegrees] = useState(data);

  return (
    <Draggable
      id={constants.ROTATE_CLOCKWISE}
      extraData={degrees}
      draggable={draggable}
    >
      <div className="flex flex-row flex-wrap gap-1 items-center w-full bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        <span>{"turn "}</span>
        <Icon name="undo" size={15} className="text-white mx-2" />
        <Input
          tabIndex="0"
          type="number"
          className="text-clip text-center p-1 border rounded-xl outline-none cursor-text whitespace-nowrap font-bold text-xs w-auto text-black"
          value={degrees}
          onBlur={() => {
            if (onBlur) onBlur(degrees);
          }}
          onChange={(e) => {
            setDegrees(e.target.value);
          }}
        />
        <span>{" degrees"}</span>
      </div>
    </Draggable>
  );
};

export const RotateAnticlockwise = ({
  draggable = true,
  data = "15",
  onBlur,
}) => {
  const [degrees, setDegrees] = useState(data);

  return (
    <Draggable
      id={constants.ROTATE_ANTICLOCKWISE}
      extraData={degrees}
      draggable={draggable}
    >
      <div className="flex flex-row flex-wrap items-center gap-1 w-full bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        <span>{"turn "}</span>
        <Icon name="redo" size={15} className="text-white mx-2" />
        <Input
          tabIndex="0"
          type="number"
          className="text-clip text-center p-1 border rounded-xl outline-none cursor-text whitespace-nowrap font-bold text-xs w-auto text-black"
          value={degrees}
          onBlur={() => {
            if (onBlur) onBlur(degrees);
          }}
          onChange={(e) => {
            setDegrees(e.target.value);
          }}
        />
        <span>{" degrees"}</span>
      </div>
    </Draggable>
  );
};
