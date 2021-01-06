export default {
  install (Vue) {
    Vue.prototype.$open = function (code) {
      if(code == 200) {
        this.$notify({
          title: '成功',
          message: this.$store.state.message,
          type: 'success',
        });
      }else {
        this.$notify.error({
          title: '错误',
          message: this.$store.state.message
        });
      }
    }
  }
}