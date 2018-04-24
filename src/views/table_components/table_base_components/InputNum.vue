<!--数字输入框-->

<template>
    <InputNumber :max="maxNum" :min="minNum" v-model="inputNumVal"></InputNumber>
</template>
<script>
    export default {
        props: {
            maxNum: {
                type: Number,
                default: 10
            },  // 传进来的值
            minNum: {
                type: Number,
                default: 1
            }
        },
        data () {
            return {
                inputNumVal: 1
            }
        }
    }
</script>