export const editInlineAndCellColumn = [
    {
        title: '序号',
        type: 'index',   //列类型
        width: 80, //宽度
        align: 'center' //字体居中
    },
    {
        title: '姓名',
        align: 'center',
        key: 'name', //对应列内容的字段名[和json一致]
        width: 300,
        editable: true,  //可编辑
        sortable: true,  //可排序
        // filters: [
        //     {
        //         label: 'Greater than 4000',
        //         value: 1
        //     },
        //     {
        //         label: 'Less than 4000',
        //         value: 2
        //     }
        // ],
        // filterMultiple: false,
        // filterMethod (value, row) {
        //     if (value === 1) {
        //         return row.show > 4000;
        //     } else if (value === 2) {
        //         return row.show < 4000;
        //     }
        // }
    },
    {
        title: '性别',
        width: 80, //宽度
        align: 'center',
        key: 'sex'
    },
    {
        title: '岗位',
        align: 'center',
        width: 300,
        key: 'work',
        editable: true,
        cellType: 'object',
        // render: function(h, params) {
        //     return h('div',
        //        this.row.work[description]);
        // }
    },
    {
        title: '操作',
        align: 'center',
        width: 200,
        key: 'handle',  // 定义handle关键字
        handle: ['edit', 'delete']
    }
];


const tableData = {
    editInlineAndCellColumn: editInlineAndCellColumn,
};

export default tableData;
