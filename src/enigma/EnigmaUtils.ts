
export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const REFLECTOR_CONFIGS: Record<string, string> = {
    A: "EJMZALYXVBWFCRQUONTSPIKHGD",
    B: "YRUHQSLDPXNGOKMIEBFZCWVJAT",
    C: "FVPJIAOYEDRZXWGCTKUQSBNMHL",
};

export const ROTOR_CONFIGS: Record<string, { wiring: string; notch: string }> = {
    I: { wiring: "EKMFLGDQVZNTOWYHXUSPAIBRCJ", notch: "Q" },
    II: { wiring: "AJDKSIRUXBLHWTMCQGZNPYFVOE", notch: "E" },
    III: { wiring: "BDFHJLCPRTXVZNYEIWGAKMUSQO", notch: "V" },
    IV: { wiring: "ESOVPZJAYQUIRHXLNFTGKDCMWB", notch: "J" },
    V: { wiring: "VZBRGITYUPSDNHLXAWMJQOFECK", notch: "Z" },
}