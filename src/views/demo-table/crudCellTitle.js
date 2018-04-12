export const editInlineAndCellColumn = [
    {
        type: 'selection',
        width: 60,
        align: 'center'
    },
    {
        title: '序号',
        type: 'index',   //列类型
        align: 'center' //字体居中
    },
    {
        title: 'ID',
        align: 'center',
        key: 'id',
    },
    {
        title: '姓名',
        align: 'center',
        key: 'name', //对应列内容的字段名[和json一致]
        editable: true,  //可编辑
    },
    {
        title: '学号',
        align: 'center',
        key: 'no',
        editable: true,  //可编辑
        sortable: true,  //可排序
    },
    // {
    //     title: '教研室',
    //     align: 'center',
    //     key: 'school',
    //     editable: true,
    //     cellType: 'object',
    // },
    {
        title: '操作',
        align: 'center',
        key: 'handle',  // 定义handle关键字
        handle: ['edit', 'delete','add', 'cancel']
    }
];


const tableData = {
    editInlineAndCellColumn: editInlineAndCellColumn,
};

export default tableData;
