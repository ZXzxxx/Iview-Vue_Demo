1. 传递的参数：
    columnsList     存有表头的数组
    editIncell      是否可以进行单列编辑
    value           表格的具体数据内容  ----- 没有editting...那三个属性
2. 自己的数据：
    thisTableData   表格里面的数据
    edittingStore   暂时存放修改的数据--中间变量
3. 暂时性的变量：
    init()里面的：
    vm              当前组件
    editableCell    可编辑的表头列
    cloneData       克隆value--表格里面的数据
    res             给每个item添加了editting、edittingCell属性的数据集合。
    isEditting      该数据是编辑数据???
    editting        属性--true/false
    edittingCell    Object--存可编辑的列的编辑状态--true或false
    currentRow      当前行
    currentRowData  当前行数据
    children        一个空集合,放按钮事件
    edittingRow     当前之正在编辑的行










