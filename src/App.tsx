import Display from "./components/Display.tsx";
import Keyboard from "./components/Keyboard.tsx";
import Lampboard from "./components/Lampboard.tsx";
import { useEffect , useState } from "react";
import { ALPHABET , REFLECTOR_CONFIGS , ROTOR_CONFIGS } from "./enigma/EnigmaUtils.ts";
import Rotor from "./enigma/Rotor.ts";
import Reflector from "./enigma/Reflector.ts";
import Plugboard from "./enigma/Plugboard.ts";
import EnigmaMachine from "./enigma/EnigmaMachine.ts";
import Configuration from "./components/Configuration.tsx";


function App () {
    const [ typedText , setTypedText ] = useState ( "" );
    const [ encodedText , setEncodedText ] = useState ( "" );
    const [ lastEncodedLetter , setLastEncodedLetter ] = useState<string> ( "" );

    const rotor1 = new Rotor ( ROTOR_CONFIGS["I"].wiring , ROTOR_CONFIGS["I"].notch , "A" , "A" )
    const rotor2 = new Rotor ( ROTOR_CONFIGS["II"].wiring , ROTOR_CONFIGS["II"].notch , "A" , "B" )
    const rotor3 = new Rotor ( ROTOR_CONFIGS["III"].wiring , ROTOR_CONFIGS["III"].notch , "A" , "C" )

    const reflector = new Reflector ( REFLECTOR_CONFIGS["B"] )
    const plugboard = new Plugboard ( [ "AB" , "CD" , "EF" ] )

    const em = new EnigmaMachine ( [ rotor1 , rotor2 , rotor3 ] , reflector , plugboard );

    const [ enigma , setEnigma ] = useState<EnigmaMachine | null> ( em );

    useEffect ( () => {
        const handleKeyPress = ( event : KeyboardEvent ) => {
            if ((event.target as HTMLElement).tagName === "INPUT") {
                return;
            }
            const key = event.key.toUpperCase ();
            if (key === " ") {
                event.preventDefault ();
            }
            if (ALPHABET.includes ( key ) || key === " " || key === "BACKSPACE") {
                handleKeyPressed ( key );
            }
        }

        window.addEventListener ( "keydown" , handleKeyPress );
        return () => {
            window.removeEventListener ( "keydown" , handleKeyPress )
        };
    } , [ typedText , encodedText ] );


    const handleKeyPressed = ( key : string ) => {
        if (key === " ") {
            setTypedText ( ( prev ) => prev + " " );
            setEncodedText ( ( prev ) => prev + " " );
        } else if (key === "BACKSPACE") {
            setTypedText ( ( prev ) => prev.slice ( 0 , -1 ) );
            setEncodedText ( ( prev ) => prev.slice ( 0 , -1 ) );
        } else if (ALPHABET.includes ( key )) {
            if (enigma) {
                enigma.reset ();

                const updatedText = typedText + key;
                const encodedText = updatedText.split ( "" ).map ( ( letter ) => {
                    return enigma.encodeLetter ( letter );
                } ).join ( "" );

                setTypedText ( updatedText );
                setEncodedText ( encodedText );
                setLastEncodedLetter ( encodedText.slice ( -1 ) );

            }
        }
    }

    const handleConfigurationChanged = (
        rotorConfigurations: { rotor: string; ring: string; initialPosition: string }[],
        selectedReflector: string, plugboardConfig: string)=> {

        const newReflector = new Reflector(REFLECTOR_CONFIGS[selectedReflector]);
        const newRotors = rotorConfigurations.map((config) => {
            return new Rotor(
                ROTOR_CONFIGS[config.rotor].wiring,
                ROTOR_CONFIGS[config.rotor].notch,
                config.initialPosition,
                config.ring
            );
        });

        const newPlugboard = new Plugboard(plugboardConfig.split(" "));
        setEnigma(new EnigmaMachine(newRotors, newReflector, newPlugboard));
        setTypedText("");
        setEncodedText("");
        setLastEncodedLetter("");
    }


    return (
        <div className={ "min-h-screen w-full bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 " +
            "flex flex-col items-center p-6 gap-6" }>
            <h1 className={ "text-white text-4xl font-bold mb-6" }>Enigma I</h1>
            <div className={ "w-full max-w-6xl flex justify-center" }>

                <div className={ "flex flex-col lg:flex-row gap-6" }>
                    <div className={ "flex flex-col gap-6 flex-grow lg:flex-grow-[2]" }>
                        {/*Display and keyboard go here*/ }
                        <Display typedText={ typedText } encodedText={ encodedText }/>
                        <Lampboard encodedLetter={ lastEncodedLetter }/>
                        <Keyboard onKeyPressed={ handleKeyPressed }/>

                    </div>
                    <div className={ "flex-grow lg:flex-grow-[1]" }>
                        {/*Configuration for the engima machine goes here*/ }
                        <Configuration onConfigurationChanged={ handleConfigurationChanged }/>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default App
