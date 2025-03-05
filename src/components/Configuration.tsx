import React, { useState, useEffect } from "react";
import { ALPHABET , REFLECTOR_CONFIGS , ROTOR_CONFIGS } from "../enigma/EnigmaUtils.ts";


const ALL_ROTORS = Object.keys(ROTOR_CONFIGS);
const ALL_REFLECTORS = Object.keys(REFLECTOR_CONFIGS);

interface ConfigurationProps {
    onConfigurationChanged: (rotorConfigurations: {rotor: string; ring: string; initialPosition: string}[],
                             selectedReflector: string, plugboardConfig: string) => void;
}

function Configuration({ onConfigurationChanged }: ConfigurationProps) {
    const [selectedRotors, setSelectedRotors] = useState<string[]>(["I", "II", "III"]);
    const [ringPositions, setRingPositions] = useState<string[]>(["A", "A", "A"]);
    const [initialPositions, setInitialPositions] = useState<string[]>(["A", "A", "A"]);
    const [selectedReflector, setSelectedReflector] = useState<string>("B");
    const [plugboardConfig, setPlugboardConfig] = useState<string>("AB CD EF");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    const handleRotorChange = (index: number, newRotor: string) => {
        const newSelectedRotors = [...selectedRotors];
        newSelectedRotors[index] = newRotor;
        setSelectedRotors(newSelectedRotors);
    }

    const handleRingChange = (index: number, newRing: string) => {
        const newRingPositions = [...ringPositions];
        newRingPositions[index] = newRing;
        setRingPositions(newRingPositions);
    }

    const handleInitialPositionChange = (index: number, newPosition: string) => {
        const newInitialPositions = [...initialPositions];
        newInitialPositions[index] = newPosition;
        setInitialPositions(newInitialPositions);
    }

    const handlereflectorChange = (newReflector: string) => {
        setSelectedReflector(newReflector);
    }

    const handlePlugboardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let input = event.target.value.toUpperCase().replace(/[^A-Z]/g, "");
        input = input.match(/.{1,2}/g)?.join(" ") || input;
        setPlugboardConfig(input)
    }

    const handleReset = () => {
        const selectedConfig = selectedRotors.map((rotor, index) => ({
            rotor,
            ring: ringPositions[index],
            initialPosition: initialPositions[index],
        }));

        const plugboardPairs = plugboardConfig.split(" ").filter(pair => pair.length > 0);
        const uniqueLetters = new Set(plugboardPairs.join(""));
        if (plugboardPairs.some(pair => pair.length !== 2)
            || uniqueLetters.size !== plugboardPairs.join("").length) {

            setErrorMessage("Invalid plugboard configuration. Ensure pairs of unique letters separated by spaces.");
            setSuccessMessage("");
            return;
        }

        setErrorMessage("");
        onConfigurationChanged(selectedConfig, selectedReflector, plugboardConfig);
        setSuccessMessage("Configuration reset successfully.");
    };

    useEffect(() => {
        handleReset();
        setSuccessMessage(""); // Prevent initial config setting from displaying success message.
    }, []);


    const getAvailableRotors = (index: number)=> {
        return ALL_ROTORS.filter((rotor) => [selectedRotors.includes(rotor) ||
            selectedRotors[index] === rotor]);
    };

    return (
        <div className={"gird grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 " +
            "gap-4 p-4 rounded-lg shadow bg-white/10 text-white min-w-[300px"}>

            <div className={"flex flex-col gap-2"}>
                {selectedRotors.map((rotor, index) => (
                    <div key={ index } className={ "grid grid-cols-3 gap-2 p-2 rounded-md bg-white/5" }>
                        <div className={ "col-span-1 flex flex-col" }>
                            <label className={ "text-sm font-medium capitalize pl-2 pb-1" }>
                                Rotor { index + 1 }
                            </label>
                            <select
                                value={ rotor }
                                onChange={ ( e ) => handleRotorChange(index, e.target.value) }
                                className={ "bg-blue-500 text-white font-bold border-2 border-blue-300 " +
                                    "rounded-md px-2 py-1 text-sm hover:bg-blue-600 focus:outline-none " +
                                    "focus:border-blue-400 transition-colors" }
                            >
                                { getAvailableRotors ( index ).map ( ( availableRotor ) => (
                                    <option key={ availableRotor } value={ availableRotor }>
                                        Rotor { availableRotor }
                                    </option>
                                ) ) }

                            </select>

                        </div>

                        <div className={ "col-span-1 flex flex-col" }>
                            <label className={ "text-sm font-medium capitalize pl-2 pb-1" }>Position</label>
                            <select
                                value={ initialPositions[index] }
                                onChange={ (e) => handleInitialPositionChange(index, e.target.value) }
                                className={ "bg-blue-500 text-white font-bold border-2 border-blue-300 " +
                                    "rounded-md px-2 py-1 text-sm hover:bg-blue-600 focus: outline-none " +
                                    "focus:border-blue-400 transition-colors" }
                            >
                                { ALPHABET.map ( ( letter ) => (
                                    <option key={ letter } value={ letter }>
                                        { letter }
                                    </option>
                                ) ) }
                            </select>
                        </div>

                        <div className={ "col-span-1 flex flex-col" }>
                            <label className={ "text-sm font-medium capitalize pl-2 pb-1" }>Ring</label>
                            <select
                                value={ ringPositions[index] }
                                onChange={ (e) => handleRingChange(index, e.target.value) }
                                className={ "bg-blue-500 text-white font-bold border-2 border-blue-300 " +
                                    "rounded-md px-2 py-1 text-sm hover:bg-blue-600 focus: outline-none " +
                                    "focus:border-blue-400 transition-colors" }
                            >
                                { ALPHABET.map ( ( letter ) => (
                                    <option key={ letter } value={ letter }>
                                        { letter }
                                    </option>
                                ) ) }
                            </select>
                        </div>


                    </div>
                ) ) }

            </div>

            <div className={ "flex flex-col gap-4" }>

                <div className={ "flex flex-col gap-1 md:pt-2" }>
                    <label className={ "text-sm font-medium capitalize pl-4" }>Reflector</label>
                    <select
                        value={ selectedReflector }
                        onChange={ (e) => handlereflectorChange(e.target.value) }
                        className={ "bg-blue-500 text-white font-bold border-2 border-blue-300 " +
                            "rounded-md mx-2 px-2 py-1 text-sm hover:bg-blue-600 focus:outline-none " +
                            "focus:border-blue-400 transition-colors" }
                    >
                        {
                            ALL_REFLECTORS.map ( ( reflector ) => (
                                <option key={ reflector } value={ reflector }>
                                    Reflector { reflector }
                                </option>
                            ) )
                        }
                    </select>
                </div>

                <div className={ "flex flex-col gap-1 md:pt-2" }>
                    <label className={ "text-sm font-medium capitalize pl-4" }>Plugboard</label>
                    <input
                        type={"text"}
                        placeholder={"e.g. AB CD EF"}
                        value={ plugboardConfig }
                        onChange={ handlePlugboardChange }
                        className={"bg-blue-500 text-white font-bold border-2 border-blue-300 " +
                            "rounded-md mx-2 px-2 py-1 text-sm hover:bg-blue-600 focus:outline-none " +
                            "focus:border-blue-400 transition-colors"}
                    />

                    <small className={"text-xs text-gray-300 pl-2"}>
                        Enter pairs like "AB CD EF" (no repeated letters).
                    </small>
                </div>

                { errorMessage && <div className={"text-red-500 text-sm"}>{errorMessage}</div>}
                { successMessage && <div className={"text-green-500 text-sm"}>{successMessage}</div>}

                <button
                    onClick={ handleReset }
                    className={"bg-teal-500 text-white font-bold rounded-md px-2 py-1 " +
                        "hover:bg-teal-600 focus:outline-none focus:border-teal-400 transition-colors md:mt-2 md:mx-2"}
                    >
                    Reset
                </button>


            </div>

        </div>
    )


}

export default Configuration;