import { Tree } from 'react-arborist';
import { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import { TiFolderAdd, TiDocumentAdd } from "react-icons/ti";
import Node from './Node';
import useMeasure from 'react-use-measure';




const FileExplorer = ({selectedNode,setSelectedNode}) => {
  const [tree, setTree] = useState([]);
  const { socket } = useSocket();
  const [ref, bounds] = useMeasure();

  const projectname = "Lynx"


  useEffect(() => {
    console.log("socket from context:", socket);

    if (!socket) return;
    socket.emit("fileExplorer:get", projectname);

    socket.on("fileExplorer", data => {
      setTree(data);
      console.log("fileExplorer", data);
    });



    //================= watcher =====================
    socket.on("fileChange", (change) => {
      console.log("File change detected:", change);
      socket.emit("fileExplorer:get", projectname);

    });
      

    return () => {
      socket.off("fileExplorer");
      socket.off("fileChange");
    };


  }, [socket]);
  return (
    <>
      {/* Header */}
            <div className="h-15 sticky p-0 bg-[#19191a] border-b border-purple-500/30">
              <img
                src="editorlynx.png"
                alt="Lynx"
                className="h-14 w-12 p-0"
              />
            </div>
      {tree.length > 0 && (
        <div ref={ref} className="w-full h-full flex flex-col text-gray-300 px-5 ">

          {/* Header */}
          <div className="relative flex items-center justify-between text-1xl gap-2 px-2 h-10 shrink-0">
            <span>Lynx</span>
            {selectedNode && (
              <div className="flex items-center gap-2 text-1xl">
                <TiDocumentAdd />
                <TiFolderAdd />
              </div>
            )}

          </div>

          {/* Tree */}
          <div className="flex-1 w-full relative">
            {bounds.height > 0 && (
              <Tree
                data={tree}
                openByDefault={false}
                indent={20}
                width={bounds.width}
                height={bounds.height - 40}
              >
                {({ node, style }) => (
                  <Node
                    node={node}
                    style={style}
                    setSelectedNode={setSelectedNode}
                    socket={socket}
                    tree={tree}
                    setTree={setTree}
                    projectname={projectname}
                  />
                )}

              </Tree>
            )}
          </div>

        </div>
      )}
    </>
  )
}
export default FileExplorer