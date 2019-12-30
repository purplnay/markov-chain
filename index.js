/**
 * A Markov Chain
 */
class MarkovChain {

  /**
   * Create a Markov chain.
   * 
   * @param {number} [nGrams=3] The size of the n-gram.
   * @param {string} [start=%startf%] The start delimiter to use. Must not contain the separation token.
   * @param {string} [end=%endf%] The end delimiter to use. Must not contain the separation token.
   * @param {string} [separation= ] The separation token to use to split the new texts.
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
     * @private
     */
    this._start = `${start} `;

    /**
     * The formatted end delimiter.
     * 
     * @type {string}
     * @private
     */
    this._end = ` ${end}`;

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
   * The start delimiter.
   * 
   * @readonly
   * @type {string}
   */
  get start() {
    return this._start.trim();
  }

  /**
   * The end delimiter.
   * 
   * @readonly
   * @type {string}
   */
  get end() {
    return this._end.trim();
  }

  /**
   * Update the corpus of the chain.
   * 
   * @param {string} text The text to add.
   * @return {MarkovChain} The current MarkovChain instance, updated.
   */
  update(text) {
    if (text.trim().length === 0) return this;

    const words = this._trim(`${this._start.repeat(this.nGrams)} ${text} ${this._end.repeat(this.nGrams)}`).split(' ');

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
   * @param {string} [start=%this._start%] The word to start with.
   * @return {string} The generated text.
   */
  generate(start = this._start) {
    if (this.corpus.length === 0) return '';

    const words = [start.trim()];

    while (words[words.length - 1] !== this._end.trim()) {
      const nextChains = this.corpus.filter(chain => chain[0] === words[words.length - 1]);
      const nextChain = nextChains[Math.floor(Math.random() * nextChains.length)];

      words.push(...nextChain.slice(1));
    }

    return words.join(' ')
      .replace(new RegExp(this._start, 'g'), '')
      .replace(new RegExp(this._end, 'g'), '')
      .trim();
  }

  /**
   * Removes all double+ spaces and leading and trailing spaces.
   * 
   * @param {string} str The string to trim.
   * @return {string} The trimmed string.
   * @private
   */
  _trim(str) {
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
      start: this.start,
      end: this.end,
      separation: this.separation,
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
    const markovChain = new MarkovChain(json.nGrams, json.start, json.end, json.separation);

    markovChain.corpus = [...json.corpus];

    return markovChain;
  }
}

module.exports = MarkovChain;
