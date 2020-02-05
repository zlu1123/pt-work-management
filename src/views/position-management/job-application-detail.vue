<template>
  <div>
    <Row class="margin-top-10">
      <i-col>
        <Card>
          <p slot="title"><Icon type="android-create"></Icon>职位申请详情</p>
          <Row class="margin-top-10">
            <i-col span="12" class="mar-top-10">
              <label>职位名称：</label>
              <Input
                v-model="applyInfo.postionName"
                :disabled="disabled"
                class="width-200"
              />
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>微信昵称：</label>
              <Input
                v-model="applyInfo.userName"
                :disabled="disabled"
                class="width-200"
              />
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>审核状态：</label>
              <Select
                v-model="applyInfo.applyExemStat"
                class="width-200"
                :disabled="disabled"
              >
                <Option
                  v-for="item in applyExemStatList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.text }}</Option
                >
              </Select>
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>申请时间：</label>
              <Input
                v-model="applyInfo.applyTime"
                :disabled="disabled"
                class="width-200"
              />
            </i-col>
            <i-col span="12" class="mar-top-10" v-if="applyInfo.applyTime">
              <label>申请时间：</label>
              <Input
                v-model="applyInfo.applyTime"
                :disabled="disabled"
                class="width-200"
              />
            </i-col>
          </Row>
          <div class="mar-top-10 space-around">
            <Poptip
              placement="top-start"
              confirm
              title="你确认通过当前申请吗"
              @on-ok="agreeApplyInfo"
              @on-cancel="cancel"
            >
              <Button type="primary">通过</Button>
            </Poptip>
            <Poptip
              placement="top-start"
              confirm
              title="你确认拒绝当前申请吗"
              @on-ok="rejectApplyInfo"
              @on-cancel="cancel"
            >
              <Button type="error">拒绝</Button>
            </Poptip>
            <Button @click="returnLastPage">返回</Button>
          </div>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import { insertPostionRelease, postionReleaseUpdate } from '@/api/user'
import { mapGetters } from 'vuex'
import { formatDate } from '@/libs/util'
import config from '@/config'

export default {
  name: 'job-application-detail',
  data() {
    return {
      showMap: false,
      postionImg: '',
      postionLngLat: [108.93977, 34.341574],
      applyInfo: {}, // 工作信息
      postionAddr: '',
      applyExemStatList: [
        {
          label: '待审核',
          value: '1'
        },
        {
          label: '审核通过',
          value: '2'
        },
        {
          label: '审核不通过',
          value: '3'
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
      disabled: true,
      updateFlag: false,
      popTitle: '您确认增加当前职位吗？',
      modelShow: false
    }
  },
  mounted() {
    const beforePageData = this.$route.params
    if (beforePageData && Object.keys(beforePageData).length > 0) {
      console.log(1)
      this.applyInfo = { ...beforePageData }
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
      this.applyInfo.postionImg = item
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
      this.applyInfo.postionAddr = item.address
      this.applyInfo.postionLngLat = item.location
    },
    confirmEditScope() {},
    returnLastPage() {
      this.$router.go(-1)
    },
    insertPositon() {
      let tipContent = this.checkParamData(this.applyInfo)
      if (tipContent) {
        this.$Message.error({
          content: tipContent
        })
        return
      }
      if (this.updateFlag) {
        let insertForm = { ...this.applyInfo }
        insertForm.merchId = this.getCookieToken.loginNo
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
        let insertForm = { ...this.applyInfo }
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
        insertForm.merchId = this.getCookieToken.loginNo
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
    agreeApplyInfo() {},
    rejectApplyInfo() {},
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
