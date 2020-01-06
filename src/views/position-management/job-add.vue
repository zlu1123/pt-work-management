<template>
  <div>
    <Row class="margin-top-10">
      <i-col>
        <Card>
          <p slot="title"><Icon type="android-create"></Icon>新增职位</p>
          <Row class="margin-top-10">
            <i-col span="12" class="mar-top-10">
              <label>职位名称：</label>
              <Input v-model="positionInfo.merchantName" class="width-200" />
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>职位类型：</label>
              <Input v-model="positionInfo.goodsBarCode" class="width-200" />
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>职位福利：</label>
              <Select
                v-model="positionInfo.postionWelfare"
                multiple
                :max-tag-count="2"
                class="width-200"
              >
                <Option
                  v-for="item in postionWelfareList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>职位要求：</label>
              <Select
                v-model="positionInfo.postionRequire"
                multiple
                :max-tag-count="2"
                style="width:200px;"
              >
                <Option
                  v-for="item in postionRequireList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>工作开始日期：</label>
              <DatePicker
                :value="positionInfo.shelfLifeTime"
                format="yyyy年MM月dd日"
                type="date"
                placeholder="请选择开始日期"
                class="width-200"
              ></DatePicker>
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>工作结束日期：</label>
              <DatePicker
                :value="positionInfo.shelfLifeTime"
                format="yyyy年MM月dd日"
                type="date"
                placeholder="请选择结束日期"
                class="width-200"
              ></DatePicker>
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>上班打卡时间：</label>
              <TimePicker
                format="HH:mm"
                placeholder="请选择上班打卡时间"
                class="width-200"
              ></TimePicker>
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>下班打卡时间：</label>
              <TimePicker
                format="HH:mm"
                placeholder="请选择下班打卡时间"
                class="width-200"
              ></TimePicker>
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>单价：</label>
              <Input
                v-model="positionInfo.specifications"
                style="width: 50px"
              />
              <label>元/小时</label>
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>需求人数：</label>
              <Input v-model="positionInfo.goodsTypeName" class="width-200" />
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>结算方式：</label>
              <Select
                v-model="positionInfo.settlementMethod"
                style="width:200px"
              >
                <Option
                  v-for="item in settlementMethodList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.text }}</Option
                >
              </Select>
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>保险选择：</label>
              <Input v-model="positionInfo.selling" class="width-200" />
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>保证金：</label>
              <Input v-model="positionInfo.unitName" class="width-200" />
            </i-col>
            <!-- <i-col span="12" class="mar-top-10">
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
            </i-col> -->
            <i-col span="12" class="mar-top-10">
              <label>发布企业：</label>
              <Input
                v-model="positionInfo.selling"
                placeholder="请输入企业名称"
                class="width-200"
              />
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>企业负责人：</label>
              <Input
                v-model="positionInfo.thirdQty"
                placeholder="请输入企业名称"
                class="width-200"
              />
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>平台负责人：</label>
              <Input
                v-model="positionInfo.thirdSalePrice"
                placeholder="请输入平台负责人"
                class="width-200"
              />
            </i-col>
            <i-col span="24" class="mar-top-10">
              <label>职位描述：</label>
              <Input
                v-model="positionInfo.des"
                placeholder="请输入职位描述"
                maxlength="1000"
                :autosize="{ minRows: 5, maxRows: 10 }"
                show-word-limit
                type="textarea"
                class="width-500"
              />
            </i-col>
          </Row>
          <div class="mar-top-10 space-around">
            <Button type="primary" @click="insertPositon">确认</Button>
            <Button @click="returnLastPage">返回</Button>
          </div>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import { insertPostionRelease } from '@/api/user'
import { mapGetters } from 'vuex'

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
      ],
      postionRequireList: [
        {
          label: '体力好',
          value: '0'
        },
        {
          label: '肌肉好',
          value: '1'
        }
      ],
      settlementMethodList: [
        { text: '完工结', value: 2 },
        { text: '次日结', value: 3 },
        { text: '周结', value: 4 },
        { text: '半月结', value: 5 },
        { text: '月结', value: 6 }
      ]
    }
  },
  mounted() {},
  methods: {
    returnLastPage() {
      this.$router.go(-1)
    },
    insertPositon() {
      insertPostionRelease({
        // merchId: this.getCookieToken.loginNo,
        merchId: '202001060064',
        postionName: '送水员',
        postionAddr: '渭南',
        postionWelfare: '五险一金',
        postionRequire: '身体好',
        workTime: '8',
        price: '20',
        priceUnit: '时',
        billtype: '日结',
        positiondes: '送水,装水',
        insurance: '1',
        margin: '1',
        health: '1'
      })
    },
    cancel() {}
  },

  computed: {
    ...mapGetters(['getCookieToken'])
  }
}
</script>
<style lang="less" scoped>
.mar-top-10 {
  margin-top: 10px;
}

.width-200 {
  width: 200px;
}

.width-500 {
  width: 500px;
}

.space-around {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
