// Render 函数
// 传入两个参数，第一个是 h---也就是createElement，第二个为对象param
// 对象包含 row、column 和 index，分别指当前行数据，当前列数据，当前行索引



//引入单文件组件
import tableSelect from '../base-components/tableSelect';
import tableInputNum from '../base-components/inputNum';

//获取相应的render元素
const tableEles = (vm, h, param, item) => {
    switch (item.cellType){
        case "object":
            return h('Col', //div也行
                [
                    rowSelect(vm, h, param, item),
                ]);
            break;
        default:
            return h('div',
                [
                    rowInput(vm, h, param, item)
                ]
            );                                  
    };   
}

//单选下拉框
const rowSelect = (vm, h, param, item) => {
    return h(tableSelect, {
        props: {
            multipleState: false, //单选
            selectUrl: vm.allSelectUrls[item.key]    //下拉框URL                 
        },
        // domProps: {
        //     value:vm.edittingStore[param.index][param.column.key].toString(), //双向绑定的value要写在domProps里面
        // },
        on: {
            'select-onChange' (value) {
                let key = param.column.key;
                if(vm.edittingStore[param.index].editting == true){ 
                    vm.edittingStore[param.index][key] = value; //下拉框选中值变化时，当前选中的值也变化         
                }

            },
        }
    });
};

//Input框
const rowInput = (vm, h, param, item) => {
    return h('Input', {
        props: {
            type: 'text',
            value: vm.edittingStore[param.index][item.key] //框里要显示着值
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
};

//列数字选择器
const rowInputNum = (vm, h, param, item) => {
    return h(tableInputNum, {
        props: {
            maxNum: 20,
            minNum: 5
        },
    });
};



export default tableEles;