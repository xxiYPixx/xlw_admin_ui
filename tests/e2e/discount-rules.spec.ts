import { test, expect } from '@playwright/test'

test('折扣规则列表可正常渲染', async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('token', 'token')
    })

    await page.route('**/xlw/fee/discount-rules**', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                code: 0,
                msg: '',
                data: {
                    total: 1,
                    rows: [
                        {
                            id: 1,
                            scopeType: 0,
                            minOrders: 5,
                            discountRate: 0.8,
                            discountDesc: '周累计优惠'
                        }
                    ]
                }
            })
        })
    })

    await page.goto('/discount-rules')
    await expect(page.getByRole('heading', { name: '折扣规则' })).toBeVisible()
    await expect(page.getByText('周累计优惠')).toBeVisible()
})
