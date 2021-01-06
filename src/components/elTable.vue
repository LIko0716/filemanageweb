<template>
<div>

<!-- 面包屑 -->
  <el-breadcrumb1>
    <el-breadcrumb-item slot="elBreadcrumb" v-if='isBread'><a href="javascript:history.back(-1)">返回上一层</a></el-breadcrumb-item>
    <el-breadcrumb-item slot="elBreadcrumb" v-if='isBread'><a href="/">根目录</a></el-breadcrumb-item>
    <el-breadcrumb-item slot="elBreadcrumb" v-for="(item, index) in this.isDir" :key="index">{{item}}</el-breadcrumb-item>
  </el-breadcrumb1>
  
<!-- 
  <el-table
      :data="result"
      style="width: 100%">
   
      <el-table-column
        prop="fileName"
        label="fileName"
        >
        <template slot-scope="result">
          <a @click="btnClick(result.row)" target="self">{{result.row.fileName}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="fileSize"
        label="大小">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="时间"
        width=200%>
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作">
      </el-table-column>

    </el-table> -->

<!-- 文件 -->
<el-table
    :data="tableData.filter(data => !search || data.fileName.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%;"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 1)"
    v-loading="$store.state.loading"
    >
    <el-table-column
      label="文件"
      min-width="100"
      prop="fileName">
      <template slot-scope="scope" >
        <el-row type="flex" align="middle">
        <img :src="img1(scope.row.fileName,scope.row)" alt="">
        <el-link style="margin-left:5px" @click="btnClick(scope.row,scope.row.id)" :href="Open(scope.row)" target="block">{{ scope.row.fileName }}</el-link>
        </el-row>
      </template>
    </el-table-column>
        <el-table-column
      label="大小"
      prop="fileSize">
    </el-table-column>
        <el-table-column
      label="修改时间"
      min-width=98
      prop="updateTime">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <div id="qwe">
          <el-input
          v-show="isInput"
          v-model="search"
          size="mini"
          style="margin-top: 1px;"
          class="input-with-select"
          placeholder=" 输入关键字搜索">
            <el-select v-model="select" @change="option" @select="option1" slot="prepend" placeholder="" style="width: 2px;">
              <el-option label="搜索" value="1"></el-option>
              <el-option label="全局搜索" value="2"></el-option>
            </el-select>
          </el-input>
          <!-- ---------------------------------- -->
          <el-input
          v-show="!isInput"
          v-model="search1"
          size="mini"
          style="margin-top: 1px;"
          class="input-with-select"
          placeholder=" 输入关键字搜索">
            <el-select v-model="select" @change="option" slot="prepend" placeholder="" style="width: 2px;">
              <el-option label="搜索" value="1"></el-option>
              <el-option label="全局搜索" value="2"></el-option>
            </el-select>
                <el-button slot="append" icon="el-icon-search" size="mini" @click="query(scope.row)"></el-button>
          </el-input>
        </div>
   
      </template>
      <template slot-scope="scope">
        <el-button
          type="success"
          circle
          icon="el-icon-download"
          @click="handleDownload(scope.$index, scope.row)"></el-button>
        <el-button
          circle
          type="success"
          v-if='isMp4(scope.row.fileName, scope.$index,)'
          icon="el-icon-video-play"
          @click="handlevideo(scope.row, scope.$index)"></el-button>
        <el-button
          circle
          type="warning"
          icon="el-icon-edit"
          v-show="$store.state.isShow"
          @click="dialog = true,handleEdit(scope.row, scope.$index)"></el-button>
        
        <el-popconfirm
        title="确定删除吗？"
        @confirm="handleDelete(scope.$index, scope.row)"
        >
        <el-button
          type="danger"
          circle
          icon="el-icon-delete"
          slot="reference"
          ></el-button>
          </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <!-- 抽屉 -->
  <el-drawer
  title="修改文件名"
  :before-close="handleClose"
  :visible.sync="dialog"
  direction="rtl"
  custom-class="demo-drawer"
  ref="drawer"
  size='300px'
  >
  <div class="demo-drawer__content" style="text-align:center; ">
    <el-form :model="form" :inline='true'>
      <el-form-item label="文件名" :label-width="formLabelWidth"  style="margin-left:7%;">
        <el-col  :span="24" >
          <el-input  v-model="form.name" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>
    </el-form>
    <div class="demo-drawer__footer">
      <el-button @click="cancelForm">取 消</el-button>
      <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
    </div>
  </div>
</el-drawer>
</div>
</template>
<script>
import elBreadcrumb1 from 'components/elBreadcrumb'
import { request } from '../network/request'
export default {
  name: 'elTable1',
  data() {
    return {
      name: 'elTable1',
      isInput: 'true',
    form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        id: '',
        oldname: '',
      },
      formLabelWidth: '60px',
      timer: null,
      table: false,
      dialog: false,
      loading: false,
    tableData: this.$store.state.tableData,
    search: '',
    search1: '',
    isDir: [],
    id: '',
    isBread: false,
    // url: 'http://wzjby.gz2vip.idcfengye.com',
    url: '',
    isShow: false,  
    username: '123',
    text: 'dasdsadsadas',
     select: '',
     select1: '' 
      // result: this.$store.state.result
    }
  },
  components: {
    elBreadcrumb1,
  },
  //页面加载时拉取数据
  created() {
    let name1 = this.$route.path.split("/")
    for(let index = 0; index < name1.length -3; index++) {
      this.isBread = true
      this.isDir.push(decodeURIComponent(name1[index+3]))
    }
    this.$store.commit('getPath',this.$route.path.replace('/home/news',''))
    this.$store.commit('created')
  },
  methods: {
    query() {
      request({
        url: '/file/selectByFileName',
        params: {
          fileName: this.search1
        }
      }).then(res => {
          let index = this.$store.state.tableData.length
          this.$store.state.tableData.splice(0,index)
        for(let item of res.data.data) {
          this.$store.state.tableData.push(item)
        }
      })
    },
    option1() {
      console.log(33333);
    },
    option() {
      if(this.select == 2) {
        this.isInput = false
      }else {
        this.isInput = true
      }
      console.log(this.select);
    },
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确定要提交表单吗？')
        .then(()=> {
          request({
            headers: {
              'Content-Type': 'application/json',
              'token': localStorage.getItem('token')
            },
            url: '/file/reName',
            method: 'post',
            data:JSON.stringify({fileName: this.form.name, oldname: this.form.oldname, id: this.form.id}),
          })
          this.loading = true;
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
              this.$store.commit('created')
            }, 400);
          }, 2000);
        })
        .catch(() => {});

    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
    isMp4(row){
      let x = row.substring(row.lastIndexOf(".")+1).toLowerCase()
      if(x == 'mp4') {
        return true
      }
    },
    handleDownload(index, row) {
      window.location.href= '/api/file/download?id=' + row.id
    },
    show(row) {
      console.log(row);
    },
    img1(row,item){
      let x = row.substring(row.lastIndexOf(".")+1).toLowerCase()
      if(x == 'jpg')  {
       row = this.url + '/images/filePic/image.svg'
      } else if(x == 'png') {
       row = this.url + '/images/filePic/image.svg'
      } else if(x == 'zip') {
       row = this.url + '/images/filePic/rar.svg'
      } else if(x == 'txt') {
       row = this.url + '/images/filePic/txt.svg'
      } else if(x == 'mp4') {
       row = this.url + '/images/filePic/video.svg'
      } else if(x == 'exe') {
       row = this.url + '/images/filePic/exe.png'
      } else if(item.isDir) {
       row = this.url + '/images/filePic/folder.svg'
      } 
      else {
       row = this.url + '/images/filePic/unknown.svg'
      }
       return row  
    },
    Open(row) {
    if(row.isDir == 0) {
      row = this.url + "/api/file/watch?id=" + row.id
      return row
    }
    
    },
    handlevideo(row) {
      window.open(this.url + "/api/file/watch?id=" + row.id)
    },
    btnClick(name,id) {
      if(name.isDir) {
        console.log(name);
        localStorage.setItem('id',id)
        let url = this.$route.path + "/" + name.fileName
        window.location.href = url
      }
    },
    handleEdit(row) {
      this.form.name = row.fileName,
      this.form.id = row.id,
      this.form.oldname = row.fileName
    },
    handleDelete(index,row) {
      request({
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
        method: 'post',
        url: '/file/deleteFile',
        data:JSON.stringify({id: row.id}),
      }).then(res => {
        if(res.data.code == 200) {
          this.tableData.splice(index,1)
        }
        this.$store.commit('getMessage',res.data.msg)
        this.$open(res.data.code)
      })
    },
 
  },
  
}
</script>

<style>
  body {
    margin: 0;
  }
  img {
    width: 30%;
    max-width: 40px;
    min-width: 32px;
  }
  .el-button {
    margin:3px 9px;
  }
  #qwe .el-input__inner{
    padding: 0;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
 .el-input-group__prepend {
   padding: 0 16px 0 10px;;
 }

</style>