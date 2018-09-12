import requests
from bs4 import BeautifulSoup
import sys
import romkan
import json
import os


# TODO: Good resource to use is below:
# http://www.tanos.co.uk/jlpt/jlpt5/vocab/
# Also just a good link for quizlet: https://quizlet.com/190014308/flashcards




def get_jisho(word):
    api_result = requests.get("http://jisho.org/api/v1/search/words?keyword=%s"%word)
    json_results = json.loads(api_result.text)["data"]
    return json_results

dirname = os.path.dirname(os.path.realpath(__file__))
all_results_filename = os.path.join(dirname, "all_jisho_results.json")
minimal_results_filename = os.path.join(dirname, "./minimal_results.json")

page_urls = ["https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Japanese", "https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Japanese10001-20000"]

first_page = requests.get(page_urls[0])
first_soup = BeautifulSoup(first_page.content, 'html.parser')
first_body = first_soup.find("body")
first_entries = first_body.find_all("li")

second_page = requests.get(page_urls[1])
second_soup = BeautifulSoup(second_page.content, 'html.parser')
second_body = second_soup.find("body")
second_entries = second_body.find_all("li")

entries = first_entries + second_entries

all_results = []
all_results_json = {"entries": all_results}

minimal_results = []
minimal_results_json = {"entries": minimal_results}

def transform_result(result):
    japanese = result["japanese"]

    if 'reading' in japanese[0].keys():
        reading = japanese[0]['reading']
    elif 'word' in japanese[0].keys():
        reading = japanese[0]['word']
    else:
        reading = "No reading found"

    if 'word' in japanese[0].keys():
        word = japanese[0]['word']
    else:
        word = reading

    senses = result['senses']
    english_definitions = senses[0]['english_definitions']
    part_of_speech = senses[0]['parts_of_speech'][0]
    output = {
        "word": word,
        "reading": reading,
        "english_definitions": english_definitions,
        "part_of_speech": part_of_speech,
    }
    return output

for commonality, entry in enumerate(entries):
    try:
        word = entry.getText()
        print("Text: %s, Commonality: %i"%(word, commonality))
        meanings = get_jisho(word)
        all_results_load = {
            "word": word,
            "result": meanings,
            "commonality": commonality,
        }
        all_results.append(all_results_load)

        if len(meanings) == 0:
            continue

        top_meaning = meanings[0]

        minimal_results_load = transform_result(top_meaning)
        minimal_results_load["commonality"] = commonality
        minimal_results.append(minimal_results_load)
    except Exception as e:
        print("Something went wrong. ")
        print(e)

with open(all_results_filename, "w") as outfile:
    json.dump(all_results_json, outfile)

with open(minimal_results_filename, "w") as outfile:
    json.dump(minimal_results_json, outfile)
