<template>
    <div>
      <div id="Make_production_dispatch_list" v-show="istrue">
        <h3>制定生产派工单</h3>
        <el-table
          :data="Make_productiondata"
          stripe
          border
          style="width: 100%">
          <el-table-column
            prop="applyId"
            label="计划单编号"
            width="160">
          </el-table-column>
          <el-table-column
            prop="productId"
            label="产品编号"
            width="140">
          </el-table-column>
          <el-table-column
            prop="productName"
            label="产品名称"
            width="140">
          </el-table-column>
          <el-table-column
            prop="productDescribe"
            label="描述"
            width="140">
          </el-table-column>
          <el-table-column
            prop="amount"
            label="数量"
            width="140">
          </el-table-column>
          <el-table-column
            prop="checkTime"
            label="审核时间"
            width="140"
            :formatter="zhuanghua">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="queryproduction_dispatch(scope.row.productId)">生成派工单</el-button>
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
      <!--制作安全库配置单2-->
      <div id="div03" v-show="isshow">
        <el-form  size="small" :inline="true" v-model="query_dispatchform">
          <el-row>
            <el-col :span="1">
              <el-popconfirm
                title="确定提交生产派工单吗？"
                @confirm="adddispatch(query_dispatchform.id)"
              >
                <el-button slot="reference" style="background-color: pink;">提交</el-button>
              </el-popconfirm>
            </el-col>
            <el-col :span="18"><h3>生产派工单</h3></el-col>
            <el-col :span="2">
              <el-button @click="fanhui"  style="background-color: pink;">返回</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div></div></el-col>
            <el-col :span="7" :offset="3">
              <div><!--产品名称：笔记本-->
                <el-form-item label="产品名称:">
                  <el-input type="text" v-model="query_dispatchform.productName" readonly="readonly"/>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7" :offset="2"><div><!--产品编号：1000000-->
              <el-form-item label="产品编号:">
                <el-input type="text" v-model="query_dispatchform.productId" readonly="readonly"/>
              </el-form-item>
            </div></el-col>
            <el-col :span="6"><div></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div></div></el-col>
            <el-col :span="7" :offset="3">
              <div><!--产品名称：笔记本-->
                <el-form-item label="数量:">
                  <el-input type="text" v-model="query_dispatchform.amount" readonly="readonly"/>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7" :offset="2"><div><!--产品编号：1000000-->
              <el-form-item label="描述:">
                <el-input class="" type="text" v-model="query_dispatchform.productDescribe" readonly="readonly"/>
              </el-form-item>
            </div></el-col>
            <el-col :span="6"><div></div></el-col>
          </el-row>
          <!--表格-->
          <el-row>
            <el-col :span="2"><div></div></el-col>
            <el-col :span="20" :offset="2">
              <div>
                <el-table
                  :data="query_dispatchByIddata"
                  border
                  height="180"
                  style="width: 100%"
                  :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                  :cell-style="cellStyle">
                  <el-table-column
                    width="100"
                    prop="detailsNumber"
                    label="序号">
                  </el-table-column>
                  <el-table-column
                    width="100"
                    prop="procedureName"
                    label="工序名称">
                  </el-table-column>
                  <el-table-column
                    width="100"
                    prop="procedureId"
                    label="工序编号">
                  </el-table-column>
                  <el-table-column
                    width="100"
                    prop="procedureDescribe"
                    label="描述">
                  </el-table-column>
                  <el-table-column
                    width="100"
                    prop="labourHourAmount"
                    label="工时数(小时)">
                  </el-table-column>
                  <el-table-column
                    width="100"
                    prop="costPrice"
                    label="单位工时成本(元)">
                  </el-table-column>
                  <el-table-column
                    width="100"
                    prop="subtotal"
                    label="工时成本小计(元)">
                  </el-table-column>
                  <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                      <el-button @click="queryByid(scope.row.id,scope.row.procedureName,scope.row.procedureId)">查看物料</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
            <el-col :span="2"><div></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="22" >
              <!--<div class="inline">登记人：</div>-->
              <el-form-item label="工单制定人:">
                <div class="inline div02_01"><el-input type="text" v-model="designer"  readonly="readonly"/></div>
              </el-form-item>
              <el-form-item label="制定时间:">
                <div class="inline">
                  <el-input type="text" v-model="registerTime"  readonly="readonly"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" :offset="2">
              <div class="aa">
                <el-form-item label="备注:" style="width: 80%; display: block;">
                  <el-input type="textarea" :rows="4" resize="none"  placeholder="请输入内容" style="width: 100%" v-model="remark">
                  </el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div >
      <el-drawer
        title="工序物料单"
        :visible.sync="sheettable"
        direction="rtl"
        size="60%">
        <el-form>
          <el-row>
            <el-col :span="4"><div></div></el-col>
            <el-col :span="7" :offset="3">
              <div><!--产品名称：笔记本-->
                <el-form-item label="工序编号:">
                  <el-input type="text" v-model="procedureId" readonly="readonly"/>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7" :offset="2"><div><!--产品编号：1000000-->
              <el-form-item label="工序名称:">
                <el-input type="text" v-model="procedureName" readonly="readonly"/>
              </el-form-item>
            </div></el-col>
            <el-col :span="6"><div></div></el-col>
          </el-row>
        </el-form>
        <el-table
          :data="gridData">
          <el-table-column
            prop="detailsNumber"
            label="序号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="productName"
            label="物料名称"
            width="100">
          </el-table-column>
          <el-table-column
            width="100"
            prop="productId"
            label="物料编号">
          </el-table-column>
          <el-table-column
            width="100"
            prop="productDescribe"
            label="描述">
          </el-table-column>
          <el-table-column
            width="100"
            prop="amount"
            label="本工序数量">
          </el-table-column>
          <el-table-column
            width="100"
            prop="amountUnit"
            label="单位">
          </el-table-column>
          <el-table-column
            width="100"
            prop="costPrice"
            label="单价(元)">
          </el-table-column>
          <el-table-column
            width="100"
            prop="subtotal"
            label="小计(元)">
          </el-table-column>
        </el-table>
      </el-drawer>
    </div>
</template>

<script>
    import {formatDate} from "../product design/date";

    export default {
        name: "Make_production_dispatch_list",
      data(){
          return{
            pageno:1,
            pagesize:5,
            total:0,
            istrue:true,
            isshow:false,
            sheettable:false,
            designer:sessionStorage.getItem("loginId"),//制定人
            registerTime:"",//制定时间
            remark:"",//备注
            procedureName:"",//工序名称
            procedureId:"",//工序编号
            Make_productiondata:[],//存放查询到了的需要制定生产派工单表格数据
            query_dispatchform:[],//存放需要制定生产派工单的单个生产计划数据
            query_dispatchByIddata:[],//存放需要制定生产派工单的单个生产计划需要的工序步骤
            gridData:[],//存放此工序所需要的物料
          }
      },
      methods:{
        getdata() {   //获取数据
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          this.$axios.post("MApply/query_Make_production.action", params).then(function (response) {
            _this.Make_productiondata = response.data.records;
            _this.total = response.data.total;
          }).catch();
        },
        handleSizeChange(val) {  //页size变更
          this.pagesize = val;
          this.pageno = 1;
          this.getdata();
        },
        handleCurrentChange(val) {  //页码变更
          this.pageno = val;
          this.getdata();
        },
        fanhui(){
          this.istrue=true;
          this.isshow=false;
        },
        zhuanghua(row){//将时间戳转成时间
          return this.formatDate(row.checkTime);
        },
        formatDate(time) {  //时间转化
          var date = new Date(time);
          return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        },
        queryproduction_dispatch(productId){ //制定生产派工单：根据产品编号查询生产计划数据和产品生产工序明细
          this.formatDatetwo();
          this.isshow=true;
          this.istrue=false;
          var _this = this;
          var params = new URLSearchParams();
          params.append("productId",productId);
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          this.$axios.post("MApply/query_Make_productionByid.action", params).then(function (response) {
            // console.log(response.data)
            _this.query_dispatchform = response.data;
            console.log(_this.query_dispatchform)
          }).catch();
          this.$axios.post("MApply/query_Make_productionproductId.action", params).then(function (response) {
            // console.log(response.data)
            _this.query_dispatchByIddata = response.data;
            console.log(_this.query_dispatchByIddata)
          }).catch();
        },
        //设置指定行、列、具体单元格颜色
        cellStyle({row, column, rowIndex, columnIndex}) {
          var arr=[4,5,6];
          for (var i=0;i<arr.length;i++){
            if (columnIndex === arr[i]) { //指定坐标rowIndex ：行，columnIndex ：列
              return 'background:yellow' //rgb(105,0,7)
            }
          }
        },
        formatDatetwo() {   //获取当前时间
          let date = new Date();
          let year = date.getFullYear(); // 年

          let month = date.getMonth() + 1; // 月
          let day = date.getDate(); // 日
          let week = date.getDay(); // 星期
          let weekArr = [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ];
          let hour = date.getHours(); // 时
          hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
          let minute = date.getMinutes(); // 分
          minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
          let second = date.getSeconds(); // 秒
          second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
          this.registerTime = year+"/"+month+"/"+day+"  "+hour+":"+minute+":"+second;
        },
        handleClose(done) { //点击空白处关闭动画
          if (this.loading) {
            return;
          }
          this.$confirm('确定退出添加物料吗？')
            .then(_ => {
              this.loading = true;
              this.timer = setTimeout(() => {
                done();
                // 动画关闭需要一定的时间
                setTimeout(() => {
                  this.loading = false;
                }, 400);
              });
            })
            .catch(_ => {});
        },
        queryByid(id,name,procedureId){ //查询此工序所需要的物料
          this.sheettable=true;
          this.procedureName=name;procedureId
          this.procedureId=procedureId;
          var _this = this;
          var params = new URLSearchParams();
          params.append("parentId",id);
          params.append("pageno",1);
          params.append("pagesize",100);
          this.$axios.post("MApply/query_Make_productionByparentId.action", params).then(function (response) {
            // console.log(response.data)
            _this.gridData = response.data.records;
          }).catch();
        },
        adddispatch(id){//添加派工单
          var _this = this;
          var params = new URLSearchParams();
          params.append("id",id);
          this.$axios.post("MApply/add_Make_productionone.action", params).then(function (response) {
            if(response.data==true){
              var params1 = new URLSearchParams();
              params1.append("productId",_this.query_dispatchform.productId);
              params1.append("productName",_this.query_dispatchform.productName);
              params1.append("amount",_this.query_dispatchform.amount);
              params1.append("applyIdGroup",_this.query_dispatchform.applyId);
              params1.append("productDescribe",_this.query_dispatchform.productDescribe);
              params1.append("designer",_this.designer);
              params1.append("registerTime",_this.registerTime);
              params1.append("remark",_this.remark);
              _this.$axios.post("MApply/add_Make_productiontwo.action", params1).then(function (response) {
                 if(response.data==true){
                   _this.$axios.post("MApply/add_Make_productiononethree.action",JSON.stringify(_this.query_dispatchByIddata),{"headers":{"Content-Type":"application/json"}}).then(function (response) {

                     console.log(response.data)
                     if (response.data == true) {
                       _this.$notify({
                         title: '成功',
                         message: '派工单制定成功',
                         type: 'success'
                       });
                       _this.istrue = true;
                       _this.isshow = false;
                       _this.getdata();
                     } else {
                       _this.$notify({
                         title: '失败',
                         message: '派工单制定失败',
                         type: 'danger'
                       });
                       _this.istrue = true;
                       _this.isshow = false;
                       _this.getdata();
                     }
                   }).catch();
                 }
              }).catch();
            }
          }).catch();
        },
      },
      created() {
        this.getdata();
      }
    }
</script>

<style scoped>
  #Make_production_dispatch_list{
    font-weight: bold;
    margin:0 auto;
    width: 1120px;
    height: 520px;
    text-align: center;
    color: #2c3e50;
    margin-top: 20px;
    border-radius: 1px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
</style>
