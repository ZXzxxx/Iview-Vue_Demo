


<!--transfer: 这个属性必须有，否则下拉框内容不会显示出来，而被掩盖到表格后面。
multipleState? selectModels: selectModel  三元表达式
:label-in-value="true"  这样才能返回一个object
: key 值一定要注意  别重复!!!! 否则陷入无限循环的错.........
注意各个属性值的位置和意义....-->


<template>
    <Select v-model="multipleState? selectModels: selectModel" filterable transfer :multiple="multipleState" :label-in-value="true" @on-change="selectChange" >
        <Option v-for="item in selectList" :value="item.value" :key="item.value">{{ item.value }}</Option> 
    </Select>
</template>

<script>
import axios from 'axios';

    export default {
        name: 'table-select',
        props: {
            multipleState: Boolean,
            selectUrl: String
        },
        data () {
            return {
                selectList: [], //下拉框内容
                selectModel: "", //单选
                selectModels: [],//多选
            }
        },
        methods: {
            getSelectData () {
                console.log("下拉框触及")
                axios.get(this.selectUrl)
                        .then(function(response){  
                            if(response.status == 200){
                                this.selectList = response.data;
                            } 
                        }.bind(this))
                        .catch(function(error){
                            alert(error);
                        });   
            },
            selectChange (value) {
                console.log(value);
                this.$emit('select-onChange',value);   // 父组件要这样用事件,后面是传过去的参数 
            },
        },
        created (){ 
            this.getSelectData();  //获取到下拉框的内容
        },
    }
</script>