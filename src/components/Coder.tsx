import XTerminal from "./XTerminal";
import Editor from '@monaco-editor/react';
import FileExplorer from "./FileExplorer";
import { Resizable } from "re-resizable";

const Coder = () => {
    return (
        <div className="flex flex-row w-full h-full bg-[#050505] overflow-hidden">
            <Resizable
                defaultSize={{ width: "250px", height: "100%" }}
                minWidth="15%"
                maxWidth="50%"
                enable={{ right: true }}
                className="border-r border-purple-500/50 hover:border-purple-500/80 transition-colors duration-300 bg-[#050505] backdrop-blur-md shadow-[0_-5px_30px_rgba(189,0,255,0.15)] flex flex-col"
            >
                <FileExplorer />
            </Resizable>
            <div className="flex flex-col flex-1 min-w-0 h-full bg-[#050505] overflow-hidden">
                <div className="flex-1 overflow-hidden relative min-h-0">
                    <Editor
                        height="100%"
                        width="100%"
                        theme="vs-dark"
                        defaultLanguage="javascript"
                        defaultValue="// Start coding here..."
                    />
                </div>
                <XTerminal />
            </div>
        </div>
    )
}
export default Coder