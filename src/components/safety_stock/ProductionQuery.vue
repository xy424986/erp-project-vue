<template>
  <div>

    <div id="div01">
      <el-table
        :data="tableData"
        height="250"
        border
        style="width: 100%">
        <el-table-column
          prop="manufactureId"
          label="派工单编号"
          width="180">
          <template slot-scope="scope">
            <span type="text" v-text="scope.row.manufactureId" @click="openeditwin1(scope.row.id)"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="productId"
          label="产品编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="产品名称">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="testedAmount"
          label="合格品数量">
        </el-table-column>
      </el-table>
    </div>
    <!--    抽屉样式-->
    <el-drawer
      :visible.sync="drawer"
      size="80%">
      <div>

        <el-form  size="small" :inline="true" v-model="scellform">
          <el-row>
            <el-col :span="15" :pull="2">
                <span >派工单编号:{{scellform1.manufactureId}} 其中审核状态
             <span v-if="scellform1.checkTag === 'S001-0'">等待审核</span>
             <span v-else-if="scellform1.checkTag === 'S001-1'">审核通过</span>
             <span v-else-if="scellform1.checkTag === 'S001-2'">审核完成</span>
          </span>
            </el-col>
            <el-col :span="9"></el-col>
          </el-row>
          <el-row>
            <el-col :span="1">
            </el-col>
            <el-col :span="18"><h3>生产派工单查询</h3></el-col>
            <el-col :span="3">
              <el-button @click="handleClose"  size="mini" round type="primary" icon="el-icon-check">返回</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11" :offset="1">
              <div>
                <el-form-item label="工单制定人:">
                  <el-input type="text" v-model="scellform1.designer" readonly="readonly"/>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7" :offset="2">
              <div>
                <el-form-item label="出库单编号:">
                  <el-input type="text" readonly="readonly"/>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6"><div></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="14" >
              <div><!--产品名称：笔记本-->
                <el-form-item label="产品编号:">
                  <el-input type="text" v-model="scellform1.productId" readonly="readonly"/>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7" >
              <el-form-item label="产品名称:">
                <div class="inline">
                  <el-input type="text" v-model="scellform1.productName" readonly="readonly"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14" >
              <div>
                <el-form-item label="投产数量:">
                  <el-input type="text" v-model="scellform1.amount" readonly="readonly"/>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7" >
              <el-form-item label="合格数量:">
                <div class="inline">
                  <el-input type="text" v-model="scellform1.testedAmount" readonly="readonly"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <!--表格-->
          <el-row>
            <el-col :span="2"><div></div></el-col>
            <el-col :span="20" :offset="2">
              <div>
                <el-table
                  :data="dfileform1"
                  border
                  height="140"
                  style="width: 100%"
                  :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                  :cell-style="cellStyle">
                  <el-table-column
                    width="80"
                    prop="id"
                    label="序号">
                  </el-table-column>
                  <el-table-column
                    width="140"
                    prop="procedureFinishTag"
                    label="工序状态">
                      <template scope="scope">
                        <span v-if="scope.row.procedureFinishTag === 'G004-0'">等待</span>
                        <span v-else-if="scope.row.procedureFinishTag === 'G004-1'">完成</span>
                        <span v-else-if="scope.row.procedureFinishTag === 'G004-2'">执行</span>
                        <span v-else-if="scope.row.procedureFinishTag === 'G004-3'">完成</span>
                      </template>
                  </el-table-column>
                  <el-table-column
                    prop="procedureName"
                    label="工序名称">
                  </el-table-column>
                  <el-table-column
                    prop="subtotal"
                    label="设计工时成本(元)">
                  </el-table-column>
                  <el-table-column
                    prop="realSubtotal"
                    label="实际工时成本(元)">
                  </el-table-column>
                  <el-table-column
                    prop="moduleSubtotal"
                    label="设计物料成本(元)">
                  </el-table-column>
                  <el-table-column
                    prop="realModuleSubtotal"
                    label="实际物料成本(元)">
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
            <el-col :span="2"><div></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="10" :push="2">
              <el-form-item label="设计工时总成本:">
                <div class="inline"><el-input type="text" readonly="readonly" v-model="scellform1.labourCostPriceSun" /></div>
              </el-form-item>
            </el-col>
            <el-col :span="11" :push="3">
              <el-form-item label="设计物料总成本:">
                <div class="inline">
                  <el-input type="text" v-model="scellform1.moduleCostPriceSun" readonly="readonly"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" :push="2">
              <el-form-item label="实际工时总成本:">
                <div class="inline"><el-input type="text" readonly="readonly" v-model="scellform1.peallabourCostPriceSun" /></div>
              </el-form-item>
            </el-col>
            <el-col :span="11" :push="3">
              <el-form-item label="实际物料总成本:">
                <div class="inline">
                  <el-input type="text" v-model="scellform1.pealModuleCostPriceSun" readonly="readonly"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col  :span="10" :push="2">
              <el-form-item label="登记人:">
                <div class="inline"><el-input type="text" v-model="scellform1.register" readonly="readonly"/></div>
              </el-form-item>
            </el-col>
            <el-col :span="11" :push="3">
              <el-form-item label="登记时间:">
                <div class="inline">
                  <el-input type="text" v-model="scellform1.registerTime" readonly="readonly"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col  :span="10" :push="2">
              <el-form-item label="审核人:">
                <div class="inline"><el-input type="text" v-model="scellform1.shecker" readonly="readonly"/></div>
              </el-form-item>
            </el-col>
            <el-col :span="11" :push="3">
              <el-form-item label="审核时间:">
                <div class="inline">
                  <el-input type="text" v-model="scellform1.checkTime" readonly="readonly"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col  :span="10" :push="2">
              <el-form-item label="备注:">
                <div class="inline"><el-input type="text" v-model="scellform1.remark" readonly="readonly"/></div>
              </el-form-item>
            </el-col>
            <el-col :span="11" :push="3">
              <div></div>
            </el-col>
          </el-row>
        </el-form>
      </div >
    </el-drawer>
  </div>
</template>

<script>
    export default {
        name: "ProductionQuery",
      data() {
        return {
          tableData: [],
          pageno: 1,
          pagesize: 5,
          total: 0,
          dfileform: [],
          show: true,
          hidden: false,
          scellform: {},
          scellAmount: 0,
          scellAmount2: 0,
          ass: "",
          css: "",
          yiNumber: 0,
          yiMoney: 0,
          drawer: false,
          innerDrawer: false,
          scellform1: {},
          scellform2: {},
          dfileform1: [],
          getgetpayId: "",
          scellformId: ""
        }
      },
      methods: {
        getdata() {   //制作安全库配置单1获取数据
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          this.$axios.post("MManuFacture/queryMManuFactureAll.May", params).then(function (response) {
            _this.tableData = response.data.records;
            _this.total = response.data.total;
            for (var i=0;i<_this.tableData.length;i++){console.log("getdata"+_this.tableData)}
          }).catch();
        },
        //设置指定行、列、具体单元格颜色
        cellStyle({row, column, rowIndex, columnIndex}) {
          if (columnIndex === 6) { //指定坐标rowIndex ：行，columnIndex ：列
            return 'background:yellow' //rgb(105,0,7)
          }
        },
        handleClose(done) {
          this.$confirm('还有未保存的工作哦确定关闭吗？')
            .then(_ => {
              done();
            })
            .catch(_ => {
              this.drawer = false;
              this.innerDrawer = false;
            });
        },
        openeditwin1(id){//获取数据
          var _this=this;
          this.getgatherId=id;
          var params = new URLSearchParams();
          params.append("id",id);
          this.$axios.post("MManuFacture/queryByIdMManuFacture.May", params).then(function (response) {
            _this.scellform1=response.data;
            _this.queryByParentId(_this.scellform1.id);
            _this.scellformId=_this.scellform1.id;
            _this.drawer=true;
            _this.innerDrawer=false;
          }).catch();
        },
        queryByParentId(id){
          var _this=this;
          var params = new URLSearchParams();
          params.append("id",id);
          this.$axios.post("MManuFacture/queryByIdMManuFactureEx1.May", params).then(function (response) {
            _this.dfileform1=response.data;
            for (var i=0;i<_this.dfileform1.length;i++){ console.log("queryByParentId"+_this.dfileform1);
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
