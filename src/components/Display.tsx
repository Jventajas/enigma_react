import React from "react";

interface DisplayProps {
    typedText: string;
    encodedText: string;
}

const Display: React.FC<DisplayProps> = ({ typedText, encodedText }: DisplayProps) => {

    return (
        <div className={"w-full bg-white/10 backdrop-blur-sm text-white p-4 rounded-xl shadow-lg" +
            "flex flex-col items-center gap-y-2"}>

            <div className={"w-full mb-4"}>
                <div className={"bg-white/20 p-2 rounded min-h-[100px] pl-4"}>
                    {typedText || <span className={"text-gray-300"}>Plain text</span>}
                </div>
            </div>

            <div className={ "w-full" }>
                <div className={ "bg-white/20 p-2 rounded min-h-[100px] pl-4" }>
                    { encodedText || <span className={ "text-gray-300" }>Encoded text</span> }
                </div>
            </div>


        </div>
    );
}

export default Display;