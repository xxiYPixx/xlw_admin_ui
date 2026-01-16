import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const STORAGE_KEYS = {
    users: 'mock_users',
    products: 'mock_products',
    orders: 'mock_orders',
    fees: 'mock_fees',
    categories: 'mock_categories',
    discountRules: 'mock_discount_rules'
}

const readList = <T>(key: string, fallback: T[]): T[] => {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    try {
        const parsed = JSON.parse(raw)
        return Array.isArray(parsed) ? (parsed as T[]) : fallback
    } catch {
        return fallback
    }
}

const writeList = <T>(key: string, list: T[]) => {
    localStorage.setItem(key, JSON.stringify(list))
}

const nextId = (list: Array<{ id?: number }>) => {
    const maxId = list.reduce((max, item) => Math.max(max, item.id || 0), 0)
    return maxId + 1
}

const parseJson = (data: unknown) => {
    if (!data) return {}
    if (typeof data === 'string') {
        try {
            return JSON.parse(data)
        } catch {
            return {}
        }
    }
    if (data instanceof URLSearchParams) {
        return Object.fromEntries(data.entries())
    }
    return data as Record<string, unknown>
}

const normalizePath = (url: URL) => {
    const basePath = '/xlw'
    return url.pathname.startsWith(basePath) ? url.pathname.slice(basePath.length) : url.pathname
}

const paginate = <T>(list: T[], pageNum: number, pageSize: number) => {
    const start = (pageNum - 1) * pageSize
    return list.slice(start, start + pageSize)
}

const okResponse = <T>(
    config: InternalAxiosRequestConfig,
    data: T
): AxiosResponse<T> => ({
    data,
    status: 200,
    statusText: 'OK',
    headers: {},
    config
})

const notFoundResponse = (
    config: InternalAxiosRequestConfig
): AxiosResponse<Record<string, unknown>> => ({
    data: { code: 1, msg: 'mock not found', data: {} },
    status: 404,
    statusText: 'Not Found',
    headers: {},
    config
})

export const setupMock = (http: AxiosInstance) => {
    http.interceptors.request.use((config) => {
        config.adapter = async (cfg) => {
            const url = new URL(cfg.url || '', cfg.baseURL)
            const path = normalizePath(url)
            const method = (cfg.method || 'get').toUpperCase()
            const params = { ...cfg.params, ...Object.fromEntries(url.searchParams.entries()) }
            const body = parseJson(cfg.data)

            if (path === '/login/merchant' && method === 'POST') {
                return okResponse(cfg, { code: 0, msg: '', data: { token: 'mock-token' } })
            }

            if (path === '/logout' && method === 'POST') {
                return okResponse(cfg, { code: 0, msg: '', data: {} })
            }

            if (path === '/user/page' && method === 'GET') {
                const users = readList(STORAGE_KEYS.users, [
                    {
                        id: 1,
                        username: 'User A',
                        phone: '13800000000',
                        unit: 1,
                        floorNum: 2,
                        roomNum: '01',
                        xunlinbiNum: 10,
                        totalOrders: 2
                    }
                ])
                const phone = String(params.phone || '')
                const unit = String(params.unit || '')
                const filtered = users.filter((user) => {
                    const phoneMatch = phone ? String(user.phone || '').includes(phone) : true
                    const unitMatch = unit ? String(user.unit || '') === unit : true
                    return phoneMatch && unitMatch
                })
                const pageNum = Number(params.pageNum || 1)
                const pageSize = Number(params.pageSize || 10)
                return okResponse(cfg, {
                    code: 0,
                    msg: '',
                    total: filtered.length,
                    rows: paginate(filtered, pageNum, pageSize)
                })
            }

            if (path === '/user' && method === 'POST') {
                const users = readList<Record<string, unknown>>(STORAGE_KEYS.users, [])
                const id = nextId(users)
                const newUser = { id, ...body }
                const nextList = [...users, newUser]
                writeList(STORAGE_KEYS.users, nextList)
                return okResponse(cfg, { code: 0, msg: '', data: {} })
            }

            if (path === '/user' && method === 'PUT') {
                const users = readList<Record<string, unknown>>(STORAGE_KEYS.users, [])
                const id = Number((body as Record<string, unknown>).id || 0)
                const nextList = users.map((item) => (Number(item.id) === id ? { ...item, ...body } : item))
                writeList(STORAGE_KEYS.users, nextList)
                return okResponse(cfg, { code: 0, msg: '', data: {} })
            }

            if (path === '/user/reset-pwd' && method === 'PUT') {
                return okResponse(cfg, { code: 0, msg: '', data: {} })
            }

            if (path.startsWith('/user/info/') && method === 'GET') {
                const id = Number(path.split('/').pop())
                const users = readList<Record<string, unknown>>(STORAGE_KEYS.users, [])
                const user = users.find((item) => Number(item.id) === id) || {}
                return okResponse(cfg, { code: 0, msg: '', data: user })
            }

            if (path.startsWith('/user/') && method === 'DELETE') {
                const id = Number(path.split('/').pop())
                const users = readList<Record<string, unknown>>(STORAGE_KEYS.users, [])
                const nextList = users.filter((item) => Number(item.id) !== id)
                writeList(STORAGE_KEYS.users, nextList)
                return okResponse(cfg, { code: 0, msg: '', data: {} })
            }

            if (path === '/product/list' && method === 'GET') {
                const products = readList(STORAGE_KEYS.products, [
                    {
                        id: 1,
                        productName: 'Product A',
                        categoryId: 1,
                        categoryName: 'Category A',
                        productPrice: 3.5,
                        stock: 10,
                        productStatus: 1,
                        exchangeable: 0,
                        exchangePrice: 0
                    }
                ])
                const name = String(params.productName || '')
                const categoryId = String(params.categoryId || '')
                const status = String(params.productStatus || '')
                const exchangeable = String(params.exchangeable || '')
                const filtered = products.filter((item) => {
                    const nameMatch = name ? String(item.productName || '').includes(name) : true
                    const categoryMatch = categoryId ? String(item.categoryId || '') === categoryId : true
                    const statusMatch = status ? String(item.productStatus || '') === status : true
                    const exchangeMatch = exchangeable ? String(item.exchangeable || '') === exchangeable : true
                    return nameMatch && categoryMatch && statusMatch && exchangeMatch
                })
                const pageNum = Number(params.pageNum || 1)
                const pageSize = Number(params.pageSize || 10)
                return okResponse(cfg, {
                    code: 0,
                    msg: '',
                    total: filtered.length,
                    rows: paginate(filtered, pageNum, pageSize)
                })
            }

            if (path === '/product' && method === 'POST') {
                const products = readList<Record<string, unknown>>(STORAGE_KEYS.products, [])
                const id = nextId(products)
                const nextList = [...products, { id, ...body }]
                writeList(STORAGE_KEYS.products, nextList)
                return okResponse(cfg, { code: 0, msg: '', data: {} })
            }

            if (path === '/product' && method === 'PUT') {
                const products = readList<Record<string, unknown>>(STORAGE_KEYS.products, [])
                const id = Number((body as Record<string, unknown>).id || 0)
                const nextList = products.map((item) => (Number(item.id) === id ? { ...item, ...body } : item))
                writeList(STORAGE_KEYS.products, nextList)
                return okResponse(cfg, { code: 0, msg: '', data: {} })
            }

            if (path.startsWith('/product/stock/') && method === 'PUT') {
                const id = Number(path.split('/').pop())
                const addNum = Number(params.addNum || 0)
                const products = readList<Record<string, unknown>>(STORAGE_KEYS.products, [])
                const nextList = products.map((item) => {
                    if (Number(item.id) !== id) return item
                    const stock = Number(item.stock || 0) + addNum
                    return { ...item, stock }
                })
                writeList(STORAGE_KEYS.products, nextList)
                return okResponse(cfg, { code: 0, msg: '', data: {} })
            }

            if (path.startsWith('/product/status/') && method === 'PUT') {
                const id = Number(path.split('/').pop())
                const productStatus = Number(params.productStatus || 0)
                const products = readList<Record<string, unknown>>(STORAGE_KEYS.products, [])
                const nextList = products.map((item) =>
                    Number(item.id) === id ? { ...item, productStatus } : item
                )
                writeList(STORAGE_KEYS.products, nextList)
                return okResponse(cfg, { code: 0, msg: '', data: {} })
            }

            if (path === '/product/exchange-status' && method === 'PUT') {
                const id = Number((body as Record<string, unknown>).id || 0)
                const exchangeable = Number((body as Record<string, unknown>).exchangeable || 0)
                const exchangePrice = Number((body as Record<string, unknown>).exchangePrice || 0)
                const products = readList<Record<string, unknown>>(STORAGE_KEYS.products, [])
                const nextList = products.map((item) =>
                    Number(item.id) === id ? { ...item, exchangeable, exchangePrice } : item
                )
                writeList(STORAGE_KEYS.products, nextList)
                return okResponse(cfg, { code: 0, msg: '', data: {} })
            }

            if (path.startsWith('/product/exchange-price/') && method === 'PUT') {
                const id = Number(path.split('/').pop())
                const exchangePrice = Number(params.exchangePrice || 0)
                const products = readList<Record<string, unknown>>(STORAGE_KEYS.products, [])
                const nextList = products.map((item) =>
                    Number(item.id) === id ? { ...item, exchangePrice } : item
                )
                writeList(STORAGE_KEYS.products, nextList)
                return okResponse(cfg, { code: 0, msg: '', data: {} })
            }

            if (path.startsWith('/product/') && method === 'GET') {
                const id = Number(path.split('/').pop())
                const products = readList<Record<string, unknown>>(STORAGE_KEYS.products, [])
                const product = products.find((item) => Number(item.id) === id) || {}
                return okResponse(cfg, { code: 0, msg: '', data: product })
            }

            if (path.startsWith('/product/') && method === 'DELETE') {
                const id = Number(path.split('/').pop())
                const products = readList<Record<string, unknown>>(STORAGE_KEYS.products, [])
                const nextList = products.filter((item) => Number(item.id) !== id)
                writeList(STORAGE_KEYS.products, nextList)
                return okResponse(cfg, { code: 0, msg: '', data: {} })
            }

            if (path === '/order/list' && method === 'GET') {
                const orders = readList(STORAGE_KEYS.orders, [
                    {
                        id: 1,
                        orderNo: 'MOCK-001',
                        userId: 1,
                        orderStatus: 0,
                        payStatus: 0,
                        orderType: 0,
                        hasExchange: 0
                    }
                ])
                const orderNo = String(params.orderNo || '')
                const userId = String(params.userId || '')
                const orderStatus = String(params.orderStatus || '')
                const payStatus = String(params.payStatus || '')
                const orderType = String(params.orderType || '')
                const hasExchange = String(params.hasExchange || '')
                const filtered = orders.filter((item) => {
                    const orderMatch = orderNo ? String(item.orderNo || '').includes(orderNo) : true
                    const userMatch = userId ? String(item.userId || '') === userId : true
                    const statusMatch = orderStatus ? String(item.orderStatus || '') === orderStatus : true
                    const payMatch = payStatus ? String(item.payStatus || '') === payStatus : true
                    const typeMatch = orderType ? String(item.orderType || '') === orderType : true
                    const exchangeMatch = hasExchange ? String(item.hasExchange || '') === hasExchange : true
                    return orderMatch && userMatch && statusMatch && payMatch && typeMatch && exchangeMatch
                })
                const pageNum = Number(params.pageNum || 1)
                const pageSize = Number(params.pageSize || 10)
                return okResponse(cfg, {
                    code: 0,
                    msg: '',
                    total: filtered.length,
                    rows: paginate(filtered, pageNum, pageSize)
                })
            }

            if (path.startsWith('/order/status/') && method === 'PUT') {
                const id = Number(path.split('/').pop())
                const orderStatus = Number(params.orderStatus || 0)
                const orders = readList<Record<string, unknown>>(STORAGE_KEYS.orders, [])
                const nextList = orders.map((item) =>
                    Number(item.id) === id ? { ...item, orderStatus } : item
                )
                writeList(STORAGE_KEYS.orders, nextList)
                return okResponse(cfg, { code: 0, msg: '', data: {} })
            }

            if (path.startsWith('/order/pay-status/') && method === 'PUT') {
                const id = Number(path.split('/').pop())
                const payStatus = Number(params.payStatus || 0)
                const orders = readList<Record<string, unknown>>(STORAGE_KEYS.orders, [])
                const nextList = orders.map((item) =>
                    Number(item.id) === id ? { ...item, payStatus } : item
                )
                writeList(STORAGE_KEYS.orders, nextList)
                return okResponse(cfg, { code: 0, msg: '', data: {} })
            }

            if (path.startsWith('/order/confirm-refund/') && method === 'PUT') {
                const id = Number(path.split('/').pop())
                const orders = readList<Record<string, unknown>>(STORAGE_KEYS.orders, [])
                const nextList = orders.map((item) =>
                    Number(item.id) === id ? { ...item, orderStatus: 7 } : item
                )
                writeList(STORAGE_KEYS.orders, nextList)
                return okResponse(cfg, { code: 0, msg: '', data: {} })
            }

            if (path.startsWith('/order/apply-refund/') && method === 'PUT') {
                const id = Number(path.split('/').pop())
                const orders = readList<Record<string, unknown>>(STORAGE_KEYS.orders, [])
                const nextList = orders.map((item) =>
                    Number(item.id) === id ? { ...item, orderStatus: 7 } : item
                )
                writeList(STORAGE_KEYS.orders, nextList)
                return okResponse(cfg, { code: 0, msg: '', data: {} })
            }

            if (path.startsWith('/order/refuse-refund/') && method === 'PUT') {
                return okResponse(cfg, { code: 0, msg: '', data: {} })
            }

            if (path.startsWith('/order/') && method === 'GET') {
                const id = Number(path.split('/').pop())
                const orders = readList<Record<string, unknown>>(STORAGE_KEYS.orders, [])
                const order = orders.find((item) => Number(item.id) === id) || {}
                return okResponse(cfg, { code: 0, msg: '', data: order })
            }

            if (path.startsWith('/order/') && method === 'DELETE') {
                const id = Number(path.split('/').pop())
                const orders = readList<Record<string, unknown>>(STORAGE_KEYS.orders, [])
                const nextList = orders.filter((item) => Number(item.id) !== id)
                writeList(STORAGE_KEYS.orders, nextList)
                return okResponse(cfg, { code: 0, msg: '', data: {} })
            }

            if (path === '/fee/page' && method === 'GET') {
                const fees = readList(STORAGE_KEYS.fees, [
                    { id: 1, feeName: 'Base Fee', feeValue: 2.5, remark: 'Default' }
                ])
                const pageNum = Number(params.pageNum || 1)
                const pageSize = Number(params.pageSize || 10)
                return okResponse(cfg, {
                    code: 0,
                    msg: '',
                    total: fees.length,
                    rows: paginate(fees, pageNum, pageSize)
                })
            }

            if (path === '/fee' && method === 'PUT') {
                const fees = readList<Record<string, unknown>>(STORAGE_KEYS.fees, [])
                const id = Number((body as Record<string, unknown>).id || 0)
                const nextList = fees.map((item) => (Number(item.id) === id ? { ...item, ...body } : item))
                writeList(STORAGE_KEYS.fees, nextList)
                return okResponse(cfg, { code: 0, msg: '', data: {} })
            }

            if (path === '/fee/discount-rules' && method === 'GET') {
                const rules = readList(STORAGE_KEYS.discountRules, [
                    {
                        id: 1,
                        scopeType: 0,
                        minOrders: 5,
                        discountRate: 0.8,
                        discountDesc: 'Mock rule'
                    }
                ])
                const scopeType = String(params.scopeType || '')
                const filtered = scopeType ? rules.filter((item) => String(item.scopeType) === scopeType) : rules
                const pageNum = Number(params.pageNum || 1)
                const pageSize = Number(params.pageSize || 10)
                return okResponse(cfg, {
                    code: 0,
                    msg: '',
                    data: {
                        total: filtered.length,
                        rows: paginate(filtered, pageNum, pageSize)
                    }
                })
            }

            if (path === '/fee/discount-rules' && method === 'POST') {
                const rules = readList<Record<string, unknown>>(STORAGE_KEYS.discountRules, [])
                const id = nextId(rules)
                const nextList = [...rules, { id, ...body }]
                writeList(STORAGE_KEYS.discountRules, nextList)
                return okResponse(cfg, { code: 0, msg: '', data: {} })
            }

            if (path === '/fee/discount-rules' && method === 'PUT') {
                const rules = readList<Record<string, unknown>>(STORAGE_KEYS.discountRules, [])
                const id = Number((body as Record<string, unknown>).id || 0)
                const nextList = rules.map((item) => (Number(item.id) === id ? { ...item, ...body } : item))
                writeList(STORAGE_KEYS.discountRules, nextList)
                return okResponse(cfg, { code: 0, msg: '', data: {} })
            }

            if (path.startsWith('/fee/discount-rules/') && method === 'GET') {
                const id = Number(path.split('/').pop())
                const rules = readList<Record<string, unknown>>(STORAGE_KEYS.discountRules, [])
                const rule = rules.find((item) => Number(item.id) === id) || {}
                return okResponse(cfg, { code: 0, msg: '', data: rule })
            }

            if (path.startsWith('/fee/discount-rules/') && method === 'DELETE') {
                const id = Number(path.split('/').pop())
                const rules = readList<Record<string, unknown>>(STORAGE_KEYS.discountRules, [])
                const nextList = rules.filter((item) => Number(item.id) !== id)
                writeList(STORAGE_KEYS.discountRules, nextList)
                return okResponse(cfg, { code: 0, msg: '', data: {} })
            }

            if (path === '/category/page' && method === 'GET') {
                const categories = readList(STORAGE_KEYS.categories, [
                    { id: 1, categoryId: 1, categoryName: 'Category A' }
                ])
                const name = String(params.categoryName || '')
                const filtered = name
                    ? categories.filter((item) => String(item.categoryName || '').includes(name))
                    : categories
                const pageNum = Number(params.pageNum || 1)
                const pageSize = Number(params.pageSize || 10)
                return okResponse(cfg, {
                    code: 0,
                    msg: '',
                    total: filtered.length,
                    rows: paginate(filtered, pageNum, pageSize)
                })
            }

            if (path === '/category/list' && method === 'GET') {
                const categories = readList(STORAGE_KEYS.categories, [
                    { id: 1, categoryId: 1, categoryName: 'Category A' }
                ])
                return okResponse(cfg, { code: 0, msg: '', data: { rows: categories } })
            }

            if (path === '/category' && method === 'POST') {
                const categories = readList<Record<string, unknown>>(STORAGE_KEYS.categories, [])
                const id = nextId(categories)
                const categoryName = String(params.categoryName || (body as Record<string, unknown>).categoryName || '')
                const nextList = [...categories, { id, categoryId: id, categoryName }]
                writeList(STORAGE_KEYS.categories, nextList)
                return okResponse(cfg, { code: 0, msg: '', data: {} })
            }

            if (path.startsWith('/category/') && method === 'PUT') {
                const categoryId = Number(path.split('/').pop())
                const categoryName = String(params.categoryName || (body as Record<string, unknown>).categoryName || '')
                const categories = readList<Record<string, unknown>>(STORAGE_KEYS.categories, [])
                const nextList = categories.map((item) =>
                    Number(item.categoryId || item.id) === categoryId ? { ...item, categoryName } : item
                )
                writeList(STORAGE_KEYS.categories, nextList)
                return okResponse(cfg, { code: 0, msg: '', data: {} })
            }

            if (path.startsWith('/category/') && method === 'DELETE') {
                const categoryId = Number(path.split('/').pop())
                const categories = readList<Record<string, unknown>>(STORAGE_KEYS.categories, [])
                const nextList = categories.filter((item) => Number(item.categoryId || item.id) !== categoryId)
                writeList(STORAGE_KEYS.categories, nextList)
                return okResponse(cfg, { code: 0, msg: '', data: {} })
            }

            return notFoundResponse(cfg)
        }

        return config
    })
}
