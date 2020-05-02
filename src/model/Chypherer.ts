import { Mapping } from './Mapping';

export class Cypherer {
    private mapping: Mapping
    constructor(mapping: Mapping) {
        this.mapping = mapping;
    }

    isKey = (character: string) => Object.keys(this.mapping.keys).some((char: string) => char === character);
    map = (character: string): string => this.mapping.keys[character];
    inverse = (character: string): string => Object.keys(this.mapping.keys).find((key: string) => this.mapping.keys[key] === character) as string;
    inverseMap = (keyMapping: Mapping) => Object.entries(keyMapping).map((entry: [string, string]) => [entry[1], entry[0]]);
    processText = (text: string, processor: (character: string) => string) => {
        const characters: string[] = (Array
          .from(text) as string[]);
        return characters.length !== 0
          ? characters.map((character: string) => processor(character) ?? character)
          .reduce((a: string, b: string) => `${a}${b}`)
          : '';
    };
    deobfuscate = (text: string) => this.processText(text, this.inverse);
    obfuscate = (text: string) => this.processText(text, this.map);
}
