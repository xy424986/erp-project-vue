<template xmlns:el-col="http://www.w3.org/1999/html">
    <div>
      <div id="Production_registration" v-show="istrue">
        <h3>生产登记</h3>
        <el-table
          :data="shengchan_productiondata"
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
              <el-button @click="tiaozhuan(scope.row.id)">登记</el-button>
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
            <el-col :span="18"><h3>生产登记</h3></el-col>
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
                  height="190"
                  style="width: 100%"
                  :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                  :cell-style="cellStyle">
                  <el-table-column
                    width="90"
                    prop="procedureName"
                    label="工序名称">
                  </el-table-column>
                  <el-table-column
                    width="90"
                    prop="labourHourAmount"
                    label="设计工时数">
                  </el-table-column>
                  <el-table-column
                    width="90"
                    prop="realLabourHourAmount"
                    label="实际工时数">
                  </el-table-column>
                  <el-table-column
                    width="90"
                    prop="subtotal"
                    label="设计工时成本(元)">
                  </el-table-column>
                  <el-table-column
                    width="90"
                    prop="realSubtotal"
                    label="实际工时成本(元)">
                  </el-table-column>
                  <el-table-column
                    width="90"
                    prop="moduleSubtotal"
                    label="设计物料成本(元)">
                  </el-table-column>
                  <el-table-column
                    width="90"
                    prop="realModuleSubtotal"
                    label="实际物料成本(元)">
                  </el-table-column>
                  <el-table-column
                    label="工序登记">
                    <template slot-scope="scope" >
                      <el-button size="mini" round type="primary" v-if="scope.row.procedureFinishTag=='G004-0'" @click="dengjiquery(scope)">工序登记</el-button>
                      <el-button size="mini" round type="primary" v-if="scope.row.procedureFinishTag=='G004-2'" @click="dengjiquery(scope)">重新登记</el-button>
                      <span v-if="scope.row.procedureFinishTag=='G004-1'" style="color: red">等待审核</span>
                      <span v-if="scope.row.procedureFinishTag=='G004-3'" style="color: blue">完成</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="交接登记">
                    <template slot-scope="scope" >
                      <div v-if="scope.row.procedureFinishTag=='G004-3'">
                        <el-button size="mini" round type="primary" v-if="scope.row.procedureTransferTag=='G005-0'" @click="jiaojiedengji(scope)">交接登记</el-button>
<!--                        <el-button size="mini" round type="primary" v-if="scope.row.procedureTransferTag=='G005-1'" @click="jiaojiedengji(scope)">重新交接</el-button>-->
                        <span v-if="scope.row.procedureTransferTag=='G005-1'" style="color: red">等待审核</span>
                        <span v-if="scope.row.procedureTransferTag=='G005-2'" style="color: blue">完成</span>
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
              <el-col :span="1">
              </el-col>
              <el-col :span="18"><h3>生产登记单</h3></el-col>
              <el-col :span="3">
                <el-button  size="mini" round type="primary" icon="el-icon-check" @click="adddengji">提交</el-button>
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
                    <el-input type="text" v-model="procedureResponsiblePerson" readonly="readonly"/>
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
                    <el-input class="inline div02_01" type="text" v-model="labourHourAmounttwo"/>
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
                      label="本次数量">
                      <template slot-scope="scope">
<!--                        v-on:input="subtotaledit(scope)"-->
                        <el-input type="number" v-model="scope.row.rowamount" valuemax=20></el-input>
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
                  <div class="inline"><el-input type="text" readonly="readonly" v-model="register" /></div>
                </el-form-item>
              </el-col>
              <el-col :span="11" :push="2">
                <el-form-item label="登记时间:">
                  <div class="inline">
                    <el-input type="text" v-model="registerTime" readonly="readonly"/>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div >
      </el-drawer>
      <!-- 添加工序Dialog-Table -->
      <el-dialog title="交接登记" :visible.sync="dialogTableVisible">
        <el-row>
          <el-col :span="1">
          </el-col>
            <el-col :span="18"><h3></h3></el-col>
          <el-col :span="3">
            <el-button  size="mini" round type="primary" icon="el-icon-check" @click="addjiaojie()">提交</el-button>
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
              <el-form-item label="请输入本工序交接的合格数量">
                <el-input type="text" class="inline div02_01" v-model="realAmount"/>
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
        name: "Production_registration",
      data(){
          return{
            pageno:1,
            pagesize:5,
            total:0,
            istrue:true,
            isshow:false,
            sheettable:false,
            btn1:false,
            btn2:true,
            dialogTableVisible:false,
            gongxuId:"",//工序id
            dengjiprocedureName:"",//工序名称
            dengjiprocedurexuhao:"",//工序序号
            procedureName:"",//工序名称
            procedureResponsiblePerson:sessionStorage.getItem("loginId"),//负责人
            labourHourAmount:"",//设计工时数
            realLabourHourAmount:"",//实际工时数
            labourHourAmounttwo:"",//本次工时数
            realAmount:"",//合格数量
            register:sessionStorage.getItem("loginId"),//登记人
            registerTime:"",//登记时间
            shengchan_productiondata:[], //生产登记存放需要登记的派工单数据
            shenhe_dispatchform:[],//存放需要制定生产登记的单个派工单数据
            shenhe_dispatchByIddata:[],//存放需要制定生产登记的单个派工单需要的工序步骤
            dengjiform:[],//存放此工序所需要的物料
            dengjigongxu:[],//存放当前登记的工序
          }
      },
      methods:{

        getdata() {   //获取数据
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          this.$axios.post("MProceduring/dengji_Make_production.action", params).then(function (response) {
            _this.shengchan_productiondata = response.data.records;
            _this.total = response.data.total;
          }).catch();
        },
        querywuliao(){
          alert(111)
        },
        zhuanghua(row){//将时间戳转成时间
          return this.formatDate(row.registerTime);
        },
        formatDate(time) {  //时间转化
          var date = new Date(time);
          return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
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
        dengjiquery(scope){//查询物料
          var _this = this;
          var i = 0;
          if(scope.row.detailsNumber>1){
            var params = new URLSearchParams();
            params.append("id",scope.row.id);
            this.$axios.post("MManuFacture/dengjitiaojian_Make_productionByparentid.action", params).then(function (response) {
              if(response.data==true){
                _this.dengjigongxu=scope.row;
                _this.formatDatetwo();
                _this.sheettable=true;
                _this.procedureName=scope.row.procedureName;
                _this.labourHourAmount=scope.row.labourHourAmount;
                _this.realLabourHourAmount=scope.row.realLabourHourAmount;
                var params = new URLSearchParams();
                params.append("id",scope.row.id);
                _this.$axios.post("MManuFacture/dengji_Make_productionByparentid.action", params).then(function (response) {
                  for(i=0;i<response.data.length;i++){
                    response.data[i].rowamount=1;
                  }
                  _this.dengjiform = response.data;
                }).catch();
              }else if(response.data==false){
                _this.$notify({
                  title: '错误',
                  message: '您上一道工序还未交接完成,暂无法登记本工序',
                  type: 'warning'
                });
              }
            }).catch();
          }else if(scope.row.detailsNumber==1){
            this.dengjigongxu=scope.row;
            this.formatDatetwo();
            this.sheettable=true;
            this.procedureName=scope.row.procedureName;
            this.labourHourAmount=scope.row.labourHourAmount;
            this.realLabourHourAmount=scope.row.realLabourHourAmount;
            var params = new URLSearchParams();
            params.append("id",scope.row.id);
            this.$axios.post("MManuFacture/dengji_Make_productionByparentid.action", params).then(function (response) {
              for(i=0;i<response.data.length;i++){
                response.data[i].rowamount=1;
              }
              _this.dengjiform = response.data;
            }).catch();
          }

        },
        jiaojiedengji(scope){//交接登记
          this.dialogTableVisible=true;
          this.gongxuId=scope.row.id;
          this.dengjiprocedureName=scope.row.procedureName
          this.dengjiprocedurexuhao=scope.row.detailsNumber;
        },
        addjiaojie(){//提交交接登记
          var _this = this;
          var params = new URLSearchParams();
          params.append("id",this.gongxuId);
          params.append("realAmount",this.realAmount);
          this.$axios.post("MManuFacture/addjiaojie_Make_productionByparentid.action", params).then(function (response) {
            if (response.data == true) {
              _this.$notify({
                title: '成功',
                message: '当前交接登记通过',
                type: 'success'
              });
              _this.isshow = true;
              _this.dialogTableVisible = false;
              _this.tiaozhuan(_this.shenhe_dispatchform.id);
            } else {
              _this.$notify({
                title: '失败',
                message: '当前交接登记不通过',
                type: 'danger'
              });
              _this.isshow = true;
              _this.dialogTableVisible = false;
              _this.tiaozhuan(_this.shenhe_dispatchform.id);
            }
          }).catch();
        },
        adddengji(){//提交工序登记
          var i=0;
          var _this = this;
          var params = new URLSearchParams();
          console.log(this.dengjigongxu);
          params.append("parentId", this.shenhe_dispatchform.id);//父级序号
          params.append("detailsNumber", this.dengjigongxu.detailsNumber);//工序序号
          params.append("procedureName", this.dengjigongxu.procedureName);//工序名称
          params.append("procedureId",this.dengjigongxu.procedureId);//工序编号
          params.append("labourHourAmount", this.labourHourAmounttwo);//本次工时数
          params.append("costPrice", this.dengjigongxu.costPrice);//单位工时成本
          // params.append("subtotal", this.shenhe_dispatchform.id);//工时成本小计
          // params.append("procedureDescribe", this.pagesize);//工序描述
          params.append("procedureResponsiblePerson",this.procedureResponsiblePerson);//负责人
          params.append("register", this.register);//登记人
          params.append("registerTime", this.registerTime);//登记时间
          this.$axios.post("MProceduring/adddengjigongxu_Make_production.action", params).then(function (response) {
          if(response.data==true){
            for(i=0;i<_this.dengjiform.length;i++){
              _this.dengjiform[i].id=_this.shenhe_dispatchform.id
              _this.dengjiform[i].parentId=_this.dengjigongxu.detailsNumber
            }
            _this.$axios.post("MProceduring/adddengjigongxuwuliao.action",JSON.stringify(_this.dengjiform),{"headers":{"Content-Type":"application/json"}}).then(function (response) {
              if (response.data == true) {
                _this.$notify({
                  title: '成功',
                  message: '当前工序登记通过',
                  type: 'success'
                });
                _this.isshow = true;
                _this.sheettable = false;
                _this.tiaozhuan(_this.shenhe_dispatchform.id);
              } else {
                _this.$notify({
                  title: '失败',
                  message: '当前工序登记不通过',
                  type: 'danger'
                });
                _this.isshow = true;
                _this.sheettable = false;
                _this.tiaozhuan(_this.shenhe_dispatchform.id);
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
  #Production_registration{
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
