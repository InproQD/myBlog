import axios from 'axios'
import { Tool } from '@/util/tool'
const request = {
  get(url: string, input: any, success: any, failure: any) {
    return axios.get(url, { params: input }).then((result) => {
      return resultHandler(result, Promise.resolve, Promise.reject, success, failure)
    })
  },
  post(url: string, input: any, success: any, failure: any) {
    return axios.post(url, input).then((result) => {
      return resultHandler(result, Promise.resolve, Promise.reject, success, failure)
    })
  },
  put(url: string, input: any, success: any, failure: any) {
    return axios.put(url, input).then((result) => {
      return resultHandler(result, Promise.resolve, Promise.reject, success, failure)
    })
  },
  delete(url: string, input: any, success: any, failure: any) {
    return axios.delete(url, { params: input }).then((result) => {
      return resultHandler(result, Promise.resolve, Promise.reject, success, failure)
    })
  }
}

function resultHandler(result: any, resolve: any, reject: any, success: any, failure: any) {
  if (result) {
    const resultData = result.data

    if (result.status === 200) {
      if (resultData.code !== 1) {
        if (failure) {
          failure(resultData)
        }
        return Promise.reject(result.data).catch(function (reason) {
          console.log(reason)
        })
      } else {
        if (success) {
          success(resultData.data)
        }
        return Promise.resolve(resultData.data)
      }
    } else {
      if (failure) {
        failure(resultData)
      }
      return Promise.reject(result.statusText)
    }
  } else {
    return Promise.reject(new Error('')).catch((e) => {
      console.log(e)
    })
  }
}

axios.interceptors.request.use((config) => {
  const accessToken = window.localStorage.getItem('Access-Token')
  if (Tool.isNotEmpty(accessToken)) {
    config.headers.Authorization = accessToken
  }
  return config
})
export { request }
