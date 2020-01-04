declare module 'purpl-markov-chain' {

  /**
  * A Markov Chain
  */
  export default class MarkovChain {
    /**
     * The start delimiter.
     */
    start: string;

    /**
     * The end delimiter.
     */
    end: string;

    /**
     * The n-gram used by the chain.
     */
    nGrams: number;

    /**
     * The separation token used to split the new texts.
     */
    separation: string;

    /**
     * The corpus of the chain. uwu
     */
    corpus: string[][];

    /**
     * Create a Markov chain.
     * @param nGrams The size of the n-gram.
     * @param start The start delimiter to use. Must not contain the separation token.
     * @param end The end delimiter to use. Must not contain the separation token.
     * @param separation The separation token to use to split the new texts.
     */
    constructor(nGrams?: number, start?: string, end?: string, separation?: string);

    /**
     * Update the corpus of the chain.
     * @param text The text to add.
     */
    update(text: string): MarkovChain;

    /**
     * Generate a new text.
     * @param start The word to start with.
     */
    generate(start?: string): string;

    /**
     * Transforms the current Markov chain to a JSON object.
     */
    toJSON(): Object;

    /**
     * Transforms the current Markov chain to a JSON string.
     * @return The current Markov chain as a JSON string.
     */
    toString(): string;

    /**
     * Create a MarkovChain instance from a JSON object.
     * @param json The JSON object.
     * @return The MarkovChain instance built from the JSON.
     */
    static fromJSON(json: Object): MarkovChain;

    /**
     * Create a MarkovChain instance from a JSON string.
     * @param str The JSON string.
     * @return The MarkovChain instance built from the string.
     */
    static fromString(str: string): MarkovChain;
  }
}
