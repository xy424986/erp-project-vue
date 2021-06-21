<template xmlns:el-col="http://www.w3.org/1999/html">
    <div>
      <div id="Product_file_change" v-show="istrue">
        <h3>产品档案变更</h3>
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
          :data="querytruechecktagdata"
          stripe
          border
          style="width: 100%"
        ><a>
          <el-table-column
            prop="productId"
            label="产品编号"
            width="180">
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
            prop="type"
            label="用途类型"
            width="120"
            :formatter="typepanduanlist">
          </el-table-column>
          <el-table-column
            prop="responsiblePerson"
            label="产品经理"
            width="120">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="biangeng(scope.row.id)">档案变更</el-button>
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


        <div v-if="isshow" id="biangeng">
          <el-button @click="zhu">主信息</el-button>
          <el-button @click="fu">辅助信息</el-button>
          <el-button @click="editchangeTag(xiangxidata)">提交</el-button>
          <el-button @click="fanhui">返回</el-button>
          <el-form>
            <div v-show="one">
              <h3>主信息</h3>
              <el-row>

                <el-col :span="12">
                  <el-form-item label="档案编号:">
                    <label>{{xiangxidata.productId}}</label>
                  </el-form-item>
                </el-col>


                <el-col :span="12">
                  <el-form-item label="I级分类:">
                    <label>{{xiangxidata.firstKindName}}</label>
                  </el-form-item>
                </el-col>
                <hr>

                <el-col :span="12">
                  <el-form-item label="II级分类:">
                    <label>{{xiangxidata.secondKindName}}</label>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="III级分类:">
                    <label>{{xiangxidata.thirdKindName}}</label>
                  </el-form-item>
                </el-col>
                <hr>
                <el-col :span="12">
                  <el-form-item label="制造商:">
                    <el-input type="text" style="width: 250px;" v-model="xiangxidata.factoryName"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="产品名称:">
                    <el-input type="text" style="width: 250px;" v-model="xiangxidata.productName"></el-input>
                  </el-form-item>
                </el-col>
                <hr>
                <el-col :span="12">
                  <el-form-item label="档次级别:">
                    <el-col :span="20">
                      <el-select style="width: 250px" v-model="xiangxidata.productClass">
                        <el-option value="D001-1" label="高档">高档</el-option>
                        <el-option value="D001-2" label="中档">中档</el-option>
                        <el-option value="D001-3" label="低档">低档</el-option>
                      </el-select>
                    </el-col>
                  </el-form-item>
                </el-col>


                <el-col :span="12">
                  <el-form-item label="用途类型:">
                    <el-select style="width: 250px" v-model="xiangxidata.type">
                      <el-option value="Y001-1" label="商品">商品</el-option>
                      <el-option value="Y001-2" label="物料">物料</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <hr>
                <el-col :span="12">
                  <el-form-item label="产品简称:">
                    <el-col :span="20">
                      <el-input type="text" style="width: 250px;" v-model="xiangxidata.productNick"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="计量单位:">
                    <el-input type="text" style="width: 250px;" v-model="xiangxidata.personalUnit"></el-input>
                  </el-form-item>
                </el-col>
                <hr>

                <el-col :span="12">
                  <el-form-item label="计量值:">
                    <el-input type="text" style="width: 250px;" v-model="xiangxidata.personalValue"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="市场单价(元):">
                <el-col :span="19">
                    <el-input type="text" style="width: 250px;" v-model="xiangxidata.listPrice"></el-input>
                </el-col>
                  </el-form-item>
                </el-col>
                <hr>
                <el-col :span="12">
                  <el-form-item label="计划成本单价:">
                    <el-col :span="18">
                    <el-input type="text" style="width: 250px;" v-model="xiangxidata.costPrice"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="成本单价:">
                    <el-input type="text" style="width: 250px;" v-model="xiangxidata.realCostPrice"></el-input>
                  </el-form-item>
                </el-col>
                <hr>

              </el-row>
            </div>

            <div v-if="two">
              <h3>辅助信息</h3>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="保修期:">
                      <el-col :span="18">
                    <el-input type="text" style="width: 250px;" v-model="xiangxidata.warranty"></el-input>
                      </el-col>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="替代品名称:">
                    <el-col :span="18">
                    <el-input type="text" style="width: 250px;" v-model="xiangxidata.twinName"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
                <hr>
                <el-col :span="12">
                  <el-form-item label="替代品编号:">
                    <el-col :span="16">
                    <el-input type="text" style="width: 248px;" v-model="xiangxidata.twinId"></el-input>
                  </el-col>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="生命周期(年):">
                    <el-col :span="17">
                    <el-input type="text" style="width: 250px;" v-model="xiangxidata.lifecycle"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
                <hr>
                <el-col :span="12">
                  <el-form-item label="单位:">
                    <el-col :span="19">
                    <el-input type="text" style="width: 250px;" v-model="xiangxidata.amountUnit"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="产品经理:">
                    <el-col :span="19">
                    <el-input type="text" style="width: 250px;" v-model="xiangxidata.responsiblePerson"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>

                <hr>
                <el-col :span="12">
                  <el-form-item label="供应商集合:">
                    <el-col :span="15">
                    <el-input type="textarea" resize="none" style="width: 250px;" v-model="xiangxidata.providerGroup"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="产品描述:">
                    <el-col :span="19">
                    <el-input type="textarea" resize="none" style="width: 250px;" v-model="xiangxidata.productDescribe"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
                <hr>
                <el-col :span="12">
                  <el-form-item label="最近变更时间:">
                    <el-col :span="18">
                    <label>{{xiangxidata.changeTime}}</label>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="档案变更累计:">
                    <label>{{xiangxidata.fileChangeAmount}}</label>
                  </el-form-item>
                </el-col>
                <hr>
                <el-col :span="12">
                  <el-form-item label="建档时间:">
                    <label>{{xiangxidata.registerTime}}</label>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="登记人:">
                    <label>{{xiangxidata.register}}</label>
                  </el-form-item>
                </el-col>
                <hr>
                <el-col :span="12">
                  <el-form-item label="复核时间:">
                    <label>{{xiangxidata.checkTime}}</label>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="复核人:">
                    <label>{{xiangxidata.checker}}</label>
                  </el-form-item>
                </el-col>
                <hr>

              </el-row>
            </div>
          </el-form>
        </div>
      </div>
</template>

<script>
    import {formatDate} from "./date";

    export default {
        name: "Product_file_change",
      data(){
        return{
          pageno:1,
          pagesize:5,
          total:0,
          querytruechecktagdata:[],
          xiangxidata:[],
          istrue:true,
          isshow:false,
          one:true,
          two:false,
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
          changer:sessionStorage.getItem("loginId"),//变更人
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
          params.append("type", this.type);
          console.log(this.productClass)
          this.$axios.post("DFile/queryTrueCheckTag.action", params).then(function (response) {

            _this.querytruechecktagdata = response.data.records;
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
        typepanduanlist(row){  //判断为商品还是物料
          if(row.type=="Y001-1"){
            return "商品";
          }else if(row.type=="Y001-2"){
            return "物料";
          }
        },
        selcp(){  //根据条件查询
          this.getdata();
        },
        fanhui(){  //返回表格页面
          this.istrue=true;
          this.isshow=false;
        },
        zhu(){//显示主信息
          this.one=true;
          this.two=false;
        },
        fu(){   //显示辅助信息
          this.one=false;
          this.two=true;
        },
        biangeng(id){   //进入详细界面
          this.istrue=false;
          this.isshow=true;
          var _this = this;
          var params = new URLSearchParams();
          params.append("id",id);
          this.$axios.post("DFile/queryTrueCheckTagXiangXi.action", params).then(function (response) {
            console.log(response.data)
            response.data.registerTime=_this.formatDate(response.data.registerTime);
            response.data.checkTime=_this.formatDate(response.data.checkTime);
            _this.xiangxidata = response.data;

            if(response.data.fileChangeAmount==null||response.data.fileChangeAmount==""){
              response.data.fileChangeAmount=0;
            }
            if(response.data.realCostPrice==null||response.data.realCostPrice==""){
              response.data.realCostPrice=0.0;
            }
            if(response.data.changeTime==null||response.data.changeTime==""){
              response.data.changeTime="没有变更";
            }else {
              response.data.changeTime=_this.formatDate(response.data.changeTime);
            }
          }).catch();
        },
        formatDate(time) {  //时间转化
          var date = new Date(time);
          return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        },
        panduanone(type){   //判断
          if(type=="Y001-1"){
            return "商品";
          }else if(type=="Y001-2"){
            return "物料";
          }
        },
        panduanonetwo(dangci){  //判断
          if(dangci=="D001-1"){
            return "高档";
          }else if(dangci=="D001-2"){
            return "中档";
          }else if(dangci=="D001-3"){
            return "低档";
          }
        },
        editchangeTag(xiangxidata){ //产品档案变更状态
          var _this=this;
          this.formatDatetwo();
          var params = new URLSearchParams();


          for(var i=0;i<3;i++){
            xiangxidata.checkTime=xiangxidata.checkTime.replace("-","/");
            xiangxidata.registerTime=xiangxidata.registerTime.replace("-","/");
          }


          params.append("id",xiangxidata.id);
          params.append("checker",xiangxidata.checker);//复核人
          params.append("checkTime",xiangxidata.checkTime);//复核时间
          params.append("changeTime",this.changeTime);//变更时间
          params.append("changer",this.changer);//变更时间
          params.append("fileChangeAmount",xiangxidata.fileChangeAmount);//档案变更累计
          params.append("realCostPrice",xiangxidata.realCostPrice);//成本单价
          params.append("productId",xiangxidata.productId);//产品编号
          params.append("productName",xiangxidata.productName);//产品名称
          params.append("factoryName",xiangxidata.factoryName);//制造商
          params.append("personalUnit",xiangxidata.personalUnit);//计量单位
          params.append("personalValue",xiangxidata.personalValue);//计量值
          params.append("listPrice",xiangxidata.listPrice);//市场单价
          params.append("costPrice",xiangxidata.costPrice);//计划成本单价

          params.append("firstKindId",this.firstKindId);//产品I级分类编号
          params.append("firstKindName",this.firstKindName);//产品I级分类名称
          params.append("secondKindId",this.secondKindId);//产品II级分类编号
          params.append("secondKindName",this.secondKindName);//产品II级分类名称
          params.append("thirdKindId",this.thirdKindId);//产品III级分类编号
          params.append("thirdKindName",this.thirdKindName);//产品III级分类名称

          params.append("productNick",xiangxidata.productNick);//产品简称
          params.append("type",xiangxidata.type);//用途类型,Y001-1: 商品, Y001-2: 物料
          console.log(xiangxidata.type)
          console.log(xiangxidata.productClass)
          params.append("productClass",xiangxidata.productClass);//档次级别,D001-1: 高档,D001-2: 中档,D001-3: 低档
          params.append("providerGroup",xiangxidata.providerGroup);//供应商集合
          params.append("warranty",xiangxidata.warranty);//保修期
          params.append("twinName",xiangxidata.twinName);//替代品名称

          params.append("twinId",xiangxidata.twinId);//替代品编号
          params.append("amountUnit",xiangxidata.amountUnit);//单位
          params.append("productDescribe",xiangxidata.productDescribe);//产品描述
          params.append("responsiblePerson",xiangxidata.responsiblePerson);//产品经理
          params.append("register",xiangxidata.register);//登记人
          params.append("registerTime",xiangxidata.registerTime);//建档时间
          params.append("lifecycle",xiangxidata.lifecycle);//生命周期
          this.$axios.post("DFile/editchangeTag.action", params).then(function (response) {
            if (response.data == true) {
              _this.$notify({
                title: '成功',
                message: '更改成功,请重新审核',
                type: 'success'
              });
              _this.istrue=true;
              _this.isshow=false;
              _this.getdata();
            } else {
              _this.$notify({
                title: '成功',
                message: '更改失败',
                type: 'danger'
              });
              _this.istrue=true;
              _this.isshow=false;
              _this.getdata();
            }
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
          this.changeTime = year+"/"+month+"/"+day+"  "+hour+":"+minute+":"+second;
        }
      },
      created() {
          this.getdata();
      }
    }
</script>

<style scoped>
  #Product_file_change{
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
  #biangeng{
    font-weight: bold;
    margin:0 auto;
    width: 1120px;
    height: 600px;
    text-align: center;
    color: #2c3e50;
    margin-top: 30px;
    border-radius: 1px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
</style>
