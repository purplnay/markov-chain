/**
 * @typedef {Object} MarkovChainJSON - A JSON representation of a Markov chain object.
 * @property {string[][]} corpus - The corpus.
 * @property {string[]} dictionary - The dictionary.
 * @property {GenerationConfig} config - The default config used for sentence generation.
 */

/**
 * @typedef {MarkovChainJSON | string} MarkovChainResolvable
 */

/**
 * @typedef {Object} GenerationConfig - A config object used to generate sentences.
 * @property {string} from - The word to start generating from
 * @property {number} grams - The sequence length to use.
 * @property {boolean} backward - Whether to generate backward or not.
 */

/**
 * A Markov chain.
 */
class MarkovChain {

  /**
   * Create a new MarkovChain.
   * 
   * @example
   * // Create a new chain
   * const chain = new MarkovChain()
   * 
   * // Add text
   * chain.update('some text')
   * 
   * // Export it to string or to JSON
   * const str = chain.toString()
   * const json = chain.toJSON()
   * 
   * // Create new chains based on our saves
   * const fromStr = new MarkovChain(str)
   * const fromJSON = new markovChain(json)
   * 
   * @param {MarkovChainResolvable} [base] - A saved chain from .toJSON or .toString.
   */
  constructor(base = {}) {
    try {
      base = typeof base === 'string' ? base : JSON.stringify(base)
    } catch {
      throw 'Invalid \'base\' argument. Needs type MarkovChainResolvable.'
    }

    base = JSON.parse(base)

    /**
     * The sentences learnt by the Markov chain.
     * 
     * @type {string[][]}
     */
    this.corpus = base.corpus || []

    /**
     * A list of all the words learnt.
     * 
     * @type {string[]}
     */
    this.dictionary = base.dictionary || []

    /**
     * The default config to use for generation
     * 
     * @type {GenerationConfig}
     */
    this.config = base.config || {
      from: '',
      grams: 2,
      backward: false
    }
  }

  /**
   * Add a sentence to the Markov chain.
   * 
   * @example
   * const chain = new MarkovChain()
   * 
   * chain.update('Some text')
   * 
   * @param {string} sentence - The sentence to add.
   */
  update(sentence) {
    if (typeof sentence !== 'string') throw 'The argument should be a string'

    const words = sentence.split(' ')
    const last = this.corpus.length

    this.corpus.push([])

    words.forEach(word => {
      const index = this.dictionary.indexOf(word)

      if (index === -1) {
        this.dictionary.push(word)
        this.corpus[last].push(this.dictionary.length - 1)
      } else {
        this.corpus[last].push(index)
      }
    })
  }

  /**
   * Search if a word is in the corpus.
   * 
   * @example
   * const chain = new MarkovChain()
   * 
   * console.log(chain.contains('OwO')) // false
   * 
   * chain.update('hi OwO')
   * 
   * console.log(chain.contains('OwO')) // true
   * 
   * @param {string} word - The word to search for.
   * @return {boolean}
   */
  contains(word) {
    return this.dictionary.includes(word)
  }

  /**
   * Generate a new sentence.
   * 
   * @example <caption>Generate a sentence</caption>
   * // Create a Markov chain
   * const chain = new MarkovChain()
   * 
   * // Add some words to it
   * chain.update('Some words')
   * chain.update('Some more words')
   * chain.update('Some OwO')
   * 
   * // Generate a sentence
   * const sentence = chain.generate()
   * console.log(sentence)
   * 
   * // Generate a sentence starting with 'OwO'
   * const owo = chain.generate({ from: 'OwO' })
   * console.log(owo)
   * 
   * // Generate a sentence backward
   * const backwardOwO = chain.generate({ from: 'OwO', backward: true })
   * console.log(backwardOwO)
   * 
   * @param {GenerationConfig} [config=this.config] - The config to use for the generation.
   * @return {string}
   */
  generate(config = {}) {
    const from = config.from || this.config.from
    const grams = config.grams || this.config.grams
    const backward = config.backward || this.config.backward

    if (from !== '' && !this.contains(from)) return ''

    const  sentence = []

    let done = false

    // If no 'from' is set, get a random first word
    if (!from.length) {
      if (backward) {
        const random = this._getRandom(this.corpus)

        sentence.push(random[random.length - 1])
      } else {
        sentence.push(this._getRandom(this.corpus)[0])
      }
    } else {
      sentence.push(this.dictionary.indexOf(from))
    }

    // Get next words until done
    while (!done) {
      const last = sentence[sentence.length - 1]

      // Get the possible chains
      const possibleChains = this.corpus.filter(s => s.includes(last))

      // Select a random one
      const chain = this._getRandom(possibleChains)

      // Keep the ngram length of it
      const wordIndex = chain.indexOf(last)
      const sequence = []

      if (backward) {
        const start = wordIndex - grams

        chain
          .slice(start >= 0 ? start : 0, wordIndex)
          .reverse()
          .forEach(word => sequence.push(word))
      } else {
        chain
          .slice(wordIndex + 1, wordIndex + grams + 1)
          .forEach(word => sequence.push(word))
      }

      sentence.push(...sequence)

      // Set done to true if end of sentence
      if (backward) {
        done = wordIndex - grams <= 0
      } else {
        done = wordIndex + grams >= chain.length - 1
      }
    }

    // Translate and return the result
    if (backward) {
      return sentence
        .reverse()
        .map(word => this.dictionary[word])
        .join(' ')
    } else {
      return sentence
        .map(word => this.dictionary[word])
        .join(' ')
    }
  }

  /**
   * Get a JSON version of the chain object.
   * 
   * @return {MarkovChainJSON}
   */
  toJSON() {
    return {
      corpus: this.corpus.map(s => [...s]),
      dictionary: [...this.dictionary],
      config: { ...this.config }
    }
  }

  /**
   * Get a string version of the chain object.
   * 
   * @return {string}
   */
  toString() {
    return JSON.stringify(this.toJSON())
  }

  /**
   * Get a random element from an array.
   * 
   * @param {Array} arr - The array to get a random element from.
   * @return {*}
   * @private
   */
  _getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }
}

if (typeof window === 'undefined') {
  module.exports = MarkovChain;
}
