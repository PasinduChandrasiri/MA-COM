import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.junit.jupiter.api.*;
import org.testng.Assert;

import static org.junit.jupiter.api.Assertions.*;

public class HomePageTest {
    private WebDriver driver;

    @BeforeEach
    public void setUp() {
        // Set the path to your WebDriver executable
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    // Helper method to log in
    private void login() {
        driver.get("http://localhost:3000/Login");

        // Find the email and password fields
        WebElement emailField = driver.findElement(By.id("user"));
        WebElement passwordField = driver.findElement(By.id("pass"));
        WebElement loginButton = driver.findElement(By.className("input-submit"));

        // Enter valid credentials (replace with actual values from ma_com.sql)
        emailField.sendKeys("pasinduchandrasiri493@gmail.com");
        passwordField.sendKeys("Pasindu@123");

        // Click the login button
        loginButton.click();
    }

    // Test 1: Verify successful login
    @Test
    public void testSuccessfulLogin() throws InterruptedException {
        login();

        // Verify that the user is redirected to the homepage
        Thread.sleep(5000);
        // Assuming successful login redirects to HomePage
        Assert.assertEquals(driver.getCurrentUrl(), "http://localhost:3000/HomePage");
    }

    // Test 2: Verify profile details are displayed correctly
    @Test
    public void testProfileDetails() throws InterruptedException {
        driver.get("http://localhost:3000/Login");

        // Find the email and password fields
        WebElement emailField = driver.findElement(By.id("user"));
        WebElement passwordField = driver.findElement(By.id("pass"));
        WebElement loginButton = driver.findElement(By.className("input-submit"));

        // Enter valid credentials (replace with actual values from ma_com.sql)
        emailField.sendKeys("yasithaherath@gmail.com");
        passwordField.sendKeys("Yasitha@1234");

        // Click the login button
        loginButton.click();

        Thread.sleep(5000);

        // Verify profile details
        WebElement profileName = driver.findElement(By.cssSelector(".cardProfileLower h3"));
        WebElement profileEmail = driver.findElement(By.cssSelector(".cardProfileLower h4"));
        WebElement profileProfession = driver.findElement(By.cssSelector(".cardProfileLower .profilePara:nth-of-type(1)"));

        assertEquals("Yasitha herath", profileName.getText()); // Replace with expected name
        assertEquals("yasithaherath@gmail.com", profileEmail.getText()); // Replace with expected email
        assertEquals("Profession: Lecturer", profileProfession.getText()); // Replace with expected profession
    }

    // Test 3: Add a new notice and verify it appears in the notice board
    @Test
    public void testAddNotice() throws InterruptedException {
        login();
        Thread.sleep(5000);

        // Click the "Add Notice" button
        WebElement addNoticeButton = driver.findElement(By.xpath("//*[@id=\"blur\"]/div[5]/button[1]"));
        addNoticeButton.click();

        // Fill in the notice form
        WebElement titleField = driver.findElement(By.xpath("//*[@id=\"popup\"]/form/input[1]"));
        WebElement descriptionField = driver.findElement(By.xpath("//*[@id=\"popup\"]/form/input[2]"));
        WebElement submitButton = driver.findElement(By.xpath("//*[@id=\"popup\"]/form/button"));

        titleField.sendKeys("Test Notice Title");
        descriptionField.sendKeys("This is a test notice description.");
        submitButton.click();

        // Wait for the notice to be added
        try {
            Thread.sleep(5000); // Adjust sleep time as needed
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Verify the notice appears in the notice board
        WebElement noticeTitle = driver.findElement(By.xpath("//*[@id=\"blur\"]/div[4]/div[3]/h1"));
        WebElement noticeDescription = driver.findElement(By.xpath("//*[@id=\"blur\"]/div[4]/div[3]/p"));

        assertNotNull(noticeTitle);
        assertNotNull(noticeDescription);
    }
}