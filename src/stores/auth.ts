import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { loginMerchant, logout } from '../api/modules/auth'
import { isSuccess } from '../api/types'
import type { LoginPayload } from '../api/modules/auth'

interface AuthUser {
    username: string
}

export const useAuthStore = defineStore('auth', () => {
    const token = ref<string>(localStorage.getItem('token') || '')
    const user = ref<AuthUser | null>(null)

    const isAuthenticated = computed(() => Boolean(token.value))

    const login = async (payload: LoginPayload) => {
        const response = await loginMerchant(payload)
        const { code, msg, data } = response.data
        if (!isSuccess(code)) {
            ElMessage.error(msg || '登录失败')
            return false
        }
        const nextToken = (data?.token as string | undefined) || 'session'
        token.value = nextToken
        user.value = { username: payload.username }
        localStorage.setItem('token', nextToken)
        ElMessage.success('登录成功')
        return true
    }

    const signOut = async () => {
        try {
            const response = await logout()
            const { code, msg } = response.data
            if (!isSuccess(code)) {
                ElMessage.error(msg || '退出失败')
            }
        } finally {
            token.value = ''
            user.value = null
            localStorage.removeItem('token')
        }
    }

    return {
        token,
        user,
        isAuthenticated,
        login,
        signOut
    }
})
