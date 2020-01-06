<template>
  <div>
    <Row :gutter="10">
      <i-col span="24">
        <Card>
          <Row>
            <div style="margin-top: 10px;">
              <span>分销人员</span>
              <Select
                v-model="supplierId"
                style="width:200px;margin-left:5px;margin-right: 5px;"
                clearable
                filterable
              >
                <Option
                  v-for="item in supplierIdList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
              <Button type="primary" @click="queryInfo">查询</Button>
            </div>
          </Row>
        </Card>
      </i-col>
    </Row>
    <Row :gutter="10" class="margin-top-5">
      <i-col :span="24">
        <Card>
          <Row style="overflow: auto;height: 580px;" class="margin-top-5 ">
            <Table
              highlight-row
              style="min-width: 800px;"
              border
              :columns="orderInfoTitle"
              :data="orderInfoList"
            ></Table>
          </Row>
          <div style="border: 1px solid #e9eaec; padding: 5px;">
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
    </Row>
  </div>
</template>

<script>
export default {
  name: 'searchable-table',
  data() {
    return {
      orderStatus: null, //订单状态
      merchantName: null, //商户名称
      orderNumber: null, //订单编号
      storeName: null, //下单门店名称
      supplierId: null, //供应商ID
      payType: null, //支付类型
      orderType: null, //订单类型
      deliveryPhone: null, //收货电话
      selectionList: [], //已选择项
      currentSelect: null, //当前选择项
      isShowModal: false, //是否显示model
      loading: true,
      supplierIdList: [],
      orderInfoTitle: [
        {
          title: '序号',
          key: 'index',
          width: 90,
          align: 'center',
          render: (h, params) => {
            var pageNo = this.pageNo
            var maxRows = this.maxRows
            var index = params.index
            var showIndex = (pageNo - 1) * maxRows + index + 1
            return h('div', null, showIndex)
          }
        },
        {
          title: '分销人员姓名',
          key: 'orderNumber',
          width: 150,
          align: 'center'
        },
        {
          title: '订单编号',
          key: 'orderNumber',
          align: 'center',
          width: 170
        },
        {
          title: '分销金额',
          key: 'merchantName',
          align: 'center',
          width: 150
        },
        {
          title: '分销日期',
          key: 'storeName',
          align: 'center'
        },
        {
          title: '支付方式',
          key: 'payType',
          align: 'center',
          render: (h, params) => {
            let result = ''
            switch (params.row.payType) {
              case 0:
                result = '未支付'
                break
              case 1:
                result = '微信'
                break
              case 2:
                result = '支付宝'
                break
              case 3:
                result = '其它'
                break
              case 4:
                result = '现金'
                break
            }
            return h('div', null, result)
          }
        },

        {
          title: '操作',
          key: 'payStatus',
          fixed: 'right',
          align: 'center',
          width: 100,
          render: h => {
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
                    click: () => {}
                  }
                },
                '详情'
              )
            ])
          }
        }
      ],
      orderInfoList: [],
      totalCount: 0,
      agentName: '',
      pageSize: [10, 20, 30, 50],
      pageNo: 1,
      maxRows: 10,
      showChildren: false,
      merchantId: '',
      storeId: '',
      currentTabs: 0
      // 查询按钮
      // 详情
    }
  },
  mounted() {},
  methods: {
    //跳转指定页（货架列表）
    goToPage(val) {
      this.pageNo = val
      this.queryOrderList()
    },
    // 获取当前页最大条数（货架列表）
    getMaxRows(val) {
      this.maxRows = val
      this.queryOrderList()
    },
    queryInfo() {
      if (this.querybtnAuth) {
        this.pageNo = 1
        this.queryOrderList()
      } else {
        return
      }
    }
  }
}
</script>

<style></style>
