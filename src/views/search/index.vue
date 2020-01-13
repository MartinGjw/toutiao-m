<template>
  <div class="search-body">
   <form action="/">
       <van-search
        v-model="searchContent"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isResultShow = false"
        @input="inputsuggest"
       />
   </form>
   <!-- 搜索结果 -->
   <SearchResult v-if="isResultShow" :q="searchContent"></SearchResult>
  <!-- 联想建议 -->
  <van-cell-group v-else-if="searchContent">
      <van-cell icon="search" v-for="(item,index) in Suggestions" :key="index" @click="onSuggestionClick(item)">
      <div slot="title" v-html="heightlight(item)"></div>
      </van-cell>
  </van-cell-group>
  <!-- 历史记录 -->
  <van-cell-group v-else>
  <van-cell title="历史记录">
  <!-- 使用 right-icon 插槽来自定义右侧图标 -->
  <template v-if="isDeleteShoe">
    <span @click="searchHistoryList=[]">全部删除</span>
    &nbsp;&nbsp;
    <span @click="isDeleteShoe=false">完成</span>
  </template>
    <van-icon v-else name="delete" @click="isDeleteShoe=true" />
  </van-cell>
    <van-cell
    :title="history"
    v-for="(history,index) in searchHistoryList"
    :key="index"
    @click="onHistoryClick(history,index)">
      <van-icon v-if="isDeleteShoe"
      name="close"/>
    </van-cell>
  </van-cell-group>
  </div>
</template>

<script>
import { getSuggestions } from '@/api/search'
import SearchResult from './components/search-result'
import { getItem, setItem } from '@/utils/storage'
import { debounce } from 'lodash'
export default {
  data () {
    return {
      searchContent: '',
      isResultShow: false,
      Suggestions: [],
      isDeleteShoe: false,
      searchHistoryList: getItem('search-history') || [] // 搜索历史记录
    }
  },
  methods: {
    onHistoryClick (history, index) {
      if (this.isDeleteShoe) {
        this.searchHistoryList.splice(index, 1)
      } else {
        this.onSearch(history)
      }
    },
    heightlight (str) {
      const reg = new RegExp(this.searchContent, 'ig')
      return str.replace(reg, `<span style="color:red">${this.searchContent}</span>`)
    },
    onSearch (q) {
      this.searchContent = q
      const index = this.searchHistoryList.indexOf(this.searchContent)
      if (index !== -1) {
        this.searchHistoryList.splice(index, 1)
      }
      this.searchHistoryList.unshift(this.searchContent)
      this.isResultShow = true
    },
    inputsuggest: debounce(async function () {
      if (!this.searchContent) {
        return
      }
      const { data } = await getSuggestions(this.searchContent)
      this.Suggestions = data.data.options
    }, 400)
  },
  watch: {
    searchHistoryList (newVal) {
      setItem('search-history', newVal)
    }
  },
  components: {
    SearchResult
  }
}
</script>

<style lang="less" scoped>
.search-body{
   padding-top: 54px;
     .van-search{
         position: fixed;
         top:0;
         left: 0;
         right: 0;
         z-index: 10;
      }
}
</style>
