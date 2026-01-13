import React from "react";
import {
    SiTypescript,
    SiJavascript,
    SiHtml5,
    SiCss3,
    SiJson,
    SiReact,
    SiMarkdown,
    SiGit,
    SiNodedotjs,
    SiVite,
    SiGnubash,
    SiPython,
    SiDocker,
    SiRust,
    SiYarn,
    SiNpm,
    SiWebpack,
} from "react-icons/si";
import { VscFile, VscFolder, VscFolderOpened } from "react-icons/vsc";

interface FileIconProps {
    name: string;
    isFolder?: boolean;
    isOpen?: boolean;
}

export const getFileIcon = (name: string, isFolder: boolean, isOpen: boolean) => {
    if (isFolder) {
        switch (name) {
            case "src":
            case "components":
            case "hooks":
            case "utils":
            case "pages":
                return isOpen ? <VscFolderOpened className="text-blue-400 text-lg" /> : <VscFolder className="text-blue-400 text-lg" />;
            case "public":
                return isOpen ? <VscFolderOpened className="text-green-400 text-lg" /> : <VscFolder className="text-green-400 text-lg" />;
            case "node_modules":
                return isOpen ? <VscFolderOpened className="text-green-600 text-lg" /> : <VscFolder className="text-green-600 text-lg" />;
            default:
                return isOpen ? <VscFolderOpened className="text-blue-400 text-lg" /> : <VscFolder className="text-blue-400 text-lg" />;
        }
    }

    const lowerName = name.toLowerCase();

    // Specific filenames
    if (lowerName === "package.json") return <SiNodedotjs className="text-[#68a063] text-lg" />;
    if (lowerName === "vite.config.ts" || lowerName === "vite.config.js") return <SiVite className="text-[#646cff] text-lg" />;
    if (lowerName.includes("webpack.config")) return <SiWebpack className="text-[#8dd6f9] text-lg" />;
    if (lowerName === "tsconfig.json") return <SiTypescript className="text-[#3178c6] text-lg" />; // Using TS icon for config with caution
    if (lowerName === ".gitignore") return <SiGit className="text-[#f14e32] text-lg" />;
    if (lowerName === "yarn.lock") return <SiYarn className="text-[#2c8ebb] text-lg" />;
    if (lowerName === "package-lock.json") return <SiNpm className="text-[#cb3837] text-lg" />;
    if (lowerName === "dockerfile") return <SiDocker className="text-[#2496ed] text-lg" />;

    const extension = name.split('.').pop()?.toLowerCase();

    switch (extension) {
        case 'ts':
            return <SiTypescript className="text-[#3178c6] text-lg" />;
        case 'tsx':
            return <SiReact className="text-[#61dafb] text-lg" />;
        case 'js':
            return <SiJavascript className="text-[#f7df1e] text-lg" />;
        case 'jsx':
            return <SiReact className="text-[#61dafb] text-lg" />;
        case 'html':
            return <SiHtml5 className="text-[#e34f26] text-lg" />;
        case 'css':
            return <SiCss3 className="text-[#1572b6] text-lg" />;
        case 'json':
            return <SiJson className="text-[#f90] text-lg" />;
        case 'md':
            return <SiMarkdown className="text-white text-lg" />;
        case 'py':
            return <SiPython className="text-[#3776ab] text-lg" />;
        case 'rs':
            return <SiRust className="text-white text-lg" />;
        case 'sh':
            return <SiGnubash className="text-white text-lg" />;
        default:
            return <VscFile className="text-gray-400 text-lg" />;
    }
};

export const FileIcon: React.FC<FileIconProps> = ({ name, isFolder, isOpen }) => {
    return (
        <span className="flex items-center justify-center w-5 h-5">
            {getFileIcon(name, !!isFolder, !!isOpen)}
        </span>
    );
};
