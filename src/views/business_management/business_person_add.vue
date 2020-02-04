<template>
  <div>
    <Row class="margin-top-10">
      <i-col>
        <Card>
          <p slot="title">
            <Icon type="android-create"></Icon>{{ merchName }}负责人{{
              disabled ? '详情' : updateFlag ? '信息修改' : '新增'
            }}
          </p>
          <Row class="margin-top-10">
            <i-col span="12">
              <label>企业负责人姓名：</label>
              <Input
                v-model="merchChargeName"
                :disabled="disabled"
                style="width: 200px"
              />
            </i-col>
            <i-col span="12">
              <label>企业负责人身份证号：</label>
              <Input
                v-model="certNo"
                :disabled="disabled"
                style="width: 200px"
                maxlength="18"
              />
            </i-col>
            <i-col span="24" v-if="!disabled">
              <div class="btn__col">
                <Poptip
                  placement="top-start"
                  confirm
                  :title="popTitle"
                  @on-ok="addMerchantManage"
                  @on-cancel="cancel"
                  v-if="!disabled"
                >
                  <Button type="primary">{{
                    updateFlag ? '更新' : '新增'
                  }}</Button>
                </Poptip>
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
import { enterpriseDirectorInsert, enterpriseDirectorUpdate } from '@/api/user'
import { mapGetters } from 'vuex'
// import { checkID } from '@/libs/util'

export default {
  name: 'searchable-table',
  data() {
    return {
      merchChargeName: '',
      certNo: '',
      disabled: false,
      updateFlag: false,
      popTitle: '您确认增加当前负责人吗？',
      merchName: '',
      merchId: '',
      merchChargeId: '', // 列表查询返回
      merchCharge: '' // 列表查询返回
    }
  },
  mounted() {
    const beforePageData = this.$route.query
    if (beforePageData.flag !== 'add') {
      if (beforePageData.flag === 'detail') {
        this.disabled = true
      } else {
        this.updateFlag = true
        this.popTitle = '您确认更新当前企业负责人信息吗？'
      }
      this.merchChargeName = beforePageData.params.merchCharge
      this.certNo = beforePageData.params.loginId
      this.merchChargeId = beforePageData.params.merchChargeId
      this.merchId = beforePageData.params.merchId
    } else {
      this.merchName = beforePageData.params.label
      this.merchId = beforePageData.params.value
    }
  },
  methods: {
    returnLastPage() {
      this.$router.go(-1)
    },
    addMerchantManage() {
      if (!this.merchChargeName) {
        this.$Message.error({
          content: '请输入企业负责人姓名'
        })
        return
      }
      if (!this.updateFlag && !this.certNo) {
        this.$Message.error({
          content: '请输入企业负责人身份证号码'
        })
        return
      }
      // if (!this.updateFlag && !checkID(this.certNo)) {
      //   this.$Message.error({
      //     content: '身份证号码不正确'
      //   })
      //   return
      // }
      if (this.updateFlag) {
        enterpriseDirectorUpdate({
          merchId: this.merchId,
          merchChargeId: this.merchChargeId,
          merchChargeName: this.merchChargeName
        }).then(res => {
          if (res.data && res.data.retCode === '00000') {
            if (res.data && res.data.retCode === '00000') {
              this.$Notice.success({
                title: '提醒',
                desc: '企业负责人信息更新成功'
              })
              this.$router.go(-1)
            } else {
              this.$Notice.error({
                title: '提醒',
                desc: '企业负责人信息更新失败'
              })
            }
          }
        })
      } else {
        enterpriseDirectorInsert({
          // merchId: this.getCookieToken.loginNo,
          merchId: this.merchId,
          merchChargeName: this.merchChargeName,
          certNo: this.certNo
        }).then(res => {
          if (res.data && res.data.retCode === '00000') {
            this.$Notice.success({
              title: '提醒',
              desc: '企业负责人新增成功'
            })
            this.$router.go(-1)
          }
        })
      }
    },
    cancel() {}
  },
  computed: {
    ...mapGetters(['getCookieToken'])
  }
}
</script>
<style lang="less" scoped>
.btn__col {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
