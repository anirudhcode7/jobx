from selenium import webdriver
from webdriver_manager import ChromeDriverManager
from webdriver_manager import GeckoDriverManager
from webdriver_manager import EdgeChromiumDriverManager

class WebDriverManager:
    def __init__(self, browser="chrome"):
        self.browser = browser

    def get_driver(self):
        if self.browser == "chrome":
            return webdriver.Chrome(ChromeDriverManager().install())
        elif self.browser == "firefox":
            return webdriver.Firefox(executable_path=GeckoDriverManager().install())
        elif self.browser == "edge":
            return webdriver.Edge(EdgeChromiumDriverManager().install())
        else:
            raise ValueError(f"Unsupported browser: {self.browser}")

