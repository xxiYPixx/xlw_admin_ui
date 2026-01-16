# 迅邻屋-API文档


**简介**:迅邻屋-API文档


**HOST**:http://localhost:11325/xlw


**联系人**:xgl


**Version**:0.0.1-SNAPSHOT


**接口路径**:/xlw/v3/api-docs/测试


[TOC]






# 测试接口


## 测试接口


**接口地址**:`/xlw/test/hello`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


# 用户管理


## 管理端-新增用户


**接口地址**:`/xlw/user`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "username": "张三",
  "phone": "13800138000",
  "password": "123456",
  "unit": 3,
  "floorNum": 5,
  "roomNum": "01"
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userAddDTO|新增用户DTO|body|true|UserAddDTO|UserAddDTO|
|&emsp;&emsp;username|用户名||true|string||
|&emsp;&emsp;phone|手机号||true|string||
|&emsp;&emsp;password|密码||true|string||
|&emsp;&emsp;unit|单元||true|integer(int32)||
|&emsp;&emsp;floorNum|楼层||true|integer(int32)||
|&emsp;&emsp;roomNum|房号||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 管理端-修改用户信息


**接口地址**:`/xlw/user`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": 1,
  "username": "张三",
  "unit": 3,
  "floorNum": 5,
  "roomNum": "01"
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userUpdateDTO|修改用户DTO|body|true|UserUpdateDTO|UserUpdateDTO|
|&emsp;&emsp;id|用户ID||true|integer(int32)||
|&emsp;&emsp;username|用户名||true|string||
|&emsp;&emsp;unit|单元||true|integer(int32)||
|&emsp;&emsp;floorNum|楼层||true|integer(int32)||
|&emsp;&emsp;roomNum|房号||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 管理端-重置用户密码


**接口地址**:`/xlw/user/reset-pwd`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": 1,
  "newPassword": "654321"
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userResetPwdDTO|重置密码DTO|body|true|UserResetPwdDTO|UserResetPwdDTO|
|&emsp;&emsp;id|用户ID||true|integer(int32)||
|&emsp;&emsp;newPassword|新密码||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 移动端-查询个人信息


**接口地址**:`/xlw/user/info`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 移动端-修改个人信息


**接口地址**:`/xlw/user/info`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "username": "张三",
  "floorNum": 5,
  "roomNum": "01"
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userInfoUpdateDTO|移动端-修改个人信息DTO|body|true|UserInfoUpdateDTO|UserInfoUpdateDTO|
|&emsp;&emsp;username|用户名||true|string||
|&emsp;&emsp;floorNum|楼层||true|integer(int32)||
|&emsp;&emsp;roomNum|房号||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 移动端-查询迅邻币余额


**接口地址**:`/xlw/user/xunlinbi`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 管理端-查询用户列表


**接口地址**:`/xlw/user/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|phone|手机号（模糊查询）|query|false|string||
|unit|单元|query|false|string||
|pageNum|页码|query|false|integer(int32)||
|pageSize|页大小|query|false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|表格数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|total|总记录数|integer(int64)|integer(int64)|
|rows|列表数据|array|UserListVO|
|&emsp;&emsp;id|用户ID|integer(int32)||
|&emsp;&emsp;username|用户名|string||
|&emsp;&emsp;phone|手机号|string||
|&emsp;&emsp;unit|单元|integer(int32)||
|&emsp;&emsp;floorNum|楼层|integer(int32)||
|&emsp;&emsp;roomNum|房号|string||
|&emsp;&emsp;xunlinbiNum|迅邻币数量|integer(int32)||
|&emsp;&emsp;totalOrders|累计下单数量|integer(int32)||
|code|消息状态码|integer(int32)|integer(int32)|
|msg|消息内容|string||


**响应示例**:
```javascript
{
	"total": 0,
	"rows": [
		{
			"id": 0,
			"username": "",
			"phone": "",
			"unit": 0,
			"floorNum": 0,
			"roomNum": "",
			"xunlinbiNum": 0,
			"totalOrders": 0
		}
	],
	"code": 0,
	"msg": ""
}
```


## 管理端-查询用户详情


**接口地址**:`/xlw/user/info/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 管理端-删除用户


**接口地址**:`/xlw/user/{id}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


# 商品管理


## 管理端-新增商品


**接口地址**:`/xlw/product`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "productName": "可口可乐",
  "productDesc": "500ml瓶装可乐",
  "categoryId": 1,
  "productPrice": 3.5,
  "stock": 100,
  "previewImg": "http://xxx.com/img/cola.jpg",
  "productStatus": 1,
  "exchangeable": 0,
  "exchangePrice": 350
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|productAddDTO|新增商品DTO|body|true|ProductAddDTO|ProductAddDTO|
|&emsp;&emsp;productName|商品名称||true|string||
|&emsp;&emsp;productDesc|商品描述||false|string||
|&emsp;&emsp;categoryId|分类ID||true|integer(int32)||
|&emsp;&emsp;productPrice|商品价格||true|number||
|&emsp;&emsp;stock|库存数量||true|integer(int32)||
|&emsp;&emsp;previewImg|商品预览图URL||false|string||
|&emsp;&emsp;productStatus|商品状态（0下架，1在售）||true|integer(int32)||
|&emsp;&emsp;exchangeable|是否可兑换（0否，1是）||true|integer(int32)||
|&emsp;&emsp;exchangePrice|兑换价格（迅邻币），可兑换时必填||false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 管理端-修改商品信息


**接口地址**:`/xlw/product`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": 1,
  "productName": "可口可乐（无糖）",
  "productDesc": "500ml瓶装无糖可乐",
  "categoryId": 1,
  "productPrice": 3.8,
  "previewImg": "http://xxx.com/img/cola_sugar.jpg"
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|productUpdateDTO|修改商品DTO|body|true|ProductUpdateDTO|ProductUpdateDTO|
|&emsp;&emsp;id|商品ID||true|integer(int32)||
|&emsp;&emsp;productName|商品名称||false|string||
|&emsp;&emsp;productDesc|商品描述||false|string||
|&emsp;&emsp;categoryId|分类ID||false|integer(int32)||
|&emsp;&emsp;productPrice|商品价格||false|number||
|&emsp;&emsp;previewImg|商品预览图URL||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 管理端-商品入库


**接口地址**:`/xlw/product/stock/{id}`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int32)||
|addNum||query|true|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 管理端-商品上下架


**接口地址**:`/xlw/product/status/{id}`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int32)||
|productStatus||query|true|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 管理端-切换可兑换状态


**接口地址**:`/xlw/product/exchange-status`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": 1,
  "exchangeable": 1,
  "exchangePrice": 350
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|productExchangeStatusDTO|切换可兑换状态DTO|body|true|ProductExchangeStatusDTO|ProductExchangeStatusDTO|
|&emsp;&emsp;id|商品ID||true|integer(int32)||
|&emsp;&emsp;exchangeable|是否可兑换（0否，1是）||true|integer(int32)||
|&emsp;&emsp;exchangePrice|兑换价格（迅邻币），切换为可兑换时必填||false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 管理端-修改兑换价格


**接口地址**:`/xlw/product/exchange-price/{id}`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int32)||
|exchangePrice||query|true|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 管理端-查询商品详情


**接口地址**:`/xlw/product/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 管理端-删除商品


**接口地址**:`/xlw/product/{id}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 管理端-查询商品列表


**接口地址**:`/xlw/product/list`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|productName|商品名称（模糊查询）|query|false|string||
|categoryId|分类ID|query|false|string||
|productStatus|商品状态（0下架，1在售）|query|false|string||
|exchangeable|是否可兑换（0否，1是）|query|false|string||
|pageNum|页码|query|false|integer(int32)||
|pageSize|页大小|query|false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|表格数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|total|总记录数|integer(int64)|integer(int64)|
|rows|列表数据|array|UserListVO|
|&emsp;&emsp;id|用户ID|integer(int32)||
|&emsp;&emsp;username|用户名|string||
|&emsp;&emsp;phone|手机号|string||
|&emsp;&emsp;unit|单元|integer(int32)||
|&emsp;&emsp;floorNum|楼层|integer(int32)||
|&emsp;&emsp;roomNum|房号|string||
|&emsp;&emsp;xunlinbiNum|迅邻币数量|integer(int32)||
|&emsp;&emsp;totalOrders|累计下单数量|integer(int32)||
|code|消息状态码|integer(int32)|integer(int32)|
|msg|消息内容|string||


**响应示例**:
```javascript
{
	"total": 0,
	"rows": [
		{
			"id": 0,
			"username": "",
			"phone": "",
			"unit": 0,
			"floorNum": 0,
			"roomNum": "",
			"xunlinbiNum": 0,
			"totalOrders": 0
		}
	],
	"code": 0,
	"msg": ""
}
```


## 移动端-查询商品列表


**接口地址**:`/xlw/product/app`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|productName|商品名称（模糊查询）|query|false|string||
|categoryId|分类ID|query|false|string||
|exchangeable|是否可兑换（0否，1是）|query|false|string||
|pageNum|页码|query|false|integer(int32)||
|pageSize|页大小|query|false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|表格数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|total|总记录数|integer(int64)|integer(int64)|
|rows|列表数据|array|UserListVO|
|&emsp;&emsp;id|用户ID|integer(int32)||
|&emsp;&emsp;username|用户名|string||
|&emsp;&emsp;phone|手机号|string||
|&emsp;&emsp;unit|单元|integer(int32)||
|&emsp;&emsp;floorNum|楼层|integer(int32)||
|&emsp;&emsp;roomNum|房号|string||
|&emsp;&emsp;xunlinbiNum|迅邻币数量|integer(int32)||
|&emsp;&emsp;totalOrders|累计下单数量|integer(int32)||
|code|消息状态码|integer(int32)|integer(int32)|
|msg|消息内容|string||


**响应示例**:
```javascript
{
	"total": 0,
	"rows": [
		{
			"id": 0,
			"username": "",
			"phone": "",
			"unit": 0,
			"floorNum": 0,
			"roomNum": "",
			"xunlinbiNum": 0,
			"totalOrders": 0
		}
	],
	"code": 0,
	"msg": ""
}
```


## 移动端-查询商品详情


**接口地址**:`/xlw/product/app/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 移动端-查询可兑换商品列表


**接口地址**:`/xlw/product/app/exchange`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|productName|商品名称（模糊查询）|query|false|string||
|categoryId|分类ID|query|false|string||
|exchangeable|是否可兑换（0否，1是）|query|false|string||
|pageNum|页码|query|false|integer(int32)||
|pageSize|页大小|query|false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|表格数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|total|总记录数|integer(int64)|integer(int64)|
|rows|列表数据|array|UserListVO|
|&emsp;&emsp;id|用户ID|integer(int32)||
|&emsp;&emsp;username|用户名|string||
|&emsp;&emsp;phone|手机号|string||
|&emsp;&emsp;unit|单元|integer(int32)||
|&emsp;&emsp;floorNum|楼层|integer(int32)||
|&emsp;&emsp;roomNum|房号|string||
|&emsp;&emsp;xunlinbiNum|迅邻币数量|integer(int32)||
|&emsp;&emsp;totalOrders|累计下单数量|integer(int32)||
|code|消息状态码|integer(int32)|integer(int32)|
|msg|消息内容|string||


**响应示例**:
```javascript
{
	"total": 0,
	"rows": [
		{
			"id": 0,
			"username": "",
			"phone": "",
			"unit": 0,
			"floorNum": 0,
			"roomNum": "",
			"xunlinbiNum": 0,
			"totalOrders": 0
		}
	],
	"code": 0,
	"msg": ""
}
```


# 订单管理


## 管理端-修改订单状态


**接口地址**:`/xlw/order/status/{id}`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>（0=已下单,1=待付款,2=待接单,3=已接单,4=派送中,5=已完成,6=已取消,7=待退款,8=已退款）</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int32)||
|orderStatus||query|true|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 管理端-拒绝退款


**接口地址**:`/xlw/order/refuse-refund/{id}`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 管理端-修改支付状态


**接口地址**:`/xlw/order/pay-status/{id}`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int32)||
|payStatus||query|true|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 管理端-确认订单退款（改为已退款）


**接口地址**:`/xlw/order/confirm-refund/{id}`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 管理端-标记订单为待退款


**接口地址**:`/xlw/order/apply-refund/{id}`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 移动端-申请退款（改为待退款状态）


**接口地址**:`/xlw/order/app/refund/{id}`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 移动端-确认完成订单（仅派送中状态）


**接口地址**:`/xlw/order/app/complete/{id}`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 移动端-取消订单（仅已下单-待付款状态）


**接口地址**:`/xlw/order/app/cancel/{id}`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 移动端-创建订单


**接口地址**:`/xlw/order/app`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "orderType": 0,
  "payMethod": 0,
  "expressDTOS": [
    {
      "expressNo": "",
      "pickupCode": ""
    }
  ],
  "productDTOS": [
    {
      "productId": 0,
      "buyNum": 0,
      "unitPrice": 0
    }
  ],
  "exchangeDTOS": [
    {
      "exchangeId": 0,
      "exchangeNum": 0,
      "unitPrice": 0
    }
  ]
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|appOrderCreateDTO|移动端-创建订单DTO|body|true|AppOrderCreateDTO|AppOrderCreateDTO|
|&emsp;&emsp;orderType|订单类型（0=仅商品,1=仅快递,2=两者都有）||true|integer(int32)||
|&emsp;&emsp;payMethod|支付方式（0=支付宝,1=微信）||true|integer(int32)||
|&emsp;&emsp;expressDTOS|快递信息（仅快递/混合订单必填）||false|array|ExpressDTO|
|&emsp;&emsp;&emsp;&emsp;expressNo|快递单号||true|string||
|&emsp;&emsp;&emsp;&emsp;pickupCode|取件码||true|string||
|&emsp;&emsp;productDTOS|商品明细（仅商品/混合订单必填）||false|array|ProductDTO|
|&emsp;&emsp;&emsp;&emsp;productId|商品ID||true|integer(int32)||
|&emsp;&emsp;&emsp;&emsp;buyNum|购买数量||true|integer(int32)||
|&emsp;&emsp;&emsp;&emsp;unitPrice|商品单价||true|number||
|&emsp;&emsp;exchangeDTOS|兑换商品明细（有兑换商品时必填）||false|array|ExchangeDTO|
|&emsp;&emsp;&emsp;&emsp;exchangeId|可兑换商品ID||true|integer(int32)||
|&emsp;&emsp;&emsp;&emsp;exchangeNum|兑换数量||true|integer(int32)||
|&emsp;&emsp;&emsp;&emsp;unitPrice|兑换单价（迅邻币）||true|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 管理端-查询订单详情


**接口地址**:`/xlw/order/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 管理端-删除订单


**接口地址**:`/xlw/order/{id}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 管理端-查询订单列表


**接口地址**:`/xlw/order/list`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userId|用户ID|query|false|string||
|orderNo|订单编号（模糊查询）|query|false|string||
|orderStatus|订单状态（0=已下单,1=待付款,2=待接单,3=已接单,4=派送中,5=已完成,6=已取消,7=待退款，8=已退款）|query|false|string||
|payStatus|支付状态（0=未支付,1=已支付,2=退款）|query|false|string||
|orderType|订单类型（0=仅商品,1=仅快递,2=两者都有）|query|false|string||
|hasExchange|是否包含兑换商品（0=否,1=是）|query|false|string||
|pageNum|页码|query|false|integer(int32)||
|pageSize|页大小|query|false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|表格数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|total|总记录数|integer(int64)|integer(int64)|
|rows|列表数据|array|UserListVO|
|&emsp;&emsp;id|用户ID|integer(int32)||
|&emsp;&emsp;username|用户名|string||
|&emsp;&emsp;phone|手机号|string||
|&emsp;&emsp;unit|单元|integer(int32)||
|&emsp;&emsp;floorNum|楼层|integer(int32)||
|&emsp;&emsp;roomNum|房号|string||
|&emsp;&emsp;xunlinbiNum|迅邻币数量|integer(int32)||
|&emsp;&emsp;totalOrders|累计下单数量|integer(int32)||
|code|消息状态码|integer(int32)|integer(int32)|
|msg|消息内容|string||


**响应示例**:
```javascript
{
	"total": 0,
	"rows": [
		{
			"id": 0,
			"username": "",
			"phone": "",
			"unit": 0,
			"floorNum": 0,
			"roomNum": "",
			"xunlinbiNum": 0,
			"totalOrders": 0
		}
	],
	"code": 0,
	"msg": ""
}
```


## 移动端-查询我的订单详情


**接口地址**:`/xlw/order/app/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 移动端-查询我的订单列表


**接口地址**:`/xlw/order/app/list`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|orderStatus|订单状态（0=已下单,1=待付款,2=待接单,3=已接单,4=派送中,5=已完成,6=已取消,7=退款）|query|false|integer(int32)||
|payStatus|支付状态（0=未支付,1=已支付,2=退款）|query|false|integer(int32)||
|orderType|订单类型（0=仅商品,1=仅快递,2=两者都有）|query|false|integer(int32)||
|pageNum|页码|query|false|integer(int32)||
|pageSize|页大小|query|false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


# 配送费用管理


## 移动端-配送费用查询


**接口地址**:`/xlw/fee`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|feeType||query|true|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 管理端-修改配送费用


**接口地址**:`/xlw/fee`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>管理端-修改配送费用</p>



**请求示例**:


```javascript
{
  "id": 0,
  "feeName": "",
  "feeValue": 0,
  "remark": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|feeUpdateDTO|配送费用修改参数|body|true|FeeUpdateDTO|FeeUpdateDTO|
|&emsp;&emsp;id|费用id||false|integer(int32)||
|&emsp;&emsp;feeName|费用名称||false|string||
|&emsp;&emsp;feeValue|费用数值||false|number||
|&emsp;&emsp;remark|备注||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 管理端-配送费折扣规则列表


**接口地址**:`/xlw/fee/discount-rules`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|scopeType|适用范围（0=个人，1=单元）|query|false|string||
|pageNum|页码|query|false|integer(int32)||
|pageSize|页大小|query|false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 管理端-新增配送费折扣规则


**接口地址**:`/xlw/fee/discount-rules`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "scopeType": 0,
  "minOrders": 0,
  "discountRate": 0,
  "description": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|discountRuleCreateDTO|新增配送费折扣规则DTO|body|true|DiscountRuleCreateDTO|DiscountRuleCreateDTO|
|&emsp;&emsp;scopeType|适用范围（0=个人，1=单元）||true|integer(int32)||
|&emsp;&emsp;minOrders|周累计订单数阈值||true|integer(int32)||
|&emsp;&emsp;discountRate|折扣率（1.00=原价，0.00=免配送费）||true|number||
|&emsp;&emsp;description|规则描述||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 管理端-修改配送费折扣规则


**接口地址**:`/xlw/fee/discount-rules`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "id": 0,
  "scopeType": 0,
  "minOrders": 0,
  "discountRate": 0,
  "description": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|discountRuleUpdateDTO|修改配送费折扣规则DTO|body|true|DiscountRuleUpdateDTO|DiscountRuleUpdateDTO|
|&emsp;&emsp;id|折扣规则ID||true|integer(int32)||
|&emsp;&emsp;scopeType|适用范围（0=个人，1=单元）||true|integer(int32)||
|&emsp;&emsp;minOrders|周累计订单数阈值||true|integer(int32)||
|&emsp;&emsp;discountRate|折扣率（1.00=原价，0.00=免配送费）||true|number||
|&emsp;&emsp;description|规则描述||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 管理端-费用列表查询


**接口地址**:`/xlw/fee/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|pageNum|页码|query|false|integer(int32)||
|pageSize|页大小|query|false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|表格数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|total|总记录数|integer(int64)|integer(int64)|
|rows|列表数据|array|UserListVO|
|&emsp;&emsp;id|用户ID|integer(int32)||
|&emsp;&emsp;username|用户名|string||
|&emsp;&emsp;phone|手机号|string||
|&emsp;&emsp;unit|单元|integer(int32)||
|&emsp;&emsp;floorNum|楼层|integer(int32)||
|&emsp;&emsp;roomNum|房号|string||
|&emsp;&emsp;xunlinbiNum|迅邻币数量|integer(int32)||
|&emsp;&emsp;totalOrders|累计下单数量|integer(int32)||
|code|消息状态码|integer(int32)|integer(int32)|
|msg|消息内容|string||


**响应示例**:
```javascript
{
	"total": 0,
	"rows": [
		{
			"id": 0,
			"username": "",
			"phone": "",
			"unit": 0,
			"floorNum": 0,
			"roomNum": "",
			"xunlinbiNum": 0,
			"totalOrders": 0
		}
	],
	"code": 0,
	"msg": ""
}
```


## 管理端-查询折扣规则详情


**接口地址**:`/xlw/fee/discount-rules/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 管理端-删除配送费折扣规则


**接口地址**:`/xlw/fee/discount-rules/{id}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||path|true|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 移动端-获取匹配的折扣规则


**接口地址**:`/xlw/fee/discount-rules/match`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


# 商品分类管理


## 管理端-修改商品分类


**接口地址**:`/xlw/category/{categoryId}`


**请求方式**:`PUT`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|categoryId||path|true|integer(int32)||
|categoryName||query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 管理端-删除商品分类


**接口地址**:`/xlw/category/{categoryId}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|categoryId||path|true|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 管理端-新增商品分类


**接口地址**:`/xlw/category`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|categoryName||query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 管理端-获取商品分类


**接口地址**:`/xlw/category/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|categoryName|商品分类名称|query|false|string||
|pageNum|页码|query|false|integer(int32)||
|pageSize|页大小|query|false|integer(int32)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|表格数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|total|总记录数|integer(int64)|integer(int64)|
|rows|列表数据|array|UserListVO|
|&emsp;&emsp;id|用户ID|integer(int32)||
|&emsp;&emsp;username|用户名|string||
|&emsp;&emsp;phone|手机号|string||
|&emsp;&emsp;unit|单元|integer(int32)||
|&emsp;&emsp;floorNum|楼层|integer(int32)||
|&emsp;&emsp;roomNum|房号|string||
|&emsp;&emsp;xunlinbiNum|迅邻币数量|integer(int32)||
|&emsp;&emsp;totalOrders|累计下单数量|integer(int32)||
|code|消息状态码|integer(int32)|integer(int32)|
|msg|消息内容|string||


**响应示例**:
```javascript
{
	"total": 0,
	"rows": [
		{
			"id": 0,
			"username": "",
			"phone": "",
			"unit": 0,
			"floorNum": 0,
			"roomNum": "",
			"xunlinbiNum": 0,
			"totalOrders": 0
		}
	],
	"code": 0,
	"msg": ""
}
```


## 双端通用-获取商品分类select


**接口地址**:`/xlw/category/list`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|表格数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|total|总记录数|integer(int64)|integer(int64)|
|rows|列表数据|array|UserListVO|
|&emsp;&emsp;id|用户ID|integer(int32)||
|&emsp;&emsp;username|用户名|string||
|&emsp;&emsp;phone|手机号|string||
|&emsp;&emsp;unit|单元|integer(int32)||
|&emsp;&emsp;floorNum|楼层|integer(int32)||
|&emsp;&emsp;roomNum|房号|string||
|&emsp;&emsp;xunlinbiNum|迅邻币数量|integer(int32)||
|&emsp;&emsp;totalOrders|累计下单数量|integer(int32)||
|code|消息状态码|integer(int32)|integer(int32)|
|msg|消息内容|string||


**响应示例**:
```javascript
{
	"total": 0,
	"rows": [
		{
			"id": 0,
			"username": "",
			"phone": "",
			"unit": 0,
			"floorNum": 0,
			"roomNum": "",
			"xunlinbiNum": 0,
			"totalOrders": 0
		}
	],
	"code": 0,
	"msg": ""
}
```


# 边界模块


## 移动端-注册


**接口地址**:`/xlw/register`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "username": "张三",
  "phone": "13800138000",
  "password": "123456",
  "unit": 3,
  "floorNum": 5,
  "roomNum": "01"
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userRegisterDTO|用户注册参数|body|true|UserRegisterDTO|UserRegisterDTO|
|&emsp;&emsp;username|用户名||true|string||
|&emsp;&emsp;phone|手机号||true|string||
|&emsp;&emsp;password|密码||true|string||
|&emsp;&emsp;unit|单元||true|integer(int32)||
|&emsp;&emsp;floorNum|楼层||true|integer(int32)||
|&emsp;&emsp;roomNum|房号||true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 双端-登出


**接口地址**:`/xlw/logout`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 移动端-登录


**接口地址**:`/xlw/login/user`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|phone||query|true|string||
|password||query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```


## 管理端-登录


**接口地址**:`/xlw/login/merchant`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|username||query|true|string||
|password||query|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|实体数据响应结果|


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|msg||string||
|data||object||


**响应示例**:
```javascript
{
	"code": 0,
	"msg": "",
	"data": {}
}
```