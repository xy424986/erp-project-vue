<template>
  <div id="app">


    <div class="row">
      <div style="text-align: center;">
        <h3>登录</h3>
      </div>
    </div>

    <hr noshade=true style="margin-top:-1px;height: 1px;width: 320px;"/>

      <el-form>
        账号<input type="text" placeholder="请输入账号"  v-model="loginId"></input><br>
        密码<input type="password" placeholder="请输入密码" v-model="password"></input>
      </el-form>

      <br>
      <el-button type="success" @click="login">登录</el-button>
  </div>
</template>

<script>
  // import App from 'src/App.vue'
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
            alert("登录成功");
            _this.$router.push({path:'/App'});
            sessionStorage.setItem("loginId",_this.loginId);
          }else {
            alert("登录失败")
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
