<template>
  <div class="home-con">
   <!-- 导航栏 -->
   <van-nav-bar title="首页"/>
   <!-- 频道列表 -->
   <van-tabs v-model="active">
     <van-tab v-for="channels in userChannels" :key="channels.id" :title="channels.name" >
       <!-- 下拉刷新时会触发 refresh 事件，在事件的回调函数中可以进行同步或异步操作，操作完成后将 v-model 设置为 false，表示加载完成。 -->
         <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
           <!-- 列表内容子组建 -->
            <Articlelist :channels="channels"></Articlelist>
         </van-pull-refresh>
     </van-tab>
   </van-tabs>
   <!-- 文章列表 -->
  </div>
</template>

<script>
import { getUserChannels } from '../../api/user'
import Articlelist from './components/article-list'
export default {
  data () {
    return {
      active: 0,
      isLoading: false,
      userChannels: []
    }
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 500)
    },
    async getchannel () {
      const { data } = await getUserChannels()
      // console.log(data.data.channels)
      this.userChannels = data.data.channels
    }
  },
  created () {
    this.getchannel()
  },
  components: {
    Articlelist
  }
}
</script>

<style lang='less' scoped>
// .warp{
//   position: fixed;
//   top:46px;
//   left: 0;
//   right: 0;
//   z-index: 1;
// }
</style>
