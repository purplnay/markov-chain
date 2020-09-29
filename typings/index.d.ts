declare module 'purpl-markov-chain' {
  type MarkovChainJSON = {
    from: string,
    grams: number,
    backward: boolean
  }

  type MarkovChainResolvable = MarkovChainJSON | string

  type GenerationConfig = {
    from: string,
    grams: number,
    backward: boolean
  }

  /**
   * A Markov chain
   */
  class MarkovChain {

    /** The sentences learnt by the Markov chain */
    corpus: string[][]

    /** A list of all the words learnt. */
    dictionary: string[]

    /** The default config to use for generation */
    config: GenerationConfig

    constructor(base?: MarkovChainResolvable)

    /**
     * Add a semtemce tp the Markov chain.
     * 
     * @param sentence - The sentence to add.
     */
    update(sentence: string): void

    /**
     * Search if a word is in the corpus.
     * 
     * @param word - The word to search for.
     */
    contains(word: string): boolean

    /**
     * Generate a new sentence.
     * 
     * @param config - The config to use for the generation.
     */
    generate(config?: GenerationConfig): string

    /**
     * Get a JSON version of the chain object.
     */
    toJSON(): MarkovChainJSON

    /**
     * Get a string version of the chain object.
     */
    toString(): string
  }

  export default MarkovChain
}
