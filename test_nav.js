const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', error => console.error('BROWSER ERROR:', error.message));

  console.log("Navigating to http://localhost:3000/#/");
  try {
    await page.goto('http://localhost:3000/#/');
    await page.waitForTimeout(3000);
    
    console.log("\nAttempting to click 'Services' link...");
    await page.click('text=Services');
    await page.waitForTimeout(2000);
    
    console.log("\nAttempting to click 'Openings' link...");
    await page.click('text=Openings');
    await page.waitForTimeout(2000);

  } catch(e) {
    console.error("Script Error:", e.message);
  } finally {
    await browser.close();
  }
})();
