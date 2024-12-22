from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from selenium.webdriver.chrome.options import Options

import csv

# filename = "details.csv"

# #setup chrome webdriver
# driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

# url = 'https://curvo.eu/backtest/en/funds'

# #load the web page
# driver.get(url)
# # driver.implicitly_wait(10)

# WebDriverWait(driver, 1).until(EC.presence_of_element_located((By.TAG_NAME, 'tr')))


# rows = driver.find_elements(By.TAG_NAME, 'tr')

# # Apri il file CSV per scrivere i dati
# with open(filename, mode='w', newline='') as file:
#     writer = csv.writer(file)
#     # Scrivi l'intestazione del CSV
#     writer.writerow(['Name', 'ISIN', 'Ticker', 'Market Index', 'Earliest Data', 'Latest Data'])

#     # Itera su ogni riga
#     for row in rows:
#         try:
#             # Trova tutti gli elementi <td> nella riga
#             cols = row.find_elements(By.TAG_NAME, 'td')
#             if len(cols) == 6:
#                 name = cols[0].text
#                 isin = cols[1].text
                
#                 # Handle multiple tickers
#                 ticker_elements = cols[2].find_elements(By.TAG_NAME, 'li')
#                 ticker = '; '.join([elem.text for elem in ticker_elements])

#                 market_index = cols[3].text
#                 earliest_data = cols[4].text
#                 latest_data = cols[5].text

#                 # Scrivi i dati nel file CSV
#                 writer.writerow([name, isin, ticker, market_index, earliest_data, latest_data])
#         except Exception as e:
#             print("Could not extract detail:", e)

# # Chiudi il driver
# driver.quit()

filename = "justetf.csv"

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

url = 'https://www.justetf.com/en/etf-list-overview.html#header'

driver.get(url)



WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, 'tr')))

driver.implicitly_wait(20) # seconds

rows = driver.find_elements(By.TAG_NAME, 'tr')


# Apri il file CSV per scrivere i dati
with open(filename, mode='w', newline='') as file:
    writer = csv.writer(file)
    # Scrivi l'intestazione del CSV
    writer.writerow(['Name', 'TER', 'YTD', 'Start Date', 'Isin', 'WKN'])

    # Itera su ogni riga
    for row in rows:
        try:
            # Trova tutti gli elementi <td> nella riga
            # print(len(row.find_elements(By.TAG_NAME, 'td')))
            # print(len(row))
            cols = row.find_elements(By.TAG_NAME, 'td')
            if len(cols) <= 9:
                name = cols[0].get_attribute('value')
                ter = cols[1].text.get_attribute('value')
                ytd = cols[2].text.get_attribute('value')
                start_date = cols[3].text.get_attribute('value')
                isin = cols[4].text.get_attribute('value')
                # wkn = cols[5].text
                

                # Scrivi i dati nel file CSV
                writer.writerow([name, ter, ytd, start_date, isin])
        except Exception as e:
            print("Could not extract detail:", e)

# Chiudi il driver
driver.quit()