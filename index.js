/**
 * A Markov Chain
 */
class MarkovChain {

  /**
   * Create a Markov chain.
   * 
   * @param {number} [nGrams=3] The size of the n-gram.
   * @param {string} [start=%startf%] The start delimiter to use.
   * @param {string} [end=%endf%] The end delimiter to use.
   */
  constructor(nGrams = 3, start = '%startf%', end = '%endf%') {

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
    this.start = `${start} `;

    /**
     * The formatted end delimiter.
     * 
     * @type {string}
     */
    this.end = ` ${end}`;

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

    const words = this.trim(`${this.start.repeat(this.nGrams)} ${text} ${this.end.repeat(this.nGrams)}`).split(' ');

    for (let i in words) {
      const index = Number(i);

      if (index < words.length - (this.nGrams - 1)) {
        this.corpus.push(words.slice(index, index + this.nGrams));
      }
    }

    return this;
  }

  /**
   * Generate a new text.
   * 
   * @param {string} [start=%this.start%] The word to start with.
   * @return {string} The generated text.
   */
  generate(start = this.start) {
    if (this.corpus.length === 0) return '';

    const words = [start.trim()];

    while (words[words.length - 1] !== this.end.trim()) {
      const nextChains = this.corpus.filter(chain => chain[0] === words[words.length - 1]);
      const nextChain = nextChains[Math.floor(Math.random() * nextChains.length)];

      words.push(...nextChain.slice(1));
    }

    return words.join(' ')
      .replace(new RegExp(this.start, 'g'), '')
      .replace(new RegExp(this.end, 'g'), '')
      .trim();
  }

  /**
   * Removes all double+ spaces and leading and trailing spaces.
   * 
   * @param {string} str The string to trim.
   * @return {string} The trimmed string.
   */
  trim(str) {
    return str.replace(/\s\s+/g, ' ').trim();
  }

  /**
   * Transforms the current Markov chain to a JSON object.
   * 
   * @return {Object} The current Markov chain as a JSON object.
   */
  toJSON() {
    return {
      nGrams: this.nGrams,
      start: this.start.trim(),
      end: this.end.trim(),
      corpus: [...this.corpus]
    };
  }

  /**
   * Create a MarkovChain instance from a JSON object.
   * 
   * @param {Object} json The JSON object.
   * @return {MarkovChain} The MarkovChain instance built from the JSON.
   */
  static fromJSON(json) {
    const markovChain = new MarkovChain(json.nGrams, json.start, json.end);

    markovChain.corpus = [...json.corpus];

    return markovChain;
  }
}

module.exports = MarkovChain;
