<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { menuItems } from '../config/menu'
import { iconMap } from '../utils/icons'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const activePath = computed(() => route.path)

const handleLogout = async () => {
    try {
        await ElMessageBox.confirm('确认退出登录？', '提示', {
            type: 'warning'
        })
    } catch {
        return
    }
    await authStore.signOut()
    router.push('/login')
}
</script>

<template>
    <el-container class="app-shell">
        <el-aside width="220px" class="app-aside">
            <div class="app-brand">迅邻屋管理端</div>
            <el-menu :default-active="activePath" router class="app-menu">
                <el-menu-item v-for="item in menuItems" :key="item.path" :index="item.path">
                    <el-icon v-if="item.icon">
                        <component :is="iconMap[item.icon as keyof typeof iconMap]" />
                    </el-icon>
                    <span>{{ item.label }}</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header class="app-header">
                <div class="app-header-left">
                    <span class="app-title">管理控制台</span>
                </div>
                <div class="app-header-right">
                    <span class="app-user">{{ authStore.user?.username || '管理员' }}</span>
                    <el-button type="primary" text @click="handleLogout">退出登录</el-button>
                </div>
            </el-header>
            <el-main class="app-main">
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<style scoped>
.app-shell {
    min-height: 100vh;
    background: #f5f7fa;
}

.app-aside {
    background: #111827;
    color: #fff;
}

.app-brand {
    padding: 20px;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0.5px;
}

.app-menu {
    border-right: none;
    background: transparent;
}

.app-menu :deep(.el-menu-item) {
    color: #e5e7eb;
}

.app-menu :deep(.el-menu-item.is-active) {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
}

.app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #e5e7eb;
    padding: 0 24px;
}

.app-title {
    font-size: 16px;
    font-weight: 600;
    color: #111827;
}

.app-header-right {
    display: flex;
    align-items: center;
    gap: 12px;
}

.app-user {
    font-size: 14px;
    color: #4b5563;
}

.app-main {
    padding: 24px;
}
</style>
