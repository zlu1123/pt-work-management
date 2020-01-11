<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <!-- <p class="login-tip">请输入用户和密码</p> -->
          <Checkbox class="login-check-box" v-model="check">记住密码</Checkbox>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  data() {
    return {
      check: true
    }
  },
  methods: {
    ...mapActions(['handleLogin']),
    handleSubmit({ userName, password }) {
      // password = this.$md5(password)
      this.handleLogin({ userName, password }).then(res => {
        if (res && res.data.retCode === '00000') {
          if (this.check) {
            this.$sessionData('set', 'userInfo', { userName, password })
            this.$localData('set', 'userInfo', { userName, password })
          }
        }
        this.$router.push({
          name: this.$config.homeName
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import './login.less';
</style>
