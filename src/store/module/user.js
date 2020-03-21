import {
  login,
  queryEnterpriseRelease,
  postionReleasePage,
  enterpriseDirectorPage,
  // eslint-disable-next-line no-unused-vars
  logout
} from '@/api/user'
import { setToken, getToken } from '@/libs/util'
// import { sessionData } from '../../libs/local'

export default {
  state: {
    userName: '',
    userId: '',
    avatarImgPath: '',
    token: getToken(),
    // token: sessionData('get', 'token'),
    access: '',
    hasGetInfo: false,
    unreadCount: 0,
    messageUnreadList: [],
    messageReadedList: [],
    messageTrashList: [],
    messageContentStore: {},
    merchInfo: {},
    allMerchList: [],
    allPositonList: [],
    allEnterpriseDirector: [],
    platformRefresh: false
  },
  mutations: {
    setAvatar(state, avatarPath) {
      state.avatarImgPath = avatarPath
    },
    setUserId(state, id) {
      state.userId = id
    },
    setUserName(state, name) {
      state.userName = name
    },
    setAccess(state, access) {
      state.access = access
    },
    setToken(state, token) {
      state.token = token
      setToken(token)
      // sessionData('set', 'token', token)
    },
    setHasGetInfo(state, status) {
      state.hasGetInfo = status
    },
    setMessageCount(state, count) {
      state.unreadCount = count
    },
    setMessageUnreadList(state, list) {
      state.messageUnreadList = list
    },
    setMessageReadedList(state, list) {
      state.messageReadedList = list
    },
    setMessageTrashList(state, list) {
      state.messageTrashList = list
    },
    updateMessageContentStore(state, { msg_id, content }) {
      state.messageContentStore[msg_id] = content
    },
    moveMsg(state, { from, to, msg_id }) {
      const index = state[from].findIndex(_ => _.msg_id === msg_id)
      const msgItem = state[from].splice(index, 1)[0]
      msgItem.loading = false
      state[to].unshift(msgItem)
    },
    setMerchInfo(state, data) {
      state.merchInfo = Object.assign({}, state.merchInfo, data)
    },
    setAllMerchList(state, data) {
      state.allMerchList = data
    },
    setAllPositonListForMerch(state, data) {
      state.allPositonList = data
    },
    setAllEnterpriseDirector(state, data) {
      state.allEnterpriseDirector = data
    },
    setPlatformRefresh(state, data) {
      state.platformRefresh = data
    }
  },
  getters: {
    messageUnreadCount: state => state.messageUnreadList.length,
    messageReadedCount: state => state.messageReadedList.length,
    messageTrashCount: state => state.messageTrashList.length,
    getCookieToken: state => state.token,
    getMerchInfo: state => state.merchInfo,
    getAllMerchList: state => state.allMerchList,
    getAllPositonForMerch: state => state.allPositonList,
    getAllEnterpriseDirector: state => state.allEnterpriseDirector,
    // eslint-disable-next-line no-unused-vars
    getEnterpriseDirectorByCharge: (state, getters) => merchChargeId => {
      return getters.getAllEnterpriseDirector.find(
        item => item.merchChargeId === merchChargeId
      )
    },
    getPlatformRefresh: state => state.platformRefresh
  },
  actions: {
    // 登录
    async handleLogin({ commit, dispatch }, { userName, password }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          loginId: userName,
          pwd: password
        })
          .then(res => {
            if (res && res.data.retCode === '00000') {
              const userInfo = res.data.data
              commit('setToken', userInfo)
              commit('setUserId', userInfo.loginNo)
              // 角色：
              // 超级管理员：所有权限
              // 平台管理员：所有权限
              // 平台用户：除过财务管理所有模块
              // 平台财务：首页、财务管理
              // 企业管理员：首页（企业职位统计、职位报名实到统计）、职位管理、企业管理（企业负责人维护、企业充值维护）
              dispatch('requestAllMerchInfo')
              if (userInfo.userType === '00') {
                commit('setAccess', ['00', '01', '02', '03'])
              } else if (userInfo.userType === '01') {
                commit('setAccess', ['01'])
              } else if (userInfo.userType === '03') {
                commit('setAccess', ['03'])
              } else if (userInfo.userType === '02') {
                commit('setAccess', ['02'])
              }
              commit('setHasGetInfo', true)
              resolve(res)
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    // 退出登录
    // eslint-disable-next-line no-unused-vars
    handleLogOut({ state, commit }) {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        // logout(state.token)
        //   .then(() => {
        commit('setToken', '')
        commit('setAccess', [])
        resolve()
        // })
        // .catch(err => {
        // reject(err)
        // })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },
    // 获取企业相关信息
    async requestAllMerchInfo({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          // eslint-disable-next-line no-undef
          queryEnterpriseRelease({
            pageNum: 1,
            pageSize: 100
          })
            .then(res => {
              if (res && res.data.data.list.length > 0) {
                commit('setAllMerchList', res.data.data.list)
                for (let item of res.data.data.list) {
                  if (item.merchId === state.token.loginNo) {
                    commit('setMerchInfo', item)
                    break
                  }
                }
              }
              resolve(res)
            })
            .catch(err => {
              reject(err)
            })
        } catch (error) {
          reject(error)
        }
      })
    },
    // 获取企业下所有职位信息
    // eslint-disable-next-line no-unused-vars
    async requestPostionListInfo({ state, commit }, merchId) {
      return new Promise((resolve, reject) => {
        try {
          // eslint-disable-next-line no-undef
          postionReleasePage({
            pageNum: 1,
            pageSize: 200,
            merchId
          })
            .then(res => {
              if (res && res.data.data.list.length > 0) {
                commit('setAllPositonListForMerch', res.data.data.list)
              } else {
                commit('setAllPositonListForMerch', [])
              }
              resolve(res)
            })
            .catch(err => {
              reject(err)
            })
        } catch (error) {
          reject(error)
        }
      })
    },
    // 获取企业下所有职位信息
    // eslint-disable-next-line no-unused-vars
    async requestEnterpriseDirectorInfo({ state, commit }, merchId) {
      return new Promise((resolve, reject) => {
        try {
          // eslint-disable-next-line no-undef
          enterpriseDirectorPage({
            pageNum: 1,
            pageSize: 1000,
            merchId
          })
            .then(res => {
              if (res && res.data.data.list.length > 0) {
                commit('setAllEnterpriseDirector', res.data.data.list)
              } else {
                commit('setAllEnterpriseDirector', [])
              }
              resolve(res)
            })
            .catch(err => {
              reject(err)
            })
        } catch (error) {
          reject(error)
        }
      })
    }
    // 获取用户相关信息
    // getUserInfo({ state, commit }) {
    //   return new Promise((resolve, reject) => {
    //     try {
    //       // eslint-disable-next-line no-undef
    //       getUserInfo(state.token)
    //         .then(res => {
    //           const data = res.data
    //           commit('setAvatar', data.avatar)
    //           commit('setUserName', data.name)
    //           commit('setUserId', data.user_id)
    //           commit('setAccess', data.access)
    //           commit('setHasGetInfo', true)
    //           resolve(data)
    //         })
    //         .catch(err => {
    //           reject(err)
    //         })
    //     } catch (error) {
    //       reject(error)
    //     }
    //   })
    // }
  }
}
