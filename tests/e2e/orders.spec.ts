import { test, expect } from '@playwright/test'

test('订单列表页面可正常渲染', async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('token', 'token')
    })

    await page.route('**/xlw/order/list**', async (route) => {
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
                        orderNo: 'NO2025001',
                        userId: 1,
                        orderStatus: 0,
                        payStatus: 0,
                        orderType: 0,
                        hasExchange: 0
                    }
                ]
            })
        })
    })

    await page.goto('/orders')
    await expect(page.getByRole('heading', { name: '订单管理' })).toBeVisible()
    await expect(page.getByText('NO2025001')).toBeVisible()
})
