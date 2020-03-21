<template>
  <div>
    <Row class="margin-top-10">
      <i-col>
        <Card>
          <p slot="title">
            <Icon type="android-create"></Icon>平台用户{{
              disabled ? '详情' : updateFlag ? '信息修改' : '新增'
            }}
          </p>
          <Row class="margin-top-10">
            <i-col span="12" class="mar-top-10">
              <label>姓名：</label>
              <Input
                v-model="custName"
                :disabled="disabled"
                style="width: 200px"
              />
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>账号：</label>
              <Input
                v-model="certNo"
                :disabled="disabled || updateFlag"
                style="width: 200px"
                maxlength="18"
              />
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>手机号：</label>
              <Input
                v-model="mobile"
                :disabled="disabled"
                style="width: 200px"
                maxlength="18"
              />
            </i-col>
            <i-col span="12" class="mar-top-10">
              <label>用户类型：</label>
              <Select
                v-model="userType"
                class="width-200"
                label-in-value
                :disabled="disabled"
              >
                <Option
                  v-for="item in userTypeList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </i-col>
            <i-col span="24">
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
import { platformUserInsert, platformUserUpdate } from '@/api/user'
import { mapGetters } from 'vuex'
// import { checkID } from '@/libs/util'

export default {
  name: 'searchable-table',
  data() {
    return {
      custName: '',
      certNo: '',
      mobile: '',
      userType: '',
      disabled: false,
      updateFlag: false,
      popTitle: '您确认增加当前用户吗？',
      merchName: '',
      merchId: '',
      merchChargeId: '', // 列表查询返回
      merchCharge: '', // 列表查询返回
      userTypeList: [
        {
          label: '商户',
          value: '03'
        },
        {
          label: '平台',
          value: '02'
        },
        {
          label: '财务',
          value: '04'
        }
      ]
    }
  },
  mounted() {
    const beforePageData = this.$route.query
    if (beforePageData.flag !== 'add') {
      if (beforePageData.flag === 'detail') {
        this.disabled = true
      } else {
        this.updateFlag = true
        this.popTitle = '您确认更新当前平台负责人信息吗？'
      }
      this.custName = beforePageData.params.loginName
      this.certNo = beforePageData.params.loginNo
      this.mobile = beforePageData.params.mobile
      this.userType = beforePageData.params.userType
    }
  },
  methods: {
    returnLastPage() {
      this.$router.go(-1)
    },
    addMerchantManage() {
      if (!this.custName) {
        this.$Message.error({
          content: '请输入企业负责人姓名'
        })
        return
      }
      if (!this.updateFlag && !this.certNo) {
        this.$Message.error({
          content: '请输入企业负责人账号码'
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
        platformUserUpdate({
          custName: this.custName,
          mobile: this.mobile,
          certNo: this.certNo,
          userType: this.userType
        }).then(res => {
          if (res.data && res.data.retCode === '00000') {
            this.$Notice.success({
              title: '提醒',
              desc: '平台用户信息更新成功'
            })
            this.returnLastPage()
          } else {
            this.$Notice.error({
              title: '提醒',
              desc: '平台用户信息更新失败'
            })
          }
        })
      } else {
        platformUserInsert({
          custName: this.custName,
          mobile: this.mobile,
          certNo: this.certNo,
          userType: this.userType
        }).then(res => {
          if (res.data && res.data.retCode === '00000') {
            this.$Notice.success({
              title: '提醒',
              desc: '用户新增成功'
            })
            this.$store.commit('setPlatformRefresh', true)
            this.returnLastPage()
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
.btn__col {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
