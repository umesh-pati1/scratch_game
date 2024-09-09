// constrain the object position within the preview window
export const constrainPosition = (position, size = 100) => {
  const container = document.getElementById("preview-area");

  // convert string to number
  size = Number(size);

  if (!container) {
    console.error("No Preview window element found");
    return;
  }

  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  // constrain the sprite position
  // const constrainedX = Math.max(
  //   -containerWidth / 2 + size / 2,
  //   Math.min(position.x, containerWidth / 2 - size / 2)
  // );
  // const constrainedY = Math.max(
  //   -containerHeight / 2 + size / 2,
  //   Math.min(position.y, containerHeight / 2 - size / 2)
  // );

  // calculate the CSS left and top values
  const left = containerWidth / 2 + position.x - size / 2;
  const top = containerHeight / 2 + position.y - size / 2;

  return {
    x: left,
    y: top,
  };
};

export const moveSprite = (position, steps, direction) => {
  steps = Number(steps);

  const radians = (direction * Math.PI) / 180;
  const newX = position.x + steps * Math.cos(radians);
  const newY = position.y + steps * Math.sin(radians);

  return { x: newX, y: newY };
};

export const rotateSprite = (direction, degrees) => {
  degrees = Number(degrees);

  return direction + degrees;
};
