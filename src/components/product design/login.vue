<template class="tem">
  <div id="app">
<!--    <div class="row">-->
<!--      <div style="text-align: center;">-->
<!--        <h3>登录</h3>-->
<!--      </div>-->
<!--    </div>-->
<!--    <hr noshade=true style="margin-top:-1px;height: 1px;width: 320px;"/>-->
<!--      <el-form>-->
<!--        账号<input type="text" placeholder="请输入账号"  v-model="loginId"></input><br>-->
<!--        密码<input type="password" placeholder="请输入密码" v-model="password"></input>-->
<!--      </el-form>-->
<!--      <br>-->
<!--      <el-button type="success" @click="login">登录</el-button>-->
    <form method="post" action="" id="form1">
      <div class="login">
        <h2>登录管理后台</h2>
        <div class="form">
          <div class="check_msg"></div>
          <div class="login_name">
            <input  id="login_name" value="" name="login_name" v-model="loginId" type="text" class="form_input" placeholder="请输入用户名" />
          </div>
          <div class="login_pwd">
            <input  id="login_pwd" name="login_pwd" type="password" v-model="password" class="form_input" placeholder="请输入密码" />
          </div>
          <div class="login_help">
            <label>
              <input name="login_remember" type="checkbox" />
              记住帐号</label><span><a href="#"> 忘记密码？</a></span>
          </div>
          <el-button name="btn_Login" type="success" id="btn_Login" class="btn_Login" @click="login">登录</el-button>
<!--          <input name="btn_Login" type="button"  @click="login" id="btn_Login" class="btn_Login" value="登 录" />-->

        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import css from './dmaku.css'
export default {
  name: 'app',
  data () {
    return {
      loginId:"",
      password:""
    }
  },
  methods:{
    //登录
      login(){
       var _this=this;
       var params=new URLSearchParams();
       params.append("loginId",this.loginId);
        params.append("password",this.password);
        this.$axios.post("login.action",params).then( (response)=> {
          console.log(response.data)
          if (response.data==true){
            _this.$notify({
              title: '成功',
              message: '登录成功',
              type: 'success'
            })
            _this.$router.push({path:'/App'});
            sessionStorage.setItem("loginId",_this.loginId);
          }else {
            _this.$notify({
              title: '成功',
              message: '登录失败',
              type: 'warning'
            })
          }
        }).catch()
      }
  },
  // comments:{
  //   App
  // }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

</style>
