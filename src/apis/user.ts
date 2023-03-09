import { appId } from '@/utils/config'
import request, { mtbirdRequest } from '@/utils/request'

export const sendWxCode = (code: string) => {
  return request.post('/auth/code', {
    code: code,
    appId: appId
  })
}

export const getThirdToken = (code: string, customerAppId: string, mtbirdAppId: string) => {
  return mtbirdRequest.post('/api/wx/third/mp/login', {customerAppId, code, mtbirdAppId})
}

export const aiThirdLogin = (token: string) => {
  return request.post('/auth/third', {token})
}