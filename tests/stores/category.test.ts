import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useCategoryStore } from '../../src/stores/category'
import { getCategoryList } from '../../src/api/modules/category'

vi.mock('../../src/api/modules/category', () => ({
    getCategoryList: vi.fn()
}))

vi.mock('element-plus', () => ({
    ElMessage: {
        error: vi.fn(),
        success: vi.fn()
    }
}))

describe('useCategoryStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
        vi.clearAllMocks()
    })

    it('parses category list from rows', async () => {
        ; (getCategoryList as ReturnType<typeof vi.fn>).mockResolvedValue({
            data: {
                code: 0,
                msg: '',
                data: { rows: [{ id: 1, categoryName: '饮料' }] }
            }
        })

        const store = useCategoryStore()
        await store.fetchCategories()

        expect(store.categories).toEqual([{ id: 1, name: '饮料' }])
    })

    it('parses category list from array', async () => {
        ; (getCategoryList as ReturnType<typeof vi.fn>).mockResolvedValue({
            data: {
                code: 0,
                msg: '',
                data: [{ id: 2, name: '零食' }]
            }
        })

        const store = useCategoryStore()
        await store.fetchCategories()

        expect(store.categories).toEqual([{ id: 2, name: '零食' }])
    })
})
