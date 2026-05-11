import {test, expect} from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import * as fs from 'fs/promises';



    test('should check accessibility of the login page', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        const reportLines: string[] = [];
        await test.step('Check accessibility of the login page', async () => {
            const axeBuilder = new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa']);
            const results = await axeBuilder.analyze();
            console.log(results);
            if (results.violations.length > 0) {
                reportLines.push('Accessibility violations found:');
                results.violations.forEach(violation => {
                    reportLines.push(`violation: ${violation.id}`);
                    reportLines.push(`Description: ${violation.description}`);
                    reportLines.push(`Impact: ${violation.impact}`);
                    for (const node of violation.nodes) {                        
                        reportLines.push(`  Target: ${node.target.join(', ')}`);
                        reportLines.push(`  HTML: ${node.html}`);
                        reportLines.push(`  Failure Summary: ${node.failureSummary}`);
                    }

                });
            }else {
                reportLines.push('No accessibility violations found.');
            }

        const timestamp = new Date().toISOString()
        .slice(0, 19)
        .replace(/:/g, '-')
        .replace('T', '_'); 


        const reportFilePath = `accessibility-report/accessibility_report_${timestamp}.txt`;  
        await fs.writeFile(reportFilePath, reportLines.join('\n'), 'utf-8');
         expect.soft(results.violations).toHaveLength(0);
        });
    }); 

