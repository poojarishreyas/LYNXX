import {useRef,useState} from 'react'
import { FaArrowCircleRight } from "react-icons/fa";
function Agent(){
    const inputRef=useRef<HTMLTextAreaElement>(null);
    const responseRef=useRef<HTMLTextAreaElement>(null);
    const [value,setValue]=useState("");
    const [response,Setresponse]=useState("");
    return(
        <>

            <textarea 
                ref={inputRef}
                placeholder="Ask me anything..."
                className="w-full  h-[20%]  p-4 bg-[#0F0F0F] text-gray-300 text-md md:text-2lg placeholder-gray-300/40 outline-none resize-none rounded-xl"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                

            />
        </>
    );
}
export default Agent;