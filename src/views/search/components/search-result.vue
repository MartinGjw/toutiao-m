<template>
  <van-list
     v-model="loading"
     :finished="finished"
     finished-text="没有更多了"
     @load="onLoad"
   >
     <van-cell
       v-for="(item,index) in list"
       :key="index"
       :title="item.title"
     />
   </van-list>
</template>

<script>
import { getSearch } from '@/api/search'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20
    }
  },
  props: {
    q: {
      type: String,
      required: true
    }
  },
  methods: {
    async onLoad () {
      // 1. 请求获取数据
      const { data } = await getSearch({
        page: this.page,
        per_page: this.per_page,
        q: this.q
      })
      // 2. 将数据添加到列表中
      const { results } = data.data
      this.list.push(...results)
      // 3. 设置加载状态结束
      this.loading = false
      // 4. 判断数据是否加载完毕
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style>

</style>
