import { Tree } from "react-arborist";
import { useState, useRef, useEffect } from "react";
import { FileIcon } from "./FileIcon";

// This is just sample data. You would fetch your actual file structure.
const initialData = [
    { id: "1", name: "public", children: [{ id: "2", name: "index.html" }] },
    {
        id: "3",
        name: "src",
        children: [
            { id: "4", name: "App.tsx" },
            { id: "5", name: "main.tsx" },
            { id: "6", name: "components", children: [] },
        ],
    },
    { id: "7", name: "package.json" },
];

function FileExplorer() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            setDimensions({
                width: entry.contentRect.width,
                height: entry.contentRect.height,
            });
        });

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="h-full w-full bg-[#050505] text-gray-300 text-sm font-mono">
            {dimensions.width > 0 && dimensions.height > 0 && (
                <Tree
                    initialData={initialData}
                    width={dimensions.width}
                    height={dimensions.height}
                    indent={16}
                    rowHeight={28}
                >
                    {Node}
                </Tree>
            )}
        </div>
    );
}

// A simple component to render each node
function Node({ node, style, dragHandle }: { node: any; style: any; dragHandle?: any }) {
    return (
        <div
            style={style}
            ref={dragHandle}
            className={`flex items-center gap-1.5 px-2 py-1 hover:bg-white/5 cursor-pointer ${node.isSelected ? "bg-white/10 text-white" : ""
                }`}
        >
            <div className="flex-shrink-0">
                <FileIcon
                    name={node.data.name}
                    isFolder={!!node.data.children}
                    isOpen={node.isOpen}
                />
            </div>
            <span className="truncate">{node.data.name}</span>
        </div>
    );
}

export default FileExplorer;