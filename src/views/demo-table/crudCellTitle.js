export const editInlineAndCellColumn = [
    {
        title: '序号',
        type: 'index',   //列类型
        align: 'center' //字体居中
    },
    {
        title: '姓名',
        align: 'center',
        key: 'name', //对应列内容的字段名[和json一致]
        editable: true,  //可编辑
        sortable: true,  //可排序
    },
    {
        title: '性别',
        align: 'center',
        key: 'sex',
    },
    {
        title: '岗位',
        align: 'center',
        key: 'work',
        editable: true,
        cellType: 'object',
    },
    {
        title: '操作',
        align: 'center',
        key: 'handle',  // 定义handle关键字
        handle: ['edit', 'delete']
    }
];


const tableData = {
    editInlineAndCellColumn: editInlineAndCellColumn,
};

export default tableData;
