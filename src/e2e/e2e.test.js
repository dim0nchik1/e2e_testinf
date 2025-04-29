import puppetteer from "puppeteer";
import { fork } from "child_process";
jest.setTimeout(30000);
describe("test validator form", () => {
  let browser;
  let page;
  let server;
  const baseUrl = "http://localhost:9002";

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on("error", reject);
      server.on("message", (message) => {
        if (message === "ok") {
          resolve();
        }
      });
    });
    browser = await puppetteer.launch({
      headless: false, // show gui
      slowMo: 100,

      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });


  test("visa", async () => {
    // jest.setTimeout(35000);
    await page.goto(baseUrl);
    const input = await page.$("#numberCard-input");
    await input.type("4539283476916568");
    const submit = await page.$("#card-submit");
    await submit.click();
    await page.waitForSelector(".cardVisa.active");
  });

  // test("AmericanExpress", async () => {
  //   await page.goto(baseUrl);
  //   const input = await page.$("#numberCard-input");
  //   await input.type("340054986290712");
  //   const submit = await page.$("#card-submit");
  //   await submit.click();
  //   await page.waitForSelector(".cardAmericanExpress.active");
  // }, 35000);


});
