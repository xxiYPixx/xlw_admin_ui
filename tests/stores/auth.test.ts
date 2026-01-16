import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '../../src/stores/auth'
import { loginMerchant, logout } from '../../src/api/modules/auth'

vi.mock('../../src/api/modules/auth', () => ({
    loginMerchant: vi.fn(),
    logout: vi.fn()
}))

vi.mock('element-plus', () => ({
    ElMessage: {
        error: vi.fn(),
        success: vi.fn()
    }
}))

describe('useAuthStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        localStorage.clear()
        vi.clearAllMocks()
    })

    it('stores token on login success', async () => {
        ; (loginMerchant as ReturnType<typeof vi.fn>).mockResolvedValue({
            data: { code: 0, msg: '', data: { token: 'token' } }
        })

        const store = useAuthStore()
        const ok = await store.login({ username: 'admin', password: '123456' })

        expect(ok).toBe(true)
        expect(store.token).toBe('token')
        expect(localStorage.getItem('token')).toBe('token')
    })

    it('returns false on login failure', async () => {
        ; (loginMerchant as ReturnType<typeof vi.fn>).mockResolvedValue({
            data: { code: 1, msg: 'error', data: {} }
        })

        const store = useAuthStore()
        const ok = await store.login({ username: 'admin', password: 'bad' })

        expect(ok).toBe(false)
        expect(store.token).toBe('')
    })

    it('clears token on logout', async () => {
        ; (logout as ReturnType<typeof vi.fn>).mockResolvedValue({
            data: { code: 0, msg: '', data: {} }
        })

        const store = useAuthStore()
        store.token = 'token'
        localStorage.setItem('token', 'token')

        await store.signOut()

        expect(store.token).toBe('')
        expect(localStorage.getItem('token')).toBeNull()
    })
})
