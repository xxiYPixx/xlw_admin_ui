import http from '../http'
import type { ApiResponse, PageResponse } from '../types'

export const updateOrderStatus = (id: number, orderStatus: number) =>
    http.put<ApiResponse<Record<string, unknown>>>(`/order/status/${id}`, null, {
        params: { orderStatus }
    })

export const updatePayStatus = (id: number, payStatus: number) =>
    http.put<ApiResponse<Record<string, unknown>>>(`/order/pay-status/${id}`, null, {
        params: { payStatus }
    })

export const confirmRefund = (id: number) =>
    http.put<ApiResponse<Record<string, unknown>>>(`/order/confirm-refund/${id}`)

export const applyRefund = (id: number) =>
    http.put<ApiResponse<Record<string, unknown>>>(`/order/apply-refund/${id}`)

export const refuseRefund = (id: number) =>
    http.put<ApiResponse<Record<string, unknown>>>(`/order/refuse-refund/${id}`)

export const getOrderList = (params: {
    userId?: string
    orderNo?: string
    orderStatus?: string
    payStatus?: string
    orderType?: string
    hasExchange?: string
    pageNum?: number
    pageSize?: number
}) => http.get<PageResponse<Record<string, unknown>>>('/order/list', { params })

export const getOrderDetail = (id: number) =>
    http.get<ApiResponse<Record<string, unknown>>>(`/order/${id}`)

export const deleteOrder = (id: number) =>
    http.delete<ApiResponse<Record<string, unknown>>>(`/order/${id}`)
