<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElForm, ElMessage, ElMessageBox } from 'element-plus'
import { createCategory, deleteCategory, getCategoryPage, updateCategory } from '../api/modules/category'
import { isSuccess } from '../api/types'

const searchForm = reactive({
    categoryName: '',
    pageNum: 1,
    pageSize: 10
})

const loading = ref(false)
const tableData = ref<Record<string, unknown>[]>([])
const total = ref(0)

const fetchList = async () => {
    loading.value = true
    try {
        const response = await getCategoryPage({
            categoryName: searchForm.categoryName || undefined,
            pageNum: searchForm.pageNum,
            pageSize: searchForm.pageSize
        })
        const { code, msg, rows, total: totalCount } = response.data
        if (!isSuccess(code)) {
            ElMessage.error(msg || '加载失败')
            return
        }
        tableData.value = Array.isArray(rows) ? rows : []
        total.value = typeof totalCount === 'number' ? totalCount : 0
    } finally {
        loading.value = false
    }
}

fetchList()

const handleSearch = () => {
    searchForm.pageNum = 1
    fetchList()
}

const handleReset = () => {
    searchForm.categoryName = ''
    searchForm.pageNum = 1
    fetchList()
}

const handlePageChange = (page: number) => {
    searchForm.pageNum = page
    fetchList()
}

const handleSizeChange = (size: number) => {
    searchForm.pageSize = size
    searchForm.pageNum = 1
    fetchList()
}

const dialogVisible = ref(false)
const dialogTitle = ref('')
const formRef = ref<InstanceType<typeof ElForm> | null>(null)
const formData = reactive({
    id: undefined as number | undefined,
    categoryName: ''
})

const formRules = {
    categoryName: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
}

const openCreate = () => {
    dialogTitle.value = '新增分类'
    formData.id = undefined
    formData.categoryName = ''
    dialogVisible.value = true
}

const openEdit = (row: Record<string, unknown>) => {
    dialogTitle.value = '编辑分类'
    formData.id = Number(row.categoryId ?? row.id ?? 0)
    formData.categoryName = (row.categoryName as string) || ''
    dialogVisible.value = true
}

const submitForm = async () => {
    if (!formRef.value) return
    await formRef.value.validate(async (valid) => {
        if (!valid) return
        const response = formData.id
            ? await updateCategory(formData.id, formData.categoryName)
            : await createCategory(formData.categoryName)
        const { code, msg } = response.data
        if (!isSuccess(code)) {
            ElMessage.error(msg || '保存失败')
            return
        }
        ElMessage.success('已保存')
        dialogVisible.value = false
        fetchList()
    })
}

const handleDelete = async (row: Record<string, unknown>) => {
    try {
        await ElMessageBox.confirm('确认删除？', '提示', { type: 'warning' })
    } catch {
        return
    }
    const response = await deleteCategory(Number(row.categoryId ?? row.id ?? 0))
    const { code, msg } = response.data
    if (!isSuccess(code)) {
        ElMessage.error(msg || '删除失败')
        return
    }
    ElMessage.success('已删除')
    fetchList()
}
</script>

<template>
    <div class="page-card">
        <div class="page-header">
            <div>
                <h2>商品分类</h2>
                <p>管理商品分类信息。</p>
            </div>
            <el-button type="primary" @click="openCreate">新增分类</el-button>
        </div>

        <el-form :inline="true" class="search-form">
            <el-form-item label="分类名称">
                <el-input v-model="searchForm.categoryName" placeholder="分类名称" clearable />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
                <el-button @click="handleReset">重置</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="tableData" v-loading="loading" stripe class="data-table">
            <el-table-column prop="categoryName" label="分类名称" min-width="180" />
            <el-table-column label="ID" width="100">
                <template #default="scope">
                    {{ scope.row.categoryId ?? scope.row.id }}
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="180">
                <template #default="scope">
                    <el-button type="primary" link @click="openEdit(scope.row)">编辑</el-button>
                    <el-button type="danger" link @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination">
            <el-pagination background layout="total, sizes, prev, pager, next" :total="total" :page-sizes="[10, 20, 50]"
                :page-size="searchForm.pageSize" :current-page="searchForm.pageNum" @size-change="handleSizeChange"
                @current-change="handlePageChange" />
        </div>
    </div>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="420px">
        <el-form ref="formRef" :model="formData" :rules="formRules" label-width="120px">
            <el-form-item label="分类名称" prop="categoryName">
                <el-input v-model="formData.categoryName" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitForm">保存</el-button>
        </template>
    </el-dialog>
</template>

<style scoped>
.page-card {
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
}

.page-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 16px;
}

.page-header h2 {
    margin: 0 0 4px;
    font-size: 20px;
}

.page-header p {
    margin: 0;
    color: #6b7280;
}

.search-form {
    margin-bottom: 16px;
}

.data-table {
    width: 100%;
}

.pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
}
</style>
