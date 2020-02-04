<template>
  <div>
    <i-col v-if="getCookieToken.userType !== '03'">
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
import { queryEnterpriseRelease, enterpriseManageDelete } from '@/api/user'
// import { formatDateTime } from '@/libs/util'
import config from '@/config'
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
      pageNum: 1,
      maxRows: 10,
      pageSize: [10, 20, 30, 50],
      totalCount: 0,
      imageUrl: '',
      isShowImgModal: false,
      orderListTitle: [
        {
          title: '序号',
          type: 'index',
          width: 50,
          align: 'center'
        },
        {
          title: '企业名称',
          key: 'merchName',
          align: 'center'
        },
        {
          title: '企业邮箱',
          key: 'merchEmail',
          align: 'center'
        },
        // {
        //   title: '企业创建时间',
        //   key: 'createTime',
        //   width: 180,
        //   align: 'center',
        //   render: (h, params) => {
        //     return h('div', formatDateTime(params.row.createTime))
        //   }
        // },
        {
          title: '企业LOGO',
          key: 'merchImg',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Img', {
                attrs: {
                  src: config.baseUrl.imgUrl + params.row.merchImg
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
                    this.imageUrl = config.baseUrl.imgUrl + params.row.merchImg
                    if (
                      this.imageUrl != '' ||
                      this.imageUrl != null ||
                      this.imageUrl != undefined
                    ) {
                      this.showImgModal()
                    }
                  }
                }
              })
            ])
          }
        },
        {
          title: '企业地址',
          key: 'merchAddr',
          align: 'center'
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
    //点击图片显示
    showImgModal() {
      this.isShowImgModal = true
    },
    goToPage(val) {
      // 获取当前页
      this.pageNum = val
      this.getListInfo()
    },

    queryOrderInfo() {
      // 查询按钮
      this.pageNum = 1
      this.getListInfo()
    },
    getMaxRows(val) {
      // 获取当前页最大条数
      this.maxRows = val
      this.getListInfo()
    },

    deleteItem(id) {
      this.$Modal.confirm({
        title: '提醒',
        content: '<p>确认删除当前企业吗？</p>',
        loading: true,
        onOk: () => {
          enterpriseManageDelete({
            merchId: id
          }).then(res => {
            if (res.data && res.data.retCode === '00000') {
              this.$Modal.remove()
              this.$Message.info('删除成功')
              this.getListInfo()
            }
          })
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
      queryEnterpriseRelease({
        pageNum: this.pageNum,
        pageSize: this.maxRows
      }).then(res => {
        if (res.data) {
          if (res.data.retCode === '00000') {
            if (this.getCookieToken.userType !== '03') {
              this.totalCount = res.data.data.total
              this.orderList = res.data.data.list
            } else {
              this.totalCount = 1
              this.orderList = this.getMerchInfo(res.data.data.list)
            }
          }
        }
      })
    },

    getMerchInfo(list) {
      let newArray = []
      for (let item of list) {
        if (item.merchId === this.getCookieToken.loginNo) {
          this.$store.commit('setMerchInfo', item)
          newArray.push(item)
          break
        }
      }
      return newArray
    }
  },
  mounted() {
    this.getListInfo()
  },
  computed: {
    ...mapGetters(['getCookieToken'])
  }
}
</script>
