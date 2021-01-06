import Vue from 'vue'
import Vuex from 'vuex'
import {request} from '../network/request'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
        fileList: [],
        tableData: [],
        search: '',
        isShow: false,
        id: null,
        message: '123',
        loading: true,
        token: localStorage.getItem('token'),
        fileName: '',
        path: '',
        username: '123',
        index: 0,
        query:{
        },
        text: 'dasdsadsadas'
      },
  
  mutations: {
    created(state) {
      request({
        headers: {
          'Content-Type': 'application/json',
        },
        url: '/file/getFileList',
        // method: 'post',
        //  data:JSON.stringify({username:'zhangsan',password:'asd'}),
      }).then(res => {
        localStorage.removeItem('id')
        console.log(state.tableData.length);
          let index = state.tableData.length
          state.tableData.splice(0,index)
        for(let item of res.data.data) {
          state.tableData.push(item)
        }
        state.loading = false
      })
    },
    getName(state,id) {
      state.id = id
    },
    getMessage(state,message) {
      state.message = message
    },
    getPath(state,path) {
      state.path = path
    },
    getToken(state,token) {
      state.token = token
    }
  },
  getters: {
    getShow(state) {
      return state.isShow = true
    }
  }
})

export default store

