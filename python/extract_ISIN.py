import csv
import os
import json

# Get the absolute path to the CSV file
current_dir = os.path.dirname(os.path.abspath(__file__))
csv_file_path = os.path.join(current_dir, 'curvo_founds.csv')
csv_file_path_justetf = os.path.join(current_dir, 'justetf.csv')
json_file_path = os.path.join(current_dir, 'isin_values.json')

isin_values = []
isin_values_justetf = []

try:
    with open(csv_file_path, mode='r', encoding='ISO-8859-1') as f:
        reader = csv.DictReader(f, delimiter=';')  # read rows into a dictionary format
        for row in reader:  # read a row as {column1: value1, column2: value2,...}
            isin = row.get('ISIN')  # get the value of the 'ISIN' column
            if isin:
                isin_values.append(isin)  # append the ISIN value to the listù

    with open(csv_file_path_justetf, mode='r', encoding='ISO-8859-1') as j:
        reader = csv.DictReader(j, delimiter=';')  # read rows into a dictionary format
        for row in reader:  # read a row as {column1: value1, column2: value2,...}
            isin = row.get('ISIN')  # get the value of the 'ISIN' column
            if isin:
                isin_values_justetf.append(isin)  # append the ISIN value to the list
    # Write the ISIN values to a JSON file

    output_data = {
        'curvo_ISIN' : isin_values,
        'justetf_ISIN' : isin_values_justetf
    }
    with open(json_file_path, mode='w', encoding='utf-8') as json_file:
        json.dump(output_data, json_file, ensure_ascii=False, indent=4)

    print(f"ISIN values have been written to {json_file_path}")
    
except FileNotFoundError:
    print(f"File not found: {csv_file_path}")
except Exception as e:
    print(f"An error occurred: {e}")