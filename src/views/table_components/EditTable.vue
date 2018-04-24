<!--CRUD底层组件-->
<style lang="less">
    @import '../../style/edit-table.less';
    @import '../../style/common.less';
    @import '../../style/table.less';
</style>

<template>
    <div>
        <Card style="height:auto">
            <p slot="title" height= "50px">
                <!--图标-->
                <Icon type="grid"/>
                XXX
            </p>
            <div style="margin:0px 10px;overflow: auto">  <!--溢出部分隐藏scroll-->
                <Button icon='plus' type="primary" shape="circle" style="margin-right:15px;margin-left:10px" @click="handleAddOperation">增添数据</Button> 
                <Poptip
                    confirm
                    title="确认删除这些数据吗?"
                    placement="right-start"
                    @on-ok="handleBatchDeletion"
                >
                    <Button icon='minus' type="error" shape="circle" style="margin-right:15px">批量删除</Button>  
                </Poptip>
                <Button icon='ios-search-strong' shape="circle" style="float:right;margin:3px 15px"><i-switch size="small" v-model="showSearch"/></Button>              
            </div>
            <div style="margin:0px 10px;overflow: auto" v-if="showSearch">
                <Card :bordered="false"> <!--无边框-->
                    <div>
                        <slot name="search-slot"></slot>
                    </div>
                </Card>
            </div>
            <!--
                    注意!!!  如果想自定义列的颜色的话，就不能用斑马线属性stripe [一行白一行灰的显示]
            -->
            <div style="margin:0px 10px;overflow: auto">
                <Table :ref="refName" :columns="tableHeader" :data="value" :loading="loadingState"  size="small" @on-selection-change="handleSelectionsData" @on-sort-change="handleSort"></Table>
            </div>
            <!--分页-->
            <div style="margin: 10px;overflow: auto">
                <div style="float: right;">
                    <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" size="small" show-elevator show-sizer show-total
                            @on-change="handlePage" @on-page-size-change="handlePageSize"></Page>
                </div>
            </div>
        </Card>
    </div>
</template>

<script>


//导入js文件
import tableAxios from './table_base_util/TableAxios';
import tableEles from './table_base_util/TableRenderElements';


//暴露出来，外部才能找到
export default {
    props: {//定义传进来的参数值的类型
        refName: String,  //组件指针名
        tableHeader: Array,  //表格表头 [这个根据表格情况自定义写的]
        value: Array, //表格上显示的数据内容 [从后台get到的]   就是父组件v-model双向绑定的值   这里必须是value才行
        editIncell: { //该列是否可以进行单列编辑的状态判断,默认false
            type: Boolean,
            default: false   
        },
        allSelectUrls: Object, //存放所有该表中用到的所有下拉框的url  [自定义写的]
        pageTotal: Number, //一共的条数, 要从后台得到
    },
    data () {  //data必须定义为函数形式，然后有返回值    : function（）==（）
        return { //以下定义的，是该组件 自己的数据
            loadingState: false,
            pageNum: 1, //当前的页数， 不能是0
            pageSize: 10, //当前显示的数据条数
            selectionsData:[],  //多选选择的表格数据
            addData: [],   //暂存新增的一行数据
            showSearch: false,  //是否显示搜索卡片
            thisTableData: [],   //添加了判断状态的属性
        };
    },
    /**
     * 钩子函数√
     * 组件初始化好的那一时刻调用的函数
     */
    created (){ 
        this.loadingState = true;//开始是加载状态
        this.init();
        this.loadingState = false;//初始化结束就不是加载状态了
    },
    methods: {  //定义一些方法的 实现
        
        //初始化数据
        init () { 

            //刚开始的thisTableData是空的
            let vm = this; //vm 的值等于当前组件  因为这个方法里面有很多箭头函数或者匿名函数。所以先把this赋值好给vm。
            //可编辑的表头列
            let editableCell = this.tableHeader.filter(item => {   //item是columnsList[表格表头]里的每一个对象,filter():返回一个符合function条件的item元素数组
                if (item.editable == true) { //该属性段值为true表示是可编辑的
                    return item;                    
                }           
            });
            //JSON.stringify()  从对象中解析出json字符串
            //JSON.parse()      将json字符串解析成对象
            let cloneValue = JSON.parse(JSON.stringify(vm.value)); //克隆一份表格数据
            //定义一个新的数组变量，对克隆的表格数据通过map方法，添加操作状态新属性            
            let res = cloneValue.map((item,index) => {  //map():返回一个新的Array，每个元素为调用function的结果,是执行了这个function的结果值. 
                let isEditting = false;   //当前表格的状态,是否打开编辑框进行编辑操作, 需要一个外部的状态判断.
                if (vm.thisTableData[index]) {  //如果此时表格data已经有数据了,也就是说明已经进行过初始化了,所以现在的表格data是有新定义的状态属性的.
                    if (vm.thisTableData[index].editting) { //如果这一行的editting是true, 表示这一行正处于编辑状态.
                        isEditting = true;  //编辑状态true
                    } else { //如果这一行没有正在处于编辑状态, 就可以进行列编辑操作.
                        for (const cell in vm.thisTableData[index].edittingCell){ 
                            if(vm.thisTableData[index].edittingCell[cell] == true){  //如果这一列的编辑状态是true, 表示这一列正处于编辑状态
                                isEditting = true;  //编辑状态true
                            }
                        }  
                    }                   
                }
                /**
                 * 需要进行if else判断,因为外部状态判断变化后,说明表格data内容变化了.
                 */
                //此时表格data已经不是空了,因为isEditting变成true了.
                if (isEditting) {  
                    return this.thisTableData[index]; //返回更新后的该行的表格data
                }else{  //此时表格data还是空的. 
                    this.$set(item, 'editting', false);  //给当前item项添加新属性,editting,表示当前行的编辑状态
                    let edittingCell = {};  
                    editableCell.forEach(item => {
                        edittingCell[item.key] = false //editableCell中每个item的key值作为edittingCell的属性名,表示当前列的编辑状态
                    });
                    this.$set(item, 'edittingCell', edittingCell);  //editableCells
                    return item;  //返回初次初始化的该行的表格data
                }
            });

            vm.thisTableData = res;   //将过滤好的表格data赋值
            
            //遍历表头, 不能只遍历可编辑的表头, 因为对不可编辑列也有相应的操作进行. 将可编辑的表头列打开为编辑框
            this.tableHeader.forEach(item => {

                if (item.editable == true) { //如果该表头列是可编辑的.  item是{title: '姓名',align: 'center',key: 'name', editable: true}这个东西  
                    item.render = (h,param)=>{  //渲染该item
                        let currentRow = this.thisTableData[param.index]; //得到当前行数据[带状态]
                        let currentRowValue = this.value[param.index]; //得到当前行数据[后台的]

                        if(currentRow.adding){ //必须先判断是不是增加.   因为增加状态也是编辑状态. 但是增加完了之后
                            return h('div',
                                [
                                    tableEles(this, h, param, item)
                                ]
                            );
                        }else if(currentRow.editting){ //进行的是整行编辑
                            return h('div',
                                [
                                    tableEles(this, h, param, item)
                                ]
                            );
                        }else{//可进行单列编辑.  此时是没打开整行编辑的状态             
                            if(this.editIncell) {//有进行单列编辑的列
                                //可编辑数据和编辑按钮都在这渲染
                                return h('Row', { //行
                                    attrs: {
                                        type: 'flex', //传值参数类型是灵活的，即什么类型都可以
                                        align: 'middle',//文字居中
                                        justify: 'center',//内容居中  这样内容才和列对齐
                                    }
                                }, [//Row里面再包含的元素
                                    h('Col', [  //数据列
                                        //Col里面的元素内容
                                        //单列打开， true时编辑框状态，false时span状态    
                                          !currentRow.edittingCell[param.column.key] ? (item.cellType=="object") ? (currentRowValue[item.key]==null) ? h('span', "无") : h('span', currentRowValue[item.key].value) : h('span', currentRowValue[item.key]) : tableEles(this, h, param, item)
                                    ]),
                                    h('Col', [  //编辑按钮
                                        //判断该列的编辑状态，为true时，显示保存按钮，false时显示编辑按钮
                                        currentRow.edittingCell[param.column.key] ? tableAxios.saveIncellEditBtn(this, h, param) : tableAxios.incellEditBtn(this, h, param)
                                    ])
                                ]);
                            }else{//没有进行单列编辑的列
                              return ((item.cellType=="object") ? (currentRowValue[item.key]==null) ? h('span', "无") : h('span', currentRowValue[item.key].value) : h('span', currentRowValue[item.key]));
                            }
                        }
                    }
                }

                //如果该item有handle这一项
                if (item.handle) {  
                    item.render = (h, param) => {
                        let currentRowData = this.thisTableData[param.index]; 
                        let editAndDelete = []; //来放编辑和删除按钮的数组
                        item.handle.forEach(item => {  //遍历表头handle这一item里面的item
                            switch (item) {
                                case 'edit':
                                    editAndDelete.push(tableAxios.editButton(this, h, currentRowData, param.index));
                                    break;
                                case 'delete':
                                    editAndDelete.push(tableAxios.deleteButton(this, h, currentRowData, param.index));
                                    break;
                            }                           
                        });
                        return h('div', editAndDelete);  //按钮组合形式显示
                    };
                }
            });
        },
        //处理表格多选获取的行数据
        handleSelectionsData(selection) {
            this.selectionsData = selection;  //获取到选中的数据
        },
        //添加新的一行数据. 因为添加的时候需要时打开状态。所以editting为true。表示当前是编辑框状态。
        handleAddOperation() {  
            this.value.unshift({});  //表格上添加一行
            this.thisTableData.unshift({'editting': 'true', 'adding':'true'}); //给添加的这行添加状态，是编辑状态
        },
        //处理批量删除操作
        handleBatchDeletion() {
            if (this.selectionsData.length != 0) {  //选中要删除的行才进行删除操作
                this.$emit('on-batch-delete', this.selectionsData);
            }else {  //提示选择要删除的行
                this.$Message.warning({
                    content: '请先选择要删除的行',
                    duration: 20,  //至少 维持20秒.20秒不关. 自己关闭
                    closable: true  //设为true这个框就可以自己关闭
                });
            }  
        },
        //数组处理----后台需要的数据√
        handleBackdata (data) {
            let clonedData = JSON.parse(JSON.stringify(data));  //获取到当前数据---object类型
        
            clonedData.forEach(item => {  //遍历这些数据的item，删除每个item对应的以下三个属性               
                delete item.editting;
                delete item.edittingCell;
            });
            return clonedData; 
        },
        //对象处理----后台需要的数据√
        handleObjectDataToBackData (data) {
            let objectData = JSON.parse(JSON.stringify(data));  //获取到当前数据---object类型

            delete objectData.editting;
            delete objectData.edittingCell;

            return objectData; 
        },        
        //处理当前第几页
        handlePage (value) {
            this.pageNum = value;
            this.$emit('handlePage', value);
        },   
        //处理当前页有几条 
        handlePageSize (value) {
            this.pageSize = value;
            this.$emit('handlePageSize', value);
        }, 
        //处理排序事件
        handleSort (sort) {  //sort有column、key、order
            this.$emit('handleSort', sort.key, sort.order);
        }
    },

    //监听value的变化
    watch: {
        value (data) {
            console.log("监听事件发生")
            this.init();
        },
    }
};
</script>




