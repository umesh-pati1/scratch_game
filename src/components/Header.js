import React from "react";
import Icon from "./Icon";

export default function Header() {
  return (
    <div className="bg-purple-600 rounded-xl p-2 mb-2 h-12 flex items-center justify-between relative">
      <img className="logo h-6 px-2" src="/logo.svg" alt="logo" />

      <div className="buttons inline-flex flex-row gap-2 absolute left-1/2 -translate-x-1/2 ">
        <button className="bg-white rounded px-2 py-1" id="flag-btn">
          <Icon name={"flag"} size={24} className="text-green-500" />
        </button>
      </div>
    </div>
  );
}
