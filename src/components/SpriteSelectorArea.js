import React, { useState, useEffect } from "react";
import CatSprite from "./CatSprite";
import { useSprites } from "../providers/SpriteContext";
import Icon from "./Icon";
import { Input } from "./Input";
import constants from "../resources/constants";

export default function SpriteSelectorArea() {
  const {
    sprites,
    addSprite,
    activeSprite,
    setActive,
    updateSprite,
    removeSprite,
  } = useSprites();

  const [inputs, setInputs] = useState({
    name: "",
    positionX: 0,
    positionY: 0,
    size: 100,
    direction: 0,
  });

  useEffect(() => {
    if (activeSprite) {
      setInputs({
        name: activeSprite.name,
        positionX: activeSprite.position.x,
        positionY: activeSprite.position.y,
        size: activeSprite.size,
        direction: activeSprite.direction,
      });
    }
  }, [activeSprite]);

  const getRandomPosition = () => {
    const container = document.getElementById("preview-area");
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const x = Math.floor(Math.random() * containerWidth - containerWidth / 2);
    const y = Math.floor(Math.random() * containerHeight - containerHeight / 2);
    return { x, y };
  };

  // Add new sprite
  const handleAddSprite = () => {
    const spriteData = constants.DEFAULT_SPRITE;
    const sameTypeSprites = sprites.filter(
      (sprite) => sprite.type === spriteData.type
    );

    const newId = `${
      spriteData.type.charAt(0).toUpperCase() + spriteData.type.slice(1)
    }${sameTypeSprites.length + 1}`;

    const position = getRandomPosition();
    const newSprite = {
      ...spriteData,
      id: newId,
      name: newId,
      position: position,
    };
    addSprite(newSprite);
    setActive(newSprite);
  };

  // handle focus out
  const handleBlur = () => {
    updateActiveSprite();
  };

  // handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      updateActiveSprite();
    }
  };

  const updateActiveSprite = () => {
    if (activeSprite) {
      const updatedSprite = {
        ...activeSprite,
        name: inputs.name,
        position: {
          x: Number(inputs.positionX),
          y: Number(inputs.positionY),
        },
        size: Number(inputs.size),
        direction: Number(inputs.direction),
      };

      setActive(updatedSprite);
      updateSprite(updatedSprite);
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-1 p-2 bg-white rounded-xl relative">
      <div className="flex flex-col border-b p-2">
        <div className="flex flex-wrap gap-6">
          <Input
            label={"Sprite"}
            placeholder={"Name"}
            name="name"
            value={inputs.name}
            minWidth="6rem"
            className="text-left"
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            onBlur={handleBlur}
          />
          <Input
            label={"X"}
            placeholder={"x"}
            name="positionX"
            type="number"
            value={inputs.positionX}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            onBlur={handleBlur}
          />
          <Input
            label={"Y"}
            placeholder={"y"}
            name="positionY"
            type="number"
            value={inputs.positionY}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            onBlur={handleBlur}
          />
          <Input
            label={"Size"}
            placeholder={"Size"}
            name="size"
            type="number"
            value={inputs.size}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            onBlur={handleBlur}
          />
          <Input
            label={"Direction"}
            placeholder={"Direction"}
            name="direction"
            type="number"
            value={inputs.direction}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            onBlur={handleBlur}
          />
        </div>
      </div>

      <div className="flex flex-row gap-2 flex-wrap m-2">
        {sprites.map((sprite) => {
          if (sprite.type === "cat") {
            return (
              <div
                key={sprite.id}
                className={`p-2 rounded gap-2 h-20 w-20 flex flex-col items-center justify-center relative ${
                  activeSprite && activeSprite.id === sprite.id
                    ? "bg-blue-300 border"
                    : "bg-blue-100"
                }`}
                onClick={() => setActive(sprite)} // Set clicked sprite as active
              >
                {activeSprite && activeSprite.id === sprite.id && (
                  <div
                    className="absolute -top-2 -right-2"
                    onClick={() => {
                      removeSprite(activeSprite.id);
                    }}
                  >
                    <Icon name={"trash"} className="text-black" />
                  </div>
                )}
                <CatSprite className="h-12 w-12" />
                <span className="text-xs font-light">{sprite.name}</span>
              </div>
            );
          }
        })}
        {/* Add new sprite */}
        <div
          className="p-2 rounded gap-2 h-20 w-20 flex flex-col items-center justify-center bg-slate-500 cursor-pointer "
          onClick={handleAddSprite}
        >
          <Icon name={"plus-square"} className="text-white" />
        </div>
      </div>
    </div>
  );
}
