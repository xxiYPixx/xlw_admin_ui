# 管理端前端API

HOST: http://localhost:11325/xlw
通用返回：`{ code, msg, data }`；分页包含 `total`、`rows`、`code`、`msg`
请求体格式：多数支持 `application/x-www-form-urlencoded` 或 `application/json`，未注明默认 query/path。
字段命名：以 `doc/xlwV2.sql` 的字段语义为准，本文档采用常用驼峰（例：`order_status` -> `orderStatus`）。

## 认证
POST `/xlw/login/merchant`（表单：username, password）管理端登录
POST `/xlw/logout` 登出，无参

## 用户管理
POST `/xlw/user` 新增：username, phone, password, unit, floorNum, roomNum
PUT `/xlw/user` 修改：id, username, unit, floorNum, roomNum
PUT `/xlw/user/reset-pwd` 重置密码：id, newPassword
GET `/xlw/user/page` 分页查询：phone?, unit?, pageNum?, pageSize?
GET `/xlw/user/info/{id}` 查看详情
DELETE `/xlw/user/{id}` 删除
用户列表/详情常见字段（来自 `xlw_user`）：id, username, phone, unit, floorNum, roomNum, xunlinbiNum, totalOrders, registerTime, updateTime

## 商品管理
POST `/xlw/product` 新增：productName, productDesc?, categoryId, productPrice, stock, previewImg?, productStatus(0下架/1在售), exchangeable(0/1), exchangePrice?
PUT `/xlw/product` 修改：id + 任意字段(productName/productDesc/categoryId/productPrice/previewImg)
PUT `/xlw/product/stock/{id}` 入库：addNum
PUT `/xlw/product/status/{id}` 上下架：productStatus(0/1)
PUT `/xlw/product/exchange-status` 可兑换状态：id, exchangeable(0/1), exchangePrice?
PUT `/xlw/product/exchange-price/{id}` 修改兑换价：exchangePrice
GET `/xlw/product/list` 分页查询：productName?, categoryId?, productStatus?, exchangeable?, pageNum?, pageSize?
GET `/xlw/product/{id}` 详情
DELETE `/xlw/product/{id}` 删除
商品列表/详情常见字段（来自 `xlw_product` + `xlw_exchange_product`）：id, productName, productDesc, categoryId, productPrice, stock, previewImg, productStatus, exchangeable, exchangePrice, createTime, updateTime, remark

## 订单管理
PUT `/xlw/order/status/{id}` 改订单状态：orderStatus(0初始/1待付款/2待接单/3已接单/4派送中/5已完成/6已取消/7退款)
PUT `/xlw/order/pay-status/{id}` 改支付状态：payStatus(0未支付/1已支付/2退款)
PUT `/xlw/order/confirm-refund/{id}` 确认退款
PUT `/xlw/order/apply-refund/{id}` 标记退款
PUT `/xlw/order/refuse-refund/{id}` 拒绝退款
GET `/xlw/order/list` 分页查询：userId?, orderNo?, orderStatus?, payStatus?, orderType?(0仅商品/1仅快递/2都有), hasExchange?(0/1), pageNum?, pageSize?
GET `/xlw/order/{id}` 详情
DELETE `/xlw/order/{id}` 删除
订单列表/详情常见字段（来自 `xlw_order`）：id, orderNo, createTime, sendTime, completeTime, userId, orderStatus, payStatus, totalAmount, deliveryFee, costXunlinbi, payMethod, orderType, hasExchange, updateTime

## 配送费用与折扣
PUT `/xlw/fee` 修改配送费项：id?, feeType?, feeName?, feeValue?, remark?
GET `/xlw/fee/page` 配送费列表：pageNum?, pageSize?
GET `/xlw/fee/discount-rules` 折扣规则列表：scopeType?(0个人/1单元), pageNum?, pageSize?
POST `/xlw/fee/discount-rules` 新增规则：scopeType, minOrders, discountRate, discountDesc?
PUT `/xlw/fee/discount-rules` 修改规则：id + scopeType, minOrders, discountRate, discountDesc?
GET `/xlw/fee/discount-rules/{id}` 规则详情
DELETE `/xlw/fee/discount-rules/{id}` 删除规则
配送费字段（来自 `xlw_fee`）：id, feeType, feeName, feeValue, remark
折扣规则字段（来自 `xlw_delivery_discount_rule`）：id, scopeType, minOrders, discountRate, discountDesc

## 商品分类
POST `/xlw/category` 新增分类：categoryName
PUT `/xlw/category/{categoryId}` 修改分类：categoryName
DELETE `/xlw/category/{categoryId}` 删除分类
GET `/xlw/category/page` 分页查询：categoryName?, pageNum?, pageSize?
GET `/xlw/category/list` 下拉列表（通用）
分类字段（来自 `xlw_product_category`）：id, categoryName

# 枚举值
| 枚举字段 | 枚举值及说明 | 备注 |
| --- | --- | --- |
| scope_type | 0个人/1单元 | 折扣规则适用范围 |
| fee_type | 1快递/2商品/3快递+商品 | 配送费类型 |
| order_status | 0初始/1待付款/2待接单/3已接单/4派送中/5已完成/6已取消/7退款 | 订单状态(0为默认初始值) |
| pay_status | 0未支付/1已支付/2退款 | 支付状态 |
| pay_method | 0支付宝/1微信 | 支付方式 |
| order_type | 0商品/1快递/2快递+商品 | 订单类型 |
| has_exchange | 0否/1是 | 是否含兑换商品 |
| product_status | 0下架/1在售 | 商品状态 |
| exchangeable | 0否/1是 | 商品是否支持迅邻币兑换 |
