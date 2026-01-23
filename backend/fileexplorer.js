import fs from "fs";
import path from "path";
export function FileExplorer(dir){
  const data = fs.readdirSync(dir, { withFileTypes: true });
  console.log(data);
  const folders = [];
  const files = [];
  let projectname="Lynx";

  for (const entry of data) {
    if (entry.name.startsWith('.')) continue;
    if (entry.name === 'node_modules') continue;
    console.log(entry.path);
    if (entry.isDirectory()) {
      
      folders.push({
        id: entry.path+"/"+entry.name,
        name: entry.name,
        children: [],
      });
      
    } else {
      files.push({
        id:entry.path+"/"+entry.name,
        name: entry.name,
        children:null
        // children: undefined // leaf
      });
    }
    
  }

  return [...folders, ...files];
}


