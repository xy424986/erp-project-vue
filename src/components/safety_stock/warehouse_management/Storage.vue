<template>
<div>
  <div id="div01" v-show="show">
    <el-table
      :data="tableData"
      height="250"
      border
      style="width: 100%">
      <el-table-column
        prop="productId"
        label="产品编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="productName"
        label="产品名称"
        width="180">
      </el-table-column>
      <el-table-column label="用途类型">
        <template slot-scope="scope">
          {{ scope.row.type == 1 ? "商品" : "物料" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="productClass"
        label="档次级别">
        <template scope="scope">
          <span v-if="scope.row.productClass === '1'">高档</span>
          <span v-else-if="scope.row.productClass === '2'">中档</span>
          <span v-else-if="scope.row.productClass === '3'">低档</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="firstKindName"
        label="I及分类">
      </el-table-column>
      <el-table-column
        prop="secondKindName"
        label="II及分类">
      </el-table-column>
      <el-table-column
        prop="thirdKindName"
        label="III及分类">
      </el-table-column>
          <el-table-column
            label="调度"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" @click="openeditwin(scope.row.productId)">调度</el-button>
            </template>
          </el-table-column>
    </el-table>
  </div>

  <div id="div02" v-show="hidden">
    <el-form  size="small" :inline="true" v-model="scellform">
      <el-row>
          <el-col :span="1">
            <el-popconfirm
              title="确定提交吗？"
              @confirm="addSCll"
            >
              <el-button slot="reference" style="background-color: pink;">提交</el-button>
            </el-popconfirm>
        </el-col>
        <el-col :span="18"><h3>入库调度单</h3></el-col>
        <el-col :span="3">
          <el-button @click="showHidden"  style="background-color: pink;">返回</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11" :offset="1">
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
        <el-col :span="14" >
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
          yiMoney:0

        }
      },
      methods: {
        getdata() {   //制作安全库配置单1获取数据
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          this.$axios.post("SGathers/queryAllSGather.May", params).then(function (response) {
            _this.tableData = response.data.list;
            _this.total = response.data.total;
            console.log()
          }).catch();
        },
        handleSizeChange(val) {  //页size变更
          this.pagesize = val;
          this.pageno = 1;
          this.getdata();
        },
        //以下方法是制作安全库配置单2的
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
        //显示隐藏
        showHidden(){
          this.show=!this.show;
          this.hidden=!this.hidden;
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
          this.scellform.checkTime = date1;
        },
        getStr(point) {
          return ("00" + point).slice(-2); // 从字符串的倒数第二个字符开始截取，一直截取到最后一个字符；（在这里永远截取该字符串的最后两个字符）
        },
        amendDate(){
          var date = new Date(this.scellform.registerTime)
          var Y = date.getFullYear() + '-'
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
          var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
          var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
          var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
          var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
          this.scellform.registerTime = Y + M + D + h + m + s;
        },
        openeditwin(productId){//获取数据
          var _this=this;
          this.showHidden();
          var params = new URLSearchParams();
          params.append("productId", productId);
          this.$axios.post("SGathers/queryByIdSGather.May", params).then(function (response) {
            _this.scellform=response.data;
            _this.ass=_this.scellform.firstKindName+"-"+_this.scellform.secondKindName+"-"+_this.scellform.thirdKindName;
            _this.css=_this.scellform.firstKindId+"-"+_this.scellform.secondKindId+"-"+_this.scellform.thirdKindId;
            _this.addDate(_this.scellform);
            _this.openeditwin2(productId);
            _this.yiMoney=0.0;
            _this.yiNumber=0.0;
            console.log(_this.scellform)
          }).catch();
        },
        openeditwin2(productId){//获取数据
          var _this=this;
          var params = new URLSearchParams();
          params.append("productId", productId);
          this.$axios.post("SCell/queryByIdSCell2.May", params).then(function (response) {
            _this.dfileform=response.data;
            console.log(_this.dfileform)
          }).catch();
        },
        addSCll(){
          var _this=this;
          var params = new URLSearchParams();
          params.append("productId",_this.scellform.productId);//id
          params.append("gatherId",_this.scellform.gatherId);//id
          params.append("amount",_this.scellAmount);//储存单元简称
          params.append("attemper",_this.scellform.register);//id
          params.append("attemperTime",this.scellform.checkTime);//id
          console.log(this.scellform.storageUnit)
          this.$axios.post("SGathers/addSGath.May",params).then(function (response) {
            _this.$notify({
                title: '提示',
                message: response.data,
                type: 'success'
              });
            this.getdata();
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
