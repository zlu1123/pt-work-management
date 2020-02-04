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
import { postionReleasePage, insertPostionDelete } from '@/api/user'
import { mapGetters } from 'vuex'
import { formatDateYYYYMMDD } from '@/libs/util'
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
      orderListTitle: [
        {
          title: '序号',
          type: 'index',
          width: 70,
          align: 'center',
          fixed: 'left'
        },
        {
          title: '商户名称',
          key: 'releasEmerchName',
          align: 'center',
          fixed: 'left',
          width: '150'
        },
        {
          title: '职位名称',
          key: 'postionName',
          align: 'center',
          width: '150'
        },
        {
          title: '职位类型',
          key: 'postionType',
          align: 'center',
          width: '150',
          render: (h, params) => {
            return h('div', this.postionTypeDes(params.row.postionType))
          }
        },
        {
          title: '职位福利',
          key: 'postionWelfare',
          align: 'center',
          width: '150',
          render: (h, params) => {
            return h('div', this.getPosition(params.row.postionWelfare, 0))
          }
        },
        {
          title: '职位要求',
          key: 'postionRequire',
          align: 'center',
          width: '150',
          render: (h, params) => {
            return h('div', this.getPosition(params.row.postionRequire, 1))
          }
        },
        {
          title: '工作开始日期',
          key: 'workBeginDate',
          align: 'center',
          width: '150',
          render: (h, params) => {
            return h('div', formatDateYYYYMMDD(params.row.workBeginDate))
          }
        },
        {
          title: '工作结束日期',
          key: 'workEndDate',
          align: 'center',
          width: '150',
          render: (h, params) => {
            return h('div', formatDateYYYYMMDD(params.row.workEndDate))
          }
        },
        {
          title: '上班打卡时间',
          key: 'clockBeginDate',
          align: 'center',
          width: '150'
        },
        {
          title: '下班打卡时间',
          key: 'clockEndDate',
          align: 'center',
          width: '150'
        },
        {
          title: '单价(元/小时)',
          key: 'price',
          align: 'center',
          width: '150'
        },
        {
          title: '需求人数',
          key: 'workCount',
          align: 'center',
          width: '150'
        },
        {
          title: '结算方式',
          key: 'billtype',
          align: 'center',
          width: '150',
          render: (h, params) => {
            return h('div', this.billType(params.row.billtype))
          }
        },
        {
          title: '是否需要保证金',
          key: 'margin',
          align: 'center',
          width: '150',
          render: (h, params) => {
            return h('div', params.row.margin === '1' ? '需要' : '不需要')
          }
        },
        {
          title: '是否有保险',
          key: 'insurance',
          align: 'center',
          width: '150',
          render: (h, params) => {
            return h('div', params.row.insurance === '1' ? '有' : '没有')
          }
        },
        {
          title: '是否需要健康证',
          key: 'health',
          align: 'center',
          width: '150',
          render: (h, params) => {
            return h('div', params.row.health === '1' ? '需要' : '不需要')
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          fixed: 'right',
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
                        params.row.releasEmerch,
                        params.row.postionId
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
    getPosition(type, flag) {
      if (type) {
        let typeList = type.split(',')
        let positionWelfare = ''
        for (let i = 0; i < typeList.length; i++) {
          positionWelfare +=
            (i !== 0 ? '、' : '') +
            `${
              flag === 0
                ? this.getWelfareName(typeList[i])
                : this.getRequireName(typeList[i])
            }`
        }
        return positionWelfare
      }
    },

    getRequireName(type) {
      let name = ''
      switch (type) {
        case '01':
          name = '体力好'
          break
        case '02':
          name = '认真'
          break
        default:
          break
      }
      return name
    },

    getWelfareName(type) {
      let name = ''
      switch (type) {
        case '01':
          name = '餐补'
          break
        case '02':
          name = '五险一金'
          break
        default:
          break
      }
      return name
    },

    billType(type) {
      let billType = ''
      switch (type) {
        case '01':
          billType = '完工结'
          break
        case '02':
          billType = '次日结'
          break
        case '03':
          billType = '周结'
          break
        case '04':
          billType = '半月结'
          break
        case '05':
          billType = '月结'
          break
        default:
          break
      }
      return billType
    },
    postionTypeDes(type) {
      let postionType = ''
      switch (type) {
        case '01':
          postionType = '餐饮'
          break
        case '02':
          postionType = '快递'
          break
        case '03':
          postionType = '客房'
          break
        case '04':
          postionType = '其他'
          break
        default:
          break
      }
      return postionType
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
        path: '/job_add',
        query: {
          flag,
          params: item
        }
      })
    },

    addJobInfo() {
      this.$router.push({
        path: '/job_add'
      })
    },

    deleteItem(merchId, postionId) {
      this.$Modal.confirm({
        title: '提醒',
        content: '<p>确认删除当前职位吗？</p>',
        loading: true,
        onOk: () => {
          insertPostionDelete({
            merchId,
            postionId
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

    queryList() {
      postionReleasePage({
        merchId: this.getCookieToken.loginNo,
        pageNum: this.pageNum,
        pageSize: this.maxRows
      }).then(res => {
        this.totalCount = res.data.data.total
        this.orderList = res.data.data.list
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
