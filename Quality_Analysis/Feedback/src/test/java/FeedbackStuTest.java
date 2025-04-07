import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.Assert;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

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
    public void testEditFeedback() throws InterruptedException {
        driver.findElement(By.xpath("//*[@id=\"user\"]")).sendKeys("pasinduchandrasiri493@gmail.com");
        driver.findElement(By.xpath("//*[@id=\"pass\"]")).sendKeys("Pasindu@123");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div[5]/input")).click();

        Thread.sleep(5000);
        Assert.assertEquals(driver.getCurrentUrl(), "http://localhost:3000/HomePage");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[1]/ul/li[4]/a/i")).click();
        Thread.sleep(5000);
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div[3]/div[1]/div/div/div[1]/button")).click();
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div[3]/div[1]/div/div/div[2]/form/table/tbody/tr[1]/td[2]/button[1]")).click();
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div[3]/div[1]/div/div/div[3]/div/button[1]")).click();
    }

    @Test(priority = 2)
    public void testViewFeedback() throws InterruptedException {
        driver.findElement(By.xpath("//*[@id=\"user\"]")).sendKeys("pasinduchandrasiri493@gmail.com");
        driver.findElement(By.xpath("//*[@id=\"pass\"]")).sendKeys("Pasindu@123");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div[5]/input")).click();

        Thread.sleep(5000);
        Assert.assertEquals(driver.getCurrentUrl(), "http://localhost:3000/HomePage");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[1]/ul/li[4]/a/i")).click();
        Thread.sleep(5000);
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div[3]/div[2]/div/div/div[1]/button")).click();
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div[3]/div[2]/div/div/div/select")).click();
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div[3]/div[2]/div/div/div[1]/select/option[3]")).click();
    }

    @Test(priority = 2)
    public void testAddFeedback() throws InterruptedException {
        driver.findElement(By.xpath("//*[@id=\"user\"]")).sendKeys("2021e078@eng.jfn.ac.lk");
        driver.findElement(By.xpath("//*[@id=\"pass\"]")).sendKeys("Pramuda@123");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div[5]/input")).click();

        Thread.sleep(5000);
        Assert.assertEquals(driver.getCurrentUrl(), "http://localhost:3000/HomePage");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[1]/ul/li[4]/a/i")).click();
        Thread.sleep(5000);
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div[3]/div/div/div/div[1]/button")).click();
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div[3]/div/div/div/div/select")).click();
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div[3]/div/div/div/div/select/option[2]")).click();
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div[3]/div/div/div/div[2]/form/table/tbody/tr[1]/td[3]/label[5]/input")).click();
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div[3]/div/div/div/div[2]/form/table/tbody/tr[2]/td[3]/label[5]/input")).click();
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div[3]/div/div/div/div[2]/form/table/tbody/tr[3]/td[3]/label[5]/input")).click();
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div[3]/div/div/div/div[2]/form/table/tbody/tr[4]/td[3]/label[5]/input")).click();
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div[3]/div/div/div/div[2]/form/table/tbody/tr[5]/td[3]/label[5]/input")).click();
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div[3]/div/div/div/div[2]/form/table/tbody/tr[6]/td[3]/label[5]/input")).click();
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div[3]/div/div/div/div[2]/form/table/tbody/tr[7]/td[3]/label[5]/input")).click();
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div[3]/div/div/div/div[2]/form/table/tbody/tr[8]/td[3]/label[5]/input")).click();
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div[3]/div/div/div/div[2]/form/table/tbody/tr[9]/td[3]/label[5]/input")).click();
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div[3]/div/div/div/div[2]/form/table/tbody/tr[10]/td[3]/label[5]/input")).click();
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div[3]/div/div/div/div[2]/form/table/tbody/tr[11]/td[3]/label[5]/input")).click();
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div[3]/div/div/div/div[2]/form/table/tbody/tr[12]/td[3]/label[5]/input")).click();
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div[3]/div/div/div/div[2]/form/button")).click();
    }
}