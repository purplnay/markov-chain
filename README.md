# Markov Chain

A simple Marvkov chain class supporting different n-grams


## Usage


The docs is available [here](https://purplnay.github.io/markov-chain/MarkovChain.html).


```javascript
const MarkovChain = require('purpl-markov-chain');

const chain = new MarkovChain(); // Create a Markov chain

// Teach the chain some text.
chain.update('Adding some sentences');
chain.update('And more uwu');

// Generate a new sentence.
console.log(chain.generate());
```
