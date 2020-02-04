<template>
  <div>
    <i-col>
      <Card>
        <Row>
          <i-col span="12">
            <label>请选择企业：</label>
            <Select
              v-model="merchId"
              style="width:200px"
              clearable
              not-found-text
              :label-in-value="true"
              @on-change="chooseMerch"
              :disabled="getCookieToken.userType === '03'"
            >
              <Option
                v-for="item in merchList"
                :value="item.merchId"
                :key="item.merchId"
                >{{ item.merchName }}</Option
              >
            </Select>
          </i-col>
          <i-col span="12">
            <label>请选择职位：</label>
            <Select
              v-model="postionId"
              style="width:200px"
              clearable
              not-found-text
              :label-in-value="true"
              @on-change="choosePostion"
              :disabled="getCookieToken.userType === '03'"
            >
              <Option
                v-for="item in positionList"
                :value="item.postionId"
                :key="item.postionId"
                >{{ item.postionName }}</Option
              >
            </Select>
          </i-col>
        </Row>
      </Card>
    </i-col>
    <i-col :span="24">
      <Card>
        <p slot="title">
          <Icon type="navicon-round"></Icon>
          职位申请人列表
        </p>
        <div style="overflow: auto;height: 540px;" class="margin-top-5">
          <Table
            style="min-width: 1000px;"
            highlight-row
            border
            :columns="orderListTitle"
            :data="orderList"
          ></Table>
        </div>
        <div style="border: 1px solid #e9eaec; padding: 10px;">
          <Page
            :total="totalCount"
            :current="pageNum"
            show-total
            show-elevator
            show-sizer
            :page-size-opts="pageSize"
            @on-change="goToPage"
            @on-page-size-change="getMaxRows"
          ></Page>
        </div>
      </Card>
    </i-col>
  </div>
</template>

<script>
import {
  postionApplyApplyExam,
  queryEnterpriseRelease,
  postionReleasePage,
  positionApplyUserList
} from '@/api/user'
import { mapGetters } from 'vuex'
export default {
  name: 'job-posting',
  data() {
    return {
      merchId: '',
      merchList: [],
      postionId: '',
      positionList: [],
      pageNum: 1,
      maxRows: 10,
      pageSize: [10, 20, 30, 50],
      totalCount: 0,
      orderList: [],
      orderListTitle: [
        {
          title: '序号',
          type: 'index',
          width: 70,
          align: 'center'
        },
        {
          title: '职位信息',
          key: 'postionName',
          align: 'center',
          fixed: 'left'
        },
        {
          title: '工作地点',
          key: 'postionAddr'
        },
        {
          title: '结算方式',
          key: 'billtype',
          align: 'center'
        },
        {
          title: '工作内容',
          key: 'positiondes'
        },
        {
          title: '位置图像',
          key: 'releasEmerchImg',
          align: 'center'
        },
        {
          title: '需求人数',
          key: 'workCount',
          align: 'center'
        },
        {
          title: '审核状态',
          key: 'exemStat',
          align: 'center',
          render: (h, params) => {
            return h(
              'div',
              params.row.applyExemStat === '1'
                ? '待审核'
                : params.row.applyExemStat === '2'
                ? '申请通过'
                : '申请拒绝'
            )
          }
        },

        {
          title: '审核',
          key: 'action',
          width: 200,
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            if (params.row.applyExemStat === '1') {
              return h('div', [
                h(
                  'Button',
                  {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '10px'
                    },
                    on: {
                      click: () => {
                        this.confirmApply(
                          params.row.applyUserId,
                          params.row.postionApplyId,
                          'is'
                        )
                      }
                    }
                  },
                  '通过'
                ),
                h(
                  'Button',
                  {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.confirmApply(
                          params.row.applyUserId,
                          params.row.postionApplyId,
                          'no'
                        )
                      }
                    }
                  },
                  '拒绝'
                )
              ])
            }
          }
        }
      ]
    }
  },
  methods: {
    goToPage(val) {
      // 获取当前页
      this.pageNum = val
      this.queryList()
    },
    payStatusStr(val) {
      // 转义支付状态
      if (val == 0) {
        return '未支付'
      } else if (val == 1) {
        return '已支付'
      }
    },

    queryOrderInfo() {
      // 查询按钮
      this.pageNum = 1
      this.queryList()
    },
    getMaxRows(val) {
      // 获取当前页最大条数
      this.maxRows = val
      this.queryList()
    },

    goDetail(orderId, orderType) {
      this.$router.push({
        name: 'order-details',
        query: { orderId: orderId, orderType: orderType }
      })
    },

    addJobInfo() {
      this.$router.push({
        path: '/job_add'
      })
    },

    confirmApply(applyUserId, postionApplyId, flag) {
      let alertText = `<p>确认${flag === 'is' ? '通过' : '拒绝'}该申请吗？</p>`
      this.$Modal.confirm({
        title: '提醒',
        content: alertText,
        loading: true,
        onOk: () => {
          this.postionApplyApplyExamMethod(applyUserId, postionApplyId, flag)
        }
      })
    },

    postionApplyApplyExamMethod(applyUserId, postionApplyId, flag) {
      postionApplyApplyExam({
        postionApplyId: postionApplyId,
        applyExemStat: flag === 'is' ? '2' : '3' // 2 通过 3 拒绝
      }).then(res => {
        if (res.data && res.data.retCode === '00000') {
          this.$Modal.remove()
          this.$Message.info('审核成功')
          this.queryList()
        }
      })
    },

    queryList() {
      let queryParams = {
        pageNum: this.pageNum,
        pageSize: this.maxRows,
        postionId: this.postionId,
        merchId: this.merchId,
        exemStat: '1'
      }
      if (this.getCookieToken.userType === '03') {
        queryParams.merchId = this.getCookieToken.loginNo
      }
      positionApplyUserList(queryParams).then(res => {
        const data = res.data.data
        if (data) {
          this.totalCount = data.total
          this.orderList = data.list
        }
      })
    },

    getBusinessList() {
      queryEnterpriseRelease({}).then(res => {
        if (res.data) {
          if (res.data.retCode === '00000') {
            this.merchList = res.data.data.list
            this.merchId = this.merchList[0].merchId
            this.queryPostionList()
          }
        }
      })
    },

    queryPostionList() {
      let queryParams = {}
      if (this.getCookieToken.userType !== '03') {
        queryParams.merchId = this.merchId
      }
      postionReleasePage(queryParams).then(res => {
        if (res.data) {
          if (res.data.retCode === '00000') {
            this.positionList = res.data.data.list
            if (this.positionList.length > 0) {
              this.postionId = res.data.data.list[0].postionId
              this.queryList()
            } else {
              this.postionId = ''
            }
          } else {
            this.positionList = []
            this.postionId = ''
          }
        } else {
          this.positionList = []
          this.postionId = ''
        }
      })
    },

    chooseMerch(item) {
      if (item && item.value) {
        this.merchId = item.value
        this.queryPostionList()
      }
    },

    choosePostion(item) {
      if (item && item.value) {
        this.postionId = item.value
        this.queryList()
      } else {
        this.orderList = []
      }
    }
  },
  mounted() {
    // this.queryList()
    this.getBusinessList()
  },
  computed: {
    ...mapGetters(['getCookieToken'])
  }
}
</script>
