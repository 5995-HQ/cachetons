from time import sleep
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

driver = webdriver.Chrome("/opt/chromedriver")
# driver.get("https://www.etsy.com/search?q=Brewing+equipment&order=most_relevant&view_type=gallery")
driver.get("https://instagram.com")
sleep(1)
username = driver.find_element_by_xpath(
    "/html/body/div[1]/section/main/article/div[2]/div[1]/div/form/div/div[1]/div/label/input"
)

username.send_keys("odnanref")

password = driver.find_element_by_xpath(
    "/html/body/div[1]/section/main/article/div[2]/div[1]/div/form/div/div[2]/div/label/input"
)

password.send_keys(Keys.TAB)
password.send_keys(Keys.RETURN)
sleep(4)
not_now = driver.find_element_by_xpath("/html/body/div[1]/section/main/div/div/div/div/button")
not_now.send_keys(Keys.RETURN)
sleep(2)
i_said_not_now = driver.find_element_by_xpath("/html/body/div[4]/div/div/div/div[3]/button[2]")
i_said_not_now.send_keys(Keys.RETURN)
driver.get("https://instagram.com/odnanref")

elements = driver.find_element_by_xpath("/html/body/div[1]/section/main/div/div[3]/article/div[1]/div")
posts = driver.find_element_by_xpath("/section/main/div/div[3]/article/div[1]/div")
top_row = driver.find_elements_by_xpath("/html/body/div[1]/section/main/div/div[3]/article/div[1]/div/div[1]")
click_out = driver.find_element_by_xpath("/html/body/div[5]/div[3]/button/div")
