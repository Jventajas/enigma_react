import { ALPHABET } from "./EnigmaUtils.ts";

class Rotor {
    private wiring: string;
    private notch: string;
    private ring: number;
    private initialPosition: number;
    private position: number;

    constructor (wiring: string, notch: string, ring: string, initialPosition: string) {
        this.wiring = wiring;
        this.notch = notch;
        this.initialPosition = ALPHABET.indexOf(initialPosition);
        this.position = ALPHABET.indexOf(initialPosition);
        this.ring = ALPHABET.indexOf(ring);

    }

    public rotate() {
        this.position = (this.position + 1) % 26;
        return ALPHABET[this.position] === this.notch;
    }

    public encodeForward(letter: string) {
        const offset = this.position - this.ring;
        const inputIndex = ALPHABET.indexOf(letter);
        const adjustedInputIndex = (inputIndex + offset + 26) % 26;
        const encodedLetter = this.wiring[adjustedInputIndex];
        const encodedIndex = ALPHABET.indexOf(encodedLetter);
        const finalIndex= (encodedIndex - offset + 26) % 26;
        return ALPHABET[finalIndex];
    }

    public encodeBackward(letter: string) {
        const offset = this.position - this.ring;
        const inputIndex = ALPHABET.indexOf(letter);
        const adjustedInputIndex = (inputIndex + offset + 26) % 26;
        const adjustedLetter = ALPHABET[adjustedInputIndex];
        const wiringIndex = this.wiring.indexOf(adjustedLetter)
        const finalIndex= (wiringIndex - offset + 26) % 26;
        return ALPHABET[finalIndex];
    }

    public getPosition() {
        return this.position;
    }

    public reset() {
        this.position = this.initialPosition;
    }

    public getNotch() {
        return this.notch;
    }

}

export default Rotor;












