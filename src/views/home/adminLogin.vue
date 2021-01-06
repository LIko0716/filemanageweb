<template>
  <div class="source" style="width:500px; margin:15% auto; text-align:center " >
    <h1 style="color: white;">后台权限管理系统</h1>
    <div style="padding:15px;background-color:white; border-radius: 8px" >
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"   >
        <h2>管理员登录</h2>
        <el-form-item  prop="name"  >
          <el-col :span="19">
            <el-input  prefix-icon="el-icon-user" v-model.number="ruleForm.name" placeholder="用户名" @keyup.enter.native="submitForm('ruleForm')"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item  prop="pass" >
          <el-col :span="19">
            <el-input prefix-icon="el-icon-suitcase-1" type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="密码" @keyup.enter.native="submitForm('ruleForm')"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item style="text-align:left;margin-left:7%;">
          <el-button icon="el-icon-mobile" type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button icon='el-icon-refresh-left' @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import {request} from '../../network/request'
export default {
  name: 'Login',
  data() {
    var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        setTimeout(() => {
          callback();
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        name: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        name: [
          { validator: checkName, trigger: 'blur' }
        ]
      },

    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          request({
            headers: {
              'Content-Type': 'application/json',
            },
              url: '/user/admin/login',
              method: 'post',
              data:JSON.stringify({userName:this.ruleForm.name,password: this.ruleForm.pass}),
          }).then(res => {
              if(res.data.code == 200) {
                localStorage.setItem('token', res.data.data)
                localStorage.setItem('admin', this.ruleForm.name)
                this.$router.replace('/login/admin')
              }else {
                alert(res.data.msg)
              }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
}
</script>

<style>
  body {
    background-color: #bac3d2 ;
  }

</style>