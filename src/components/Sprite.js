import React, { useState, useEffect, useRef } from "react";
import CatSprite from "./CatSprite";
import { useSprites } from "../providers/SpriteContext";

import { constrainPosition, moveSprite, rotateSprite } from "../utils";
import constants from "../resources/constants";

const Sprite = ({
  id,
  type,
  initialPosition,
  initialSize,
  initialDirection,
  className,
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [direction, setDirection] = useState(initialDirection);
  const spriteRef = useRef(null);
  const execEventsRef = useRef(false);
  const { events } = useSprites();

  // Function to execute events
  const executeEvent = (event) => {
    if (spriteRef.current) {
      let position = {
        x: Number(spriteRef.current.dataset.x),
        y: Number(spriteRef.current.dataset.y),
      };
      let direction = parseFloat(
        spriteRef.current.style.transform
          .replace("rotate(", "")
          .replace("deg)", "")
      );

      let newPosition = { ...position };
      let newDirection = direction;

      switch (event.type) {
        case constants.MOVE_STEPS:
          newPosition = moveSprite(position, event.data, direction);
          break;
        case constants.GO_TO:
          newPosition = {
            x: Number(event.data[0]),
            y: Number(event.data[1]),
          };
          break;
        case constants.ROTATE_CLOCKWISE:
          newDirection = rotateSprite(direction, event.data);
          break;
        case constants.ROTATE_ANTICLOCKWISE:
          newDirection = rotateSprite(direction, -event.data);
          break;
        default:
          console.log(`Unknown event type: ${event.type}`);
          return;
      }

      // Update the sprite's data attributes and inline styles
      spriteRef.current.dataset.x = newPosition.x;
      spriteRef.current.dataset.y = newPosition.y;

      // Constrain position if necessary
      newPosition = constrainPosition(newPosition);

      spriteRef.current.style.left = `${newPosition.x}px`;
      spriteRef.current.style.top = `${newPosition.y}px`;
      spriteRef.current.style.transform = `rotate(${newDirection}deg)`;
    }
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // function to execute events which are attached to this sprite
  const executeEvents = async (events) => {
    console.log("here: ", events);
    execEventsRef.current = true;
    let eventQueue = structuredClone(events);

    const processQueue = async () => {
      if (eventQueue?.length === 0) return;

      const event = eventQueue.shift();

      if (event.type === constants.REPEAT_CONTROL) {
        const times = Number(event.data);
        const repeatQueue = [...eventQueue];

        for (let i = 0; i < times; i++) {
          for await (let event of repeatQueue) {
            if (!execEventsRef.current) return;
            executeEvent(event);
            await delay(500); // Delay of 500ms between each event in the loop
          }
        }
      } else {
        if (!execEventsRef.current) return;
        executeEvent(event);
        await delay(500); // Delay of 500ms between each event in the queue
        processQueue();
      }
    };

    processQueue();
  };

  // Add custom event listener for the "collision" event
  useEffect(() => {
    const spriteElement = spriteRef.current;

    const handleCollision = async (e) => {
      console.log(`here: Collision detected for sprite ${e.detail.spriteId}`);
      const newEvents = JSON.parse(spriteElement.dataset.events || "[]");
      console.log("here: execute new events", id, newEvents);
      execEventsRef.current = false;
      await delay(500);
      executeEvents(newEvents);
    };

    spriteElement.addEventListener("collision", handleCollision);

    return () => {
      spriteElement.removeEventListener("collision", handleCollision);
    };
  }, []);

  // Update position when initialPosition or initialSize changes
  useEffect(() => {
    setPosition(constrainPosition(initialPosition, initialSize));
  }, [initialPosition, initialSize]);

  // Update direction when initialDirection prop changes
  useEffect(() => {
    setDirection(initialDirection);
  }, [initialDirection]);

  // Handle flag button click
  useEffect(() => {
    const flagBtn = document.getElementById("flag-btn");

    const spriteEvents = events[id];

    const handleFlagClick = () => {
      if (
        spriteEvents?.length > 0 &&
        spriteEvents?.[0]?.type === constants.FLAG_CLICKED
      ) {
        executeEvents(spriteEvents.slice(1));
      }
    };

    if (flagBtn) {
      flagBtn.addEventListener("click", handleFlagClick);
    }

    // Cleanup the event listener
    return () => {
      if (flagBtn) {
        flagBtn.removeEventListener("click", handleFlagClick);
      }
    };
  }, [events]);

  return (
    <div
      className={className}
      ref={spriteRef}
      data-id={id}
      data-x={initialPosition.x}
      data-y={initialPosition.y}
      data-events="[]"
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${initialSize}px`,
        height: `${initialSize}px`,
        transform: `rotate(${direction}deg)`,
        transition: "transform 0.5s",
      }}
    >
      {type === "cat" && <CatSprite />}
    </div>
  );
};

export default Sprite;
