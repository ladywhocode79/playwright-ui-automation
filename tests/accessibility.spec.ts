import {test, expect} from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';


test.describe('Accessibility testing with Playwright and Axe', () => {
    test('should check accessibility of the login page', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        const axeBuilder = new AxeBuilder({ page });
        const results = await axeBuilder.analyze();
        console.log(results);
        expect(results.violations).toHaveLength(0);
    });

    test('should check accessibility of the login page with custom rules', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        const axeBuilder = new AxeBuilder({ page });
        axeBuilder.withTags(['wcag2a', 'wcag2aa'])
        .withRules([
            'color-contrast',
            'image-alt'
        ]);
        const results = await axeBuilder.analyze();
        console.log(results);
        expect(results.violations).toHaveLength(0);
    }); 
});