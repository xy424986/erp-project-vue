<template>
  <div>
    <!--  表格-->
    <template>
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column
          label="产品编号"
          prop="productId">
        </el-table-column>
        <el-table-column
          label="产品名称"
          prop="productName">
        </el-table-column>
        <el-table-column
          label="档次级别"
          prop="productClass">
        </el-table-column>
        <el-table-column
          label="I级分类"
          prop="firstKindName">
        </el-table-column>
        <el-table-column
          label="II级分类"
          prop="secondKindName">
        </el-table-column>
        <el-table-column
          label="III级分类"
          prop="thirdKindName">
        </el-table-column>
        <el-table-column
          label="产品经理"
          prop="responsiblePerson">
        </el-table-column>
        <el-table-column
          align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              round
              type="primary"
              @click="drawerOpen(scope.$index, scope.row)">制定设计单
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

<!--    分页-->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>

<!--    抽屉样式-->
    <el-drawer
      title="我是外面的 Drawer"
      :visible.sync="drawer"
      size="80%">
<!--      内容-->
      <template>
        <div id="app" >
          <el-form  size="small" :inline="true">
            <el-row>
              <el-col :span="24"><h3>安全库存配置单</h3></el-col>
            </el-row>
            <el-row>
              <el-col :span="4"><div></div></el-col>
              <el-col :span="7" :offset="3">
                <div><!--产品名称：笔记本-->
                  <el-form-item label="产品名称:">
                    <el-input type="text" v-model="msg" />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7" :offset="2"><div><!--产品编号：1000000-->
                <el-form-item label="产品编号:">
                  <el-input type="text" v-model="msg"/>
                </el-form-item>
              </div></el-col>
              <el-col :span="6"><div></div></el-col>
            </el-row>
            <el-row>
              <el-col :span="22" :offset="1"><!--<div class="inline">库存下限数：</div>-->
                <el-form-item label="库存下限数:">
                  <div class="inline div01"><el-input type="text" v-model="msg" :clearable="true"/></div>
                </el-form-item>
                <!--<div class="inline">库存报警上限数：</div>-->
                <el-form-item label="库存报警上限数:">
                  <div class="inline div01" :clearable="true"><el-input type="text" v-model="msg" class="el-input" :clearable="true"/></div>
                </el-form-item>
              </el-col>
              <el-col :span="2"><div></div></el-col>
            </el-row>
            <el-row>
              <el-col :span="12" :offset="1">
                <div class="inline">
                  <!--设置B/N或S/N：-->
                  <el-form-item label="设置B/N或S/N:">
                    <el-select style="border: 1px solid #DCDFE6;" class="drop-downBox " v-model="value">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>

              </el-col>
              <el-col :span="2"><div></div></el-col>
              <el-col :span="10" >
                <!--<div class="inline">设计人：</div>-->
                <el-form-item label="设计人:">
                  <div class="inline div01"><el-input type="text" v-model="msg" :clearable="true"/></div>
                </el-form-item>
              </el-col>
            </el-row>
            <!--表格-->
            <el-row>
              <el-col :span="2"><div></div></el-col>
              <el-col :span="20" :offset="2">
                <div>
                  <el-table
                    :data="tableData"
                    border
                    height="160"
                    style="width: 100%"
                    :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                    :cell-style="cellStyle">
                    <el-table-column
                      width="60"
                      prop="id"
                      label="序号">
                    </el-table-column>
                    <el-table-column
                      width="80"
                      prop="name"
                      label="库房名称">
                    </el-table-column>
                    <el-table-column
                      width="140"
                      prop="ty"
                      label="储存地址地址编号">
                    </el-table-column>
                    <el-table-column
                      prop="province"
                      label="储存地址名称">
                    </el-table-column>
                    <el-table-column
                      width="110"
                      prop="city"
                      label="储存单元简称">
                    </el-table-column>
                    <el-table-column
                      width="100"
                      prop="address"
                      label="最大储蓄量">
                    </el-table-column>
                    <el-table-column
                      width="80"
                      prop="zip"
                      label="储存单位"
                      style="background: pink;">
                    </el-table-column>
                  </el-table>
                </div>
              </el-col>
              <el-col :span="2"><div></div></el-col>
            </el-row>
            <el-row>
              <el-col :span="14" :push="1">
                <!--<div class="inline">登记人：</div>-->
                <el-form-item label="登记人:">
                  <div class="inline div01"><el-input type="text" v-model="msg" :clearable="true"/></div>
                </el-form-item>
              </el-col>
              <el-col :span="7" :pull="2">
                <!--<div class="inline">登记时间：</div>-->
                <el-form-item label="登记人:">
                  <div class="inline">2020/12/07 12:15:16</div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" :offset="3">
                <div class="aa">
                  <el-form-item label="配置要求:" style="width: 80%; display: block;">
                    <el-input type="textarea" :rows="4" resize="none"  placeholder="请输入内容" style="width: 100%" v-model="msg">
                    </el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </template>
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
    //定制产品生产工序设计单
    name: "Design_of_single",
    data() {
      return {
        //抽屉绑定
        drawer: false,
        innerDrawer: false,
        // 表格绑定
        tableData: [],
        search: '',
        //分页绑定
        currentPage: 1
      }
    },
    methods: {
      //打开抽屉
      drawerOpen(){
        this.drawer = true;
      },
      //抽屉关闭方法
      handleClose(done) {
        this.$confirm('还有未保存的工作哦确定关闭吗？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      //获取定制产品数据
      getData(){
        this.$axios.get("/DFile/queryByState.action").then(response=>{
          this.tableData = response.data;
        }).catch();
      }
    },
    created() {
      this.getData();
    }
  }
</script>

<style scoped>

</style>
