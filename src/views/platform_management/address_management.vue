<template> <div>地址管理</div></template>

<script>
import { addrQuery, addrMatn, addrDel } from '@/api/user'
export default {
  mounted() {
    addrQuery().then(res => {
      console.log(res)
    })
    // addrDel({
    //   province: '陕西',
    //   city: '西安',
    //   area: '未央'
    // }).then(res => {
    //   console.log(res)
    // })
  }
}
</script>

<style></style>
