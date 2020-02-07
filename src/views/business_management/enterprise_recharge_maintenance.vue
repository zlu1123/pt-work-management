<template>
  <div>
    <i-col>
      <Card>
        <Row>
          <i-col span="12">
            <label>请选择企业：</label>
            <Select
              v-model="merchId"
              style="width:200px"
              clearable
              not-found-text
              :label-in-value="true"
              @on-change="chooseMerch"
              :disabled="getCookieToken.userType === '03'"
            >
              <Option
                v-for="item in merchList"
                :value="item.merchId"
                :key="item.merchId"
                >{{ item.merchName }}</Option
              >
            </Select>
          </i-col>
          <i-col span="12">
            <label>请选择职位：</label>
            <Select
              v-model="postionId"
              style="width:200px"
              clearable
              not-found-text
              :label-in-value="true"
              @on-change="choosePostion"
            >
              <Option
                v-for="item in positionList"
                :value="item.postionId"
                :key="item.postionId"
                >{{ item.postionName }}</Option
              >
            </Select>
          </i-col>
          <i-col span="24" style="margin-top: 10px">
            <!-- <Button type="primary" icon="md-add" @click="addBusinessRecharge"
              >企业充值-银行卡</Button
            > -->
            <Button
              type="primary"
              icon="md-add"
              style="margin-left: 20px"
              @click="addRechargeWechat"
              >企业充值-微信</Button
            >
          </i-col>
        </Row>
      </Card>
    </i-col>
    <i-col :span="24">
      <Card>
        <p slot="title">
          <Icon type="navicon-round"></Icon>
          企业充值记录列表
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
import { enterpiseRechargeGetQrCode } from '@/api/user'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'job-posting',
  data() {
    return {
      merchId: '',
      merchName: '',
      merchList: [],
      postionId: '',
      postionName: '',
      positionList: [],
      isShowImgModal: false,
      imageUrl: '',
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
          title: '企业充值金额',
          key: 'merchCharge',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          render: (h, params) => {
            if (this.queryDetailAuth) {
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
                      click: () => {
                        this.goDetail(params.row.id, params.row.orderType)
                      }
                    }
                  },
                  '详情'
                )
              ])
            } else {
              return null
            }
          }
        }
      ],
      orderList: []
    }
  },
  methods: {
    ...mapActions(['requestPostionListInfo']),

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

    goDetail(orderId, orderType) {
      this.$router.push({
        name: 'order-details',
        query: { orderId: orderId, orderType: orderType }
      })
    },

    addRechargeWechat() {
      enterpiseRechargeGetQrCode({
        merchId: this.merchId,
        merchName: this.merchName,
        postionName: this.postionName,
        postionId: this.postionId
      }).then(res => {
        console.log(res)
      })
    },
    async chooseMerch(item) {
      if (item && item.value) {
        this.merchId = item.value
        this.merchName = item.label
        await this.requestPostionListInfo(this.merchId)
        this.positionList = this.getAllPositonForMerch
        this.postionId = this.positionList[0].postionId
      }
    },

    choosePostion(item) {
      if (item && item.value) {
        this.postionId = item.value
        this.postionName = item.label
        if (this.exemStat) {
          // this.queryList()
        }
      } else {
        this.orderList = []
      }
    }
  },
  async mounted() {
    // var isSkip = this.$route.query.skip;
    // if(isSkip == 1){
    //     this.orderStatus = 2;
    //     this.startTime = util.formatTime(new Date(),'yy-mm-dd 00:00:00');
    //     this.endTime = util.formatTime(new Date(),'yy-mm-dd 23:59:59');
    // }else if(isSkip == 2){
    //     this.payStatus = 0;
    //     this.startTime = this.$route.query.startTime;
    //     this.endTime = this.$route.query.endTime;
    // }
    // this.queryOrderList();
    // queryEnterpriseRechargeRecords()
    if (this.getCookieToken.userType === '03') {
      this.merchId = this.getMerchInfo.merchId
      this.merchName = this.getMerchInfo.merchName
      this.merchList = [this.getMerchInfo]
    } else {
      this.merchId = this.getAllMerchList[0].merchId
      this.merchName = this.getAllMerchList[0].merchName
      this.merchList = this.getAllMerchList
    }
    await this.requestPostionListInfo(this.merchId)
    this.positionList = this.getAllPositonForMerch
    this.postionId = this.positionList[0].postionId
    this.postionName = this.positionList[0].postionName
  },

  computed: {
    ...mapGetters([
      'getCookieToken',
      'getMerchInfo',
      'getAllMerchList',
      'getAllPositonForMerch'
    ])
  }
}
</script>
