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
            <Collapse>
                <Panel>
                    <Icon type="search" color="#1290ca"/> 
                    <slot name="table-title"></slot>  
                    <p slot="content">
                        <slot name="search-content"></slot>   <!--插入查询框框Dom--> 
                    </p>                           
                </Panel>
            </Collapse>
            <!--
                    注意!!!    如果想自定义列的颜色的话，就不能用斑马线属性stripe
            -->
            <Table :ref="refName" :columns="columnsList" :data="thisTableData" size="small" stripe></Table>
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
import tableCellType from './base/table-cell-type';
import tableSelect from './base/tableSelect';
import inputNum from './base/inputNum';

//暴露出来，外部才能找到
export default {
    name: 'crudTable',
    components: {
        tableSelect,
        inputNum
    },
    props: {//定义传进来的参数值的类型
        refName: String,  //组件指针名
        columnsList: Array,  //表格表头 [根据表格情况定义]
        value: Array, //表格--数据内容   就是父组件v-model双向绑定的值
        editIncell: {  //是否可以进行单列编辑,默认false
            type: Boolean,
            default: false   
        },

        allSelectUrls: Object, //存放所有下拉框的url
    },
    data () {  //data必须定义为函数形式    : function（）==（）
        return { //定义自己的数据
            // pageTotal: 0,
            thisTableData: [],   //表格--数据内容    这是怎么来的数据,也因为v-model???
            edittingStore: []    //暂存修改数据  -- 中间变量
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


        init () { //初始化数据
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
            //JSON.stringify()  从对象中解析出json字符串
            //JSON.parse()      将json字符串解析成对象
            let cloneData = JSON.parse(JSON.stringify(this.value));
            // let cloneData = this.value;
            let res = [];//定义了一个空数组
            //map():返回一个新的Array，每个元素为调用function的结果

            //定义带有判断单列编辑新属性的集合  [如果不需要进行单列编辑,就不需要这个]
            res = cloneData.map((item,index) => {
                let isEditting = false;
                /**
                 * 箭头函数里面的this不是该箭头函数，箭头函数本身是没有this的
                 * 这个this指的是这个组件对象，也就是定义的这个箭头函数所在的对象
                 */
                if (this.thisTableData[index]) {  //单列编辑的时候触发
                    console.log("进这里1");
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
                if (isEditting) {  //单列编辑的时候触发,还没测试出进这里
                    console.log("进这里2");
                    return this.thisTableData[index]; 
                }else{  //isEditting为false时
                    this.$set(item, 'editting', false);  //添加新属性  editting
                    let edittingCell = {};  //对象
                    //遍历可编辑的表头列的集合
                    editableCell.forEach(item => {
                        edittingCell[item.key] = false //item.key值作为属性名，属性值为false
                    });
                    this.$set(item, 'edittingCell', edittingCell);  //添加新属性  edittingCell
                    return item;
                }
            });
            this.thisTableData = res;   
            this.edittingStore = JSON.parse(JSON.stringify(this.thisTableData));
            //this.edittingStore = this.thisTableData;
            
            //遍历可编辑列头，将可编辑列字段，在编辑状态[单列/行]下打开编辑框
            this.columnsList.forEach(item => {

                //如果该表头列是可编辑的
                if (item.editable) { 
                    item.render = (h, param) => {  //param  是该行对象
                        let currentRow = this.thisTableData[param.index];//得到当前行的数据
                        //editting是false---未编辑[才能进行单列编辑]
                        if(!currentRow.editting) {
                            if (this.editIncell) {// 可以进行单列编辑
                                return h('Row', { //行
                                    props: {
                                        type: 'flex', //传值参数类型是灵活的，即什么类型都可以
                                        align: 'middle',//文字居中
                                        justify: 'center',//内容居中
                                    }
                                }, [
                                    h('Col', { //数据列
                                        props: {
                                            span: '10'
                                        }
                                    }, [
                                        //单列打开， true时编辑框状态，false时span状态    
                                        !currentRow.edittingCell[param.column.key] ? h('span', currentRow[item.key]) : tableCellType.cellInputNum(inputNum, vm, h, param, item) //cellInput(this, h, param, item)
                                    ]),
                                    h('Col', { //按钮列
                                        props: {
                                            span: '1'
                                        }
                                    },[
                                        //true时，显示保存，false时显示编辑
                                        currentRow.edittingCell[param.column.key] ? tableCellType.saveIncellEditBtn(this, h, param) : tableCellType.incellEditBtn(this, h, param)
                                    ])
                                ]);
                            } else { //否则一直span显示
                                return h('span', currentRow[item.key]);
                            }                   
                        }
                        //editting是true---编辑状态[只能进行整行编辑]
                        else {
                            if(item.cellType === 'object'){  //如果该列是下拉框类型                               
                               return h(tableSelect,{                                       
                                    props: {                               
                                        multipleState: false,  //单选  
                                        selectList: tableCellType.getSelectData(this, item.key),
                                        placeholderData: vm.edittingStore[param.index][param.column.key].toString(),  //因为多选的时候，是array，所以toString一下
                                    },
                                    on: {
                                        'select-onChange' (value) {
                                            let key = param.column.key;                                                                                
                                            vm.edittingStore[param.index][key] = value; //下拉框选中值变化时，当前选中的值也变化
                                        }, 
                                    },
                                    // nativeOn: {
                                    //     'initSelectData' () {
                                    //         console.log("天呢");
                                    //     }     
                                    // },
                                });
                            }else{
                                return h('Input', {
                                    props: {
                                        type: 'text',
                                        value: currentRow[item.key] //框里要显示着值
                                    },
                                    attrs: {
                                        placeholder: "不可为空..",
                                    },
                                    on: {
                                        'on-change' (event) {
                                            let key = param.column.key;
                                            vm.edittingStore[param.index][key] = event.target.value;                      
                                        }
                                    }
                                });
                            }
                        }                        
                    };//render函数结束
                }

                //如果该item有handle这一项
                if (item.handle) {  
                    item.render = (h, param) => {
                        let currentRowData = this.thisTableData[param.index];
                        let children = [];
                        item.handle.forEach(item => {  //遍历handle里面的item
                            if (item == 'edit') {
                                children.push(tableCellType.editButton(this, h, currentRowData, param.index));
                            } else {
                                children.push(tableCellType.deleteButton(this, h, currentRowData, param.index));
                            }                            
                        });
                        return h('div', children);  //按钮组合形式显示
                    };
                }
            });
        },


        //处理成后台需要的数据√
        handleBackdata (data) {
            let clonedData = JSON.parse(JSON.stringify(data));  //获取到当前数据---object类型

            clonedData.forEach(item => {  //遍历这些数据的item，删除每个item对应的以下三个属性               
                delete item.editting;
                delete item.edittingCell;
                delete item.saving;
            });
            return clonedData; 
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
            this.init();
        },
    }
};
</script>



