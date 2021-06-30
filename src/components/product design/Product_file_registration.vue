<template>
  <div id="Product_file_registration">
    <h3>产品档案登记</h3>
    <div>
      <el-row>
        <el-col :span="24">
        <div style="background-color: dodgerblue" borde>主信息</div>
        </el-col>
          <el-form ref="sklform">
        <el-col :span="12">
      <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        产品名称:
        <input type="text" style="width: 193px"  v-model="productName"></input>
      </label>
        </el-col>
        <el-col :span="12">
        <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          制造商:
          <input type="text" style="width: 216px"  v-model="factoryName"></input>
        </label>
        </el-col>
        <el-col :span="12">
          <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            I级分类:
            <select style="width: 210px">
                <option></option>
                <option>01/电子</option>
            </select>
          </label>
        </el-col>
        <el-col :span="12">
          <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            II级分类:
            <select style="width: 212px">
              <option></option>
              <option>01/计算机</option>
            </select>
          </label>
        </el-col>
        <el-col :span="12">
          <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            III级分类:
            <select style="width: 200px">
              <option></option>
              <option>01/服务器</option>
            </select>
          </label>
        </el-col>
        <el-col :span="12">
          <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            产品简介:
            <input type="text" style="width: 200px" v-model="productNick"></input>
          </label>
        </el-col>
        <el-col :span="12">
          <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            用途类型:
            <select style="width: 198px" v-model="type">
              <option></option>
              <option value="Y001-1">商品</option>
              <option value="Y001-2">物料</option>
            </select>
          </label>
        </el-col>
        <el-col :span="12">
          <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           档次级别:
            <select style="width: 205px" v-model="productClass">
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
            <input type="text" style="width: 195px" v-model="personalUnit"></input>
          </label>
        </el-col>
        <el-col :span="12">
          <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            计量值:
            <input type="text" style="width: 217px" v-model="personalValue"></input>
          </label>
        </el-col>
        <el-col :span="12">
          <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            市场单价(元):
            <input type="text" v-model="listPrice"></input>
          </label>
        </el-col>
        <el-col :span="12">
          <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            计划成本单价:
            <input type="text" v-model="costPrice"></input>
          </label>
        </el-col>
        <el-col :span="24">
      <div style="background-color:#2c3e50" borde>辅助信息</div>
        </el-col>
            <el-col :span="12">
            <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              保修期:
              <input type="text" style="width: 212px"  v-model="warranty"></input>
            </label>
            </el-col>
          <el-col :span="12">
            <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              替代品名称:
              <input type="text"style="width: 185px"  v-model="twinName"></input>
            </label>
          </el-col>
          <el-col :span="12">
            <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              替代品编号:
              <input type="text" style="width: 180px"  v-model="twinId"></input>
            </label>
          </el-col>
          <el-col :span="12">
            <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              生命周期(年):
              <input type="text" style="width: 175px"  v-model="lifecycle"></input>
            </label>
          </el-col>
          <el-col :span="12">
            <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              单位:
              <input type="text" style="width: 228px"  v-model="amountUnit"></input>
            </label>
          </el-col>
          <el-col :span="12">
            <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              产品经理:
              <input type="text" style="width: 202px"  v-model="responsiblePerson"></input>
            </label>
          </el-col>
          <el-col :span="12" >
            <label class="p1" style="background-color:lightsteelblue;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              供应商集合:</label><br>
              <input type="textarea"  style="width: 78%;height: 70px" v-model="providerGroup"></input>

          </el-col>
          <el-col :span="12" >
            <label class="p1" style="background-color:lightsteelblue;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              产品描述:</label><br>
              <input type="textarea"  style="width: 78%;height: 70px;" v-model="productDescribe"></input>

          </el-col>
          <el-col :span="12">
            <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              登记人:
              <input type="text" style="width: 214px"  v-model="register" readonly="readonly"></input>
            </label>
          </el-col>
          <el-col :span="12">
            <label style="background-color:lightsteelblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              建档时间:
              <input type="text" readonly="readonly" style="width: 203px"  v-model="registerTime"></input>
            </label>
          </el-col>
          <el-button @click="addfile">提交</el-button>
          <button type="reset">重置</button>
        </el-form>
      </el-row>

    </div>
  </div>

</template>

<script>
    export default {
        name: "Product_file_registration",
      data () {
        return {
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
           register:sessionStorage.getItem("loginId"),//登记人
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
        resetLoginForm () {
          this.$refs.sklform.resetFields()
        },
        addfile () {  //登记的方法
          var _this=this;
          var params=new URLSearchParams();
          params.append("productName",this.productName);//产品名称
          params.append("factoryName",this.factoryName);//制造商
          params.append("personalUnit",this.personalUnit);//计量单位
          params.append("personalValue",this.personalValue);//计量值
          params.append("listPrice",this.listPrice);//市场单价
          params.append("costPrice",this.costPrice);//计划成本单价

          params.append("firstKindId",this.firstKindId);//产品I级分类编号
          params.append("firstKindName",this.firstKindName);//产品I级分类名称
          params.append("secondKindId",this.secondKindId);//产品II级分类编号
          params.append("secondKindName",this.secondKindName);//产品II级分类名称
          params.append("thirdKindId",this.thirdKindId);//产品III级分类编号
          params.append("thirdKindName",this.thirdKindName);//产品III级分类名称

          params.append("productNick",this.productNick);//产品简称
          params.append("type",this.type);//用途类型,Y001-1: 商品, Y001-2: 物料
          params.append("productClass",this.productClass);//档次级别,D001-1: 高档,D001-2: 中档,D001-3: 低档
          params.append("providerGroup",this.providerGroup);//供应商集合
          params.append("warranty",this.warranty);//保修期
          params.append("twinName",this.twinName);//替代品名称

          params.append("twinId",this.twinId);//替代品编号
          params.append("amountUnit",this.amountUnit);//单位
          params.append("productDescribe",this.productDescribe);//产品描述
          params.append("responsiblePerson",this.responsiblePerson);//产品经理
          params.append("register",this.register);//登记人
          params.append("registerTime",this.registerTime);//建档时间
          params.append("lifecycle",this.lifecycle);//生命周期
          this.$axios.post("DFile/addProductFile.action",params).then(function (response) {
            console.log(response.data)
            if (response.data==true){
              _this.$notify({
                title: '成功',
                message: '提交成功',
                type: 'success'
              })
            }else {
              _this.$notify({
                title: '成功',
                message: '提交失败',
                type: 'warning'
              })
            }
          }).catch()
        },

        formatDate() {   //获取当前时间
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
        }
      },
      created() {
        this.formatDate();
      }

    }
</script>

<style scoped>
/*#Product_file_registration{*/
/*  font-weight: bold;*/
/*  margin:0 auto;*/
/*  width: 1200px;*/
/*  height: 600px;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*  border-radius: 1px;*/
/*  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/
/*}*/

</style>
