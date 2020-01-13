import request from '../utils/request'
// 联想
export const getSuggestions = q => {
  return request({
    method: 'get',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
// 搜索结果
export const getSearch = params => {
  return request({
    method: 'get',
    url: '/app/v1_0/search',
    params
  })
}
