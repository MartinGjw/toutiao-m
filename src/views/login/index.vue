<template>
  <div class="login">

 <van-nav-bar title="登录"/>

 <ValidationObserver ref="form">
     <ValidationProvider name="手机号" rules="required|mobile">
        <van-field
         v-model="user.mobile"
         required
         clearable
         label="手机号"
         placeholder="请输入手机号"
        />
     </ValidationProvider>

     <ValidationProvider name="验证码" rules="required|code">
        <van-field
          v-model="user.code"
          type="password"
          label="验证码"
          placeholder="请输入验证码"
          required
        >
     <van-count-down v-if="isCountDownShow" slot="button" format="ss s" :time="1000 * 60" @finish="isCountDownShow = false" />
     <van-button v-else slot="button" size="small" type="primary" round @click="onsendcode">发送验证码</van-button>
     </van-field>
     </ValidationProvider>
</ValidationObserver>
<div class="login-btn-box">
    <van-button class="login-btn" type="info" @click="onlogin">登录</van-button>
</div>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'
import { validate } from 'vee-validate'
// import { log } from 'util'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      isCountDownShow: false
    }
  },
  methods: {
    async onlogin () {
      const success = await this.$refs.form.validate()
      if (!success) {
        // 这里加定时器的原因是因为获取验证失败的结果有延迟问题，并不是我们的原因
        setTimeout(() => {
          const errors = this.$refs.form.errors
          // forEach 无法停止
          // find 方法会遍历数组，对每个元素执行方法中的条件判定
          // const item = Object.values(errors).find(item => item[0])
          // 找到第1个有错误的字段并弹出提示
          for (let key in errors) {
            const item = errors[key]
            if (item[0]) {
              this.$toast(item[0])
              return
            }
          }
        }, 100)
        return
      }
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
    },
    async onsendcode () {
      const { mobile } = this.user
      // 2. 校验手机号是否有效
      // 参数1：要验证的数据
      // 参数2：验证规则
      // 参数3：一个可选的配置对象，例如配置错误消息字段名称 name
      // 返回值：{ valid, errors, ... }
      //          valid: 验证是否成功，成功 true，失败 false
      //          errors：一个数组，错误提示消息
      const validateResult = await validate(mobile, 'required|mobile', {
        name: '手机号'
      })
      // 如果验证失败，提示错误消息，停止发送验证码
      if (!validateResult.valid) {
        this.$toast(validateResult.errors[0])
        return
      }
      try {
        this.isCountDownShow = true
        await getSmsCode(mobile)
      } catch (err) {
        this.isCountDownShow = false

        if (err.response.status === 429) {
          this.$toast('请勿频繁发送')
          return
        }
        this.$toast('发送失败')
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
