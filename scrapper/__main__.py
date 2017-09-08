from flask import Flask
from flask import jsonify
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys

app = Flask(__name__)

@app.route('/')
def index():
    isFuture = True

    driver = webdriver.PhantomJS(service_args=['--ssl-protocol=any'], executable_path=r'C:\phantomjs\bin\phantomjs.exe')
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
    response = []
    for row in tableMovements.find_elements_by_xpath(".//tbody"):
        print(row.text)
        for th in row.find_elements_by_xpath(".//tr"):
            movement = {}
            time = th.get_attribute("class")
            if time == "past":
                if isFuture:
                    movement['time'] = "present"
                    print("-----------------present-------------------------")
                    isFuture = False
                else:
                    movement['time'] = th.get_attribute("class")
                    print("-----------------" + th.get_attribute("class") + "-------------------------")
            else:
                movement['time'] = th.get_attribute("class")
                print("-----------------" + th.get_attribute("class") + "-------------------------")
            for td in th.find_elements_by_xpath(".//td"):
                # print(td.text)
                if td.text == " ":
                    movement[td.get_attribute('data-title')] = None
                else:
                    movement[td.get_attribute('data-title')] = td.text
                print(td.get_attribute('data-title') + ": " + td.text)
            response.append(movement)
    return jsonify(movements = response)

if __name__ == '__main__':
    app.run(debug=True)