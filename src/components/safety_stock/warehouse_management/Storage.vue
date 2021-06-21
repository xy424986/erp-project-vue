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
            label="入库调度"
            width="100">
            <template slot-scope="scope">
              <el-button  size="mini" round type="primary" icon="el-icon-check" @click="stoQueryByGatherIdSGather(scope.row.gatherId)">调度</el-button>
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
          <el-col :span="1"><div></div></el-col>
          <el-col :span="18"><h3>入库调度单</h3></el-col>
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
                  label="应入库件数">
                </el-table-column>
                <el-table-column
                  prop="scAmount"
                  width="100"
                  label="已入库件数">
                </el-table-column>
                <el-table-column
                  width="110"
                  prop="ass"
                  label="存储地址集合">
                </el-table-column>
                <el-table-column
                  width="100"
                  prop="gatherTag"
                  label="调度">
                  <template slot-scope="scope">
                    <div v-if="scope.row.gatherTag === 'K002-1'">
                      <el-button  size="mini" round type="primary" icon="el-icon-check" @click="stoQueryByIdSGather(scope.row.id)">调度</el-button>
                    </div>
                    <div v-else-if="scope.row.gatherTag === 'K002-2'">
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
      </el-form>
    </div >
    <!--子内容-->
    <div>
      <!--        <el-button @click="innerDrawer = true">打开里面的!</el-button>-->
      <el-drawer
        title="入库调度单"
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
<!--
                  <el-button @click="handleClose"  size="mini" round type="primary" icon="el-icon-check">返回</el-button>
-->
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
                        width="110"
                        label="当前可存放量">
                        <template slot-scope="scope" >
                          <el-input v-model="scellform.maxCapacityAmount" readonly="readonly"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        width="100"
                        label="本次入库数量">
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
              <el-row>
                <el-col :span="10" :push="2">
                  <el-form-item label="应入库数:">
                    <div class="inline"><el-input type="text" readonly="readonly" v-model="scellform.amount" /></div>
                  </el-form-item>
                </el-col>
                <el-col :span="11" :push="3">
                  <el-form-item label="已入库数:">
                    <div class="inline">
                      <el-input type="text" v-model="yiNumber" readonly="readonly"/>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10" :push="2">
                  <el-form-item label="应入库成本:">
                    <div class="inline"><el-input type="text" readonly="readonly" v-model="scellform.subtotal" /></div>
                  </el-form-item>
                </el-col>
                <el-col :span="11" :push="3">
                  <el-form-item label="已入库成本:">
                    <div class="inline">
                      <el-input type="text" v-model="yiMoney" readonly="readonly"/>
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
        name: "Storage",
      data(){
        return {
          tableData:[],
          pageno: 1,
          pagesize: 5,
          total: 0,
          dfileform:[],
          show:true,
          hidden:false,
          scellform:{
            register:'',//登记人
            registerTime:"",//登记时间
            maxCapacityAmount:0,//最大存储量
            amount:0,//当前存储量
            thirdKindName:"",//产品III级分类名称
            thirdKindId:"",//产品III级分类编号
            secondKindName:"",//产品II级分类名称
            secondKindId:"",//产品II级分类编号
            firstKindName:"",//产品I级分类名称
            firstKindId:"",//产品I级分类编号
            productName:"",//产品名称
            productId:"",//产品编号
            storeId:"",//库存编号
            storageUnit:"",//储存单元
            storageUnitAbbreviation:"",//储存单元简称
            attemperTime:0,
            gatherId:""
          },
          scellAmount:0,
          ass:"",
          css:"",
          yiNumber:0,
          yiMoney:0,
          drawer: false,
          innerDrawer: false,
          scellform1:{},
          scellform2:{},
          dfileform1:[],
          getgatherId:"",
          scellformId:"",
          sum:"",
          sumMoney:""
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
            console.log("getdata"+_this.tableData)
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
              this.drawer=false;
              this.innerDrawer=false;
            });
        },
        stoQueryByGatherIdSGather(gatherId){//获取数据
          var _this=this;
          this.getgatherId=gatherId;
          var params = new URLSearchParams();
          params.append("gatherId",gatherId);
          this.$axios.post("SGathers/queryByGatherIdSGather.May", params).then(function (response) {
            _this.scellform1=response.data;
            _this.stoQueryByParentIdSGatherDetails(_this.scellform1.id);
            _this.scellformId=_this.scellform1.id;
            _this.drawer=true;
            _this.innerDrawer=false;
          }).catch();
        },
        stoQueryByParentIdSGatherDetails(productId){
          var _this=this;
          var params = new URLSearchParams();
          params.append("parentId", productId);
          console.log(productId)
          this.$axios.post("SGatherDetails/queryByParentIdSGatherEx.May", params).then(function (response) {
            _this.dfileform1=response.data;

            for  (var i=0;i<_this.dfileform1.length;i++){
              _this.sum+=parseInt(_this.dfileform1[i].scAmount);
              _this.sumMoney+=parseInt(_this.dfileform1[i].subtotal);
              _this.sum=parseInt(_this.sum);
              _this.sumMoney=parseInt(_this.sumMoney);
              console.log("openeditwin2"+_this.dfileform1);
            }
          }).catch();
        },
        stoQueryByIdSGather(id){//获取数据
          var _this=this;
          var params = new URLSearchParams();
          params.append("id", id);
          this.$axios.post("SGathers/queryByIdSGather.May", params).then(function (response) {
            _this.scellform=response.data;
            _this.ass=_this.scellform.firstKindName+"-"+_this.scellform.secondKindName+"-"+_this.scellform.thirdKindName;
            _this.css=_this.scellform.firstKindId+"-"+_this.scellform.secondKindId+"-"+_this.scellform.thirdKindId;
            console.log("openeditwin4")
            console.log(_this.dfileform1)
            _this.stoQueryByIdSCell2(_this.scellform.productId);
            _this.yiMoney=0.0;
            _this.yiNumber=0.0;
            _this.innerDrawer=true;
            console.log("stoQueryByIdSCell2"+_this.scellform)
          }).catch();
        },
        stoQueryByIdSCell2(productId){//获取数据
          console.log(productId)
          var _this=this;
          var params = new URLSearchParams();
          params.append("productId", productId);
          this.$axios.post("SCell/queryByIdSCell2.May", params).then(function (response) {
            _this.dfileform=response.data;
            console.log("openeditwin4"+_this.dfileform)
          }).catch();
        },
        addSCll(){
          var _this=this;
          var params = new URLSearchParams();
          params.append("productId",_this.scellform.productId);//产品编号
          params.append("gatherId",_this.scellform.gatherId);//产品编号
          params.append("amount",_this.scellAmount);//当前存储量
          params.append("attemper",_this.scellform.register);//调度人
          params.append("attemperTime",this.scellform.checkTime);//调度人时间
          params.append("ass",this.ass);//储存地址集合
          params.append("scellformId",this.scellformId);//明细表的parentId
          console.log("addSCll-scellformId:"+this.scellformId)
          this.$axios.post("SGathers/addSGath.May",params).then(function (response) {
            _this.$notify({
                title: '提示',
                message: response.data,
                type: 'success'
              });
            _this.stoQueryByGatherIdSGather(_this.getgatherId);
            console.log(_this.getgatherId);
            _this.$forceUpdate();
          }).catch();
        }
      },
      created() {
        this.getdata();
      }
    }
</script>

<style>
  #div02 {
    font-weight: bold;
    margin:0 auto;
    width: 1000px;
    height: 520px;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    border-radius: 1px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .inline{/*转换行内元素*/
    display: inline-block;
  }

  .div02_01{/*div下边框*/
    border-bottom:1px solid black;
    width: 200px;
    text-align:left;
  }
  .drop-downBox{
    width: 200px;
  }
  .el-input__inner{
    border: none;
  }
  .yanse{
    background-color:yellow;
  }
  .div03{
    position: absolute;
    left: 95px;
    background: pink;
  }

</style>
