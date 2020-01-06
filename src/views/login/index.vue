<template>
  <div class="login">

 <van-nav-bar title="登录"/>

 <van-cell-group>
  <van-field
    v-model="user.mobile"
    required
    clearable
    label="手机号"
    placeholder="请输入手机号"
  />

  <van-field
    v-model="user.code"
    type="password"
    label="验证码"
    placeholder="请输入验证码"
    required
  >
  <van-button slot="button" size="small" type="primary">发送验证码</van-button>
  </van-field>
</van-cell-group>
<div class="login-btn-box">
    <van-button class="login-btn" type="info" @click="onlogin">登录</van-button>
</div>
  </div>
</template>

<script>
import { login } from '@/api/user'
// import { log } from 'util'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async onlogin () {
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })
      try {
        const res = await login(this.user)
        console.log(res)
        this.$toast.success('登录成功')
      } catch (err) {
        console.log('登陆失败', err)
        this.$toast.fail('登录失败，手机号或验证码错误')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login{
   .login-btn-box{
   padding: 20px;
    .login-btn{
        width:100%
    }
   }
}

</style>
