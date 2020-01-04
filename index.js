/**
 * A Markov Chain
 */
class MarkovChain {

  /**
   * Create a Markov chain.
   * 
   * @param {number} [nGrams=3] The size of the n-gram.
   * @param {string} [start='%startf%'] The start delimiter to use. Must not contain the separation token.
   * @param {string} [end='%endf%'] The end delimiter to use. Must not contain the separation token.
   * @param {string} [separation=' '] The separation token to use to split the new texts.
   */
  constructor(nGrams = 3, start = '%startf%', end = '%endf%', separation = ' ') {

    /**
     * The n-gram used by the chain.
     * 
     * @type {number}
     */
    this.nGrams = nGrams > 1 ? nGrams : 3;

    /**
     * The formatted start delimiter.
     * 
     * @type {string}
     */
    this.start = start;

    /**
     * The formatted end delimiter.
     * 
     * @type {string}
     */
    this.end = end;

    /**
     * The separation token used to split the new texts.
     * 
     * @type {string}
     */
    this.separation = separation;

    /**
     * The corpus of the chain.
     * 
     * @type {string[][]}
     */
    this.corpus = [];
  }

  /**
   * Update the corpus of the chain.
   * 
   * @param {string} text The text to add.
   * @return {MarkovChain} The current MarkovChain instance, updated.
   */
  update(text) {
    if (text.trim().length === 0) return this;

    const words = [`${this.start}${this.separation}`.repeat(this.nGrams - 1), ...`${text}`.split(this.separation), this.end];

    for (let i in words) {
      const index = Number(i);

      if (index < words.length - 1) {
        this.corpus.push(words.slice(index, index + this.nGrams));
      }
    }

    return this;
  }

  /**
   * Generate a new text.
   * 
   * @param {string} [start=this.start] The word to start with.
   * @return {string} The generated text.
   */
  generate(start = this.start) {
    if (this.corpus.length === 0) return '';

    const words = [start];

    while (words[words.length - 1] !== this.end) {
      const nextChains = this.corpus.filter(chain => chain[0] === words[words.length - 1]);
      const nextChain = nextChains[Math.floor(Math.random() * nextChains.length)];

      words.push(...nextChain.slice(1));
    }

    words.shift();
    words.pop();

    return words.join(this.separation);
  }

  /**
   * Build a sentence from a word.
   * 
   * @param {string} word The word to build a sentence from.
   * @return {string}
   */
  generateFrom(word) {
    if (this.corpus.length === 0 || !this.contains(word) || word === this.start || word === this.end) return '';

    const leftPart = [];
    const rightPart = this.generate(word);

    let search = word;

    while (search !== this.start) {
      if (search === word) {
        const chains = this.corpus.filter(chain => chain.indexOf(word) > 0);
        const chain = [...chains[Math.floor(Math.random() * chains.length)]].reverse();

        while (chain[0] !== word) {
          chain.shift();
        }

        leftPart.push(...chain);

        search = leftPart[leftPart.length - 1];

        continue;
      }

      const nextChains = this.corpus.filter(chain => chain[chain.length - 1] === search);
      const nextChain = nextChains[Math.floor(Math.random() * nextChains.length)];

      leftPart.push(...nextChain.reverse().slice(1));
      search = leftPart[leftPart.length];
    }

    leftPart.pop();

    return [...leftPart.reverse(), rightPart].join(this.separation);
  }

  /**
   * Check if the Markov chain contains a word.
   * 
   * @param {string} word The word to check.
   * @return {boolean}
   */
  contains(word) {
    return this.corpus.filter(s => s.indexOf(word) !== -1).length > 0;
  }

  /**
   * Transforms the current Markov chain to a JSON object.
   * 
   * @return {Object} The current Markov chain as a JSON object.
   */
  toJSON() {
    return {
      nGrams: this.nGrams,
      start: this.start,
      end: this.end,
      separation: this.separation,
      corpus: [...this.corpus]
    };
  }

  /**
   * Transforms the current Markov chain to a JSON string.
   * 
   * @return {string} The current Markov chain as a JSON string.
   */
  toString() {
    return JSON.stringify(this.toJSON());
  }

  /**
   * Create a MarkovChain instance from a JSON object.
   * 
   * @param {Object} json The JSON object.
   * @return {MarkovChain} The MarkovChain instance built from the JSON.
   */
  static fromJSON(json) {
    const markovChain = new MarkovChain(json.nGrams, json.start, json.end, json.separation);

    markovChain.corpus = [...json.corpus];

    return markovChain;
  }

/**
 * Create a MarkovChain instance from a JSON string.
 *
 * @param {string} json The JSON string.
 * @return {MarkovChain} The MarkovChain instance built from the string.
 */
  static fromString(str) {
    return this.fromJSON(JSON.parse(str));
  }
}

if (typeof window !== 'undefined') {
  window.MarkovChain = MarkovChain;
} else {
  module.exports = MarkovChain;
}
