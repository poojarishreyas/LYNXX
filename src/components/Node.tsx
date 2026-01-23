
import { getFileIcon } from "./FileIcon";
import { VscChevronRight, VscChevronDown } from "react-icons/vsc";



export default function Node({ node, style, setSelectedNode ,socket,tree,setTree,projectname }) {

  function getChildren(node,tree,setTree) {
    const target=node.id;
    console.log(target);
    socket.emit("fileExplorer:getChildren",node.id);
    
    socket.once("fileExplorer:children", data => {
      addchildren(tree,target,data,setTree);


   });


  }
  function addchildren(tree,target,data,setTree){
    const[before,after]=target.split(projectname);
    const parts=after.split('/').filter(Boolean);
      let currentLevel = tree;
      let currentNode = null;
      let currentPath = before+projectname;

      for(const part of parts){
        currentPath+='/'+part;
        currentNode=currentLevel.find(item => item.id===currentPath);

        if(!currentNode) return;

        currentLevel=currentNode.children || [];
      
      }
      currentNode.children.push(...data);
      console.log(tree);
      setTree([...tree]);
  }
  

  


  

  
  

  return (
    <div
      style={style}
      onClick={() => setSelectedNode(node)}
      className={`flex items-center space-x-1 py-0.5 cursor-pointer select-none hover:bg-purple-600/20 transition-colors ${node.isSelected ? "bg-purple-600/20" : ""
        } text-sm`}
    >
      {!node.isLeaf && (
       
        <span onClick={() => (node.toggle(),(node.isOpen && node.children.length===0)? getChildren(node,tree,setTree):null)}>
          {node.isOpen ? (
            <VscChevronDown className="text-gray-300 text-xs" />
            
          ) : (
            <VscChevronRight className="text-gray-300 text-xs" />
          )}
        </span>
      )}

      {node.isLeaf && (
        <span className="mr-1">
          {getFileIcon(node.data.name)}
        </span>
      )}

      <span>{node.data.name}</span>
    </div>
  );
}
