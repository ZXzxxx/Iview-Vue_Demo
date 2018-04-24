<!--CRUD父组件  模板-->

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
                        :all-select-urls="allSelectUrls"
                        :table-header="tableHeader"
                        :page-total="pageTotals"
                        @handlePage="handlePage"
                        @handlePageSize="handlePageSize"    
                        @handleSort="handleSort"                
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
import tableAxios from '../table_components/table_base_util/TableAxios';
//引入单文件组件
import editTable from '../table_components/EditTable.vue';
import crudHeader from './CrudHeader';
import yearPicker from '../table_components/table_base_components/YearPicker';
import cascader from '../table_components/table_base_components/Cascader.vue';
import tableSelect from '../table_components/table_base_components/TableSelect.vue';


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
            tableHeader: [],//表格列
            tableDataList: [],  //表格具体数据   
            allSelectUrls: {}, //下拉框URL
            pageNum: 1, //当前的页数， 不能是0
            pageSize: 10, //当前显示的数据条数
            pageTotals:0,//总条数
            sortKey:'',//排序列的key值
            sortOrder:''//排序方式 
        };
    },
    methods: {
        //初始化数据
        init () {
            this.tableHeader = crudHeader; //表格表头
            tableAxios.axiosGet('/getAllTeacher?' + "pageNum=" + this.pageNum + "&pageSize=" + this.pageSize + "&sortKey=" + this.sortKey + "&sortOrder=" + this.sortOrder, this); //获取--后台
            this.allSelectUrls = {     //这个表格上涉及到的所有下拉框的url地址
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
        //得到当前排序的信息
        handleSort (sortKey, sortOrder) {
            this.sortKey = sortKey;
            this.sortOrder = sortOrder;
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
