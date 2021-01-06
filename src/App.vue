<template>
  <div id="app" >
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <el-row type='flex' justify="center">
      <el-col :xs="30" :sm="30" :md="18" :lg="18" :xl="18">
        <div>
          <router-view/>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>

// import elDialogDir1 from 'components/elDialogDir1'
export default {
  name: 'App',
  data() {
    return {
      id:'123'
    }
  },
  components: {
    // elDialogDir1
  }
}
</script>

<style>
  body {
    background-color: #cccccc;
  }
</style>
