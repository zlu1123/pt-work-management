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
              <label>手机号码：</label>
              <Input
                v-model="applyInfo.mainMobile"
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
              <label>审核时间：</label>
              <Input
                v-model="applyInfo.applyTime"
                :disabled="disabled"
                class="width-200"
              />
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>实名认证：</label>
              <i-switch
                size="large"
                v-model="applyInfo.isCert"
                true-value="1"
                false-value="0"
                :disabled="disabled"
              >
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>姓名：</label>
              <Input
                v-model="applyInfo.custName"
                :disabled="disabled"
                class="width-200"
              />
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>身份证号码：</label>
              <Input
                v-model="applyInfo.certNo"
                :disabled="disabled"
                class="width-200"
              />
            </i-col>
            <i-col
              span="24"
              class="mar-top-10 col-upload-lsg"
              v-if="applyInfo.isCert === '1' && applyInfo.identImageAddr"
            >
              <label>身份证正面图片：</label>
              <img
                class="img-content"
                :src="`${getImgUrl + applyInfo.identImageAddr}`"
              />
            </i-col>
            <i-col
              span="24"
              class="mar-top-10 col-upload-lsg"
              v-if="applyInfo.isCert === '1' && applyInfo.identImageAddr1"
            >
              <label>身份证反面图片：</label>
              <img
                class="img-content"
                :src="`${getImgUrl + applyInfo.identImageAddr1}`"
              />
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>健康认证：</label>
              <i-switch
                size="large"
                v-model="applyInfo.isHealth"
                true-value="1"
                false-value="0"
                :disabled="disabled"
              >
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
            </i-col>
            <i-col
              span="24"
              class="mar-top-10 col-upload-lsg"
              v-if="applyInfo.isHealth === '1' && applyInfo.healthImageAddr"
            >
              <label>健康证图片：</label>
              <img
                class="img-content"
                :src="`${getImgUrl + applyInfo.healthImageAddr}`"
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
import { postionApplyApplyExam } from '@/api/user'
import { mapGetters } from 'vuex'
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
      this.applyInfo = { ...beforePageData }
    }
  },
  methods: {
    returnLastPage() {
      this.$router.go(-1)
    },
    agreeApplyInfo() {
      this.postionApplyApplyExamMethod('2')
    },
    rejectApplyInfo() {
      this.postionApplyApplyExamMethod('3')
    },
    cancel() {},
    postionApplyApplyExamMethod(applyExemStat) {
      postionApplyApplyExam({
        postionApplyId: this.applyInfo.postionApplyId,
        applyExemStat // 2 通过 3 拒绝
      }).then(res => {
        if (res.data && res.data.retCode === '00000') {
          this.$Message.info('审核成功')
          this.returnLastPage()
        }
      })
    }
  },

  computed: {
    ...mapGetters(['getCookieToken']),

    getImgUrl() {
      return config.baseUrl.imgUrl
    }
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

.img-content {
  width: 200px;
  height: 200px;
}

.col-upload-lsg {
  display: flex;
  align-items: center;
}
</style>
