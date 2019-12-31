module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    path: __dirname,
    library: 'MarkovChain',
    filename: 'purpl-markov-chain.js',
  }
}
