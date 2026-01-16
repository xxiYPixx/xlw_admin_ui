import { test, expect } from '@playwright/test'

test('商品列表与新增弹窗可打开', async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('token', 'token')
    })

    await page.route('**/xlw/category/list**', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                code: 0,
                msg: '',
                data: { rows: [{ id: 1, categoryName: '饮料' }] }
            })
        })
    })

    await page.route('**/xlw/product/list**', async (route) => {
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
                        productName: '可乐',
                        categoryId: 1,
                        productPrice: 3.5,
                        stock: 10
                    }
                ]
            })
        })
    })

    await page.goto('/products')
    await expect(page.getByRole('heading', { name: '商品管理' })).toBeVisible()
    await expect(page.getByText('可乐')).toBeVisible()

    await page.getByRole('button', { name: '新增商品' }).click()
    await expect(page.getByRole('heading', { name: '新增商品' })).toBeVisible()
})
