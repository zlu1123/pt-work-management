import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: 'login',
    data,
    method: 'post'
  })
}

export const getUserInfo = token => {
  return axios.request({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}

// eslint-disable-next-line no-unused-vars
export const logout = token => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: 'message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const insertPostionRelease = params => {
  // const data = {
  //   userName,
  //   password
  // }
  return axios.request({
    url: '/postionRelease/insert',
    data: params,
    method: 'post'
  })
}

export const postionApplyApplyList = params => {
  return axios.request({
    url: '/postionApply/applyList',
    data: params,
    method: 'post'
  })
}

export const postionApplyApplyExam = params => {
  return axios.request({
    url: '/postionApply/applyExam',
    data: params,
    method: 'post'
  })
}

// 企业列表查询
export const queryEnterpriseManage = params => {
  return axios.request({
    url: '/enterpriseManage/infoRelease/page',
    data: params,
    method: 'post'
  })
}

// 企业新增
export const enterpriseManageInsert = params => {
  return axios.request({
    url: '/enterpriseManage/infoRelease/insert',
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
    url: '/financeWageAudit/page',
    data: params,
    method: 'post'
  })
}

// 工资审核-职位工作人员工资审核
export const financeWageAudit = params => {
  return axios.request({
    url: '/financeWageAudit/audit',
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
    url: '/noticeOrAd/page',
    data: params,
    method: 'post'
  })
}

// 轮播图编辑、停用/启用
export const noticeOrAdUpdate = params => {
  return axios.request({
    url: '/noticeOrAd/update',
    data: params,
    method: 'post'
  })
}

// 轮播图新增
export const noticeOrAdInsert = params => {
  return axios.request({
    url: '/noticeOrAd/insert',
    data: params,
    method: 'post'
  })
}

// 轮播图删除
export const noticeOrAdDelete = params => {
  return axios.request({
    url: '/noticeOrAd/delete',
    data: params,
    method: 'post'
  })
}
