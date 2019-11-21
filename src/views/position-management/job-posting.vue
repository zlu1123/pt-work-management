<template>
    <div>
        <Col>
            <Card>
                <Row>
                    <Button type="primary" icon="md-add" @click="addJobInfo">新增</Button>
                </Row>
            </Card>
        </Col>
        <Col :span="24">
            <Card>
                <p slot="title">
                    <Icon type="navicon-round"></Icon>
                    职位发布列表
                </p>
                <div style="overflow: auto;height: 540px;" class="margin-top-5">
                    <!-- // <Table style="min-width: 1000px;" v-if="!queryDetailAuth" highlight-row  border :columns="orderListTitle1" :data="orderList"></Table>
                    // <Table style="min-width: 1000px;" v-if="queryDetailAuth" highlight-row  border :columns="orderListTitle" :data="orderList"></Table> -->
                    <Table style="min-width: 1000px;" highlight-row  border :columns="orderListTitle" :data="orderList"></Table>
                </div>
                <div style="border: 1px solid #e9eaec; padding: 10px;">
                    <Page :total="totalCount" :current="pageNo" show-total show-elevator show-sizer :page-size-opts="pageSize" @on-change="goToPage" @on-page-size-change="getMaxRows"></Page>
                </div>
            </Card>
        </Col>
    </div>
</template>

<script>
// import apiUrl from  '../../libs/request_path.js';
import util from  '../../libs/util.js';
import Cookies from 'js-cookie';
export default {
    name: 'job-posting',
    data () {
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
                    width: 70,
                    align: 'center'
                },
                {
                    title: '订单编号',
                    key: 'orderNumber',
                    width: 180,
                    align: 'center'
                },
                {
                    title: '商户名称',
                    key: 'crmMerchantName',
                    width: 150,
                    align: 'center'
                },
                {
                    title: '下单门店',
                    key: 'storeName',
                    width: 150
                },
                {
                    title: '订单类型',
                    key: 'orderType',
                    width: 100,
                    align: 'center',
                    render: (h, params) => {
                        return h('div',this.orderTypeStr(params.row.orderType));
                    }
                },
                {
                    title: '收货地址',
                    key: 'deliveryAddress',
                    width: 280
                },
                {
                    title: '收货电话',
                    key: 'deliveryPhone',
                    width: 115,
                    align: 'center'
                },
                {
                    title: '下单时间',
                    key: 'createTime',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div',util.formatTime(params.row.createTime,'yy-mm-dd hh:mm:ss'));
                    }
                },
                {
                    title: '订单金额',
                    key: 'orderAmount',
                    align: 'right',
                    width: 100,
                    render: (h, params) => {
                        return h('div',util.toFixed(params.row.orderAmount));
                    }
                },
                {
                    title: '实收金额',
                    key: 'payAmount',
                    align: 'right',
                    width: 100,
                    render: (h, params) => {
                        return h('div',util.toFixed(params.row.payAmount));
                    }
                },
                {
                    title: '支付方式',
                    key: 'payType',
                    align: 'center',
                    width: 85,
                    render: (h, params) => {
                        return h('div',this.payTypeStr(params.row.payType));
                    }
                },
                {
                    title: '支付状态',
                    key: 'payStatus',
                    align: 'center',
                    width: 85,
                    render: (h, params) => {
                        return h('div',this.payStatusStr(params.row.payStatus));
                    }
                },
                {
                    title: '订单状态',
                    key: 'orderStatus',
                    align: 'center',
                    width: 95,
                    render: (h, params) => {
                        return h('div',this.orderStatusStr(params.row.orderStatus));
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 100,
                    align: 'center',
                    render: (h, params) => {
                    	if(this.queryDetailAuth){
                    		return h('div', [
	                            h('Button', {
	                                props: {
	                                    type: 'primary',
	                                    size: 'small'
	                                },
	                                style: {
	                                    marginRight: '0px'
	                                },
	                                on: {
	                                    click: () => {
	                                        this.goDetail(params.row.id,params.row.orderType)
	                                    }
	                                }
	                            }, '详情'),
	
	                        ]);
                    	}else{
                    		return null;
                    	}
                    }
                }
            ],
            orderListTitle1: [
                {
                    title: '序号',
                    type: 'index',
                    width: 70,
                    align: 'center'
                },
                {
                    title: '订单编号',
                    key: 'orderNumber',
                    width: 180,
                    align: 'center'
                },
                {
                    title: '商户名称',
                    key: 'crmMerchantName',
                    width: 150,
                    align: 'center'
                },
                {
                    title: '下单门店',
                    key: 'storeName',
                    width: 150
                },
                {
                    title: '订单类型',
                    key: 'orderType',
                    width: 100,
                    align: 'center',
                    render: (h, params) => {
                        return h('div',this.orderTypeStr(params.row.orderType));
                    }
                },
                {
                    title: '收货地址',
                    key: 'deliveryAddress',
                    width: 280
                },
                {
                    title: '收货电话',
                    key: 'deliveryPhone',
                    width: 115,
                    align: 'center'
                },
                {
                    title: '下单时间',
                    key: 'createTime',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div',util.formatTime(params.row.createTime,'yy-mm-dd hh:mm:ss'));
                    }
                },
                {
                    title: '订单金额',
                    key: 'orderAmount',
                    align: 'right',
                    width: 100,
                    render: (h, params) => {
                        return h('div',util.toFixed(params.row.orderAmount));
                    }
                },
                {
                    title: '实收金额',
                    key: 'payAmount',
                    align: 'right',
                    width: 100,
                    render: (h, params) => {
                        return h('div',util.toFixed(params.row.payAmount));
                    }
                },
                {
                    title: '支付方式',
                    key: 'payType',
                    align: 'center',
                    width: 85,
                    render: (h, params) => {
                        return h('div',this.payTypeStr(params.row.payType));
                    }
                },
                {
                    title: '支付状态',
                    key: 'payStatus',
                    align: 'center',
                    width: 85,
                    render: (h, params) => {
                        return h('div',this.payStatusStr(params.row.payStatus));
                    }
                },
                {
                    title: '订单状态',
                    key: 'orderStatus',
                    align: 'center',
                    width: 95,
                    render: (h, params) => {
                        return h('div',this.orderStatusStr(params.row.orderStatus));
                    }
                },
            ],
            orderList: [],
            payStatusList: [
                {
                    value: 0,
                    label: '未支付'
                },
                {
                    value: 1,
                    label: '已支付'
                }
            ],
            orderStatusList: [
                {
                    value: 2,
                    label: '审核成功'
                },
                {
                    value: 3,
                    label: '下单完成'
                },
                {
                    value: 4,
                    label: '已拣货'
                },
                {
                    value: 5,
                    label: '配送中'
                },
                {
                    value: 6,
                    label: '已完成'
                },
                {
                    value: 7,
                    label: '车销'
                }
            ],
            orderTypeList: [
            	{
                    value: 1,
                    label: '旧模式'
                },
                {
                    value: 2,
                    label: '集市模式'
                },
                {
                    value: 3,
                    label: '小店模式'
                },
                {
                    value: 4,
                    label: '业务员模式'
                }
            ],
            authStatus: true,
            // queryDetailAuth: util.showThisRouteNew('business:zhOrder:getZhOrderInfoById', JSON.parse(Cookies.get('access'))),
        };
    },
    methods: {
        goToPage(val){ // 获取当前页
            this.pageNo = val
            // this.queryOrderList()
        },
        payStatusStr(val){ // 转义支付状态
            if(val == 0){
                return '未支付'
            } else if(val == 1){
                return '已支付'
            }
        },
        payTypeStr(val){ // 转义 支付类型
            if(val == 0){
                return ''
            } else if(val == 1){
                return '微信'
            } else if(val == 2){
                return '支付宝'
            } else if(val == 3){
                return '其它'
            } else if(val == 4){
                return '现金'
            }
        },
        orderTypeStr(val){ // 转义订单类型
            if(val == 1){
                return '旧模式'
            } else if(val == 2){
                return '集市模式'
            } else if(val == 3){
                return '小店模式'
            } else if(val == 4){
            	return '业务员模式'
            }
        },
        orderStatusStr(val){// 转义订单状态
            if(val == 0){
                return '审核失败'
            } else if(val == 1){
                return '审核中'
            } else if(val == 2){
                return '审核成功'
            } else if(val == 3){
                return '下单成功'
            } else if(val == 4){
                return '已拣货'
            } else if(val == 5){
                return '配送中'
            } else if(val == 6){
                return '已完成'
            } else if(val == 7){
                return '车销'
            }
        },
        queryOrderInfo(){// 查询按钮
            this.pageNo = 1
            this.queryOrderList()
        },
        getMaxRows(val){ // 获取当前页最大条数
            this.maxRows = val
            this.queryOrderList()
        },
        queryOrderList(){// 查询订单列表
            var that = this;
            var qs = require('qs');
            util.ajax.post(apiUrl.orderListApi, qs.stringify({
                pageNo: that.pageNo,
                maxRows: that.maxRows,
                storeName: that.storeName,
                orderNum: that.orderNum,
                startTime: util.formatTime(that.startTime,'yy-mm-dd hh:mm:ss'),
                endTime: util.formatTime(that.endTime,'yy-mm-dd hh:mm:ss'),
                accessToken: Cookies.get("accessToken"),
                orderType: that.orderType,
                orderStatus: that.orderStatus,
                deliveryPhone: that.deliveryPhone,
                payStatus: that.payStatus,
                goodsName: that.goodsName
            })).then(function (response) {
                var result = response.data;
                if(result.statusCode == 200){
                    that.orderList = result.children.results;
                    that.totalCount = result.children.totalCount;
                }else{
                    that.$Message.info(result.message);
                }
            }).catch(function (response) {
                that.$Message.info("系统错误!");
            });
        },
        goDetail (orderId, orderType) {
            this.$router.push({name: 'order-details',query: {orderId: orderId, orderType: orderType}})
        },

        addJobInfo() {
            this.$router.push({
                path: "/job_add"
            })
        }
    },
    mounted () {
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
    }
};
</script>