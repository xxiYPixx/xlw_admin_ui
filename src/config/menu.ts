export interface MenuItem {
    path: string
    label: string
    icon?: string
}

export const menuItems: MenuItem[] = [
    { path: '/users', label: '用户管理', icon: 'UserFilled' },
    { path: '/products', label: '商品管理', icon: 'Goods' },
    { path: '/orders', label: '订单管理', icon: 'Tickets' },
    { path: '/fees', label: '配送费用', icon: 'Coin' },
    { path: '/discount-rules', label: '折扣规则', icon: 'List' },
    { path: '/categories', label: '商品分类', icon: 'Management' }
]
