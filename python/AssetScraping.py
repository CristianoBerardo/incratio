from abc import ABC, abstractmethod

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

import time
import os

import csv
import json

class AssetScraping:
    
    def __init__(self, url:str, filename_output_csv:str, filename_output_json:str) -> None:
      self.url = url
      self.filename_output_csv = filename_output_csv
      self.filename_output_json = filename_output_json
      self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

      self.driver.get(url)
      current_dir = os.path.dirname(os.path.abspath(__file__))
    
    def __str__(self) -> str:
      return f"AssetScraping: {self.url}"
    
    @abstractmethod
    def get_csv(self):
      pass
        
    @abstractmethod
    def get_json(self):
      pass

    def write_to_csv(self, data: list, header: list):
      try:
        # ! da controllare se worka!
        data = data.dropna()
        with open(self.filename_output_csv, mode='w', newline='') as file:
          writer = csv.writer(file, delimiter = ";")
          # Scrivi l'intestazione del CSV
          writer.writerow(header)
          cont: int = 0
          for elem in data:
            try:
              writer.writerow(elem)
              cont += 1
            except Exception as e:
              print("Could not extract detail:", e)
              print(f" - Errore alla riga {cont}")
      except Exception as e:
        print("Could not write to CSV:", e)

    def write_to_json(self, data: dict, header:list):
      output_data = {
        "order-data": header,
        "assets": data
      }

      try:
        with open(self.filename_output_json, mode='w', encoding='utf-8') as f:
          json.dump(output_data, f, ensure_ascii=False, indent=4)
      except Exception as e:
        print("Could not write to JSON:", e)

    def __del__(self):
      self.driver.quit()
        

class JustETF(AssetScraping):
  def __init__(self, url, filename_output_csv, filename_output_json):
    super().__init__(url, filename_output_csv, filename_output_json)
    self.data = None
  
  def _read_web_page(self) -> list:
    WebDriverWait(self.driver, 1).until(EC.presence_of_element_located((By.XPATH, "//tr[@role='row']")))

    wait = WebDriverWait(self.driver, 1)

    accept_cookies= wait.until(EC.element_to_be_clickable((By.XPATH, "//button[@id='CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll']")))
    accept_cookies.click()

    self.driver.implicitly_wait(1) # seconds

    # driver.maximize_window()
    self.driver.execute_script("document.body.style.zoom='25%'")

    i = 0
    while i <= 40:
      self.driver.execute_script(f"window.scrollTo({i*1440}, {(i+1) * 1440})")
      time.sleep(5)
      i += 1

    rows = self.driver.find_elements(By.XPATH, "//tr[@role='row']")
    print(f"Righe lette: {len(rows)}")

    data = [None] * (len(rows)-1)
    cont : int = 0
    for row in rows:
      try:
        cols = row.find_elements(By.TAG_NAME, 'td')
        if(len(cols) == 9):
          data[cont] = [cols[0].get_attribute("textContent"), cols[1].get_attribute("textContent"), cols[2].get_attribute("textContent"), cols[3].get_attribute("textContent"), cols[4].get_attribute("textContent"), cols[5].get_attribute("textContent"), cols[6].get_attribute("textContent"), cols[7].get_attribute("textContent"), cols[8].text]
          cont += 1
      except Exception as e:
          print("Could not extract detail:", e)

    self.data = data

    return data
  
  def get_csv(self):
    if self.data is None:
      self.data = self._read_web_page()

    super().write_to_csv(self.data, ["Fund name", "TER p.a.",  'YTD in % Fund size(in m eur)' , 'Inception', 'date'  ,'Distribution' , 'Replication',  'ISIN',  'WKN'])
  
  def get_json(self):    
    if self.data is None:
      self.data = self._read_web_page()
      
    super().write_to_json(self.data, ["Fund name", "TER p.a.",  'YTD in % Fund size(in m eur)' , 'Inception', 'date'  ,'Distribution' , 'Replication',  'ISIN',  'WKN'])
  
  def get_csv_and_json(self):
    self.get_csv()
    self.get_json()

class Curvo(AssetScraping):

  def __init__(self, url, filename_output_csv, filename_output_json):
    super().__init__(url, filename_output_csv, filename_output_json)
    self.data = None

  def _read_web_page(self) -> list:
    WebDriverWait(self.driver, 1).until(EC.presence_of_element_located((By.TAG_NAME, 'tr')))

    rows = self.driver.find_elements(By.TAG_NAME, 'tr')
    print(f"Righe lette: {len(rows)}")

    data = [None] * (len(rows)-1)
    cont : int = 0
    for row in rows:
      try:
        # Trova tutti gli elementi <td> nella riga
        cols = row.find_elements(By.TAG_NAME, 'td')
        if len(cols) == 6:
            # Handle multiple tickers
            ticker_elements = cols[2].find_elements(By.TAG_NAME, 'li')

            # Scrivi i dati nel file CSV
            data[cont] = [cols[0].text, cols[1].text, ', '.join([elem.text for elem in ticker_elements]), cols[3].text, cols[4].text, cols[5].text]
            cont += 1
      except Exception as e:
        print("Could not extract detail:", e)

    self.data = data

    return data
  
  def get_csv(self):
    if self.data is None:
      self.data = self._read_web_page()
      
    super().write_to_csv(self.data, ['Name', 'ISIN', 'Ticker', 'Market Index', 'Earliest Data', 'Latest Data'])
    
  def get_json(self):
    if self.data is None:
      self.data = self._read_web_page()

    super().write_to_json(self.data, ['Name', 'ISIN', 'Ticker', 'Market Index', 'Earliest Data', 'Latest Data'])
  
  def get_csv_and_json(self):
    self.get_csv()
    self.get_json()
    
# curvo = Curvo("https://curvo.eu/backtest/en/funds", "curvo_class.csv", "curvo_class.json")
# curvo.get_csv()
# curvo.get_json()
# curvo.get_csv_and_json()

# justetf = JustETF('https://www.justetf.com/en/etf-list-overview.html#header', "justetf_class.csv", "justetf_class.json")
# justetf.get_csv_and_json()

file_path = 'justetf_class.json'
with open(file_path, 'r', encoding='utf-8') as file:
    data = json.load(file)
    print("numero di asset in justetf_class.json - ci sono molti null")
    print(len(data.get('assets')))

file_path = 'isin_values.json'
with open(file_path, 'r', encoding='utf-8') as file:
    data = json.load(file)
    print("numero di isin effettivamente presenti in isin_values.json")
    print(len(data.get('justetf_ISIN')))

print(f"il numero di null in justetf_class.json è {209}")
print(f"\n3538 - 209 = {3538 - 209} è il numero di asset che sono effettivamentre presenti")
print("basta non inserire i null")
