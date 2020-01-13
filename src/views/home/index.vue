<template>
  <div class="home-con">
   <!-- 导航栏 -->
   <!-- <van-nav-bar title="首页" fixed/> -->
    <div class="nav-bar">
      <div class="logo"></div>
      <van-button
        class="search-btn"
        round
        type="info"
        size="small"
        icon="search"
        @click="$router.push('/search')"
      >搜索</van-button>
    </div>
   <!-- 频道列表 -->
   <van-tabs v-model="active">
      <van-icon
      class='wap-nav'
      slot="nav-left"
      name="wap-nav"
      @click="popupchange=true"
      ></van-icon>
     <van-tab v-for="channels in userChannels" :key="channels.id" :title="channels.name" >
       <!-- 下拉刷新时会触发 refresh 事件，在事件的回调函数中可以进行同步或异步操作，操作完成后将 v-model 设置为 false，表示加载完成。 -->
         <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
           <!-- 列表内容子组建 -->
           <Articlelist :channels="channels"></Articlelist>
         <!-- </van-pull-refresh> -->
     </van-tab>
     <!-- 弹层 -->
      <van-popup
      v-model="popupchange"
      round
      closeable
      close-icon="close"
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '90%' }"
      >
      <Channeledit :user-channels="userChannels" v-model="active" @close="popupchange=false"/>
      </van-popup>
   </van-tabs>
   <!-- 文章列表 -->
  </div>
</template>

<script>
import { getUserChannels } from '../../api/user'
import Channeledit from './components/channel-edit'
import Articlelist from './components/article-list'
import { getItem } from '../../utils/storage'
export default {
  data () {
    return {
      active: 0,
      userChannels: [],
      popupchange: false
    }
  },
  methods: {
    async getchannel () {
      const UserlocalCannels = getItem('user-channels')
      if (UserlocalCannels) {
        this.userChannels = UserlocalCannels
      } else {
        const { data } = await getUserChannels()
        // console.log(data.data.channels)
        this.userChannels = data.data.channels
      }
    }
  },
  created () {
    this.getchannel()
  },
  components: {
    Articlelist,
    Channeledit
  }
}
</script>

<style lang='less' scoped>
::v-deep .van-tabs__wrap{
    position: fixed;
    top:46px;
    left: 0;
    right: 0;
    z-index: 1;
    font-size: 25px
}
.home-con{
    padding-top: 90px;
    padding-bottom: 50px;
      .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    height: 46px;
    background-color: #3196fa;
    z-index: 1;
    .logo {
      background: url("./logo.png") no-repeat;
      background-size: cover;
      width: 100px;
      height: 30px;
    }
    .search-btn {
      background-color: #5babfb;
      width: 50%;
    }
  }
    .wap-nav{
      position: fixed;
      right: 0;
      line-height: 44px;
      background: #fff;
      z-index: 3;
}
}

</style>
