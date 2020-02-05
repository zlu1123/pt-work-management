import axios from '@/libs/api.request'

// 用户登录
export const login = ({ loginId, pwd }) => {
  const data = {
    loginId,
    pwd
  }
  return axios.request({
    url: '/user/omslogin',
    data,
    method: 'post'
  })
}

// eslint-disable-next-line no-unused-vars
export const logout = token => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

// 职位列表
export const postionReleasePage = params => {
  return axios.request({
    url: '/postionRelease/page',
    data: params,
    method: 'post'
  })
}

// 新增职位
export const insertPostionRelease = params => {
  return axios.request({
    url: '/postionRelease/insert',
    data: params,
    method: 'post'
  })
}

// 更新职位
export const postionReleaseUpdate = params => {
  return axios.request({
    url: '/postionRelease/update',
    data: params,
    method: 'post'
  })
}

// 删除职位
export const insertPostionDelete = params => {
  return axios.request({
    url: '/postionRelease/delete',
    data: params,
    method: 'post'
  })
}

// 职位申请列表
export const postionApplyApplyList = params => {
  return axios.request({
    url: '/postionApply/applyList',
    data: params,
    method: 'post'
  })
}

// 职位申请审核
export const postionApplyApplyExam = params => {
  return axios.request({
    url: '/postionApply/applyExam',
    data: params,
    method: 'post'
  })
}

// 企业列表查询
export const queryEnterpriseRelease = params => {
  return axios.request({
    url: '/enterpriseRelease/page',
    data: params,
    method: 'post'
  })
}

// 企业新增
export const enterpriseManageInsert = params => {
  return axios.request({
    url: '/enterpriseRelease/insert',
    data: params,
    method: 'post'
  })
}

// 企业信息更新
export const enterpriseReleaseUpdate = params => {
  return axios.request({
    url: '/enterpriseRelease/update',
    data: params,
    method: 'post'
  })
}

// 企业删除
export const enterpriseManageDelete = params => {
  return axios.request({
    url: '/enterpriseRelease/delete',
    data: params,
    method: 'post'
  })
}

// 企业负责人列表查询
export const enterpriseDirectorPage = params => {
  return axios.request({
    url: '/enterpriseDirector/page',
    data: params,
    method: 'post'
  })
}

// 企业负责人新增
export const enterpriseDirectorInsert = params => {
  return axios.request({
    url: '/enterpriseDirector/insert',
    data: params,
    method: 'post'
  })
}

// 企业负责人更新
export const enterpriseDirectorUpdate = params => {
  return axios.request({
    url: '/enterpriseDirector/update',
    data: params,
    method: 'post'
  })
}

// 企业负责人删除
export const enterpriseDirectorDelete = params => {
  return axios.request({
    url: '/enterpriseDirector/delete',
    data: params,
    method: 'post'
  })
}

// 职位列表查询
export const queryPosition = params => {
  return axios.request({
    url: '/common/queryPosition',
    data: params,
    method: 'post'
  })
}

// 企业充值维护-企业充值记录
export const queryEnterpriseRechargeRecords = params => {
  return axios.request({
    url: '/enterpriseRecharge/records',
    data: params,
    method: 'post'
  })
}

// 企业充值维护-企业充值-银行卡转账
export const enterpriseRechargeUnionPay = params => {
  return axios.request({
    url: '/enterpriseRecharge/unionPay',
    data: params,
    method: 'post'
  })
}

// 企业充值维护-企业充值-微信充值
export const enterpriseRechargeWeChatPay = params => {
  return axios.request({
    url: '/enterpriseRecharge/weChatPay',
    data: params,
    method: 'post'
  })
}

// 工资审核-发放工资职位列表
export const queryfinanceWageAuditPage = params => {
  return axios.request({
    url: '/finance/page',
    data: params,
    method: 'post'
  })
}

// 工资审核-职位工作人员工资审核
export const financeWageAudit = params => {
  return axios.request({
    url: '/finance/audit',
    data: params,
    method: 'post'
  })
}

// 平台充值-平台充值记录
export const queryfinanceRechargePage = params => {
  return axios.request({
    url: '/financeRecharge/page',
    data: params,
    method: 'post'
  })
}

// 平台充值-银联卡转账到平台账户
export const financeRechargeUnionPay = params => {
  return axios.request({
    url: '/financeRecharge/unionPay',
    data: params,
    method: 'post'
  })
}

// 平台充值-微信充值（预留，不计入到交付功能）
export const financeRechargeWeChatPay = params => {
  return axios.request({
    url: '/financeRecharge/weChatPay',
    data: params,
    method: 'post'
  })
}

// 财务报表
export const financeReportFormPage = params => {
  return axios.request({
    url: '/financeReportForm/page',
    data: params,
    method: 'post'
  })
}

// 轮播图列表
export const noticeOrAdPage = params => {
  return axios.request({
    url: '/noticeAd/page',
    data: params,
    method: 'post'
  })
}

// 轮播图编辑
export const noticeOrAdUpdate = params => {
  return axios.request({
    url: '/noticeAd/update',
    data: params,
    method: 'post'
  })
}

// 停用/启用
export const noticeOrAdChangeStatue = params => {
  return axios.request({
    url: '/noticeAd/changeStatue',
    data: params,
    method: 'post'
  })
}

// 轮播图新增
export const noticeOrAdInsert = params => {
  return axios.request({
    url: '/noticeAd/insert',
    data: params,
    method: 'post'
  })
}

// 轮播图删除
export const noticeOrAdDelete = params => {
  return axios.request({
    url: '/noticeAd/delete',
    data: params,
    method: 'post'
  })
}

// 务工人员列表
export const workManageList = params => {
  return axios.request({
    url: '/platformer/certExemList',
    data: params,
    method: 'post'
  })
}

// 务工人员实名认证审核
export const workerCertExem = params => {
  return axios.request({
    url: '/platformer/certExem',
    data: params,
    method: 'post'
  })
}

// 务工人员详细信息
export const workManageInfo = params => {
  return axios.request({
    url: '/worker/info',
    data: params,
    method: 'post'
  })
}

// 务工人员实名认证信息
export const workManageIdtfy = params => {
  return axios.request({
    url: '/worker/idtfy',
    data: params,
    method: 'post'
  })
}

// 平台用户列表
export const platformUserPage = params => {
  return axios.request({
    url: '/platformer/page',
    data: params,
    method: 'post'
  })
}

// 平台用户新增
export const platformUserInsert = params => {
  return axios.request({
    url: '/platformer/insert',
    data: params,
    method: 'post'
  })
}

// 平台用户更新
export const platformUserUpdate = params => {
  return axios.request({
    url: '/platformer/update',
    data: params,
    method: 'post'
  })
}

// 平台用户删除
export const platformUserDelete = params => {
  return axios.request({
    url: '/platformer/delete',
    data: params,
    method: 'post'
  })
}

// 公共图片上传
export const uploadImageUpload = params => {
  return axios.request({
    url: '/uploadImage/upload',
    data: params,
    method: 'post'
  })
}

export const uploadImageUrl = '/uploadImage/upload'

// 首页接口1
export const getIndexFirst = params => {
  return axios.request({
    url: '/common/index/page1',
    data: params,
    method: 'post'
  })
}

// 首页接口2
export const getIndexSecond = params => {
  return axios.request({
    url: '/common/index/page2',
    data: params,
    method: 'post'
  })
}

// 首页接口3
export const getIndexThird = params => {
  return axios.request({
    url: '/common/index/page3',
    data: params,
    method: 'post'
  })
}

// 首页接口4
export const getIndexFourth = params => {
  return axios.request({
    url: '/common/index/page4',
    data: params,
    method: 'post'
  })
}

// 财务报表
export const financeReportForm = params => {
  return axios.request({
    url: '/financeReportForm/page',
    data: params,
    method: 'post'
  })
}

// 职位申请查询
export const positionApplyUserList = params => {
  return axios.request({
    url: '/postionApply/positionApplyUserList',
    data: params,
    method: 'post'
  })
}

// 地址查询
export const addrQuery = params => {
  return axios.request({
    url: '/platformer/addrQuery',
    data: params,
    method: 'post'
  })
}

// 地址新增
export const addrMatn = params => {
  return axios.request({
    url: '/platformer/addrMatn',
    data: params,
    method: 'post'
  })
}

// 地址删除
export const addrDel = params => {
  return axios.request({
    url: '/platformer/addrDel',
    data: params,
    method: 'post'
  })
}

// 企业充值
export const enterpiseRecharge = params => {
  return axios.request({
    url: '/enterpise/recharge',
    data: params,
    method: 'post'
  })
}
