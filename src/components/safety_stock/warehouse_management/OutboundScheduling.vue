<template>
  <div>
    <div id="div01">
      <el-table
        :data="tableData"
        height="250"
        border
        style="width: 100%">
        <el-table-column
          prop="payId"
          label="出库单编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="reason"
          label="出库理由"
          width="180">
          <template scope="scope">
            <span v-if="scope.row.reason === 'C002-1'">生产领料</span>
            <span v-else-if="scope.row.reason === 'C002-2'">赠送</span>
            <span v-else-if="scope.row.reason === 'C002-3'">内部借领</span>
            <span v-else-if="scope.row.reason === 'C002-4'">其他借领</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="reasonexact"
          label="出库详细理由">
        </el-table-column>
        <el-table-column
          prop="registerTime"
          label="登记时间">
        </el-table-column>
        <el-table-column
          prop="amountSum"
          label="总件数">
        </el-table-column>
        <el-table-column
          prop="costPriceSum"
          label="总金额(元)">
        </el-table-column>
        <el-table-column
          label="出库调度"
          width="100">
          <template slot-scope="scope">
            <el-button  size="mini" round type="primary" icon="el-icon-check" @click="outQueryByPayIdSPay(scope.row.payId)">调度</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-drawer
      :visible.sync="drawer"
      size="80%">
      <div>
        <el-form  size="small" :inline="true" v-model="scellform">
          <el-row>
            <el-col :span="1"><div></div></el-col>
            <el-col :span="18"><h3>出库调度单</h3></el-col>
            <el-col :span="3">
              <el-button @click="handleClose"  size="mini" round type="primary" icon="el-icon-check">返回</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11" :offset="1">
              <div>
                <el-form-item label="出库单编号:">
                  <el-input type="text" v-model="scellform1.payId" readonly="readonly"/>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7" :offset="2">
              <div>
              </div>
            </el-col>
            <el-col :span="6"><div></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="14" >
              <div><!--产品名称：笔记本-->
                <el-form-item label="出库理由:">
                  <!-- <el-input type="text" v-model="scellform1.reason" readonly="readonly"/>
                  -->
                  <span v-if="scellform1.reason === 'C002-1'">生产领料</span>
                  <span v-else-if="scellform1.reason === 'C002-2'">赠送</span>
                  <span v-else-if="scellform1.reason === 'C002-3'">内部借领</span>
                  <span v-else-if="scellform1.reason === 'C002-4'">其他借领</span>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7" >
              <el-form-item label="出库详细理由:">
                <div class="inline">
                  <el-input type="text" v-model="scellform1.reasonexact" readonly="readonly"/>
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
                    width="60"
                    prop="id"
                    label="序号">
                  </el-table-column>
                  <el-table-column
                    width="80"
                    prop="productName"
                    label="产品名称">
                  </el-table-column>
                  <el-table-column
                    width="140"
                    prop="productId"
                    label="产品编号">
                  </el-table-column>
                  <el-table-column
                    prop="amount"
                    label="应出库件数">
                  </el-table-column>
                  <el-table-column
                    prop="paidAmount"
                    width="100"
                    label="已出库件数">
                  </el-table-column>
                  <el-table-column
                    width="110"
                    prop="payAss"
                    label="存储地址集合">
                  </el-table-column>
                  <el-table-column
                    width="100"
                    prop="payTag"
                    label="调度">
                    <template slot-scope="scope">
                      <div v-if="scope.row.payTag === 'K002-1'">
                        <el-button  size="mini" round type="primary" icon="el-icon-check" @click="outQueryByIdSPayEX(scope.row.id)">调度</el-button>
                      </div>
                      <div v-else-if="scope.row.payTag === 'K002-2'">
                        <el-button  size="mini" round type="primary" icon="el-icon-check">已调度</el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
            <el-col :span="2"><div></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="10" :push="2">
              <el-form-item label="应出总库数:">
                <div class="inline"><el-input type="text" readonly="readonly" v-model="scellform1.amountSum" /></div>
              </el-form-item>
            </el-col>
            <el-col :span="11" :push="3">
              <el-form-item label="已出总库数:">
                <div class="inline">
                  <el-input type="text" v-model="sum" readonly="readonly"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div >
      <!--子内容-->
      <div>
        <!--        <el-button @click="innerDrawer = true">打开里面的!</el-button>-->
        <el-drawer
          title="出库调度单"
          :append-to-body="true"
          :before-close="handleClose"
          :visible.sync="innerDrawer"
          size="80%">
          <!--          子内容-->
          <div class="content">

            <el-form  size="small" :inline="true" v-model="scellform">
              <el-row>
                <el-col :span="1">
                  <el-popconfirm
                    title="确定提交吗？"
                    @confirm="addSCll"
                  >
                    <el-button slot="reference"  size="mini" round type="primary" icon="el-icon-check">提交</el-button>
                  </el-popconfirm>
                </el-col>
                <el-col :span="18"><div></div></el-col>
                <el-col :span="3">
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11" :offset="3">
                  <div>
                    <el-form-item label="出库单编号:">
                      <el-input type="text" v-model="scellform.payId" readonly="readonly"/>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="7" :offset="2">
                  <div><!--产品编号：1000000-->
                    <el-form-item label="产品编号:">
                      <el-input type="text" v-model="scellform.productId" readonly="readonly"/>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="6"><div></div></el-col>
              </el-row>
              <el-row>
                <el-col :span="14" :offset="3">
                  <div><!--产品名称：笔记本-->
                    <el-form-item label="产品名称:">
                      <el-input type="text" v-model="scellform.productName" readonly="readonly"/>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="7" >
                  <!--<div class="inline">登记时间：</div>-->
                  <el-form-item label="成本单价:">
                    <div class="inline">
                      <el-input type="text" v-model="scellform.costPrice" readonly="readonly"/>
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
                      :data="dfileform"
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
                        <template slot-scope="scope" >
                          <el-input v-model="scellform.storageUnitAbbreviation" readonly="readonly"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="amount"
                        width="110"
                        label="当前库存量">
                      </el-table-column>
                      <el-table-column
                        width="100"
                        label="本次出库数量">
                        <template slot-scope="scope">
                          <el-input v-model="scellAmount" ></el-input>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </el-col>
                <el-col :span="2"><div></div></el-col>
              </el-row>
              <el-row>
                <el-col :span="10" :push="2">
                  <el-form-item label="应出库数:">
                    <div class="inline"><el-input type="text" readonly="readonly" v-model="scellform.amount" /></div>
                  </el-form-item>
                </el-col>
                <el-col :span="11" :push="3">
                  <el-form-item label="已出库数:">
                    <div class="inline">
                      <el-input type="text" readonly="readonly"/>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10" :push="2">
                  <el-form-item label="登记人:">
                    <div class="inline div02_01"><el-input type="text" readonly="readonly" v-model="scellform.register" /></div>
                  </el-form-item>
                </el-col>
                <el-col :span="11" :push="3">
                  <el-form-item label="登记时间:">
                    <div class="inline">
                      <el-input type="text" v-model="scellform.registerTime" readonly="readonly"/>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div >
        </el-drawer>
      </div>
    </el-drawer>
  </div>
</template>

<script>
    export default {
      name: "OutboundScheduling",
      data() {
        return {
          tableData: [],
          pageno: 1,
          pagesize: 5,
          total: 0,
          dfileform: [],
          show: true,
          hidden: false,
          scellform: {
            register: '',//登记人
            registerTime: "",//登记时间
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
            attemperTime: 0,
            getpayId: ""
          },
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
          scellformId: "",
          sum: "",
          sumMoney: ""
        }
      },
      methods: {
        getdata() {   //制作安全库配置单1获取数据
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          this.$axios.post("SPay/queryAllSPay.May", params).then(function (response) {
            _this.tableData = response.data.records;
            _this.total = response.data.total;
            console.log("getdata" + _this.tableData)
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
        outQueryByPayIdSPay(payId) {//获取数据
          var _this = this;
          this.getgetpayId = payId;
          var params = new URLSearchParams();
          params.append("payId", payId);
          this.$axios.post("SPay/queryByPayIdSPay.May", params).then(function (response) {
            _this.scellform1 = response.data;
            _this.outQueryByParentIdSPayDetails(_this.scellform1.id);
            _this.scellformId = _this.scellform1.id;
            _this.drawer = true;
            _this.innerDrawer = false;
          }).catch();
        },
        outQueryByParentIdSPayDetails(parentId) {
          var _this = this;
          var params = new URLSearchParams();
          params.append("parentId", parentId);
          console.log(parentId)
          this.$axios.post("SPay/queryByParentIdSPayDetails.May", params).then(function (response) {
            _this.dfileform1 = response.data;

            for (var i = 0;i< _this.dfileform1.length; i++) {
              _this.sum += parseInt(_this.dfileform1.paidAmount);
              _this.sum = parseInt(_this.sum);
              console.log("openeditwin2" + _this.dfileform1);
            }
          }).catch();
        },
        outQueryByIdSPayEX(id) {//获取数据
          var _this = this;
          var params = new URLSearchParams();
          params.append("id", id);
          this.$axios.post("SPay/queryByIdSPayEX.May", params).then(function (response) {
            _this.scellform = response.data;
            _this.ass = _this.scellform.firstKindName + "-" + _this.scellform.secondKindName + "-" + _this.scellform.thirdKindName;
            _this.css = _this.scellform.firstKindId + "-" + _this.scellform.secondKindId + "-" + _this.scellform.thirdKindId;
            console.log("openeditwin4")
            console.log(_this.dfileform1)
            _this.outQueryByIdSCell2(_this.scellform.productId);
            _this.yiMoney = 0.0;
            _this.yiNumber = 0.0;
            _this.innerDrawer = true;
            console.log("outQueryByIdSPayEX" + _this.scellform)
          }).catch();
        },
        outQueryByIdSCell2(productId) {//获取数据
          console.log(productId)
          var _this = this;
          var params = new URLSearchParams();
          params.append("productId", productId);
          this.$axios.post("SCell/queryByIdSCell2.May", params).then(function (response) {
            _this.dfileform = response.data;
            console.log("outQueryByIdSCell2" + _this.dfileform)
          }).catch();
        },
        addSCll() {
          var _this = this;
          var params = new URLSearchParams();
          this.scellAmount2=_this.scellAmount;
          params.append("productId", _this.scellform.productId);//产品编号
          params.append("payId", _this.getgetpayId);//出库编号
          params.append("amount", _this.scellAmount);//当前存储量
          params.append("attemper", _this.scellform.register);//调度人
          params.append("attemperTime", this.scellform.checkTime);//调度人时间
          params.append("ass", this.ass);//储存地址集合
          params.append("scellformId", this.scellformId);//明细表的parentId
          params.append("reason", this.scellform1.reason);//出库理由
          console.log("addSCll-scellformId:" + this.scellformId)
          this.$axios.post("SPay/addSPay.May", params).then(function (response) {
            _this.$notify({
              title: '提示',
              message: response.data,
              type: 'success'
            });
            _this.scellAmount=0;
            _this.outQueryByPayIdSPay(_this.getgetpayId);
            console.log(_this.getgetpayId);
            _this.$forceUpdate();
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
