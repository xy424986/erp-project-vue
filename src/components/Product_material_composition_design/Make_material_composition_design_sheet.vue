<template>
  <div>
  <div id="Make_material_composition_design_sheet" v-show="istrue">
    <h3>物料组成设计</h3>
    <el-form>
      <el-select v-model="productClass">
        <el-option value="D001-1" label="高档">高档</el-option>
        <el-option value="D001-2" label="中档">中档</el-option>
        <el-option value="D001-3" label="低挡">低挡</el-option>
      </el-select>
      <el-select v-model="type">
        <el-option value="Y001-1" label="商品">商品</el-option>
        <el-option value="Y001-2" label="物料">物料</el-option>
      </el-select>
      <el-button @click="selcp">查询</el-button>
    </el-form>

    <el-table
      :data="design_sheetdata"
      stripe
      border
      style="width: 100%"
    >
      <el-table-column
        prop="productId"
        label="产品编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="productName"
        label="产品名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="firstKindName"
        label="I级分类"
        width="120">
      </el-table-column>
      <el-table-column
        prop="secondKindName"
        label="II级分类"
        width="120">
      </el-table-column>
      <el-table-column
        prop="thirdKindName"
        label="III级分类"
        width="120">
      </el-table-column>
      <el-table-column
        prop="type"
        label="用途类型"
        width="120"
        :formatter="typepanduanlist">
      </el-table-column>
      <el-table-column
        prop="productClass"
        label="档次级别"
        width="120"
        :formatter="classpanduanlist">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="zhiding(scope.row.id)">制定设计单</el-button>
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
      <el-form  size="small" :inline="true" v-model="sheetform">
        <el-row>
          <el-col :span="1">
            <el-popconfirm
              title="确定提交吗？"
              @confirm="addSheet(sheetform.id)"
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
          <el-col :span="4"><div></div></el-col>
          <el-col :span="7" :offset="3">
            <div><!--产品名称：笔记本-->
              <el-form-item label="产品名称:">
                <el-input type="text" v-model="sheetform.productName" readonly="readonly"/>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="7" :offset="2"><div><!--产品编号：1000000-->
            <el-form-item label="产品编号:">
              <el-input type="text" v-model="sheetform.productId" readonly="readonly"/>
            </el-form-item>
          </div></el-col>
          <el-col :span="6"><div></div></el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><div></div></el-col>
          <el-col :span="14" :offset="1" >
            <!--<div class="inline">设计人：</div>-->
            <el-form-item label="登记人:">
              <div class="inline div02_01"><el-input type="text" v-model="sheetform.register" readonly="readonly"/></div>
            </el-form-item>
          </el-col>
        </el-row>
        <!--表格-->
        <el-row>
          <el-col :span="2"><div></div></el-col>
          <el-col :span="20" :offset="2">
            <div>
              <el-table
                :data="design_sheetByIddata"
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
          <el-col :span="14" :push="1">
            <!--<div class="inline">登记人：</div>-->
            <el-form-item label="设计人:">
              <div class="inline div02_01"><el-input type="text" v-model="designer" readonly="readonly"/></div>
            </el-form-item>
          </el-col>
          <el-col :span="7" :pull="2">
            <!--<div class="inline">登记时间：</div>-->
            <el-form-item label="设计时间:">
              <div class="inline">
                <el-input type="text" v-model="registerTime" readonly="readonly"/>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" :offset="3">
            <div class="aa">
              <el-form-item label="设计要求:" style="width: 80%; display: block;">
                <el-input type="textarea" :rows="4" resize="none"  placeholder="请输入内容" style="width: 100%" v-model="moduleDescribe">
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
    export default {
        name: "Make_material_composition_design_sheet",
      data(){
          return{
            pageno:1,
            pagesize:5,
            total:0,
            design_sheetdata:[],//需要设计的商品
            design_sheetByIddata:[],//存入设计商品的物料
            sheetform:[],//给商品制定设计单
            gridData:[],//存放查询到的物料
            istrue:true,
            isshow:false,
            sheettable:false,
            productId:"",//档案编号
            productName:"",//产品名称
            factoryName:"",//制造商
            firstKindId:"01",//产品I级分类编号
            firstKindName:"电子",//产品I级分类名称
            secondKindId:"01",//产品II级分类编号
            secondKindName:"计算机",//产品II级分类名称
            thirdKindId:"01",//产品III级分类编号
            thirdKindName:"服务器",//产品III级分类名称
            productNick:"",//产品简称
            type:"",//用途类型,Y001-1: 商品, Y001-2: 物料
            productClass:"",//档次级别,D001-1: 高档,D001-2: 中档,D001-3: 低档
            personalUnit:"",//计量单位
            personalValue:"",//计量值
            providerGroup:"",//供应商集合
            warranty:"",//保修期
            twinName:"",//替代品名称
            twinId:"",//替代品编号
            lifecycle:"",//生命周期
            listPrice:"",//市场单价
            costPrice:"",//计划成本单价
            realCostPrice:"",//成本单价
            amountUnit:"",//单位
            productDescribe:"",//产品描述
            responsiblePerson:"",//产品经理
            register:"",//登记人
            registerTime:"",//建档时间or设计时间
            checker:"",//复核人
            checkTime:"",//复核时间
            checkTag:"",//审核标志,S001-0: 等待审核,S001-1: 审核通过,S001-2: 审核不通过
            changer:"",//变更人
            changeTime:"",//变更时间
            changeTag:"",/*档案变更标志,D002-0: 未变更,D002-1: 已变更*/
            priceChangeTag:"",/*价格变更标志,J001-0：未变更,J001-1：已变更*/
            fileChangeAmount:"",//档案变更累计
            deleteTag:"",/*产品删除标志,C001-0: 未删除,C001-1: 已删除*/
            designModuleTag:"",/*物料组成标志,W001-0: 未设计,W001-1: 已设计*/
            designProcedureTag:"",/*工序组成标志,G001-0: 未设计,G001-1: 已设计*/
            designCellTag:"",/*库存分配标志,K001-0: 未设计,K001-1: 已设计*/
            designer:sessionStorage.getItem("loginId"),/*设计人*/
            amount:1,//数量
            subtotal:0,//小计
            moduleDescribe:"",/*设计要求*/
            DModuleone:[],//设计单提交方法二调用
          }
      },
      methods:{
        getdata() {   //获取数据
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          params.append("productClass", this.productClass);
          params.append("type", this.type);
          this.$axios.post("DModule/design_sheet.action", params).then(function (response) {
            console.log(response.data.records)
            _this.design_sheetdata = response.data.records;
            _this.total = response.data.total;
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
        delwuliao(index){//删除选中的物料

          this.design_sheetByIddata.splice(index,1)
        },
        addwuliao(id){ //给在设计的商品添加物料
          var _this = this;
          var i = 0;
          // // this.gridData[index].subtotal=5555;
          // console.log(this.gridData(index))
          var params = new URLSearchParams();
          params.append("id",id);
          this.$axios.post("DModule/design_sheetsel_wuliaoById.action", params).then(function (response) {
            response.data.amount=1;
            response.data.subtotal=(response.data.amount*response.data.costPrice)

            for(i=0;i<_this.design_sheetByIddata.length;i++){

              if(response.data.id==_this.design_sheetByIddata[i].id){
                _this.$notify({
                  title: '重复',
                  message: '此物料您已经选择了！',
                  type: 'danger'
                });
                return "";
              }
            }
            _this.design_sheetByIddata.push(response.data);
            console.log(_this.design_sheetByIddata)
                // _this.gridData.splice(index,1);

          }).catch();
        },
        subtotaledit(scope){
          scope.row.subtotal=scope.row.amount*scope.row.costPrice;
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
        selcp(){  //根据条件查询
          this.getdata();
          this.tiaozhuang();
        },

        typepanduanlist(row){  //判断为商品还是物料
          if(row.type=="Y001-1"){
            return "商品";
          }else if(row.type=="Y001-2"){
            return "物料";
          }
        },
        classpanduanlist(row){  //判断为档次级别
          if(row.productClass=="D001-1"){
            return "高档";
          }else if(row.productClass=="D001-2"){
            return "中档";
          }else if(row.productClass=="D001-3"){
            return "低档";
          }
        },
        addSheet: function (id) {//添加设计单以及设计单需要的物料
          if(this.design_sheetByIddata==""){
            this.$notify({
              title: '提交错误',
              message: '您还未选择物料',
              type: 'danger'
            });
            return "";
          }
          var _this = this;
          var params = new URLSearchParams();
          var i = 0;
          params.append("dfileid", id);
          params.append("productId", this.sheetform.productId);//产品编号
          params.append("productName", this.sheetform.productName);//产品名称
          params.append("firstKindId", this.sheetform.firstKindId);//产品I级分类编号
          params.append("firstKindName", this.sheetform.firstKindName);//产品I级分类名称
          params.append("secondKindId", this.sheetform.secondKindId);//产品II级分类编号
          params.append("secondKindName", this.sheetform.secondKindName);//产品II级分类名称
          params.append("thirdKindId", this.sheetform.thirdKindId);//产品III级分类编号
          params.append("thirdKindName", this.sheetform.thirdKindName);//产品III级分类名称
          params.append("register", this.sheetform.register);//登记人
          params.append("registerTime", this.registerTime);//设计时间
          params.append("designer", this.designer);//设计人
          params.append("moduleDescribe", this.moduleDescribe);//设计要求
          this.subtotal = 0;
          for (i = 0; i < this.design_sheetByIddata.length; i++) {
            this.subtotal = this.subtotal + this.design_sheetByIddata[i].subtotal;
          }
          params.append("costPriceSum", this.subtotal);//物料总成本

          // var json=JSON.stringify(this.design_sheetByIddata);
          //
          // console.log(json)
          // {"headers":{"Content-Type":"application/json"}}
          this.$axios.post("DModule/design_sheetadd_wuliaoone.action",
            params).then(function (response) {
            if (response.data == true) {
              _this.$axios.post("DModule/design_sheetadd_wuliaotwo.action", params).then(function (response) {
                console.log(response.data)
                _this.DModuleone = response.data;
                for (i = 0; i < _this.design_sheetByIddata.length; i++) {
                  _this.design_sheetByIddata[i].parentId=_this.DModuleone.id;
                  _this.design_sheetByIddata[i].Id="";
                }
                _this.$axios.post("DModule/design_sheetadd_wuliaothree.action",JSON.stringify(_this.design_sheetByIddata),{"headers":{"Content-Type":"application/json"}}).then(function (response) {
                  console.log(response.data)
                  if (response.data == true) {
                    _this.$notify({
                      title: '成功',
                      message: '提交成功',
                      type: 'success'
                    });
                    _this.istrue = true;
                    _this.isshow = false;
                    _this.getdata();
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
        fanhui(){
          this.isshow=false;
          this.istrue=true;
        },
        tiaozhuang(){ //弹出添加物料动画，且查询物料
          this.sheettable=true;
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          params.append("productClass", this.productClass);
          this.$axios.post("DModule/design_sheetsel_wuliao.action", params).then(function (response) {
            console.log(response.data.records)
            _this.gridData = response.data.records;
            _this.total = response.data.total;
          }).catch();
        },
        zhiding(id){  //给商品制定设计单
          this.formatDatetwo();
          this.istrue=false;
          this.isshow=true;
          var _this = this;
          var params = new URLSearchParams();
          params.append("id",id);
          this.$axios.post("DModule/design_sheet_sel.action", params).then(function (response) {
            console.log(response.data)
            _this.sheetform = response.data;
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
      },
      created() {
          this.getdata();
      }
    }
</script>

<style scoped>
  #Make_material_composition_design_sheet{
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
    height: 520px;
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
