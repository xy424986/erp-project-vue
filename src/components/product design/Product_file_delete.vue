<template>
    <div>
      <div id="Product_file_delete" v-show="istrueone">
        <h3>产品档案删除</h3>
        <el-form>
          <el-select v-model="productClass">
            <el-option value="D001-1" label="高档">高档</el-option>
            <el-option value="D001-2" label="中档">中档</el-option>
            <el-option value="D001-3" label="低挡">低挡</el-option>
          </el-select>
          <el-button @click="selcp">查询</el-button>
          <el-button @click="huifudelete">恢复删除</el-button>
          <el-button @click="yongjiudelete">永久删除</el-button>
        </el-form>

        <el-table
          :data="deletedata"
          stripe
          border
          style="width: 100%"
        ><a>
          <el-table-column
            prop="productId"
            label="产品编号"
            width="160">
          </el-table-column></a>
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
            prop="productClass"
            label="档次级别"
            width="120"
            :formatter="classpanduanlist">
          </el-table-column>
          <el-table-column
            prop="responsiblePerson"
            label="产品经理"
            width="120">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="deletetruetag(scope.row.id)">删除</el-button>
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
      <div id="Product_file_deletetwo" v-show="istruetwo">
        <h3>产品档案恢复删除</h3>
        <el-form>
          <el-select v-model="productClass">
            <el-option value="D001-1" label="高档">高档</el-option>
            <el-option value="D001-2" label="中档">中档</el-option>
            <el-option value="D001-3" label="低挡">低挡</el-option>
          </el-select>
          <el-button @click="selcp">查询</el-button>
          <el-button @click="fanhui">返回</el-button>
        </el-form>

        <el-table
          :data="huihudeldata"
          stripe
          border
          style="width: 100%"
        ><a>
          <el-table-column
            prop="productId"
            label="产品编号"
            width="150">
          </el-table-column></a>
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
            prop="productClass"
            label="档次级别"
            width="120"
            :formatter="classpanduanlist">
          </el-table-column>
          <el-table-column
            prop="responsiblePerson"
            label="产品经理"
            width="120">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="huifudeletetruetag(scope.row.id)">恢复删除</el-button>
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
      <div id="Product_file_deletethree" v-show="istruethree">
        <h3>产品档案永久删除</h3>
        <el-form>
          <el-select v-model="productClass">
            <el-option value="D001-1" label="高档">高档</el-option>
            <el-option value="D001-2" label="中档">中档</el-option>
            <el-option value="D001-3" label="低挡">低挡</el-option>
          </el-select>
          <el-button @click="selcp">查询</el-button>
          <el-button @click="fanhui">返回</el-button>
        </el-form>

        <el-table
          :data="yongjiudata"
          stripe
          border
          style="width: 100%"
        ><a>
          <el-table-column
            prop="productId"
            label="产品编号"
            width="150">
          </el-table-column></a>
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
            prop="productClass"
            label="档次级别"
            width="120"
            :formatter="classpanduanlist">
          </el-table-column>
          <el-table-column
            prop="responsiblePerson"
            label="产品经理"
            width="120">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="yongjiudeletetruetag(scope.row.id)">永久删除</el-button>
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
    </div>
</template>

<script>
    export default {
        name: "Product_file_delete",
      data(){
          return{
            pageno:1,
            pagesize:5,
            total:0,
            deletedata:[],
            huihudeldata:[],
            yongjiudata:[],
            istrueone:true,
            istruetwo:false,
            istruethree:false,
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
            registerTime:"",//建档时间
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
          }
      },
      methods:{
        getdata() {   //获取数据
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          params.append("productClass", this.productClass);
          console.log(this.productClass)
          this.$axios.post("DFile/deleteproductfile.action", params).then(function (response) {
            _this.deletedata = response.data.records;
            _this.total = response.data.total;
          }).catch();
        },
        getdatatwo() {   //获取数据
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          params.append("productClass", this.productClass);
          console.log(this.productClass)
          this.$axios.post("DFile/deleteproductfiletwo.action", params).then(function (response) {
            _this.huihudeldata = response.data.records;
            _this.total = response.data.total;
          }).catch();
        },
        getdatathree() {   //获取数据
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          params.append("productClass", this.productClass);
          console.log(this.productClass)
          this.$axios.post("DFile/deleteproductfilethree.action", params).then(function (response) {
            _this.yongjiudata = response.data.records;
            _this.total = response.data.total;
          }).catch();
        },
        selcp(){  //根据条件查询
          this.getdata();
          this.getdatatwo();
          this.getdatathree();
        },
        yongjiudelete(){
          this.istrueone=false;
          this.istruethree=true;
          this.getdatathree();
        },
        huifudelete(){
          this.istrueone=false;
          this.istruetwo=true;
          this.getdatatwo();
        },
        fanhui(){
          this.istrueone=true;
          this.istruetwo=false;
          this.istruethree=false;
          this.getdata();
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
        classpanduanlist(row){  //判断为档次级别
          if(row.productClass=="D001-1"){
            return "高档";
          }else if(row.productClass=="D001-2"){
            return "中档";
          }else if(row.productClass=="D001-3"){
            return "低档";
          }
        },
        deletetruetag(id){   //进入详细界面
          var _this = this;
          var params = new URLSearchParams();
          params.append("id",id);
          this.$axios.post("DFile/deletetruetag.action", params).then(function (response) {
            if (response.data == true) {
              _this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              });
              _this.getdata();
            } else {
              _this.$notify({
                title: '成功',
                message: '删除失败',
                type: 'danger'
              });
              _this.getdata();
            }
          }).catch();
        },
        huifudeletetruetag(id){
          var _this = this;
          var params = new URLSearchParams();
          params.append("id",id);
          this.$axios.post("DFile/huifudeletetruetag.action", params).then(function (response) {
            if (response.data == true) {
              _this.$notify({
                title: '成功',
                message: '恢复删除成功',
                type: 'success'
              });
              _this.getdatatwo();
            } else {
              _this.$notify({
                title: '成功',
                message: '恢复删除失败',
                type: 'danger'
              });
              _this.getdatatwo();
            }
          }).catch();
        },
        yongjiudeletetruetag(id){
          var _this = this;
          var params = new URLSearchParams();
          params.append("id",id);
          this.$axios.post("DFile/yongjiudeletetruetag.action", params).then(function (response) {
            if (response.data == true) {
              _this.$notify({
                title: '成功',
                message: '永久删除成功',
                type: 'success'
              });
              _this.getdatathree();
            } else {
              _this.$notify({
                title: '成功',
                message: '永久删除失败',
                type: 'danger'
              });
              _this.getdatathree();
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
  #Product_file_delete{
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
  #Product_file_deletetwo{
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
  #Product_file_deletethree{
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
</style>
