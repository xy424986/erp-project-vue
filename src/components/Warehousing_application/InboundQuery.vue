<template>
  <div>
    <div id="WAudit"  v-show="istrue">
      <el-form size="small" inline="true">
          <el-row>
            <el-col span="24"><h6>入库申请单查询</h6></el-col>
          </el-row>
        <!--表格-->
        <el-row>
          <el-col span="24">
              <el-table
                :data="warehousingaudit"
                height="250"
                border
                style="width: 100%"
              >
                <el-table-column
                  prop="gatherId"
                  label="入库编号"
                  show-overflow-tooltip>
                  <template scope="scope">
                    <span v-text="scope.row.gatherId" @click="change(scope.row.gatherId)"></span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="reason"
                  label="入库理由"
                  show-overflow-tooltip>
                  <template scope="scope">
                    <span v-if="scope.row.reason === 'R001-1'">生产入库</span>
                    <span v-else-if="scope.row.reason === 'R001-2'">库存初始</span>
                    <span v-else-if="scope.row.reason === 'R001-3'">赠送</span>
                    <span v-else-if="scope.row.reason === 'R001-4'">内部归还</span>
                    <span v-else-if="scope.row.reason === 'R001-5'">其他归还</span>
                  </template>
                </el-table-column>
                  <el-table-column
                    prop="checkTime"
                    label="完成时间"
                    show-overflow-tooltip>
                  </el-table-column>
                    <el-table-column
                      prop="amount"
                      label="入库数量"
                      show-overflow-tooltip>
                    </el-table-column>
                      <el-table-column
                        prop="checkTag"
                        label="入库状态"
                        show-overflow-tooltip>
                        <template scope="scope">
                          <span v-if="scope.row.checkTag === 'S001-0'">等待中</span>
                          <span v-else-if="scope.row.checkTag === 'S001-1'">完成</span>
                          <span v-else-if="scope.row.checkTag === 'S001-2'">未完成</span>
                        </template>
                </el-table-column>
              </el-table>
          </el-col>
        </el-row>
      </el-form>
    </div>
  <div id="WAudit2" v-show="isshow">
    <el-form size="small" :inline="true">
      <el-row>
        <el-col :span="2" ><el-button @click="change2" type="primary" plain icon="el-icon-arrow-left"></el-button></el-col>
        <el-col :span="22"><h4>审核入库申请单</h4></el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="2">
          <el-form-item label="入库人:"  >
            <div class="inline "><el-input v-model="warehouse.storer" type="text" :clearable="true"/></div>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          入库理由:
          <div class="inline">
            <span v-if="warehouse.reason === 'R001-1'">生产入库</span>
            <span v-else-if="warehouse.reason === 'R001-2'">库存初始</span>
            <span v-else-if="warehouse.reason === 'R001-3'">赠送</span>
            <span v-else-if="warehouse.reason === 'R001-4'">内部归还</span>
            <span v-else-if="warehouse.reason === 'R001-5'">其他归还</span>
          </div>
        </el-col>
      </el-row>
      <!--表格-->
      <el-row>
        <el-col :span="2"><div></div></el-col>
        <el-col :span="20" :offset="2">
          <div>
            <el-table
              ref="multipleTable"
              :data="tableData"
              height="250"
              tooltip-effect="dark">
              <el-table-column
                type="selection"
                width="30">
              </el-table-column>
              <el-table-column
                fixed
                prop="productName"
                label="产品名称"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="productId"
                label="产品编号"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="productDescribe"
                label="描述"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="amount"
                label="数量"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="amountUnit"
                label="单位"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="costPrice"
                label="成本单价"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="subtotal"
                label="小计"
                show-overflow-tooltip>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <!--计算总金额总数量-->
      <el-row>
        <el-col :span="12" :push="1" >
          <el-form-item label="总数量：" >
            <el-input type="text" v-model="amountSum" readonly="readonly"/>
          </el-form-item>
        </el-col>
        <el-col :span="12" :push="1">
          <el-form-item label="总金额" >
            <el-input type="text" v-model="costPriceSum" readonly="readonly"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :push="2">
          <el-form-item label="审核人:">
            <div class="inline "><el-input type="text" v-model="register" :clearable="true"/></div>
          </el-form-item>
        </el-col>
        <el-col :span="12" :pull="1">
          <el-form-item label="审核时间:">
            <span>{{registerTime}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" >
          <el-form-item label="备注:" >
            <el-input type="textarea" :rows="4" style="width: 800px;" resize="none"   placeholder="请输入内容" v-model="warehouse.remark">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
  </div>
</template>

<script>
    export default {
        name: "InboundQuery",
      data(){
        return{
          storer:'',//入库人
          register: sessionStorage.getItem("loginId"),//登记人
          registerTime:'',//登记时间
          amountSum:'0',//总数量
          costPriceSum:'0',//总金额
          reason:"",//入库理由
          productName:'',//产品名称
          productId:'',//产品编号
          productDescribe:'',//描述
          amount:'',//数量
          amountUnit:'',//单位
          costPrice:'',//成本单价
          subtotal:'',//小计
          remark:'',//备注
          tableData:[],
          warehousingaudit:[],
          istrue:true,
          isshow:false,
          warehouse:{},
          warehouseId:"",
        }
      },
      methods: {
        getdata1() {   //制作安全库配置单1获取数据
          var _this = this;
          var params = new URLSearchParams();
          params.append("pageno", this.pageno);
          params.append("pagesize", this.pagesize);
          this.$axios.post("SGathers/queryRuKuAllSGather.May", params).then(function (response) {
            _this.warehousingaudit = response.data.records;
            _this.total = response.data.total;
            for (var i=0;i<_this.warehousingaudit.length;i++){console.log("warehousingaudit"+_this.warehousingaudit)}
          }).catch();
        },
        //根据入库申请编号查询
        change(gatherId) {
          var _this= this;
          var params = new URLSearchParams();
          params.append("gatherId",gatherId);
          this.$axios.post("SGathers/queryByGatherIdSGather.May",params).then(function (response) {
            _this.warehouse=response.data;
            _this.queryByParentId(_this.warehouse.id);
            _this.warehouseId=_this.warehouse.id;
            _this.istrue = false;
            _this.isshow = true;
            _this.addDate();
          }).catch();
        },
        queryByParentId(productId){
          var _this=this;
          var params = new URLSearchParams();
          params.append("parentId",productId);
          console.log(productId)
          this.$axios.post("SGatherDetails/queryByParentIdSGatherEx.May",params).then(function (response) {
            _this.tableData=response.data;
            for (var i =0;i<_this.tableData.length;i++){
              _this.amountSum+=parseInt(_this.tableData[i].amount);
              _this.costPriceSum+=parseInt(_this.tableData[i].subtotal);
              _this.amountSum=parseInt(_this.amountSum);
              _this.costPriceSum=parseInt(_this.costPriceSum);
              console.log("queryByParentId"+_this.tableData);
            }
          })
        },
        change2() {
          this.istrue = true;
          this.isshow = false;
        },
        //申请数据
        getdata(){
          var _this=this;
          var params = new URLSearchParams();
          params.append("pageno" ,this.pageno)
          params.append("pagesize",this.pagesize)
          this.$axios.post("SGathers/queryAllSGather.May",params).then(function (response) {
            _this.tableData=response.data.records;
            _this.total=response.data.total;
            for(var i = 0;i<_this.tableData.length;i++){
              console.log("getdata"+_this.tableData)
            }
          }).catch();
        },
        //获取当前年月日
        addDate() {
          let date = new Date();
          let Y = date.getFullYear();
          let M = this.getStr(date.getMonth() + 1);
          let D = this.getStr(date.getDate());
          let hours = date.getHours();
          let minutes = this.getStr(date.getMinutes());
          let seconds = this.getStr(date.getSeconds());
          this.registerTime = Y + "/" + M + "/" + D + " " + hours + ":" + minutes + ":" + seconds;
          console.log(this.registerTime)
        },
        getStr(point) {
          return ("00" + point).slice(-2); // 从字符串的倒数第二个字符开始截取，一直截取到最后一个字符；（在这里永远截取该字符串的最后两个字符）
        }
      },
      created() {
        this.getdata1();
      }
    }
</script>

<style scoped>
  #inquery {
    font-weight: bold;
    margin: 0 auto;
    width: 80%;
    height: 700px;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    border-radius: 1px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .inline{/*转换行内元素*/
    display: inline-block;
  }
  .div01{/*div下边框*/
    border-bottom:1px solid black;
    width: 330px;
    text-align:left;
  }

  .drop-downBox{
    width: 333px;
  }
  .el-input__inner{
    border: none;
  }
</style>
