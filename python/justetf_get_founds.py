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

import os
import json

# # * Json file
# filename = "justetf.csv"
# current_dir = os.path.dirname(os.path.abspath(__file__))
# json_file_path = os.path.join(current_dir, 'justetf.json')



# driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

# url = 'https://www.justetf.com/en/etf-list-overview.html#header'

# driver.get(url)



# WebDriverWait(driver, 1).until(EC.presence_of_element_located((By.XPATH, "//tr[@role='row']")))

# wait = WebDriverWait(driver, 1)

# accept_cookies= wait.until(EC.element_to_be_clickable((By.XPATH, "//button[@id='CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll']")))
# accept_cookies.click()


# driver.implicitly_wait(1) # seconds


# # driver.maximize_window()
# driver.execute_script("document.body.style.zoom='25%'")

# i = 0
# while i <= 40:
#   driver.execute_script(f"window.scrollTo({i*1440}, {(i+1) * 1440})")
#   time.sleep(5)
#   i += 1

# rows = driver.find_elements(By.XPATH, "//tr[@role='row']")


# print(f"Righe lette: {len(rows)}")

# data = []
# for row in rows:
#   try:
#     cols = row.find_elements(By.TAG_NAME, 'td')
#     if(len(cols) == 9):
#       data.append([cols[0].get_attribute("textContent"), cols[1].get_attribute("textContent"), cols[2].get_attribute("textContent"), cols[3].get_attribute("textContent"), cols[4].get_attribute("textContent"), cols[5].get_attribute("textContent"), cols[6].get_attribute("textContent"), cols[7].get_attribute("textContent"), cols[8].text])
#   except Exception as e:
#       print("Could not extract detail:", e)
# driver.quit()

# output_data = {
#     'justetf-order-data' : ["Fund name", "TER p.a.",  'YTD in % Fund size(in m eur)' , 'Inception', 'date'  ,'Distribution' , 'Replication',  'ISIN',  'WKN'],
#     'assets' : data
# }

# with open(json_file_path, mode='w', encoding='utf-8') as f:
#     json.dump(output_data, f, ensure_ascii=False, indent=4)
    

# * Csv file

filename = "justetf.csv"

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

url = 'https://www.justetf.com/en/etf-list-overview.html#header'

driver.get(url)



WebDriverWait(driver, 1).until(EC.presence_of_element_located((By.XPATH, "//tr[@role='row']")))

wait = WebDriverWait(driver, 1)

accept_cookies= wait.until(EC.element_to_be_clickable((By.XPATH, "//button[@id='CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll']")))
accept_cookies.click()


driver.implicitly_wait(1) # seconds


# driver.maximize_window()
driver.execute_script("document.body.style.zoom='25%'")

i = 0
while i <= 40:
  driver.execute_script(f"window.scrollTo({i*1440}, {(i+1) * 1440})")
  time.sleep(5)
  i += 1

rows = driver.find_elements(By.XPATH, "//tr[@role='row']")


print(f"Righe lette: {len(rows)}")

with open(filename, mode='w', newline='') as file:
    writer = csv.writer(file, delimiter = ";")
    # Scrivi l'intestazione del CSV
    writer.writerow(["Fund name", "TER p.a.",  'YTD in % Fund size(in m eur)' , 'Inception', 'date'  ,'Distribution' , 'Replication',  'ISIN',  'WKN'])

    # Itera su ogni riga
    for row in rows:
      try:
        cols = row.find_elements(By.TAG_NAME, 'td')
        if(len(cols) == 9):
          # print(cols[0].get_attribute("textContent"))
          # print(cols[1].get_attribute("textContent"))
          # print(cols[2].get_attribute("textContent"))
          # print(cols[3].get_attribute("textContent"))
          # print(cols[4].get_attribute("textContent"))
          # print(cols[5].get_attribute("textContent"))
          # print(cols[6].get_attribute("textContent"))
          # print(cols[7].get_attribute("textContent"))
          # print(cols[8].get_attribute("textContent"))
          writer.writerow([cols[0].get_attribute("textContent"), cols[1].get_attribute("textContent"), cols[2].get_attribute("textContent"), cols[3].get_attribute("textContent"), cols[4].get_attribute("textContent"), cols[5].get_attribute("textContent"), cols[6].get_attribute("textContent"), cols[7].get_attribute("textContent"), cols[8].text])
      except Exception as e:
          print("Could not extract detail:", e)
driver.quit()