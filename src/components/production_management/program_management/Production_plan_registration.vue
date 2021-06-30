<template>
  <div>

    <div class="content">
      <el-form size="small" :inline="true">
        <el-row>
          <el-col :span="3">
            <el-button size="mini" round type="success" icon="el-icon-circle-plus-outline"
                       @click="getMDesignProcedureDetailsData()">添加产品
            </el-button>
          </el-col>
          <el-col :span="2">
            <el-button size="mini" round type="success" icon="el-icon-delete" @click="">删除产品
            </el-button>
          </el-col>
        </el-row>
        <hr>
        <el-row>
          <el-col :span="10" :offset="2">
            <el-form-item label="登记人:">
              <div>
                <el-input type="text" v-model="registrant" :clearable="true" readonly/>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="登记时间:">
              <div>
                <el-input type="text" v-model="registrationTime" :clearable="true" readonly/>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <!--设计单表格-->
        <el-row>
          <el-col :span="20" :offset="2">
            <div>
              <el-table
                :data="productionPlan"
                border
                height="244"
                style="width: 100%"
                :header-cell-style="{background:'#eef1f6',color:'#606266'}">
                <el-table-column
                  width="50"
                  type="selection"
                  label="选中">
                </el-table-column>
                <el-table-column
                  width="100"
                  label="产品名称"
                  prop="productName">
                </el-table-column>
                <el-table-column
                  width="100"
                  label="产品编号"
                  prop="productId">
                </el-table-column>
                <el-table-column
                  label="描述"
                  prop="productDescribe">
                </el-table-column>
                <el-table-column
                  width="100"
                  label="数量"
                  prop="amount">
                  <template slot-scope="scope">
                    <el-input style="height: 10px" v-model="scope.row.Number" v-on:input="aa(scope)"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  width="100"
                  label="单位"
                  prop="amountUnit">
                </el-table-column>
                <el-table-column
                  width="120"
                  label="单价（元）"
                  prop="costPrice"
                >
                </el-table-column>
                <el-table-column
                  width="150"
                  label="小计（元）">
                  <!--                  <template slot-scope="scope">{{subtotal(scope)}}</template>-->
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
        <!--/-设计单表格-->
        <el-row style="margin-top: 12px">
          <el-col :span="24" :offset="2">
            <div class="aa">
              <el-form-item label="备注:" style="width: 80%; display: block;">
                <el-input type="textarea" :rows="4" resize="none" placeholder="请输入内容" v-model="remark"
                          style="width: 100%">
                </el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-button size="mini" round type="primary" icon="el-icon-zoom-in" @click="submit">提交
            </el-button>
          </el-col>
          <el-col :span="6">
            <el-button size="mini" round type="info" icon="el-icon-close" @click="handleClose">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 添加工序Dialog-Table -->
    <el-dialog title="添加工序" :visible.sync="dialogTableVisible">
      <el-table :data="dFileData">
        <el-table-column property="productId" label="产品编号" width="150"></el-table-column>
        <el-table-column property="productName" label="产品名称" width="200"></el-table-column>
        <el-table-column property="type" label="用途类型"></el-table-column>
        <el-table-column property="amountUnit" label="单位"></el-table-column>
        <el-table-column property="costPrice" label="单价"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" round type="primary" icon="el-icon-check"
                       @click="addProcess(scope.$index, scope.row.id)">添加
            </el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-dialog>
    <!-- /添加工序Dialog-Table -->
  </div>
</template>

<script>
  export default {
    //新发生生产计划登记
    name: "Production_plan_registration",
    data() {
      return {
        //数量绑定
        amount: 0,
        //定制产品生产工序设计单id
        dFileId: 0,
        //工序制作单表单绑定
        productionPlan: [],
        procedureForm: {
          manHour: '',//工时数
          manHourUnit: '',//工时单位
          costPrice: '',//单位工时成本
          subtotal: '',//工时成本小计
          designRequirements: '',//设计要求
          registrationTime: '',//登记时间
          productName: '',//产品名称
          productId: '',//产品编号
          procedureName: '',//工序名称
          procedureId: '',//工序编号
          procedureDescribe: '',//工序描述
        },
        //设计单表格数据绑定
        remark: '',//备注
        registrant: sessionStorage.getItem("loginId"),//登记人
        designer: '',//设计人
        procedureName: '',//工序名称
        procedureId: '',//工序编号
        procedureDescribe: '',//工序描述
        //点开设计单赋值绑定
        productName: '',//产品名称
        productId: '',//产品编号
        registrationTime: '',//登记时间
        // Dialog-Table
        //工序选择数据
        dFileData: [],
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
        scope.row.amount = scope.row.Number;
      },
      //添加工序
      addProcess(index, ids) {
        if (this.productionPlan.length > 0) {
          var obj = this.productionPlan.find(item => {
            return item.id == ids;
          });
          if (obj == null) {
            this.productionPlan.push(this.dFileData[index]);
          }
        } else {
          this.productionPlan.push(this.dFileData[index]);
        }
      },
      //显示添加工序可选数据
      getMDesignProcedureDetailsData() {
        this.dialogTableVisible = true;
        var params = new URLSearchParams();
        params.append("type", "Y001-1");
        params.append("checkTag", "S001-1");
        params.append("designModuleTag", "W001-1");
        params.append("designProcedureTag", "G001-1");

        this.$axios.post("/DFile/queryByState1.action", params).then(response => {
          this.dFileData = response.data;
        }).catch();
      },
      //提交工序设计单
      submit() {
        var arr = this.productionPlan;
        let newArr = [];
        arr.map((item, index) => {
          newArr.push(
            Object.assign({}, item, {
                "register": this.registrant,
                "productName": item.productName,
                "productId": item.productId,
                "amount": item.amount,
                "remark": this.remark,
              }
            )
          )
        });

        this.$confirm('此操作将永久提交该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post("/MApply/insert.action", JSON.stringify(newArr),
            {headers: {"Content-Type": "application/json"}}).then(response => {
            // this.addDate();
            this.$message({
              type: 'success',
              message: response.data
            });
            console.log(JSON.stringify(newArr))
          }).catch();
          this.$message({
            type: 'success',
            message: '已提交!'
          });
          this.innerDrawer = false;
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
      //打开抽屉
      drawerOpen(a, b) {
        this.drawer = true;
        this.productName = b.productName;
        this.productId = b.productId;
        this.dFileId = b.id;
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
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
      },
      getStr(point) {
        return ("00" + point).slice(-2); // 从字符串的倒数第二个字符开始截取，一直截取到最后一个字符；（在这里永远截取该字符串的最后两个字符）
      },
    },
    computed: {
      subtotal(scope) {
        return this.amount * scope.row.costPrice;
      }
    },
    //钩子调用函数
    created() {
      this.addDate();
    }
  }
</script>

<style scoped>

  .content {
    /*margin-top: 21px;*/
    font-weight: bold;
    margin: auto;
    width: 992px;
    height: 542px;
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
