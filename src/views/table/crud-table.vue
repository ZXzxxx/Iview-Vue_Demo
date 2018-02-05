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
        <Col span="12">
            <Card>
                <!--???slot=title不明白-->
                <p slot="title">
                    <!--图标-->
                    <Icon type="load-b"/>
                        CRUD数据表格
                </p>
                <!--表格高190px-->
                <div class="edittable-table-height-con">
                    <edit-table
                        refs = "crudTable" 
                        v-model="editInlineAndCellData"
                        @on-cell-change="handleCellChange"
                        @on-change="handleChange"
                        :editIncell="true"
                        :columns-list="editInlineAndCellColumn">>
                    </edit-table>
                </div>
            </Card>
        </Col>
<!--         
            <Col span="12" class="padding-left-10">
                <Card>
                    <p slot="title">
                        <Icon type="android-more-horizontal"></Icon>
                        可编辑单元格(鼠标移入显示编辑单元格按钮)
                    </p>
                    <div class="edittable-table-height-con">
                        <can-edit-table refs="table3" v-model="editIncellData" :hover-show="true" :edit-incell="true" :columns-list="editIncellColumns"></can-edit-table>
                    </div>
                </Card>
            </Col> -->
    </Row>

  </div>
</template>

<script>
import editTable from './components/EditTable.vue';
import tableData from './data/crud_table_test_data.js';
export default {
    name: 'table-demo',
    components: { //注册组件
        editTable
    },
    data () {
        return {
            columnsList: [], //行？？
            tableData: [], //表格数据
            editInlineColumns: [], //正在编辑的什么？？
            editInlineData: [],//正在编辑的什么的数据
            editIncellColumns: [],
            editIncellData: [],
            editInlineAndCellColumn: [],
            editInlineAndCellData: [],
            showCurrentColumns: [],
            showCurrentTableData: false
        };
    },
    methods: {
        getData () {
            this.columnsList = tableData.table1Columns;//属性名的json串----java实体类属性
            this.tableData = tableData.table1Data;//表格内具体的内容的json串----java实体类属性对应的所有数据
            this.editInlineColumns = tableData.editInlineColumns;//可编辑的列（比第一个多了一个可编辑判断的串）
            this.editInlineData = tableData.editInlineData;//可编辑的列对应的数据
            this.editIncellColumns = tableData.editIncellColumns;//??没看出区别
            this.editIncellData = tableData.editIncellData;//？？？
            this.editInlineAndCellColumn = tableData.editInlineAndCellColumn;//其实就只需要这个应该？？？？
            this.editInlineAndCellData = tableData.editInlineAndCellData;
            this.showCurrentColumns = tableData.showCurrentColumns;//当前数据
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
        handleChange (val, index) {
            this.$Message.success('修改了第' + (index + 1) + '行数据');
        }
    },
    created () {
        this.getData();
    }    
};
</script>
