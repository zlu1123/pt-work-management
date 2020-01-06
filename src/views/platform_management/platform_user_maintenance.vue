<template>
  <div>
    <i-col>
      <Card>
        <Row>
          <Button type="primary" icon="md-add" @click="addJobInfo"
            >平台用户新增</Button
          >
        </Row>
      </Card>
    </i-col>
    <i-col :span="24">
      <Card>
        <p slot="title">
          <Icon type="navicon-round"></Icon>
          平台用户列表
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
import { platformUserPage } from '@/api/user'
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
          title: '平台用户名称',
          key: 'crmMerchantName',
          align: 'center'
        },
        {
          title: '平台用户ID',
          key: 'storeName'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
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
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      this.goDetail(params.row.id, params.row.orderType)
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
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
                '删除'
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
    platformUserPage()
    this.orderList = [{ crmMerchantName: 'test1' }]
  }
}
</script>
