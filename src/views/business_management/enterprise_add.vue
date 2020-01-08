<template>
  <div>
    <Row class="margin-top-10">
      <i-col>
        <Card>
          <p slot="title">
            <Icon type="android-create"></Icon>企业{{
              disabled ? '详情' : updateFlag ? '信息修改' : '新增'
            }}
          </p>
          <Row class="margin-top-10">
            <i-col span="24">
              <ul>
                <li>
                  <label class="label-line">企业名称：</label>
                  <Input
                    :disabled="disabled"
                    v-model="merchName"
                    style="width: 200px"
                  />
                  <label class="label-line">企业负责人：</label>
                  <Input
                    :disabled="disabled"
                    v-model="merchCharge"
                    style="width: 200px"
                  />
                </li>
              </ul>
              <div style="margin-top: 20px;" v-if="!disabled">
                <Poptip
                  placement="top-start"
                  confirm
                  :title="popTitle"
                  @on-ok="addMerchant"
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
import { enterpriseManageInsert, enterpriseReleaseUpdate } from '@/api/user'

export default {
  name: 'searchable-table',
  data() {
    return {
      merchCharge: '',
      merchName: '',
      disabled: false,
      updateFlag: false,
      popTitle: '您确认增加当前企业吗？'
    }
  },
  mounted() {
    const beforePageData = this.$route.query
    if (beforePageData && Object.keys(beforePageData).length > 0) {
      if (beforePageData.flag === 'detail') {
        this.disabled = true
      } else {
        this.updateFlag = true
        this.popTitle = '您确认更新当前企业信息吗？'
      }
      this.merchName = beforePageData.params.merchName
      this.merchCharge = beforePageData.params.merchId
    }
  },
  methods: {
    returnLastPage() {
      this.$router.go(-1)
    },
    addMerchant() {
      if (this.updateFlag) {
        // 更新
        enterpriseReleaseUpdate({
          merchName: this.merchName,
          merchCharge: this.merchCharge,
          merchId: this.merchCharge
        }).then(res => {
          if (res.data && res.data.retCode === '00000') {
            this.$Notice.success({
              title: '提醒',
              desc: '企业信息更新成功'
            })
            this.$router.go(-1)
          } else {
            this.$Notice.error({
              title: '提醒',
              desc: '企业信息更新失败'
            })
          }
        })
      } else {
        // 新增
        enterpriseManageInsert({
          merchName: this.merchName,
          merchCharge: this.merchCharge
        }).then(res => {
          if (res.data && res.data.retCode === '00000') {
            this.$Notice.success({
              title: '提醒',
              desc: '企业新增成功'
            })
            this.$router.go(-1)
          }
        })
      }
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
