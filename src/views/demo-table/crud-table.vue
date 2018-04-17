<!--CRUD父组件  模板-->

<style lang="less">
    @import '../../style/common.less';
    @import '../../style/table.less';
</style>

<!--组件模板-->
<template>
  <div style="position: absolute;overflow:auto;height:100%;width:100%;">  <!--注意style-->
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
                        :columns-list="tableColumsList"
                        :page-total="pageTotals"
                        @handlePage="handlePage"
                        @handlePageSize="handlePageSize"                       
                        >  <!--传参数-->
                                                                  
                        <!--插槽，插入需要的Dom-->
                        <span slot="search-slot">
                            <Input v-model="searchByName"  @on-change="handleSearch" icon="search" placeholder="姓名..." style="width:130px"/>
                            <table-select :selectUrl="'/getAllSchool'" :multipleState="true" :placeholderValue="'教研室...'" style="width:130px" @select-onChange="handleSearchBySelect"></table-select>
                        </span>
                    </edit-table>
                </div>
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
            searchByName: '',
            searchBySchoolSelect: '',
            tableColumsList: [],//表格列
            tableDataList: [],  //表格具体数据   
            crud_selectUrls: {}, //下拉框URL
            pageNum: 1, //当前的页数， 不能是0
            pageSize: 10, //当前显示的数据条数
            pageTotals:0,//总条数
        };
    },
    methods: {
        //初始化数据
        init () {
            this.tableColumsList = tableData.editInlineAndCellColumn; //表格表头
            tableAxios.axiosGet('/getAllTeacher?' + "pageNum=" + this.pageNum + "&pageSize=" + this.pageSize, this); //获取--后台
            this.crud_selectUrls = {     //这个表格上涉及到的所有下拉框的url地址
                'school' : '/getAllSchool',   
            };           
        },
        //得到子组件传过来的当前是第几页
        handlePage (value) {
            this.pageNum = value;
            this.init();
        },
        //得到子组件传过来的当前页的size
        handlePageSize (value) {
            this.pageSize = value;
            this.init();
        },
        //得到查询的下拉框数据
        handleSearchBySelect (value) {
            let cloneValue = value.map((item) => {              
                return item.value;
            });
            this.searchBySchoolSelect = cloneValue.join(","); 
            this.handleSearch();
        },
        //执行查询
        handleSearch () {
            tableAxios.axiosGet('/getTeachersBySpeci?' + "pageNum=" + this.pageNum + "&pageSize=" + this.pageSize + "&nameValue=" + this.searchByName + "&schoolIds=" + this.searchBySchoolSelect, this); //获取--后台                     
        }, 
        //批量删除--后台
        handleBatchDel (deleteVals) {
            tableAxios.axiosDelete('/deleteTeachers?' + "pageNum=" + this.pageNum + "&pageSize=" + this.pageSize, this, deleteVals);
        },        
        //删除--后台
        handleDel (deleteVals) {
            tableAxios.axiosDelete('/deleteTeacher?' + "pageNum=" + this.pageNum + "&pageSize=" + this.pageSize, this, deleteVals);
        },
        //修改--后台
        handleChange (currentVal) {
            tableAxios.axiosPut('/updateTeacher?' + "pageNum=" + this.pageNum + "&pageSize=" + this.pageSize, this, currentVal);
        },
    },
    created () {
        this.init(); //获取数据
    }    
};
</script>
