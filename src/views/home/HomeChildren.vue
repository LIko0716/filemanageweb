<template>
  <div style=" background-color: white">
          <el-row type='flex' justify="end" >
            <el-col :span="1.5">
              <div id="div">
                <!-- <el-dialog-dir1></el-dialog-dir1> -->
                <el-dialog1></el-dialog1>
              </div>
            </el-col>
          </el-row>

    <el-upload1></el-upload1>

    <el-table1></el-table1>

    
  </div>
</template>

<script>
import elDialog1 from 'components/elDialog'

import elUpload1 from 'components/elUpload.vue'
import elTable1 from 'components/elTable'
export default {
  name: 'HomeChildren',
  components: {
    elTable1,
    elDialog1,

    elUpload1

  }
}
</script>

<style>

</style>