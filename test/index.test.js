const assert = require('assert')
const MarkovChain = require('../index')

let chain

describe('MarkovChain', () => {
  beforeEach(() => {
    chain = new MarkovChain()
  })

  describe('#update()', () => {
    it('should throw an error when given an incorrect input', () => {
      assert.throws(chain.update)
    })

    it('should successfully update the dictionary', () => {
      chain.update('Some text')
      assert.ok(chain.dictionary.length === 2)
      chain.update('Some more')
      assert.ok(chain.dictionary.length === 3)
    })

    it('should successfully update the corpus', () => {
      const i = chain.dictionary.indexOf('Some')

      assert.ok(chain.corpus.filter(c => c.includes(i)))
    })
  })

  describe('#contains()', () => {
    it('should save the words learnt', () => {
      chain.update('some words')
      assert.ok(chain.contains('some'))
      assert.ok(chain.contains('words'))
      assert.ok(!chain.contains('idk'))
    })
  })

  describe('#generate()', () => {
    it('should generate a sentence', () => {
      chain.update('hi')
      assert.ok(chain.generate() === 'hi')
    })

    it('should generate a sentence from start', () => {
      chain.update('hi everyone i am a markov chain blah blah blah')
      assert.ok(chain.generate().startsWith('hi'))
    })

    it('should generate a sentence from a given word', () => {
      chain.update('hi am i a test OwO')
      assert.ok(chain.generate({ from: 'test' }).startsWith('test'))
      assert.ok(chain.generate({ from: 'OwO' }).length === 3)
    })

    it('should generate a sentence backward from a given word', () => {
      chain.update('i should be generated from UwU')
      assert.ok(chain.generate({ from: 'UwU', backward: true }).startsWith('i'))
    })

    it('should give an empty sentence when given an unknown word', () => {
      assert.ok(chain.generate({ from: 'uwu' }).length === 0)
    })

    it('should generate a sentence ending with the given word', () => {
      chain.update('hi everyone i am a test OwO')
      assert.ok(chain.generate({ from: 'everyone', backward: true }).startsWith('hi'))
      assert.equal(chain.generate({ from: 'test', backward: true }), 'hi everyone i am a test')
    })
  })
})
