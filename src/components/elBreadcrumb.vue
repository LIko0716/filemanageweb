<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <slot name="elBreadcrumb"><el-breadcrumb-item ><a href="/"></a></el-breadcrumb-item></slot>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'elBreadcrumb1'
}
</script>

<style>

</style>