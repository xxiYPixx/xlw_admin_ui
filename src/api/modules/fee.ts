import http from '../http'
import type { ApiResponse, PageResponse } from '../types'

export interface FeePayload {
    id?: number
    feeName?: string
    feeValue?: number
    remark?: string
}

export const updateFee = (payload: FeePayload) =>
    http.put<ApiResponse<Record<string, unknown>>>('/fee', payload)

export const getFeePage = (params: { pageNum?: number; pageSize?: number }) =>
    http.get<PageResponse<Record<string, unknown>>>('/fee/page', { params })

export interface DiscountRulePayload {
    id?: number
    scopeType: number
    minOrders: number
    discountRate: number
    discountDesc?: string
}

export const getDiscountRules = (params: {
    scopeType?: string
    pageNum?: number
    pageSize?: number
}) => http.get<ApiResponse<Record<string, unknown>>>('/fee/discount-rules', { params })

export const createDiscountRule = (payload: DiscountRulePayload) =>
    http.post<ApiResponse<Record<string, unknown>>>('/fee/discount-rules', payload)

export const updateDiscountRule = (payload: DiscountRulePayload) =>
    http.put<ApiResponse<Record<string, unknown>>>('/fee/discount-rules', payload)

export const getDiscountRuleDetail = (id: number) =>
    http.get<ApiResponse<Record<string, unknown>>>(`/fee/discount-rules/${id}`)

export const deleteDiscountRule = (id: number) =>
    http.delete<ApiResponse<Record<string, unknown>>>(`/fee/discount-rules/${id}`)
