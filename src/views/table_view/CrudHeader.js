export const crudHeader = [
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
        width: '0px',
        align: 'center',
        key: 'id',
        render: (h, params) => {
            return h('div', {
                    style: {
                       display: false 
                    }
                });
        }
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
        sortable: 'custom',  //远程排序
    },
    {
        title: '教研室',
        align: 'center',
        key: 'school',
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


export default crudHeader;
