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
        <el-form size="small" :inline="true" v-model="scallForm">
          <el-row>
            <el-col :span="3">
              <el-button size="mini" round type="success" icon="el-icon-circle-plus-outline"
                         @click="getMDesignProcedureDetailsData()">添加工序
              </el-button>
            </el-col>
            <el-col :span="2">
              <el-button size="mini" round type="success" icon="el-icon-delete" @click="">删除工序
              </el-button>
            </el-col>
          </el-row>
          <hr>
          <el-row>
            <el-col :span="4">
              <div></div>
            </el-col>
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
            <el-col :span="6">
              <div></div>
            </el-col>
          </el-row>
<!--          <el-row>-->
<!--            <el-col :span="22" :offset="1">&lt;!&ndash;<div class="inline">库存下限数：</div>&ndash;&gt;-->
<!--              <el-form-item label="设计人:">-->
<!--                <div class="inline div02_01">-->
<!--                  <el-input type="text" v-model="scallForm.minAmount" :clearable="true"/>-->
<!--                </div>-->
<!--              </el-form-item>-->
<!--              &lt;!&ndash;<div class="inline">库存报警上限数：</div>&ndash;&gt;-->
<!--              <el-form-item label="库存报警上限数:">-->
<!--                <div class="inline div02_01" :clearable="true">-->
<!--                  <el-input type="text" v-model="scallForm.maxAmount" class="el-input" :clearable="true"/>-->
<!--                </div>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col :span="2">-->
<!--              <div></div>-->
<!--            </el-col>-->
<!--          </el-row>-->
          <el-row>
<!--            <el-col :span="12" :offset="1">-->
<!--              <div class="inline">-->
<!--                &lt;!&ndash;设置B/N或S/N：&ndash;&gt;-->
<!--                <el-form-item label="设置B/N或S/N:">-->
<!--                  <el-select style="border: 1px solid #DCDFE6;" class="drop-downBox " v-model="value">-->
<!--                    <el-option-->
<!--                      v-for="item in options"-->
<!--                      :key="item.value"-->
<!--                      :label="item.label"-->
<!--                      :value="item.value">-->
<!--                    </el-option>-->
<!--                  </el-select>-->
<!--                </el-form-item>-->
<!--              </div>-->

<!--            </el-col>-->
<!--            <el-col :span="2">-->
<!--              <div></div>-->
<!--            </el-col>-->
            <el-col :span="10" :offset="2">
              <el-form-item label="设计人:">
                <div class="inline div02_01">
                  <el-input type="text" v-model="scallForm.theDesigner" :clearable="true"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <!--表格-->
          <el-row>
            <el-col :span="2">
              <div></div>
            </el-col>
            <el-col :span="20" :offset="2">
              <div>
                <el-table
                  :data="dFileForm"
                  border
                  height="140"
                  style="width: 100%"
                  :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                  :cell-style="cellStyle">
                  <el-table-column
                    width="50"
                    prop="id"
                    label="序号">
                  </el-table-column>
                  <el-table-column
                    width="100"
                    label="工序名称">
                    <span>成品库</span>
                  </el-table-column>
                  <el-table-column
                    width="100"
                    prop="css"
                    label="工序编号">
                    <el-input v-model="css" readonly="readonly"></el-input>
                  </el-table-column>
                  <el-table-column
                    prop="ass"
                    label="描述">
                    <el-input v-model="ass" readonly="readonly"></el-input>
                  </el-table-column>
                  <el-table-column
                    width="100"
                    label="工时数">
                    <template slot-scope="scope">
                      <el-input v-model="scallForm.storageUnitAbbreviation"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    width="100"
                    label="工时单位">
                    <template slot-scope="scope">
                      <el-input v-model="scallForm.maxCapacityAmount"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    width="120"
                    label="单位工时成本">
                    <template slot-scope="scope">
                      <el-input v-model="scallForm.storageUnit"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    width="150"
                    label="工时成本小计（元）">
                    <template slot-scope="scope">
                      <el-input v-model="scallForm.storageUnit"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
            <el-col :span="2">
              <div></div>
            </el-col>
          </el-row>
          <!--/表格-->
          <el-row>
            <el-col :span="13" :push="1" >
              <!--<div class="inline">登记人：</div>-->
              <el-form-item label="登记人:">
                <div class="inline div02_01">
                  <el-input type="text" v-model="scallForm.register" readonly="readonly"/>
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
                            v-model="scallForm.config">
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
          <!--          子内容-->
          <div class="content">
            <el-form size="small" :inline="true" v-model="scallForm">
              <hr>
              <el-row>
                <el-col :span="4">
                  <div></div>
                </el-col>
                <el-col :span="7" :offset="3">
                  <div><!--产品名称：笔记本-->
                    <el-form-item label="产品名称:">
<!--                      <el-input type="text" v-model="scallForm.productName" readonly="readonly"/>-->
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="7" :offset="2">
                  <div><!--产品编号：1000000-->
                    <el-form-item label="产品编号:">
<!--                      <el-input type="text" v-model="scallForm.productId" readonly="readonly"/>-->
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div></div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="22" :offset="1"><!--<div class="inline">库存下限数：</div>-->
                  <el-form-item label="库存下限数:">
                    <div class="inline div02_01">
                      <el-input type="text" v-model="scallForm.minAmount" :clearable="true"/>
                    </div>
                  </el-form-item>
                  <!--<div class="inline">库存报警上限数：</div>-->
                  <el-form-item label="库存报警上限数:">
                    <div class="inline div02_01" :clearable="true">
                      <el-input type="text" v-model="scallForm.maxAmount" class="el-input" :clearable="true"/>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <div></div>
                </el-col>
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
                <el-col :span="2">
                  <div></div>
                </el-col>
                <el-col :span="10">
                  <!--<div class="inline">设计人：</div>-->
                  <el-form-item label="设计人:">
                    <div class="inline div02_01">
                      <el-input type="text" v-model="scallForm.theDesigner" :clearable="true"/>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--表格-->
              <el-row>
                <el-col :span="2">
                  <div></div>
                </el-col>
                <el-col :span="20" :offset="2">
                  <div>
                    <el-table
                      :data="dFileForm"
                      border
                      height="140"
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
                        label="库房名称">
                        <span>成品库</span>
                      </el-table-column>
                      <el-table-column
                        width="140"
                        prop="css"
                        label="储存地址地址编号">
                        <el-input v-model="css" readonly="readonly"></el-input>
                      </el-table-column>
                      <el-table-column
                        prop="ass"
                        label="储存地址名称">
                        <el-input v-model="ass" readonly="readonly"></el-input>
                      </el-table-column>
                      <el-table-column
                        width="100"
                        label="储存单元简称">
                        <template slot-scope="scope">
                          <el-input v-model="scallForm.storageUnitAbbreviation"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        width="110"
                        label="最大储蓄量">
                        <template slot-scope="scope">
                          <el-input v-model="scallForm.maxCapacityAmount"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        width="100"
                        label="储存单位">
                        <template slot-scope="scope">
                          <el-input v-model="scallForm.storageUnit"></el-input>
                        </template>

                      </el-table-column>
                    </el-table>
                  </div>
                </el-col>
                <el-col :span="2">
                  <div></div>
                </el-col>
              </el-row>
              <!--/表格-->
              <el-row>
                <el-col :span="14" :push="1">
                  <!--<div class="inline">登记人：</div>-->
                  <el-form-item label="登记人:">
                    <div class="inline div02_01">
                      <el-input type="text" v-model="scallForm.register" readonly="readonly"/>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="7" :pull="2">
                  <!--<div class="inline">登记时间：</div>-->
                  <el-form-item label="登记时间:">
                    <div class="inline">
                      <el-input type="text" v-model="scallForm.registerTime" readonly="readonly"/>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" :offset="3">
                  <div class="aa">
                    <el-form-item label="配置要求:" style="width: 80%; display: block;">
                      <el-input type="textarea" :rows="4" resize="none" placeholder="请输入内容" style="width: 100%"
                                v-model="scallForm.config">
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

    <!-- Dialog-Table -->
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <el-table :data="mDesignProcedureDetailsData">
        <el-table-column property="procedureId" label="工序编号" width="150"></el-table-column>
        <el-table-column property="procedureName" label="工序名称" width="200"></el-table-column>
        <el-table-column property="procedureDescribe" label="工序描述"></el-table-column>
        <el-table-column label="添加">
          <el-button size="mini" round type="primary" icon="el-icon-check" @click="">添加</el-button>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- /Dialog-Table -->
  </div>
</template>

<script>
  export default {
    //定制产品生产工序设计单
    name: "Design_of_single",
    data() {
      return {
        //点开设计单赋值绑定
        productName:'',//产品名称
        productId:'',//产品编号
        registrationTime: new Date(),//登记时间
        // Dialog-Table
        //工序选择数据
        mDesignProcedureDetailsData: [],
        dialogTableVisible: false,
        //form表单
        ass: "",
        css: "",
        options: [{
          value: '1',
          label: '是'
        }, {
          value: '0',
          label: '否'
        }],
        value: "否",
        dFileForm: [],
        scallForm: {
          config: "",//配置要求
          register: '',//登记人
          registerTime: "",//登记时间
          minAmount: 0,//库存报警下限数
          maxAmount: 0,//库存报警上限数
          maxCapacityAmount: 0,//最大存储量
          amount: 0,//当前存储量
          thirdKindName: "",//产品III级分类名称
          thirdKindId: "",//产品III级分类编号
          secondKindName: "",//产品II级分类名称
          secondKindId: "",//产品II级分类编号
          firstKindName: "",//产品I级分类名称
          firstKindId: "",//产品I级分类编号
          productName: "",//产品名称
          productId: "",//产品编号
          storeId: "",//库存编号
          storageUnit: "",//储存单元
          storageUnitAbbreviation: "",//储存单元简称
          theDesigner: ""//设计人
        },
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
      getMDesignProcedureDetailsData() {
        this.dialogTableVisible = true;
        this.$axios.get("/MDesignProcedureDetails/queryByChangeState.action").then(response => {
          this.mDesignProcedureDetailsData = response.data;
        }).catch();
      },
      //提交工序设计单
      submit() {
        this.innerDrawer = false;
        this.drawer = false;
      },
      addSCll() {
      },
      //抽屉内容
      //设置表头的颜色
      rowClass({row, rowIndex}) {
        console.log(rowIndex) //表头行标号为0
        return 'background:red'
      },
      //设置指定行、列、具体单元格颜色
      cellStyle({row, column, rowIndex, columnIndex}) {
        var arr = [4, 5, 6];
        for (var i = 0; i < arr.length; i++) {
          if (columnIndex === arr[i]) { //指定坐标rowIndex ：行，columnIndex ：列
            return 'background:yellow' //rgb(105,0,7)
          }
        }
      },
      //打开抽屉
      drawerOpen(a, b) {
        this.drawer = true;
        this.productName = b.productName;
        this.productId = b.productId;
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
      //获取定制产品数据
      getData() {
        var params = new URLSearchParams();
        params.append("pageNumber", this.pageNumber);
        params.append("pageSize", this.pageSize);

        this.$axios.post("/DFile/queryByState.action", params).then(response => {
          this.tableData = response.data.records;
          this.total = response.data.total;
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
    height: 555px;
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
