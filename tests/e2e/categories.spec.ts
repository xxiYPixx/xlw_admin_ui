import { test, expect } from '@playwright/test'

test('商品分类列表可正常渲染', async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('token', 'token')
    })

    await page.route('**/xlw/category/page**', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                code: 0,
                msg: '',
                total: 1,
                rows: [
                    {
                        categoryId: 1,
                        categoryName: '零食'
                    }
                ]
            })
        })
    })

    await page.goto('/categories')
    await expect(page.getByRole('heading', { name: '商品分类' })).toBeVisible()
    await expect(page.getByText('零食')).toBeVisible()
})
