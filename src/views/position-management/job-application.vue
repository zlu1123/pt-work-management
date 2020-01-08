<template>
  <div>
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
            :current="pageNo"
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
import { postionApplyApplyList, postionApplyApplyExam } from '@/api/user'
import { mapGetters } from 'vuex'
export default {
  name: 'job-posting',
  data() {
    return {
      payStatus: '',
      orderNum: null,
      storeName: null,
      deliveryPhone: null,
      orderStatus: '',
      orderType: '',
      startTime: null,
      endTime: null,
      spanNum: 24,
      pageNo: 1,
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
          title: '商户名称',
          key: 'merchId',
          align: 'center'
        },
        {
          title: '职位信息',
          key: 'postionId',
          align: 'center'
        },
        {
          title: '审核状态',
          key: 'exemStat',
          align: 'center',
          render: (h, params) => {
            return h('div', params.row.exemStat === '1' ? '待申请' : '申请通过')
          }
        },
        // {
        //   title: '身份证号码',
        //   key: 'certNo'
        // },
        // {
        //   title: '姓名',
        //   key: 'certName',
        //   align: 'center'
        // },
        // {
        //   title: '性别',
        //   key: 'sex'
        // },
        // {
        //   title: '头像',
        //   key: 'headImage',
        //   align: 'center'
        // },
        // {
        //   title: '身高',
        //   key: 'hign',
        //   align: 'center'
        // },
        // {
        //   title: '年龄',
        //   key: 'age',
        //   align: 'center'
        // },
        {
          title: '审核',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            // if (params.row.exemStat === '1') {
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
            // }
          }
        }
      ]
    }
  },
  methods: {
    goToPage(val) {
      // 获取当前页
      this.pageNo = val
      // this.queryOrderList()
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
      this.pageNo = 1
      this.queryOrderList()
    },
    getMaxRows(val) {
      // 获取当前页最大条数
      this.maxRows = val
      this.queryOrderList()
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
          postionApplyApplyExam(applyUserId, postionApplyId, flag)
        }
      })
    },

    postionApplyApplyExam(applyUserId, postionApplyId) {
      postionApplyApplyExam({
        postionApplyId: postionApplyId
      }).then(res => {
        if (res.data && res.data.retCode === '00000') {
          this.$Modal.remove()
          this.$Message.info('审核成功')
          this.queryList()
        }
      })
    },

    queryList() {
      postionApplyApplyList({
        merchId: this.getCookieToken.loginNo
      }).then(res => {
        // { applyExemStat: 1 }
        this.orderList = res.data.data
      })
    }
  },
  mounted() {
    this.queryList()
  },
  computed: {
    ...mapGetters(['getCookieToken'])
  }
}
</script>
