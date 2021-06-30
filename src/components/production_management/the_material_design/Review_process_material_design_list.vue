<template>
  <div>
    <!--  表格-->
    <template>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="工序设计单编号"
          prop="designId">
        </el-table-column>
        <el-table-column
          label="产品编号"
          prop="productId">
        </el-table-column>
        <el-table-column
          label="产品名称"
          prop="productName">
        </el-table-column>
        <el-table-column
          label="设计人"
          prop="designer">
        </el-table-column>
        <el-table-column
          label="登记时间"
          prop="registerTime">
        </el-table-column>
        <el-table-column
          label="工时总成本"
          prop="costPriceSum">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              round
              type="primary"
              @click="drawerOpen(scope.$index, scope.row)">审核
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
        :current-page="pageNumber"
        :page-sizes="[5, 10, 15, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!--    /分页-->

    <!--    抽屉样式-->
    <el-drawer
      title="定制工序物料设计单"
      :visible.sync="drawer"
      size="80%">
      <!--      内容-->
      <div class="content">
        <el-form size="small" :inline="true">
          <el-row>
            <el-col :span="2" :offset="18">
              <el-button size="mini" round type="warning" icon="el-icon-close" @click="innerDrawer = false">驳回
              </el-button>
            </el-col>
            <el-col :span="2">
              <el-button size="mini" round type="success" icon="el-icon-check" @click="submit">通过
              </el-button>
            </el-col>
            <el-col :span="2">
              <el-button size="mini" round type="info" icon="el-icon-close" @click="innerDrawer = false">返回
              </el-button>
            </el-col>
          </el-row>
          <hr>
          <el-row>
            <el-col :span="7" :offset="3">
              <div>
                <el-form-item label="工序单编号:">
                  <el-input type="text" v-model="designId" readonly="readonly"/>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8" :offset="2">
              <el-form-item label="设计人:">
                <!--                <div class="inline div02_01">-->
                <el-input type="text" v-model="designer" readonly :clearable="true"/>
                <!--                </div>-->
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div></div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9" :offset="2">
              <el-form-item label="产品名称:">
                <!--                <div class="inline div02_01">-->
                <el-input type="text" v-model="productName" readonly :clearable="true"/>
                <!--                </div>-->
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <div><!--产品编号：1000000-->
                <el-form-item label="产品编号:">
                  <el-input type="text" v-model="productId" readonly="readonly"/>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <!--设计单表格-->
          <el-row>
            <el-col :span="2">
              <div></div>
            </el-col>
            <el-col :span="20" :offset="2">
              <div>
                <el-table
                  :data="mDPDData"
                  border
                  height="244"
                  style="width: 100%"
                  :header-cell-style="{background:'#eef1f6',color:'#606266'}">
                  <el-table-column
                    width="50"
                    label="序号">
                    <template slot-scope="scope">
                      {{scope.$index+1}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    width="100"
                    label="工序名称"
                    prop="procedureName">
                  </el-table-column>
                  <el-table-column
                    width="90"
                    label="工序编号"
                    prop="procedureId">
                  </el-table-column>
                  <el-table-column
                    label="描述"
                    prop="procedureDescribe">
                  </el-table-column>
                  <el-table-column
                    width="120"
                    label="工时数（小时）"
                    prop="labourHourAmount">
                  </el-table-column>
                  <el-table-column
                    width="150"
                    label="工时成本小计（元）"
                    prop="subtotal">
                  </el-table-column>
                  <el-table-column
                    width="120"
                    label="物料成本小计"
                    prop="moduleSubtotal">
                    <!--                      <template slot-scope="scope">-->
                    <!--                      <span>{{scope.row.moduleSubtotal}}</span>-->
                    <!--                    </template>-->
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="设计">
                    <template slot-scope="scope">
                      <!--    定制工序物料设计单物料设计表格-->
                      <el-popover
                        placement="right"
                        width="700"
                        trigger="click"
                        v-model="scope.row.visible">
                        <div class="content1">
                          <el-form size="small" :inline="true">
                            <el-row>
                              <el-col :span="4">
                                <div>
                                  <el-form-item label="工序单编号:">
                                    <el-input type="text" v-model="designId" readonly="readonly"/>
                                  </el-form-item>
                                </div>
                              </el-col>
                              <el-col :span="4" :offset="2">
                                <el-form-item label="工序名称:">
                                  <!--                <div class="inline div02_01">-->
                                  <el-input type="text" v-model="procedureName" readonly :clearable="true"/>
                                  <!--                </div>-->
                                </el-form-item>
                              </el-col>
                              <el-col :span="4" :offset="2">
                                <el-form-item label="登记人:">
                                  <!--                <div class="inline div02_01">-->
                                  <el-input type="text" v-model="register" readonly :clearable="true"/>
                                  <!--                </div>-->
                                </el-form-item>
                              </el-col>
                              <el-col :span="6" :offset="2">
                                <div><!--产品编号：1000000-->
                                  <el-form-item label="登记时间:">
                                    <el-input type="text" v-model="registrationTime1" readonly="readonly"/>
                                  </el-form-item>
                                </div>
                              </el-col>
                            </el-row>
                          </el-form>
                        </div>
                        <el-table :data="dMDData">
                          <el-table-column width="50" label="序号">
                            <template slot-scope="scope">
                              {{scope.$index+1}}
                            </template>
                          </el-table-column>
                          <el-table-column width="90" property="productName" label="物料名称"></el-table-column>
                          <el-table-column width="90" property="productId" label="物料编号"></el-table-column>
                          <el-table-column width="50" property="productDescribe" label="描述"></el-table-column>
                          <el-table-column width="90" label="本工序数量" prop="amount"></el-table-column>
                          <el-table-column width="90" property="residualAmount" label="可用数量"></el-table-column>
                          <el-table-column width="50" property="amountUnit" label="单位"></el-table-column>
                          <el-table-column width="90" property="costPrice" label="单价（元）"></el-table-column>
                        </el-table>
                        <br>
                        <el-button
                          size="mini"
                          round
                          type="info"
                          style="margin-left: 36px"
                          @click="scope.row.visible = false">返 回
                        </el-button>
                        <el-button
                          size="mini"
                          round
                          type="primary"
                          slot="reference"
                          @click="popoverOpen(scope)">核对
                        </el-button>

                      </el-popover>
                      <!--    定制工序物料设计单物料设计表格-->

                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
            <el-col :span="2">
              <div></div>
            </el-col>
          </el-row>
          <!--/-设计单表格-->
          <el-row>
            <el-col :span="7" :offset="3">
              <div><!--产品名称：笔记本-->
                <el-form-item label="工时总成本:">
                  <el-input type="text" v-model="costPriceSum" readonly="readonly"/>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7" :offset="3">
              <div><!--产品名称：笔记本-->
                <el-form-item label="物料总成本:">
                  <!--                  <el-input type="text" v-model="moduleCostPriceSum" readonly="readonly"/>-->
                  {{total1}}
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11" :push="1">

              <el-form-item label="设计要求:">
                <el-input type="text" v-model="procedureDescribe" readonly="readonly"/>
              </el-form-item>

            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11" :push="1">
              <el-form-item label="审核人:">
                <!--                <div class="inline div02_01">-->
                <el-input type="text" v-model="registrant" readonly="readonly"/>
                <!--                </div>-->
              </el-form-item>
            </el-col>
            <el-col :span="12" :pull="2">
              <!--<div class="inline">登记时间：</div>-->
              <el-form-item label="审核时间:">
                <div class="inline">
                  <el-input type="text" v-model="registrationTime" readonly="readonly"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!--      /内容-->
    </el-drawer>
    <!--    /抽屉样式-->

  </div>
</template>

<script>
  export default {
    //工序物料设计单审核
    name: "Review_process_material_design_list",
    data() {
      return {
        //定制按钮绑定
        dZButton: '定制',
        //id
        mDPId: 0,
        mDPDId: 0,
        //工序设计表格数据绑定
        dMDData: [],
        //工序物料设计表单内表格设计表格本工序数量绑定
        // NumberOfProcesses: 0,
        //工序物料设计表单内表格设计表格数据绑定
        mDPMData: [],
        //工序物料设计表单内表格数据绑定
        mDPDData: [],
        //工序制作单表单绑定
        processData: [],
        //设计单表格数据绑定
        moduleSubtotal: 0,
        //设计单数据绑定
        designId: '',//工序设计单编号
        register: '',//登记人
        registrant: sessionStorage.getItem("loginId"),//审核人
        costPriceSum: 0,//工时总成本
        moduleCostPriceSum: 0,//物料总成本
        designer: '',//设计人
        //设计物料数据绑定
        procedureName: '',//工序名称
        procedureId: '',//工序编号
        procedureDescribe: '',//工序描述
        //点开设计单赋值绑定
        productName: '',//产品名称
        productId: '',//产品编号
        registrationTime: '',//登记时间
        registrationTime1: '',//登记时间1
        // Dialog-Table
        //工序选择数据
        manufactureConfigProcedureListData: [],
        dialogTableVisible: false,
        //抽屉绑定
        drawer: false,
        innerDrawer: false,
        // 表格绑定
        tableData: [],
        search: '',
        //分页绑定
        pageNumber: 1,//页码
        pageSize: 10,//数据条数
        total: 0,//总数据条数
      }
    },
    methods: {
      //
      aa(scope) {
        scope.row.amount = scope.row.NumberOfProcesses;
      },
      //工序物料设计
      submit() {
        this.$confirm('审核通过进行下一环节, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = new URLSearchParams();
          params.append("id", this.mDPId);
          params.append("designModuleTag", "G002-2");
          this.$axios.post("/mDesignProcedure/audit.action", params).then(response => {
            this.getData();
            this.$message({
              type: 'success',
              message: response.data
            });
          }).catch();
          this.$message({
            type: 'success',
            message: '已发送请求!'
          });
          this.drawer = false;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //抽屉内容
      //设置表头的颜色
      rowClass({row, rowIndex}) {
        console.log(rowIndex) //表头行标号为0
        return 'background:red'
      },

      //打开popover
      popoverOpen(a) {
        this.procedureName = a.row.procedureName;
        this.mDPDId = a.row.id;

        var params = new URLSearchParams();
        params.append("parentId", this.mDPDId);
        this.$axios.post("/MDesignProcedureModule/queryByPId.action", params).then(response => {
          this.dMDData = response.data;
        }).catch();

      },
      //打开抽屉
      drawerOpen(a, b) {
        this.drawer = true;
        this.productName = b.productName;
        this.productId = b.productId;
        this.designer = b.designer;
        this.costPriceSum = b.costPriceSum;
        this.procedureDescribe = b.procedureDescribe;
        this.mDPId = b.id;
        this.register = b.register;
        this.designId = b.designId;

        var params = new URLSearchParams();
        params.append("parentId", b.id);
        // JSON.stringify(newArr), {headers: {"Content-Type": "application/json"}}
        this.$axios.post("/MDesignProcedureDetails/queryByPId.action", params).then(response => {
          this.mDPDData = response.data;
        }).catch();

      },
      //抽屉关闭方法
      handleClose(done) {
        this.$confirm('您可能会丢失未提交的数据哦！')
          .then(_ => {
            done();
          })
          .catch(_ => {
            this.drawer = false;
          });
      },
      //分页函数
      handleSizeChange(val) {
        this.pageSize = val;
        this.getData();
      },
      handleCurrentChange(val) {
        this.pageNumber = val;
        this.getData();
      },
      //获取当前年月日
      addDate() {
        let date = new Date();
        let Y = date.getFullYear();
        let M = this.getStr(date.getMonth() + 1);
        let D = this.getStr(date.getDate());
        let hours = date.getHours();
        let minutes = this.getStr(date.getMinutes());
        let seconds = this.getStr(date.getSeconds());
        var date1 = Y + "-" + M + "-" + D + " " + hours + ":" + minutes + ":" + seconds;
        this.registrationTime = date1;
        this.registrationTime1 = date1;
      },
      getStr(point) {
        return ("00" + point).slice(-2); // 从字符串的倒数第二个字符开始截取，一直截取到最后一个字符；（在这里永远截取该字符串的最后两个字符）
      },
      //获取定制产品数据
      getData() {
        var params = new URLSearchParams();
        params.append("pageNumber", this.pageNumber);
        params.append("pageSize", this.pageSize);
        params.append("designModuleTag", "G002-1");
        this.$axios.post("/mDesignProcedure/queryByState.action", params).then(response => {
          this.tableData = response.data.records;
          this.total = response.data.total;
          this.addDate();
        }).catch();
      }
    },
    computed: {
      total1() {
        var i = 0;
        this.mDPDData.forEach((item) => {
          i = i + Number(item.moduleSubtotal);
        });
        return i;
      }
    },
    //钩子调用函数
    created() {
      this.getData();
    }
  }
</script>

<style scoped>

  .content1 {
    font-weight: bold;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 2px;*/
    border-radius: 1px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0);
  }

  .content {
    font-weight: bold;
    margin: auto;
    width: 992px;
    height: 600px;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 2px;*/
    border-radius: 1px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .inline { /*转换行内元素*/
    display: inline-block;
  }

  .div02_01 { /*div下边框*/
    border-bottom: 1px solid black;
    width: 300px;
    text-align: left;
  }

  .drop-downBox {
    width: 333px;
  }

  /*.el-input__inner{*/
  /*  border: none;*/
  /*}*/
  .aa .el-form-item--small .el-form-item__content,
  .el-form-item--small .el-form-item__labe {
    width: 83%;
  }

  /*.yanse{*/
  /*  background-color:yellow;*/
  /*}*/
  /*.div03{*/
  /*  position: absolute;*/
  /*  left: 95px;*/
  /*  background: pink;*/
  /*}*/
  /*.div04{*/
  /*  position: absolute;*/
  /*  left: 1200px;*/
  /*}*/

</style>

