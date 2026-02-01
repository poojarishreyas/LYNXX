import { useState } from "react";
import { Resizable } from "re-resizable";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

import FileExplorer from "./FileExplorer";
import CodeEditor from "./CodeEditor";
import XTerminal from "./XTerminal";
import Agent from "./Agent";

const Coder = () => {
  const [selectedNode, setSelectedNode] = useState(null);

  // 🔑 IDE state (SOURCE OF TRUTH)
  const [openedtabs, setOpenedtabs] = useState([]);
  const [activetab, setActivetab] = useState(null);

  const handleCloseTab = (tabName, e) => {
    e.stopPropagation();
    const updatedTabs = openedtabs.filter(tab => tab.name !== tabName);
    setOpenedtabs(updatedTabs);
    
    // If closing the active tab, switch to another tab or null
    if (activetab === tabName) {
      if (updatedTabs.length > 0) {
        setActivetab(updatedTabs[updatedTabs.length - 1].name);
      } else {
        setActivetab(null);
      }
    }
  };

  return (
    <div className="flex flex-row w-full h-full bg-[#111112] overflow-hidden">

      {/* LEFT: FILE EXPLORER */}
      <Resizable
        defaultSize={{ width: "250px", height: "100%" }}
        minWidth="15%"
        maxWidth="50%"
        enable={{ right: true }}
        className="border-r border-purple-500/50 bg-[#19191a]"
      >
        <FileExplorer
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
        />
      </Resizable>

      {/* CENTER */}
      <div className="flex flex-col flex-1 min-w-0 h-full">

        {/* TABS BAR WITH SWIPER */}
        <div className="border-b border-gray-700 bg-[#141414]">
          {openedtabs.length > 0 && (
            <Swiper
              modules={[FreeMode, Mousewheel]}
              slidesPerView="auto"
              freeMode={true}
              mousewheel={{
                forceToAxis: true,
                sensitivity: 1,
              }}
              className="px-3 py-2"
            >
              {openedtabs.map(tab => (
                <SwiperSlide key={tab.name} style={{ width: 'auto' }} className="mr-2">
                  <button
                    onClick={() => setActivetab(tab.name)}
                    className={`group flex items-center gap-2 px-3 py-1 text-sm rounded transition whitespace-nowrap ${
                      activetab === tab.name
                        ? "bg-purple-500/40 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    <span>{tab.name}</span>
                    <span
                      onClick={(e) => handleCloseTab(tab.name, e)}
                      className="opacity-0 group-hover:opacity-100 hover:text-red-400 transition-opacity"
                    >
                      ×
                    </span>
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* EDITOR */}
        <div className="flex-1 min-h-0">
          <CodeEditor
            selectedNode={selectedNode}
            openedtabs={openedtabs}
            setOpenedtabs={setOpenedtabs}
            activetab={activetab}
            setActivetab={setActivetab}
          />
        </div>

        {/* TERMINAL */}
        <XTerminal />
      </div>

      {/* RIGHT: AGENT */}
      <Resizable
        defaultSize={{ width: "250px", height: "100%" }}
        minWidth="15%"
        maxWidth="50%"
        enable={{ left: true }}
        className="border-l border-purple-500/50 bg-[#19191a]"
      >
        <Agent />
      </Resizable>
    </div>
  );
};

export default Coder;