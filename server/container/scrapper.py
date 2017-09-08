from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys

isFuture = True

driver = webdriver.PhantomJS(service_args=['--ssl-protocol=any'])  
driver.get('https://www.msc.com/track-a-shipment?agencyPath=bra')
element = driver.find_element_by_name("ctl00$ctl00$plcMain$plcMain$TrackSearch$txtBolSearch$TextField")
element.send_keys("MEDU1431284")
element.send_keys(Keys.ENTER)
text_file = open("page.txt", "w")
text_file.write(driver.page_source)
text_file.close()
tableMovements = WebDriverWait(driver, 10).until(
  EC.presence_of_element_located((By.CLASS_NAME, "resultTable"))
)
for row in tableMovements.find_elements_by_xpath(".//tbody"):
    print(row.text)
    for th in row.find_elements_by_xpath(".//tr"):
        time = th.get_attribute("class")
        if time == "past":
            if isFuture:
                print("-----------------present-------------------------")
                isFuture = False
            else:
                print("-----------------"+th.get_attribute("class")+"-------------------------")
        else:
            print("-----------------"+th.get_attribute("class")+"-------------------------")
        for td in th.find_elements_by_xpath(".//td"):
          #print(td.text)
            print(td.get_attribute('data-title') + ": " + td.text)