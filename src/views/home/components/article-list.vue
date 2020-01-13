<template>
 <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
  <!-- List 组件通过loading和finished两个变量控制加载状态，当组件滚动到底部时，
  会触发load事件并将loading设置成true。此时可以发起异步操作并更新数据，数据更新完毕后，
  将loading设置成false即可。若数据已全部加载完毕，则直接将finished设置成true即可。 -->
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
     >
          <van-cell
           v-for="(article,index) in list"
           :key="index"
           :title="article.title"
          />
      </van-list>
</van-pull-refresh>
</template>

<script>
import { getArticles } from '../../../api/article'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      isLoading: false
    }
  },
  props: {
    channels: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onRefresh () {
      const { data } = await getArticles({
        channel_id: this.channels.id,
        timestamp: Date.now(),
        with_top: 1
      })
      const { results } = data.data
      this.list.shift(...results)
      this.isLoading = false
      this.$toast(`更新了${results.length}条数据`)
      // setTimeout(() => {
      //   this.isLoading = false
      //   this.count++
      // }, 500)
    },
    async onLoad () {
      const { data } = await getArticles({
        channel_id: this.channels.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      const results = data.data.results
      this.list.push(...results)
      // console.log(this.list)

      // 异步更新数据
      //   setTimeout(() => {
      //     for (let i = 0; i < 10; i++) {
      //       this.list.push(this.list.length + 1)
      //     }
      //     // 加载状态结束
      this.loading = false
      //     // 数据全部加载完成
      //     if (this.list.length >= 40) {
      //       this.finished = true
      //     }
      //   }, 500)
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style>

</style>
