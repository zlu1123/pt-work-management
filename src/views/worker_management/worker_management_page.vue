<template>
  <div>
    <i-col :span="spanNum">
      <Card>
        <p slot="title">
          <Icon type="navicon-round"></Icon>
          务工人员列表
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
    <i-col :span="24 - spanNum">
      详细内容
    </i-col>
  </div>
</template>

<script>
import { workManageList } from '@/api/user'
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
          title: '务工人员名称',
          key: 'merchId',
          width: 180,
          align: 'center'
        },
        {
          title: '年龄',
          key: 'postionId',
          width: 150,
          align: 'center'
        },
        {
          title: '性别',
          key: 'exemStat',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', params.row.exemStat === '1' ? '待申请' : '申请通过')
          }
        },
        {
          title: '身高',
          key: 'postionId',
          align: 'center'
        },
        {
          title: '籍贯',
          key: 'postionId',
          align: 'center'
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
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          render: h => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      // this.postionApplyApplyExam(
                      //   params.row.applyUserId,
                      //   params.row.postionApplyId
                      // )
                      this.spanNum = 12
                    }
                  }
                },
                '详情'
              )
            ])
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
    }
    // postionApplyApplyExam(applyUserId, postionApplyId) {
    //   postionApplyApplyExam({
    //     postionApplyId: postionApplyId
    //   })
    // }
  },
  mounted() {
    // postionApplyApplyList().then(res => {
    //   // { applyExemStat: 1 }
    //   console.log(res)
    //   this.orderList = res.data.data
    // })
    this.orderList = [
      {
        merchId: '谢明刚'
      }
    ]

    workManageList()
  }
}
</script>
