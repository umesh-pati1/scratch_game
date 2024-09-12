import React from "react";

import { FlagClickedEvent } from "./Events";
import {
  GoTo,
  MoveSteps,
  RotateAnticlockwise,
  RotateClockwise,
} from "./motions";

import { RepeatControl } from "./Controls";

export default function Sidebar() {
  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 bg-white  rounded-xl relative">
      <div className="font-bold"> {"Events"} </div>

      <FlagClickedEvent />

      <div className="font-bold"> {"Motion"} </div>

      <MoveSteps />

      <GoTo />

      <RotateClockwise />

      <RotateAnticlockwise />

      <div className="font-bold"> {"Control"} </div>

      <RepeatControl />
    </div>
  );
}
