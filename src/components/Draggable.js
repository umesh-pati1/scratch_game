import React, { useState } from "react";
import { constrainPosition, goTo, moveSprite, rotateSprite } from "../utils";
import { useSprites } from "../providers/SpriteContext";
import constants from "../resources/constants";

export default function Draggable({
  id,
  extraData = "",
  children,
  draggable = true,
}) {
  const { activeSprite, setActive, updateSprite } = useSprites();

  const handleClick = (e) => {
    let position = activeSprite.position;

    let direction = activeSprite.direction;

    switch (id) {
      case constants.MOVE_STEPS:
        position = moveSprite(
          position,
          extraData,
          direction,
          activeSprite.size
        );
        break;

      case constants.GO_TO:
        position = { x: Number(extraData[0]), y: Number(extraData[1]) };
        break;

      case constants.ROTATE_CLOCKWISE:
        direction = rotateSprite(direction, extraData, activeSprite.size);
        break;

      case constants.ROTATE_ANTICLOCKWISE:
        direction = rotateSprite(direction, -extraData, activeSprite.size);
        break;
    }

    const newSprite = {
      ...activeSprite,
      position: position,
      direction: direction,
    };
    setActive(newSprite);
    updateSprite(newSprite);
  };

  const handleOnDrag = (e) => {
    e.dataTransfer.setData("eventId", id);
    e.dataTransfer.setData("extraData", JSON.stringify(extraData));
  };

  return (
    <div
      className="cursor-pointer"
      draggable={draggable}
      onDragStart={handleOnDrag}
      onClick={(e) => {
        handleClick(e);
      }}
    >
      {children}
    </div>
  );
}
