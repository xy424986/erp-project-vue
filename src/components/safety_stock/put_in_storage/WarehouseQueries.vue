<template>
  <div>
    <div id="div01">
      <el-table
        :data="tableData"
        height="250"
        border
        style="width: 100%">
        <el-table-column
          prop="gatherId"
          label="入库单编号"
          width="180">
          <template slot-scope="scope">
           <span type="text" v-text="scope.row.gatherId" @click="openeditwin1(scope.row.gatherId)"></span>
          </template>-->
        </el-table-column>
        <el-table-column
          prop="reason"
          label="入库理由"
          width="180">
          <template scope="scope">
            <span v-if="scope.row.reason === 'R001-1'">生产入库</span>
            <span v-else-if="scope.row.reason === 'R001-2'">库存初始</span>
            <span v-else-if="scope.row.reason === 'R001-3'">赠送</span>
            <span v-else-if="scope.row.reason === 'R001-4'">内部归还</span>
            <span v-else-if="scope.row.reason === 'R001-5'">其他归还</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="reasonexact"
          label="入库详细理由">
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
          prop="gatherTag"
          label="入库单状态"
          width="100">
        <!--  <template slot-scope="scope">
            <el-button  size="mini" round type="primary" icon="el-icon-check" @click="openeditwin1(scope.row.gatherId)">复核</el-button>
          </template>-->
          <template scope="scope">
            <span v-if="scope.row.gatherTag === 'K002-1'">执行</span>
            <span v-else-if="scope.row.gatherTag === 'K002-2'">完成</span>
          </template>
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
            <el-col :span="1">
            </el-col>
            <el-col :span="18"><h3>入库单查询</h3></el-col>
            <el-col :span="3">
              <el-button @click="handleClose"  size="mini" round type="primary" icon="el-icon-check">返回</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11" :offset="1">
              <div>
                <el-form-item label="入库单编号:">
                  <el-input type="text" v-model="scellform1.gatherId" readonly="readonly"/>
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
                <el-form-item label="入库理由:">
                  <!-- <el-input type="text" v-model="scellform1.reason" readonly="readonly"/>
                  --> <span v-if="scellform1.reason === 'R001-1'">生产入库</span>
                  <span v-else-if="scellform1.reason === 'R001-2'">库存初始</span>
                  <span v-else-if="scellform1.reason === 'R001-3'">赠送</span>
                  <span v-else-if="scellform1.reason === 'R001-4'">内部归还</span>
                  <span v-else-if="scellform1.reason === 'R001-5'">其他归还</span>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7" >
              <el-form-item label="入库详细理由:">
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
                    label="库房名称">
                    <span>成品库</span>
                  </el-table-column>
                  <el-table-column
                    prop="amount"
                    label="应入库件数">
                  </el-table-column>
                  <el-table-column
                    prop="gatheredAmount"
                    label="已入库件数">
                  </el-table-column>
                  <el-table-column
                    prop="subtotal"
                    label="应入库小计">
                  </el-table-column>
                  <el-table-column
                    prop="subtotal"
                    label="已入库小计">
                  </el-table-column>
                  <el-table-column
                    label="查看">
                    <template slot-scope="scope">
                      <el-button  size="mini" round type="primary" icon="el-icon-check" @click="stoQueryByIdSGatherEx(scope.row.id)">查看</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
            <el-col :span="2"><div></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="10" :push="2">
              <el-form-item label="应入总库数:">
                <div class="inline"><el-input type="text" readonly="readonly" v-model="scellform1.amountSum" /></div>
              </el-form-item>
            </el-col>
            <el-col :span="11" :push="3">
              <el-form-item label="已入总库数:">
                <div class="inline">
                  <el-input type="text" v-model="sum" readonly="readonly"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" :push="2">
              <el-form-item label="应入库总成本:">
                <div class="inline"><el-input type="text" readonly="readonly" v-model="scellform1.costPriceSum" /></div>
              </el-form-item>
            </el-col>
            <el-col :span="11" :push="3">
              <el-form-item label="已入库总成本:">
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
      <!--子内容-->
      <div>
        <!--        <el-button @click="innerDrawer = true">打开里面的!</el-button>-->
        <el-drawer
          title="入库单明细"
          :append-to-body="true"
          :before-close="handleClose"
          :visible.sync="innerDrawer"
          size="80%">
          <!--          子内容-->
          <div class="content">

            <el-form  size="small" :inline="true" v-model="scellform">

              <el-row>
                <el-col :span="1">
                </el-col>
                <el-col :span="18"><div></div></el-col>
                <el-col :span="3">
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11" :offset="3">
                  <div>
                    <el-form-item label="入库单编号:">
                      <el-input type="text" v-model="scellform.gatherId" readonly="readonly"/>
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
                        prop="checkTime"
                        label="入库时间">
                      </el-table-column>
                      <el-table-column
                        prop="gatheredAmount"
                        width="100"
                        label="本次入库数量">
                      </el-table-column>
                      <el-table-column
                        width="110"
                        label="本次入库成本">
                        <template slot-scope="scope">
                          <span v-text="scellAmount"></span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </el-col>
                <el-col :span="2"><div></div></el-col>
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
        name: "WarehouseQueries",
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
          this.$axios.post("SGathers/queryAllSGather.May", params).then(function (response) {
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
        openeditwin1(gatherId){//获取数据
          var _this=this;
          this.getgatherId=gatherId;
          var params = new URLSearchParams();
          params.append("gatherId",gatherId);
          this.$axios.post("SGathers/queryByGatherIdSGather.May", params).then(function (response) {
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
          this.$axios.post("SGatherDetails/queryByParentIdSGatherEx.May", params).then(function (response) {
            _this.dfileform1=response.data;
            for (var i=0;i<_this.dfileform1.length;i++){
              _this.sum+=parseInt(_this.dfileform1[i].scAmount);
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
        stoQueryByIdSGatherEx(id) {//获取数据
          var _this = this;
          var params = new URLSearchParams();
          params.append("id", id);
          this.$axios.post("SGatherDetails/queryByIdSGatherEx.May", params).then(function (response) {
            _this.scellform = response.data;
            _this.ass = _this.scellform.firstKindName + "-" + _this.scellform.secondKindName + "-" + _this.scellform.thirdKindName;
            _this.css = _this.scellform.firstKindId + "-" + _this.scellform.secondKindId + "-" + _this.scellform.thirdKindId;
            console.log("openeditwin4")
            console.log(_this.dfileform1)
            _this.stoQueryByIdSGatherEx2(_this.scellform.id);
            _this.yiMoney = 0.0;
            _this.yiNumber = 0.0;
            _this.innerDrawer = true;
            console.log("queryByIdSGatherEx" + _this.scellform)
          }).catch();
        },
       stoQueryByIdSGatherEx2(id) {//获取数据
          console.log(id)
          var _this = this;
          var params = new URLSearchParams();
          params.append("id", id);
          this.$axios.post("SGatherDetails/queryByIdSGatherEx2.May", params).then(function (response) {
            _this.dfileform = response.data;
            for (var i=0;i<_this.dfileform.length;i++) {
              _this.scellAmount = parseInt(_this.dfileform[i].gatheredAmount*1) * parseInt(_this.dfileform[i].costPrice*1);
             //_this.scellAmount=parseInt(_this.scellAmount);
              console.log("queryByIdSGatherEx2" + _this.dfileform[i].costPrice);
              console.log("queryByIdSGatherEx2" + _this.scellAmount);

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
