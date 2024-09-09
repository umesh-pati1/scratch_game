import React from "react";
import Draggable from "./Draggable";
import Icon from "./Icon";
import constants from "../resources/constants";

export const FlagClickedEvent = ({ draggable }) => {
  return (
    <Draggable id={constants.FLAG_CLICKED} draggable={draggable}>
      <div className="flex flex-row flex-wrap w-full bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When "}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {"clicked"}
      </div>
    </Draggable>
  );
};

export const SpriteClickedEvent = ({ draggable }) => {
  return (
    <Draggable id={constants.SPRITE_CLICKED} draggable={draggable}>
      <div className="flex flex-row flex-wrap w-full bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When this sprite clicked"}
      </div>
    </Draggable>
  );
};
