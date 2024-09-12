import React, { useEffect, useState } from "react";
import CatSprite from "./CatSprite";
import { useSprites } from "../providers/SpriteContext";

import {
  RotateAnticlockwise,
  RotateClockwise,
  GoTo,
  MoveSteps,
} from "./motions";

import { FlagClickedEvent, SpriteClickedEvent } from "./Events";

import { RepeatControl } from "./Controls";

import constants from "../resources/constants";

// Map constants to components
const componentMap = {
  [constants.ROTATE_CLOCKWISE]: RotateClockwise,
  [constants.ROTATE_ANTICLOCKWISE]: RotateAnticlockwise,
  [constants.GO_TO]: GoTo,
  [constants.MOVE_STEPS]: MoveSteps,
  [constants.FLAG_CLICKED]: FlagClickedEvent,
  [constants.SPRITE_CLICKED]: SpriteClickedEvent,
  [constants.REPEAT_CONTROL]: RepeatControl,
};

const EventRenderer = ({ events }) => {
  const { activeSprite, updateEvent } = useSprites();

  return (
    <div className="flex flex-col max-w-80">
      {events.map((event, index) => {
        const Component = componentMap[event.type] || null;

        return Component ? (
          <Component
            key={event.eventId + index}
            data={event.data}
            draggable={false}
            onBlur={(data) => {
              updateEvent(activeSprite.id, event.eventId, data);
            }}
          />
        ) : (
          <div key={event.eventId + index}>Unknown Event: {event.type}</div>
        );
      })}
    </div>
  );
};

export default function MidArea() {
  const { activeSprite, events, addEvent } = useSprites();
  const [activeSpriteEvents, setActiveSpriteEvents] = useState([]);

  useEffect(() => {
    setActiveSpriteEvents(events[activeSprite.id] ?? []);
  }, [activeSprite, events]);

  /**
   * Handles the drop event for dragging items.
   *
   * @param {React.DragEvent} e - The drop event object.
   * @returns {void}
   */
  const handleOnDrop = (e) => {
    const eventType = e.dataTransfer.getData("eventId");
    const extraData = e.dataTransfer.getData("extraData");

    addEvent(activeSprite.id, eventType, extraData);
  };

  /**
   * Handles the drag over event for dragging items.
   *
   * @param {React.DragEvent} e - The drag over event object.
   * @returns {void}
   */
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="flex-1 h-full p-2 bg-white rounded-xl relative"
      onDrop={handleOnDrop}
      onDragOver={handleDragOver}
    >
      <div className="font-bold"> {"Mid Area"} </div>

      <EventRenderer events={activeSpriteEvents} />

      {activeSprite && (
        <div className="selected-sprite inline-flex flex-col items-center justify-center gap-1 absolute opacity-35 right-4 top-4 h-10 w-10">
          <CatSprite />
          <span className="text-xs">{activeSprite.name}</span>
        </div>
      )}
    </div>
  );
}
