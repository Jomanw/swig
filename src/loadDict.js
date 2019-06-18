var fs = require("fs")
var Trie = require("./trie.js").Trie
const dict = require("./data/romaji_to_english.json")
const dataSources = [require("./data/romaji_to_english.json"), require("./data/jlpt_data.json")]
const newDict = require("./data/jlpt_data.json");

function createEntryBlob(entry) {
  const englishDefinitions = entry.english_definitions
  const romaji = entry.romaji
  const commonality = entry.commonality
  const kanji = entry.kanji
  const kana = entry.kana

  rootTrie.insert(romaji, romaji, kanji, kana, commonality, englishDefinitions)
}

function createRootTrie(dict, rootTrie) {
  dict.entries.reverse().forEach(function(entry) {
    const englishDefinitions = entry.english_definitions
    const romaji = entry.romaji
    const commonality = entry.commonality
    const kanji = entry.word
    const kana = entry.reading
    rootTrie.insert(romaji, romaji, kanji, kana, commonality, englishDefinitions)

    // const englishDefinitions = entry.english_definitions
    // const romaji = entry.romaji
    // const commonality = entry.commonality
    // const kanji = entry.kanji
    // const kana = entry.kana
    // rootTrie.insert(romaji, romaji, kanji, kana, commonality, englishDefinitions)
  })
  newDict.entries.forEach(function(entry) {
    const englishDefinitions = entry.english_definitions
    const romaji = entry.romaji
    const commonality = entry.commonality
    const kanji = entry.kanji
    const kana = entry.kana
    rootTrie.insert(romaji, romaji, kanji, kana, commonality, englishDefinitions)
  })
}


function createRootTrieEnglish(dict, rootTrie) {
  dict.entries.reverse().forEach(function(entry) {
    const englishDefinitions = entry.english_definitions
    const romaji = entry.romaji
    const commonality = entry.commonality
    const kanji = entry.word
    const kana = entry.reading

    const key = englishDefinitions[0]
    const output = romaji


    rootTrie.insert(key, key, kanji, kana, commonality, [output])

    // const englishDefinitions = entry.english_definitions
    // const romaji = entry.romaji
    // const commonality = entry.commonality
    // const kanji = entry.kanji
    // const kana = entry.kana
    // rootTrie.insert(romaji, romaji, kanji, kana, commonality, englishDefinitions)
  })
  newDict.entries.forEach(function(entry) {
    const englishDefinitions = entry.english_definitions
    const romaji = entry.romaji
    const commonality = entry.commonality
    const kanji = entry.kanji
    const kana = entry.kana
    // rootTrie.insert(romaji, romaji, kanji, kana, commonality, englishDefinitions)

    const key = englishDefinitions[0]
    const output = romaji


    rootTrie.insert(key, key, kanji, kana, commonality, [output])

  })
}




var trieDict = new Trie()
createRootTrie(dict, trieDict)

var trieDictEnglish = new Trie()
createRootTrieEnglish(dict, trieDictEnglish)
module.exports.trieDictEnglish = trieDictEnglish
module.exports.trieDict = trieDict
