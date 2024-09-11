import React, { useEffect, useLayoutEffect } from "react";
import { useSprites } from "../providers/SpriteContext";
import Sprite from "./Sprite";

export default function PreviewArea() {
  const { sprites, activeSprite, swapEvents, events } = useSprites();

  // Collision detection function
  const checkCollision = (sprite1Ref, sprite2Ref) => {
    if (!sprite1Ref || !sprite2Ref) return false;

    const sprite1Rect = sprite1Ref.getBoundingClientRect();
    const sprite2Rect = sprite2Ref.getBoundingClientRect();

    const hasCollisionOccurred = !(
      sprite1Rect.right < sprite2Rect.left ||
      sprite1Rect.left > sprite2Rect.right ||
      sprite1Rect.bottom < sprite2Rect.top ||
      sprite1Rect.top > sprite2Rect.bottom
    );

    console.log("hasCollisionOccurred", hasCollisionOccurred);

    return hasCollisionOccurred;
  };

  // Handle collision logic
  const handleCollision = () => {
    // Select all DOM elements with the class "sprite"
    const spriteElements = document.querySelectorAll(".sprite-el");

    console.log(spriteElements);

    for (let i = 0; i < spriteElements.length; i++) {
      for (let j = i + 1; j < spriteElements.length; j++) {
        const sprite1 = spriteElements[i];
        const sprite2 = spriteElements[j];

        const sprite1Id = sprite1.getAttribute("data-id");
        const sprite2Id = sprite2.getAttribute("data-id");

        // Check for collision between sprite1 and sprite2
        if (checkCollision(sprite1, sprite2)) {
          // Swap events for the two collided sprites
          // swapEvents(sprite1Id, sprite2Id);

          const sprite1Events = events[sprite1Id];
          const sprite2Events = events[sprite2Id];

          sprite1.setAttribute("data-events", JSON.stringify(sprite2Events));
          sprite2.setAttribute("data-events", JSON.stringify(sprite1Events));

          // Trigger a custom "collision" event on both sprites
          const collisionEvent1 = new CustomEvent("collision", {
            detail: { spriteId: sprite1Id, collidedWith: sprite2Id },
          });
          const collisionEvent2 = new CustomEvent("collision", {
            detail: { spriteId: sprite2Id, collidedWith: sprite1Id },
          });

          sprite1.dispatchEvent(collisionEvent1);
          sprite2.dispatchEvent(collisionEvent2);

          return;
        }
      }
    }
  };

  // Set up the flag button click event listener
  useLayoutEffect(() => {
    const collisionInterval = setInterval(handleCollision, 500);

    return () => {
      clearInterval(collisionInterval);
    };
  }, [swapEvents]);

  return (
    <div id="preview-area" className="flex-1 p-2 bg-white rounded-xl relative">
      {sprites.map((sprite) => (
        <Sprite
          key={sprite.id}
          id={sprite.id}
          className={`sprite-el ${
            activeSprite?.id === sprite.id ? "active" : ""
          }`}
          type={sprite.type}
          initialSize={sprite.size}
          initialDirection={sprite.direction}
          initialPosition={sprite.position}
        />
      ))}
    </div>
  );
}
