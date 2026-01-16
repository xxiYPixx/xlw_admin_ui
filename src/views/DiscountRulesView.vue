<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { ElForm, ElMessage, ElMessageBox } from 'element-plus'
import {
    createDiscountRule,
    deleteDiscountRule,
    getDiscountRuleDetail,
    getDiscountRules,
    updateDiscountRule
} from '../api/modules/fee'
import { isSuccess } from '../api/types'

const searchForm = reactive({
    scopeType: '',
    pageNum: 1,
    pageSize: 10
})

const loading = ref(false)
const tableData = ref<Record<string, unknown>[]>([])
const total = ref(0)

const scopeOptions = [
    { label: '个人', value: 0 },
    { label: '单元', value: 1 }
]

const fetchList = async () => {
    loading.value = true
    try {
        const response = await getDiscountRules({
            scopeType: searchForm.scopeType || undefined,
            pageNum: searchForm.pageNum,
            pageSize: searchForm.pageSize
        })
        const { code, msg, data } = response.data
        if (!isSuccess(code)) {
            ElMessage.error(msg || '加载失败')
            return
        }
        const rowsCandidate = (data as Record<string, unknown>)?.rows
        const list = Array.isArray(rowsCandidate)
            ? (rowsCandidate as Record<string, unknown>[])
            : Array.isArray(data)
                ? (data as Record<string, unknown>[])
                : []
        tableData.value = list
        total.value =
            typeof (data as Record<string, unknown>)?.total === 'number'
                ? ((data as Record<string, unknown>).total as number)
                : list.length
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
    searchForm.scopeType = ''
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
    scopeType: 0,
    minOrders: 0,
    discountRate: 1,
    discountDesc: ''
})

const formRules = {
    scopeType: [{ required: true, message: '请选择范围', trigger: 'change' }],
    minOrders: [{ required: true, message: '请输入最小订单数', trigger: 'blur' }],
    discountRate: [{ required: true, message: '请输入折扣率', trigger: 'blur' }]
}

const openCreate = () => {
    dialogTitle.value = '新增规则'
    formData.id = undefined
    formData.scopeType = 0
    formData.minOrders = 0
    formData.discountRate = 1
    formData.discountDesc = ''
    dialogVisible.value = true
}

const openEdit = (row: Record<string, unknown>) => {
    dialogTitle.value = '编辑规则'
    formData.id = Number(row.id || 0)
    formData.scopeType = Number(row.scopeType || 0)
    formData.minOrders = Number(row.minOrders || 0)
    formData.discountRate = Number(row.discountRate || 1)
    formData.discountDesc = (row.discountDesc as string) || ''
    dialogVisible.value = true
}

const submitForm = async () => {
    if (!formRef.value) return
    await formRef.value.validate(async (valid) => {
        if (!valid) return
        const payload = {
            id: formData.id,
            scopeType: formData.scopeType,
            minOrders: formData.minOrders,
            discountRate: formData.discountRate,
            discountDesc: formData.discountDesc || undefined
        }
        const response = formData.id
            ? await updateDiscountRule(payload)
            : await createDiscountRule(payload)
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

const detailVisible = ref(false)
const detailData = ref<Record<string, unknown>>({})
const detailEntries = computed(() => Object.entries(detailData.value || {}))

const openDetail = async (row: Record<string, unknown>) => {
    const response = await getDiscountRuleDetail(Number(row.id || 0))
    const { code, msg, data } = response.data
    if (!isSuccess(code)) {
        ElMessage.error(msg || '加载失败')
        return
    }
    detailData.value = (data as Record<string, unknown>) || {}
    detailVisible.value = true
}

const handleDelete = async (row: Record<string, unknown>) => {
    try {
        await ElMessageBox.confirm('确认删除？', '提示', { type: 'warning' })
    } catch {
        return
    }
    const response = await deleteDiscountRule(Number(row.id || 0))
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
                <h2>折扣规则</h2>
                <p>管理配送费折扣规则。</p>
            </div>
            <el-button type="primary" @click="openCreate">新增规则</el-button>
        </div>

        <el-form :inline="true" class="search-form">
            <el-form-item label="适用范围">
                <el-select v-model="searchForm.scopeType" placeholder="适用范围" clearable>
                    <el-option v-for="item in scopeOptions" :key="item.value" :label="item.label"
                        :value="String(item.value)" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
                <el-button @click="handleReset">重置</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="tableData" v-loading="loading" stripe class="data-table">
            <el-table-column prop="scopeType" label="适用范围" width="120" />
            <el-table-column prop="minOrders" label="最小订单数" width="120" />
            <el-table-column prop="discountRate" label="折扣率" width="140" />
            <el-table-column prop="discountDesc" label="描述" min-width="220" />
            <el-table-column label="操作" fixed="right" width="200">
                <template #default="scope">
                    <el-button type="primary" link @click="openEdit(scope.row)">编辑</el-button>
                    <el-button type="primary" link @click="openDetail(scope.row)">详情</el-button>
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

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="520px">
        <el-form ref="formRef" :model="formData" :rules="formRules" label-width="140px">
            <el-form-item label="适用范围" prop="scopeType">
                <el-select v-model="formData.scopeType">
                    <el-option v-for="item in scopeOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="最小订单数" prop="minOrders">
                <el-input-number v-model="formData.minOrders" :min="0" />
            </el-form-item>
            <el-form-item label="折扣率" prop="discountRate">
                <el-input-number v-model="formData.discountRate" :min="0" :max="1" :step="0.1" />
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="formData.discountDesc" type="textarea" rows="2" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitForm">保存</el-button>
        </template>
    </el-dialog>

    <el-drawer v-model="detailVisible" title="规则详情" size="420px">
        <el-descriptions :column="1" border>
            <el-descriptions-item v-for="[key, value] in detailEntries" :key="key" :label="key">
                {{ value }}
            </el-descriptions-item>
        </el-descriptions>
    </el-drawer>
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
