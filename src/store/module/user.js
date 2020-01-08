import {
  login,
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
    messageContentStore: {}
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
    }
  },
  getters: {
    messageUnreadCount: state => state.messageUnreadList.length,
    messageReadedCount: state => state.messageReadedList.length,
    messageTrashCount: state => state.messageTrashList.length,
    getCookieToken: state => state.token
  },
  actions: {
    // 登录
    handleLogin({ commit }, { userName, password }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          loginId: userName,
          pwd: password
        })
          .then(res => {
            const userInfo = res.data.data
            commit('setToken', userInfo)
            commit('setUserId', userInfo.loginNo)
            // 角色：
            // 超级管理员：所有权限
            // 平台管理员：所有权限
            // 平台用户：除过财务管理所有模块
            // 平台财务：首页、财务管理
            // 企业管理员：首页（企业职位统计、职位报名实到统计）、职位管理、企业管理（企业负责人维护、企业充值维护）
            if (userInfo.userType === '00') {
              commit('setAccess', ['00', '01', '03'])
            } else if (userInfo.userType === '01') {
              commit('setAccess', ['01'])
            } else if (userInfo.userType === '03') {
              commit('setAccess', ['03'])
            }
            commit('setHasGetInfo', true)
            resolve(res)
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
