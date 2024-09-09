import React from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { SpriteProvider } from "./providers/SpriteContext";
import SpriteSelectorArea from "./components/SpriteSelectorArea";

import "./App.css";
import Header from "./components/Header";

export default function App() {
  return (
    <SpriteProvider>
      <div className="h-screen font-sans p-2">
        <Header />
        <div className="overflow-hidden h-full flex flex-row">
          <div className="flex-1 h-full overflow-hidden flex flex-row mr-2 gap-2">
            <Sidebar /> <MidArea />
          </div>
          <div className="w-1/3 h-full overflow-hidden flex flex-col gap-2">
            <PreviewArea />
            <SpriteSelectorArea />
          </div>
        </div>
      </div>
    </SpriteProvider>
  );
}
