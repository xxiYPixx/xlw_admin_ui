<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
    applyRefund,
    confirmRefund,
    deleteOrder,
    getOrderDetail,
    getOrderList,
    refuseRefund,
    updateOrderStatus,
    updatePayStatus
} from '../api/modules/order'
import { isSuccess } from '../api/types'

const searchForm = reactive({
    userId: '',
    orderNo: '',
    orderStatus: '',
    payStatus: '',
    orderType: '',
    hasExchange: '',
    pageNum: 1,
    pageSize: 10
})

const loading = ref(false)
const tableData = ref<Record<string, unknown>[]>([])
const total = ref(0)

const statusOptions = [
    { label: '初始', value: 0 },
    { label: '待付款', value: 1 },
    { label: '待接单', value: 2 },
    { label: '已接单', value: 3 },
    { label: '派送中', value: 4 },
    { label: '已完成', value: 5 },
    { label: '已取消', value: 6 },
    { label: '退款', value: 7 }
]

const payStatusOptions = [
    { label: '未支付', value: 0 },
    { label: '已支付', value: 1 },
    { label: '已退款', value: 2 }
]

const orderTypeOptions = [
    { label: '商品', value: 0 },
    { label: '快递', value: 1 },
    { label: '快递+商品', value: 2 }
]

const hasExchangeOptions = [
    { label: '否', value: 0 },
    { label: '是', value: 1 }
]

const fetchList = async () => {
    loading.value = true
    try {
        const response = await getOrderList({
            userId: searchForm.userId || undefined,
            orderNo: searchForm.orderNo || undefined,
            orderStatus: searchForm.orderStatus || undefined,
            payStatus: searchForm.payStatus || undefined,
            orderType: searchForm.orderType || undefined,
            hasExchange: searchForm.hasExchange || undefined,
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
    searchForm.userId = ''
    searchForm.orderNo = ''
    searchForm.orderStatus = ''
    searchForm.payStatus = ''
    searchForm.orderType = ''
    searchForm.hasExchange = ''
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

const statusDialogVisible = ref(false)
const statusForm = reactive({
    id: 0,
    orderStatus: 0
})

const openStatusDialog = (row: Record<string, unknown>) => {
    statusForm.id = Number(row.id || 0)
    statusForm.orderStatus = Number(row.orderStatus || 0)
    statusDialogVisible.value = true
}

const submitStatus = async () => {
    const response = await updateOrderStatus(statusForm.id, statusForm.orderStatus)
    const { code, msg } = response.data
    if (!isSuccess(code)) {
        ElMessage.error(msg || '更新失败')
        return
    }
    ElMessage.success('已更新')
    statusDialogVisible.value = false
    fetchList()
}

const payDialogVisible = ref(false)
const payForm = reactive({
    id: 0,
    payStatus: 0
})

const openPayDialog = (row: Record<string, unknown>) => {
    payForm.id = Number(row.id || 0)
    payForm.payStatus = Number(row.payStatus || 0)
    payDialogVisible.value = true
}

const submitPayStatus = async () => {
    const response = await updatePayStatus(payForm.id, payForm.payStatus)
    const { code, msg } = response.data
    if (!isSuccess(code)) {
        ElMessage.error(msg || '更新失败')
        return
    }
    ElMessage.success('已更新')
    payDialogVisible.value = false
    fetchList()
}

const detailVisible = ref(false)
const detailData = ref<Record<string, unknown>>({})
const detailEntries = computed(() => Object.entries(detailData.value || {}))

const openDetail = async (row: Record<string, unknown>) => {
    const response = await getOrderDetail(Number(row.id || 0))
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
    const response = await deleteOrder(Number(row.id || 0))
    const { code, msg } = response.data
    if (!isSuccess(code)) {
        ElMessage.error(msg || '删除失败')
        return
    }
    ElMessage.success('已删除')
    fetchList()
}

const handleRefundAction = async (row: Record<string, unknown>, action: 'apply' | 'refuse' | 'confirm') => {
    const actionMap = {
        apply: applyRefund,
        refuse: refuseRefund,
        confirm: confirmRefund
    }
    try {
        await ElMessageBox.confirm('确认操作？', '提示', { type: 'warning' })
    } catch {
        return
    }
    const response = await actionMap[action](Number(row.id || 0))
    const { code, msg } = response.data
    if (!isSuccess(code)) {
        ElMessage.error(msg || '操作失败')
        return
    }
    ElMessage.success('已更新')
    fetchList()
}
</script>

<template>
    <div class="page-card">
        <div class="page-header">
            <div>
                <h2>订单管理</h2>
                <p>管理订单状态与支付。</p>
            </div>
        </div>

        <el-form :inline="true" class="search-form">
            <el-form-item label="用户ID">
                <el-input v-model="searchForm.userId" placeholder="用户ID" clearable />
            </el-form-item>
            <el-form-item label="订单号">
                <el-input v-model="searchForm.orderNo" placeholder="订单号" clearable />
            </el-form-item>
            <el-form-item label="订单状态">
                <el-select v-model="searchForm.orderStatus" placeholder="订单状态" clearable>
                    <el-option v-for="item in statusOptions" :key="item.value" :label="item.label"
                        :value="String(item.value)" />
                </el-select>
            </el-form-item>
            <el-form-item label="支付状态">
                <el-select v-model="searchForm.payStatus" placeholder="支付状态" clearable>
                    <el-option v-for="item in payStatusOptions" :key="item.value" :label="item.label"
                        :value="String(item.value)" />
                </el-select>
            </el-form-item>
            <el-form-item label="订单类型">
                <el-select v-model="searchForm.orderType" placeholder="订单类型" clearable>
                    <el-option v-for="item in orderTypeOptions" :key="item.value" :label="item.label"
                        :value="String(item.value)" />
                </el-select>
            </el-form-item>
            <el-form-item label="含兑换">
                <el-select v-model="searchForm.hasExchange" placeholder="含兑换" clearable>
                    <el-option v-for="item in hasExchangeOptions" :key="item.value" :label="item.label"
                        :value="String(item.value)" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
                <el-button @click="handleReset">重置</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="tableData" v-loading="loading" stripe class="data-table">
            <el-table-column prop="orderNo" label="订单号" min-width="160" />
            <el-table-column prop="userId" label="用户ID" width="100" />
            <el-table-column prop="totalAmount" label="金额" width="100" />
            <el-table-column prop="orderStatus" label="状态" width="110" />
            <el-table-column prop="payStatus" label="支付状态" width="110" />
            <el-table-column prop="orderType" label="类型" width="90" />
            <el-table-column prop="hasExchange" label="含兑换" width="100" />
            <el-table-column prop="createTime" label="创建时间" min-width="160" />
            <el-table-column label="操作" fixed="right" width="360">
                <template #default="scope">
                    <el-button type="primary" link @click="openDetail(scope.row)">详情</el-button>
                    <el-button type="warning" link @click="openStatusDialog(scope.row)">修改状态</el-button>
                    <el-button type="warning" link @click="openPayDialog(scope.row)">修改支付</el-button>
                    <el-button type="warning" link @click="handleRefundAction(scope.row, 'apply')">标记退款</el-button>
                    <el-button type="warning" link @click="handleRefundAction(scope.row, 'refuse')">拒绝退款</el-button>
                    <el-button type="warning" link @click="handleRefundAction(scope.row, 'confirm')">确认退款</el-button>
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

    <el-dialog v-model="statusDialogVisible" title="修改订单状态" width="420px">
        <el-form label-width="120px">
            <el-form-item label="订单状态">
                <el-select v-model="statusForm.orderStatus">
                    <el-option v-for="item in statusOptions" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="statusDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitStatus">确认</el-button>
        </template>
    </el-dialog>

    <el-dialog v-model="payDialogVisible" title="修改支付状态" width="420px">
        <el-form label-width="120px">
            <el-form-item label="支付状态">
                <el-select v-model="payForm.payStatus">
                    <el-option v-for="item in payStatusOptions" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="payDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitPayStatus">确认</el-button>
        </template>
    </el-dialog>

    <el-drawer v-model="detailVisible" title="订单详情" size="420px">
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
