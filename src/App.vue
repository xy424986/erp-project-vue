<template>
  <div id="app">

    <el-container style="height:100%">
      <el-aside width="321px">
        <!--左侧菜单-->
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">Open</el-radio-button>
          <el-radio-button :label="true">Close</el-radio-button>
        </el-radio-group>
        <el-menu default-active="1"
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose"
                 :collapse="isCollapse">
          <el-submenu :index="parentMenu.id+''" v-for="parentMenu in menuTable">
            <template slot="title">
              <i :class="parentMenu.imageUrl"></i>
              <span slot="title">{{parentMenu.name}}</span>
            </template>

            <el-submenu :index="childMenu1.id" v-for="childMenu1 in parentMenu.childMenu">
              <i :class="childMenu1.imageUrl"></i>
              <span slot="title">{{childMenu1.name}}</span>
              <el-menu-item v-if="childMenu2.childMenu.length==0" :index="childMenu2.id+''"
                            v-for="childMenu2 in childMenu1.childMenu"
                            @click="addTab(childMenu2.name,childMenu2.linkUrl)">
                {{childMenu2.name}}
              </el-menu-item>

              <el-submenu v-if="childMenu2.childMenu.length > 0" :index="childMenu2.id"
                          v-for="childMenu2 in childMenu1.childMenu">
                <i :class="childMenu2.imageUrl"></i>
                <span slot="title">{{childMenu2.name}}</span>

                <el-menu-item :index="childMenu3.id+''" @click="addTab(childMenu3.name,childMenu3.linkUrl)"
                              v-for="childMenu3 in childMenu2.childMenu">
                  {{childMenu3.name}}
                </el-menu-item>
              </el-submenu>

            </el-submenu>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="3" disabled>消息中心</el-menu-item>
            <el-menu-item index="4"><a href="" target="_blank">订单管理</a></el-menu-item>
          </el-menu>
        </el-header>
        <el-main>

          <!--          tabs选项卡-->
          <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
            <el-tab-pane
              v-for="(item, index) in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            >
              <component :is="item.content"></component>
            </el-tab-pane>
          </el-tabs>

        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
  //生产登记导入组件close
  import Production_registration from './components/Internal_production_management/Production_registration'
  import Production_registration_review from './components/Internal_production_management/Production_registration_review'
  //生产调度管理导入组建close
  import Make_production_dispatch_list from './components/Production_scheduling_management/Make_production_dispatch_list'
  import Audit_of_production_dispatch_order from './components/Production_scheduling_management/Audit_of_production_dispatch_order'
  //产品档案导入组件close
  import Product_file_change from "./components/product design/Product_file_change";
  import Product_file_delete from "./components/product design/Product_file_delete";
  import Product_file_query from "./components/product design/Product_file_query";
  import Product_file_registration from "./components/product design/Product_file_registration";
  import Product_file_registration_review from "./components/product design/Product_file_registration_review";

  //产品物料设计导入组件close
  import Make_material_composition_design_sheet
    from './components/Product_material_composition_design/Make_material_composition_design_sheet'
  import Review_of_material_composition_design_sheet
    from './components/Product_material_composition_design/Review_of_material_composition_design_sheet'
  import Material_composition_design_sheet_query
    from './components/Product_material_composition_design/Material_composition_design_sheet_query'
  import Change_of_material_composition_design_order
    from './components/Product_material_composition_design/Change_of_material_composition_design_order'

  // 生产管理导入组件start
  import Design_of_single from "./components/production_management/process_design/Design_of_single";
  import Design_bill_review from "./components/production_management/process_design/Design_bill_review";
  import Design_bill_change from "./components/production_management/process_design/Design_bill_change";
  import Design_list_query from "./components/production_management/process_design/Design_list_query";
  import Customize_process_material_design_list from "./components/production_management/the_material_design/Customize_process_material_design_list";
  import Process_material_design_list_inquiry from "./components/production_management/the_material_design/Process_material_design_list_inquiry";
  import Process_material_designList_change from "./components/production_management/the_material_design/Process_material_designList_change";
  import Review_process_material_design_list from "./components/production_management/the_material_design/Review_process_material_design_list";
  // 生产管理导入组件close

  /**
   * 库存
   */
  import CustomizeTheInstallation from "./components/safety_stock/inventory/CustomizeTheInstallation";
  import SafetyStockReview from "./components/safety_stock/inventory/SafetyStockReview";
  import InventoryQuery from "./components/safety_stock/inventory/InventoryQuery";
  import InventoryChanges from "./components/safety_stock/inventory/InventoryChanges";
  import Storage from "./components/safety_stock/warehouse_management/Storage";
  import chouti from "./components/safety_stock/warehouse_management/chouti";
  import OutboundScheduling from "./components/safety_stock/warehouse_management/OutboundScheduling";
  import WarehousingRegistration from "./components/safety_stock/put_in_storage/WarehousingRegistration";
  import WarehouseQueries from "./components/safety_stock/put_in_storage/WarehouseQueries";
  import WarehouseCheck from "./components/safety_stock/put_in_storage/WarehouseCheck";
  import OutboundReview from "./components/safety_stock/outbound_management/OutboundReview";
  import OutboundQuery from "./components/safety_stock/outbound_management/OutboundQuery";
  import OutboundRegistration from "./components/safety_stock/outbound_management/OutboundRegistration";
  import WorkOrderInquiry from "./components/safety_stock/WorkOrderInquiry";
  import ProductionQuery from "./components/safety_stock/ProductionQuery";
  import DynamicInventoryQuery from "./components/safety_stock/InventoryQuery/DynamicInventoryQuery";


  export default {
    name: 'app',
    data() {
      return {
        activeIndex: "1",
        isCollapse: true,
        menuTable: [],
        //  tabs选项卡
        editableTabsValue: '1',
        editableTabs: [{
          title: '首页',
          name: '1',
          content: 'Hello'
        }],
        tabIndex: 1
      }
    },
    methods: {
      //左侧菜单栏数据
      getMenuData() {
        this.$axios.get("queryAllMenus.action").then((response) => {
          this.menuTable = response.data;
        }).catch();
      },

      //tabs选项卡
      addTab(menuName, linkUrl) {

        var tem = this.editableTabs.find(item => {
          return item.title == menuName
        });

        if (tem != undefined) {
          this.editableTabsValue = tem.name;
        } else {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: menuName,
            name: newTabName,
            content: linkUrl
          });
          this.editableTabsValue = newTabName;
        }
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      },

      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    //组件
    components: {
      Design_of_single,
      Design_bill_review,
      Design_bill_change,
      Design_list_query,
      CustomizeTheInstallation,
      SafetyStockReview,
      InventoryQuery,
      InventoryChanges,
      Storage,
      chouti,
      OutboundScheduling,
      WarehousingRegistration,
      Product_file_query,
      Product_file_delete,
      Product_file_change,
      Product_file_registration,
      Product_file_registration_review,
      Make_material_composition_design_sheet,
      Review_of_material_composition_design_sheet,
      Material_composition_design_sheet_query,
      Change_of_material_composition_design_order,
      Customize_process_material_design_list,
      Process_material_design_list_inquiry,
      Process_material_designList_change,
      Review_process_material_design_list,
      WarehouseCheck,
      OutboundQuery,
      OutboundReview,
      OutboundRegistration,
      WorkOrderInquiry,
      ProductionQuery,
      DynamicInventoryQuery,
      Make_production_dispatch_list,
      Audit_of_production_dispatch_order,
      Production_registration,
      Production_registration_review
    },
    // 钩子调用函数
    created() {
      this.getMenuData();
    }
  }
</script>

<style>

  /*  左侧菜单栏样式*/
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    /*width: 123px;*/
    min-height: 400px;
  }

  /*  全局样式*/
  #app {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .el-header, .el-footer {
    /*background-color: #B3C0D1;*/
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    /*background-color: #D3DCE6;*/
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    /*background-color: #E9EEF3;*/
    color: #333;
    text-align: center;
    /*line-height: 160px;*/
    height: 100%;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  /*hhy*/
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
  .div03{
    position: absolute;
    left: 95px;
    background: pink;
  }
  .div04{
    position: absolute;
    left: 1200px;
  }

  /**
  hhy
   */
  a{
    text-decoration: none;
    color: purple;
  }

</style>
