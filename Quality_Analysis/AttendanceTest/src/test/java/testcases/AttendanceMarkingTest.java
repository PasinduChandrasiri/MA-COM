package testcases;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import io.github.bonigarcia.wdm.WebDriverManager;
import java.time.Duration;
import java.util.List;

public class AttendanceMarkingTest {
    WebDriver driver;
    WebDriverWait wait;

    @BeforeClass
    public void setUp() {
        WebDriverManager.chromedriver().clearDriverCache().setup();
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        driver.manage().window().maximize();
        driver.get("http://localhost:3000/attendancemarking");

        // Wait for page to fully load
        wait.until(ExpectedConditions.presenceOfElementLocated(By.tagName("body")));
    }

    @Test(priority = 1)
    public void testSelectDateAndTimeSlot() {
        WebElement dateInput = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("input[type='date']")));
        dateInput.sendKeys("2025-03-10");

        WebElement timeSlotDropdown = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("select.time-slot-select")));
        Select select = new Select(timeSlotDropdown);
        select.selectByIndex(1);
        Assert.assertNotNull(select.getFirstSelectedOption().getText(), "Time slot not selected!");
    }

    @Test(priority = 2)
    public void testMarkAttendance() {
        List<WebElement> checkboxes = wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.xpath("//input[@type='checkbox']")));
        JavascriptExecutor js = (JavascriptExecutor) driver;
        for (WebElement checkbox : checkboxes) {
            js.executeScript("arguments[0].click();", checkbox);
        }
        boolean atLeastOneSelected = checkboxes.stream().anyMatch(WebElement::isSelected);
        Assert.assertTrue(atLeastOneSelected, "No attendance marked!");
    }

    @AfterClass
    public void tearDown() {
        driver.quit();
    }
}
