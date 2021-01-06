<template>
<div class="asb">
  <el-button type="button" size="small" @click="dialog = true" >新建文件夹</el-button>
  <el-drawer
  title="新建目录"
  :before-close="handleClose"
  :visible.sync="dialog"
  direction="ltr"
  custom-class="demo-drawer"
  ref="drawer"
  size='300px'
  >
  <div class="demo-drawer__content"  style="text-align:center; ">
    <el-form :model="form" :inline='true'>
      <el-form-item label="目录名" :label-width="formLabelWidth" >
        <el-col :span="24">
          <el-input v-model="form.name" autocomplete="off"></el-input>
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
import { request } from '../network/request';
export default {
  name: 'elDrawer1',
  data() {
    return {
      table: false,
      dialog: false,
      loading: false,
      
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '60px',
      timer: null,
    }
  },
  methods: {
     handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确定要提交表单吗？')
        .then(() => {
          request({
            headers: {
              'Content-Type': 'application/json',
              'token': localStorage.getItem('token')
            },
            url: '/file/mkdir',
            method: 'post',
            data:JSON.stringify({dirName: this.form.name, filePath: decodeURIComponent(this.$route.path.replace('/home/news',''))}),
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
        .catch(()=> {});
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    }
  },
}
</script>

<style>
  .asb {
    display: inline;
  }
</style>