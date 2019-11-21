<style lang="less">
// @import '../../styles/common.less';
// @import './components/table.less';
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
.goods-edit-list {
  padding-bottom: 24px;
  border-bottom: 1px solid #e9eaec;
}
.goods-edit-list li {
  float: left;
  margin-right: 60px;
  margin-bottom: 10px;
}
/*清除浮动*/
.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  *zoom: 1;
}
.prompt-list {
  margin-top: 2px;
  width: 300px;
  padding: 4px 7px;
  border: 1px solid #dddee1;
}
.prompt-list li {
  cursor: pointer;
  padding: 2px 0;
}

li {
  list-style: none;
} /*这里设置*/
</style>

<template>
  <div>
    <Row class="margin-top-10">
      <Col>
        <Card>
          <p slot="title">
            <Icon type="android-create"></Icon>新增职位
          </p>
          <Row class="margin-top-10">
            <Col span="24">
              <ul class="goods-edit-list clearfix">
                <li>
                  <label style="display: inline-block; width: 100px; text-align: right;">商品名称：</label>
                  <Input v-model="goodsInfo.goodsName" disabled="disabled" style="width: 200px" />
                </li>
                <li>
                  <label style="display: inline-block; width: 100px; text-align: right;">商品国际码：</label>
                  <Input v-model="goodsInfo.goodsBarCode" disabled="disabled" style="width: 200px" />
                </li>
                <li>
                  <label style="display: inline-block; width: 100px; text-align: right;">商品编码：</label>
                  <Input v-model="goodsInfo.number" disabled="disabled" style="width: 200px" />
                </li>
                <li>
                  <label style="display: inline-block; width: 100px; text-align: right;">商品保质期：</label>
                  <Input
                    v-model="goodsInfo.shelfLifeTime"
                    disabled="disabled"
                    style="width: 200px"
                  />
                </li>
                <li>
                  <label style="display: inline-block; width: 100px; text-align: right;">商品含量：</label>
                  <Input
                    v-model="goodsInfo.specifications"
                    disabled="disabled"
                    style="width: 200px"
                  />
                </li>
                <li>
                  <label style="display: inline-block; width: 100px; text-align: right;">商品品类：</label>
                  <Input
                    v-model="goodsInfo.goodsTypeName"
                    disabled="disabled"
                    style="width: 200px"
                  />
                </li>
                <li>
                  <label style="display: inline-block; width: 100px; text-align: right;">商品售卖规格：</label>
                  <Input
                    v-model="goodsInfo.packingSpecification"
                    disabled="disabled"
                    style="width: 200px"
                  />
                </li>
                <li>
                  <label style="display: inline-block; width: 100px; text-align: right;">商品畅销度：</label>
                  <Input v-model="goodsInfo.selling" disabled="disabled" style="width: 200px" />
                </li>
                <li>
                  <label style="display: inline-block; width: 100px; text-align: right;">商品单位：</label>
                  <Input v-model="goodsInfo.unitName" disabled="disabled" style="width: 200px" />
                </li>
                <li>
                  <label style="display: inline-block; width: 100px; text-align: right;">配送类型：</label>
                  <Select v-model="goodsInfo.deliveryGoodsType" clearable style="width:200px;">
                    <Option
                      v-for="item in deliveryGoodsTypeList"
                      :value="item.value"
                      :key="item.value"
                    >{{item.label}}</Option>
                  </Select>
                </li>
                <li>
                  <label style="display: inline-block; width: 100px; text-align: right;">商品状态：</label>
                  <Select v-model="goodsInfo.goodsSupplierPutaway" clearable style="width:200px;">
                    <Option
                      v-for="item in goodsSupplierPutawayList"
                      :value="item.value"
                      :key="item.value"
                    >{{item.label}}</Option>
                  </Select>
                </li>
                <li>
                  <label style="display: inline-block; width: 100px; text-align: right;">库存：</label>
                  <Input v-model="goodsInfo.thirdQty" placeholder="请输入库存" style="width: 200px" />
                </li>
                <li>
                  <label style="display: inline-block; width: 100px; text-align: right;">销售价格：</label>
                  <Input
                    v-model="goodsInfo.thirdSalePrice"
                    placeholder="请输入销售价格"
                    style="width: 200px"
                  />
                </li>
                <li>
                  <label style="display: inline-block; width: 100px; text-align: right;">最低起订量：</label>
                  <Input
                    v-model="goodsInfo.deliveryGoodsMinQty"
                    placeholder="请输入最低起订量"
                    style="width: 200px"
                  />
                </li>
                <li>
                  <label style="display: inline-block; width: 100px; text-align: right;">商品跨度：</label>
                  <Input
                    v-model="goodsInfo.deliveryGoodsSpan"
                    placeholder="请输入商品跨度"
                    style="width: 200px"
                  />
                </li>
                <li>
                  <label style="display: inline-block; width: 100px; text-align: right;">单张订单限量：</label>
                  <Input
                    v-model="goodsInfo.maxQtyLimit"
                    placeholder="请输入最大数量"
                    style="width: 200px"
                  />
                </li>
                <li>
                  <label style="display: inline-block; width: 100px; text-align: right;">供应商内部码：</label>
                  <Input
                    v-model="goodsInfo.supplierOwnCode"
                    placeholder="供应商内部码"
                    style="width: 200px"
                  />
                </li>
              </ul>
              <div style="margin-top: 20px;">
                <Poptip
                  confirm
                  title="您确认编辑当前商品资料吗？"
                  @on-ok="saveSupplierGoods"
                  @on-cancel="cancel"
                >
                  <Button type="primary">确认</Button>
                </Poptip>
                <Button style="margin: 0 10px;" type="ghost" @click="returnLastPage">返回</Button>
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import Cookies from "js-cookie";
// import apiUrl from  '../../libs/request_path.js';
import util from "../../libs/util.js";

export default {
  name: "searchable-table",
  data() {
    return {
      searchBarCode: null, //查询条件--商品国际码
      goodsInfo: {}, //查询到的商品信息
      deliveryGoodsTypeList: [
        {
          value: 1,
          label: "散货"
        },
        {
          value: 2,
          label: "整件"
        }
      ],
      goodsSupplierPutawayList: [
        {
          value: 0,
          label: "关闭"
        },
        {
          value: 1,
          label: "正常"
        },
        {
          value: 2,
          label: "挂起"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    queryGoodsInfoByBarCode() {
      var that = this;
      if (that.searchBarCode && that.searchBarCode != "") {
        var qs = require("qs");
        const msg = that.$Message.loading({
          content: "查询中...",
          duration: 0
        });
        util.ajax
          .post(
            apiUrl.queryGoodsInfoByBarCodeApi,
            qs.stringify({
              goodsBarCode: that.searchBarCode,
              accessToken: Cookies.get("accessToken")
            })
          )
          .then(function(response) {
            setTimeout(msg, 1);
            var result = response.data;
            if (result.statusCode == 200) {
              that.goodsInfo = result.children;
            } else {
              that.$Message.info(result.message);
            }
          })
          .catch(function(response) {
            setTimeout(msg, 1);
            that.$Message.info("系统错误!");
          });
      } else {
        that.$Message.info("请输入查询条件");
      }
    },
    returnLastPage() {
	//   this.$router.push({ path: "/job_posting" });
		this.$router.go(-1);
    },
    saveSupplierGoods() {
      var that = this;
      if (that.goodsInfo.supplierGoodsId) {
        if (
          null == that.goodsInfo.deliveryGoodsType ||
          !that.goodsInfo.deliveryGoodsType
        ) {
          that.$Message.error("请选择配送类型!");
          return false;
        }
        if (
          null == that.goodsInfo.goodsSupplierPutaway ||
          (!that.goodsInfo.goodsSupplierPutaway &&
            that.goodsInfo.goodsSupplierPutaway != 0)
        ) {
          that.$Message.error("请选择商品上架状态!");
          return false;
        }
        if (null == that.goodsInfo.thirdQty || !that.goodsInfo.thirdQty) {
          that.$Message.error("请输入商品库存!");
          return false;
        }
        if (
          null == that.goodsInfo.thirdSalePrice ||
          !that.goodsInfo.thirdSalePrice
        ) {
          that.$Message.error("请输入销售价格!");
          return false;
        }
        if (
          null == that.goodsInfo.deliveryGoodsMinQty ||
          !that.goodsInfo.deliveryGoodsMinQty
        ) {
          that.$Message.error("请输入最低起订量!");
          return false;
        }
        if (
          null == that.goodsInfo.deliveryGoodsSpan ||
          !that.goodsInfo.deliveryGoodsSpan
        ) {
          that.$Message.error("请输入商品跨度!");
          return false;
        }
        var qs = require("qs");
        const msg = that.$Message.loading({
          content: "查询中...",
          duration: 0
        });
        util.ajax
          .post(
            apiUrl.updatePcSupplierGoodsInfoApi,
            qs.stringify({
              id: that.goodsInfo.id,
              supplierGoodsId: that.goodsInfo.supplierGoodsId,
              goodsBarCode: that.goodsInfo.goodsBarCode,
              thirdQty: that.goodsInfo.thirdQty,
              unitId: that.goodsInfo.unitId,
              thirdSalePrice: that.goodsInfo.thirdSalePrice,
              goodsSupplierPutaway: that.goodsInfo.goodsSupplierPutaway,
              deliveryGoodsType: that.goodsInfo.deliveryGoodsType,
              deliveryGoodsSpan: that.goodsInfo.deliveryGoodsSpan,
              deliveryGoodsMinQty: that.goodsInfo.deliveryGoodsMinQty,
              maxQtyLimit: that.goodsInfo.maxQtyLimit,
              supplierOwnCode: that.goodsInfo.supplierOwnCode,
              accessToken: Cookies.get("accessToken")
            })
          )
          .then(function(response) {
            setTimeout(msg, 1);
            var result = response.data;
            if (result.statusCode == 200) {
              that.$Message.info(result.message);
            } else {
              that.$Message.info(result.message);
            }
          })
          .catch(function(response) {
            setTimeout(msg, 1);
            that.$Message.info("系统错误!");
          });
      } else {
        that.$Message.info("没有要保存的商品！");
      }
    },
    cancel() {}
  }
};
</script>