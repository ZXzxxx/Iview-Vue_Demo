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

export const editInlineAndCellData = [
    {
        name: 'Aresn',
        sex: '男',
        work: "前端"
        // work: [
        //     {
        //         value:"前端",
        //         label:"前端",
        //     },
        //     {
        //         value:"后端",
        //         label:"后端",                
        //     }
        // ]
    },
    {
        name: 'Lison',
        sex: '男',
        work: "前端"
        // work: [
        //     {
        //         value:"前端",
        //         label:"前端",
        //     },
        //     {
        //         value:"后端",
        //         label:"后端",                
        //     }
        // ]
    },
    {
        name: 'lisa',
        sex: '女',
        work: "前端"
        // work: [
        //     {
        //         value:"前端",
        //         label:"前端",
        //     },
        //     {
        //         value:"后端",
        //         label:"后端",                
        //     }
        // ]
    }
];

export const showCurrentColumns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '姓名',
        align: 'center',
        key: 'name',
        width: 300,
        editable: true
    },
    {
        title: '性别',
        align: 'center',
        key: 'sex'
    },
    {
        title: '岗位',
        align: 'center',
        width: 300,
        key: 'work',
        editable: true
    }
];

const tableData = {
    editInlineAndCellColumn: editInlineAndCellColumn,
    editInlineAndCellData: editInlineAndCellData,
    showCurrentColumns: showCurrentColumns
};

export default tableData;
