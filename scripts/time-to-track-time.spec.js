import { test as script } from '@playwright/test';
import { parseBoardContent } from '../utils/parcer';
import { formatHoursToTimeString } from '../utils/formatTime';

script('Track time', async ({ page }) => {
    await page.goto(process.env.BOARD_URL);
    await page.locator('//div[text()="Log in via SSO"]').click();
    await page.locator('//input[@name="federation-id"]').fill(process.env.FEDERATION_ID);
    await page.locator('//button/span[text()="Log in"]').click();
    await page.locator('//input[@id="username"]').fill(process.env.EMAIL);
    await page.locator('//input[@id="password"]').fill(process.env.PASSWORD);

    const responsePromise = page.waitForResponse(
        (response) => response.url().includes('/getBoardContent') && response.status() === 200,
    );
    await page.locator('//button/span[text()="Войти"]').click();
    const response = await responsePromise;

    const issues = await parseBoardContent(await response.json());
    const totalHours = parseFloat(process.env.HOURS) || 0;
    let hoursPerIssue;
    if (issues.length === 1) {
        hoursPerIssue = totalHours;
    } else {
        hoursPerIssue = totalHours / issues.length;
    }
    const timeStr = formatHoursToTimeString(hoursPerIssue);

    for (const issue of issues) {
        await page.locator(`//article[@data-issue-key='${issue}']`).click();
        await page.locator('//button[@aria-label="Действия"]').click();
        await page.locator('//div[text() = "Указать затраченное время"]').click();
        await page.locator('//input[contains(@id, "duration")]').fill(timeStr);
        await page.locator('//button/span[text() = "Сохранить"]').last().click();
        await page.locator('//button[@aria-label="Закрыть"]').click();
    }

    console.log('The hours have been time tracked.');
});
