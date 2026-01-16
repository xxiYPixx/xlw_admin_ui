import http from '../http'
import type { ApiResponse, PageResponse } from '../types'

export const createCategory = (categoryName: string) =>
    http.post<ApiResponse<Record<string, unknown>>>('/category', null, {
        params: { categoryName }
    })

export const updateCategory = (categoryId: number, categoryName: string) =>
    http.put<ApiResponse<Record<string, unknown>>>(`/category/${categoryId}`, null, {
        params: { categoryName }
    })

export const deleteCategory = (categoryId: number) =>
    http.delete<ApiResponse<Record<string, unknown>>>(`/category/${categoryId}`)

export const getCategoryPage = (params: {
    categoryName?: string
    pageNum?: number
    pageSize?: number
}) => http.get<PageResponse<Record<string, unknown>>>('/category/page', { params })

export const getCategoryList = () =>
    http.get<ApiResponse<Record<string, unknown>>>('/category/list')
