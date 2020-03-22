import HttpRequest from '@/libs/axios'
// import config from '@/config'
// const baseUrl =
//   process.env.NODE_ENV === 'development'
//     ? config.baseUrl.dev
//     : config.baseUrl.pro + '/lsgService'

// const axios = new HttpRequest(baseUrl)
const axios = new HttpRequest()
export default axios
