import React, { useEffect, useRef } from "react";
import { useSprites } from "../providers/SpriteContext";
import Sprite from "./Sprite";

export default function PreviewArea() {
  const { sprites, activeSprite } = useSprites();

  return (
    <div id="preview-area" className="flex-1 p-2 bg-white rounded-xl relative">
      {sprites.map((sprite) => (
        <Sprite
          key={sprite.id}
          id={sprite.id}
          className={`sprite ${activeSprite.id === sprite.id ? "active" : ""}`}
          type={sprite.type}
          initialSize={sprite.size}
          initialDirection={sprite.direction}
          initialPosition={sprite.position}
          events={sprite.events}
          sprite={sprite}
        />
      ))}
    </div>
  );
}
