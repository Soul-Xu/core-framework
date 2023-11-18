import axios from "axios"

const baseApi = process.env.NEXT_PUBLIC_API_BASE

// 统一请求方式
// 发起一个post请求
// axios({
//   method: 'post',
//   url: '/user/12345',
//   data: {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
//   }
// })

// get请求
const getRequest = async (params) => {
  try {
    const response = await axios.get(params.url, {params: params.query})
    return response
  } catch (error) {
    console.error(error)
  }
}

// post请求
const postRequest = async (params) => {
  try {
    const response = await axios.post(params.url, {params: params.query})
    return response
  } catch (error) {
    console.error(error)
  }
}

// put请求
const putRequest = async (params) => {
  try {
    const response = await axios.put(params.url, {params: params.query})
    return response
  } catch (error) {
    console.error(error)
  }
}

// delete请求
const deleteRequest = async (params) => {
  try {
    const response = await axios.delete(params.url, {params: params.query})
    return response
  } catch (error) {
    console.error(error)
  }
}

// all请求 - 处理并发请求
const allRequest =async (params) => {
  Promise.all(params).then(() => (results) => {
    return results
  }) 
}

export {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  allRequest
}