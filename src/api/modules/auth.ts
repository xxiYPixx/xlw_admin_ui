import http from '../http'
import type { ApiResponse } from '../types'
import { toFormData } from '../../utils/form'

export interface LoginPayload {
    username: string
    password: string
}

export const loginMerchant = (payload: LoginPayload) => {
    return http.post<ApiResponse<Record<string, unknown>>>(
        '/login/merchant',
        toFormData(payload)
    )
}

export const logout = () => http.post<ApiResponse<Record<string, unknown>>>('/logout')
