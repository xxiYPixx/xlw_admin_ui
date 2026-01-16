import { test, expect } from '@playwright/test'

test('配送费用列表可正常渲染', async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('token', 'token')
    })

    await page.route('**/xlw/fee/page**', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                code: 0,
                msg: '',
                total: 1,
                rows: [
                    {
                        id: 1,
                        feeName: '基础配送费',
                        feeValue: 2.5,
                        remark: '默认'
                    }
                ]
            })
        })
    })

    await page.goto('/fees')
    await expect(page.getByRole('heading', { name: '配送费用' })).toBeVisible()
    await expect(page.getByText('基础配送费')).toBeVisible()
})
