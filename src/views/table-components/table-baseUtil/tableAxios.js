import axios from 'axios';
//全局定义axios字段
axios.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8'; 
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.delete['Content-Type'] = 'application/json;charset=UTF-8';
//get
const axiosGet = (url, componentVm) => {
    axios.get(url)
    .then(function(response){  
        if(response.status === 200){
            componentVm.tableDataList = response.data.rows;
            componentVm.pageTotals = response.data.total;
        }else{
            componentVm.$Message.error("数据显示失败");
        }
    })
    .catch(function(error){
        componentVm.$Message.error({
            content: error,
            duration: 20,  //至少 维持20秒.20秒不关. 自己关闭
            closable: true  //设为true这个框就可以自己关闭
        });
    }); 
};
//post
//put
const axiosPut = (url, componentVm, currentVal) => {     
    axios.put(url, currentVal)
    .then(function (response) {
        if(response.status === 200){
            componentVm.tableDataList = response.data.rows;
            componentVm.pageTotals = response.data.total;
            componentVm.$Message.success({
                content: '数据修改成功',
                duration: 5,
            });
        }else{
            componentVm.$Message.error("数据修改失败");
        } 
    })
    .catch(function (error) {
        componentVm.$Message.error({
            content: error,
            duration: 20,  //至少 维持20秒.20秒不关. 自己关闭
            closable: true  //设为true这个框就可以自己关闭
        });
    });
}
//delete   delete和put post不一样,注意一下
const axiosDelete = (url, componentVm, deleteVals) => {        //到时候要把表格数据再传进来一次
    axios.delete(url,{
         data: deleteVals    
    }
    )
    .then(function (response) {
        if(response.status === 200){
            componentVm.tableDataList = response.data.rows;
            componentVm.pageTotals = response.data.total;
            componentVm.$Message.success({
                content: '数据删除成功',
                duration: 5,
            });
        }else{
            componentVm.$Message.error("数据删除失败");
        } 
    })
    .catch(function (error) {
        componentVm.$Message.error({
            content: error,
            duration: 20,  //至少 维持20秒.20秒不关. 自己关闭
            closable: true  //设为true这个框就可以自己关闭
        });
    });
}

//获取下拉框的url
const selectUrl = (vm, selectName) => {
    let url = vm.allSelectUrls[selectName];
    return url; 
};

//行--编辑/保存按钮
const editButton = (vm, h, currentRow, index) => {
    return h('Button', {
        props: {
            type: 'primary',
            size: 'small',
            icon: currentRow.editting ? 'checkmark' : 'ios-compose'  //平时状态是编辑按钮。编辑状态变成保存按钮
        },
        style: {
            margin: '0 2px'
        },
        on: {
            'click': () => {  //这是点击引发的事件. editting为true时框框打开编辑中,为false时,编辑结束.关闭了框框.
                if (!currentRow.editting) {  //editting为false的时候,显示的是编辑按钮.此时是没有打开框框的.也就是说这是点击编辑按钮引发的事件
                    if (currentRow.edittingCell) { //如果该行有可编辑的列. 
                        for (let cellName in currentRow.edittingCell) {            
                            currentRow.edittingCell[cellName] = false;
                            vm.thisTableData[index].edittingCell[cellName] = false;
                        }
                    }
                    vm.thisTableData[index].editting = true;  //点击编辑按钮之后，这行数据的编辑状态变为true                    
                } else {  //editting为true的时候,显示的是保存按钮. 此时打开了框框.也就是说这是点击保存按钮引发的事件  
                    if (currentRow.adding) {      
                        delete vm.thisTableData[0].adding; //删掉adding属性                         
                        vm.thisTableData[index].editting = false;  //点击保存按钮之后, 这行数据的编辑状态变为false
                        let edittingRow = vm.thisTableData[index]; //当前正在编辑的该行的数据                                  
                        //父组件@on-change的时候，可以用这两个参数
                        vm.$emit('on-change', vm.handleObjectDataToBackData(edittingRow));  //应该由父组件做这件事  因为每个父组件传的url是不一样的
                    }else {                                 
                        vm.thisTableData[index].editting = false;  //点击保存按钮之后, 这行数据的编辑状态变为false
                        vm.thisTableData = JSON.parse(JSON.stringify(vm.thisTableData));//因为修改的数据保存在edittingStore里面呢,所以得重新赋值一下,然后才能得到当前最新数据,传给后台
            
                        let edittingRow = vm.thisTableData[index]; //当前正在编辑的该行的数据                                  
                        //父组件@on-change的时候，可以用这两个参数
                        vm.$emit('on-change', vm.handleObjectDataToBackData(edittingRow));  //应该由父组件做这件事  因为每个父组件传的url是不一样的
                    }
                }
            }
        }
    });
};

//行--删除/取消按钮
const deleteButton = (vm, h, currentRow, index) => {
    if (currentRow.editting){  //editting为true的时候,显示的是取消按钮. 此时打开了框框.
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
                'click': () => {  //这是点击编辑的取消按钮引发的事件                    
                    if (currentRow.adding) {
                        vm.value.splice(0, 1);
                        vm.thisTableData.splice(0, 1); //移除
                    }else {
                        vm.thisTableData[index].editting = false;  //点击取消按钮之后，这行数据的保存状态才是false                                 
                    }                 
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
                    let deleteRow = vm.thisTableData[index]; //当前正在编辑的该行的数据
                    vm.$emit('on-delete', vm.handleObjectDataToBackData(deleteRow));
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
                vm.thisTableData[param.index].edittingCell[param.column.key] = true;  
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
                vm.thisTableData[param.index].edittingCell[param.column.key] = false;
                let edittingRow = vm.thisTableData[param.index]; 
                vm.$emit('on-change', vm.handleObjectDataToBackData(edittingRow));
            },
            'on-cancel' : ()=>{
                vm.thisTableData[param.index].edittingCell[param.column.key] = false;
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
    axiosPut: axiosPut,
    axiosDelete: axiosDelete,
    selectUrl: selectUrl,
    editButton: editButton,
    deleteButton: deleteButton,
    incellEditBtn: incellEditBtn,
    saveIncellEditBtn: saveIncellEditBtn,
};

export default tableCRUDButton;