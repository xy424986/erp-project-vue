<template>
    <div>
      <div id="Material_composition_design_sheet_query" v-show="istrue">
        <h3>物料组成设计单查询</h3>
<!--        <el-form>-->
<!--          <el-select v-model="productClass">-->
<!--            <el-option value="D001-1" label="高档">高档</el-option>-->
<!--            <el-option value="D001-2" label="中档">中档</el-option>-->
<!--            <el-option value="D001-3" label="低挡">低挡</el-option>-->
<!--          </el-select>-->
<!--          <el-select v-model="type">-->
<!--            <el-option value="Y001-1" label="商品">商品</el-option>-->
<!--            <el-option value="Y001-2" label="物料">物料</el-option>-->
<!--          </el-select>-->
<!--          <el-button @click="selcp">查询</el-button>-->
<!--        </el-form>-->

        <el-table
          :data="query_design_sheetdata"
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
            prop="designModuleTag"
            label="设计单状态"
            width="160"
            :formatter="shejiTagpanduanlist">
          </el-table-column>
          <el-table-column
            prop="checkTag"
            label="审核状态"
            width="160"
            :formatter="Tagpanduanlist">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="queryByid(scope.row.id)">查看详细</el-button>
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
        <el-form  size="small" :inline="true" v-model="query_sheetform">
          <el-row>
            <el-col :span="17"><h3>物料组成设计单</h3></el-col>
            <el-col :span="2">
              <el-button @click="fanhui"  style="background-color: pink;">返回</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><div></div></el-col>
            <el-col :span="7" :offset="3">
              <div><!--产品名称：笔记本-->
                <el-form-item label="产品名称:">
                  <el-input type="text" v-model="query_sheetform.productName" readonly="readonly"/>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7" :offset="2"><div><!--产品编号：1000000-->
              <el-form-item label="产品编号:">
                <el-input type="text" v-model="query_sheetform.productId" readonly="readonly"/>
              </el-form-item>
            </div></el-col>
            <el-col :span="6"><div></div></el-col>
          </el-row>
<!--          <el-row>-->
<!--            <el-col :span="22" :offset="1">&lt;!&ndash;<div class="inline">库存下限数：</div>&ndash;&gt;-->
<!--              <el-form-item label="设计单编号:">-->
<!--                <div class="inline div02_01"><el-input type="text" v-model="query_sheetform.designId" :clearable="true"/></div>-->
<!--              </el-form-item>-->
<!--              &lt;!&ndash;<div class="inline">库存报警上限数：</div>&ndash;&gt;-->
<!--              -->
<!--            </el-col>-->
<!--            <el-col :span="2"><div></div></el-col>-->
<!--          </el-row>-->
          <!--表格-->
          <el-row>
            <el-col :span="2"><div></div></el-col>
            <el-col :span="20" :offset="2">
              <div>
                <el-table
                  :data="query_design_sheetByIddata"
                  border
                  height="140"
                  style="width: 100%"
                  :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                  :cell-style="cellStyle">
                  <el-table-column
                    width="100"
                    prop="detailsNumber"
                    label="序号">
                  </el-table-column>
                  <el-table-column
                    width="90"
                    prop="productId"
                    label="物料编号">
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
                    width="90"
                    prop="subtotal"
                    label="小计(元)">
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
                <div class="inline div02_01"><el-input type="text" v-model="query_sheetform.costPriceSum"  readonly="readonly"/></div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="23" :push="1">
              <!--<div class="inline">登记人：</div>-->
              <el-form-item label="审核人:">
                <div class="inline div02_01"><el-input type="text" v-model="query_sheetform.checker"  readonly="readonly"/></div>
              </el-form-item>
              <el-form-item label="设计人:">
                <div class="inline div02_01" :clearable="true"><el-input type="text" v-model="query_sheetform.designer" class="el-input" :clearable="true" readonly="readonly"/></div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" :pull="2">
              <!--<div class="inline">登记时间：</div>-->
              <el-form-item label="审核时间:">
                <div class="inline">
                  <el-input type="text" v-model="query_sheetform.checkTime"  readonly="readonly"/>
                </div>
              </el-form-item>
              <el-form-item label="设计时间:">
                <div class="inline">
                  <el-input type="text" v-model="query_sheetform.registerTime"  readonly="readonly"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" :offset="3">
              <div class="aa">
                <el-form-item label="设计要求:" style="width: 80%; display: block;">
                  <el-input type="textarea" :rows="4" resize="none"  placeholder="请输入内容" style="width: 100%" readonly="readonly" v-model="query_sheetform.moduleDescribe">
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
    import {formatDate} from "../product design/date";

    export default {
        name: "Material_composition_design_sheet_query",
    data(){
          return{
            pageno:1,
            pagesize:5,
            total:0,
            istrue:true,
            isshow:false,
            query_design_sheetdata:[],//存放设计完成且通过审核的设计单
            type:"",//用途类型,Y001-1: 商品, Y001-2: 物料
            productClass:"",//档次级别,D001-1: 高档,D001-2: 中档,D001-3: 低档
            query_design_sheetByIddata:[],//此设计单包含的物料
            query_sheetform:[],//正在查询的单个设计单
      }
    },
      methods:{
        getdata() {   //获取数据
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          params.append("productClass", this.productClass);
          this.$axios.post("DModule/query_design_sheetdata.action", params).then(function (response) {
            console.log(response.data.rows)
            _this.query_design_sheetdata = response.data.rows;
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
        fanhui(){
          this.istrue=true;
          this.isshow=false;
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
        selcp(){  //根据条件查询
          this.getdata();
        },
        Tagpanduanlist(row){  //判断为档次级别
          if(row.checkTag=="S001-0"){
            return "未审核";
          }else if(row.checkTag=="S001-1"){
            return "通过";
          }else if(row.checkTag=="S001-2"){
            return "不通过";
          }
        },
        shejiTagpanduanlist(row){
          if(row.designModuleTag=="W001-0"){
            return "完成";
          }else if(row.designModuleTag=="W001-1"){
            return "完成";
          }
        },
        formatDate(time) {  //时间转化
          var date = new Date(time);
          return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        },
        queryByid(id){
          this.istrue=false;
          this.isshow=true;
          var _this = this;
          var params = new URLSearchParams();
          params.append("id",id);
          this.$axios.post("DModule/query_design_sheetsel.action", params).then(function (response) {
            // console.log(response.data)
            response.data.registerTime=_this.formatDate(response.data.registerTime);
            response.data.checkTime=_this.formatDate(response.data.checkTime);
            _this.query_sheetform = response.data;

            var params1 = new URLSearchParams();
            params1.append("id",id);
            params1.append("pageno", _this.pageno);
            params1.append("pagesize", _this.pagesize);
            _this.$axios.post("DModule/query_design_sheetselwuliao.action", params1).then(function (response) {
              console.log(response.data.records)
              _this.query_design_sheetByIddata = response.data.records;
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
      },
      created() {
        this.getdata();
      }
    }
</script>

<style scoped>
  #Material_composition_design_sheet_query{
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
</style>
