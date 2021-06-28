<template>
  <div>
    <div v-show="istrue" id="Product_file_registration_review">
      <h3>产品档案登记复核</h3>
      <el-table
        :data="reviewdata"
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
          prop="type"
          label="用途类型"
          width="120"
          :formatter="typepanduanlist">
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
          prop="responsiblePerson"
          label="产品经理"
          width="120">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="tiao(scope.row.id)" :formatter="buttonpanduanlist">

              复核
            </el-button>
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


    <div v-if="isshow">
      <h3>产品档案登记</h3>
      <div>
        <el-row>
          <el-col :span="24">
            <div style="background-color: dodgerblue" borde>主信息</div>
          </el-col>
          <el-form ref="sklform">
            <el-col :span="24">
              <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                档案编号:
                <input type="text" style="width: 193px"  v-model="reviewdatatwo.productId" readonly="readonly"></input>
              </label>
            </el-col>
            <el-col :span="12">
              <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                产品名称:
                <input type="text" style="width: 193px"  v-model="reviewdatatwo.productName" readonly="readonly"></input>
              </label>
            </el-col>
            <el-col :span="12">
              <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                制造商:
                <input type="text" style="width: 216px"  v-model="reviewdatatwo.factoryName" readonly="readonly"></input>
              </label>
            </el-col>
            <el-col :span="12">
              <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                I级分类:
                <select style="width: 210px"  readonly="readonly">
                  <option></option>
                  <option selected>01/电子</option>
                </select>
              </label>
            </el-col>
            <el-col :span="12">
              <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                II级分类:
                <select style="width: 212px"  readonly="readonly">
                  <option></option>
                  <option selected>01/计算机</option>
                </select>
              </label>
            </el-col>
            <el-col :span="12">
              <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                III级分类:
                <select style="width: 200px" readonly="readonly">
                  <option></option>
                  <option selected>01/服务器</option>
                </select>
              </label>
            </el-col>
            <el-col :span="12">
              <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                产品简介:
                <input type="text" style="width: 200px" v-model="reviewdatatwo.productNick" readonly="readonly"></input>
              </label>
            </el-col>
            <el-col :span="12">
              <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                用途类型:
                <select style="width: 198px" v-model="reviewdatatwo.type" readonly="readonly">
                  <option></option>
                  <option value="Y001-1">商品</option>
                  <option value="Y001-2">物料</option>
                </select>
              </label>
            </el-col>
            <el-col :span="12">
              <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                档次级别:
                <select style="width: 205px"  readonly="readonly" v-model="reviewdatatwo.productClass">
                  <option></option>
                  <option value="D001-1">高档</option>
                  <option value="D001-2">中档</option>
                  <option value="D001-3">低档</option>
                </select>
              </label>
            </el-col>
            <el-col :span="12">
              <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                计量单位:
                <input type="text"  readonly="readonly" style="width: 195px" v-model="reviewdatatwo.personalUnit"></input>
              </label>
            </el-col>
            <el-col :span="12">
              <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                计量值:
                <input type="text"  readonly="readonly" style="width: 217px" v-model="reviewdatatwo.personalValue"></input>
              </label>
            </el-col>
            <el-col :span="12">
              <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                市场单价(元):
                <input type="text"  readonly="readonly" v-model="reviewdatatwo.listPrice"></input>
              </label>
            </el-col>
            <el-col :span="12">
              <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                计划成本单价:
                <input type="text"  readonly="readonly" v-model="reviewdatatwo.costPrice"></input>
              </label>
            </el-col>
            <el-col :span="24">
              <div style="background-color:#2c3e50" borde>辅助信息</div>
            </el-col>
            <el-col :span="12">
              <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                保修期:
                <input type="text" style="width: 212px"  readonly="readonly"  v-model="reviewdatatwo.warranty"></input>
              </label>
            </el-col>
            <el-col :span="12">
              <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                替代品名称:
                <input type="text"style="width: 185px"  readonly="readonly" v-model="reviewdatatwo.twinName"></input>
              </label>
            </el-col>
            <el-col :span="12">
              <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                替代品编号:
                <input type="text" style="width: 180px"  readonly="readonly" v-model="reviewdatatwo.twinId"></input>
              </label>
            </el-col>
            <el-col :span="12">
              <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                生命周期(年):
                <input type="text" style="width: 175px"  readonly="readonly" v-model="reviewdatatwo.lifecycle"></input>
              </label>
            </el-col>
            <el-col :span="12">
              <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                单位:
                <input type="text" style="width: 228px"  readonly="readonly" v-model="reviewdatatwo.amountUnit"></input>
              </label>
            </el-col>
            <el-col :span="12">
              <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                产品经理:
                <input type="text" style="width: 202px"  readonly="readonly" v-model="reviewdatatwo.responsiblePerson"></input>
              </label>
            </el-col>
            <el-col :span="12" >
              <label class="p1" style="background-color:lightsteelblue;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                供应商集合:</label><br>
              <input type="textarea"  style="width: 78%;height: 70px"  readonly="readonly" v-model="reviewdatatwo.providerGroup"></input>

            </el-col>
            <el-col :span="12" >
              <label class="p1" style="background-color:lightsteelblue;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                产品描述:</label><br>
              <input type="textarea"  style="width: 78%;height: 70px;"  readonly="readonly" v-model="reviewdatatwo.productDescribe"></input>

            </el-col>
            <el-col :span="12">
              <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                登记人:
                <input type="text" style="width: 214px"  readonly="readonly"  v-model="reviewdatatwo.register"></input>
              </label>
            </el-col>
            <el-col :span="12">
              <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                建档时间:
                <input type="text" readonly="readonly" style="width: 203px"   v-model="registerTime"></input>
<!--                <p>{{reviewdatatwo.registerTime|formatDate}}</p>-->
              </label>
            </el-col>
            <el-col :span="12">
              <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                复核人:
                <input type="text"  style="width: 214px"  readonly="readonly"  v-model="checker"></input>
              </label>
            </el-col>
            <el-col :span="12">
              <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                复核时间:
                <input type="text" readonly="readonly" style="width: 203px"   v-model="checkTime"></input>
              </label>
            </el-col>
            <el-button @click="editCheckTag(reviewdatatwo.id)">通过</el-button>
            <el-button @click="editCheckTagtwo(reviewdatatwo.id)">不通过</el-button>
            <el-button @click="fanHui">返回</el-button>

          </el-form>
        </el-row>

      </div>
    </div>
  </div>

</template>

<script>

  import {formatDate} from './date';
    export default {
        name: "Product_file_registration_review",
        data(){
          return {
            reviewdata:[],
            reviewdatatwo:[],
            pageno:1,
            pagesize:5,
            total:0,
            istrue:true,
            isshow:false,
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
            checker:sessionStorage.getItem("loginId"),//复核人
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

            this.$axios.post("DFile/cpdafuhesel.action", params).then(function (response) {
              console.log(response.data.records)
              _this.reviewdata = response.data.records;
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
          typepanduanlist(row){   //判断
            if(row.type=="Y001-1"){
              return "商品";
            }else if(row.type=="Y001-2"){
              return "物料";
            }
          },
          buttonpanduanlist(row){
            alert(111)
            if(row.checkTag=="S001-0"){
              return "审核";
            }else if(row.checkTag=="S001-2"){
              return "重新审核";
            }else if(row.checkTag=="D001-1"){
              return "审核";
            }
          },
          tiao(id){   //复核，进入复核界面
           this.istrue=false;
           this.isshow=true;
            var _this = this;
            var params = new URLSearchParams();
            params.append("id",id);

            this.$axios.post("DFile/cpdafuheselbegin.action", params).then(function (response) {
              console.log(response.data.registerTime)
             _this.registerTime=_this.formatDate(response.data.registerTime);
              _this.reviewdatatwo = response.data;
            }).catch();
          },
          editCheckTag(id){  //复核成功通过
            var _this = this;
            var params = new URLSearchParams();
            params.append("id",id);
            params.append("checker",this.checker);
            params.append("checkTime",this.checkTime);
            this.$axios.post("DFile/editCheckTag.action", params).then(function (response) {
              if (response.data == true) {
                _this.$notify({
                  title: '成功',
                  message: '审核通过',
                  type: 'success'
                });
                _this.istrue=true;
                _this.isshow=false;
                _this.getdata();
              } else {
                _this.$notify({
                  title: '成功',
                  message: '审核不通过',
                  type: 'danger'
                });
                _this.istrue=true;
                _this.isshow=false;
                _this.getdata();
              }
            }).catch();
          },
          editCheckTagtwo(id){   // 复核不通过
            var _this = this;
            var params = new URLSearchParams();
            params.append("id",id);
            params.append("checker",this.checker);
            params.append("checkTime",this.checkTime);
            this.$axios.post("DFile/editCheckTagtwo.action", params).then(function (response) {
              if (response.data == true) {
                _this.$notify({
                  title: '成功',
                  message: '审核不通过',
                  type: 'success'
                });
                _this.istrue=true;
                _this.isshow=false;
                _this.getdata();
              } else {
                _this.$notify({
                  title: '成功',
                  message: '失败',
                  type: 'danger'
                });
                _this.istrue=true;
                _this.isshow=false;
                _this.getdata();
              }
            }).catch();
          },
          fanHui(){  //返回复核表格界面
            this.istrue=true;
            this.isshow=false;
            this.getdata();
          },
            formatDate(time) {   //时间转化
              var date = new Date(time);
              return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
            },
          formatDateone() {   //获取当前时间
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
          }

        },
      created() {
          this.formatDateone();
          this.getdata();
      },
      // filters: {
      //   formatDate(time) {
      //     var date = new Date(time);
      //     return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      //   }
      // }
    }
</script>

<style scoped>
#Product_file_registration_review{
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
</style>
