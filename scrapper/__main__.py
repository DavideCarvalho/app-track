from flask import Flask
import json
from flask import Response
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys

app = Flask(__name__)


@app.route('/msc/<container_id>')
def index(container_id):
    # container id MEDU1431284
    driver = webdriver.PhantomJS(service_args=['--ssl-protocol=any'], executable_path=r'C:\phantomjs\bin\phantomjs.exe')
    driver.get('https://www.msc.com/track-a-shipment?agencyPath=bra')
    element = driver.find_element_by_name("ctl00$ctl00$plcMain$plcMain$TrackSearch$txtBolSearch$TextField")
    element.send_keys(container_id)
    element.send_keys(Keys.ENTER)
    table_movements = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "resultTable"))
    )
    movements = get_container_movements(table_movements)
    return Response(json.dumps(movements), mimetype='application/json')


def get_container_movements(table_movements):
    is_future = True
    movements = []
    for row in table_movements.find_elements_by_xpath(".//tbody"):
        print(row.text)
        for th in row.find_elements_by_xpath(".//tr"):
            movement = {}
            time = th.get_attribute("class")
            if time == "past":
                if is_future:
                    movement['Time'] = "present"
                    print("------------------present-------------------------")
                    is_future = False
                else:
                    movement['Time'] = th.get_attribute("class")
                    print("-----------------" + th.get_attribute("class") + "-------------------------")
            else:
                movement['Time'] = th.get_attribute("class")
                print("-----------------" + th.get_attribute("class") + "-------------------------")
            for td in th.find_elements_by_xpath(".//td"):
                if td.text == " ":
                    movement[td.get_attribute('data-title')] = None
                else:
                    movement[td.get_attribute('data-title')] = td.text
                print(td.get_attribute('data-title') + ": " + td.text)
            movements.append(movement)
    return movements


if __name__ == '__main__':
    app.run(debug=True, threaded=True)
