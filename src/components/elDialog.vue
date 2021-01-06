<template>
<!-- 登录 -->
  <div id="div">
    <el-button icon="el-icon-switch-button" type='info'  v-show="$store.state.isShow" size="small" plain  @click="exit"></el-button>
    <!-- <a v-show="$store.state.isShow" href="#" @click="exit">退出</a> -->
    <el-button slot="trigger" icon="el-icon-switch-button" size="small" type="default"  @click="dialogFormVisible = true" v-show="!$store.state.isShow"></el-button>
    <el-dialog title="登录" :visible.sync="dialogFormVisible" center width="400px" >
      <el-form :model="form">
      <el-row type='flex' >
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-col :span="20">
            <el-input  v-model="form.name" autocomplete="off" @keyup.enter.native="dialogFormVisible1"></el-input>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row type='flex' >
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-col :span="20">
            <el-input v-model="form.passage" autocomplete="off"  @keyup.enter.native="dialogFormVisible1"></el-input> 
          </el-col>
        </el-form-item>
      </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="margin-left: 13%">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible1">确 定</el-button>
        <el-link @click="dialogFormVisible2" type="primary">注 册</el-link>
      </div>
    </el-dialog>

    <!-- ----------------------------------------- -->
    <el-dialog title="注册" :visible.sync="dialogFormVisible3" center width="400px" >
      <el-form :model="form1">
      <el-row type='flex' >
        <el-form-item label="用户名" :label-width="formLabelWidth" @keyup.enter.native="dialogFormVisible1">
          <el-col :span="20">
            <el-input  v-model="form1.name" autocomplete="off" @keyup.enter.native="dialogFormVisible1"></el-input>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row type='flex' >
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-col :span="20">
            <el-input v-model="form1.passage" autocomplete="off"></el-input> 
          </el-col>
        </el-form-item>
      </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="margin-left: 13%">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible4">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {request} from '../network/request'

export default {
  name: 'elDialog1',
  data() {
    return {
        dialogTableVisible: false,
        dialogFormVisible: false,
        dialogFormVisible3: false,
        form: {
          name: '',
          text: '欢迎你',
          passage: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        form1: {
          name: '',
          text: '欢迎你',
          passage: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
    }
  },
  methods: {
  exit() {
    request({
      url: '/user/logout',
      method: 'post'
    }).then(res => {
      this.$notify({
          title: '成功',
          message: '退出成功',
          type: 'success',
      });
      if(res.data.code == 204) {
        localStorage.removeItem('token')
      }
    })
  },
  dialogFormVisible2() {
    this.dialogFormVisible = false
    this.dialogFormVisible3 = true
  },
  dialogFormVisible4() {
    request({
          headers: {
            'Content-Type': 'application/json',
          },
            url: '/user/registry',
            method: 'post',
            data:JSON.stringify({userName:this.form1.name,password: this.form1.passage}),
          }).then(res => {
            this.dialogFormVisible3 = false
            console.log(res);
          })
  },
  dialogFormVisible1() {
        request({
          headers: {
            'Content-Type': 'application/json',
          },
            url: '/user/login',
            method: 'post',
            data:JSON.stringify({userName:this.form.name,password: this.form.passage}),
          }).then(res => {
            if(res.data.code == 200) {
              this.$store.commit('getMessage',res.data.msg)
              this.$open(res.data.code)
              console.log(this.$store.state.isShow);
              localStorage.setItem('token',res.data.data)
              this.$store.commit('getToken',localStorage.getItem('token'))
            }else {
              this.$store.commit('getMessage',res.data.msg)
              this.$open(res.data.code)
            }
          })
        return this.dialogFormVisible = false
      }
  },
}
</script>

<style>
  #div .el-dialog__body{
      height: 90px;
  }
</style>