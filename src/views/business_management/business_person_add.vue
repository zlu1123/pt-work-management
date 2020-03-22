<template>
  <div>
    <Row class="margin-top-10">
      <i-col>
        <Card>
          <p slot="title" style="height: auto;">
            <Icon type="android-create"></Icon>{{ merchName }}负责人{{
              disabled ? '详情' : updateFlag ? '信息修改' : '新增'
            }}
            <Button
              type="error"
              style="margin-left: 20px"
              @click="returnLastPage"
              >返回</Button
            >
          </p>
          <Row class="margin-top-10">
            <Form
              ref="merchChargeInfo"
              :model="merchChargeInfo"
              :rules="ruleValidate"
              :label-width="150"
            >
              <i-col span="12">
                <FormItem label="负责人姓名：" prop="merchChargeName">
                  <Input
                    v-model="merchChargeInfo.merchChargeName"
                    :disabled="disabled"
                    style="width: 200px"
                  />
                </FormItem>
              </i-col>
              <i-col span="12">
                <FormItem label="负责人登录账号：" prop="certNo">
                  <Input
                    v-model="merchChargeInfo.certNo"
                    :disabled="disabled"
                    style="width: 200px"
                    maxlength="18"
                  />
                </FormItem>
              </i-col>
            </Form>
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
import { checkID } from '@/libs/util'

export default {
  name: 'searchable-table',
  data() {
    return {
      merchChargeName: '',
      disabled: false,
      updateFlag: false,
      popTitle: '您确认增加当前负责人吗？',
      merchName: '',
      merchChargeInfo: {
        merchId: '',
        merchChargeName: '',
        certNo: ''
      },
      ruleValidate: {
        merchChargeName: [
          {
            required: true,
            message: '负责人姓名不能为空',
            trigger: 'blur'
          }
        ],
        certNo: [
          {
            required: true,
            message: '负责人登录账号不能为空',
            trigger: 'blur'
          },
          {
            type: 'string',
            // validator: this.checkTheIdCard,
            trigger: 'blur'
          }
        ]
      }
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
      this.merchChargeInfo.merchChargeName = beforePageData.params.merchCharge
      this.merchChargeInfo.certNo = beforePageData.params.loginId
      this.merchChargeInfo.merchId = beforePageData.params.merchId

      this.merchChargeId = beforePageData.params.merchChargeId
    } else {
      this.merchName = beforePageData.params.label
      this.merchChargeInfo.merchId = beforePageData.params.value
    }
  },
  methods: {
    returnLastPage() {
      this.$router.go(-1)
    },
    addMerchantManage() {
      this.$refs.merchChargeInfo.validate(valid => {
        if (valid) {
          if (this.updateFlag) {
            this.merchChargeInfo.merchChargeId = this.merchChargeId
            enterpriseDirectorUpdate(this.merchChargeInfo).then(res => {
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
            enterpriseDirectorInsert(this.merchChargeInfo).then(res => {
              if (res.data && res.data.retCode === '00000') {
                this.$Notice.success({
                  title: '提醒',
                  desc: '企业负责人新增成功'
                })
                this.$router.go(-1)
              }
            })
          }
        } else {
          this.$Message.error('请按照规则输入')
        }
      })
    },
    cancel() {},

    checkTheIdCard(rule, value, callback) {
      if (!checkID(value)) {
        callback(new Error('请输入正确的身份证号'))
      } else {
        callback()
      }
    }
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
