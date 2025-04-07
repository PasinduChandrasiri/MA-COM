import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.Select;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import java.time.Duration;
//public class FeedbackTest {
//
//    protected WebDriver driver;
//    protected String baseUrl = "http://localhost:3000/Login";
//
//    @BeforeMethod
//    public void setUp() {
//        driver = new ChromeDriver();
//        driver.manage().window().maximize();
//        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
//        driver.get(baseUrl);
//    }
//
//    @AfterMethod
//    public void tearDown() {
//        if (driver != null) {
//            driver.quit();
//        }
//    }
//
//    private void loginAsUser(String email, String password, String expectedRole) {
//        driver.findElement(By.id("email")).sendKeys(email);
//        driver.findElement(By.id("password")).sendKeys(password);
//        driver.findElement(By.cssSelector("button[type='submit']")).click();
//
//        // Verify login was successful by checking role
//        WebElement roleElement = driver.findElement(By.id("user-role"));
//        Assert.assertEquals(roleElement.getText(), expectedRole);
//    }
//
//    // ==================== MANAGEMENT ASSISTANT TESTS ====================
//    @Test(priority = 1, groups = "managementAssistant")
//    public void testMA_AccessToFeedbackManagement() {
//        loginAsUser("pasinduchandrasiri493@gmail.com", "Pasindu@123", "Management Assistant");
//
//        driver.findElement(By.linkText("Feedback")).click();
//
//        WebElement lecturerCard = driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div[3]/div[1]/div/div/div[1]/button"));
//        WebElement courseCard = driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div[3]/div[1]/div/div/div[2]/button"));
//
//        Assert.assertTrue(lecturerCard.isDisplayed());
//        Assert.assertTrue(courseCard.isDisplayed());
//    }
//
//    @Test(priority = 2, groups = "managementAssistant")
//    public void testMA_EditLecturerQuestions() {
//        loginAsUser("ma@example.com", "ma123", "Management Assistant");
//
//        driver.findElement(By.linkText("Feedback")).click();
//        driver.findElement(By.xpath("//h2[text()='Edit Lecturer Feedback Questions']/..")).click();
//
//        WebElement pageTitle = driver.findElement(By.cssSelector(".dropdown-container-h3"));
//        Assert.assertEquals(pageTitle.getText(), "Edit Lecturer Feedback Questions");
//
//        WebElement firstEditButton = driver.findElement(By.xpath("(//button[contains(text(),'Edit')])[1]"));
//        firstEditButton.click();
//
//        WebElement textarea = driver.findElement(By.cssSelector(".modal-textarea"));
//        String originalText = textarea.getAttribute("value");
//        String newText = originalText + " (updated)";
//
//        textarea.clear();
//        textarea.sendKeys(newText);
//        driver.findElement(By.xpath("//button[contains(text(),'Save')]")).click();
//
//        WebElement updatedQuestion = driver.findElement(By.xpath("(//td[@class='feedback-form-table-row-td'])[1]"));
//        Assert.assertTrue(updatedQuestion.getText().contains("(updated)"));
//    }
//
//    @Test(priority = 3, groups = "managementAssistant")
//    public void testMA_AddNewLecturerQuestion() {
//        loginAsUser("ma@example.com", "ma123", "Management Assistant");
//
//        driver.findElement(By.linkText("Feedback")).click();
//        driver.findElement(By.xpath("//h2[text()='Edit Lecturer Feedback Questions']/..")).click();
//
//        driver.findElement(By.xpath("//button[contains(text(),'Add new question')]")).click();
//
//        String newQuestion = "This is a new test question";
//        driver.findElement(By.cssSelector(".modal-textarea")).sendKeys(newQuestion);
//
//        Select qGroupSelect = new Select(driver.findElement(By.cssSelector("select")));
//        qGroupSelect.selectByVisibleText("General");
//
//        driver.findElement(By.xpath("//button[contains(text(),'Add Question')]")).click();
//
//        WebElement lastQuestion = driver.findElement(By.xpath("(//td[@class='feedback-form-table-row-td'])[last()]"));
//        Assert.assertEquals(lastQuestion.getText(), newQuestion);
//    }
//
//    // ==================== LECTURER TESTS ====================
//    @Test(priority = 1, groups = "lecturer")
//    public void testLecturer_AccessToFeedbackAverages() {
//        loginAsUser("lecturer@example.com", "lecturer123", "Lecturer");
//
//        driver.findElement(By.linkText("Feedback")).click();
//
//        WebElement lecturerCard = driver.findElement(By.xpath("//h2[text()='Averages of Lecturer Feedback']"));
//        WebElement courseCard = driver.findElement(By.xpath("//h2[text()='Averages of Course Feedback']"));
//
//        Assert.assertTrue(lecturerCard.isDisplayed());
//        Assert.assertTrue(courseCard.isDisplayed());
//    }
//
//    @Test(priority = 2, groups = "lecturer")
//    public void testLecturer_ViewLecturerFeedbackAverages() {
//        loginAsUser("lecturer@example.com", "lecturer123", "Lecturer");
//
//        driver.findElement(By.linkText("Feedback")).click();
//        driver.findElement(By.xpath("//h2[text()='Averages of Lecturer Feedback']/..")).click();
//
//        WebElement pageTitle = driver.findElement(By.cssSelector(".dropdown-container-h3"));
//        Assert.assertEquals(pageTitle.getText(), "Averages of Lecturer Feedback");
//
//        Select courseSelect = new Select(driver.findElement(By.cssSelector("select")));
//        courseSelect.selectByIndex(1);
//
//        WebElement progressBar = driver.findElement(By.cssSelector(".progressBar"));
//        Assert.assertTrue(progressBar.isDisplayed());
//    }
//
//    @Test(priority = 3, groups = "lecturer")
//    public void testLecturer_DownloadLecturerFeedbackReport() {
//        loginAsUser("lecturer@example.com", "lecturer123", "Lecturer");
//
//        driver.findElement(By.linkText("Feedback")).click();
//        driver.findElement(By.xpath("//h2[text()='Averages of Lecturer Feedback']/..")).click();
//
//        Select courseSelect = new Select(driver.findElement(By.cssSelector("select")));
//        courseSelect.selectByIndex(1);
//
//        driver.findElement(By.xpath("//button[contains(text(),'Download Report')]")).click();
//
//        // File download verification would require additional setup
//        Assert.assertTrue(true);
//    }
//
//    // ==================== STUDENT TESTS ====================
//    @Test(priority = 1, groups = "student")
//    public void testStudent_AccessToFeedbackForms() {
//        loginAsUser("student@example.com", "student123", "Student");
//
//        driver.findElement(By.linkText("Feedback")).click();
//
//        WebElement lecturerCard = driver.findElement(By.xpath("//h2[text()='Lecturer Feedback']"));
//        WebElement courseCard = driver.findElement(By.xpath("//h2[text()='Course Feedback']"));
//
//        Assert.assertTrue(lecturerCard.isDisplayed());
//        Assert.assertTrue(courseCard.isDisplayed());
//    }
//
//    @Test(priority = 2, groups = "student")
//    public void testStudent_SubmitLecturerFeedback() {
//        loginAsUser("student@example.com", "student123", "Student");
//
//        driver.findElement(By.linkText("Feedback")).click();
//        driver.findElement(By.xpath("//h2[text()='Lecturer Feedback']/..")).click();
//
//        WebElement pageTitle = driver.findElement(By.cssSelector(".dropdown-container-h3"));
//        Assert.assertEquals(pageTitle.getText(), "Lecturer Feedback");
//
//        Select lecturerSelect = new Select(driver.findElement(By.cssSelector("select")));
//        lecturerSelect.selectByIndex(1);
//
//        int questionCount = driver.findElements(By.xpath("//tr[contains(@class,'feedback-form-table-row')]")).size();
//        for (int i = 1; i <= questionCount; i++) {
//            driver.findElement(By.xpath("(//input[@name='question-" + i + "'])[3]")).click(); // Select rating 0
//        }
//
//        driver.findElement(By.cssSelector(".submit-button-student")).click();
//
//        WebElement toast = driver.findElement(By.cssSelector(".toast-success"));
//        Assert.assertTrue(toast.isDisplayed());
//    }
//
//    @Test(priority = 3, groups = "student")
//    public void testStudent_ValidationForIncompleteFeedback() {
//        loginAsUser("student@example.com", "student123", "Student");
//
//        driver.findElement(By.linkText("Feedback")).click();
//        driver.findElement(By.xpath("//h2[text()='Lecturer Feedback']/..")).click();
//
//        Select lecturerSelect = new Select(driver.findElement(By.cssSelector("select")));
//        lecturerSelect.selectByIndex(1);
//
//        driver.findElement(By.cssSelector(".submit-button-student")).click();
//
//        WebElement toast = driver.findElement(By.cssSelector(".toast-error"));
//        Assert.assertTrue(toast.isDisplayed());
//    }
//}

public class FeedbackStuTest{
    public static ChromeOptions options;
    public static WebDriver driver;

    @BeforeTest
    public void Setup(){
        options = new ChromeOptions();
        driver = new ChromeDriver(options);
        options.addArguments("--remote-allow-origins=*");
        System.setProperty("webdriver.chrome.drive",System.getProperty("user.dir") + "/src/test/resources/chromedriver.exe");
        driver.get("http://localhost:3000/Login");
    }

    @Test(priority = 1)
    public void testAddNonAcademic() throws InterruptedException {
        driver.findElement(By.xpath("//*[@id=\"user\"]")).sendKeys("pasinduchandrasiri493@gmail.com");
        driver.findElement(By.xpath("//*[@id=\"pass\"]")).sendKeys("Pasindu@123");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div[5]/input")).click();

        Thread.sleep(5000);
        Assert.assertEquals(driver.getCurrentUrl(), "http://localhost:3000/HomePage");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[1]/ul/li[7]/a/i")).click();
        Thread.sleep(5000);

        WebElement addButton = driver.findElement(By.xpath("//button[contains(text(),'Add Non-academic Details')]"));
        addButton.click();
        driver.findElement(By.cssSelector("input[placeholder='Register Number']")).sendKeys("NA001");
        driver.findElement(By.cssSelector("input[placeholder='Name']")).sendKeys("Test Name");
        driver.findElement(By.cssSelector("input[placeholder='Attendance']")).sendKeys("20");
        driver.findElement(By.cssSelector("input[placeholder='Daily Payment']")).sendKeys("1000");

        Select monthSelect = new Select(driver.findElement(By.cssSelector("select")));
        monthSelect.selectByVisibleText("January");

        driver.findElement(By.cssSelector(".ManagementEditDetailsButton")).click();
    }

    @Test(priority = 2)
    public void testDownloadNonAcademic() throws InterruptedException {
        driver.findElement(By.xpath("//*[@id=\"user\"]")).sendKeys("pasinduchandrasiri493@gmail.com");
        driver.findElement(By.xpath("//*[@id=\"pass\"]")).sendKeys("Pasindu@123");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div[5]/input")).click();

        Thread.sleep(5000);
        Assert.assertEquals(driver.getCurrentUrl(), "http://localhost:3000/HomePage");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[1]/ul/li[7]/a/i")).click();
        Thread.sleep(5000);

        WebElement downloadButton = driver.findElement(By.xpath("//button[contains(text(),'Download')]"));
        downloadButton.click();
    }

    @Test(priority = 3)
    public void testFilterCourse() throws InterruptedException {
        driver.findElement(By.xpath("//*[@id=\"user\"]")).sendKeys("pasinduchandrasiri493@gmail.com");
        driver.findElement(By.xpath("//*[@id=\"pass\"]")).sendKeys("Pasindu@123");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div[5]/input")).click();

        Thread.sleep(5000);
        Assert.assertEquals(driver.getCurrentUrl(), "http://localhost:3000/HomePage");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[1]/ul/li[7]/a/i")).click();
        Thread.sleep(5000);
        WebElement lecturerHeader = driver.findElement(By.xpath("//*[@id=\"blur\"]/div[3]/div"));
        ((JavascriptExecutor)driver).executeScript("arguments[0].scrollIntoView(true);", lecturerHeader);
        Select semesterFilter = new Select(driver.findElement(By.xpath("//*[@id=\"blur\"]/div[4]/select")));
        semesterFilter.selectByVisibleText("Semester 04");
    }

    @Test(priority = 4)
    public void testAddCourse() throws InterruptedException {
        driver.findElement(By.xpath("//*[@id=\"user\"]")).sendKeys("pasinduchandrasiri493@gmail.com");
        driver.findElement(By.xpath("//*[@id=\"pass\"]")).sendKeys("Pasindu@123");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div[5]/input")).click();

        Thread.sleep(5000);
        Assert.assertEquals(driver.getCurrentUrl(), "http://localhost:3000/HomePage");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[1]/ul/li[7]/a/i")).click();
        Thread.sleep(5000);

        WebElement courseHeader = driver.findElement(By.xpath("//*[@id=\"blur\"]/div[3]/div"));
        ((JavascriptExecutor)driver).executeScript("arguments[0].scrollIntoView(true);", courseHeader);

        WebElement addButton = driver.findElement(By.xpath("//*[@id=\"blur\"]/div[4]/button[2]"));
        addButton.click();

        // Fill the form
        Select semesterSelect = new Select(driver.findElement(By.xpath("//*[@id=\"popup8\"]/form/select[1]")));
        semesterSelect.selectByVisibleText("4th semester");

        driver.findElement(By.xpath("//*[@id=\"popup8\"]/form/input[1]")).sendKeys("CS001");
        driver.findElement(By.xpath("//*[@id=\"popup8\"]/form/input[2]")).sendKeys("Test Course");

        Select lecturerSelect = new Select(driver.findElement(By.xpath("//*[@id=\"popup8\"]/form/select[2]")));
        lecturerSelect.selectByVisibleText("Dr. (Mrs.) Pratheeba Jeyananthan"); // Replace with actual lecturer name

        driver.findElement(By.xpath("//*[@id=\"popup8\"]/form/button")).click();
    }

    @Test(priority = 5)
    public void testFilterLecturer() throws InterruptedException {
        driver.findElement(By.xpath("//*[@id=\"user\"]")).sendKeys("pasinduchandrasiri493@gmail.com");
        driver.findElement(By.xpath("//*[@id=\"pass\"]")).sendKeys("Pasindu@123");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div[5]/input")).click();

        Thread.sleep(5000);
        Assert.assertEquals(driver.getCurrentUrl(), "http://localhost:3000/HomePage");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[1]/ul/li[7]/a/i")).click();
        Thread.sleep(5000);

        WebElement lecturerHeader = driver.findElement(By.xpath("//*[@id=\"blur\"]/div[5]/div"));
        ((JavascriptExecutor)driver).executeScript("arguments[0].scrollIntoView(true);", lecturerHeader);

        Select deptFilter = new Select(driver.findElement(By.xpath("//*[@id=\"blur\"]/div[6]/select")));
        deptFilter.selectByVisibleText("Department of Computer Engineering");
    }

    @Test(priority = 6)
    public void testAddLecturer() throws InterruptedException {
        driver.findElement(By.xpath("//*[@id=\"user\"]")).sendKeys("pasinduchandrasiri493@gmail.com");
        driver.findElement(By.xpath("//*[@id=\"pass\"]")).sendKeys("Pasindu@123");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div[5]/input")).click();

        Thread.sleep(5000);
        Assert.assertEquals(driver.getCurrentUrl(), "http://localhost:3000/HomePage");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[1]/ul/li[7]/a/i")).click();
        Thread.sleep(5000);

        WebElement lecturerHeader = driver.findElement(By.xpath("//*[@id=\"blur\"]/div[5]/div"));
        ((JavascriptExecutor)driver).executeScript("arguments[0].scrollIntoView(true);", lecturerHeader);

        WebElement addButton = driver.findElement(By.xpath("//*[@id=\"blur\"]/div[6]/button[2]"));
        addButton.click();

        // Fill the form
        driver.findElement(By.xpath("//*[@id=\"popup9\"]/form/input[1]")).sendKeys("LEC001");
        driver.findElement(By.xpath("//*[@id=\"popup9\"]/form/input[2]")).sendKeys("Test Lecturer");

        Select deptSelect = new Select(driver.findElement(By.xpath("//*[@id=\"popup9\"]/form/select")));
        deptSelect.selectByVisibleText("Department of Computer Engineering");

        driver.findElement(By.xpath("//*[@id=\"popup9\"]/form/button")).click();
    }

    @Test(priority = 7)
    public void testUpdateBatch() throws InterruptedException {
        driver.findElement(By.xpath("//*[@id=\"user\"]")).sendKeys("pasinduchandrasiri493@gmail.com");
        driver.findElement(By.xpath("//*[@id=\"pass\"]")).sendKeys("Pasindu@123");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div[5]/input")).click();

        Thread.sleep(5000);
        Assert.assertEquals(driver.getCurrentUrl(), "http://localhost:3000/HomePage");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[1]/ul/li[7]/a/i")).click();
        Thread.sleep(5000);

        WebElement batchHeader = driver.findElement(By.xpath("//*[@id=\"blur\"]/div[7]/div"));
        ((JavascriptExecutor)driver).executeScript("arguments[0].scrollIntoView(true);", batchHeader);

        WebElement updateButton = driver.findElement(By.xpath("//*[@id=\"blur\"]/div[8]/table/tbody/tr[1]/td[4]/button"));
        updateButton.click();

        // Update form
        WebElement batchInput = driver.findElement(By.xpath("//*[@id=\"popup10\"]/form/input"));
        batchInput.clear();
        batchInput.sendKeys("E24");

        Select semesterSelect = new Select(driver.findElement(By.xpath("//*[@id=\"popup10\"]/form/select")));
        semesterSelect.selectByVisibleText("5th semester");

        driver.findElement(By.xpath("//*[@id=\"popup10\"]/form/button")).click();
    }


}