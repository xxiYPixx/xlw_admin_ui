export interface ApiResponse<T> {
    code: number
    msg: string
    data: T
}

export interface PageResponse<T> {
    total: number
    rows: T[]
    code: number
    msg: string
}

export const isSuccess = (code: number | undefined) => code === 0 || code === 200
