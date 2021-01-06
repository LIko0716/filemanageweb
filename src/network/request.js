import axios from 'axios'
import store from '../store'
export function request(config) {
  return new Promise((resolve, reject) => {
  const instance = axios.create({
    baseURL: '/api',
    // baseURL: '192.168.10.10:1086/'
  })
  instance.interceptors.request.use(config =>{
    console.log(config);
    // 1.比如config中的一些信息不符合服务器的要求
    // 2.比如每次发送网络请求中，都希望在界面中显示一个请求的图标
    const id = localStorage.getItem('id');
    const path = decodeURIComponent(store.state.path);
    const token = localStorage.getItem('token');
    token && (config.headers.common['token']  = token);

    if(config.url =='/file/getFileList') {
      config.params= {
        id: id,
        fp: path,
      }
    }
    // 3.某些网络请求（比如登录(token)),必须携带一些特殊的信息
    return config
  }, err => {
    console.log(err);
  })

  instance.interceptors.response.use(
    response => {
      //当返回信息为未登录或者登录失效的时候重定向为登录页面
      if(response.data.code == 200 ) {
        store.state.isShow = true
      }else if(response.data.code == 204){
        store.state.isShow = false
        } else if (response.data.code == 10086 && response.url == '/login/admin/') {
          localStorage.removeItem('token')
          alert(response.data.msg)
          window.location.href="/api/login"
        }
        else if(response.data.code == 10086) {
        localStorage.removeItem('token')
        alert(response.data.msg)
        location.reload()
      }
      return response;
    },
    error => {
      return Promise.reject(error)
    }
  )





  instance(config) 
    .then(res => {
      resolve(res)
    })
    .catch(err => {
      reject(err)
    })
  })
}