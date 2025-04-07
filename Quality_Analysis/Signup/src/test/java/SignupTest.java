import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import java.time.Duration;
import java.util.List;

public class SignupTest{
    public static ChromeOptions options;
    public static WebDriver driver;

    @BeforeTest
    public void Setup(){
        options = new ChromeOptions();
        driver = new ChromeDriver(options);
        options.addArguments("--remote-allow-origins=*");
        System.setProperty("webdriver.chrome.drive",System.getProperty("user.dir") + "/src/test/resources/chromedriver.exe");
        driver.get("http://localhost:3000/SignUp");
    }

    @Test(priority = 1)
    public void testStudentSignUpWithValidData() {
        // Select profession
        Select professionFilter = new Select(driver.findElement(By.xpath("//*[@id=\"blur\"]/div[2]/div[1]/div[1]/div/button")));
        professionFilter.selectByVisibleText("Student");

        // Fill student details
        driver.findElement(By.id("firstName")).sendKeys("John");
        driver.findElement(By.id("secondName")).sendKeys("Doe");

        // Select semester
        Select semesterFilter = new Select(driver.findElement(By.xpath("//*[@id=\"blur\"]/div[2]/div[1]/div[3]/div/button")));
        semesterFilter.selectByVisibleText("5th Semester");

        // Fill email and password
        driver.findElement(By.id("email")).sendKeys("2020e123@eng.jfn.ac.lk");
        driver.findElement(By.id("password")).sendKeys("ValidPass123!");
        driver.findElement(By.id("confirmPassword")).sendKeys("ValidPass123!");

        // Click sign up button
        driver.findElement(By.xpath("//*[@id=\"blur\"]/div[2]/div[3]/div[4]/input")).click();

        // Verify OTP popup appears
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        WebElement otpContainer = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("OTPcontainer")));
        Assert.assertTrue(otpContainer.isDisplayed(), "OTP popup didn't appear");
    }

    @Test(priority = 3)
    public void testLecturerSignUpWithValidData() {
        // Select profession
        selectDropdownOption("profession", "Lecturer");

        // Select lecturer name from dropdown
        selectDropdownOption("firstName", "Dr. Smith"); // Replace with actual lecturer name

        // Select semester
        selectDropdownOption("semester", "Not Specify");

        // Fill email and password
        driver.findElement(By.id("email")).sendKeys("lecturer@eng.jfn.ac.lk");
        driver.findElement(By.id("password")).sendKeys("ValidPass123!");
        driver.findElement(By.id("confirmPassword")).sendKeys("ValidPass123!");

        // Click sign up button
        driver.findElement(By.cssSelector(".input-submit_SU")).click();

        // Verify OTP popup appears
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        WebElement otpContainer = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("OTPcontainer")));
        Assert.assertTrue(otpContainer.isDisplayed(), "OTP popup didn't appear");
    }

    @Test(priority = 4)
    public void testSignUpWithInvalidEmailFormat() {
        selectDropdownOption("profession", "Student");
        driver.findElement(By.id("email")).sendKeys("invalid-email");
        driver.findElement(By.id("password")).sendKeys("ValidPass123!");

        // Trigger blur event to validate email
        driver.findElement(By.id("firstName")).click();

        // Verify error toast appears
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        WebElement toast = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("toast")));
        Assert.assertTrue(toast.getText().contains("email validation error"), "Email validation error not shown");
    }

    @Test(priority = 5)
    public void testSignUpWithWeakPassword() {
        driver.findElement(By.id("password")).sendKeys("weak");
        driver.findElement(By.id("firstName")).click(); // Trigger blur

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        WebElement toast = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("toast")));
        Assert.assertTrue(toast.getText().toLowerCase().contains("password"), "Password validation error not shown");
    }

    @Test(priority = 6)
    public void testSignUpWithMismatchedPasswords() {
        driver.findElement(By.id("password")).sendKeys("ValidPass123!");
        driver.findElement(By.id("confirmPassword")).sendKeys("DifferentPass123!");
        driver.findElement(By.cssSelector(".input-submit_SU")).click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        WebElement toast = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("toast")));
        Assert.assertTrue(toast.getText().toLowerCase().contains("password"), "Password mismatch error not shown");
    }

    @Test(priority = 7)
    public void testSignUpWithEmptyFields() {
        driver.findElement(By.cssSelector(".input-submit_SU")).click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        WebElement toast = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("toast")));
        Assert.assertTrue(toast.getText().toLowerCase().contains("fill all fields"), "Empty fields error not shown");
    }

    @Test(priority = 8)
    public void testSubjectSelectionForStudent() {
        selectDropdownOption("profession", "Student");
        selectDropdownOption("semester", "5th Semester");

        // Click subject dropdown
        driver.findElement(By.className("subjectDropdown-toggle")).click();

        // Wait for subjects to load
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        List<WebElement> subjects = wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.cssSelector(".subjectDropdown-item li")));

        // Select first subject
        subjects.get(0).findElement(By.className("checkbox")).click();

        // Click OK button
        driver.findElement(By.className("ok")).click();

        // Verify subject is selected (you might need to add a way to verify this in your UI)
    }

    @Test(priority = 9)
    public void testOTPVerification() {
        // First complete sign up to get to OTP screen
        testStudentSignUpWithValidData();

        // Enter OTP (in a real test, you would need to get this from email or mock it)
        List<WebElement> otpInputs = driver.findElements(By.className("otp-input"));
        for (int i = 0; i < 4; i++) {
            otpInputs.get(i).sendKeys("1");
        }

        // Click verify button
        driver.findElement(By.className("otp-btn-active")).click();

        // Verify success message or redirection
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        WebElement toast = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("toast")));
        Assert.assertTrue(toast.getText().toLowerCase().contains("account created"), "Account creation success not shown");
    }

    @Test(priority = 10)
    public void testLoginLink() {
        driver.findElement(By.linkText("Login")).click();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.urlContains("/Login"));
        Assert.assertTrue(driver.getCurrentUrl().contains("/Login"), "Did not navigate to login page");
    }

    // Helper method to select dropdown options
    private void selectDropdownOption(String id, String optionText) {
        WebElement dropdown = driver.findElement(By.id(id));
        dropdown.click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        WebElement option = wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("//*[contains(text(), '" + optionText + "')]")));
        option.click();
    }
}