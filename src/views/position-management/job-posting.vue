<template>
  <div>
    <i-col>
      <Card>
        <Row>
          <Button type="primary" icon="md-add" @click="addJobInfo">新增</Button>
        </Row>
      </Card>
    </i-col>
    <i-col :span="24">
      <Card>
        <p slot="title">
          <Icon type="navicon-round"></Icon>
          职位发布列表
        </p>
        <div style="overflow: auto;height: 540px;" class="margin-top-5">
          <i-table
            style="min-width: 1000px;"
            highlight-row
            border
            :columns="orderListTitle"
            :data="orderList"
          ></i-table>
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
// import apiUrl from  '../../libs/request_path.js';
import { postionReleasePage } from '@/api/user'
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
      orderListTitle: [
        {
          title: '序号',
          type: 'index',
          width: 70,
          align: 'center'
        },
        {
          title: '商户名称',
          key: 'releasEmerchName',
          align: 'center'
        },
        {
          title: '职位名称',
          key: 'postionName'
        },
        {
          title: '职位类型',
          key: 'positiondes',
          align: 'center'
        },
        {
          title: '职位福利',
          key: 'postionWelfare'
        },
        {
          title: '职位要求',
          key: 'postionRequire',
          align: 'center'
        },
        {
          title: '工作开始日期',
          key: 'payType',
          align: 'center',
          render: (h, params) => {
            return h('div', this.payTypeStr(params.row.payType))
          }
        },
        {
          title: '工作结束日期',
          key: 'payStatus',
          align: 'center',
          render: (h, params) => {
            return h('div', this.payStatusStr(params.row.payStatus))
          }
        },
        {
          title: '上班打卡时间',
          key: 'orderStatus',
          align: 'center',
          render: (h, params) => {
            return h('div', this.orderStatusStr(params.row.orderStatus))
          }
        },
        {
          title: '下班打卡时间',
          key: 'orderStatus',
          align: 'center',
          render: (h, params) => {
            return h('div', this.orderStatusStr(params.row.orderStatus))
          }
        },
        {
          title: '单价',
          key: 'price',
          align: 'center'
        },
        {
          title: '需求人数',
          key: 'orderStatus',
          align: 'center'
        },
        {
          title: '结算方式',
          key: 'billtype',
          align: 'center'
        },
        {
          title: '保证金',
          key: 'orderStatus',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '0px'
                  },
                  on: {
                    click: () => {
                      this.goDetail(params.row.id, params.row.orderType)
                    }
                  }
                },
                '详情'
              )
            ])
          }
        }
      ],
      orderList: []
    }
  },
  methods: {
    goToPage(val) {
      // 获取当前页
      this.pageNo = val
      // this.queryOrderList()
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
  },
  mounted() {
    postionReleasePage({
      merchId: '202001060064'
      // merchId: this.getCookieToken.loginNo
    }).then(res => {
      this.orderList = res.data.data
    })
  },

  computed: {
    ...mapGetters(['getCookieToken'])
  }
}
</script>
