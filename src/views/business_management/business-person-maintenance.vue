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
            :disabled="getCookieToken.userType === '03'"
          >
            <Option
              v-for="item in businessList"
              :value="item.merchId"
              :key="item.merchId"
              >{{ item.merchName }}</Option
            >
          </Select>
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
  enterpriseDirectorPage,
  enterpriseDirectorDelete,
  queryEnterpriseRelease
} from '@/api/user'
import { mapGetters } from 'vuex'
import { formatDateTime } from '@/libs/util'
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
      pageNum: 1,
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
          align: 'center',
          width: '60'
        },
        {
          title: '企业负责人名称',
          key: 'merchCharge',
          align: 'center'
        },
        {
          title: '企业负责人登录账号',
          key: 'loginId',
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'createTime',
          align: 'center',
          width: '180',
          render: (h, params) => {
            return h('div', formatDateTime(params.row.createTime))
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: '200',
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
                      this.deleteItem(
                        params.row.merchId,
                        params.row.merchChargeId
                      )
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
      this.pageNum = 1
      this.queryList()
    },
    goToPage(val) {
      // 获取当前页
      this.pageNum = val
      this.queryList()
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

    deleteItem(merchId, merchChargeId) {
      this.$Modal.confirm({
        title: '提醒',
        content: '<p>确认删除当前企业负责人吗？</p>',
        loading: true,
        onOk: () => {
          enterpriseDirectorDelete({
            merchId: merchId,
            merchChargeId: merchChargeId
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
            this.businessList = res.data.data.list
            this.mainTenance = res.data.data.list[0].merchId
            this.businessItem = {
              value: this.mainTenance,
              label: res.data.data.list[0].merchName
            }
            this.queryList()
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
        merchId: this.mainTenance,
        pageNum: this.pageNum,
        pageSize: this.maxRows
      }).then(res => {
        if (res.data && res.data.retCode === '00000') {
          this.totalCount = res.data.data.total
          this.orderList = res.data.data.list
        }
      })
    }
  },
  mounted() {
    if (this.getCookieToken.userType !== '03') {
      this.getBusinessList()
    } else {
      this.businessList = [this.getMerchInfo]
      this.mainTenance = this.getMerchInfo.merchId
      this.businessItem = {
        value: this.getMerchInfo.merchId,
        label: this.getMerchInfo.merchName
      }
      this.queryList()
    }
  },

  computed: {
    ...mapGetters(['getCookieToken', 'getMerchInfo'])
  }
}
</script>
