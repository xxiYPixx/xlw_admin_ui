# Postman 测试说明

本文档基于 `doc/xlw-apiV1.md` 生成，用于管理端接口的 Postman 测试。

## 1. 环境变量
建议在 Postman 中创建环境：
`BASE_URL` = `http://localhost:11325/xlw`
`TOKEN` = `实际登录后返回的 token（如有）`

通用请求头（如后端支持鉴权）：
`Authorization: Bearer {{TOKEN}}`
`Content-Type: application/json`（JSON 请求体时）
`Content-Type: application/x-www-form-urlencoded`（表单请求时）

## 2. 认证
### 2.1 管理端登录
方法：POST
地址：`{{BASE_URL}}/login/merchant`
Body：`x-www-form-urlencoded`
  `username`: `admin`
  `password`: `123456`
备注：若返回 `data.token`，请保存到环境变量 `TOKEN`。

### 2.2 登出
方法：POST
地址：`{{BASE_URL}}/logout`

## 3. 用户管理
### 3.1 新增用户
方法：POST
地址：`{{BASE_URL}}/user`
Body：JSON
```json
{
  "username": "张三",
  "phone": "13800138000",
  "password": "123456",
  "unit": 3,
  "floorNum": 5,
  "roomNum": "01"
}
```

### 3.2 修改用户
方法：PUT
地址：`{{BASE_URL}}/user`
Body：JSON
```json
{
  "id": 1,
  "username": "张三",
  "unit": 3,
  "floorNum": 5,
  "roomNum": "01"
}
```

### 3.3 重置用户密码
方法：PUT
地址：`{{BASE_URL}}/user/reset-pwd`
Body：JSON
```json
{
  "id": 1,
  "newPassword": "654321"
}
```

### 3.4 用户列表
方法：GET
地址：`{{BASE_URL}}/user/page`
Query：
  `phone`（可选，模糊）
  `unit`（可选）
  `pageNum`、`pageSize`

### 3.5 用户详情
方法：GET
地址：`{{BASE_URL}}/user/info/{id}`

### 3.6 删除用户
方法：DELETE
地址：`{{BASE_URL}}/user/{id}`

## 4. 商品管理
### 4.1 新增商品
方法：POST
地址：`{{BASE_URL}}/product`
Body：JSON
```json
{
  "productName": "可口可乐",
  "productDesc": "500ml 瓶装",
  "categoryId": 1,
  "productPrice": 3.5,
  "stock": 100,
  "previewImg": "http://xxx.com/img/cola.jpg",
  "productStatus": 1,
  "exchangeable": 0,
  "exchangePrice": 350
}
```

### 4.2 修改商品
方法：PUT
地址：`{{BASE_URL}}/product`
Body：JSON
```json
{
  "id": 1,
  "productName": "可口可乐（无糖）",
  "productDesc": "500ml 无糖",
  "categoryId": 1,
  "productPrice": 3.8,
  "previewImg": "http://xxx.com/img/cola_sugar.jpg"
}
```

### 4.3 商品入库
方法：PUT
地址：`{{BASE_URL}}/product/stock/{id}`
Query：`addNum=10`

### 4.4 商品上下架
方法：PUT
地址：`{{BASE_URL}}/product/status/{id}`
Query：`productStatus=1`（1 上架 / 0 下架）

### 4.5 切换可兑换状态
方法：PUT
地址：`{{BASE_URL}}/product/exchange-status`
Body：JSON
```json
{
  "id": 1,
  "exchangeable": 1,
  "exchangePrice": 350
}
```

### 4.6 修改兑换价
方法：PUT
地址：`{{BASE_URL}}/product/exchange-price/{id}`
Query：`exchangePrice=350`

### 4.7 商品详情
方法：GET
地址：`{{BASE_URL}}/product/{id}`

### 4.8 删除商品
方法：DELETE
地址：`{{BASE_URL}}/product/{id}`

### 4.9 商品列表
方法：GET
地址：`{{BASE_URL}}/product/list`
Query：
  `productName`、`categoryId`、`productStatus`、`exchangeable`
  `pageNum`、`pageSize`

## 5. 订单管理
### 5.1 修改订单状态
方法：PUT
地址：`{{BASE_URL}}/order/status/{id}`
Query：`orderStatus=4`

### 5.2 修改支付状态
方法：PUT
地址：`{{BASE_URL}}/order/pay-status/{id}`
Query：`payStatus=1`

### 5.3 标记待退款
方法：PUT
地址：`{{BASE_URL}}/order/apply-refund/{id}`

### 5.4 拒绝退款
方法：PUT
地址：`{{BASE_URL}}/order/refuse-refund/{id}`

### 5.5 确认已退款
方法：PUT
地址：`{{BASE_URL}}/order/confirm-refund/{id}`

### 5.6 订单详情
方法：GET
地址：`{{BASE_URL}}/order/{id}`

### 5.7 删除订单
方法：DELETE
地址：`{{BASE_URL}}/order/{id}`

### 5.8 订单列表
方法：GET
地址：`{{BASE_URL}}/order/list`
Query：
  `userId`、`orderNo`、`orderStatus`、`payStatus`
  `orderType`、`hasExchange`
  `pageNum`、`pageSize`

## 6. 配送费用与折扣
### 6.1 修改配送费
方法：PUT
地址：`{{BASE_URL}}/fee`
Body：JSON
```json
{
  "id": 1,
  "feeName": "基础配送费",
  "feeValue": 2.5,
  "remark": "默认"
}
```

### 6.2 配送费列表
方法：GET
地址：`{{BASE_URL}}/fee/page`
Query：`pageNum`、`pageSize`

### 6.3 折扣规则列表
方法：GET
地址：`{{BASE_URL}}/fee/discount-rules`
Query：`scopeType`、`pageNum`、`pageSize`

### 6.4 新增折扣规则
方法：POST
地址：`{{BASE_URL}}/fee/discount-rules`
Body：JSON
```json
{
  "scopeType": 0,
  "minOrders": 10,
  "discountRate": 0.8,
  "description": "周累计优惠"
}
```

### 6.5 修改折扣规则
方法：PUT
地址：`{{BASE_URL}}/fee/discount-rules`
Body：JSON
```json
{
  "id": 1,
  "scopeType": 1,
  "minOrders": 20,
  "discountRate": 0.7,
  "description": "单元优惠"
}
```

### 6.6 折扣规则详情
方法：GET
地址：`{{BASE_URL}}/fee/discount-rules/{id}`

### 6.7 删除折扣规则
方法：DELETE
地址：`{{BASE_URL}}/fee/discount-rules/{id}`

## 7. 商品分类
### 7.1 新增分类
方法：POST
地址：`{{BASE_URL}}/category`
Query：`categoryName=饮料`

### 7.2 修改分类
方法：PUT
地址：`{{BASE_URL}}/category/{categoryId}`
Query：`categoryName=零食`

### 7.3 删除分类
方法：DELETE
地址：`{{BASE_URL}}/category/{categoryId}`

### 7.4 分类列表（分页）
方法：GET
地址：`{{BASE_URL}}/category/page`
Query：`categoryName`、`pageNum`、`pageSize`

### 7.5 分类下拉
方法：GET
地址：`{{BASE_URL}}/category/list`

## 8. 注意事项
文档未明确的鉴权机制以实际后端为准；如需要鉴权，请在请求头中带 `Authorization: Bearer {{TOKEN}}`。
列表接口的返回字段以实际后端为准，若字段不一致需更新表格列显示。
