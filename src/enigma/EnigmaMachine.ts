
import { ALPHABET } from "./EnigmaUtils.ts";
import Rotor from "./Rotor.ts";
import Plugboard from "./Plugboard.ts";
import Reflector from "./Reflector.ts";

class EnigmaMachine {
    private rotors: Rotor[];
    private plugboard: Plugboard;
    private reflector: Reflector;

    constructor (rotors: Rotor[], reflector: Reflector, plugboard: Plugboard) {
        this.rotors = rotors;
        this.reflector = reflector;
        this.plugboard = plugboard;
    }

    private stepRotors() {
        const [left, middle, right] = this.rotors;

        const middleAtNotch = ALPHABET[middle.getPosition()] === middle.getNotch();
        const rightAtNotch = ALPHABET[right.getPosition()] === right.getNotch();

        if (middleAtNotch) {
            left.rotate();
        }

        if (middleAtNotch || rightAtNotch) {
            middle.rotate();
        }

        right.rotate();
    }

    public reset() {
        for (const rotor of this.rotors) {
            rotor.reset();
        }
    }

    public encodeLetter(letter: string) {

        if (!ALPHABET.includes(letter)) {
            return letter;
        }

        this.stepRotors();
        letter = this.plugboard.swap(letter);

        for (const rotor of [...this.rotors].reverse()) {
            letter = rotor.encodeForward(letter);
        }

        letter = this.reflector.reflect(letter);

        for (const rotor of this.rotors) {
            letter = rotor.encodeBackward(letter);
        }

        letter = this.plugboard.swap(letter)
        return letter;

    }
    

}

export default EnigmaMachine;







