var fs = require("fs")
var Trie = require("./trie.js").Trie
const dict = require("./data/romaji_to_english.json")

function createRootTrie(dict, rootTrie) {
  dict.entries.reverse().forEach(function(entry) {
    const englishDefinitions = entry.english_definitions
    const romaji = entry.romaji
    const commonality = entry.commonality
    const kanji = entry.word
    const kana = entry.reading
    rootTrie.insert(romaji, romaji, kanji, kana, commonality, englishDefinitions)
  })
}

var trieDict = new Trie()
createRootTrie(dict, trieDict)
module.exports.trieDict = trieDict
