import request from '@/utils/request'

export const sendWxCode = (code: string) => {
  return request.post('/auth/code', {
    code: code,
    appId: 'wxc898274cce90a6de'
  })
}