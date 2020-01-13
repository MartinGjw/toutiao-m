<template>
  <div class="channelstyle">
      <van-nav-bar title="编辑列表" class="titlebar"/>
      <van-cell :border="false" title="我的频道">
          <van-button size="mini" round type="danger" plain @click="isEditShow = !isEditShow" >{{isEditShow?'完成':'编辑'}}</van-button>
      </van-cell>
      <van-grid :gutter="10">
          <!-- 图标 -->
         <van-grid-item
           v-for="(channels,index) in userChannels"
           :key="channels.id"
           @click="onUserChannelClick(index)"
         >
         <!-- 删除图标 -->
          <!-- <van-icon slot="icon" name="close" /> -->
         <span slot="text" class="text" :class="{ active: value === index }">{{ channels.name }}</span>
          <van-icon class="close-icon" slot="icon" name="close" v-show="isEditShow && index !==0"/>
         </van-grid-item>
      </van-grid>
      <van-cell title="推荐频道" :border="false" />
      <van-grid :gutter="10">
         <van-grid-item
           v-for="channel in remainningChannels"
           :key="channel.id"
           :text="channel.name"
           @click="onChannelsAdd(channel)"
         />
      </van-grid>
  </div>
</template>

<script>
import { getAllcannels } from '../../../api/cannels'
import { setItem } from '../../../utils/storage'
export default {
  data () {
    return {
      allchannels: [],
      isEditShow: false
    }
  },
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  computed: {
    remainningChannels () {
      // 剩余频道 = 所有频道 - 我的频道
      const channels = []
      // 遍历所有频道
      this.allchannels.forEach(item => {
      // 如果我的频道中不包含当前被遍历的频道，则要
        if (!this.userChannels.find(c => c.id === item.id)) {
          channels.push(item)
        }
      })
      return channels
    }
  },
  methods: {
    async loadallchannels () {
      const { data } = await getAllcannels()
      this.allchannels = data.data.channels
    //   console.log(this.allchannels)
    },
    onChannelsAdd (channel) {
      this.userChannels.push(channel)
    },
    onUserChannelClick (index) {
      // 如果是编辑状态，则删除频道
      if (this.isEditShow && index !== 0) {
        this.userChannels.splice(index, 1)
      } else {
        // 切换频道
        this.$emit('input', index)
        this.$emit('close')
      }
    }
  },
  watch: {
    userChannels () {
      setItem('user-channels', this.userChannels)
    }
  },
  created () {
    this.loadallchannels()
  }
}
</script>

<style lang="less" scoped>
.channelstyle{
    padding: 0 20px;
    .titlebar{
        background-color: #fff;
    }
}
// .min-grid{
//     position: relative;
//     .close-icon{
//         position: absolute;
//         top: -10px;
//         right: -10px;
//         font-size: 13px;
//     }
// }
  ::v-deep .van-grid-item__content {
    position: relative;
     .van-grid-item__icon-wrapper {
      position: absolute;
      top: -13px;
      right: -7px;
      z-index: 10;
      .close-icon {
        font-size: 16px;
      }
    }
  }

  .text {
    font-size: 14px;
  }
  .active {
    color: red;
  }
</style>
