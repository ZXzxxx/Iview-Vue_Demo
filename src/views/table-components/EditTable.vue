<!--crud-table组件-->

<style lang="less">
    @import 'edit-table.less';
</style>

<!--分页××   其他√-->
<template>
    <div>
        <Card style="height:auto">
            <p slot="title" height= "50px">
                <!--图标-->
                <Icon type="grid"/>
                XXX
            </p>
            <div style="margin:0px 10px;overflow: hidden">  <!--溢出部分隐藏-->
                <Button icon='plus' type="primary" shape="circle" style="margin-right:15px;margin-left:10px" @click="handleAddOperation"><slot name="add-name"/></Button>  <!--折叠框的杠杠处-->
                <Button icon='minus' type="error" shape="circle" style="margin-right:15px" @click="handleBatchDeletion"><slot name="delete-name"/></Button>  <!--折叠框的杠杠处-->
                <Button icon='ios-search-strong' shape="circle" style="float:right;margin:3px 15px"><i-switch size="small" v-model="showSearch"/></Button>              
            </div>
            <div style="margin:0px 10px;overflow: hidden" v-if="showSearch">
                <Card :bordered="false"> <!--无边框-->
                    <div>
                        <slot name="search-slot"></slot>
                    </div>
                </Card>
            </div>
            <!--
                    注意!!!  如果想自定义列的颜色的话，就不能用斑马线属性stripe [一行白一行灰的显示]
            -->
            <div style="margin:0px 10px;overflow: hidden">
                <Table :ref="refName" :columns="columnsList" :data="thisTableData" size="small" @on-selection-change="handleSelectionsData"></Table>
            </div>
            <!--分页-->
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <!-- <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" size="small" show-elevator show-sizer show-total
                            @on-change="handlePage" @on-page-size-change="handlePageSize"></Page> -->
                </div>
            </div>
        </Card>
    </div>
</template>

<script>


//导入js文件
import tableAxios from './table-baseUtil/tableAxios';
import tableEles from './table-baseUtil/tableRenderElements';
import index from 'vue';


//暴露出来，外部才能找到
export default {
    props: {//定义传进来的参数值的类型
        refName: String,  //组件指针名
        columnsList: Array,  //表格表头 [这个根据表格情况自定义写的]
        value: Array, //表格上显示的数据内容 [从后台get到的]   就是父组件v-model双向绑定的值
        editIncell: { //该列是否可以进行单列编辑的状态判断,默认false
            type: Boolean,
            default: false   
        },

        allSelectUrls: Object, //存放所有该表中用到的所有下拉框的url  [自定义写的]
    },
    data () {  //data必须定义为函数形式，然后有返回值    : function（）==（）
        return { //以下定义的，是该组件 自己的数据
            // pageTotal: 0,
            selectionsData:[],  //多选选择的表格数据
            addData: [],   //暂存新增的一行数据
            showSearch: false,  //是否显示搜索卡片
            thisTableData: [],   //表格--数据内容   在init()中初始化等于res的内容
            edittingStore: [],    //暂存修改数据  -- 作为一个中间变量
        };
    },
    /**
     * 钩子函数√
     * 组件初始化好的那一时刻调用的函数
     */
    created (){ 
        this.init();
    },
    methods: {  //定义一些方法的 实现
        
        //初始化数据
        init () { 

            //刚开始的thisTableData是空的
            
            /**
             *  使用var声明的变量，其作用域为该语句所在的函数内，且存在变量提升现象；
                用let声明的变量，其作用域为该语句所在的代码块,即一个{}内，不存在变量提升；[推荐使用这个]
                使用const声明的是常量，在后面出现的代码中不能再修改该常量的值。
             */

            let vm = this; //vm 的值等于当前组件  只在init()里面起作用

            //filter():返回一个符合function条件的元素数组
            //editableCell---可编辑的表头列
            let editableCell = this.columnsList.filter(item => {   //item是columnsList[表格表头]里的每一个对象
                if (item.editable) {
                    if(item.editable == true){
                        return item;
                    }                    
                }           
            });

            console.log(this.columnsList);

            this.addData = this.columnsList.map((item, index) => {
                if(this.columnsList[index].key){ //有key时才操作
                    let keyName = this.columnsList[index].key; 
                    console.log(item);
                }
                // this.$set(item,);
            })

            //JSON.stringify()  从对象中解析出json字符串
            //JSON.parse()      将json字符串解析成对象
            let cloneData = JSON.parse(JSON.stringify(this.value)); //克隆一份表格数据
            
            let res = [];//定义了一个空数组， 添加关于可编辑列的新属性
            //map():返回一个新的Array，每个元素为调用function的结果
            res = cloneData.map((item,index) => {
                let isEditting = false;  //默认不处于编辑状态   初始化res数据，是从129行else开始的.
                /**
                 * 箭头函数里面的this不是该箭头函数，箭头函数本身是没有this的
                 * 这个this指的是这个组件对象，也就是定义的这个箭头函数所在的对象
                 */
                if (this.thisTableData[index]) {  //单列编辑的时候触发 ××
                    console.log("进这里1");
                    console.log(this.thisTableData)
                    if (this.thisTableData[index].editting) { //true---正在编辑状态
                        isEditting = true;
                    } else { //不是正在编辑状态
                        //for循环 遍历可编辑的列这个object属性
                        for (const cell in this.thisTableData[index].edittingCell){ 
                            if(this.thisTableData[index].edittingCell[cell] == true){ 
                                isEditting = true;
                            }
                        }  
                    }                   
                }
                if (isEditting) {  //单列编辑的时候触发,还没测试出进这里  ××
                    console.log("进这里2");
                    return this.thisTableData[index]; 
                }else{  //isEditting为false时  即 初次初始化res
                    this.$set(item, 'editting', false);  //添加新属性  editting, ，默认值false
                    let edittingCell = {};  //对象
                    //遍历可编辑的表头列的集合
                    editableCell.forEach(item => {
                        edittingCell[item.key] = false //item.key，即editableCell中每个对象的key值作为edittingCell的属性名，默认属性值为false
                    });
                    this.$set(item, 'edittingCell', edittingCell);  //添加新属性  edittingCell, 是个对象
                    return item;  //得到初次初始化后的res  每个item对象除了添加的新属性外，cloneData的原属性依旧存在
                }
            });

            this.thisTableData = res;   //表格显示的数据 等于res
            console.log(this.thisTableData);
            this.edittingStore = JSON.parse(JSON.stringify(this.thisTableData));
            
            //遍历可编辑列头，将可编辑列字段，在编辑状态[单列/行]下打开编辑框
            this.columnsList.forEach(item => {

                //如果该表头列是可编辑的
                if (item.editable) { 
                    item.render = (h,param)=>{
                        let currentRow = this.thisTableData[param.index]; //得到当前行数据
                        /*editting的值 是点击编辑按钮那 给定的*/
                        if(currentRow.editting){   //true的时候是整行编辑
                            return h('div',
                                [
                                    tableEles(this, h, param, item)
                                ]
                            );
                        }else {  //false的时候是单列编辑
                            if(this.editIncell) {//可以进行单列编辑的列
                                //可编辑数据和编辑按钮都在这渲染
                                return h('Row', { //行
                                    attrs: {
                                        type: 'flex', //传值参数类型是灵活的，即什么类型都可以
                                        align: 'middle',//文字居中
                                        justify: 'center',//内容居中  这样内容才和列对齐
                                    }
                                }, [  //Row里面再包含的元素
                                    h('Col', [  //数据列
                                        //Col里面的元素内容
                                        //单列打开， true时编辑框状态，false时span状态    
                                        !currentRow.edittingCell[param.column.key] ? (item.cellType=="object") ? h('span', currentRow[item.key].value) : h('span', currentRow[item.key]) : tableEles(this, h, param, item)
                                    ]),
                                    h('Col', [  //编辑按钮
                                        //判断该列的编辑状态，为true时，显示保存按钮，false时显示编辑按钮
                                        currentRow.edittingCell[param.column.key] ? tableAxios.saveIncellEditBtn(this, h, param) : tableAxios.incellEditBtn(this, h, param)
                                    ])
                                ]);
                            }else{//不可以进行单列编辑的列
                                return (item.cellType=="object") ? h('span', currentRow[item.key].value) : h('span', currentRow[item.key]);  //只显示着数据，不显示编辑按钮
                            }
                        }
                    }
                }

                //如果该item有handle这一项
                if (item.handle) {  
                    item.render = (h, param) => {
                        let currentRowData = this.thisTableData[param.index];
                        let children = [];
                        item.handle.forEach(item => {  //遍历handle里面的item
                            if (item == 'edit') {
                                children.push(tableAxios.editButton(this, h, currentRowData, param.index));
                            } else if (item == 'delete'){
                                children.push(tableAxios.deleteButton(this, h, currentRowData, param.index));
                            }                            
                        });
                        return h('div', children);  //按钮组合形式显示
                    };
                }
            });
        },
        //处理表格多选获取的行数据
        handleSelectionsData(selection) {
            this.selectionsData = selection;
            // alert(this.handleBackdata (selection)); //这是一个数组对象  
            // console.log(this.handleBackdata (selection));
        },
        //添加新的一行数据. 因为添加的时候需要时打开状态。所以editting为true。表示当前是编辑框状态。
        handleAddOperation() {
            this.thisTableData.push({'editting':'true','edittingCell':{'name':'false','work':'false'},'name':'123','sex':'','work':{}});  
            console.log("添加测试");
            console.log(this.thisTableData);
        },
        //处理批量删除操作
        handleBatchDeletion() {
            if (this.selectionsData.length != 0) {  //选中要删除的行才进行删除操作
                alert(this.selectionsData);
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
                delete item.saving;
            });
            return clonedData; 
        },
        //对象处理----后台需要的数据√
        handleObjectDataToBackData (data) {
            let objectData = JSON.parse(JSON.stringify(data));  //获取到当前数据---object类型

            delete objectData.editting;
            delete objectData.edittingCell;
            delete objectData.saving;

            return objectData; 
        },        
        //分页处理事件××
        changePage () {
            // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
            // this.tableData1 = this.mockTableData1();
        },    
    },

    //监听value的变化×   单列编辑的时候触发
    watch: {
        value (data) {
            console.log("监听事件发生")
            console.log(this.thisTableData);
            this.init();
        },
    }
};
</script>




