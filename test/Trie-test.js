import { expect } from 'chai';
import Trie from '../lib/Trie.js';  
import fs from 'fs';
const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n')


  describe('Trie', () => {
    let trie;
  beforeEach(() => {
    trie = new Trie();
  })

    it('should hava a count property with a default value of 0', () => {
      expect(trie.count).to.equal(0)
    })

    it('should have a Root property with a default value of an empty node', () => {
      expect(trie.root).to.deep.equal({ data: null, child: {}, completeWord: null })
    })

    it('should have a suggestions property with a default value of an empty array', () => {
      expect(trie.suggestions).to.deep.equal([])
    })

    it('should take in words to create the perfect tree', () => {
      trie.insert('dog')
      trie.insert('funny')
      let expected = {
    "count": 2,
    "root": {
        "data": null,
        "child": {
            "d": {
                "data": "d",
                "child": {
                    "o": {
                        "data": "o",
                        "child": {
                            "g": {
                                "data": "g",
                                "child": {},
                                "completeWord": "dog"
                            }
                        },
                        "completeWord": null
                    }
                },
                "completeWord": null
            },
            "f": {
                "data": "f",
                "child": {
                    "u": {
                        "data": "u",
                        "child": {
                            "n": {
                                "data": "n",
                                "child": {
                                    "n": {
                                        "data": "n",
                                        "child": {
                                            "y": {
                                                "data": "y",
                                                "child": {},
                                                "completeWord": "funny"
                                            }
                                        },
                                        "completeWord": null
                                    }
                                },
                                "completeWord": null
                            }
                        },
                        "completeWord": null
                    }
                },
                "completeWord": null
            }
        },
        "completeWord": null
    },
    "suggestions": []
    }
      expect(trie).to.deep.equal(expected)
    })

  describe('Insert', () => {
    it('should convert all charactors to lower case', () => {
      trie.insert('CHILL')
      expect(trie.suggest('c')).to.deep.equal(['chill'])
    })

    it('should create a node for each letter of an inserted word', () => {
      trie.insert('iprefixTrie')
      let rootKey = Object.keys(trie.root.child)
      expect(rootKey).to.deep.equal(['i']);
    })

    it('should keep count of the words entered into the tree', () => {
      trie.insert('chill')
      expect(trie.count).to.equal(1);
    });

  });

  describe('Suggest', () => {
    it('should be able to offer suggestions', () => {
      trie.insert('dog')
      trie.insert('doggy')
      trie.insert('done')
      trie.suggest('d')
      expect(trie.suggestions).to.deep.equal(['dog', 'doggy', 'done']);
      // console.log(JSON.stringify(trie, null, 4))
    });  

  });

  describe('Populate', () => {
    it('should populate from the dictionary', () => {
      trie.populate(dictionary)
      trie.suggest('world')
      expect(trie.suggestions).to.deep.equal([         
        "world",
        "worlded",
        "worldful",
        "worldish",
        "worldless",
        "worldlet",
        "worldlike",
        "worldlily",
        "worldliness",
        "worldling",
        "worldly",
        "worldmaker",
        "worldmaking",
        "worldproof",
        "worldquake",
        "worldward",
        "worldwards",
        "worldway",
        "worldy"])
    })   

    it('should keep count of the words in the dictionary', () => {
      trie.populate(dictionary)
      expect(trie.count).to.equal(235886)
    })
  });

  describe('Count', () => {
    it('should return the number of words in the trie.', () => {
      trie.insert('wow')
      trie.insert('this')
      trie.insert('project')
      trie.insert('is')
      trie.insert('awesome')
      expect(trie.counter()).to.equal(5)
    })
  });

  describe('Contains', () => {
    it.only('should return true or false depending on if the word givin in complete', () => {
      trie.insert('eye');
      trie.insert('love');
      trie.insert('prefixtrie');
      
      expect(trie.contains('eye')).to.equal(true);
      expect(trie.contains('ey')).to.equal(false)

    })
  })
});
