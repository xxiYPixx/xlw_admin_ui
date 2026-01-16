<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { ElForm, ElMessage, ElMessageBox } from 'element-plus'
import {
    createProduct,
    deleteProduct,
    getProductDetail,
    getProductList,
    stockInProduct,
    updateExchangePrice,
    updateExchangeStatus,
    updateProduct,
    updateProductStatus
} from '../api/modules/product'
import { isSuccess } from '../api/types'
import { useCategoryStore } from '../stores/category'

const categoryStore = useCategoryStore()
categoryStore.fetchCategories()

const searchForm = reactive({
    productName: '',
    categoryId: '',
    productStatus: '',
    exchangeable: '',
    pageNum: 1,
    pageSize: 10
})

const loading = ref(false)
const tableData = ref<Record<string, unknown>[]>([])
const total = ref(0)

const fetchList = async () => {
    loading.value = true
    try {
        const response = await getProductList({
            productName: searchForm.productName || undefined,
            categoryId: searchForm.categoryId || undefined,
            productStatus: searchForm.productStatus || undefined,
            exchangeable: searchForm.exchangeable || undefined,
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
    searchForm.productName = ''
    searchForm.categoryId = ''
    searchForm.productStatus = ''
    searchForm.exchangeable = ''
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
    productName: '',
    productDesc: '',
    categoryId: 0,
    productPrice: 0,
    stock: 0,
    previewImg: '',
    productStatus: 1,
    exchangeable: 0,
    exchangePrice: 0
})

const formRules = {
    productName: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    categoryId: [{ required: true, message: '请选择分类', trigger: 'change' }],
    productPrice: [{ required: true, message: '请输入价格', trigger: 'change' }]
}

const openCreate = () => {
    dialogTitle.value = '新增商品'
    formData.id = undefined
    formData.productName = ''
    formData.productDesc = ''
    formData.categoryId = 0
    formData.productPrice = 0
    formData.stock = 0
    formData.previewImg = ''
    formData.productStatus = 1
    formData.exchangeable = 0
    formData.exchangePrice = 0
    dialogVisible.value = true
}

const openEdit = (row: Record<string, unknown>) => {
    dialogTitle.value = '编辑商品'
    formData.id = Number(row.id || 0)
    formData.productName = (row.productName as string) || ''
    formData.productDesc = (row.productDesc as string) || ''
    formData.categoryId = Number(row.categoryId || 0)
    formData.productPrice = Number(row.productPrice || 0)
    formData.stock = Number(row.stock || 0)
    formData.previewImg = (row.previewImg as string) || ''
    formData.productStatus = Number(row.productStatus || 1)
    formData.exchangeable = Number(row.exchangeable || 0)
    formData.exchangePrice = Number(row.exchangePrice || 0)
    dialogVisible.value = true
}

const submitForm = async () => {
    if (!formRef.value) return
    await formRef.value.validate(async (valid) => {
        if (!valid) return
        const payload = {
            id: formData.id,
            productName: formData.productName,
            productDesc: formData.productDesc || undefined,
            categoryId: formData.categoryId,
            productPrice: formData.productPrice,
            stock: formData.stock,
            previewImg: formData.previewImg || undefined,
            productStatus: formData.productStatus,
            exchangeable: formData.exchangeable,
            exchangePrice: formData.exchangePrice || undefined
        }
        const response = formData.id ? await updateProduct(payload) : await createProduct(payload)
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

const stockDialogVisible = ref(false)
const stockForm = reactive({
    id: 0,
    addNum: 1
})

const openStockDialog = (row: Record<string, unknown>) => {
    stockForm.id = Number(row.id || 0)
    stockForm.addNum = 1
    stockDialogVisible.value = true
}

const submitStock = async () => {
    const response = await stockInProduct(stockForm.id, stockForm.addNum)
    const { code, msg } = response.data
    if (!isSuccess(code)) {
        ElMessage.error(msg || '入库失败')
        return
    }
    ElMessage.success('库存已更新')
    stockDialogVisible.value = false
    fetchList()
}

const statusDialogVisible = ref(false)
const statusForm = reactive({
    id: 0,
    productStatus: 1
})

const openStatusDialog = (row: Record<string, unknown>) => {
    statusForm.id = Number(row.id || 0)
    statusForm.productStatus = Number(row.productStatus || 1)
    statusDialogVisible.value = true
}

const submitStatus = async () => {
    const response = await updateProductStatus(statusForm.id, statusForm.productStatus)
    const { code, msg } = response.data
    if (!isSuccess(code)) {
        ElMessage.error(msg || '状态更新失败')
        return
    }
    ElMessage.success('状态已更新')
    statusDialogVisible.value = false
    fetchList()
}

const exchangeDialogVisible = ref(false)
const exchangeForm = reactive({
    id: 0,
    exchangeable: 0,
    exchangePrice: 0
})

const openExchangeDialog = (row: Record<string, unknown>) => {
    exchangeForm.id = Number(row.id || 0)
    exchangeForm.exchangeable = Number(row.exchangeable || 0)
    exchangeForm.exchangePrice = Number(row.exchangePrice || 0)
    exchangeDialogVisible.value = true
}

const submitExchange = async () => {
    const response = await updateExchangeStatus({
        id: exchangeForm.id,
        exchangeable: exchangeForm.exchangeable,
        exchangePrice: exchangeForm.exchangePrice || undefined
    })
    const { code, msg } = response.data
    if (!isSuccess(code)) {
        ElMessage.error(msg || '兑换状态更新失败')
        return
    }
    ElMessage.success('兑换状态已更新')
    exchangeDialogVisible.value = false
    fetchList()
}

const exchangePriceDialogVisible = ref(false)
const exchangePriceForm = reactive({
    id: 0,
    exchangePrice: 0
})

const openExchangePriceDialog = (row: Record<string, unknown>) => {
    exchangePriceForm.id = Number(row.id || 0)
    exchangePriceForm.exchangePrice = Number(row.exchangePrice || 0)
    exchangePriceDialogVisible.value = true
}

const submitExchangePrice = async () => {
    const response = await updateExchangePrice(
        exchangePriceForm.id,
        exchangePriceForm.exchangePrice
    )
    const { code, msg } = response.data
    if (!isSuccess(code)) {
        ElMessage.error(msg || '兑换价更新失败')
        return
    }
    ElMessage.success('兑换价已更新')
    exchangePriceDialogVisible.value = false
    fetchList()
}

const detailVisible = ref(false)
const detailData = ref<Record<string, unknown>>({})
const detailEntries = computed(() => Object.entries(detailData.value || {}))

const openDetail = async (row: Record<string, unknown>) => {
    const response = await getProductDetail(Number(row.id || 0))
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
    const response = await deleteProduct(Number(row.id || 0))
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
                <h2>商品管理</h2>
                <p>管理商品与库存。</p>
            </div>
            <el-button type="primary" @click="openCreate">新增商品</el-button>
        </div>

        <el-form :inline="true" class="search-form">
            <el-form-item label="名称">
                <el-input v-model="searchForm.productName" placeholder="名称" clearable />
            </el-form-item>
            <el-form-item label="分类">
                <el-select v-model="searchForm.categoryId" placeholder="分类" clearable>
                    <el-option v-for="item in categoryStore.categories" :key="item.id" :label="item.name"
                        :value="String(item.id)" />
                </el-select>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="searchForm.productStatus" placeholder="状态" clearable>
                    <el-option label="在售" value="1" />
                    <el-option label="下架" value="0" />
                </el-select>
            </el-form-item>
            <el-form-item label="可兑换">
                <el-select v-model="searchForm.exchangeable" placeholder="可兑换" clearable>
                    <el-option label="是" value="1" />
                    <el-option label="否" value="0" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
                <el-button @click="handleReset">重置</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="tableData" v-loading="loading" stripe class="data-table">
            <el-table-column prop="productName" label="名称" min-width="140" />
            <el-table-column label="分类" width="140">
                <template #default="scope">
                    {{ scope.row.categoryName ?? scope.row.categoryId }}
                </template>
            </el-table-column>
            <el-table-column prop="productPrice" label="价格" width="100" />
            <el-table-column prop="stock" label="库存" width="90" />
            <el-table-column prop="productStatus" label="状态" width="90" />
            <el-table-column prop="exchangeable" label="可兑换" width="100" />
            <el-table-column prop="exchangePrice" label="兑换价" width="130" />
            <el-table-column prop="previewImg" label="预览图" min-width="180" />
            <el-table-column label="操作" fixed="right" width="320">
                <template #default="scope">
                    <el-button type="primary" link @click="openEdit(scope.row)">编辑</el-button>
                    <el-button type="primary" link @click="openDetail(scope.row)">详情</el-button>
                    <el-button type="warning" link @click="openStockDialog(scope.row)">入库</el-button>
                    <el-button type="warning" link @click="openStatusDialog(scope.row)">上下架</el-button>
                    <el-button type="warning" link @click="openExchangeDialog(scope.row)">兑换状态</el-button>
                    <el-button type="warning" link @click="openExchangePriceDialog(scope.row)">兑换价</el-button>
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

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="560px">
        <el-form ref="formRef" :model="formData" :rules="formRules" label-width="140px">
            <el-form-item label="名称" prop="productName">
                <el-input v-model="formData.productName" />
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="formData.productDesc" type="textarea" rows="2" />
            </el-form-item>
            <el-form-item label="分类" prop="categoryId">
                <el-select v-model="formData.categoryId" placeholder="请选择">
                    <el-option v-for="item in categoryStore.categories" :key="item.id" :label="item.name"
                        :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="价格" prop="productPrice">
                <el-input-number v-model="formData.productPrice" :min="0" :step="0.1" />
            </el-form-item>
            <el-form-item label="库存">
                <el-input-number v-model="formData.stock" :min="0" />
            </el-form-item>
            <el-form-item label="预览图URL">
                <el-input v-model="formData.previewImg" />
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="formData.productStatus">
                    <el-option label="在售" :value="1" />
                    <el-option label="下架" :value="0" />
                </el-select>
            </el-form-item>
            <el-form-item label="可兑换">
                <el-select v-model="formData.exchangeable">
                    <el-option label="是" :value="1" />
                    <el-option label="否" :value="0" />
                </el-select>
            </el-form-item>
            <el-form-item label="兑换价">
                <el-input-number v-model="formData.exchangePrice" :min="0" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitForm">保存</el-button>
        </template>
    </el-dialog>

    <el-dialog v-model="stockDialogVisible" title="商品入库" width="420px">
        <el-form label-width="120px">
            <el-form-item label="入库数量">
                <el-input-number v-model="stockForm.addNum" :min="1" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="stockDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitStock">确认</el-button>
        </template>
    </el-dialog>

    <el-dialog v-model="statusDialogVisible" title="修改上下架" width="420px">
        <el-form label-width="120px">
            <el-form-item label="状态">
                <el-select v-model="statusForm.productStatus">
                    <el-option label="在售" :value="1" />
                    <el-option label="下架" :value="0" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="statusDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitStatus">确认</el-button>
        </template>
    </el-dialog>

    <el-dialog v-model="exchangeDialogVisible" title="兑换设置" width="440px">
        <el-form label-width="140px">
            <el-form-item label="可兑换">
                <el-select v-model="exchangeForm.exchangeable">
                    <el-option label="是" :value="1" />
                    <el-option label="否" :value="0" />
                </el-select>
            </el-form-item>
            <el-form-item label="兑换价">
                <el-input-number v-model="exchangeForm.exchangePrice" :min="0" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="exchangeDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitExchange">确认</el-button>
        </template>
    </el-dialog>

    <el-dialog v-model="exchangePriceDialogVisible" title="修改兑换价" width="420px">
        <el-form label-width="140px">
            <el-form-item label="兑换价">
                <el-input-number v-model="exchangePriceForm.exchangePrice" :min="0" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="exchangePriceDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitExchangePrice">确认</el-button>
        </template>
    </el-dialog>

    <el-drawer v-model="detailVisible" title="商品详情" size="420px">
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
