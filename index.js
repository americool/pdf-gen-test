const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
      defaultViewport: {
          width: 1133,
          height: 1467
      }
  }); // launch a browser (chromium by default but you can chose another one)
  const page = await browser.newPage(); // open a page in the browser
  await page.goto("http://localhost:3000/", {
    waitUntil: "networkidle2",
  }); // visit the printable version of your page
  await page.type('.cy--login-email', 'foo@bar.com');
  await page.type('.cy--login-password', 'passw0Rd');
  await page.click('.cy--login-submit');
  await page.waitForNavigation();

  await page.goto("http://localhost:3000/2/dumb-test", {
    waitUntil: "networkidle0",
  }); // visit the printable version of your page


  await page.pdf({ width: 1133, height: 1467, path: "./my_file.pdf", scale: 1, printBackground: true }); // generate the PDF 🎉
  await browser.close(); // don't forget to close the browser. Otherwise, it may cause performances issues or the server may even crash..
})();