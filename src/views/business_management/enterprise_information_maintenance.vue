<template>
  <div>
    <i-col>
      <Card>
        <Row>
          <Button type="primary" icon="md-add" @click="addJobInfo"
            >企业新增</Button
          >
        </Row>
      </Card>
    </i-col>
    <i-col :span="24">
      <Card>
        <p slot="title">
          <Icon type="navicon-round"></Icon>
          企业列表
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
import { queryEnterpriseRelease } from '@/api/user'
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
          title: '企业负责人',
          key: 'merchId',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
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
                      this.goDetail(params.row, 'detail')
                    }
                  }
                },
                '详情'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      this.goDetail(params.row, 'update')
                    }
                  }
                },
                '更新'
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
                      this.async()
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

    async() {
      this.$Modal.confirm({
        title: '提醒',
        content: '<p>确认删除当前公司吗？</p>',
        loading: true,
        onOk: () => {
          setTimeout(() => {
            this.$Modal.remove()
            this.$Message.info('Asynchronously close the dialog box')
          }, 2000)
          this.getListInfo()
        }
      })
    },

    goDetail(item, flag) {
      this.$router.push({
        path: '/enterprise_add',
        query: {
          flag: flag,
          params: item
        }
      })
    },

    addJobInfo() {
      this.$router.push({
        path: '/enterprise_add'
      })
    },

    getListInfo() {
      queryEnterpriseRelease({}).then(res => {
        if (res.data) {
          if (res.data.retCode === '00000') {
            this.orderList = res.data.data
          }
        }
      })
    }
  },
  mounted() {
    this.getListInfo()
  }
}
</script>
