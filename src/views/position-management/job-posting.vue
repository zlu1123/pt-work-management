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
          <!-- // <Table style="min-width: 1000px;" v-if="!queryDetailAuth" highlight-row  border :columns="orderListTitle1" :data="orderList"></Table>
                    // <Table style="min-width: 1000px;" v-if="queryDetailAuth" highlight-row  border :columns="orderListTitle" :data="orderList"></Table> -->
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
import { queryPosition } from '@/api/user'
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
          key: 'crmMerchantName',
          align: 'center'
        },
        {
          title: '职位名称',
          key: 'storeName'
        },
        {
          title: '职位类型',
          key: 'orderType',
          align: 'center',
          render: (h, params) => {
            return h('div', this.orderTypeStr(params.row.orderType))
          }
        },
        {
          title: '职位福利',
          key: 'deliveryAddress'
        },
        {
          title: '职位要求：',
          key: 'deliveryPhone',
          width: 115,
          align: 'center'
        },
        {
          title: '工作开始日期：',
          key: 'payType',
          align: 'center',
          render: (h, params) => {
            return h('div', this.payTypeStr(params.row.payType))
          }
        },
        {
          title: '工作结束日期：',
          key: 'payStatus',
          align: 'center',
          render: (h, params) => {
            return h('div', this.payStatusStr(params.row.payStatus))
          }
        },
        {
          title: '上班打卡时间：',
          key: 'orderStatus',
          align: 'center',
          render: (h, params) => {
            return h('div', this.orderStatusStr(params.row.orderStatus))
          }
        },
        {
          title: '下班打卡时间：',
          key: 'orderStatus',
          align: 'center',
          render: (h, params) => {
            return h('div', this.orderStatusStr(params.row.orderStatus))
          }
        },
        {
          title: '单价：',
          key: 'orderStatus',
          align: 'center'
        },
        {
          title: '需求人数：',
          key: 'orderStatus',
          align: 'center'
        },
        {
          title: '结算方式：',
          key: 'orderStatus',
          align: 'center'
        },
        {
          title: '保险选择：',
          key: 'orderStatus',
          align: 'center'
        },
        {
          title: '保证金：',
          key: 'orderStatus',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          render: (h, params) => {
            if (this.queryDetailAuth) {
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
            } else {
              return null
            }
          }
        }
      ],
      orderList: [],
      payStatusList: [
        {
          value: 0,
          label: '未支付'
        },
        {
          value: 1,
          label: '已支付'
        }
      ],
      orderStatusList: [
        {
          value: 2,
          label: '审核成功'
        },
        {
          value: 3,
          label: '下单完成'
        },
        {
          value: 4,
          label: '已拣货'
        },
        {
          value: 5,
          label: '配送中'
        },
        {
          value: 6,
          label: '已完成'
        },
        {
          value: 7,
          label: '车销'
        }
      ],
      orderTypeList: [
        {
          value: 1,
          label: '旧模式'
        },
        {
          value: 2,
          label: '集市模式'
        },
        {
          value: 3,
          label: '小店模式'
        },
        {
          value: 4,
          label: '业务员模式'
        }
      ],
      authStatus: true
      // queryDetailAuth: util.showThisRouteNew('business:zhOrder:getZhOrderInfoById', JSON.parse(Cookies.get('access'))),
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
    payTypeStr(val) {
      // 转义 支付类型
      if (val == 0) {
        return ''
      } else if (val == 1) {
        return '微信'
      } else if (val == 2) {
        return '支付宝'
      } else if (val == 3) {
        return '其它'
      } else if (val == 4) {
        return '现金'
      }
    },
    orderTypeStr(val) {
      // 转义订单类型
      if (val == 1) {
        return '旧模式'
      } else if (val == 2) {
        return '集市模式'
      } else if (val == 3) {
        return '小店模式'
      } else if (val == 4) {
        return '业务员模式'
      }
    },
    orderStatusStr(val) {
      // 转义订单状态
      if (val == 0) {
        return '审核失败'
      } else if (val == 1) {
        return '审核中'
      } else if (val == 2) {
        return '审核成功'
      } else if (val == 3) {
        return '下单成功'
      } else if (val == 4) {
        return '已拣货'
      } else if (val == 5) {
        return '配送中'
      } else if (val == 6) {
        return '已完成'
      } else if (val == 7) {
        return '车销'
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
  },
  mounted() {
    // var isSkip = this.$route.query.skip;
    // if(isSkip == 1){
    //     this.orderStatus = 2;
    //     this.startTime = util.formatTime(new Date(),'yy-mm-dd 00:00:00');
    //     this.endTime = util.formatTime(new Date(),'yy-mm-dd 23:59:59');
    // }else if(isSkip == 2){
    //     this.payStatus = 0;
    //     this.startTime = this.$route.query.startTime;
    //     this.endTime = this.$route.query.endTime;
    // }
    // this.queryOrderList();
    queryPosition()
  }
}
</script>
