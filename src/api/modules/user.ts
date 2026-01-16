import http from '../http'
import type { ApiResponse, PageResponse } from '../types'

export interface UserPayload {
    id?: number
    username: string
    phone?: string
    password?: string
    unit: number
    floorNum: number
    roomNum: string
}

export const createUser = (payload: UserPayload) =>
    http.post<ApiResponse<Record<string, unknown>>>('/user', payload)

export const updateUser = (payload: UserPayload) =>
    http.put<ApiResponse<Record<string, unknown>>>('/user', payload)

export const resetUserPassword = (payload: { id: number; newPassword: string }) =>
    http.put<ApiResponse<Record<string, unknown>>>('/user/reset-pwd', payload)

export const getUserPage = (params: {
    phone?: string
    unit?: string
    pageNum?: number
    pageSize?: number
}) => http.get<PageResponse<Record<string, unknown>>>('/user/page', { params })

export const getUserInfo = (id: number) =>
    http.get<ApiResponse<Record<string, unknown>>>(`/user/info/${id}`)

export const deleteUser = (id: number) =>
    http.delete<ApiResponse<Record<string, unknown>>>(`/user/${id}`)
