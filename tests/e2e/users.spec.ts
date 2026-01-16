import { test, expect } from '@playwright/test'

test('用户列表页面可正常渲染', async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('token', 'token')
    })

    await page.route('**/xlw/user/page**', async (route) => {
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
                        username: '李四',
                        phone: '13900000000',
                        unit: 2,
                        floorNum: 3,
                        roomNum: '02'
                    }
                ]
            })
        })
    })

    await page.goto('/users')
    await expect(page.getByRole('heading', { name: '用户管理' })).toBeVisible()
    await expect(page.getByText('李四')).toBeVisible()
    await expect(page.getByText('13900000000')).toBeVisible()
})
