import requests
from bs4 import BeautifulSoup
import sys
import romkan
import json
import os

dirname = os.path.dirname(os.path.realpath(__file__))
results_filename = os.path.join(dirname, "./jlpt_data.json")



def parse_row(row, level):
    return {
        "kanji": row[0].text,
        "hiragana": row[1].text,
        "romaji": romkan.to_hepburn(row[1].text),
        "english_definition": row[2].text,
        "jlpt_level": level,
    }

# Goes through each of the JLPT levels, 1 - 5

entries = []
output_results = {"entries": entries}

for level in range(1, 6):
    html = requests.get("http://www.tanos.co.uk/jlpt/jlpt%i/vocab/"%(level))
    soup = BeautifulSoup(html.text)
    table = soup.find("table", {"border": "1"})
    for row in table.find_all("tr"):
        row_elements = row.find_all("td")
        if len(row_elements) == 0:
            continue
        parsed_row = parse_row(row_elements, level)
        entries.append(parsed_row)

    print(len(entries))

with open(results_filename, "w") as outfile:
    json.dump(output_results, outfile)
