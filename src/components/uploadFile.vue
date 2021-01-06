<template>
   <div class="asb">
      <uploader
        :options="options"
        :file-status-text="statusText"
        class="uploader-example"
        ref="uploader"
        @file-success="fileSuccess"
        @file-complete="fileComplete"
        style="width: 100%;"
      >
          <uploader-btn type="button" class=" el-button el-button--default el-button--small" :directory="true" @click="btnToken()">上传目录</uploader-btn>
        <uploader-list v-show="panelShow"></uploader-list>
      </uploader>
    </div>
</template>

<script>
export default {
  name: 'uploadFile',
  data() {
    return {
      recording: {},
    uploader_key: new Date().getTime(),
      options: {
        headers:{
          'token': this.$store.state.token
        },
        query:{
          //form data里的参数 根据实际需要
          filePath: decodeURIComponent(this.$route.path.replace('/home/news',''))
        },
        // https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
        target: "/api/file/uploadFloder",
        testChunks: false, //不校验
         chunkSize: '2048000', //分块大小 单位(M)

      },
      statusText: {
        success: "上传成功",
        error: "上传失败",
        uploading: "上传中",
        paused: "暂停中",
        waiting: "等待中"
      },
      panelShow: true
    };
  },
  methods: {
    //上传成功的事件
    btnToken() {
        this.options.headers.token = this.$store.state.token
    },
    fileSuccess(rootFile, file, message) {
      if(message.code == 10086) {
        window.location.reload()
      }
      this.panelShow = true
      console.log(message);
      //将面试邀请code和文件路径去保存到数据库中
        var href = location.href;
        var split = href.split("?");
        var invCode = split[1];
        this.recording.invCode = invCode;
        this.recording.recordingUrl = message;
        console.log(file.relativePath);
        console.log(href);
    
      // this.$ajax
      //   .post(
      //     "http://localhost:8080/interview/recording/saveFileData",
      //     JSON.stringify(this.recording),
      //     {
      //       headers: {
      //         "Content-Type": "application/json;charset=UTF-8"
      //       }
      //     }
      //   )
      //   .then(response => {
      //     if ("ok" == response.data) {
      //       console.log("上传成功");
      //     } else {
      //       alert("上传失败");
      //     }
      //   })
      //   .catch(function(error) {
      //     alert("上传失败");
      //     console.log(error);
      //   });
    },
    fileComplete(rootFile) {
      this.$store.commit('created')
      rootFile.cancel()
    }
  },
  mounted() {
    // 获取uploader对象

    this.$nextTick(() => {
      window.uploader = this.$refs.uploader.uploader;
    });
  }
};
</script>

<style>
.uploader-example {
  font-size: 12px;
  display: inline;
}
.uploader-example .uploader-btn {
  margin-right: 4px;
  padding: 7px 14px;
  border-color: #dcdfe6;
}
.uploader-example .uploader-list {
  max-height: 440px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>