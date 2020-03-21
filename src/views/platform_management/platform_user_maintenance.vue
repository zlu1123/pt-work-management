<template>
  <div>
    <i-col>
      <Card>
        <Row>
          <Button type="primary" icon="md-add" @click="addPlatformInfo"
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
import { platformUserPage } from '@/api/user'
export default {
  name: 'platform_user_maintenance',
  data() {
    return {
      pageNum: 1,
      maxRows: 10,
      pageSize: [10, 20, 30, 50],
      totalCount: 0,
      orderListTitle: [
        {
          title: '序号',
          // type: 'index',
          width: 70,
          align: 'center',
          render: (h, params) => {
            let pageNo = this.pageNum
            let maxRows = this.maxRows
            let index = params.index
            let showIndex = (pageNo - 1) * maxRows + index + 1
            return h('div', showIndex)
          }
        },
        {
          title: '平台用户名称',
          key: 'loginName',
          align: 'center'
        },
        {
          title: '平台用户类型',
          key: 'userType',
          align: 'center',
          render: (h, params) => {
            return h('div', this.getUserType(params.row.userType))
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
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
    getUserType(userType) {
      let typeName = ''
      switch (userType) {
        case '00':
          typeName = '系统管理员'
          break
        case '01':
          typeName = '务工'
          break
        case '03':
          typeName = '商户'
          break
        case '02':
          typeName = '平台'
          break
        case '04':
          typeName = '财务'
          break
        default:
          break
      }
      return typeName
    },
    goToPage(val) {
      // 获取当前页
      this.pageNum = val
      this.queryPlatformUser()
    },

    queryOrderInfo() {
      // 查询按钮
      this.pageNum = 1
      this.queryPlatformUser()
    },
    getMaxRows(val) {
      // 获取当前页最大条数
      this.maxRows = val
      this.queryPlatformUser()
    },

    goDetail(item, flag) {
      this.$router.push({
        path: '/platform_user_maintenance_add',
        query: {
          flag: flag,
          params: item
        }
      })
    },

    addPlatformInfo() {
      this.$router.push({
        path: '/platform_user_maintenance_add',
        query: {
          flag: 'add'
        }
      })
    },

    getNoAdminUser(list) {
      let arrayList = []
      if (list && list.length > 0) {
        for (let item of list) {
          if (item.userType !== '00') {
            arrayList.push(item)
          }
        }
      }
      return arrayList
    },

    queryPlatformUser() {
      platformUserPage({
        pageNum: this.pageNum,
        pageSize: this.maxRows
      }).then(res => {
        if (res && res.data.retCode === '00000') {
          this.totalCount = res.data.data.total
          this.orderList = this.getNoAdminUser(res.data.data.list)
        }
      })
    }
  },
  mounted() {
    this.queryPlatformUser()
  },

  beforeRouteEnter(to, from, next) {
    // ...
    if (from.path === '/platform_user_maintenance_add') {
      next(vm => {
        vm.pageNum = 1
        vm.queryPlatformUser()
      })
    }
    next()
  }
}
</script>
