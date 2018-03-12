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
                        v-model="editInlineAndCellData"
                        @on-cell-change="handleCellChange"
                        @on-change="handleChange"
                        @on-delete="handleDel"
                        :editIncell="true"
                        :all-select-urls="crud_selectUrls"
                        :columns-list="editInlineAndCellColumn">  <!--传参数-->
                                                                  <!--插槽，插入需要的Dom-->
                        <span slot="table-title" style="color:#1290ca">XXX-查询</span>
                        <span slot="search-content">
                            <Input v-model="searchByName" @on-change="handleSearch" icon="search" placeholder="姓名..." style="width: 100px"/>
                            <year-picker></year-picker>
                            <cascader></cascader>
                            <!-- <table-select
                                :select-list="empSelectList"
                                :multipleState="true"
                            ></table-select> -->
                        </span>
                    </edit-table>
                </div>
        </Col>
    </Row>

  </div>
</template>



<script>
import axios from 'axios';


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
            //搜索data
            searchByName: '',

            // columnsList: [], //用哪了???
            // tableData: [], //表格数据

            editInlineAndCellColumn: [],
            editInlineAndCellData: [],  //具体数据
            initTableData: [], //初始化数据
           
            crud_selectUrls: {},

        };
    },
    methods: {
        //获取数据
        getData () {
            // this.columnsList = tableData.table1Columns;//属性名的json串----java实体类属性
            // this.tableData = tableData.table1Data;//表格内具体的内容的json串----java实体类属性对应的所有数据
            this.editInlineAndCellColumn = tableData.editInlineAndCellColumn;//其实就只需要这个应该？？？？
            this.editInlineAndCellData  = this.initTableData = tableData.editInlineAndCellData;//具体数据
            // this.showCurrentColumns = tableData.showCurrentColumns;//当前数据
            
            var allSelectUrls = {     //所有下拉框的url地址
                    'work' : '123',
            };  

            this.crud_selectUrls = allSelectUrls;

            

        },

        handleNetConnect (state) {
            this.breakConnect = state;
        },
        handleLowSpeed (state) {
            this.lowNetSpeed = state;
        },
        getCurrentData () {
            this.showCurrentTableData = true;
        },
        handleDel (val, index) {
            this.$Message.success('删除了第' + (index + 1) + '行数据');
        },
        handleCellChange (val, index, key) {
            this.$Message.success('修改了第 ' + (index + 1) + ' 行列名为 ' + key + ' 的数据');
        },
        //这里和后台交互
        handleChange (val, index) {
            this.$Message.success('修改的数据为' + val);
            this.$Message.success('修改了第' + (index + 1) + '行数据');
        },
        //查询方法
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
            this.editInlineAndCellData = this.initTableData;
            this.editInlineAndCellData = this.search(this.editInlineAndCellData, {name: this.searchByName});
        }, 
    },
    created () {
        this.getData();
    }    
};
</script>
