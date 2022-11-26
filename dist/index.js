import fs from 'fs';
import puppeteer from 'puppeteer';
const data = [];
async function getIpData(ip, page) {
    await new Promise(r => setTimeout(r, 2000));
    await page.$eval('input[name="ip"]', (el) => {
        if (el instanceof HTMLInputElement) {
            el.value = '';
        }
    });
    await page.type('input[name="ip"]', ip, { delay: 73 });
    await page.click('button[type="submit"]');
    await new Promise(r => setTimeout(r, 1000));
    const result = await page.$eval('#codeOutput', (el) => el.textContent);
    if (result)
        data.push(JSON.parse(result));
}
(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto('https://ip-api.com');
    const ips = ['24.105.30.129', '54.94.196.47', '182.162.135.1'];
    for (let i = 0; i < ips.length; i++) {
        await getIpData(ips[i], page);
    }
    await fs.promises.writeFile('data.json', JSON.stringify(data));
    await browser.close();
})();
//# sourceMappingURL=index.js.map