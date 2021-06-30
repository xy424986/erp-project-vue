<template>
  <div>
    <!--  表格-->
    <template>
      <el-table
        :data="tableData.filter(data => !search || data.productName.toLowerCase().includes(search.toLowerCase()))"
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
              placeholder="输入产品名称搜索"/>
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
      title="产品生产工序设计单"
      :visible.sync="drawer"
      size="80%">
      <!--      内容-->
      <div class="content">
        <el-form size="small" :inline="true" v-model="procedureForm">
          <el-row>
            <el-col :span="3">
              <el-button size="mini" round type="success" icon="el-icon-circle-plus-outline"
                         @click="getMDesignProcedureDetailsData()">添加工序
              </el-button>
            </el-col>
            <el-col :span="2">
              <el-button size="mini" round type="success" icon="el-icon-delete" @click="deleteProcess">删除工序
              </el-button>
            </el-col>
          </el-row>
          <hr>
          <el-row>
            <el-col :span="7" :offset="3">
              <div><!--产品名称：笔记本-->
                <el-form-item label="产品名称:">
                  <el-input type="text" v-model="productName" readonly="readonly"/>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7" :offset="2">
              <div><!--产品编号：1000000-->
                <el-form-item label="产品编号:">
                  <el-input type="text" v-model="productId" readonly="readonly"/>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" :offset="2">
              <el-form-item label="设计人:">
                <div class="inline div02_01">
                  <el-input type="text" v-model="procedureForm.designer" :clearable="true"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <!--设计单表格-->
          <el-row>
            <el-col :span="20" :offset="2">
              <div>
                <el-table
                  :data="processData"
                  border
                  height="244"
                  style="width: 100%"
                  :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                  ref="table"
                  @selection-change='selectRow'>
                  <el-table-column
                    width="50"
                    type="selection"
                    label="选中">
                  </el-table-column>
                  <el-table-column
                    width="100"
                    label="工序名称"
                    prop="typeName">
                  </el-table-column>
                  <el-table-column
                    width="100"
                    label="工序编号"
                    prop="typeId">
                  </el-table-column>
                  <el-table-column
                    label="描述"
                    prop="describe1">
                  </el-table-column>
                  <el-table-column
                    width="100"
                    label="工时数">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.manHour" v-on:input="chen(scope)" style="height: 10px"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    width="100"
                    label="工时单位">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.manHourUnit"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    width="120"
                    label="单位工时成本">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.costPrice" v-on:input="chen(scope)"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    width="150"
                    label="工时成本小计（元）"
                    prop="subtotal">
                    <!--                    <template slot-scope="scope">-->
                    <!--                      <el-input v-model="scope.row.subtotal" readonly></el-input>-->
                    <!--                    </template>-->
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
          </el-row>
          <!--/-设计单表格-->
          <el-row>
            <el-col :span="13" :push="1">
              <el-form-item label="登记人:">
                <div class="inline div02_01">
                  <el-input type="text" v-model="procedureForm.registrant" readonly="readonly"/>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="9" :pull="2">
              <!--<div class="inline">登记时间：</div>-->
              <el-form-item label="登记时间:">
                <div class="inline">
                  <el-input type="text" v-model="registrationTime" readonly="readonly"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" :offset="2">
              <div class="aa">
                <el-form-item label="设计要求:" style="width: 80%; display: block;">
                  <el-input type="textarea" :rows="4" resize="none" placeholder="请输入内容" style="width: 100%"
                            v-model="procedureForm.designRequirements">
                  </el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14">
              <el-button size="mini" round type="primary" icon="el-icon-zoom-in" @click="innerDrawer = true">预览
              </el-button>
            </el-col>
            <el-col :span="6">
              <el-button size="mini" round type="info" icon="el-icon-close" @click="handleClose">取消</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!--      /内容-->
      <div>
        <!--        <el-button @click="innerDrawer = true">打开里面的!</el-button>-->
        <el-drawer
          title="产品生产工序设计单预览"
          :append-to-body="true"
          :before-close="handleClose"
          :visible.sync="innerDrawer"
          size="80%">
          <!--                    子内容-->
          <div class="content">
            <el-form size="small" :inline="true" v-model="procedureForm">
              <hr>
              <el-row>
                <el-col :span="7" :offset="3">
                  <div><!--产品名称：笔记本-->
                    <el-form-item label="产品名称:">
                      <el-input type="text" v-model="productName" readonly="readonly"/>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="7" :offset="2">
                  <div><!--产品编号：1000000-->
                    <el-form-item label="产品编号:">
                      <el-input type="text" v-model="productId" readonly="readonly"/>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10" :offset="2">
                  <el-form-item label="设计人:">
                    <div class="inline div02_01">
                      <el-input type="text" v-model="procedureForm.designer" readonly :clearable="true"/>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--设计单表格-->
              <el-row>
                <el-col :span="20" :offset="2">
                  <div>
                    <el-table
                      :data="processData"
                      border
                      height="244"
                      style="width: 100%"
                      :header-cell-style="{background:'#eef1f6',color:'#606266'}">
                      <el-table-column
                        width="50"
                        prop="id"
                        label="选中">
                      </el-table-column>
                      <el-table-column
                        width="100"
                        label="工序名称"
                        prop="typeName">
                      </el-table-column>
                      <el-table-column
                        width="100"
                        label="工序编号"
                        prop="typeId">
                        <!--                    <el-input v-model="" readonly="readonly"></el-input>-->
                      </el-table-column>
                      <el-table-column
                        label="描述"
                        prop="describe1">
                        <!--                    <el-input v-model="describe1" readonly="readonly"></el-input>-->
                      </el-table-column>
                      <el-table-column
                        width="100"
                        label="工时数"
                        prop="manHour">
                      </el-table-column>
                      <el-table-column
                        width="100"
                        label="工时单位"
                        prop="manHourUnit">
                      </el-table-column>
                      <el-table-column
                        width="120"
                        label="单位工时成本"
                        prop="costPrice">
                      </el-table-column>
                      <el-table-column
                        width="150"
                        label="工时成本小计（元）"
                        prop="subtotal">
                        <!--                        <template slot-scope="scope">-->
                        <!--                          <el-input v-model="procedureForm.subtotal" readonly></el-input>-->
                        <!--                        </template>-->
                      </el-table-column>
                    </el-table>
                  </div>
                </el-col>

              </el-row>
              <!--/-设计单表格-->
              <el-row>
                <el-col :span="13" :push="1">
                  <el-form-item label="登记人:">
                    <div class="inline div02_01">
                      <el-input type="text" v-model="procedureForm.registrant" readonly="readonly"/>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="9" :pull="2">
                  <!--<div class="inline">登记时间：</div>-->
                  <el-form-item label="登记时间:">
                    <div class="inline">
                      <el-input type="text" v-model="registrationTime" readonly="readonly"/>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" :offset="2">
                  <div class="aa">
                    <el-form-item label="设计要求:" style="width: 80%; display: block;">
                      <el-input type="textarea" :rows="4" resize="none" placeholder="请输入内容" style="width: 100%"
                                v-model="procedureForm.designRequirements" readonly>
                      </el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="14">
                  <el-button size="mini" round type="primary" icon="el-icon-check" @click="submit">提交
                  </el-button>
                </el-col>
                <el-col :span="6">
                  <el-button size="mini" round type="info" icon="el-icon-close" @click="innerDrawer = false">取消
                  </el-button>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-drawer>
      </div>
    </el-drawer>
    <!--    /抽屉样式-->

    <!-- 添加工序Dialog-Table -->
    <el-dialog title="添加工序" :visible.sync="dialogTableVisible">
      <el-table :data="manufactureConfigProcedureListData">
        <el-table-column property="typeId" label="工序编号" width="150"></el-table-column>
        <el-table-column property="typeName" label="工序名称" width="200"></el-table-column>
        <el-table-column property="describe1" label="工序描述"></el-table-column>

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
    //定制产品生产工序设计单
    name: "Design_of_single",
    data() {
      return {
        //定制产品生产工序设计单id
        dFileId: 0,
        //工序制作单表单绑定
        processData: [],
        procedureForm: {
          manHour1: '',//工时数
          manHourUnit: '',//工时单位
          costPrice: '',//单位工时成本
          subtotal: '',//工时成本小计
          designRequirements: '',//设计要求
          registrant: '何海云',//登记人
          registrationTime: '',//登记时间
          productName: '',//产品名称
          productId: '',//产品编号
          procedureName: '',//工序名称
          procedureId: '',//工序编号
          procedureDescribe: '',//工序描述
        },
        //设计单表格数据绑定
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
        pageSize: 5,//数据条数
        total: 0,//总数据条数
        subtotal: 0,//
        selectlistRow:[],
        rowNum:1
      }
    },
    methods: {
      // 获取表格选中时的数据
      selectRow (val) {
        this.selectlistRow = val;
      },
      //计算小计
      chen(scope) {
        scope.row.subtotal = Number(scope.row.manHour * scope.row.costPrice);
      },

      //删除工序
      deleteProcess(){
        for (let i = 0; i < this.selectlistRow.length; i++) {
          let val = this.selectlistRow
          // 获取选中行的索引的方法
          // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
          // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
          val.forEach((val, index) => {
            this.processData.forEach((v, i) => {
              if (val.rowNum === v.rowNum) {
                // i 为选中的索引
                this.processData.splice(i, 1)
              }
            })
          })
        }
        // 删除完数据之后清除勾选框
        this.$refs.table.clearSelection();
      },
      //添加工序
      addProcess(index, ids) {
        if (this.processData.length > 0) {
          var obj = this.processData.find(item => {
            return item.id == ids;
          });
          if (obj == null) {
            this.processData.push(this.manufactureConfigProcedureListData[index]);
          }
        } else {
          this.processData.push(this.manufactureConfigProcedureListData[index]);
        }
      },
      //显示添加工序可选数据
      getMDesignProcedureDetailsData() {
        this.dialogTableVisible = true;
        this.$axios.get("/ManufactureConfigProcedureList/queryAll.action").then(response => {
          this.manufactureConfigProcedureListData = response.data;
        }).catch();
      },
      //提交工序设计单
      submit() {
        var arr = this.processData;
        let newArr = [];
        arr.map((item, index) => {
          newArr.push(
            Object.assign({}, item, {
                "productName": this.productName,
                "productId": this.productId,
                "designer": this.procedureForm.designer,
                "procedureName": item.typeName,
                "procedureId": item.typeId,
                "procedureDescribe": item.describe1,
                "labourHourAmount": item.manHour,
                "amountUnit": item.manHourUnit,
                "costPrice": item.costPrice,
                "register": this.procedureForm.registrant,
                "procedureDescribe1": this.procedureForm.designRequirements,
                "dFileId": this.dFileId
              }
            )
          )
        });

        this.$confirm('此操作将永久提交该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post("/mDesignProcedure/insert.action", JSON.stringify(newArr),
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

      addSCll() {
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
        this.pageSize = val;
        // this.pageNumber = 1;
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
      },
      getStr(point) {
        return ("00" + point).slice(-2); // 从字符串的倒数第二个字符开始截取，一直截取到最后一个字符；（在这里永远截取该字符串的最后两个字符）
      },
      //获取定制产品数据
      getData() {
        var params = new URLSearchParams();
        params.append("pageNumber", this.pageNumber);
        params.append("pageSize", this.pageSize);
        params.append("designProcedureTag", "G001-0");
        params.append("type", "Y001-1");
        this.$axios.post("/DFile/queryByState.action", params).then(response => {
          this.tableData = response.data.records;
          this.total = response.data.total;
          this.addDate();
        }).catch();
      }
    },
    //钩子调用函数
    created() {
      this.getData();
    }
  }
</script>

<style scoped>

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
