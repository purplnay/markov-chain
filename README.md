# Markov Chain

A simple Marvkov chain class supporting different n-grams


## Usage


The docs is available [here](https://purplnay.github.io/markov-chain/MarkovChain.html).


## Installation

For use in npm, run the command:

`npm install --save purpl-markov-chain`.


For use in the browser, you can include the library from a CDN:

```html
<script src="https://unpkg.com/purpl-markov-chain/markov-chain.js">
```


## Usave

```javascript
// No need to include the file if working in the browser
const MarkovChain = require('purpl-markov-chain');

const chain = new MarkovChain(); // Create a Markov chain

// Teach the chain some text.
chain.update('Adding some sentences');
chain.update('And more uwu');

// Generate a new sentence.
console.log(chain.generate());
```
