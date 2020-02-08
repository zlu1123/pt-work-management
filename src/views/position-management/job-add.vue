<template>
  <div>
    <Row class="margin-top-10">
      <i-col>
        <Card>
          <p slot="title" style="height: auto">
            <Icon type="android-create"></Icon>{{ merchName }}新增职位
            <Button
              type="error"
              style="margin-left: 20px"
              @click="returnLastPage"
              >返回</Button
            >
          </p>
          <Row class="margin-top-10">
            <i-col span="12" class="mar-top-10">
              <label>职位名称：</label>
              <Input
                v-model="positionInfo.postionName"
                :disabled="disabled"
                class="width-200"
              />
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>职位类型：</label>
              <Select
                v-model="positionInfo.postionType"
                class="width-200"
                :disabled="disabled"
              >
                <Option
                  v-for="item in postionTypeList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.text }}</Option
                >
              </Select>
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>职位福利：</label>
              <Select
                v-model="positionInfo.postionWelfare"
                multiple
                :max-tag-count="2"
                class="width-200"
                label-in-value
                :disabled="disabled"
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
                label-in-value
                :disabled="disabled"
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
                v-model="positionInfo.workBeginDate"
                format="yyyy-MM-dd"
                type="date"
                placeholder="请选择开始日期"
                class="width-200"
                @on-change="beginDateChange"
                :disabled="disabled"
              ></DatePicker>
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>工作结束日期：</label>
              <DatePicker
                v-model="positionInfo.workEndDate"
                format="yyyy-MM-dd"
                type="date"
                placeholder="请选择结束日期"
                class="width-200"
                @on-change="endDateChange"
                :disabled="disabled"
              ></DatePicker>
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>上班打卡时间：</label>
              <TimePicker
                v-model="positionInfo.clockBeginDate"
                format="HH:mm"
                placeholder="请选择上班打卡时间"
                class="width-200"
                :disabled="disabled"
              ></TimePicker>
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>下班打卡时间：</label>
              <TimePicker
                v-model="positionInfo.clockEndDate"
                format="HH:mm"
                placeholder="请选择下班打卡时间"
                class="width-200"
                :disabled="disabled"
              ></TimePicker>
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>单价：</label>
              <Input
                v-model="positionInfo.price"
                style="width: 80px"
                :disabled="disabled"
              />
              <label>元/小时</label>
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>工作时间：</label>
              <Input
                v-model="positionInfo.workTime"
                style="width: 80px"
                :disabled="disabled"
              />
              <label>小时</label>
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>需求人数：</label>
              <Input
                v-model="positionInfo.workCount"
                class="width-200"
                :disabled="disabled"
              />
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>结算方式：</label>
              <Select
                v-model="positionInfo.billtype"
                class="width-200"
                :disabled="disabled"
              >
                <Option
                  v-for="item in billtypeList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.text }}</Option
                >
              </Select>
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>保证金：</label>
              <i-switch
                size="large"
                v-model="positionInfo.margin"
                true-value="1"
                false-value="0"
                :disabled="disabled"
              >
                <span slot="open">需要</span>
                <span slot="close">不要</span>
              </i-switch>
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>请选择职位地址：</label>
              <Input
                v-model="positionInfo.postionAddr"
                placeholder="请选择地址"
                @on-focus="chooseAddr"
                class="width-200"
                :disabled="disabled"
              />
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>健康证选择：</label>
              <i-switch
                size="large"
                v-model="positionInfo.health"
                true-value="1"
                false-value="0"
                :disabled="disabled"
              >
                <span slot="open">开启</span>
                <span slot="close">关闭</span>
              </i-switch>
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>保险选择：</label>
              <i-switch
                size="large"
                v-model="positionInfo.insurance"
                true-value="1"
                false-value="0"
                :disabled="disabled"
              >
                <span slot="open">开启</span>
                <span slot="close">关闭</span>
              </i-switch>
            </i-col>
            <i-col span="24" class="mar-top-10 col-upload-lsg">
              <label>请上传职位图片：</label>
              <lsg-upload
                :imgUrl.sync="postionImg"
                @getImgUrl="uploadImgMethod"
                :uploadImg="updateFlag"
              ></lsg-upload>
            </i-col>
            <i-col span="24" class="mar-top-10">
              <label>职位描述：</label>
              <Input
                v-model="positionInfo.positiondes"
                placeholder="请输入职位描述"
                maxlength="1000"
                :autosize="{ minRows: 5, maxRows: 10 }"
                show-word-limit
                type="textarea"
                class="width-800"
                :disabled="disabled"
              />
            </i-col>
          </Row>
          <div class="mar-top-10 space-around">
            <Poptip
              placement="top-start"
              confirm
              :title="popTitle"
              @on-ok="insertPositon"
              @on-cancel="cancel"
              v-if="!disabled"
            >
              <Button type="primary">{{ updateFlag ? '更新' : '新增' }}</Button>
            </Poptip>
          </div>
        </Card>
      </i-col>
    </Row>
    <address-map
      :model-show="showMap"
      @chooseMapLocation="chooseMapLocation"
      @modelChange="mapModelChange"
      :markerPosition.sync="postionLngLat"
      :address.sync="postionAddr"
    ></address-map>
  </div>
</template>

<script>
import { insertPostionRelease, postionReleaseUpdate } from '@/api/user'
import { mapGetters } from 'vuex'
import addressMap from '../components/amap/address-map.vue'
import lsgUpload from '../components/upload/lsg-upload.vue'
import { formatDate } from '@/libs/util'
import config from '@/config'

export default {
  name: 'searchable-table',
  components: {
    addressMap,
    lsgUpload
  },
  data() {
    return {
      showMap: false,
      merchId: '',
      merchName: '',
      postionImg: '',
      postionLngLat: [108.93977, 34.341574],
      positionInfo: {}, // 工作信息
      postionAddr: '',
      postionWelfareList: [
        {
          label: '五险一金',
          value: '01'
        },
        {
          label: '餐补',
          value: '02'
        }
      ],
      postionRequireList: [
        {
          label: '体力好',
          value: '01'
        },
        {
          label: '认真',
          value: '02'
        }
      ],
      billtypeList: [
        { text: '完工结', value: '01' },
        { text: '次日结', value: '02' },
        { text: '周结', value: '03' },
        { text: '半月结', value: '04' },
        { text: '月结', value: '05' }
      ],
      postionTypeList: [
        { text: '餐饮', value: '01' },
        { text: '快递', value: '02' },
        { text: '客房', value: '03' },
        { text: '其他', value: '04' }
      ],
      disabled: false,
      updateFlag: false,
      popTitle: '您确认增加当前职位吗？',
      modelShow: false
    }
  },
  mounted() {
    const beforePageData = this.$route.query
    if (beforePageData && Object.keys(beforePageData).length > 0) {
      if (beforePageData.flag === 'detail') {
        this.disabled = true
      } else if (beforePageData.flag === 'add') {
        this.merchId = beforePageData.params.merchId
        this.merchName = beforePageData.params.merchName
        return
      } else {
        this.updateFlag = true
        this.popTitle = '您确认更新当前职位信息吗？'
      }
      this.positionInfo = { ...beforePageData.params }
      this.positionInfo.postionWelfare = beforePageData.params.postionWelfare.split(
        ','
      )
      this.positionInfo.postionRequire = beforePageData.params.postionRequire.split(
        ','
      )
      this.positionInfo.postionLngLat = beforePageData.params.postionLngLat.split(
        ','
      )
      this.postionImg = config.baseUrl.imgUrl + beforePageData.params.postionImg
      this.postionAddr = beforePageData.params.postionAddr
      this.postionLngLat = beforePageData.params.postionLngLat.split(',')
    }
  },
  methods: {
    beginDateChange(date) {
      console.log(date)
    },
    endDateChange(date) {
      console.log(date)
    },
    uploadImgMethod(item) {
      this.positionInfo.postionImg = item
      this.postionImg = item ? config.baseUrl.imgUrl + item : ''
    },
    chooseAddr() {
      this.showMap = true
    },
    mapModelChange(value) {
      this.showMap = value
    },
    chooseMapLocation(item) {
      this.postionLngLat = item.location
      this.postionAddr = item.address
      this.positionInfo.postionAddr = item.address
      this.positionInfo.postionLngLat = item.location
    },
    confirmEditScope() {},
    returnLastPage() {
      this.$router.go(-1)
    },
    insertPositon() {
      let tipContent = this.checkParamData(this.positionInfo)
      if (tipContent) {
        this.$Message.error({
          content: tipContent
        })
        return
      }
      if (this.updateFlag) {
        let insertForm = { ...this.positionInfo }
        insertForm.merchId = this.merchId
        insertForm.postionRequire = insertForm.postionRequire.join(',')
        insertForm.postionWelfare = insertForm.postionWelfare.join(',')
        insertForm.workBeginDate = formatDate(insertForm.workBeginDate)
        insertForm.workEndDate = formatDate(insertForm.workEndDate)
        insertForm.postionLngLat = insertForm.postionLngLat.join(',')
        // 更新
        postionReleaseUpdate(insertForm).then(res => {
          if (res.data && res.data.retCode === '00000') {
            this.$Notice.success({
              title: '提醒',
              desc: '职位信息变更成功'
            })
            this.$router.go(-1)
          } else {
            this.$Notice.error({
              title: '提醒',
              desc: '职位信息变更失败'
            })
          }
        })
      } else {
        let insertForm = { ...this.positionInfo }
        // merchId: this.getCookieToken.loginNo,
        //   postionName: '送水懂得多员',
        //   postionAddr: '渭南发发发',
        //   postionLngLat: '', // 职位经纬度
        //   postionWelfare: '五险一金',
        //   postionRequire: '身体好',
        //   workTime: '8',
        //   price: '20',
        //   priceUnit: '时',
        //   billtype: '日结',
        //   positiondes: '送水懂得多,装水',
        //   insurance: '1',
        //   margin: '1',
        //   health: '1',
        //   releasEmerchAddr: "'1', '2'", // 职位地址
        //   workCount: '20',
        //   postionImg: 'http://baidu.com', // 职位图片
        //   workBeginDate: '20200102',
        //   workEndDate: '20200501',
        //   clockBeginDate: '09:00',
        //   clockEndDate: '17:00'
        insertForm.merchId = this.merchId
        insertForm.postionRequire = insertForm.postionRequire.join(',')
        insertForm.postionWelfare = insertForm.postionWelfare.join(',')
        insertForm.workBeginDate = formatDate(insertForm.workBeginDate)
        insertForm.workEndDate = formatDate(insertForm.workEndDate)
        insertForm.postionLngLat = insertForm.postionLngLat.join(',')
        insertPostionRelease(insertForm).then(res => {
          if (res.data && res.data.retCode === '00000') {
            this.$Notice.success({
              title: '提醒',
              desc: '职位新增成功'
            })
            this.$router.go(-1)
          }
        })
      }
    },
    cancel() {},

    checkParamData(data) {
      let tipContent = ''
      if (!data.postionName) {
        tipContent = '职位名称不能为空'
      }
      if (!data.postionAddr || !data.postionLngLat) {
        tipContent = '职位地址不能为空'
      }
      if (!data.postionWelfare) {
        tipContent = '职位福利不能为空'
      }
      if (!data.postionRequire) {
        tipContent = '职位要求不能为空'
      }
      if (!data.workTime) {
        tipContent = '工作时间不能为空'
      }
      if (!data.price) {
        tipContent = '工作单价不能为空'
      }
      if (!data.billtype) {
        tipContent = '职位类型不能为空'
      }
      if (!data.positiondes) {
        tipContent = '工作说明不能为空'
      }
      // if (!data.insurance) {
      //   checkResult.tipContent = '工作说明不能为空'
      // }
      // if (!data.margin) {
      //   checkResult.tipContent = '工作说明不能为空'
      // }
      // if (!data.health) {
      //   checkResult.tipContent = '工作说明不能为空'
      // }
      if (!data.workCount) {
        tipContent = '工作需求人数不能为空'
      }
      if (!data.workBeginDate) {
        tipContent = '工作开始日期不能为空'
      }
      if (!data.workEndDate) {
        tipContent = '工作结束日期不能为空'
      }
      if (!data.clockBeginDate) {
        tipContent = '工作开始时间不能为空'
      }
      if (!data.clockEndDate) {
        tipContent = '工作结束时间不能为空'
      }
      return tipContent
    }
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

.width-400 {
  width: 400px;
}

.width-500 {
  width: 500px;
}

.width-800 {
  width: 800px;
}

.space-around {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.col-upload-lsg {
  display: flex;
  align-items: center;
}
</style>
