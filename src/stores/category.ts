import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { getCategoryList } from '../api/modules/category'
import { isSuccess } from '../api/types'

export interface CategoryOption {
    id: number
    name: string
}

const parseCategory = (item: Record<string, unknown>): CategoryOption | null => {
    const idValue = item.id
    const nameValue = item.categoryName || item.name
    if (typeof idValue !== 'number' || typeof nameValue !== 'string') {
        return null
    }
    return { id: idValue, name: nameValue }
}

export const useCategoryStore = defineStore('category', () => {
    const categories = ref<CategoryOption[]>([])

    const fetchCategories = async () => {
        const response = await getCategoryList()
        const { code, msg, data } = response.data
        if (!isSuccess(code)) {
            ElMessage.error(msg || '分类加载失败')
            return
        }
        const rows = Array.isArray((data as Record<string, unknown>)?.rows)
            ? ((data as Record<string, unknown>).rows as Record<string, unknown>[])
            : Array.isArray(data)
                ? (data as Record<string, unknown>[])
                : []

        categories.value = rows
            .map((item) => parseCategory(item))
            .filter((item): item is CategoryOption => Boolean(item))
    }

    return {
        categories,
        fetchCategories
    }
})
