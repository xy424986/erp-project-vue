<template>
  <div>
  符合条件产品总数{{sun1}}列
  <br/>
  当前库存总数:{{sun1}}件,<span style="color: red">当前库存上限报警产品种类数:{{onsun}}种,库存下限报警产品种类数:{{downsun}}种;</span>

  <div id="div01">
   <el-table
      :data="tableData"
      height="250"
      border
      style="width: 100%">
      <el-table-column
        label="I级产品分类"
        width="180">
        <template slot-scope="scope">
          <span type="text" v-text="scope.row.firstKindId+'/'+scope.row.firstKindName"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="II级产品分类"
        width="180">
        <template slot-scope="scope">
          <span type="text" v-text="scope.row.secondKindId+'/'+scope.row.secondKindName"></span>
        </template>
      </el-table-column>
      <el-table-column label="III级产品分类">
        <template slot-scope="scope">
          <span type="text" v-text="scope.row.thirdKindId+'/'+scope.row.thirdKindName" ></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="productId"
        label="产品编号/名称">
        <template slot-scope="scope">
          <span type="text" v-text="scope.row.productId+'/'+scope.row.productName" ></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="amount"
        label="库存数量">
      </el-table-column>
      <el-table-column
        prop="maxAmount"
        label="安全库存上限">
      </el-table-column>
      <el-table-column
        prop="minAmount"
        label="安全库存下限">
      </el-table-column>
    </el-table>
  </div>
  </div>
</template>

<script>
    export default {
        name: "DynamicInventoryQuery",
      data(){
        return {
          tableData:[],
          pageno: 1,
          pagesize: 5,
          total: 0,
          sun1:0,
          onsun:0,
          downsun:0
        }
      },
      methods: {
        getdata() {
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          this.$axios.post("SCell/queryAllSCell3.May", params).then(function (response) {
            _this.tableData = response.data.rows;
            _this.total = response.data.total;
            _this.sun1+=_this.tableData.length;
            for (var i=0;i<_this.tableData.length;i++){
              if (_this.tableData[i].minAmount>=_this.tableData[i].amount){
                _this.downsun++;
              }
              if (_this.tableData[i].maxAmount<=_this.tableData[i].amount){
                _this.onsun++;
              }
            }
          }).catch();
        }
      },
      created() {
        this.getdata();
      }
    }
</script>

<style scoped>

</style>
