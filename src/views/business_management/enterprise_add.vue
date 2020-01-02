<template>
  <div>
    <Row class="margin-top-10">
      <i-col>
        <Card>
          <p slot="title"><Icon type="android-create"></Icon>企业新增</p>
          <Row class="margin-top-10">
            <i-col span="24">
              <ul>
                <li>
                  <label class="label-line">企业名称：</label>
                  <Input v-model="merchName" style="width: 200px" />
                  <label class="label-line">企业负责人：</label>
                  <Input v-model="merchCharge" style="width: 200px" />
                </li>
              </ul>
              <div style="margin-top: 20px;">
                <Button type="primary" @click="addMerchant">确认</Button>
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
import { enterpriseManageInsert } from '@/api/user'

export default {
  name: 'searchable-table',
  data() {
    return {
      merchCharge: '',
      merchName: ''
    }
  },
  mounted() {},
  methods: {
    returnLastPage() {
      //   this.$router.push({ path: "/job_posting" });
      this.$router.go(-1)
    },
    addMerchant() {
      enterpriseManageInsert({
        merchName: this.merchName,
        merchCharge: this.merchCharge
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
