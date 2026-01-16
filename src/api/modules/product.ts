import http from '../http'
import type { ApiResponse, PageResponse } from '../types'

export interface ProductPayload {
    id?: number
    productName: string
    productDesc?: string
    categoryId: number
    productPrice: number
    stock?: number
    previewImg?: string
    productStatus?: number
    exchangeable?: number
    exchangePrice?: number
}

export const createProduct = (payload: ProductPayload) =>
    http.post<ApiResponse<Record<string, unknown>>>('/product', payload)

export const updateProduct = (payload: ProductPayload) =>
    http.put<ApiResponse<Record<string, unknown>>>('/product', payload)

export const stockInProduct = (id: number, addNum: number) =>
    http.put<ApiResponse<Record<string, unknown>>>(`/product/stock/${id}`, null, {
        params: { addNum }
    })

export const updateProductStatus = (id: number, productStatus: number) =>
    http.put<ApiResponse<Record<string, unknown>>>(`/product/status/${id}`, null, {
        params: { productStatus }
    })

export const updateExchangeStatus = (payload: {
    id: number
    exchangeable: number
    exchangePrice?: number
}) => http.put<ApiResponse<Record<string, unknown>>>('/product/exchange-status', payload)

export const updateExchangePrice = (id: number, exchangePrice: number) =>
    http.put<ApiResponse<Record<string, unknown>>>(`/product/exchange-price/${id}`, null, {
        params: { exchangePrice }
    })

export const getProductList = (params: {
    productName?: string
    categoryId?: string
    productStatus?: string
    exchangeable?: string
    pageNum?: number
    pageSize?: number
}) => http.get<PageResponse<Record<string, unknown>>>('/product/list', { params })

export const getProductDetail = (id: number) =>
    http.get<ApiResponse<Record<string, unknown>>>(`/product/${id}`)

export const deleteProduct = (id: number) =>
    http.delete<ApiResponse<Record<string, unknown>>>(`/product/${id}`)
