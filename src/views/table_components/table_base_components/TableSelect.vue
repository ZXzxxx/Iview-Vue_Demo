


<!--transfer: 这个属性必须有，否则下拉框内容不会显示出来，而被掩盖到表格后面。
multipleState? selectModels: selectModel  三元表达式
:label-in-value="true"  这样才能返回一个object
: key 值一定要注意  别重复!!!! 否则陷入无限循环的错.........

注意各个属性值的位置和意义....-->

<template>
    <Select v-model="multipleState? selectModels: selectModel"  
            filterable transfer :multiple="multipleState" :label-in-value="true"
            @on-change="selectChange" :placeholder="placeholderValue" 
            :clearable="!multipleState">  <!--单选情况下才可以清空-->
        <Option v-for="item in selectList" :value="item.id" :key="item.id+item.value" :label="item.value"></Option>  <!--默认是label值-->
    </Select>
</template>

<script>
import axios from 'axios';

    export default {
        name: 'table-select',
        props: {
            multipleState: Boolean,
            selectUrl: String,
            getValue: Object, //从后台得到的数据[单选]
            placeholderValue: String,
        },
        data () {
            return {
                selectList: [], //下拉框内容
                selectModel: "",//单选
                selectModels: [],//多选
            }
        },
        methods: {
            getSelectData () {
                axios.get(this.selectUrl)
                        .then(function(response){  
                            if(response.status == 200){
                                this.selectList = response.data;
                                //绑定值 v-model绑定的值必须是在data绑定value的值，否则不会显示。此处的select的value绑定的值是id，所以要.id。显示的是label值
                                if(this.placeholderValue == null) {  //查询的下拉框才有提示信息,此时也不需要默认值
                                    if(this.getValue == null){
                                        this.selectModel = this.selectList[0].id;
                                    } else {
                                        this.selectModel = this.getValue.id; 
                                    } 
                                }                              
                            } 
                        }.bind(this))
                        .catch(function(error){
                            this.$Message.error(error);
                        }.bind(this)); 
            },
            selectChange (valueObject) {
                if (valueObject.label == "") {
                    valueObject.label = this.selectList[0].value;  //默认值不光给个vaule, label也要设置上默认值
                }
                console.log(valueObject);
                this.$emit('select-onChange',valueObject);   // 父组件要这样用事件,后面是传过去的参数 
            },
        },
        created (){ 
            this.getSelectData();  //这个组件创建好之后，就获取到下拉框的内容
        },
    }
</script>