import request from '@/utils/request'

export const sendWxCode = (code: string) => {
  return request.post('/auth/code', {
    code: code
  })
}