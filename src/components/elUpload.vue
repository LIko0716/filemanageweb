<template>
<div v-show="$store.state.isShow">
<!-- 文件上传 -->
<el-upload
  class="upload-demo"
  ref="upload"
  action="/api/file/upload"
  :headers='myheaders'
  :data='pam'
  :on-change='success'
  :on-preview="handlePreview"
  :multiple="true"
  :on-remove="handleRemove"
  :file-list="fileList"
  :auto-upload="false"
  :limit=10>

    <el-button slot="trigger" size="small"  >选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small"  @click="submitUpload">上传到服务器</el-button>
    <el-button size="small"  @click="clearFiles">清空</el-button>
    <!-- <el-dialog-dir></el-dialog-dir> -->
    <el-drawer1></el-drawer1>
    <upload-file></upload-file>
  <div slot="tip" class="el-upload__tip" style="padding-left: 8px;">只能同时上传10个文件</div>
</el-upload>
<el-divider ></el-divider>

</div>
</template>
<script>
import uploadFile from 'components/uploadFile' 
import elDrawer1 from 'components/elDrawer'
// import elDialogDir from 'components/elDialogDir'
// import {request} from '../network/request'
export default {
  name: 'elUpload1',
  data() {
    return {
      fileList: this.$store.state.fileList,
      text: '12312321',
      pam: {filePath: this.$route.path.replace("/home/news","")},
      myheaders: {'token': this.$store.state.token,method: 'post'}
    }
  },
  components: {
    // elDialogDir,
    elDrawer1,
    uploadFile,

  },
  methods: {
        submitUpload() {
        this.myheaders.token = this.$store.state.token
        this.$refs.upload.submit();
        // request({
        //   headers: {
        //   'token': localStorage.getItem('item')
        //   },
        //   url: '/file/upload',
        //   method: 'post',
        //   params: {
        //     filePath: this.$route.path
        //   }
        // }).then(
        //   this.$store.commit('created')
        // )
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      clearFiles() {
        this.$refs.upload.clearFiles()
        
      },
      success() {
        this.$store.commit('created')
      }
  },
}
</script>

<style>

</style>