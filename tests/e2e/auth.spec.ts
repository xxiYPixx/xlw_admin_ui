import { test, expect } from '@playwright/test'

const mockUserPage = async (page) => {
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
                        username: '张三',
                        phone: '13800000000',
                        unit: 1,
                        floorNum: 2,
                        roomNum: '01'
                    }
                ]
            })
        })
    })
}

test('未登录访问受保护页面会跳转到登录页', async ({ page }) => {
    await page.goto('/users')
    await expect(page).toHaveURL(/\/login/)
})

test('登录成功后进入用户管理', async ({ page }) => {
    await page.route('**/xlw/login/merchant**', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ code: 0, msg: '', data: { token: 'token' } })
        })
    })

    await mockUserPage(page)

    await page.goto('/login')
    await page.getByPlaceholder('请输入账号').fill('admin')
    await page.getByPlaceholder('请输入密码').fill('123456')
    await page.getByRole('button', { name: '登录' }).click()

    await expect(page).toHaveURL(/\/users/)
    await expect(page.getByRole('heading', { name: '用户管理' })).toBeVisible()

    const token = await page.evaluate(() => localStorage.getItem('token'))
    expect(token).toBe('token')
})

test('退出登录后返回登录页', async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('token', 'token')
    })

    await mockUserPage(page)

    await page.route('**/xlw/logout**', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ code: 0, msg: '', data: {} })
        })
    })

    await page.goto('/users')
    await page.getByRole('button', { name: '退出登录' }).click()
    await page.locator('.el-overlay-message-box').waitFor()
    await page.locator('.el-message-box__btns .el-button--primary').click()
    await expect(page).toHaveURL(/\/login/)
})
