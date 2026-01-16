<template>
    <div class="not-found">
        <h2>页面未找到</h2>
        <el-button type="primary" @click="$router.push('/users')">返回首页</el-button>
    </div>
</template>

<style scoped>
.not-found {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
}
</style>
