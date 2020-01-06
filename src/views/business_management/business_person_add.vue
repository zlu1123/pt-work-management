<template>
  <div>
    <Row class="margin-top-10">
      <i-col>
        <Card>
          <p slot="title"><Icon type="android-create"></Icon>企业负责人新增</p>
          <Row class="margin-top-10">
            <i-col span="12">
              <label>企业负责人姓名：</label>
              <Input v-model="merchChargeName" style="width: 200px" />
            </i-col>
            <i-col span="12">
              <label>企业负责人身份证号：</label>
              <Input v-model="certNo" style="width: 200px" />
            </i-col>
            <i-col span="24">
              <div class="btn__col">
                <Button type="primary" @click="addMerchantManage">确认</Button>
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
import { enterpriseDirectorInsert } from '@/api/user'
import { mapGetters } from 'vuex'

export default {
  name: 'searchable-table',
  data() {
    return {
      merchCharge: '',
      merchChargeName: '',
      certNo: ''
    }
  },
  mounted() {},
  methods: {
    returnLastPage() {
      this.$router.go(-1)
    },
    addMerchantManage() {
      enterpriseDirectorInsert({
        merchId: '202001060064',
        merchChargeName: this.merchChargeName,
        certNo: this.certNo
      })
    },
    cancel() {}
  },
  computed: {
    ...mapGetters('getCookieToken')
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
