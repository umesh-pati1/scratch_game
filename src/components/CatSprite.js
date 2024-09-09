import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const CatSprite = forwardRef((props, ref) => {
  return (
    <img
      draggable={false}
      className={twMerge("sprite h-full w-full", props.className)}
      src="/icons/cat_sprite.svg"
      alt="Cat Sprite"
    />
  );
});

export default CatSprite;

const sprite = {
  id: "cat1",
  type: "Cat",
  x: "0",
  y: "0",
  size: "100",
  direction: "0",
  events: [],
};

const availableEvents = [
  {
    eventId: "flag-click",
    name: "When Flag Clicked",
    description: "Triggers when the flag is clicked.",
    params: [],
  },
  {
    eventId: "repeat",
    name: "Repeat",
    description: "Repeats the action for a number of times.",
    params: ["times"],
  },
  {
    eventId: "move",
    name: "Move",
    description: "Moves the sprite by a specified amount.",
    params: ["steps", "optionalY"],
  },
  {
    eventId: "rotate",
    name: "Rotate",
    description: "Rotates the sprite by a specified degree.",
    params: ["degrees"],
  },
];

const sprites = [
  {
    id: "cat1",
    type: "Cat",
    position: {
      x: 0,
      y: 0,
    },
    size: "100",
    direction: "0",
    events: [
      {
        eventId: "flag-click",
        param: null,
      },
      {
        eventId: "repeat",
        param: [10],
      },

      {
        eventId: "move",
        param: [10],
      },
      {
        eventId: "move",
        param: [10, 20],
      },
      {
        eventId: "rotate",
        param: [10],
      },
    ],
  },
  {
    id: "cat1",
    type: "Cat",
    position: {
      x: 0,
      y: 0,
    },
    size: "100",
    direction: "0",
    events: [],
  },
];
