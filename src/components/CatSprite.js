import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const CatSprite = forwardRef((props) => {
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
