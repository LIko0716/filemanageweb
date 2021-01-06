<template>
  <div class="asb">
    <el-button
      slot="trigger"
      size="small"
      @click="fileDialog = true"
      >上传目录</el-button
    >
    <el-dialog
      class="upload-demo"
      title="添加文件夹"
      :append-to-body="true"
      :visible.sync="fileDialog"
      width="650px"
      :close-on-click-model="false"
    >
      <div>
        <input
          ref="file"
          class="fileUploaderClass"
          type="file"
          name="file"
          webkitdirectory
          @change.stop="changesData"
        />
        <p :v-if="fileList" v-for="(item, index) in fileList" :key="index">
          {{ item.name }}
        </p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="fileDialog = false">取 消</el-button>
        <el-button type="primary" @click="uploadFile">确 定</el-button>
        <el-progress
          :text-inside="true"
          :stroke-width="14"
          :percentage="progressBar"
          status="success"
        ></el-progress>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { request } from "../network/request";
export default {
  name: "elDialogDir",
  data() {
    return {
      fileList: [],
      fileDialog: false,
      progressBar: 0,  
    };
  },
  methods: {
    changesData() {
      this.fileList = this.$refs.file.files;
    },

    uploadFile() {
    console.log(this.$refs.file.files[0]);

      let formData = new window.FormData();
      for (let i = 0; i < this.fileList.length; i++) {
        // 每个file append到formdata里
        formData.append("file", this.fileList[i]);
      }
      request({
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
        body:{
          filePath: decodeURIComponent(this.$route.path.replace("/home/news", "")),
        }, 
        url: "/file/uploadFolder",
        data:formData,
        method: 'post',
        onUploadProgress: (progressEvent) => {
          console.log(progressEvent.loaded);
            let percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            this.progressBar = percentCompleted;
          },
      }).then((res) => {
          console.log(res.data);
          this.fileDialog = false;
          this.$store.commit("created");
        });
      // const loading = this.$loading({
      //   lock: true,
      //   text: "Loading",
      //   spinner: "el-icon-loading",
      //   background: "rgba(0, 0, 0, 0.7)",
      // });
      // request({
      //   method: "post",
      //   url: "/file/uploadFolder",
      //   data: formData,
      //   params: {
      //     filePath: this.$route.path.replace("/home/news", ""),
      //   },
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //     token: localStorage.getItem("token"),
      //   },
      // }).then((res) => {
      //   console.log(res.data.data);
      //   this.fileDialog = false;
      //   loading.close();
      //   this.$store.commit("created");
      // });
    },
  },
};
</script>

<style>
  .asb {
    display: inline;
  }
</style>