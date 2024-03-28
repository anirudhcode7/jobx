from selenium import webdriver
from webdriver_manager import WebDriverManager
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import config

def main():
    # Initialize WebDriver
    driver_manager = WebDriverManager(browser="chrome")  # or "firefox", "edge", etc.
    driver = driver_manager.get_driver()

    # Open LinkedIn
    driver.get("https://www.linkedin.com")

    # Perform login
    username = config.LINKEDIN_USERNAME
    password = config.LINKEDIN_PASSWORD
    driver.find_element(By.ID, "session_key").send_keys(username)
    driver.find_element(By.ID, "session_password").send_keys(password)
    driver.find_element(By.CSS_SELECTOR, ".sign-in-form__submit-button").click()

    time.sleep(5)  # Let the page load

    # Navigate to jobs page
    driver.get("https://www.linkedin.com/jobs")

    # Perform job search
    search_query = config.JOB_SEARCH_QUERY
    search_box = driver.find_element(By.CSS_SELECTOR, "input[aria-label='Search']")
    search_box.send_keys(search_query)
    search_box.send_keys(Keys.RETURN)

    time.sleep(5)  # Let the page load

    # Extract job listings
    job_listings = driver.find_elements(By.CSS_SELECTOR, ".jobs-search-results__list-item")

    for job in job_listings:
        job_title = job.find_element(By.CSS_SELECTOR, ".job-card-list__title").text
        company_name = job.find_element(By.CSS_SELECTOR, ".job-card-container__company-name").text
        location = job.find_element(By.CSS_SELECTOR, ".job-card-container__metadata-item").text
        print(f"Title: {job_title}, Company: {company_name}, Location: {location}")

    # Close the browser
    driver.quit()

if __name__ == "__main__":
    main()
