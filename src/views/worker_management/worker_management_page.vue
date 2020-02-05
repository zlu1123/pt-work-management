<template>
  <div>
    <i-col span="24">
      <Card>
        <p slot="title">
          <Icon type="navicon-round"></Icon>
          务工人员列表
        </p>
        <i-col>
          <Card>
            <Row>
              <i-col span="24">
                <label>请选择审核状态：</label>
                <Select
                  v-model="certStat"
                  style="width:200px"
                  clearable
                  not-found-text
                  :label-in-value="true"
                  @on-change="chooseCertStat"
                >
                  <Option
                    v-for="item in certStatList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</Option
                  >
                </Select>
              </i-col>
            </Row>
          </Card>
        </i-col>
        <div style="overflow: auto;height: 540px;" class="margin-top-5">
          <Table
            style="min-width: 1000px;"
            highlight-row
            border
            :columns="orderListTitle"
            :data="orderList"
          >
            <template slot-scope="{ row }" slot="action">
              <Button
                type="primary"
                size="small"
                style="margin-right: 10px"
                @click="goDetail(row)"
                >详情</Button
              >
              <Button
                v-if="certStat === '0'"
                type="primary"
                size="small"
                style="margin-right: 10px"
                @click="confirmModel(row.userId, '1')"
                >通过</Button
              >
              <Button
                v-if="certStat === '0'"
                type="error"
                size="small"
                @click="confirmModel(row.userId, '2')"
                >拒绝</Button
              >
            </template>
          </Table>
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
import { workManageList, workerCertExem } from '@/api/user'
import config from '@/config'
import { isNotEmpty } from '@/libs/util'

export default {
  name: 'worker_management_page',
  data() {
    return {
      isShowImgModal: false,
      certStat: '0',
      certStatList: [
        {
          value: '0',
          label: '待审核'
        },
        {
          value: '1',
          label: '审核通过'
        },
        {
          value: '2',
          label: '审核不通过'
        }
      ],
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
          align: 'center',
          fixed: 'left'
        },
        {
          title: '姓名',
          key: 'custName',
          width: 100,
          align: 'center',
          fixed: 'left'
        },
        {
          title: '身份证号码',
          key: 'certNo',
          width: 180,
          align: 'center'
        },
        {
          title: '微信昵称',
          key: 'userName',
          width: 100,
          align: 'center'
        },
        // {
        //   title: '微信头像',
        //   key: 'logoAddr',
        //   width: 100,
        //   align: 'center',
        //   render: (h, params) => {
        //     return h('div', [
        //       h('Img', {
        //         attrs: {
        //           src: config.baseUrl.imgUrl + params.row.logoAddr
        //         },
        //         props: {
        //           type: 'primary',
        //           size: 'small'
        //         },
        //         style: {
        //           width: '30px',
        //           height: '30px',
        //           marginTop: '6px'
        //         },
        //         on: {
        //           click: () => {
        //             if (isNotEmpty(params.row.logoAddr)) {
        //               this.isShowImgModal = true
        //               this.imageUrl =
        //                 config.baseUrl.imgUrl + params.row.logoAddr
        //             }
        //           }
        //         }
        //       })
        //     ])
        //   }
        // },
        {
          title: '年龄',
          key: 'birthDay',
          width: 100,
          align: 'center'
        },
        {
          title: '性别',
          key: 'userSex',
          width: 70,
          align: 'center',
          render: (h, params) => {
            return h('div', null, params.row.userSex === '1' ? '男' : '女')
          }
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
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('div', params.row.isCert === '1' ? '是' : '否')
          }
        },
        {
          title: '是否健康审核',
          key: 'isHealth',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('div', params.row.isHealth === '1' ? '是' : '否')
          }
        },
        {
          title: '身份证正面照片',
          key: 'identImageAddr',
          width: 100,
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
                    if (isNotEmpty(params.row.identImageAddr)) {
                      this.isShowImgModal = true
                      this.imageUrl =
                        config.baseUrl.imgUrl + params.row.identImageAddr
                    }
                  }
                }
              })
            ])
          }
        },
        {
          title: '身份证反面照片',
          key: 'identImageAddr1',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Img', {
                attrs: {
                  src: config.baseUrl.imgUrl + params.row.identImageAddr1
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
                    if (isNotEmpty(params.row.identImageAddr1)) {
                      this.isShowImgModal = true
                      this.imageUrl =
                        config.baseUrl.imgUrl + params.row.identImageAddr1
                    }
                  }
                }
              })
            ])
          }
        },
        {
          title: '操作',
          key: 'action',
          slot: 'action',
          width: 200,
          align: 'center',
          fixed: 'right'
        }
      ]
    }
  },
  methods: {
    goToPage(val) {
      // 获取当前页
      this.pageNum = val
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
        pageSize: this.maxRows,
        certStat: this.certStat, // 0 待审核 1 通过 2 不通过
        certType: '02' //01-健康证审核  02-身份证审核
      }).then(res => {
        if (res && res.data.retCode === '00000') {
          this.totalCount = res.data.data.total
          this.orderList = res.data.data.list
        }
      })
    },

    chooseCertStat(item) {
      this.certStat = item.value
      this.pageNum = 1
      this.querWorkerList()
    },

    confirmModel(userId, flag) {
      let alertText = `<p>确认${flag === '1' ? '通过' : '拒绝'}该申请吗？</p>`
      this.$Modal.confirm({
        title: '提醒',
        content: alertText,
        loading: true,
        onOk: () => {
          this.approveApplyInfo(userId, flag)
        }
      })
    },

    approveApplyInfo(userId, flag) {
      workerCertExem({
        certStat: flag,
        userId,
        certType: '02'
      }).then(res => {
        console.log(res)
        if (res && res.data.retCode === '00000') {
          this.$Modal.remove()
          this.$Message.info('审核成功')
          this.pageNum = 1
          this.querWorkerList()
        }
      })
    }
  },
  mounted() {
    this.querWorkerList()
  }
}
</script>
