import React, { useState, useEffect } from "react";

const QWERTY_LAYOUT = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["Z","X","C","V","B","N","M"]
]

interface LampboardProps {
    encodedLetter: string;
}


const Lampboard: React.FC<LampboardProps> = ({ encodedLetter }: LampboardProps) => {
    const [flashingLetter, setFlashingLetter] = useState<string | null>(null);

    useEffect(() => {
        if (encodedLetter) {
            setFlashingLetter(encodedLetter);
            const timer = setTimeout(() => setFlashingLetter(null), 100);
            return () => clearTimeout(timer);
        }
    }, [encodedLetter]);

    return (
        <div className={"bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-lg w-full text-black"}>

            <div className={"flex flex-col gap-3"}>
                {QWERTY_LAYOUT.map((row, rowIndex) => (
                    <div className={"flex gap-3 justify-center"} key={`row-${rowIndex}`}>

                        {row.map((letter) => (
                            <div
                                key={letter}
                                className={`w-12 h-12 rounded-full flex items-center justify-center
                                    bg-white font-bold transition-colors ${flashingLetter === letter ?
                                "bg-yellow-300": "bg-white"}`}

                                // Later the bg color will be changed when the lamp flashes
                            >
                                {letter}
                            </div>
                        ))}
                    </div>
                ))}


            </div>
        </div>
    )
}

export default Lampboard;