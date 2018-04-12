<!--CRUD父组件  模板-->

<style lang="less">
    @import '../../style/common.less';
    @import '../../style/table.less';
</style>

<!--组件模板-->
<template>
  <div>
      <!--行-->
      <Row>
          <!--行内的列,该列跨度是12-->
        <Col >
                <!--表格高190px 
                  -->
                <div class="edittable-table-height-con">
                    <edit-table 
                        refName = "crudTable" 
                        v-model="tableDataList" 
                        @on-batch-delete="handleBatchDel"
                        @on-change="handleChange"
                        @on-delete="handleDel"
                        :editIncell="true"
                        :all-select-urls="crud_selectUrls"
                        :columns-list="tableColumsList">  <!--传参数-->
                                                                  
                        <!--插槽，插入需要的Dom-->
                        <span slot="search-slot">
                            <Input v-model="searchByName" @on-change="handleSearch" icon="search" placeholder="姓名..." style="width:200px"/>
                            <year-picker></year-picker>
                            <cascader></cascader><cascader style="margin-left:4px"></cascader>
                        </span>
                    </edit-table>
                </div>
        </Col>
    </Row>

  </div>
</template>



<script>
//引入js文件
import tableAxios from '../table-components/table-baseUtil/tableAxios';
//引入单文件组件
import editTable from '../table-components/EditTable.vue';
import yearPicker from '../table-components/base-components/yearPicker';
import cascader from '../table-components/base-components/cascader.vue';
import tableData from './crudCellTitle';
import tableSelect from '../table-components/base-components/tableSelect.vue';


export default {
    name: 'table-demo',
    components: { //注册组件
        editTable,
        yearPicker,
        cascader,
        tableSelect
    },
    data () {
        return {
            searchByName: '',//搜索data
            tableColumsList: [],//表格列
            tableDataList: [],  //表格具体数据
            initTableData: [], //初始化数据      
            crud_selectUrls: {}, //下拉框URL
        };
    },
    methods: {
        //初始化数据
        init () {
            this.tableColumsList = tableData.editInlineAndCellColumn; //表格表头
            tableAxios.axiosGet('/getAllTeacher', this); //获取--后台
            this.crud_selectUrls = {     //这个表格上涉及到的所有下拉框的url地址
                'school' : '/getAllSchool',   
            };           
        },
        //批量删除--后台
        handleBatchDel (deleteVals) {
            tableAxios.axiosDelete('/deleteTeachers', this, deleteVals);
        },        
        //删除--后台
        handleDel (deleteVals) {
            tableAxios.axiosDelete('/deleteTeacher', this, deleteVals);
        },
        //修改--后台
        handleChange (currentVal) {
            tableAxios.axiosPut('/updateTeacher', this, currentVal);
        },
        //查询--前台
        search (data, argumentObj) {
            let res = data;
            let dataClone = data;
            for (let argu in argumentObj) {
                if (argumentObj[argu].length > 0) {
                    res = dataClone.filter(d => {
                        return d[argu].indexOf(argumentObj[argu]) > -1;
                    });
                    dataClone = res;
                }
            }
            return res;
        },
        //执行查询
        handleSearch () {
            this.tableDataList = this.initTableData;
            this.tableDataList = this.search(this.tableDataList, {name: this.searchByName});
        }, 
    },
    created () {
        this.init(); //获取数据
    }    
};
</script>
