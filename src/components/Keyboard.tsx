import React, { useState, useEffect } from "react";

const QWERTY_LAYOUT = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["Z","X","C","V","B","N","M"]
]

interface KeyboardProps {
    onKeyPressed: (letter: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPressed }: KeyboardProps) => {
    const [activeKey, setActiveKey] = useState<string | null>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.target as HTMLElement).tagName === "INPUT") {
                return;
            }
            const key = event.key.toUpperCase();
            if (QWERTY_LAYOUT.flat().includes(key)) {
                setActiveKey(key);
                onKeyPressed(key);
            }
        };

        const handleKeyUp = (event: KeyboardEvent)=> {
            if ((event.target as HTMLElement).tagName === "INPUT") {
                return;
            }
            const key = event.key.toUpperCase();
            if (QWERTY_LAYOUT.flat().includes(key)) {
                setActiveKey(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        }
    }, [onKeyPressed]);


    return (
        <div className={"bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-lg w-full text-white"}>

            <div className={"flex flex-col gap-3"}>
                {QWERTY_LAYOUT.map((row, rowIndex) => (
                    <div className={"flex gap-3 justify-center"} key={`row-${rowIndex}`}>
                        {row.map((letter) => (
                            <button
                                key={letter}
                                className={"w-12 h-12 rounded-full border-4 border-blue-300 bg-blue-500 " +
                                    "hover:bg-blue-600 text-white font-bold transition-colors " +
                                    `focus:outline-none ${
                                        activeKey === letter ? "bg-blue-700": ""
                                    }`}

                                onClick={() => onKeyPressed(letter)}
                            >
                                {letter}
                            </button>
                        ))}
                    </div>
                ))}

            </div>

        </div>

    );

}

export default Keyboard;
