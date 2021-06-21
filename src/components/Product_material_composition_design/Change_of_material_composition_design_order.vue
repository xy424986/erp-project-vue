<template>
    <div>
      <div id="Change_of_material_composition_design_order" v-show="istrue">
        <h3>物料组成设计单变更</h3>
<!--                <el-form>-->
<!--                  <el-select v-model="productClass">-->
<!--                    <el-option value="D001-1" label="高档">高档</el-option>-->
<!--                    <el-option value="D001-2" label="中档">中档</el-option>-->
<!--                    <el-option value="D001-3" label="低挡">低挡</el-option>-->
<!--                  </el-select>-->
<!--                  <el-select v-model="type">-->
<!--                    <el-option value="Y001-1" label="商品">商品</el-option>-->
<!--                    <el-option value="Y001-2" label="物料">物料</el-option>-->
<!--                  </el-select>-->
<!--                  <el-button @click="selcp">查询</el-button>-->
<!--                </el-form>-->

        <el-table
          :data="change_design_sheetdata"
          stripe
          border
          style="width: 100%"
        >
          <el-table-column
            prop="designId"
            label="设计编号"
            width="160">
          </el-table-column>
          <el-table-column
            prop="productId"
            label="产品编号"
            width="160">
          </el-table-column>
          <el-table-column
            prop="productName"
            label="产品名称"
            width="160">
          </el-table-column>
          <el-table-column
            prop="register"
            label="设计人"
            width="160"
            >
          </el-table-column>
          <el-table-column
            prop="registerTime"
            label="设计时间"
            width="170"
            :formatter="zhuanghua">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="querychange(scope.row.id)">变更</el-button>
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
      <div id="div02" v-show="isshow">
        <el-form  size="small" :inline="true" v-model="changeform">
          <el-row>
            <el-col :span="1">
              <el-popconfirm
                title="确定提交吗？"
                @confirm="addChange(changeform.id)"
              >
                <el-button slot="reference" style="background-color: pink;">提交</el-button>
              </el-popconfirm>
            </el-col>
            <el-col :span="3">
              <el-button  style="background-color: pink;" @click="tiaozhuang">添加物料</el-button>
            </el-col>
            <el-col :span="17"><h3>物料组成设计单</h3></el-col>
            <el-col :span="3">
              <el-button @click="fanhui"  style="background-color: pink;">返回</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14" :push="1">
              <!--<div class="inline">登记人：</div>-->
              <el-form-item label="设计人:">
                <div class="inline div02_01"><el-input type="text" v-model="changeform.designer" readonly="readonly"/></div>
              </el-form-item>
            </el-col>
            <el-col :span="10" :pull="3">
              <!--<div class="inline">登记时间：</div>-->
              <el-form-item label="设计单编号:">
                <div class="inline">
                  <el-input type="text" v-model="changeform.designId" readonly="readonly"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
<!--            <el-col :span="4"><div></div></el-col>-->
            <el-col :span="13" :offset="0">
              <div><!--产品名称：笔记本-->
                <el-form-item label="产品名称:">
                  <el-input type="text" v-model="changeform.productName" readonly="readonly"/>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7" :offset="0"><div><!--产品编号：1000000-->
              <el-form-item label="产品编号:">
                <el-input type="text" v-model="changeform.productId" readonly="readonly"/>
              </el-form-item>
            </div></el-col>
<!--            <el-col :span="6"><div></div></el-col>-->
          </el-row>
<!--          <el-row>-->
<!--            <el-col :span="4"><div></div></el-col>-->
<!--            <el-col :span="14" :offset="1" >-->
<!--              &lt;!&ndash;<div class="inline">设计人：</div>&ndash;&gt;-->
<!--              <el-form-item label="登记人:">-->
<!--                <div class="inline div02_01"><el-input type="text" v-model="changeform.register" readonly="readonly"/></div>-->
<!--              </el-form-item>-->
<!--            </el-col>-->
<!--          </el-row>-->
          <!--表格-->
          <el-row>
            <el-col :span="2"><div></div></el-col>
            <el-col :span="20" :offset="2">
              <div>
                <el-table
                  :data="querychange_design_sheetByIddata"
                  border
                  height="180"
                  style="width: 100%"
                  :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                  :cell-style="cellStyle">
                  <el-table-column
                    width="90"
                    prop="productId"
                    label="编号">
                  </el-table-column>
                  <el-table-column
                    width="90"
                    prop="productName"
                    label="名称">
                  </el-table-column>
                  <el-table-column
                    width="90"
                    prop="type"
                    label="类型"
                    :formatter="typepanduanlist">
                  </el-table-column>
                  <el-table-column
                    prop="productDescribe"
                    label="描述">
                  </el-table-column>
                  <el-table-column
                    width="90"
                    prop="amount"
                    label="数量">
                    <template slot-scope="scope">
                      <el-input type="number" v-model="scope.row.amount" v-on:input="subtotaledit(scope)"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    width="90"
                    prop="amountUnit"
                    label="单位">
                  </el-table-column>
                  <el-table-column
                    width="90"
                    prop="costPrice"
                    label="计划成本单价(元)">
                  </el-table-column>
                  <el-table-column
                    width="100"
                    prop="subtotal"
                    label="小计(元)">
                  </el-table-column>
                  <el-table-column
                    width="90"
                    label="操作">
                    <template slot-scope="scope">
                      <!--                    <el-popconfirm-->
                      <!--                      title="确定删除这条数据吗？"-->
                      <!--                      @confirm="delwuliao()"-->
                      <!--                    >-->
                      <el-button @click="delwuliao(scope.$index)">删除</el-button>
                      <!--                    </el-popconfirm>-->
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
            <el-col :span="2"><div></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="13" :push="1">
              <!--<div class="inline">登记人：</div>-->
              <el-form-item label="物料总成本:">
                <div class="inline div02_01"><el-input type="text" v-model="changeform.costPriceSum" readonly="readonly"/></div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14" :push="1">
              <!--<div class="inline">登记人：</div>-->
              <el-form-item label="变更人:">
                <div class="inline div02_01"><el-input type="text" v-model="changer" readonly="readonly"/></div>
              </el-form-item>
            </el-col>
            <el-col :span="7" :pull="2">
              <!--<div class="inline">登记时间：</div>-->
              <el-form-item label="变更时间:">
                <div class="inline">
                  <el-input type="text" v-model="changeform.changeTime" readonly="readonly"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" :offset="3">
              <div class="aa">
                <el-form-item label="设计要求:" style="width: 80%; display: block;">
                  <el-input type="textarea" :rows="4" resize="none"  placeholder="请输入内容" style="width: 100%" v-model="changeform.moduleDescribe">
                  </el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div >
      <el-drawer
        title="添加物料"
        :before-close="handleClose"
        :visible.sync="sheettable"
        direction="rtl"
        size="60%">
        <el-form>
          <el-select v-model="productClass">
            <el-option value="D001-1" label="高档">高档</el-option>
            <el-option value="D001-2" label="中档">中档</el-option>
            <el-option value="D001-3" label="低挡">低挡</el-option>
          </el-select>
          <el-button @click="selcp">查询</el-button>
        </el-form>
        <el-table
          :data="gridData">
          <el-table-column
            prop="productId"
            label="产品编号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="productName"
            label="产品名称"
            width="120">
          </el-table-column>
          <el-table-column
            width="120"
            prop="type"
            label="类型"
            :formatter="typepanduanlist">
          </el-table-column>
          <el-table-column
            prop="productDescribe"
            label="描述">
          </el-table-column>
          <el-table-column
            width="120"
            prop="amountUnit"
            label="单位">
          </el-table-column>
          <el-table-column
            width="120"
            prop="costPrice"
            label="计划成本单价(元)">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="addwuliao(scope.row.id)">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页-->
        <el-pagination
          @size-change="handleSizeChangeone"
          @current-change="handleCurrentChangetwo"
          :current-page="pageno"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-drawer>
    </div>
</template>

<script>
    import {formatDate} from "../product design/date";

    export default {
        name: "Change_of_material_composition_design_order",
      data(){
          return{
            pageno:1,
            pagesize:5,
            total:0,
            istrue:true,
            isshow:false,
            sheettable:false,
            changer:sessionStorage.getItem("loginId"),//变更人
            changeTime:"",//变更时间
            productClass:"",//档次级别,D001-1: 高档,D001-2: 中档,D001-3: 低档
            change_design_sheetdata:[],//存放物料组成设计变更的数据
            changeform:[],//存放正在变更的设计单数据
            querychange_design_sheetByIddata:[],//存放正在变更的设计单所需要的物料
            gridData:[],//存放查询到的物料
          }
      },
      methods:{
        getdata() {   //获取数据
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          this.$axios.post("DModule/change_design_sheet.action", params).then(function (response) {
            console.log(response.data.records)
            _this.change_design_sheetdata = response.data.records;
            _this.total = response.data.total;
          }).catch();
        },
        delwuliao(index){//删除选中的物料

          this.querychange_design_sheetByIddata.splice(index,1);
          this.subtotaledittwo();
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
        handleSizeChange(val) {  //页size变更
          this.pagesize = val;
          this.pageno = 1;
          this.getdata();
        },
        handleCurrentChange(val) {  //页码变更
          this.pageno = val;
          this.getdata();
        },
        handleSizeChangeone(val) {  //页size变更
          this.pagesize = val;
          this.pageno = 1;
          this.getdata();
        },
        handleCurrentChangetwo(val) {  //页码变更
          this.pageno = val;
          this.getdata();
        },
        zhuanghua(row){
          return this.formatDate(row.registerTime);
        },
        formatDate(time) {  //时间转化
          var date = new Date(time);
          return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        },
        subtotaledit(scope){
          scope.row.subtotal=scope.row.amount*scope.row.costPrice;
          var i=0;
          this.changeform.costPriceSum=0;
          for(i=0;i<this.querychange_design_sheetByIddata.length;i++){
            this.changeform.costPriceSum=this.changeform.costPriceSum+this.querychange_design_sheetByIddata[i].subtotal;
          }
        },
        subtotaledittwo(){
          var i=0;
          this.changeform.costPriceSum=0;
          for(i=0;i<this.querychange_design_sheetByIddata.length;i++){
            this.changeform.costPriceSum=this.changeform.costPriceSum+this.querychange_design_sheetByIddata[i].subtotal;
          }
        },
        selcp(){  //根据条件查询
          this.getdata();
          this.tiaozhuang();
        },
        fanhui(){
          this.isshow=false;
          this.istrue=true;
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
        typepanduanlist(row){  //判断为商品还是物料
          if(row.type=="Y001-1"){
            return "商品";
          }else if(row.type=="Y001-2"){
            return "物料";
          }
        },
        querychange(id){

          this.istrue=false;
          this.isshow=true;
          var _this = this;
          var params = new URLSearchParams();
          params.append("id",id);
          this.$axios.post("DModule/querychange_design_sheetsel.action", params).then(function (response) {
            // console.log(response.data)
            response.data.registerTime=_this.formatDate(response.data.registerTime);
            response.data.checkTime=_this.formatDate(response.data.checkTime);
            _this.changeform = response.data;
            _this.formatDatetwo();
            var params1 = new URLSearchParams();
            params1.append("id",id);
            params1.append("pageno", _this.pageno);
            params1.append("pagesize", _this.pagesize);
            _this.$axios.post("DModule/querychange_design_sheetselwuliao.action", params1).then(function (response) {
              console.log(response.data.records)
              _this.querychange_design_sheetByIddata = response.data.records;
            }).catch();
          }).catch();
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
          this.changeform.changeTime = year+"/"+month+"/"+day+"  "+hour+":"+minute+":"+second;
        },
        tiaozhuang(){ //弹出添加物料动画，且查询物料
          this.sheettable=true;
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          params.append("productClass", this.productClass);
          this.$axios.post("DModule/editdesign_sheetsel_wuliao.action", params).then(function (response) {
            console.log(response.data.records)
            _this.gridData = response.data.records;
            _this.total = response.data.total;
          }).catch();
        },
        addwuliao(id){ //给在设计的商品添加物料
          var _this = this;
          var i = 0;
          // // this.gridData[index].subtotal=5555;
          // console.log(this.gridData(index))
          var params = new URLSearchParams();
          params.append("id",id);
          this.$axios.post("DModule/editdesign_sheetsel_wuliaoById.action", params).then(function (response) {
            response.data.amount=1;
            response.data.subtotal=(response.data.amount*response.data.costPrice)

            for(i=0;i<_this.querychange_design_sheetByIddata.length;i++){

              if(response.data.productId==_this.querychange_design_sheetByIddata[i].productId){
                _this.$notify({
                  title: '重复',
                  message: '此物料您已经选择了！',
                  type: 'danger'
                });
                return "";
              }
            }
            _this.querychange_design_sheetByIddata.push(response.data);

            _this.changeform.costPriceSum=0;
            for(i=0;i<_this.querychange_design_sheetByIddata.length;i++){
              _this.changeform.costPriceSum=_this.changeform.costPriceSum+_this.querychange_design_sheetByIddata[i].subtotal;
            }
            console.log(_this.querychange_design_sheetByIddata)
            console.log(_this.changeform)

          }).catch();
        },
        addChange: function (id) {//添加设计单以及设计单需要的物料
          var _this = this;
          var params = new URLSearchParams();
          var i = 0;
          params.append("id", this.changeform.id);
          params.append("moduleDescribe", this.changeform.moduleDescribe);
          params.append("costPriceSum", this.changeform.costPriceSum);
          params.append("changer", this.changer);
          params.append("changeTime", this.changeform.changeTime);
          this.$axios.post("DModule/changedesign_sheetadd_wuliaoone.action",
            params).then(function (response) {

            if (response.data == true) {
              // _this.$axios.post("DModule/design_sheetadd_wuliaotwo.action", params).then(function (response) {
              //   console.log(response.data)
              //   _this.DModuleone = response.data;
              // }).catch();
              for (i = 0; i < _this.querychange_design_sheetByIddata.length; i++) {
                _this.querychange_design_sheetByIddata[i].parentId=_this.changeform.id;
                _this.querychange_design_sheetByIddata[i].id="";
              }
              console.log(_this.querychange_design_sheetByIddata)
              _this.$axios.post("DModule/changedesign_sheetadd_wuliaothree.action",JSON.stringify(_this.querychange_design_sheetByIddata),{"headers":{"Content-Type":"application/json"}}).then(function (response) {
                console.log(response.data)
                if (response.data == true) {
                  _this.$notify({
                    title: '成功',
                    message: '变更成功，请重新审核',
                    type: 'success'
                  });
                  _this.istrue = true;
                  _this.isshow = false;
                  _this.getdata();
                } else {
                  _this.$notify({
                    title: '失败',
                    message: '变更失败',
                    type: 'danger'
                  });
                  _this.istrue = true;
                  _this.isshow = false;
                  _this.getdata();
                }
              }).catch();
            } else {
              _this.$notify({
                title: '失败',
                message: '提交失败',
                type: 'danger'
              });
              _this.istrue = true;
              _this.isshow = false;
              _this.getdata();
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
  #Change_of_material_composition_design_order{
    font-weight: bold;
    margin:0 auto;
    width: 1120px;
    height: 520px;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    border-radius: 1px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  #div02 {
    font-weight: bold;
    margin:0 auto;
    width: 1000px;
    height: 540px;
    text-align: center;
    color: #2c3e50;
    margin-top: 20px;
    border-radius: 1px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .inline{/*转换行内元素*/
    display: inline-block;
  }

  .div02_01{/*div下边框*/
    border-bottom:1px solid black;
    width: 300px;
    text-align:left;
  }
  .drop-downBox{
    width: 333px;
  }
  .el-input__inner{
    border: none;
  }
  .aa .el-form-item--small .el-form-item__content,
  .el-form-item--small .el-form-item__labe {
    width: 83%;
  }
  .yanse{
    background-color:yellow;
  }
  .div03{
    position: absolute;
    left: 95px;
    background: pink;
  }
  .div04{
    position: absolute;
    left: 1200px;
  }
</style>
