<template>
  <div>
    <i-col>
      <Card>
        <Row>
          <Button type="primary" icon="md-add" @click="addBusinessRecharge"
            >企业充值-银行卡</Button
          >
          <Button
            type="primary"
            icon="md-add"
            style="margin-left: 20px"
            @click="addBusinessRecharge"
            >企业充值-微信</Button
          >
        </Row>
      </Card>
    </i-col>
    <i-col :span="24">
      <Card>
        <p slot="title">
          <Icon type="navicon-round"></Icon>
          企业充值记录列表
        </p>
        <div style="overflow: auto;height: 540px;" class="margin-top-5">
          <Table
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
import { queryEnterpriseRechargeRecords, enterpiseRecharge } from '@/api/user'
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
          align: 'center'
        },
        {
          title: '企业名称',
          key: 'merchName',
          align: 'center'
        },
        {
          title: '企业充值金额',
          key: 'merchCharge',
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

    addBusinessRecharge() {
      // this.$router.push({
      //   path: '/enterprise_add'
      // })
      enterpiseRecharge().then(res => {
        console.log(res)
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
    queryEnterpriseRechargeRecords()
  }
}
</script>
