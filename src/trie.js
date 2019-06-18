class Trie {

  // Create a new, empty trie object
  constructor() {
    this.frequency = 0
    this.isWord = false
    this.definitions = [""]
    this.children = {}
  }

  // insert a word into the trie object
  insert(suffix, word, kanji, kana, frequency, definitions) {
    if (suffix.length == 0) {
      this.definitions = definitions
      this.frequency = frequency
      this.isWord = true
      this.word = word
      this.kanji = kanji
      this.kana = kana

    } else {
      var firstLetter = suffix.charAt(0)
      if (!(firstLetter in this.children)) {
        this.children[firstLetter] = new Trie()
      }
      this.children[firstLetter].insert(suffix.slice(1), word, kanji, kana, frequency, definitions)
    }
  }

  // find if a word exists in the trie; returns false if it's not in there
  find(word) {
    if (word.length == 0) {
      if (!this.isWord) {
        return false
      } else {
        return this
      }
    } else {
      var firstLetter = word.charAt(0)
      if (!(firstLetter in this.children)) {
        return false
      }
      var newTrie = this.children[firstLetter]
      return newTrie.find(word.slice(1))
    }
  }

  getTrie(prefix) {
    if (prefix.length == 0) {
      return this
    } else {
      var firstLetter = prefix.charAt(0)
      if (!(firstLetter in this.children)) {
        return false
      }
      var newTrie = this.children[firstLetter]
      return newTrie.getTrie(prefix.slice(1))
    }
  }

  getSuffixes() {
    var suffixes = []
    if (this.isWord) {
      suffixes.push({
        frequency: this.frequency,
        definitions: this.definitions,
        suffix: "",
        word:this.word,
        kanji:this.kanji,
        kana:this.kana,
      })
    }
    // for each letter in the children
    for (var letter in this.children) {
      var newTrie = this.children[letter]
      var newSuffixes = newTrie.getSuffixes()
      newSuffixes.forEach( function(suffixContainer) {
        var newSuffix = {
          frequency: suffixContainer.frequency,
          suffix: letter + suffixContainer.suffix,
          definitions: suffixContainer.definitions,
          word: suffixContainer.word,
          kanji: suffixContainer.kanji,
          kana: suffixContainer.kana,
        }
        suffixes.push(newSuffix)
      })
    }
    return suffixes
  }
  // Get the most likely matches from the given prefix
  autocomplete(prefix, numResults) {
    var baseTrie = this.getTrie(prefix)
    if (!baseTrie) {
      return []
    }
    var wordContainers = baseTrie.getSuffixes()
    wordContainers.sort(function(first, second) {
      return first.word.length - second.word.length
    })
    // wordContainers.sort(function(first, second) {
    //   return first.frequency - second.frequency
    // })
    return wordContainers.slice(0, numResults)
  }
}
module.exports.Trie = Trie
