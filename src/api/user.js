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
