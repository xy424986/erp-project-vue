<template>
  <div>
    <div id="div01">
      <!--条件查询-->
      <el-form :inline="true"  class="demo-form-inline" v-model="scellform">
        <el-row>
          <el-col :span="12"><div>
            <el-form-item label="出库单编号:">
              <el-input type="text" v-model="scellform.payId" clearable placeholder="请输入入库单编号!"></el-input>
            </el-form-item>
          </div></el-col>
          <el-col :span="2" ><div>
            <el-button @click="sel">查询</el-button>
          </div></el-col>
        </el-row>
      </el-form>
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
          label="出库复核"
          width="100">
          <template slot-scope="scope">
            <el-button  size="mini" round type="primary" icon="el-icon-check" @click="openeditwin1(scope.row.payId)">复核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageno"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!--    抽屉样式-->
    <el-drawer
      :visible.sync="drawer"
      size="80%">
      <div>
        <el-form  size="small" :inline="true" v-model="scellform">
          <template>
            <el-radio v-model="scellform.checkTag" label="S001-1">通过</el-radio>
            <el-radio v-model="scellform.checkTag" label="S001-2">未通过</el-radio>
          </template>
          <el-row>
            <el-col :span="1">
              <el-popconfirm
                title="确定提交吗？"
                @confirm="addSCll"
              >
                <el-button slot="reference" size="mini" round type="primary" icon="el-icon-check">复核</el-button>
              </el-popconfirm>
            </el-col>
            <el-col :span="18"><h3>出库单复核</h3></el-col>
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
                    width="140"
                    prop="productId"
                    label="产品编号">
                  </el-table-column>
                  <el-table-column
                    width="80"
                    prop="productName"
                    label="产品名称">
                  </el-table-column>
                  <el-table-column
                    label="库房名称">
                    <span>成品库</span>
                  </el-table-column>
                  <el-table-column
                    width="110"
                    prop="payAss"
                    label="存放地址">
                  </el-table-column>
                  <el-table-column
                    prop="amount"
                    label="应出库件数">
                  </el-table-column>
                  <el-table-column
                    prop="paidAmount"
                    label="已出库件数">
                  </el-table-column>
                  <el-table-column
                    width="100"
                    prop="paidAmount"
                    label="本次出库数量">
                    </el-table-column>
                  <el-table-column
                    label="序列号">
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
          <el-row>
            <el-col :span="10" :push="2">
              <el-form-item label="应出库总成本:">
                <div class="inline"><el-input type="text" readonly="readonly" v-model="scellform1.costPriceSum" /></div>
              </el-form-item>
            </el-col>
            <el-col :span="11" :push="3">
              <el-form-item label="已出库总成本:">
                <div class="inline">
                  <el-input type="text" v-model="sumMoney" readonly="readonly"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col  :span="10" :push="2">
              <el-form-item label="复核人:">
                <div class="inline div02_01"><el-input type="text" v-model="scellform1.checker" readonly="readonly"/></div>
              </el-form-item>
            </el-col>
            <el-col :span="11" :push="3">
              <el-form-item label="复核时间:">
                <div class="inline">
                  <el-input type="text" v-model="checkTime1" readonly="readonly"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div >
    </el-drawer>
  </div>
</template>

<script>
    export default {
        name: "OutboundReview",
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
            getpayId: "",
            checkTag:"S001-1"
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
          sum: 0.0,
          sumMoney: 0.0,
          checkTime1:""
        }
      },
      methods: {
        getdata() {   //制作安全库配置单1获取数据
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          params.append("payId", this.scellform.payId);
          this.$axios.post("SPay/queryAllSPay2.May", params).then(function (response) {
            _this.tableData = response.data.records;
            _this.total = response.data.total;
            for (var i=0;i<_this.tableData.length;i++){console.log("getdata"+_this.tableData)}
          }).catch();
        }, sel(){this.getdata()},
        handleSizeChange(val) {  //页size变更
          this.pagesize = val;
          this.pageno = 1;
          this.getdata();
        },
        handleCurrentChange(val) {  //页码变更
          this.pageno = val;
          this.getdata();
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
        openeditwin1(payId){//获取数据
          var _this=this;
          this.getgatherId=payId;
          var params = new URLSearchParams();
          params.append("payId",payId);
          this.$axios.post("SPay/queryByPayIdSPay.May", params).then(function (response) {
            _this.scellform1=response.data;
            _this.queryByParentId(_this.scellform1.id);
            _this.scellformId=_this.scellform1.id;
            _this.drawer=true;
            _this.innerDrawer=false;
            _this.addDate();
          }).catch();
        },
        queryByParentId(productId){
          var _this=this;
          var params = new URLSearchParams();
          params.append("parentId", productId);
          console.log(productId)
          this.$axios.post("SPayDetails/queryByParentIdSPayDetails.May", params).then(function (response) {
            _this.dfileform1=response.data;
            for (var i=0;i<_this.dfileform1.length;i++){
              _this.sum+=parseInt(_this.dfileform1[i].paidAmount);
              _this.sumMoney+=parseInt(_this.dfileform1[i].subtotal);
              _this.sum=parseInt(_this.sum);
              _this.sumMoney=parseInt(_this.sumMoney);
              console.log("queryByParentId"+_this.dfileform1);
            }
          }).catch();
        },
        //获取当前年月日
        addDate(){
          let date = new Date();
          let Y = date.getFullYear();
          let M = this.getStr(date.getMonth() + 1);
          let D = this.getStr(date.getDate());
          let hours = date.getHours();
          let minutes = this.getStr(date.getMinutes());
          let seconds = this.getStr(date.getSeconds());
          var date1 =Y + "/" + M + "/" + D + " " + hours + ":" + minutes + ":" + seconds;
          this.checkTime1 = date1;
          console.log(this.checkTime1)
        },
        getStr(point) {
          return ("00" + point).slice(-2); // 从字符串的倒数第二个字符开始截取，一直截取到最后一个字符；（在这里永远截取该字符串的最后两个字符）
        },
        addSCll(){
          var _this=this;
          this.scellform.amount=0;
          var params = new URLSearchParams();
          params.append("id",_this.scellform1.id);//id
          params.append("checker",_this.scellform1.checker);//复核人
          params.append("checkTime",_this.checkTime1);//复核时间
          params.append("checkTag",_this.scellform.checkTag);//审核状态
          this.$axios.post("SPay/amendSPay.May",params).then(function (response) {
            if (response.data == true) {
              _this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success'
              });
            } else {
              _this.$notify({
                title: '失败',
                message: '修改失败',
                type: 'danger'
              });
            }
            _this.drawer=false;
            _this.getdata();
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
