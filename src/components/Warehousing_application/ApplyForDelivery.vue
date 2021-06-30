<template>
  <div id="app22">
    <el-form size="small" :inline="true">
      <el-row>
        <el-col :span="24"><h5>入库申请单</h5></el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="1">
          <el-form-item label="入库人:"  >
           <div class="inline div01"><el-input v-model="storer" type="text" :clearable="true"/></div>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="1">
          <div class="inline">
            <el-form-item label="入库理由">
              <el-select   v-model="reason" class="drop-downBox ">
                <el-option
                  v-for="item in reasons"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <!--表格-->
      <el-row>
        <el-col :span='2'><div></div></el-col>
        <el-col :span="20" :offset="2">
          <div>
            <el-table
              ref="multipleTable"
              :data="tableData"
              height="250"
              tooltip-effect="dark"
              @selection-change="handleSelectionChange">
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
              <el-table-column
              fixed="right"
              label="操作"
              show-overflow-tooltip
              >
               <template slot-scope="scope">
                 <el-button
                 @click.native.prevent="del(scope.$index,tableData)"
                 type="text"
                 size="small">
                   移除
                 </el-button>
               </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <!--添加 删除 -->
      <el-row>
        <el-col :span="24">
          <!--添加-->
          <el-button  icon="el-icon-plus" @click="add1"></el-button>
          <el-drawer
            title="添加入库产品"
            :before-close="Bfclose"
            :visible.sync="table"
            direction="rtl"
            size="70%">
            <el-table :data="adddata">
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
              <el-table-column
                label="操作"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-popconfirm
                    title="确定出库吗？"
                    @confirm="addWarehouse(scope.row.productId)">
                    <el-button @click="id=scope.row.productId" slot="reference" size="samll">出库</el-button>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </el-drawer>
        </el-col>
      </el-row>
      <!--计算总金额总数量-->
      <el-row>
        <el-col :span="8" :push="1" >
          <el-form-item label="总数量：" v-model="amountSum">
            <div class="inline"> <span>{{shuliang}}</span> </div>
          </el-form-item>
        </el-col>
        <el-col :span="10" :push="1">
          <el-form-item label="总金额" >
            <div class="inline"> <span>{{jine}}</span> </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11" :push="2">
          <el-form-item label="登记人:">
            <div class="inline div01"><el-input type="text" v-model="register" :clearable="true"/></div>
          </el-form-item>
        </el-col>
        <el-col :span="10" :pull="1">
          <el-form-item label="登记时间:">
            <div class="inline"><el-input type="text" readonly="readonly" v-model="registerTime"/></div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" >
          <el-form-item label="备注:" >
            <el-input type="textarea" :rows="4" style="width: 800px;" resize="none"   placeholder="请输入内容" v-model="remark">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--提交-->
      <el-row>
        <el-col :span="24">
          <el-button
            type="submit"
            plain
            @click="addDelivery">
            提交申请
            <i class="el-icon-upload el-icon--right"></i></el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
    export default {
      name: "ApplyForDelivery.vue",
      data(){
        return {
          storer:'',//入库人
          register: sessionStorage.getItem("loginId"),//登记人
          registerTime:'',//登记时间
          amountSum:'',//总数量
          costPriceSum:'',//总金额
          table :false,
          reason:"",//是否入库
          productName:'',//产品名称
          productId:'',//产品编号
          productDescribe:'',//描述
          amount:'',//数量
          amountUnit:'',//单位
          costPrice:'',//成本单价
          subtotal:'',//小计
          remark:'',//备注
          shuliang:0,//总数量
          jine:0,//总金额
          reasons: [{
            value: 'R001-1',
            label: '生产入库',
          }, {
            value: 'R001-2',
            label: '库存初始',
          },{
            value: 'R001-3',
            label: '赠送',
          },{
            value: 'R001-4',
            label: '内部归还',
          },{
            value: 'R001-5',
            label: '其他归还',
          }],

          tableData:[],
          adddata:[{
            productId:'',//产品编号
            productName:'',//产品名称
            productDescribe:'',//描述
            amount:'',//数量
            amountUnit:'',//单位
            costPrice:'',//成本单价
            subtotal:''//小计
          }],
          multipleSelection: []
        }
      },
      methods:{
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        //提交
        addDelivery(){
          var _this=this;
          let newArr1 = [];
          var arr = this.tableData;
          arr.map((item, index)=> {
            newArr1.push(
              Object.assign({}, item, {
                "storer":_this.storer,//入库人
                "register":_this.register,//登记人
                "registerTime":_this.registerTime,//登记时间
                "amountSum":_this.shuliang,//总数量
                "costPriceSum":_this.jine,//总金额
                "time":_this.time,//
                "table":_this.table,//
                "reason":_this.reason,//入库理由
                "productName":item.productName,//产品名称
                "productId":item.productId,//产品编号
                "productDescribe":item.productDescribe,//
                "amount":item.amount,//数量
                "amountUnit":item.amountUnit,//单位
                "costPrice":item.costPrice,//金额
                "subtotal":item.subtotal,//小计
                "remark":_this.remark//备注
                }
              )
            )
          });
          this.$axios.post("SGathers/addApplyForDelivery.May",JSON.stringify(newArr1),{headers:{"Content-Type":"application/json"}}).then(function(response){
            console.log(response.data)
            if(response.data==true){
              alert("提交成功")
            }else{
              alert("提交失败")
            }
          }).catch()
        },
        Bfclose(done){
          this.$confirm('确定关闭吗')
            .then(_=>{
              done();
            })
            .catch(_=>{
              for ( i=0;i<this.tableData.length;i++){
                this.shuliang+=this.tableData[i].amount;
                this.jine+=this.tableData[i].subtotal;
              }
            });
        },
        del(index,rows){
          rows.splice(index,1)
          for (var i=0;i<this.tableData.length;i++){
            this.shuliang-=this.tableData[i].amount;
            this.jine-=this.tableData[i].subtotal;
          }
        },
        //获取数据
        add1(){
          var _this=this;
          var params = new URLSearchParams();
          this.$axios.post("/SGatherDetails/queryAll.May",params).then(function (response) {
            _this.adddata=response.data;
            _this.table=true;
          })
        },
        addWarehouse(id){
          var i = 0;
          for(i=0;i<this.adddata.length;i++)
            if (this.adddata[i].productId==id){
            this.tableData.push(this.adddata[i]);
          }

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
        this.addDate();
      }
    }
</script>

<style scoped>
  #app22{
    font-weight: bold;
    margin: 0 auto;
    width: 80%;
    height: 700px;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    border-radius: 1px ;
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
