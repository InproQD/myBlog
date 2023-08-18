import axios from 'axios'

const request = {
  get(url, input, success, failure) {
    return axios.get(url, { params: input }).then((result) => {
      return resultHandler(result, Promise.resolve, Promise.reject, success, failure)
    })
  },
  post(url, input, success, failure) {
    return axios.post(url, input).then((result) => {
      return resultHandler(result, Promise.resolve, Promise.reject, success, failure)
    })
  },
  put(url, input, success, failure) {
    return axios.put(url, input).then((result) => {
      return resultHandler(result, Promise.resolve, Promise.reject, success, failure)
    })
  },
  delete(url, input, success, failure) {
    return axios.delete(url, { params: input }).then((result) => {
      return resultHandler(result, Promise.resolve, Promise.reject, success, failure)
    })
  }
}

function resultHandler(result, resolve, reject, success, failure) {
  if (result) {
    const resultData = result.data

    if (result.status === 200) {
      if (resultData.code !== 1) {
        if (failure) {
          failure(resultData)
        }
        return Promise.reject(result.data).catch(function (reason) {})
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
    return Promise.reject(new Error('')).catch((e) => {})
  }
}
export { request }
