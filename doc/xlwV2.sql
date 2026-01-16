/*
 Navicat Premium Dump SQL

 Source Server         : 我的电脑
 Source Server Type    : MySQL
 Source Server Version : 80035 (8.0.35)
 Source Host           : localhost:3306
 Source Schema         : xlw

 Target Server Type    : MySQL
 Target Server Version : 80035 (8.0.35)
 File Encoding         : 65001

 Date: 10/01/2026 11:28:34
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for xlw_delivery_discount_rule
-- ----------------------------
DROP TABLE IF EXISTS `xlw_delivery_discount_rule`;
CREATE TABLE `xlw_delivery_discount_rule`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '折扣规则ID（PK）',
  `scope_type` tinyint NOT NULL COMMENT '适用范围（0=个人，1=单元）',
  `min_orders` int NOT NULL COMMENT '周累计订单数阈值（满足 >= 该值时生效）',
  `discount_rate` decimal(3, 2) NOT NULL COMMENT '折扣率（1.00=原价，0.80=8折，0.00=免配送费）',
  `discount_desc` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '规则描述',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_scope_min`(`scope_type` ASC, `min_orders` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '配送费折扣规则表（按个人/单元维度）' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xlw_delivery_discount_rule
-- ----------------------------
INSERT INTO `xlw_delivery_discount_rule` VALUES (1, 0, 4, 0.80, '个人周订单>3，配送费8折');
INSERT INTO `xlw_delivery_discount_rule` VALUES (2, 0, 6, 0.60, '个人周订单>5，配送费6折');
INSERT INTO `xlw_delivery_discount_rule` VALUES (3, 0, 11, 0.00, '个人周订单>10，免配送费');
INSERT INTO `xlw_delivery_discount_rule` VALUES (4, 1, 11, 0.80, '单元周订单>10，配送费8折');
INSERT INTO `xlw_delivery_discount_rule` VALUES (5, 1, 26, 0.60, '单元周订单>25，配送费6折');
INSERT INTO `xlw_delivery_discount_rule` VALUES (6, 1, 51, 0.00, '单元周订单>50，免配送费');

-- ----------------------------
-- Table structure for xlw_exchange_product
-- ----------------------------
DROP TABLE IF EXISTS `xlw_exchange_product`;
CREATE TABLE `xlw_exchange_product`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '可兑换商品ID（PK）',
  `product_id` int NOT NULL COMMENT '商品ID（FK）',
  `exchange_price` int NOT NULL COMMENT '迅邻币价格',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_product_id`(`product_id` ASC) USING BTREE COMMENT '一个商品仅能对应一条兑换记录',
  CONSTRAINT `fk_exchange_product` FOREIGN KEY (`product_id`) REFERENCES `xlw_product` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '可兑换商品表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xlw_exchange_product
-- ----------------------------

-- ----------------------------
-- Table structure for xlw_fee
-- ----------------------------
DROP TABLE IF EXISTS `xlw_fee`;
CREATE TABLE `xlw_fee`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '费用ID（PK）',
  `fee_type` tinyint NOT NULL COMMENT '费用类型（1=仅快递，2=仅商品，3=快递+商品）',
  `fee_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '费用名称',
  `fee_value` decimal(10, 2) NOT NULL COMMENT '费用数值',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_fee_type`(`fee_type` ASC) USING BTREE COMMENT '费用类型唯一'
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '配送费用表（固定数据）' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xlw_fee
-- ----------------------------
INSERT INTO `xlw_fee` VALUES (1, 1, '快递配送费（仅送快递）', 1.00, '仅快递订单的基础配送费');
INSERT INTO `xlw_fee` VALUES (2, 2, '商品配送费（仅送商品）', 1.00, '仅商品订单的基础配送费');
INSERT INTO `xlw_fee` VALUES (3, 3, '快递+商品配送费', 0.50, '同时包含快递和商品的订单配送费');

-- ----------------------------
-- Table structure for xlw_merchant
-- ----------------------------
DROP TABLE IF EXISTS `xlw_merchant`;
CREATE TABLE `xlw_merchant`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '商家ID（PK）',
  `merchant_username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '商家登录账号',
  `merchant_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '商家密码（加密存储）',
  `merchant_onwer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '店主',
  `contact_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '联系电话',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_merchant_username`(`merchant_username` ASC) USING BTREE COMMENT '商家账号唯一'
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '商家信息表（仅存1条记录）' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xlw_merchant
-- ----------------------------
INSERT INTO `xlw_merchant` VALUES (1, 'admin', '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2', '练泽宇', '13800136268');

-- ----------------------------
-- Table structure for xlw_order
-- ----------------------------
DROP TABLE IF EXISTS `xlw_order`;
CREATE TABLE `xlw_order`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '订单ID（PK）',
  `order_no` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '订单号',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '订单生成时间',
  `send_time` datetime NULL DEFAULT NULL COMMENT '订单起送时间',
  `complete_time` datetime NULL DEFAULT NULL COMMENT '订单完成时间',
  `user_id` bigint NOT NULL COMMENT '用户ID（FK）',
  `order_status` tinyint NOT NULL DEFAULT 0 COMMENT '订单状态（1待付款 2待接单 3已接单 4派送中 5已完成 6已取消 7退款）',
  `pay_status` tinyint NOT NULL DEFAULT 0 COMMENT '支付状态（0=未支付，1=已支付，2-退款）',
  `total_amount` decimal(10, 2) NOT NULL COMMENT '订单总额（含配送费）',
  `delivery_fee` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '配送费（下单时快照）',
  `cost_xunlinbi` int NOT NULL DEFAULT 0 COMMENT '花费迅邻币',
  `pay_method` tinyint NULL DEFAULT NULL COMMENT '支付方式（0=支付宝，1=微信）',
  `order_type` tinyint NOT NULL COMMENT '订单类型（0=仅商品，1=仅快递，2=都有）',
  `has_exchange` tinyint NOT NULL DEFAULT 0 COMMENT '是否带兑换（0=否，1=是）',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '订单最后更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_order_no`(`order_no` ASC) USING BTREE COMMENT '订单号唯一',
  INDEX `fk_order_user`(`user_id` ASC) USING BTREE,
  INDEX `idx_order_status`(`order_status` ASC) USING BTREE COMMENT '按订单状态筛选索引',
  INDEX `idx_create_time`(`create_time` ASC) USING BTREE COMMENT '按生成时间统计索引',
  CONSTRAINT `fk_order_user` FOREIGN KEY (`user_id`) REFERENCES `xlw_user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '订单表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xlw_order
-- ----------------------------

-- ----------------------------
-- Table structure for xlw_order_exchange
-- ----------------------------
DROP TABLE IF EXISTS `xlw_order_exchange`;
CREATE TABLE `xlw_order_exchange`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '订单兑换ID（PK）',
  `order_id` bigint NOT NULL COMMENT '订单ID（FK）',
  `exchange_id` int NOT NULL COMMENT '可兑换商品ID（FK）',
  `unit_price` int NOT NULL COMMENT '单价（迅邻币）',
  `exchange_num` tinyint NOT NULL COMMENT '兑换数量',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_order_exchange_order`(`order_id` ASC) USING BTREE,
  INDEX `fk_order_exchange_product`(`exchange_id` ASC) USING BTREE,
  CONSTRAINT `fk_order_exchange_order` FOREIGN KEY (`order_id`) REFERENCES `xlw_order` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_order_exchange_product` FOREIGN KEY (`exchange_id`) REFERENCES `xlw_exchange_product` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '订单兑换表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xlw_order_exchange
-- ----------------------------

-- ----------------------------
-- Table structure for xlw_order_express
-- ----------------------------
DROP TABLE IF EXISTS `xlw_order_express`;
CREATE TABLE `xlw_order_express`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '订单快递ID（PK）',
  `order_id` bigint NOT NULL COMMENT '订单ID（FK）',
  `express_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '快递单号',
  `pickup_code` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '取件码',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_express_no`(`express_no` ASC) USING BTREE COMMENT '快递单号唯一',
  INDEX `fk_order_express_order`(`order_id` ASC) USING BTREE,
  CONSTRAINT `fk_order_express_order` FOREIGN KEY (`order_id`) REFERENCES `xlw_order` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '订单快递表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xlw_order_express
-- ----------------------------

-- ----------------------------
-- Table structure for xlw_order_product
-- ----------------------------
DROP TABLE IF EXISTS `xlw_order_product`;
CREATE TABLE `xlw_order_product`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '订单商品ID（PK）',
  `order_id` bigint NOT NULL COMMENT '订单ID（FK）',
  `product_id` int NOT NULL COMMENT '商品ID（FK）',
  `buy_num` tinyint NOT NULL COMMENT '购买数量',
  `unit_price` decimal(10, 2) NOT NULL COMMENT '单价',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_order_product_order`(`order_id` ASC) USING BTREE,
  INDEX `fk_order_product_product`(`product_id` ASC) USING BTREE,
  CONSTRAINT `fk_order_product_order` FOREIGN KEY (`order_id`) REFERENCES `xlw_order` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_order_product_product` FOREIGN KEY (`product_id`) REFERENCES `xlw_product` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '订单商品表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xlw_order_product
-- ----------------------------

-- ----------------------------
-- Table structure for xlw_product
-- ----------------------------
DROP TABLE IF EXISTS `xlw_product`;
CREATE TABLE `xlw_product`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '商品ID（PK）',
  `product_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '商品名称',
  `product_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '商品描述',
  `category_id` int NOT NULL COMMENT '商品分类ID（FK）',
  `product_price` decimal(10, 2) NOT NULL COMMENT '商品价格',
  `stock` int NOT NULL DEFAULT 0 COMMENT '库存',
  `preview_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '商品预览图',
  `product_status` tinyint NOT NULL DEFAULT 1 COMMENT '商品状态（0=下架，1=在售）',
  `exchangeable` tinyint NOT NULL DEFAULT 0 COMMENT '是否可兑换（0=不可兑换，1=可兑换）',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '上架时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_product_category`(`category_id` ASC) USING BTREE,
  CONSTRAINT `fk_product_category` FOREIGN KEY (`category_id`) REFERENCES `xlw_product_category` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '商品信息表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xlw_product
-- ----------------------------

-- ----------------------------
-- Table structure for xlw_product_category
-- ----------------------------
DROP TABLE IF EXISTS `xlw_product_category`;
CREATE TABLE `xlw_product_category`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '商品分类ID（PK）',
  `category_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '商品分类名称',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_category_name`(`category_name` ASC) USING BTREE COMMENT '分类名称唯一'
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '商品分类表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xlw_product_category
-- ----------------------------

-- ----------------------------
-- Table structure for xlw_user
-- ----------------------------
DROP TABLE IF EXISTS `xlw_user`;
CREATE TABLE `xlw_user`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户ID（PK）',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '手机号',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码（加密存储）',
  `register_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
  `unit` tinyint NOT NULL COMMENT '单元',
  `floor_num` int NOT NULL COMMENT '楼层',
  `room_num` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '房号',
  `xunlinbi_num` int NOT NULL DEFAULT 0 COMMENT '迅邻币数量',
  `total_orders` int NOT NULL DEFAULT 0 COMMENT '累计下单数量',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_phone`(`phone` ASC) USING BTREE COMMENT '手机号唯一（避免重复注册）',
  INDEX `idx_unit`(`unit` ASC) USING BTREE COMMENT '按单元筛选索引'
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '社区用户表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of xlw_user
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
