import { ALPHABET } from "./EnigmaUtils.ts";


class Reflector {
    private mapping: Record<string, string>;

    constructor (wiring: string) {
        this.mapping = Object.fromEntries(
            ALPHABET.map((letter, index) => [letter, wiring[index]])
        );
    }

    public reflect(letter: string) {
        return this.mapping[letter];
    }
}

export default Reflector;