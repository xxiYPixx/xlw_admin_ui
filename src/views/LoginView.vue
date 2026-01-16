<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElForm } from 'element-plus'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const formRef = ref<InstanceType<typeof ElForm> | null>(null)
const loading = ref(false)

const form = reactive({
    username: '',
    password: ''
})

const rules = {
    username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const handleLogin = async () => {
    if (!formRef.value) return
    await formRef.value.validate(async (valid) => {
        if (!valid) return
        loading.value = true
        const success = await authStore.login({
            username: form.username,
            password: form.password
        })
        loading.value = false
        if (success) {
            router.push('/users')
        }
    })
}
</script>

<template>
    <div class="login-page">
        <div class="login-card">
            <div class="login-title">迅邻屋管理端</div>
            <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="form.username" placeholder="请输入账号" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" type="password" show-password placeholder="请输入密码" />
                </el-form-item>
                <el-button type="primary" class="login-button" :loading="loading" @click="handleLogin">
                    登录
                </el-button>
            </el-form>
        </div>
    </div>
</template>

<style scoped>
.login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at top, #c7d2fe, #f1f5f9 60%);
}

.login-card {
    width: 360px;
    padding: 32px;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.15);
}

.login-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #111827;
    text-align: center;
}

.login-button {
    width: 100%;
    margin-top: 8px;
}
</style>
