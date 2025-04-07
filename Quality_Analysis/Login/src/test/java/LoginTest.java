import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.time.Duration;

public class LoginTest {

    public static WebDriver driver;

    @BeforeClass
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://localhost:3000");
    }

    @Test(priority = 1)
    public void testSuccessfulLogin() throws InterruptedException {
        WebElement emailField = driver.findElement(By.id("user"));
        WebElement passwordField = driver.findElement(By.id("pass"));
        WebElement loginButton = driver.findElement(By.className("input-submit"));

        emailField.sendKeys("pramudakulathunga@gmail.com");
        passwordField.sendKeys("Pramuda@1234");
        loginButton.click();

        Thread.sleep(5000);
        // Assuming successful login redirects to HomePage
        Assert.assertEquals(driver.getCurrentUrl(), "http://localhost:3000/HomePage");
    }

    @Test(priority = 2)
    public void testUnsuccessfulLoginInvalidCredentials() throws InterruptedException {
        WebElement emailField = driver.findElement(By.id("user"));
        WebElement passwordField = driver.findElement(By.id("pass"));
        WebElement loginButton = driver.findElement(By.className("input-submit"));

        emailField.sendKeys("invalid@gmail.com");
        passwordField.sendKeys("invalidPassword");
        loginButton.click();

        // Assuming an error popup is shown
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        Assert.assertTrue(wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("error")
        )).isDisplayed());
    }

    @Test(priority = 3)
    public void testUnsuccessfulLoginEmptyFields() throws InterruptedException {
        WebElement emailField = driver.findElement(By.id("user"));
        WebElement passwordField = driver.findElement(By.id("pass"));
        WebElement loginButton = driver.findElement(By.className("input-submit"));

        emailField.sendKeys("");
        passwordField.sendKeys("");
        loginButton.click();

        // Assuming an error popup is shown
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        Assert.assertTrue(wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("signUpInvalid")
        )).isDisplayed());
    }

    @Test(priority = 4)
    public void testRememberMeFunctionality() throws InterruptedException {
        WebElement emailField = driver.findElement(By.id("user"));
        WebElement passwordField = driver.findElement(By.id("pass"));
        WebElement rememberMeCheckbox = driver.findElement(By.id("remember"));
        WebElement loginButton = driver.findElement(By.className("input-submit"));

        emailField.sendKeys("pramudakulathunga@gmail.com");
        passwordField.sendKeys("Pramuda@1234");
        rememberMeCheckbox.click();
        loginButton.click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.urlToBe("http://localhost:3000/HomePage"));

        // Logout and navigate back to Login page
        driver.get("http://localhost:3000/HomePage"); // Replace with your logout URL
        driver.get("http://localhost:3000");

        // Wait for the login page to load completely
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("user")));

        // Re-locate elements after navigating back to the login page
        emailField = driver.findElement(By.id("user"));
        passwordField = driver.findElement(By.id("pass"));

        // Verify email and password are pre-filled
        Assert.assertEquals(emailField.getAttribute("value"), "pramudakulathunga@gmail.com");
        Assert.assertEquals(passwordField.getAttribute("value"), "Pramuda@1234");
    }

    @Test(priority = 5)
    public void testForgotPasswordLinkNavigation() {
        WebElement forgotPasswordLink = driver.findElement(By.linkText("Forgot password?"));
        forgotPasswordLink.click();

        // Assuming the link redirects to ForgotPassword page
        Assert.assertEquals(driver.getCurrentUrl(), "http://localhost:3000/ForgotPassword");
    }

    @AfterClass
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}