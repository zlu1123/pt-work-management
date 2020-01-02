<template>
  <div>
    <Row class="margin-top-10">
      <Col>
        <Card>
          <p slot="title"><Icon type="android-create"></Icon>企业新增</p>
          <Row class="margin-top-10">
            <Col span="24">
              <ul>
                <li>
                  <label class="label-line">企业名称：</label>
                  <Input v-model="goodsInfo.goodsName" style="width: 200px" />
                </li>
                <li>
                  <label class="label-line">企业负责人：</label>
                  <Input
                    v-model="goodsInfo.goodsBarCode"
                    style="width: 200px"
                  />
                </li>
              </ul>
              <div style="margin-top: 20px;">
                <Button type="primary" @click="saveSupplierGoods">确认</Button>
                <Button
                  style="margin: 0 10px;"
                  type="ghost"
                  @click="returnLastPage"
                  >返回</Button
                >
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
// import Cookies from 'js-cookie'
// import apiUrl from  '../../libs/request_path.js';
// import util from '../../libs/util.js'
import { insertPostionRelease } from '@/api/user'

export default {
  name: 'searchable-table',
  data() {
    return {
      searchBarCode: null, //查询条件--商品国际码
      goodsInfo: {}, //查询到的商品信息
      deliveryGoodsTypeList: [
        {
          value: 1,
          label: '散货'
        },
        {
          value: 2,
          label: '整件'
        }
      ],
      goodsSupplierPutawayList: [
        {
          value: 0,
          label: '关闭'
        },
        {
          value: 1,
          label: '正常'
        },
        {
          value: 2,
          label: '挂起'
        }
      ]
    }
  },
  mounted() {},
  methods: {
    queryGoodsInfoByBarCode() {
      var that = this
      if (that.searchBarCode && that.searchBarCode != '') {
        var qs = require('qs')
        const msg = that.$Message.loading({
          content: '查询中...',
          duration: 0
        })
        util.ajax
          .post(
            apiUrl.queryGoodsInfoByBarCodeApi,
            qs.stringify({
              goodsBarCode: that.searchBarCode,
              accessToken: Cookies.get('accessToken')
            })
          )
          .then(function(response) {
            setTimeout(msg, 1)
            var result = response.data
            if (result.statusCode == 200) {
              that.goodsInfo = result.children
            } else {
              that.$Message.info(result.message)
            }
          })
          .catch(function(response) {
            setTimeout(msg, 1)
            that.$Message.info('系统错误!')
          })
      } else {
        that.$Message.info('请输入查询条件')
      }
    },
    returnLastPage() {
      //   this.$router.push({ path: "/job_posting" });
      this.$router.go(-1)
    },
    saveSupplierGoods() {
      insertPostionRelease({
        merchId: '202001019536',
        postionName: '揽货员',
        postionAddr: '西安',
        postionWelfare: '五险一金',
        postionRequire: '身体好',
        workTime: '8',
        price: '30',
        priceUnit: '时',
        billtype: '日结',
        positiondes: '帮助揽货,装货',
        insurance: '1',
        margin: '1',
        health: '1'
      })
    },
    cancel() {}
  }
}
</script>
<style lang="less" scoped>
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
