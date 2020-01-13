import request from '../utils/request'

export const getAllcannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
