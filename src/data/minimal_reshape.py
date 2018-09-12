import json
import os
import romkan
import sys
import matplotlib.pyplot as plt
import numpy as np

dirname = os.path.dirname(os.path.realpath(__file__))
filename = os.path.join(dirname, "minimal_results.json")
output_file_path = os.path.join(dirname, "romaji_to_english.json")

# Load the input file
with open(filename) as f:
    minimal_results = json.load(f)


count = 0

entries = []
output_data = {"entries": entries}

check_dict = {}

for entry in minimal_results["entries"]:

    romaji = romkan.to_hepburn(entry['reading'])
    entry['romaji'] = romaji
    # print(count)
    # print(entry)
    # print(romaji)
    count += 1
    # if count > 500:
    #     break
    if romaji not in check_dict:
        check_dict[romaji] = 0
    check_dict[romaji] += 1
    entries.append(entry)
# print(np.mean(check_dict.values()))
# print(output_data)
print(check_dict.values())
plt.hist(check_dict.values())
plt.show()

with open(output_file_path, 'w') as outfile:
    json.dump(output_data, outfile)
# print(minimal_results)
