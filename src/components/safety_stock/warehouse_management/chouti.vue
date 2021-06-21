<template>
  <div>
    12123
  <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
    点我打开
  </el-button>

    <!--    抽屉样式-->
    <el-drawer
      title="我是外面的 Drawer"
      :visible.sync="drawer"
      size="80%">
      <!--      内容-->
      <span>123</span>
      <!--      /内容-->
      <div>
        <el-button @click="innerDrawer = true">打开里面的!</el-button>
        <el-drawer
          title="我是里面的"
          :append-to-body="true"
          :before-close="handleClose"
          :visible.sync="innerDrawer"
          size="80%">
          <!--          子内容-->
          <p>_(:зゝ∠)_</p>
        </el-drawer>
      </div>
    </el-drawer>
  </div>
</template>

<script>
    export default {
        name: "chouti",
      data() {
        return {
          drawer: false,
          innerDrawer: false,
        };
      },
      methods: {
        handleClose(done) {
          this.$confirm('还有未保存的工作哦确定关闭吗？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        }
      }
    };
</script>

<style scoped>

</style>
