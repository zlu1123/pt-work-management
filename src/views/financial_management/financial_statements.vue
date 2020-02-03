<template>
  <div>echart画图</div>
</template>

<script>
import { financeReportForm } from '@/api/user'
export default {
  mounted() {
    this.requestInfo()
  },

  methods: {
    requestInfo() {
      financeReportForm().then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style></style>
