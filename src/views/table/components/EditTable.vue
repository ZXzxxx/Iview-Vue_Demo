<!--crud-table组件-->

<style lang="less">
    @import 'edit-table.less';
</style>

<template>
    <div>
        <!--
            绑定属性ref = refs
                   columns = columnsList
                   data = thisTableData
            border 表格有边界
            disabled-hover  ？？？
        -->
        <Table :ref="refs" :columns="columnsList" :data="thisTableData" border disabled-hover>
        </Table>
    </div>
</template>

<script>
const editButton = (vm, h, currentRow, index) => {
    return h('Button', {
        props: {
            type: currentRow.editting ? 'success' : 'primary',
            loading: currentRow.saving
        },
        style: {
            margin: '0 5px'
        },
        on: {
            'click': () => {
                if (!currentRow.editting) {
                    if (currentRow.edittingCell) {
                        for (let name in currentRow.edittingCell) {
                            currentRow.edittingCell[name] = false;
                            vm.edittingStore[index].edittingCell[name] = false;
                        }
                    }
                    vm.edittingStore[index].editting = true;
                    vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                } else {
                    vm.edittingStore[index].saving = true;
                    vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                    let edittingRow = vm.edittingStore[index];
                    edittingRow.editting = false;
                    edittingRow.saving = false;
                    vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                    vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                    vm.$emit('on-change', vm.handleBackdata(vm.thisTableData), index);
                }
            }
        }
    }, currentRow.editting ? '保存' : '编辑');
};

//删除按钮
const deleteButton = (vm, h, currentRow, index) => {
    return h('Poptip', {   //iview的气泡提示
        props: {
            confirm: true,
            title: '您确定要删除这条数据吗?',
            transfer: true
        },
        on: {  //点击ok触发删除
            'on-ok': () => {
                vm.thisTableData.splice(index, 1).splice(index, 1);//从该数组中删除下标为index的数据，1表示只删除一条
                vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                vm.$emit('on-delete', vm.handleBackdata(vm.thisTableData), index);
            }
        }
    }, [
        h('Button', {
            style: {
                margin: '0 5px'
            },
            props: {
                type: 'error',
                placement: 'top' //气泡弹出的位置
            }
        }, '删除')
    ]);
};
const incellEditBtn = (vm, h, param) => {
    if (vm.hoverShow) {
        return h('div', {
            'class': {
                'show-edit-btn': vm.hoverShow
            }
        }, [
            h('Button', {
                props: {
                    type: 'text',
                    icon: 'edit'
                },
                on: {
                    click: (event) => {
                        vm.edittingStore[param.index].edittingCell[param.column.key] = true;
                        vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                    }
                }
            })
        ]);
    } else {
        return h('Button', {
            props: {
                type: 'text',
                icon: 'edit'
            },
            on: {
                click: (event) => {
                    vm.edittingStore[param.index].edittingCell[param.column.key] = true;
                    vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                }
            }
        });
    }
};
const saveIncellEditBtn = (vm, h, param) => {
    return h('Button', {
        props: {
            type: 'text',
            icon: 'checkmark'
        },
        on: {
            click: (event) => {
                vm.edittingStore[param.index].edittingCell[param.column.key] = false;
                vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                vm.$emit('on-cell-change', vm.handleBackdata(vm.thisTableData), param.index, param.column.key);
            }
        }
    });
};
const cellInput = (vm, h, param, item) => {
    return h('Input', {
        props: {
            type: 'text',
            value: vm.edittingStore[param.index][item.key]
        },
        on: {
            'on-change' (event) {
                let key = item.key;
                vm.edittingStore[param.index][key] = event.target.value;
            }
        }
    });
};
//把一些默认东西暴露出来？？？
export default {
    name: 'crudTable',
    props: {//定义传进来的参数值的类型
        refs: String,
        columnsList: Array,
        value: Array,
        url: String,
        editIncell: { //定义一个是否开启编辑状态的对象
            type: Boolean,
            default: false   //默认是false
        },
        hoverShow: { //????
            type: Boolean,
            default: false
        }
    },
    data () {  //data必须定义为函数形式    function（）==（）
        return {
            columns: [],//数组
            thisTableData: [],
            edittingStore: []
        };
    },
    /**
     * 钩子函数
     * 组件初始化好的那一时刻调用的函数
     */
    created (){ 
        this.init();
    },
    methods: {  //定义一些方法的 实现
        init () { //初始化组件函数
            /**
             *  使用var声明的变量，其作用域为该语句所在的函数内，且存在变量提升现象；
                用let声明的变量，其作用域为该语句所在的代码块,即一个{}内，不存在变量提升；[推荐使用这个]
                使用const声明的是常量，在后面出现的代码中不能再修改该常量的值。
             */
            let vm = this;
            //filter():返回一个符合func条件的元素数组
            let editableCell = this.columnsList.filter(item => {
                if (item.editable) { //???? 两遍？？
                    if(item.editable == true) {  //????
                        return item;
                    }
                }
            });
            let cloneData = JSON.parse(JSON.stringify(this.value));
            let res = [];//定义了一个空数组
            //map():返回一个新的Array，每个元素为调用func的结果
            //返回item，存放到cloneData这个集合中
            //这个item
            res = cloneData.map((item,index) => {
                let isEditting = false;
                /**
                 * 箭头函数里面的this不是该函数的this，箭头函数本身是没有this的
                 * 这个this指的是这个组件对象，也就是定义的这个箭头函数所在的对象
                 */
                if (this.thisTableData[index]) {  //????
                    if (this.thisTableData[index].editting) { //处于编辑状态
                        isEditting = true;
                    } else {
                        //for循环
                        for (const cell in this.thisTableData[index].edittingCell){ //为什么能这样.来.去？？？
                            if(this.thisTableData[index].edittingCell[cell] == true){
                                isEditting = true;
                            }
                        }  
                    }                   
                }
                if (isEditting) {
                    return this.thisTableData[index];
                }else{
                    //this是这个组件
                    this.$set(item, 'editting', false);//设置可编辑状态为false？？？
                    let edittingCell = {};//定义一个集合
                    //遍历存着所有可编辑的列的集合
                    editableCell.forEach(item => {
                        edittingCell[item.key] = false//把editable里面的item放到edittingCell集合里面，并把值设定为fasle
                    });
                    this.$set(item, 'edittingCell', edittingCell);
                    return item;//??不明白这个item是什么
                }
            });
            this.thisTableData = res;//等于这个前面得到好的这个数组，具体内容？？？
            this.edittingStore = JSON.parse(JSON.stringify(this.thisTableData));
           //这是外面传进来的
            this.columnsList.forEach(item => {
                if (item.editable) {
                    //???render函数不会
                    item.render = (h, param) => {
                        let currentRow = this.thisTableData[param.index];//得到当前行
                        if(!currentRow.editting) {//不是编辑状态
                            if (this.editIncell) {//???????
                                //  组件间传值？？
                                return h('Row', { //行
                                    props: {
                                        type: 'flex', //传值参数类型是灵活的，即什么类型都可以
                                        align: 'middle',//位置居中？？？
                                        justify: 'center',//居中？？？
                                    }
                                }, [
                                    h('Col', { //列
                                        props: {
                                            span: '22'
                                        }
                                    }, [
                                        //?????不明白
                                        !currentRow.edittingCell[param.column.key] ? h('span', currentRow[item.key]) : cellInput(this, h, param, item)
                                    ]),//好的列
                                    h('Col', {//中间那个...的列？
                                        props: {
                                            span: '2'
                                        }
                                    },[
                                        //?????不明白
                                        currentRow.edittingCell[param.column.key] ? saveIncellEditBtn(this, h, param) : incellEditBtn(this, h, param)
                                    ])
                                ]);
                            } else { //？？？？？？
                                return h('span', currentRow[item.key]);
                            }
                        }else {//是编辑状态
                            return h('Input', {
                                props: {
                                    type: 'text',
                                    value: currentRow[item.key] //框里要显示着值
                                },
                                //绑定事件？？？不懂
                                on: {
                                    'on-change' (event) {
                                        let key = param.column.key;
                                        vm.edittingStore[param.index][key] = event.target.value;                      
                                    }
                                }
                            });
                        }
                    };
                }
                //?????整个不明白？？？？？
                if (item.handle) {
                    item.render = (h, param) => {
                        let currentRowData = this.thisTableData[param.index];
                        let children = [];
                        item.handle.forEach(item => {
                            if (item == 'edit') {
                                children.push(editButton(this, h, currentRowData, param.index));
                            } else if (item === 'delete') {
                                children.push(deleteButton(this, h, currentRowData, param.index));
                            }                            
                        });
                        return h('div', children);
                    };
                }
            });
        },
        handleBackdata (data) {
        let clonedData = JSON.parse(JSON.stringify(data));
        clonedData.forEach(item => {
            delete item.editting;
            delete item.edittingCell;
            delete item.saving;
        });
        return clonedData;
        }
    },
    watch: {
        value (data) {
            this.init();
        }
    }
};
</script>

