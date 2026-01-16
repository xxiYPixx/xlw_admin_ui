# 迅邻屋管理端前端

## 说明
本项目是课程设计作业"迅邻屋"的管理端前端项目。

## 技术栈
- Vue 3（组合式 API）
- Vite
- TypeScript
- Element Plus
- Pinia
- Vue Router
- Axios
- Vitest + @vue/test-utils（单测）
- Playwright（E2E）

## 部分技术说明
- 接口基址：`src/api/http.ts` 固定为 `http://localhost:11325/xlw`
- Mock 拦截：通过 `VITE_USE_MOCK` 环境变量开启，拦截由 `src/api/mock.ts` 实现
- 登录态：token 存在 `localStorage`，请求头自动携带 `Authorization: Bearer <token>`
- 路由鉴权：未登录访问受保护页面会重定向到 `/login`

## 使用方法
### 安装依赖
```bash
npm install
```

### 启动开发环境
```bash
npm run dev
```

### 构建
```bash
npm run build
```

### 单测 / E2E
```bash
npm test
npm run test:e2e
```

## Mock 拦截开关
### 开启 Mock
1. 新增或修改 `.env.local`：
   ```
   VITE_USE_MOCK=true
   ```
2. 刷新页面。

### 关闭 Mock
1. 删除 `.env.local` 或设置：
   ```
   VITE_USE_MOCK=false
   ```
2. 刷新页面。

## 常用页面入口
- `/login` 登录
- `/users` 用户管理
- `/products` 商品管理
- `/orders` 订单管理
- `/fees` 配送费用
- `/discount-rules` 折扣规则
- `/categories` 商品分类
