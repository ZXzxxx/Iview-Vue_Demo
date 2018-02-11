// 使用 Vue 的 Render 函数。
// 传入两个参数，第一个是 h---也就是createElement，第二个为对象param，
// 对象包含 row、column 和 index，分别指当前行数据，当前列数据，当前行索引，


//获取下拉框数据
const getSelectData = (vm, selectType) => {

        let selectListData = [  //测试数据
            {
                id: 1,
                description: "前端"
            },
            {
                id: 2,
                description: "后端"
            },
            {
                id: 3,
                description: "测试"
            }
        ];
        
        ////得到对应的url
        //let url = this.allSelectUrls[selectType];

        ////从后台获取数据
        // axios.get(url)
        //     .then(function(reponse){
        //     //将后台返回的数据绑定给citylist，需要注意的是：
        //     //由于在option中循环显示的是label，标记的是value所以后台返回的list中必须也要含有label和value属性
        //         selectListData = response.data
        //     })
        //     .catch(function(error){
        //         alert(error)
        // });

        return selectListData;
};

                // //获取下拉框数据   要传入url这个参数
        // getSelectData : function (Key) {

        // },


//行编辑/保存按钮
const editButton = (vm, h, currentRow, index) => {
    return h('Button', {
        props: {
            type: currentRow.editting ? 'success' : 'primary',
            shape: "circle"
        },
        style: {
            margin: '0 5px'
        },
        on: {
            'click': () => {  //这是点击引发的事件
                //点击编辑按钮前，这个editting是false状态；点击了之后，才变成了true
                if (!currentRow.editting) {  //点击编辑按钮，进这里  进入编辑状态  editting为false的时候,显示的是编辑按钮
                    console.log("进入了编辑状态");
                    console.log(currentRow.editting);      

                    if (currentRow.edittingCell) { //可编辑的列 
                        //现在是行编辑状态,所以要把单个的列编辑状态设为false
                        for (let cellName in currentRow.edittingCell) {            
                            currentRow.edittingCell[cellName] = false;
                            vm.edittingStore[index].edittingCell[cellName] = false;
                        }
                    }
                    vm.edittingStore[index].editting = true;  //现在是编辑状态
                    vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));  //当前数据???这里为什么要有
                    //点击保存按钮前，这个editting是true状态，点击了之后，才变成了false
                } else {   //点击保存按钮，进这里  进入完成编辑的状态
                    console.log("测试点击保存editting?");
                    console.log(currentRow.editting);

                    vm.edittingStore[index].saving = true;  //点击保存按钮之后，这行数据的保存状态才是true
                    vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));//编辑完成后的新的数据
                    
                    console.log("测试这个时候的table数据?");
                    console.log(vm.thisTableData);

                    let edittingRow = vm.edittingStore[index]; //当前正在编辑的该行的数据
                    
                    console.log("测试这个时候的行数据?");
                    console.log(edittingRow);

                    edittingRow.editting = false;//编辑状态结束
                    edittingRow.saving = false;//保存状态也结束

                    vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore)); //???又来一遍
                    //父组件@on-change的时候，可以用这两个参数
                    vm.$emit('on-change', vm.handleBackdata(vm.thisTableData), index);  
                    // vm.$emit('input', vm.handleBackdata(vm.thisTableData)); //???目前还没用到
       
                }
            }
        }
    }, currentRow.editting ? '保存' : '编辑');
};

//行删除按钮
const deleteButton = (vm, h, currentRow, index) => {
    return h('Poptip', {   //iview的气泡提示
        props: {
            confirm: true,
            title: currentRow.editting ? '您确定取消编辑该数据吗?' : '您确定要删除这条数据吗?',
            transfer: true
        },
        on: {  //点击ok触发删除
            'on-ok': () => {
                if (!currentRow.editting) {
                    vm.thisTableData.splice(index, 1).splice(index, 1);//从该数组中删除下标为index的数据，1表示只删除一条
                    vm.$emit('on-delete', vm.handleBackdata(vm.thisTableData), index);
                }else {
                    //???还没想起来咋实现
                }
            }
        }
    }, [
        h('Button', {
            style: {
                margin: '0 5px'
            },
            props: {
                // type: 'error',
                placement: 'top', //气泡弹出的位置
                type: currentRow.editting ? 'info' : 'error',
                shape: "circle"
            }
        }, currentRow.editting ? '取消' : '删除')
    ]);
};

//列编辑按钮
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

//列保存按钮
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

//列Input框
const cellInput = (vm, h, param, item) => {
    return h('Input', {
        props: {
            value: vm.edittingStore[param.index][item.key], //绑定值的显示
            placeholder: "不可为空...",
            clearable: true
        },
        on: {
            'on-change' (event) {
                let key = item.key;
                vm.edittingStore[param.index][key] = event.target.value;
            }
        }
    });
};

//列单选下拉框
const cellSelect = (tbSelect, vm, h, param, item) => {
    return h(tbSelect,{
        props: {
            value: vm.edittingStore[param.index][item.key], //绑定值的显示
            selectList: [
                {
                    value: 'New York',
                    label: 'New York'
                },
                {
                    value: 'London',
                    label: 'London'
                },
            ],
            multipleState: false,  //单选          
        },
    });
};


//列多选下拉框
const cellMultipleSelect = (tbSelect, vm, h, param, item) =>  {
    return h(tbSelect,{
        props: {
            value: vm.edittingStore[param.index][item.key], //绑定值的显示
            selectList: [
                {
                    value: 'New York',
                    label: 'New York'
                },
                {
                    value: 'London',
                    label: 'London'
                },
            ],
            multipleState: true,  //多选
        },
    });
};

//列数字选择器
const cellInputNum = (tbInputNum, vm, h, param, item) => {
    return h(tbInputNum, {
        props: {
            maxNum: 20,
            minNum: 5
        },
    });
};

//列日期选择器
const cellDatePicker = (tbDatePicke, vm, h, param, item) => {
    return h(tbDatePicke, {
        props: {
        },
    });
};

//列年份选择器
const cellYearPicker = (tbYearPicker, vm, h, param, item) => {
    return h(tbYearPicker, {
        props: {
        },
    });
};


const tableCellType = {
    getSelectData: getSelectData,
    editButton: editButton,
    deleteButton: deleteButton,
    incellEditBtn: incellEditBtn,
    saveIncellEditBtn: saveIncellEditBtn,
    cellInput: cellInput,
    cellSelect: cellSelect,
    cellMultipleSelect: cellMultipleSelect,
    cellInputNum: cellInputNum,
    cellDatePicker: cellDatePicker,
    cellYearPicker: cellYearPicker
};

export default tableCellType;