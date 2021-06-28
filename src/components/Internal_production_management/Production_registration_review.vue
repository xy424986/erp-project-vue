<template>
    <div>
      <div id="Production_registration_review" v-show="istrue">
        <h3>生产登记复核</h3>
        <el-table
          :data="shengchanfuhe_productiondata"
          stripe
          border
          style="width: 100%">
          <el-table-column
            prop="manufactureId"
            label="派工单编号"
            width="170">
          </el-table-column>
          <el-table-column
            prop="productId"
            label="产品编号"
            width="170">
          </el-table-column>
          <el-table-column
            prop="productName"
            label="产品名称"
            width="170">
          </el-table-column>
          <el-table-column
            prop="amount"
            label="数量"
            width="170">
          </el-table-column>
          <el-table-column
            prop="registerTime"
            label="制定时间"
            width="170"
            :formatter="zhuanghua">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="tiaozhuan(scope.row.id)">复核</el-button>
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
        <el-form  size="small" :inline="true" v-model="shenhe_dispatchform">
          <el-row>
            <el-col :span="18"><h3>生产登记复核</h3></el-col>
            <el-col :span="2">
              <el-button @click="fanhui" size="mini" round type="primary"  style="background-color: pink;">返回</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9" :offset="2">
              <div><!--产品名称：笔记本-->
                <el-form-item label="派工单编号:">
                  <el-input type="text" v-model="shenhe_dispatchform.manufactureId" readonly="readonly"/>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div></div></el-col>
            <el-col :span="7" :offset="3">
              <div><!--产品名称：笔记本-->
                <el-form-item label="产品名称:">
                  <el-input type="text" v-model="shenhe_dispatchform.productName" readonly="readonly"/>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7" :offset="2"><div><!--产品编号：1000000-->
              <el-form-item label="产品编号:">
                <el-input type="text" v-model="shenhe_dispatchform.productId" readonly="readonly"/>
              </el-form-item>
            </div></el-col>
            <el-col :span="6"><div></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div></div></el-col>
            <el-col :span="7" :offset="3">
              <div><!--产品名称：笔记本-->
                <el-form-item label="数量:">
                  <el-input type="text" v-model="shenhe_dispatchform.amount" readonly="readonly"/>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7" :offset="2"><div><!--产品编号：1000000-->
              <el-form-item label="描述:">
                <el-input class="" type="text" v-model="shenhe_dispatchform.productDescribe" readonly="readonly"/>
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
                  :data="shenhe_dispatchByIddata"
                  border
                  height="160"
                  style="width: 100%"
                  :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                  :cell-style="cellStyle">
                  <el-table-column
                    width="100"
                    prop="procedureName"
                    label="工序名称">
                  </el-table-column>
                  <el-table-column
                    width="100"
                    prop="labourHourAmount"
                    label="设计工时数">
                  </el-table-column>
                  <el-table-column
                    width="100"
                    prop="realLabourHourAmount"
                    label="实际工时数">
                  </el-table-column>
                  <el-table-column
                    width="100"
                    prop="subtotal"
                    label="设计工时成本(元)">
                  </el-table-column>
                  <el-table-column
                    width="100"
                    prop="realSubtotal"
                    label="实际工时成本(元)">
                  </el-table-column>
                  <el-table-column
                    width="100"
                    prop="moduleSubtotal"
                    label="设计物料成本(元)">
                  </el-table-column>
                  <el-table-column
                    width="100"
                    prop="realModuleSubtotal"
                    label="实际物料成本(元)">
                  </el-table-column>
                  <el-table-column
                    label="登记复核">
                    <template slot-scope="scope" >
<!--                      <el-button size="mini" round type="primary" v-if="scope.row.procedureFinishTag=='G004-3'" @click="dengjiquery(scope)">已复核</el-button>-->
                      <span  v-if="scope.row.procedureFinishTag=='G004-3'" style="color: red">已复核</span>
                      <el-button size="mini" round type="primary" v-if="scope.row.procedureFinishTag=='G004-1'" @click="dengjiquery(scope)">复核</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="交接复核">
                    <template slot-scope="scope" >
                      <div v-if="scope.row.procedureFinishTag=='G004-3'">
<!--                        <el-button size="mini" round type="primary" v-if="scope.row.procedureTransferTag=='G005-2'" @click="jiaojiedengji(scope)">已复核</el-button>-->
                        <span  v-if="scope.row.procedureTransferTag=='G005-2'" style="color: red">已复核</span>
                        <el-button size="mini" round type="primary" v-if="scope.row.procedureTransferTag=='G005-1'" @click="jiaojiedengji(scope)">复核</el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
            <el-col :span="2"><div></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="10" :offset="1">
              <div><!--产品名称：笔记本-->
                <el-form-item label="设计工时总成本:">
                  <el-input type="text" v-model="shenhe_dispatchform.labourCostPriceSun" readonly="readonly"/>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="9" :offset="-1"><div><!--产品编号：1000000-->
              <el-form-item label="设计物料总成本:">
                <el-input class="" type="text" v-model="shenhe_dispatchform.moduleCostPriceSun" readonly="readonly"/>
              </el-form-item>
            </div></el-col>
          </el-row>
          <el-row>
            <el-col :span="10" :offset="1">
              <div><!--产品名称：笔记本-->
                <el-form-item label="实际工时总成本:">
                  <el-input type="text" v-model="shenhe_dispatchform.realLabourCostPriceSun" readonly="readonly"/>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="9" :offset="-1"><div><!--产品编号：1000000-->
              <el-form-item label="实际物料总成本:">
                <el-input class="" type="text" v-model="shenhe_dispatchform.realModuleCostPriceSun" readonly="readonly"/>
              </el-form-item>
            </div></el-col>
          </el-row>
          <el-row>
            <el-col :span="22" >
              <!--<div class="inline">登记人：</div>-->
              <el-form-item label="工单制定人:">
                <div class="inline div02_01"><el-input type="text" v-model="shenhe_dispatchform.designer"  readonly="readonly"/></div>
              </el-form-item>
              <el-form-item label="制定时间:">
                <div class="inline">
                  <el-input type="text" v-model="shenhe_dispatchform.registerTime"  readonly="readonly"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22" >
              <!--<div class="inline">登记人：</div>-->
              <el-form-item label="工单审核人:">
                <div class="inline div02_01"><el-input type="text" v-model="shenhe_dispatchform.checker"  readonly="readonly"/></div>
              </el-form-item>
              <el-form-item label="审核时间:">
                <div class="inline">
                  <el-input type="text" v-model="shenhe_dispatchform.checkTime"  readonly="readonly"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" :offset="2">
              <div class="aa">
                <el-form-item label="备注:" style="width: 80%; display: block;">
                  <el-input type="textarea" :rows="4" resize="none"  placeholder="请输入内容" readonly="readonly" style="width: 100%" v-model="shenhe_dispatchform.remark">
                  </el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div >
      <!--    抽屉样式-->
      <el-drawer
        :visible.sync="sheettable"
        size="75%">
        <div>
          <el-form  size="small" :inline="true">
            <el-row>

              <el-col :span="18"><h3>生产登记单</h3></el-col>
              <el-col :span="3">
                <el-button  size="mini" round type="primary" icon="el-icon-check" @click="falsedengjifuhe">不通过</el-button>
              </el-col>
              <el-col :span="3">
                <el-button  size="mini" round type="primary" icon="el-icon-check" @click="adddengjifuhe">通过</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11" :offset="1">
                <div>
                  <el-form-item label="派工单编号:">
                    <el-input type="text" v-model="shenhe_dispatchform.manufactureId" readonly="readonly"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7" :offset="2">
                <div>
                  <el-form-item label="工序名称:">
                    <el-input type="text" v-model="procedureName"  readonly="readonly"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6"><div></div></el-col>
            </el-row>
            <el-row>
              <el-col :span="14" >
                <div><!--产品名称：笔记本-->
                  <el-form-item label="负责人:">
                    <el-input type="text" v-model="dengjiformtwo.procedureResponsiblePerson" readonly="readonly"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7" >
                <el-form-item label="设计工时数:">
                  <div class="inline">
                    <el-input type="text" v-model="labourHourAmount" readonly="readonly"/>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="13" >
                <div>
                  <el-form-item label="已用工时数:">
                    <el-input type="text" v-model="realLabourHourAmount" readonly="readonly"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10" :push="1">
                <el-form-item label="本次工时数:">
                  <div class="inline">
                    <el-input class="inline div02_01" type="text" v-model="dengjiformtwo.labourHourAmount"/>
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
                    :data="dengjiform"
                    border
                    height="180"
                    style="width: 100%"
                    :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                    :cell-style="cellStyle">
                    <el-table-column
                      width="80"
                      prop="detailsNumber"
                      label="序号">
                    </el-table-column>
                    <el-table-column
                      width="140"
                      prop="productName"
                      label="物料名称">
                    </el-table-column>
                    <el-table-column
                      prop="productId"
                      label="物料编号">
                    </el-table-column>
                    <el-table-column
                      prop="amount"
                      label="设计数量">
                    </el-table-column>
                    <!--                    <el-table-column-->
                    <!--                      prop="realSubtotal"-->
                    <!--                      label="补充数量">-->
                    <!--                    </el-table-column>-->
                    <el-table-column
                      prop="realAmount"
                      label="已使用数量">
                    </el-table-column>
                    <el-table-column
                      prop="rowamount"
                      label="本次数量">
<!--                      <template slot-scope="scope">-->
<!--                        &lt;!&ndash;                        v-on:input="subtotaledit(scope)"&ndash;&gt;-->
<!--                        <el-input type="number" v-model="scope.row.rowamount" valuemax=20></el-input>-->
<!--                      </template>-->
                    </el-table-column>
                  </el-table>
                </div>
              </el-col>
              <el-col :span="2"><div></div></el-col>
            </el-row>
            <el-row>
              <el-col :span="10" :push="2">
                <el-form-item label="审核人:">
                  <div class="inline"><el-input type="text" readonly="readonly" v-model="checker" /></div>
                </el-form-item>
              </el-col>
              <el-col :span="11" :push="2">
                <el-form-item label="审核时间:">
                  <div class="inline">
                    <el-input type="text" v-model="checkTime" readonly="readonly"/>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div >
      </el-drawer>
      <!-- 添加工序Dialog-Table -->
      <el-dialog title="交接登记复核" :visible.sync="dialogTableVisible">
        <el-row>
          <el-col :span="1">
          </el-col>
          <el-col :span="18"><h3></h3></el-col>
          <el-col :span="3">
            <el-button  size="mini" round type="primary" icon="el-icon-check" @click="addjiaojiefuhe()">提交</el-button>
          </el-col>
        </el-row>
        <el-form>
          <el-row>
            <el-col :span="4"><div></div></el-col>
            <el-col :span="7" :offset="3">
              <div><!--产品名称：笔记本-->
                <el-form-item label="工序编号:">
                  <el-input type="text" v-model="dengjiprocedurexuhao" readonly="readonly"/>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7" :offset="2"><div><!--产品编号：1000000-->
              <el-form-item label="工序名称:">
                <el-input type="text" v-model="dengjiprocedureName" readonly="readonly"/>
              </el-form-item>
            </div></el-col>
            <el-col :span="6"><div></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="本工序投产数量">
                <el-input type="text" class="inline div02_01" v-model="demandAmount" readonly="readonly"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="本工序合格数量">
                <el-input type="text" class="inline div02_01" v-model="realAmount" readonly="readonly"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
    import {formatDate} from "../product design/date";

    export default {
        name: "Production_registration_review",
      data(){
          return{
            pageno:1,
            pagesize:5,
            total:0,
            istrue:true,
            isshow:false,
            sheettable:false,
            dialogTableVisible:false,
            demandAmount:"",//投产数量
            realAmount:"",//合格数量
            dengjiprocedureName:"",//工序名称
            dengjiprocedurexuhao:"",//工序序号
            checkTime:"",//审核时间
            gongxuId:"",//工序id
            checker:sessionStorage.getItem("loginId"),//审核人
            procedureName:"",//工序名称
            labourHourAmount:"",//设计工时数
            realLabourHourAmount:"",//实际工时数
            shengchanfuhe_productiondata:[],//生产登记复核表格数据
            shenhe_dispatchform:[],//存放需要制定生产登记的单个派工单数据
            shenhe_dispatchByIddata:[],//存放需要制定生产登记的单个派工单需要的工序步骤
            dengjiform:[],//存放此工序所需要的物料
            dengjiformtwo:[],
          }
      },
      methods:{
        getdata() {   //获取数据
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          this.$axios.post("MProceduring/dengjifuhe_Make_production.action", params).then(function (response) {
            _this.shengchanfuhe_productiondata = response.data.records;
            _this.total = response.data.total;
          }).catch();
        },
        tiaozhuan(id){ //查询派工单以及工序
          // this.formatDatetwo();
          this.isshow=true;
          this.istrue=false;
          var _this = this;
          var params = new URLSearchParams();
          params.append("id",id);
          this.$axios.post("MManuFacture/shenhe_Make_productionByid.action", params).then(function (response) {
            response.data.registerTime=_this.formatDate(response.data.registerTime)
            response.data.checkTime=_this.formatDate(response.data.checkTime)
            if(response.data.realLabourCostPriceSun==null||response.data.realLabourCostPriceSun==""){
              response.data.realLabourCostPriceSun=0.0;
            }
            if(response.data.realModuleCostPriceSun==null||response.data.realModuleCostPriceSun==""){
              response.data.realModuleCostPriceSun=0.0;
            }
            _this.shenhe_dispatchform = response.data;

          }).catch();
          this.$axios.post("MManuFacture/shenhe_Make_productionparentid.action", params).then(function (response) {
            _this.shenhe_dispatchByIddata = response.data;
          }).catch();
        },
        fanhui(){
          this.istrue=true;
          this.isshow=false;
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
        handleSizeChange(val) {  //页size变更
          this.pagesize = val;
          this.pageno = 1;
          this.getdata();
        },
        handleCurrentChange(val) {  //页码变更
          this.pageno = val;
          this.getdata();
        },
        zhuanghua(row){//将时间戳转成时间
          return this.formatDate(row.registerTime);
        },
        formatDate(time) {  //时间转化
          var date = new Date(time);
          return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        },
        dengjiquery(scope){//查询物料
          // this.dengjigongxu=scope.row;
          var i = 0;
          this.formatDatetwo();
          this.sheettable=true;
          this.gongxuId=scope.row.id
          this.procedureName=scope.row.procedureName;
          this.labourHourAmount=scope.row.labourHourAmount;
          this.realLabourHourAmount=scope.row.realLabourHourAmount;
          var _this = this;
          var params = new URLSearchParams();
          params.append("id",scope.row.id);
          this.$axios.post("MManuFacture/dengjifuhe_Make_productionByparentidtwo.action", params).then(function (response) {
            _this.dengjiformtwo = response.data;
            _this.$axios.post("MManuFacture/dengjifuhe_Make_productionByparentid.action", params).then(function (response) {
              _this.dengjiform = response.data;
            }).catch();
          }).catch();
        },
        jiaojiedengji(scope){
          this.dialogTableVisible=true;
          this.gongxuId=scope.row.id;
          this.dengjiprocedureName=scope.row.procedureName
          this.dengjiprocedurexuhao=scope.row.detailsNumber;
          this.demandAmount=scope.row.demandAmount
          this.realAmount=scope.row.realAmount;
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
          this.checkTime = year+"/"+month+"/"+day+"  "+hour+":"+minute+":"+second;
        },
        adddengjifuhe(){//通过工序登记复核
          var _this = this;
          var params = new URLSearchParams();
          params.append("gongxuId", this.gongxuId);
          params.append("checker", this.checker);
          params.append("checkTime", this.checkTime);
          this.$axios.post("MProceduring/dengjifuhetruetag_Make.action", params).then(function (response) {
            if (response.data == true) {
              _this.$notify({
                title: '成功',
                message: '当前登记复核通过',
                type: 'success'
              });
              _this.isshow = true;
              _this.sheettable = false;
              _this.tiaozhuan(_this.shenhe_dispatchform.id);
            } else {
              _this.$notify({
                title: '失败',
                message: '当前登记复核不通过',
                type: 'danger'
              });
              _this.isshow = true;
              _this.sheettable = false;
              _this.tiaozhuan(_this.shenhe_dispatchform.id);
            }
          }).catch();
        },
        falsedengjifuhe(){
          var _this = this;
          var params = new URLSearchParams();
          params.append("gongxuId", this.gongxuId);
          this.$axios.post("MProceduring/dengjifuhefalseetag_Make.action", params).then(function (response) {
            if (response.data == true) {
              _this.$notify({
                title: '成功',
                message: '当前登记复核未通过',
                type: 'success'
              });
              _this.isshow = true;
              _this.sheettable = false;
              _this.tiaozhuan(_this.shenhe_dispatchform.id);
            } else {
              _this.$notify({
                title: '失败',
                message: '',
                type: 'danger'
              });
              _this.isshow = true;
              _this.sheettable = false;
              _this.tiaozhuan(_this.shenhe_dispatchform.id);
            }
          }).catch();
        },
        addjiaojiefuhe(){//交接复核
          var _this = this;
          var params = new URLSearchParams();
          params.append("id", this.gongxuId);
          this.$axios.post("MProceduring/jiaojiefuhetruetag_Make.action", params).then(function (response) {
            if (response.data == true) {
              _this.$notify({
                title: '成功',
                message: '当前交接复核通过',
                type: 'success'
              });
              _this.isshow = true;
              _this.dialogTableVisible=false;
              _this.all(_this.shenhe_dispatchform.id);
              _this.tiaozhuan(_this.shenhe_dispatchform.id);
            } else {
              _this.$notify({
                title: '失败',
                message: '当前交接复核不通过',
                type: 'danger'
              });
              _this.isshow = true;
              _this.dialogTableVisible=false;
              _this.tiaozhuan(_this.shenhe_dispatchform.id);
            }
          }).catch();
        },
        all(id){
          var _this = this;
          var params = new URLSearchParams();
          params.append("id",id);
          this.$axios.post("MProceduring/all_Make_production.action", params).then(function (response) {
            if (response.data===true) {
              _this.$notify({
                title: '成功',
                message: '恭喜您,当前产品所有工序登记以及交接都已完成！',
                type: 'success'
              })
                _this.istrue=true;
                _this.isshow=false;
                _this.sheettable=false;
                _this.dialogTableVisible=false;
                _this.getdata();
              ;
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
  #Production_registration_review{
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
