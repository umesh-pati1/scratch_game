// constants.js

const defaultSprite = {
  id: "cat_01",
  name: "Cat1",
  type: "cat",
  position: {
    x: 0,
    y: 0,
  },
  size: 50,
  direction: 0,
  events: [],
};

const constants = {
  ROTATE_CLOCKWISE: "rotate-clockwise",
  ROTATE_ANTICLOCKWISE: "rotate-anticlockwise",
  GO_TO: "goto",
  MOVE_STEPS: "move-steps",
  FLAG_CLICKED: "flag-clicked",
  REPEAT_CONTROL: "repeat-control",
  SPRITE_CLICKED: "sprite-clicked",
  DEFAULT_SPRITE: defaultSprite,
};

export default constants;
