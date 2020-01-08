<template>
  <div>
    <Row class="margin-top-10">
      <i-col>
        <Card>
          <p slot="title">
            <Icon type="android-create"></Icon>企业负责人{{
              disabled ? '详情' : updateFlag ? '信息修改' : '新增'
            }}
          </p>
          <Row class="margin-top-10">
            <i-col span="12">
              <label>企业负责人姓名：</label>
              <Input
                v-model="merchCharge"
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

export default {
  name: 'searchable-table',
  data() {
    return {
      merchCharge: '',
      certNo: '',
      disabled: false,
      updateFlag: false,
      popTitle: '您确认增加当前负责人吗？'
    }
  },
  mounted() {
    const beforePageData = this.$route.query
    if (beforePageData && Object.keys(beforePageData).length > 0) {
      if (beforePageData.flag === 'detail') {
        this.disabled = true
      } else {
        this.updateFlag = true
        this.popTitle = '您确认更新当前企业负责人信息吗？'
      }
      this.merchCharge = beforePageData.params.merchCharge
      this.certNo = beforePageData.params.certNo
    }
  },
  methods: {
    returnLastPage() {
      this.$router.go(-1)
    },
    addMerchantManage() {
      if (this.updateFlag) {
        enterpriseDirectorUpdate().then(res => {
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
          merchId: this.getCookieToken.loginNo,
          merchCharge: this.merchCharge,
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
