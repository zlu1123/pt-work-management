<template>
  <div>
    <Row class="margin-top-10">
      <i-col>
        <Card>
          <p slot="title"><Icon type="android-create"></Icon>新增职位</p>
          <Row class="margin-top-10">
            <i-col span="24">
              <ul class="goods-edit-list clearfix">
                <li>
                  <label class="label-line">职位名称：</label>
                  <Input
                    v-model="positionInfo.merchantName"
                    style="width: 200px"
                  />
                </li>
                <li>
                  <label class="label-line">职位类型：</label>
                  <Input
                    v-model="positionInfo.goodsBarCode"
                    style="width: 200px"
                  />
                </li>
                <li>
                  <label class="label-line">职位福利：</label>
                  <Select
                    v-model="positionInfo.postionWelfare"
                    clearable
                    multiple
                    :max-tag-count="2"
                    style="width: 200px"
                  >
                    <Option
                      v-for="item in postionWelfareList"
                      :value="item.value"
                      :key="item.value"
                      >{{ item.label }}</Option
                    >
                  </Select>
                </li>
                <li>
                  <label class="label-line">职位要求：</label>
                  <Select
                    v-model="positionInfo.postionRequire"
                    clearable
                    style="width:200px;"
                  >
                    <Option
                      v-for="item in deliveryGoodsTypeList"
                      :value="item.value"
                      :key="item.value"
                      >{{ item.label }}</Option
                    >
                  </Select>
                </li>
                <li>
                  <label class="label-line">工作时间：</label>
                  <Input
                    v-model="positionInfo.shelfLifeTime"
                    style="width: 200px"
                  />
                </li>
                <li>
                  <label class="label-line">单价：</label>
                  <Input
                    v-model="positionInfo.specifications"
                    style="width: 200px"
                  />
                </li>
                <li>
                  <label class="label-line">需求人数：</label>
                  <Input
                    v-model="positionInfo.goodsTypeName"
                    style="width: 200px"
                  />
                </li>
                <li>
                  <label class="label-line">结算方式：</label>
                  <Input
                    v-model="positionInfo.packingSpecification"
                    style="width: 200px"
                  />
                </li>
                <li>
                  <label class="label-line">保险选择：</label>
                  <Input v-model="positionInfo.selling" style="width: 200px" />
                </li>
                <li>
                  <label class="label-line">保证金：</label>
                  <Input v-model="positionInfo.unitName" style="width: 200px" />
                </li>
                <li>
                  <label class="label-line">健康选择：</label>
                  <Select
                    v-model="positionInfo.deliveryGoodsType"
                    clearable
                    style="width:200px;"
                  >
                    <Option
                      v-for="item in deliveryGoodsTypeList"
                      :value="item.value"
                      :key="item.value"
                      >{{ item.label }}</Option
                    >
                  </Select>
                </li>
                <li>
                  <label class="label-line">发布企业：</label>
                  <Select
                    v-model="positionInfo.goodsSupplierPutaway"
                    clearable
                    style="width:200px;"
                  >
                    <Option
                      v-for="item in goodsSupplierPutawayList"
                      :value="item.value"
                      :key="item.value"
                      >{{ item.label }}</Option
                    >
                  </Select>
                </li>
                <li>
                  <label class="label-line">企业负责人：</label>
                  <Input
                    v-model="positionInfo.thirdQty"
                    placeholder="请输入库存"
                    style="width: 200px"
                  />
                </li>
                <li>
                  <label class="label-line">平台负责人：</label>
                  <Input
                    v-model="positionInfo.thirdSalePrice"
                    placeholder="请输入销售价格"
                    style="width: 200px"
                  />
                </li>
              </ul>
              <div style="margin-top: 20px;">
                <Button type="primary" @click="insertPositon">确认</Button>
                <Button style="margin: 0 10px;" @click="returnLastPage"
                  >返回</Button
                >
              </div>
            </i-col>
          </Row>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import { insertPostionRelease } from '@/api/user'

export default {
  name: 'searchable-table',
  data() {
    return {
      positionInfo: {}, // 工作信息
      postionWelfareList: [
        {
          label: '五险一金',
          value: '0'
        },
        {
          label: '餐补',
          value: '1'
        }
      ]
    }
  },
  mounted() {},
  methods: {
    returnLastPage() {
      this.$router.go(-1)
    },
    insertPositon() {
      // {
      //   merchId: '202001019536',
      //   postionName: '揽货员',
      //   postionAddr: '西安',
      //   postionWelfare: '五险一金',
      //   postionRequire: '身体好',
      //   workTime: '8',
      //   price: '30',
      //   priceUnit: '时',
      //   billtype: '日结',
      //   positiondes: '帮助揽货,装货',
      //   insurance: '1',
      //   margin: '1',
      //   health: '1'
      // }
      insertPostionRelease()
    },
    cancel() {}
  }
}
</script>
<style lang="less" scoped>
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
  content: '';
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

.label-line {
  display: inline-block;
  width: 120px;
  text-align: right;
}
</style>
