<template>
  <div>
    <i-col>
      <Card>
        <Row>
          <label>请选择企业：</label>
          <Select
            v-model="mainTenance"
            style="width:200px"
            clearable
            not-found-text
            :label-in-value="true"
            @on-change="chooseMerch"
          >
            <Option
              v-for="item in businessList"
              :value="item.merchId"
              :key="item.merchId"
              >{{ item.merchName }}</Option
            >
          </Select>
          <Button type="primary" style="margin-left: 30px" @click="queryList"
            >查询当前企业负责人</Button
          >
          <Button
            type="primary"
            style="margin-left: 30px"
            icon="md-add"
            @click="addManageInfo"
            >当前企业负责人新增</Button
          >
        </Row>
      </Card>
    </i-col>
    <i-col :span="24">
      <Card>
        <p slot="title">
          <Icon type="navicon-round"></Icon>
          企业负责人列表
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
import {
  enterpriseDirectorPage,
  enterpriseDirectorDelete,
  queryEnterpriseRelease
} from '@/api/user'
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
      mainTenance: '',
      businessItem: '',
      businessList: [],
      orderListTitle: [
        {
          title: '序号',
          type: 'index',
          align: 'center'
        },
        {
          title: '企业名称',
          key: 'merchChargeId',
          align: 'center'
        },
        {
          title: '企业负责人',
          key: 'merchCharge',
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
                      this.deleteItem(params.row.merchId)
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
    chooseMerch(item) {
      this.mainTenance = item.value
      this.businessItem = item
    },
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

    goDetail(item, flag) {
      this.$router.push({
        path: '/business_person_add',
        query: {
          flag: flag,
          params: item
        }
      })
    },

    addManageInfo() {
      if (!this.mainTenance) {
        this.$Notice.error({
          title: '提醒',
          desc: '请先选择企业'
        })
        return
      }
      this.$router.push({
        path: '/business_person_add',
        query: {
          flag: 'add',
          params: this.businessItem
        }
      })
    },

    deleteItem(id) {
      this.$Modal.confirm({
        title: '提醒',
        content: '<p>确认删除当前企业负责人吗？</p>',
        loading: true,
        onOk: () => {
          enterpriseDirectorDelete({
            merchId: id
          }).then(res => {
            if (res.data && res.data.retCode === '00000') {
              this.$Modal.remove()
              this.$Message.info('删除成功')
              this.queryList()
            }
          })
        }
      })
    },

    getBusinessList() {
      queryEnterpriseRelease({}).then(res => {
        if (res.data) {
          if (res.data.retCode === '00000') {
            this.businessList = res.data.data
          }
        }
      })
    },

    queryList() {
      if (!this.mainTenance) {
        this.$Notice.error({
          title: '提醒',
          desc: '请先选择企业'
        })
        return
      }
      enterpriseDirectorPage({
        // merchId: this.getCookieToken.loginNo
        merchId: this.mainTenance
      }).then(res => {
        if (res.data && res.data.retCode === '00000') {
          this.orderList = res.data.data
        }
      })
    }
  },
  mounted() {
    // session loginNo
    // this.queryList()
    this.getBusinessList()
  },

  computed: {
    ...mapGetters(['getCookieToken'])
  }
}
</script>
