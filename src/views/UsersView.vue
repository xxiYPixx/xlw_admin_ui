<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { ElForm, ElMessage, ElMessageBox } from 'element-plus'
import { createUser, deleteUser, getUserInfo, getUserPage, resetUserPassword, updateUser } from '../api/modules/user'
import { isSuccess } from '../api/types'

const searchForm = reactive({
    phone: '',
    unit: '',
    pageNum: 1,
    pageSize: 10
})

const loading = ref(false)
const tableData = ref<Record<string, unknown>[]>([])
const total = ref(0)

const fetchList = async () => {
    loading.value = true
    try {
        const response = await getUserPage({
            phone: searchForm.phone || undefined,
            unit: searchForm.unit || undefined,
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
    searchForm.phone = ''
    searchForm.unit = ''
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
    username: '',
    phone: '',
    password: '',
    unit: 1,
    floorNum: 1,
    roomNum: ''
})

const formRules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    unit: [{ required: true, message: '请输入单元', trigger: 'change' }],
    floorNum: [{ required: true, message: '请输入楼层', trigger: 'change' }],
    roomNum: [{ required: true, message: '请输入房号', trigger: 'blur' }]
}

const openCreate = () => {
    dialogTitle.value = '新增用户'
    formData.id = undefined
    formData.username = ''
    formData.phone = ''
    formData.password = ''
    formData.unit = 1
    formData.floorNum = 1
    formData.roomNum = ''
    dialogVisible.value = true
}

const openEdit = (row: Record<string, unknown>) => {
    dialogTitle.value = '编辑用户'
    formData.id = Number(row.id || 0)
    formData.username = (row.username as string) || ''
    formData.phone = (row.phone as string) || ''
    formData.password = ''
    formData.unit = (row.unit as number) || 1
    formData.floorNum = (row.floorNum as number) || 1
    formData.roomNum = (row.roomNum as string) || ''
    dialogVisible.value = true
}

const submitForm = async () => {
    if (!formRef.value) return
    await formRef.value.validate(async (valid) => {
        if (!valid) return
        const payload = {
            id: formData.id,
            username: formData.username,
            phone: formData.phone,
            password: formData.password || undefined,
            unit: formData.unit,
            floorNum: formData.floorNum,
            roomNum: formData.roomNum
        }
        const response = formData.id ? await updateUser(payload) : await createUser(payload)
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

const resetDialogVisible = ref(false)
const resetForm = reactive({
    id: 0,
    newPassword: ''
})

const openResetPassword = (row: Record<string, unknown>) => {
    resetForm.id = Number(row.id || 0)
    resetForm.newPassword = ''
    resetDialogVisible.value = true
}

const submitResetPassword = async () => {
    const response = await resetUserPassword({
        id: resetForm.id,
        newPassword: resetForm.newPassword
    })
    const { code, msg } = response.data
    if (!isSuccess(code)) {
        ElMessage.error(msg || '重置失败')
        return
    }
    ElMessage.success('密码已重置')
    resetDialogVisible.value = false
}

const detailVisible = ref(false)
const detailData = ref<Record<string, unknown>>({})

const detailEntries = computed(() => Object.entries(detailData.value || {}))

const openDetail = async (row: Record<string, unknown>) => {
    const response = await getUserInfo(Number(row.id || 0))
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
    const response = await deleteUser(Number(row.id || 0))
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
                <h2>用户管理</h2>
                <p>管理用户账号信息。</p>
            </div>
            <el-button type="primary" @click="openCreate">新增用户</el-button>
        </div>

        <el-form :inline="true" class="search-form">
            <el-form-item label="手机号">
                <el-input v-model="searchForm.phone" placeholder="手机号" clearable />
            </el-form-item>
            <el-form-item label="单元">
                <el-input v-model="searchForm.unit" placeholder="单元" clearable />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
                <el-button @click="handleReset">重置</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="tableData" v-loading="loading" stripe class="data-table">
            <el-table-column prop="username" label="用户名" min-width="120" />
            <el-table-column prop="phone" label="手机号" min-width="140" />
            <el-table-column prop="unit" label="单元" width="90" />
            <el-table-column prop="floorNum" label="楼层" width="90" />
            <el-table-column prop="roomNum" label="房号" width="90" />
            <el-table-column prop="xunlinbiNum" label="迅邻币" width="100" />
            <el-table-column prop="totalOrders" label="累计订单" width="100" />
            <el-table-column label="操作" fixed="right" width="260">
                <template #default="scope">
                    <el-button type="primary" link @click="openEdit(scope.row)">编辑</el-button>
                    <el-button type="primary" link @click="openDetail(scope.row)">详情</el-button>
                    <el-button type="warning" link @click="openResetPassword(scope.row)">重置密码</el-button>
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
        <el-form ref="formRef" :model="formData" :rules="formRules" label-width="120px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="formData.username" />
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input v-model="formData.phone" />
            </el-form-item>
            <el-form-item v-if="!formData.id" label="密码" prop="password">
                <el-input v-model="formData.password" type="password" show-password />
            </el-form-item>
            <el-form-item label="单元" prop="unit">
                <el-input-number v-model="formData.unit" :min="1" />
            </el-form-item>
            <el-form-item label="楼层" prop="floorNum">
                <el-input-number v-model="formData.floorNum" :min="1" />
            </el-form-item>
            <el-form-item label="房号" prop="roomNum">
                <el-input v-model="formData.roomNum" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitForm">保存</el-button>
        </template>
    </el-dialog>

    <el-dialog v-model="resetDialogVisible" title="重置密码" width="420px">
        <el-form label-width="120px">
            <el-form-item label="新密码">
                <el-input v-model="resetForm.newPassword" type="password" show-password />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="resetDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitResetPassword">确认</el-button>
        </template>
    </el-dialog>

    <el-drawer v-model="detailVisible" title="用户详情" size="420px">
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
