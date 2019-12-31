declare module 'purpl-markov-chain' {

  /**
  * A Markov Chain
  */
  export default class MarkovChain {
    /**
     * The start delimiter.
     */
    readonly start: string;

    /**
     * The end delimiter.
     */
    readonly end: string;

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
     * Create a MarkovChain instance from a JSON object.
     * @param json The JSON object.
     */
    static fromJSON(json: Object): MarkovChain;
  }
}
