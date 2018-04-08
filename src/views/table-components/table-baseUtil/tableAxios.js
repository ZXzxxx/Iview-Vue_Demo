import axios from 'axios';

//get
const axiosGet = (url, componentVm) => {
    axios.get(url)
    .then(function(response){  
        if(response.status === 200){
            componentVm.tableDataList  = componentVm.initTableData = response.data;
        } 
    })
    .catch(function(error){
        alert(error);
    }); 
};
//post
//put
//delete

//获取下拉框的url
const selectUrl = (vm, selectName) => {
    let url = vm.allSelectUrls[selectName];
    return url; 
};

//行编辑/保存按钮
const editButton = (vm, h, currentRow, index) => {
    return h('Button', {
        props: {
            type: 'primary',
            size: 'small',
            icon: currentRow.editting ? 'checkmark' : 'ios-compose'
        },
        style: {
            margin: '0 2px'
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
    });
};

//行删除按钮
const deleteButton = (vm, h, currentRow, index) => {
    if (currentRow.editting){
        return h('Button', {
            props: {
                type: 'warning',
                size: 'small',
                icon: 'close'
            },
            style: {
                margin: '0 2px'
            },
            on: {
                'click': () => {  //这是点击引发的事件
                        vm.edittingStore[index].saving = true;  //点击取消按钮之后，这行数据的保存状态才是true
                        vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));//编辑完成后的新的数据

                        let edittingRow = vm.edittingStore[index]; //当前正在编辑的该行的数据
    
                        edittingRow.editting = false;//编辑状态结束
                        edittingRow.saving = false;//保存状态也结束
    
                        vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore)); //因位saving和editting变了
                        //父组件@on-change的时候，可以用这两个参数
                        vm.$emit('on-change', vm.handleBackdata(vm.thisTableData), index);  
                        vm.$emit('input', vm.handleBackdata(vm.thisTableData)); //处理成后台需要的数据
                           
                }
            }
        });
    }else{
        return h('Poptip', {   //iview的气泡提示
            props: {
                confirm: true,
                title: '您确定要删除这条数据吗?',
                transfer: true
            },
            on: {  //点击ok触发删除
                'on-ok': () => {
                    vm.thisTableData.splice(index, 1).splice(index, 1);//从该数组中删除下标为index的数据，1表示只删除一条
                    vm.$emit('on-delete', vm.handleBackdata(vm.thisTableData), index);
                }
            }
        }, [
            h('Button', {
                style: {
                    margin: '0 2px'
                },
                props: {
                    placement: 'top', //气泡弹出的位置
                    type: 'error',
                    icon: 'trash-a',
                    size: 'small'
                }
            })
        ]);
    }

};

//列编辑按钮
const incellEditBtn = (vm, h, param) => {
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
};

//列保存按钮
const saveIncellEditBtn = (vm, h, param) => {
    return h('Poptip', {
        props: {
            confirm: true,
            title: '您确定编辑该列数据吗?',
            transfer: true
        },
        on: {
            'on-ok': () => {
                vm.edittingStore[param.index].edittingCell[param.column.key] = false;
                vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
                // vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                // vm.$emit('on-cell-change', vm.handleBackdata(vm.thisTableData), param.index, param.column.key);
            },
            'on-cancel' : ()=>{
                vm.edittingStore[param.index].edittingCell[param.column.key] = false;
                vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore));
            }
        }
    },[
        h('Button', {
            props: {
                placement: 'top',
                type: 'text',
                icon: 'checkmark'
            },
        })
    ]);
};




const tableCRUDButton = {
    axiosGet: axiosGet,
    selectUrl: selectUrl,
    editButton: editButton,
    deleteButton: deleteButton,
    incellEditBtn: incellEditBtn,
    saveIncellEditBtn: saveIncellEditBtn,
};

export default tableCRUDButton;