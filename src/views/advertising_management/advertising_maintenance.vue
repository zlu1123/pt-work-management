<template>
  <div>
    <Card>
      <Row>
        <Button type="primary" icon="md-add" @click="addAdPage"
          >轮播图新增</Button
        >
      </Row>
    </Card>
    <i-col :span="24">
      <Card>
        <p slot="title">
          <Icon type="navicon-round"></Icon>
          轮播图列表
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
    <Modal
      v-model="isShowImgModal"
      title="图片"
      @on-ok="isShowImgModal = false"
      @on-cancel="isShowImgModal = false"
      width="332"
    >
      <img
        :src="imageUrl"
        style="width: 300px; height: 400px;margin-left: auto;margin-right: auto;"
      />
    </Modal>
  </div>
</template>

<script>
import { noticeOrAdPage, noticeOrAdDelete } from '@/api/user'
import config from '@/config'
import { isNotEmpty } from '@/libs/util'
export default {
  name: 'job-posting',
  data() {
    return {
      imageUrl: '',
      isShowImgModal: false,
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
          title: '启用状态',
          key: 'status',
          align: 'center',
          render: (h, params) => {
            return h('div', params.row.status === '0' ? '停用' : '启用')
          }
        },
        {
          title: '图片',
          key: 'imgUrl',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Img', {
                attrs: {
                  src: config.baseUrl.imgUrl + params.row.imgUrl
                },
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  width: '30px',
                  height: '30px',
                  marginTop: '6px'
                },
                on: {
                  click: () => {
                    if (isNotEmpty(params.row.imgUrl)) {
                      this.isShowImgModal = true
                      this.imageUrl = config.baseUrl.imgUrl + params.row.imgUrl
                    }
                  }
                }
              })
            ])
          }
        },
        {
          title: '轮播图内容',
          key: 'info',
          align: 'center'
        },
        {
          title: '轮播图排序',
          key: 'seq',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          width: 400,
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
                    marginRight: '20px'
                  },
                  on: {
                    click: () => {
                      // 跳转到详情页面
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
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '20px'
                  },
                  on: {
                    click: () => {
                      // 跳转到编辑页面
                      this.goDetail(params.row, 'update')
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: params.row.status === '0' ? 'primary' : 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '20px'
                  },
                  on: {
                    click: () => {
                      // this.salaryReview(params.row.id, params.row.orderType)
                      // 跳转到编辑页面
                      this.changeAdStatus(params.row.id, params.row.status)
                    }
                  }
                },
                params.row.status === '0' ? '启用' : '停用'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '20px'
                  },
                  on: {
                    click: () => {
                      this.deleteItem(params.row.id)
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
      this.queryOrderList()
    },

    queryOrderInfo() {
      // 查询按钮
      this.pageNo = 1
      this.getAdList()
    },
    getMaxRows(val) {
      // 获取当前页最大条数
      this.maxRows = val
      this.getAdList()
    },

    goDetail(item, flag) {
      this.$router.push({
        path: '/advertising_maintenance_add',
        query: {
          flag,
          params: item
        }
      })
    },

    // 审核工资单
    addAdPage() {
      this.$router.push({
        path: '/advertising_maintenance_add'
      })
    },

    getAdList() {
      noticeOrAdPage({
        // "info": "",
        // "seq": "",
        pageSize: this.maxRows,
        pageNum: this.pageNo
      }).then(res => {
        if (res && res.data.retCode === '00000') {
          this.orderList = res.data.data.list
        }
      })
    },

    changeAdStatus(id, status) {
      let content = status === '0' ? '启用' : '停用'
      this.$Modal.confirm({
        title: '提醒',
        content: `<p>确认${content}当前轮播图吗？</p>`,
        loading: true,
        onOk: () => {
          noticeOrAdDelete({
            id: id,
            status: status === '0' ? '1' : '0'
          }).then(res => {
            if (res.data && res.data.retCode === '00000') {
              this.$Modal.remove()
              this.$Message.info(`${content}成功`)
              this.pageNo = 1
              this.getAdList()
            }
          })
        }
      })
    },

    deleteItem(id) {
      this.$Modal.confirm({
        title: '提醒',
        content: '<p>确认删除当前企业负责人吗？</p>',
        loading: true,
        onOk: () => {
          noticeOrAdDelete({
            id: id
          }).then(res => {
            if (res.data && res.data.retCode === '00000') {
              this.$Modal.remove()
              this.$Message.info('删除成功')
              this.pageNo = 1
              this.getAdList()
            }
          })
        }
      })
    }
  },
  mounted() {
    this.getAdList()
  }
}
</script>
