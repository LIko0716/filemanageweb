<template>
<div>
      <el-dialog title="编辑" :visible.sync="dialogFormVisible" center width="400px" >
      <el-form :model="form">
      <el-row type='flex' >
        <el-form-item label="用户名" :label-width="formLabelWidth" @keyup.enter.native="dialogFormVisible1">
          <el-col :span="20">
            <el-input  v-model="form.name" autocomplete="off" @keyup.enter.native="dialogFormVisible1"></el-input>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row type='flex' >
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-col :span="20">
            <el-input v-model="form.passage" autocomplete="off"></el-input> 
          </el-col>
        </el-form-item>
      </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="margin-left: 13%">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible1">确 定</el-button>
      </div>
    </el-dialog>

    <!-- -------------------------------------------------- -->
 <el-container style="height: 500px; border: 1px solid #eee">

    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
        </el-dropdown-menu>
      </el-dropdown>
      <span>{{name}}</span>
    </el-header>
  <el-container>

  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-setting"></i>权限管理</template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="manage">用户管理</el-menu-item>
          <el-menu-item index="1-2" @click="update">修改权限</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
    <el-main>
      <span v-show="isMange">
      <el-row type="flex" justify="center">
        <el-col :span="4.5"><h2>用户列表</h2></el-col>
      </el-row>
      <div style="background-color: white; padding:20px;border-radius:8px;">
      <el-row>
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="input"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="tableData" border style="margin-top:15px">
        <el-table-column prop="id" label="ID" width="90">
        </el-table-column>
        <el-table-column prop="userName" label="用户名" width="150">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="170">
        </el-table-column>
        <el-table-column prop="role" label="身份" >
        </el-table-column>
        <el-table-column prop="status" label="状态" width="70">
          <template slot-scope="scope"  >
            <el-switch
              v-model='scope.row.bstatus'
              @change="change(scope.$index, scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作" width="370">
          <template slot-scope="scope">
          <el-button
            size='medium'
            type='primary'
            @click="handleEdit(scope.$index, scope.row) , dialogFormVisible = true">编辑</el-button>
          <el-button
            size='medium '
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>          
        </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center">
        <el-col :span="10.5">
          <el-pagination
            background
            :page-size=3
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :pager-count=5
            v-show="isShow"
            :total="total">
          </el-pagination>
        </el-col>
      </el-row>
      </div>
      </span>
      <!-- ---------------------------------------------->
      <span v-show="!isMange">
      <el-row type="flex" justify="center" >
        <el-col :span="4.5"><h2>权限列表</h2></el-col>
      </el-row>
      <div style="background-color: white; padding:20px;border-radius:8px;">
      <el-row>
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="tableData" border style="margin-top:15px">
        <el-table-column prop="id" label="ID" >
        </el-table-column>
        <el-table-column prop="userName" label="用户名" >
        </el-table-column>
        <el-table-column prop="rname" label="修改" >
          <template slot-scope="scope"  >
            <el-switch
              v-model='scope.row.rname'
              @change="change1(scope.$index, scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="del" label="删除" >
          <template slot-scope="scope"  >
            <el-switch
              v-model='scope.row.del'
              @change="change2(scope.$index, scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="upload" label="上传" >
          <template slot-scope="scope"  >
            <el-switch
              v-model='scope.row.upload'
              @change="change3(scope.$index, scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="mkdir" label="新建文件夹" >
          <template slot-scope="scope"  >
            <el-switch
              v-model='scope.row.mkdir'
              @change="change4(scope.$index, scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center">
        <el-col :span="10.5">
          <el-pagination
            background
            :page-size=3
            @current-change="handleCurrentChange1"
            layout="prev, pager, next"
            :pager-count=5
            v-show="isShow"
            :total="total">
          </el-pagination>
        </el-col>
      </el-row>
      </div>
      </span>
    </el-main>
  </el-container>
</el-container>

</div>
 
</template>

<script>
import { request } from '../network/request';
  export default {
    name: 'Admin',
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
          oldid: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        tableData: [],
        input3: '',
        val: 1,
        total: 0,
        isShow:false,
        isMange:true,
        name: localStorage.getItem('admin')
      }
    },
    methods: {
      input() {
        request({
          url: '/user/getUserList',
          params: {
            userName: this.input3,
            currentPage: this.val
          }
        }).then(res => {
          let index = this.tableData.length
          this.tableData.splice(0,index)
        this.total = res.data.data.totalSize
        this.isShow = true
        for(let item of res.data.data.userDetail) {
          this.tableData.push(item)
        }
        })
      },
      handleEdit(index,row) {
          this.form.name = row.userName
          this.form.passage = row.role
          this.form.oldid = row.id 
       },
        dialogFormVisible1() {
        request({
          headers: {
            'Content-Type': 'application/json',
          },
            url: '/user/updateUser',
            method: 'post',
            data:JSON.stringify({userName:this.form.name,role: this.form.passage,id: this.form.oldid}),
          }).then(res => {
            if(res.data.code == 200) {
              this.$store.commit('getMessage',res.data.msg)
              this.$open(res.data.code)
            }else {
              this.$store.commit('getMessage',res.data.msg)
              this.$open(res.data.code)
            }
                request({
        url: '/user/getUserList',
      }).then(res => {
          let index = this.tableData.length
          this.tableData.splice(0,index)
        this.total = res.data.data.totalSize
        this.isShow = true
        for(let item of res.data.data.userDetail) {
          this.tableData.push(item)
        }
      })
          })
        return this.dialogFormVisible = false
      },
      handleDelete(index,row) {
        if(row.role == '管理员') {
          this.$notify.error({
            title: '错误',
            message: '不能删除管理员'
          });
        }else {
        request({
          headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token')
          },
          method: 'post',
          url: '/user/deleteUser',
          data:JSON.stringify({id: row.id}),
        }).then(res => {
          if(res.data.code == 200) {
            this.tableData.splice(index,1)
          }
          this.$store.commit('getMessage',res.data.msg)
          this.$open(res.data.code)
        })
        }

      },
      change1(index, row) {
        request({
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
          url: '/user/updatePermission',
          method: 'post',
          data:JSON.stringify({id: row.id, status: row.rname, permissionName: 'rname'}),
        })
      },
      change2(index, row) {
        request({
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
          url: '/user/updatePermission',
          method: 'post',
          data:JSON.stringify({id: row.id, status: row.del, permissionName: 'del'}),
        })
      },
      change3(index, row) {
        request({
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
          url: '/user/updatePermission',
          method: 'post',
          data:JSON.stringify({id: row.id, status: row.upload, permissionName: 'upload'}),
        })
      },
      change4(index, row) {
        request({
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
          url: '/user/updatePermission',
          method: 'post',
          data:JSON.stringify({id: row.id, status: row.mkdir, permissionName: 'mkdir'}),
        })
      },
      manage() {
        request({
        url: '/user/getUserList',
      }).then(res => {
        let index = this.tableData.length
        this.tableData.splice(0,index)
        this.isMange = true
        this.total = res.data.data.totalSize
        this.isShow = true
        for(let item of res.data.data.userDetail) {
          this.tableData.push(item)
        }
      })
      },
      update() {
        request({
          url: '/user/getPermissionList',
        }).then(res => {
          this.total = res.data.data.totalSize
          this.isShow = true
          let index = this.tableData.length
          this.isMange = false
          this.tableData.splice(0,index)
          for(let item of res.data.data.permissionDetail) {
            this.tableData.push(item)
          }
        })
      },
      change(index, row) {
        request({
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
          url: '/user/locked',
          method: 'post',
          data:JSON.stringify({id: row.id, status: row.bstatus}),
        })
      },
      handleCurrentChange1(val) {
        this.val = val
        console.log(`当前页: ${val}`);
      request({
        url: '/user/getPermissionList',
        params: {
          currentPage: val
        }
      }).then(res => {
        this.total = res.data.data.totalSize
        console.log(this.total);
        let index = this.tableData.length
        this.tableData.splice(0,index)
        for(let item of res.data.data.permissionDetail) {
          this.tableData.push(item)
        }
      })
      },
      handleCurrentChange(val) {
        this.val = val
        console.log(`当前页: ${val}`);
      request({
        url: '/user/getUserList',
        params: {
          currentPage: val,
          userName: this.input3
        }
      }).then(res => {
        this.total = res.data.data.totalSize
        console.log(this.total);
        let index = this.tableData.length
        this.tableData.splice(0,index)
        for(let item of res.data.data.userDetail) {
          this.tableData.push(item)
        }
      })
      }
    },
    created() {
      request({
        url: '/user/getUserList',
      }).then(res => {
        this.total = res.data.data.totalSize
        this.isShow = true
        for(let item of res.data.data.userDetail) {
          this.tableData.push(item)
        }
      })
    }
  };
</script>

<style>
 body {
   background-color: white ;
 }
  .el-header {
    background-color: #c2cbdc;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #bac3d2;
    height: 550px;
  }
  .el-submenu__title {
    background-color: #dadfeb ;
  }
  .el-main {
    background-color: #d5dbe7 ;
  }
  .el-menu {
    background-color: #eef1f6;
  }
</style>