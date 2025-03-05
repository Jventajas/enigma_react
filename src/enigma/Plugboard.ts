import { ALPHABET } from "./EnigmaUtils.ts";

class Plugboard {
    private mapping: Record<string, string>;

    constructor (connections: string[] = []) {
        this.mapping = Object.fromEntries(ALPHABET.map(letter => [letter, letter]));

        const allPlugLetters = connections.join("");
        if (new Set(allPlugLetters).size !== allPlugLetters.length) {
            throw new Error("Duplicate letters detected in plugboard connections");
        }

        for (const pair of connections) {
            const [a, b] = pair.split("");
            this.mapping[a] = b;
            this.mapping[b] = a;
        }
    }

    public swap(letter: string) {
        return this.mapping[letter];
    }

}

export default Plugboard;