<template>
<div>
  <div id="Review_of_material_composition_design_sheet" v-show="istrue">
    <h3>物料组成设计审核</h3>
<!--    <el-form>-->
<!--      <el-select v-model="productClass">-->
<!--        <el-option value="D001-1" label="高档">高档</el-option>-->
<!--        <el-option value="D001-2" label="中档">中档</el-option>-->
<!--        <el-option value="D001-3" label="低挡">低挡</el-option>-->
<!--      </el-select>-->
<!--      <el-button @click="selcp">查询</el-button>-->
<!--    </el-form>-->

    <el-table
      :data="review_design_sheetdata"
      stripe
      border
      style="width: 100%"
    >
      <el-table-column
        prop="designId"
        label="设计编号"
        width="140">
      </el-table-column>
      <el-table-column
        prop="productId"
        label="产品编号"
        width="140">
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
        prop="costPriceSum"
        label="物料总成本"
        width="120">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="edittrueTag(scope.row.id,scope.row.designId)">审核</el-button>
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
    <el-form  size="small" :inline="true" v-model="review_sheetform">
      <el-row>
        <el-col :span="17"><h3>物料组成设计单</h3></el-col>
        <el-col :span="2">
          <el-popconfirm
            title="确定通过吗？"
            @confirm="trueTag(review_sheetform.id)"
          >
            <el-button slot="reference" style="background-color: pink;">通过</el-button>
          </el-popconfirm>
        </el-col>
        <el-col :span="2">

          <el-button  style="background-color: pink;" @click="falseTag(review_sheetform.id)">不通过</el-button>

        </el-col>
        <el-col :span="2">
          <el-button @click="fanhui"  style="background-color: pink;">返回</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><div></div></el-col>
        <el-col :span="7" :offset="3">
          <div><!--产品名称：笔记本-->
            <el-form-item label="产品名称:">
              <el-input type="text" v-model="review_sheetform.productName" readonly="readonly"/>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7" :offset="2"><div><!--产品编号：1000000-->
          <el-form-item label="产品编号:">
            <el-input type="text" v-model="review_sheetform.productId" readonly="readonly"/>
          </el-form-item>
        </div></el-col>
        <el-col :span="6"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1"><!--<div class="inline">库存下限数：</div>-->
          <el-form-item label="设计单编号:">
            <div class="inline div02_01"><el-input type="text" v-model="review_sheetform.designId" :clearable="true"/></div>
          </el-form-item>
          <!--<div class="inline">库存报警上限数：</div>-->
          <el-form-item label="设计人:">
            <div class="inline div02_01" :clearable="true"><el-input type="text" v-model="review_sheetform.designer" class="el-input" :clearable="true"/></div>
          </el-form-item>
        </el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <!--表格-->
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="20" :offset="2">
          <div>
            <el-table
              :data="review_design_sheetByIddata"
              border
              height="140"
              style="width: 100%"
              :header-cell-style="{background:'#eef1f6',color:'#606266'}"
              :cell-style="cellStyle">
              <el-table-column
                width="110"
                prop="detailsNumber"
                label="序号">
              </el-table-column>
              <el-table-column
                width="110"
                prop="productName"
                label="名称">
              </el-table-column>
              <el-table-column
                width="110"
                prop="type"
                label="类型"
                :formatter="typepanduanlist">
              </el-table-column>
              <el-table-column
                prop="productDescribe"
                label="描述">
              </el-table-column>
              <el-table-column
                width="110"
                prop="amount"
                label="数量">
              </el-table-column>
              <el-table-column
                width="110"
                prop="amountUnit"
                label="单位">
              </el-table-column>
              <el-table-column
                width="100"
                prop="costPrice"
                label="计划成本单价(元)">
              </el-table-column>
              <el-table-column
                width="100"
                prop="subtotal"
                label="小计(元)">
              </el-table-column>
<!--              <el-table-column-->
<!--                width="90"-->
<!--                label="操作">-->
<!--                <template slot-scope="scope">-->
<!--                  <el-button >删除</el-button>-->
<!--                </template>-->
<!--              </el-table-column>-->
            </el-table>
          </div>
        </el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="14" :push="1">
          <!--<div class="inline">登记人：</div>-->
          <el-form-item label="物料总成本:">
            <div class="inline div02_01"><el-input type="text" v-model="review_sheetform.costPriceSum"  readonly="readonly"/></div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="14" :push="1">
          <!--<div class="inline">登记人：</div>-->
          <el-form-item label="审核人:">
            <div class="inline div02_01"><el-input type="text" v-model="checker"  readonly="readonly"/></div>
          </el-form-item>
        </el-col>
        <el-col :span="7" :pull="2">
          <!--<div class="inline">登记时间：</div>-->
          <el-form-item label="审核时间:">
            <div class="inline">
              <el-input type="text" v-model="checkTime"  readonly="readonly"/>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" :offset="3">
          <div class="aa">
            <el-form-item label="设计要求:" style="width: 80%; display: block;">
              <el-input type="textarea" :rows="4" resize="none"  placeholder="请输入内容" style="width: 100%" v-model="review_sheetform.moduleDescribe">
              </el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div >
</div>
</template>

<script>
    export default {
        name: "Review_of_material_composition_design_sheet",
      data(){
          return{
            pageno:1,
            pagesize:5,
            total:0,
            istrue:true,
            isshow:false,
            productName:"",//产品名称
            productId:"",//产品编号
            designer:"",//设计人
            designId:"",//设计编号
            costPriceSum:"",//物料总成本
            checker:sessionStorage.getItem("loginId"),//复核人
            checkTime:"",//复核时间
            moduleDescribe:"",/*设计要求*/
            review_design_sheetdata:[],//需要审核的设计单
            review_design_sheetByIddata:[],//设计单包含的物料
            review_sheetform:[],//开始审核的设计单

          }
      },
      methods:{
        getdata() {   //获取数据
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          this.$axios.post("DModule/review_design_sheet.action", params).then(function (response) {
            // console.log(response.data.records)
            _this.review_design_sheetdata = response.data.records;
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
        handleSizeChange(val) {  //页size变更
          this.pagesize = val;
          this.pageno = 1;
          this.getdata();
        },
        handleCurrentChange(val) {  //页码变更
          this.pageno = val;
          this.getdata();
        },
        edittrueTag(id,designId){ //查询设计单以及设计单需要的物料
          this.formatDatetwo();
          this.istrue=false;
          this.isshow=true;
          var _this = this;
          var params = new URLSearchParams();
          params.append("id",id);
          this.$axios.post("DModule/review_design_sheetsel.action", params).then(function (response) {
            // console.log(response.data)
            _this.review_sheetform = response.data;

            var params1 = new URLSearchParams();
            params1.append("id",id);
            params1.append("pageno", _this.pageno);
            params1.append("pagesize",100);
            _this.$axios.post("DModule/review_design_sheetselwuliao.action", params1).then(function (response) {
              console.log(response.data.records)
              _this.review_design_sheetByIddata = response.data.records;
            }).catch();
          }).catch();
        },
        typepanduanlist(row){  //判断为商品还是物料
          if(row.type=="Y001-1"){
            return "商品";
          }else if(row.type=="Y001-2"){
            return "物料";
          }
        },
        trueTag(id){ //根据id通过此次设计单
          var _this = this;
          var params = new URLSearchParams();
          params.append("id",id);
          params.append("checker",this.checker);
          params.append("checkTime",this.checkTime);
          this.$axios.post("DModule/edittrueCheckTag.action", params).then(function (response) {
            if (response.data == true) {
              _this.$notify({
                title: '成功',
                message: '当前设计单已通过',
                type: 'success'
              });
              _this.istrue=true;
              _this.isshow=false;
              _this.getdata();
            } else {
              _this.$notify({
                title: '成功',
                message: '错误',
                type: 'danger'
              });
              _this.istrue=true;
              _this.isshow=false;
              _this.getdata();
            }
          }).catch();
        },
        falseTag(id){ //根据id通过此次设计单
          var _this = this;
          var params = new URLSearchParams();
          params.append("id",id);
          params.append("checker",this.checker);
          params.append("checkTime",this.checkTime);
          this.$axios.post("DModule/editfalseeCheckTag.action", params).then(function (response) {
            if (response.data == true) {
              _this.$notify({
                title: '成功',
                message: '当前设计单未通过',
                type: 'success'
              });
              _this.istrue=true;
              _this.isshow=false;
              _this.getdata();
            } else {
              _this.$notify({
                title: '成功',
                message: '错误',
                type: 'danger'
              });
              _this.istrue=true;
              _this.isshow=false;
              _this.getdata();
            }
          }).catch();
        },
        fanhui(){
          this.istrue=true;
          this.isshow=false;
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
      },
      created() {
          this.getdata();
      }
    }
</script>

<style scoped>
  #Review_of_material_composition_design_sheet{
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
  #div03 {
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
  /*.div03{*/
  /*  position: absolute;*/
  /*  left: 95px;*/
  /*  background: pink;*/
  /*}*/
  /*.div04{*/
  /*  position: absolute;*/
  /*  left: 1200px;*/
  /*}*/
</style>
