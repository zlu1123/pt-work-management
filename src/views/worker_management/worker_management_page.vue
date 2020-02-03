<template>
  <div>
    <i-col span="24">
      <Card>
        <p slot="title">
          <Icon type="navicon-round"></Icon>
          务工人员列表
        </p>
        <div style="overflow: auto;height: 540px;" class="margin-top-5">
          <Table
            style="min-width: 1000px;"
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
import { workManageList } from '@/api/user'
import config from '@/config'
import { isNotEmpty } from '@/libs/util'

export default {
  name: 'worker_management_page',
  data() {
    return {
      isShowImgModal: false,
      imageUrl: '',
      pageNum: 1,
      maxRows: 10,
      pageSize: [10, 20, 30, 50],
      totalCount: 0,
      orderList: [],
      orderListTitle: [
        {
          title: '序号',
          type: 'index',
          width: 70,
          align: 'center'
        },
        {
          title: '微信昵称',
          key: 'userName',
          width: 150,
          align: 'center'
        },
        {
          title: '微信头像',
          key: 'logoAddr',
          width: 180,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Img', {
                attrs: {
                  src: config.baseUrl.imgUrl + params.row.logoAddr
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
                    this.imageUrl = config.baseUrl.imgUrl + params.row.logoAddr
                    if (isNotEmpty(params.row.logoAddr)) {
                      this.isShowImgModal = true
                    }
                  }
                }
              })
            ])
          }
        },
        {
          title: '身份证号码',
          key: 'certNo',
          width: 180,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'custName',
          width: 180,
          align: 'center'
        },
        {
          title: '年龄',
          key: 'birthDay',
          width: 180,
          align: 'center'
        },
        {
          title: '性别',
          key: 'userSex',
          align: 'center',
          render: (h, params) => {
            return h('div', params.row.userSex === '1' ? '男' : '女')
          }
        },
        {
          title: '身高',
          key: 'postionId',
          width: 180,
          align: 'center'
        },
        {
          title: '籍贯',
          key: 'postionId',
          width: 180,
          align: 'center'
        },
        {
          title: '手机号',
          key: 'mainMobile',
          width: 180,
          align: 'center'
        },
        {
          title: '是否实名',
          key: 'isCert',
          width: 180,
          align: 'center',
          render: (h, params) => {
            return h('div', params.row.isCert === '1' ? '是' : '否')
          }
        },
        {
          title: '是否健康审核',
          key: 'isHealth',
          width: 180,
          align: 'center',
          render: (h, params) => {
            return h('div', params.row.isHealth === '1' ? '是' : '否')
          }
        },
        {
          title: '身份证照片',
          key: 'identImageAddr',
          width: 180,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Img', {
                attrs: {
                  src: config.baseUrl.imgUrl + params.row.identImageAddr
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
                    this.imageUrl =
                      config.baseUrl.imgUrl + params.row.identImageAddr
                    if (isNotEmpty(params.row.identImageAddr)) {
                      this.isShowImgModal = true
                    }
                  }
                }
              })
            ])
          }
        }
      ]
    }
  },
  methods: {
    goToPage(val) {
      // 获取当前页
      this.pageNo = val
      this.querWorkerList()
    },

    queryOrderInfo() {
      // 查询按钮
      this.pageNum = 1
      this.querWorkerList()
    },
    getMaxRows(val) {
      // 获取当前页最大条数
      this.maxRows = val
      this.querWorkerList()
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
    },
    querWorkerList() {
      workManageList({
        pageNum: this.pageNum,
        pageSize: this.maxRows
      }).then(res => {
        if (res && res.data.retCode === '00000') {
          this.orderList = res.data.data
        }
      })
    }
  },
  mounted() {
    this.querWorkerList()
  }
}
</script>
