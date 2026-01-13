
import { useEffect, useState, useMemo, useRef } from "react";
import Background from "./Background";
import { FaArrowCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();


    const [isAnimating, setIsAnimating] = useState(false);
    const [isPowered, setIsPowered] = useState(false);
    const [value, setValue] = useState("");

    const inputRef = useRef<HTMLTextAreaElement>(null);

    const memoizedBackground = useMemo(() => <Background />, []);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#050505]">


            {memoizedBackground}


            <div className="relative z-10 flex flex-col items-center  h-full pointer-events-none">

                <h1 className="font-['Merriweather'] text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-[#2e1065] [-webkit-text-stroke:2px_#bd00ff] drop-shadow-[0_0_15px_#bd00ff] drop-shadow-[0_0_50px_rgba(126,34,206,0.8)] animate-pulse uppercase z-20 tracking-normal">
                    LYNX
                </h1>
                <div className={`
                        absolute top-0 z-10
                        w-3/4 md:w-1/2 lg:w-[30%]
                        transition-opacity duration-700 ease-out
                        ${isAnimating || isPowered ? "opacity-100" : "opacity-15"}
                    `}>
                    <img src="/lynx.png" alt="lynx" />
                </div>
            </div>

            {/*textbox*/}
            <div
                onClick={() => {
                    if (!isAnimating && !isPowered) {
                        setIsAnimating(true);
                        setTimeout(() => {
                            setIsAnimating(false);
                            setIsPowered(true);
                        }, 580)
                    }
                }}
                className={`absolute z-20 p-[2px] top-[55%] left-1/2 -translate-x-1/2 w-[68%] h-[21%] rounded-xl overflow-hidden transition-all duration-300 ${!isAnimating && !isPowered ? 'border border-purple-500/30 hover: border-purple-500/60' : ''}`}>
                {isAnimating && (
                    <div className="absolute inset-[-1000%] animate-[spin_0.5s_linear_infinite] bg-[conic-gradient(from_45deg_at_50%_50%,#000000_80%,#bd00ff_90%,#000000_100%)]" />
                )}

                {isPowered && (
                    <div className="absolute inset-0 bg-[#bd00ff]" />
                )}
                <textarea
                    ref={inputRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="what do you want to build..."
                    className="
                            relative z-10
                            p-4
                            w-full h-full
                            bg-[#050505]
                            text-purple-300
                            text-lg md:text-2lg

                            placeholder-purple-400/40
                        
                            outline-none resize-none
                            rounded-xl
                            
                            backdrop-blur-3xl
                            "
                />
                <FaArrowCircleRight
                    onClick={() => {
                        if (isAnimating) return;
                        if (!value.trim()) return;

                        navigate("/Coder");
                    }}
                    className={`absolute top-4 right-4 z-30 text-3xl cursor-pointer transition-all duration-150 ease-out transform hover:scale-110 active:scale-90 ${!isAnimating && !isPowered ? "text-purple-500/20" : "text-purple-500/95 drop-shadow-[0_0_10px_#bd00ff]"} `}
                />
            </div>

        </div>
    );
};

export default Home;