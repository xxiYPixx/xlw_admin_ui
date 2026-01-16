import { describe, expect, it } from 'vitest'
import { menuItems } from '../../src/config/menu'

describe('menuItems', () => {
    it('uses Chinese labels', () => {
        const labels = menuItems.map((item) => item.label)
        expect(labels).toEqual(['用户管理', '商品管理', '订单管理', '配送费用', '折扣规则', '商品分类'])
    })
})
