<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElForm, ElMessage } from 'element-plus'
import { getFeePage, updateFee } from '../api/modules/fee'
import { isSuccess } from '../api/types'

const searchForm = reactive({
    pageNum: 1,
    pageSize: 10
})

const loading = ref(false)
const tableData = ref<Record<string, unknown>[]>([])
const total = ref(0)

const fetchList = async () => {
    loading.value = true
    try {
        const response = await getFeePage({
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
const formRef = ref<InstanceType<typeof ElForm> | null>(null)
const formData = reactive({
    id: undefined as number | undefined,
    feeName: '',
    feeValue: 0,
    remark: ''
})

const formRules = {
    feeName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    feeValue: [{ required: true, message: '请输入金额', trigger: 'blur' }]
}

const openEdit = (row: Record<string, unknown>) => {
    formData.id = Number(row.id || 0)
    formData.feeName = (row.feeName as string) || ''
    formData.feeValue = Number(row.feeValue || 0)
    formData.remark = (row.remark as string) || ''
    dialogVisible.value = true
}

const submitForm = async () => {
    if (!formRef.value) return
    await formRef.value.validate(async (valid) => {
        if (!valid) return
        const response = await updateFee({
            id: formData.id,
            feeName: formData.feeName,
            feeValue: formData.feeValue,
            remark: formData.remark || undefined
        })
        const { code, msg } = response.data
        if (!isSuccess(code)) {
            ElMessage.error(msg || '更新失败')
            return
        }
        ElMessage.success('已更新')
        dialogVisible.value = false
        fetchList()
    })
}
</script>

<template>
    <div class="page-card">
        <div class="page-header">
            <div>
                <h2>配送费用</h2>
                <p>配置配送费用项。</p>
            </div>
        </div>

        <el-table :data="tableData" v-loading="loading" stripe class="data-table">
            <el-table-column prop="feeName" label="费用名称" min-width="160" />
            <el-table-column prop="feeValue" label="金额" width="120" />
            <el-table-column prop="remark" label="备注" min-width="200" />
            <el-table-column label="操作" fixed="right" width="120">
                <template #default="scope">
                    <el-button type="primary" link @click="openEdit(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination">
            <el-pagination background layout="total, sizes, prev, pager, next" :total="total" :page-sizes="[10, 20, 50]"
                :page-size="searchForm.pageSize" :current-page="searchForm.pageNum" @size-change="handleSizeChange"
                @current-change="handlePageChange" />
        </div>
    </div>

    <el-dialog v-model="dialogVisible" title="编辑费用" width="480px">
        <el-form ref="formRef" :model="formData" :rules="formRules" label-width="120px">
            <el-form-item label="名称" prop="feeName">
                <el-input v-model="formData.feeName" />
            </el-form-item>
            <el-form-item label="金额" prop="feeValue">
                <el-input-number v-model="formData.feeValue" :min="0" :step="0.1" />
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="formData.remark" type="textarea" rows="2" />
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

.data-table {
    width: 100%;
}

.pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
}
</style>
