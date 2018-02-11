<!--下拉框


        transfer  这个属性必须有，否则下拉框内容不会显示出来，而被掩盖到表格后面
        multipleState? selectModels: selectModel  三元表达式

        : key 值一定要注意  别重复!!!! 否则陷入无限循环的错.........

        注意各个属性值的位置和意义....

        
-->

<template>
    <Select ref="tableIview_select" v-model="multipleState? selectModels: selectModel" filterable transfer :multiple="multipleState" @on-change="selectChange" :placeholder="placeholderData">
        <Option v-for="item in selectList" :value="item.description" :key="item.description">{{ item.description }}</Option> 
    </Select>
</template>
<script>
    export default {
        name: 'table-select',
        props: {
            selectList: Array,
            multipleState: Boolean,
            placeholderData: String,
        },
        data () {
            return {
                selectModel: "", //单选
                selectModels: [],//多选
            }
        },
        methods: {
            selectChange (value) {
                console.log(value);
                this.$emit('select-onChange',value);   //注意这个! 父组件要这样用事件,后面是传进来的参数 !!!! 
            },
        },
        // beforeCreate: function () {
        //     this.$emit('initSelectData'); //实例被创造前触发该方法
        //     console.log("天呢啊啊");
        // }
    }
</script>