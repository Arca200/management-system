<template>
    <div>
        <el-drawer v-model="showDrawer" :title="title" :size="size"
            :close-on-click-modal="false"
            :destory-on-close="destoryOnClose">
            <div class="formDrawer">  
                <div class="body">
                    <slot></slot>
                </div>
                <div class="btn">
                    <el-button type="primary" @click="submit" :loading="loading">{{ confirmText }}</el-button> 
                    <el-button type="default" @click="close">取消</el-button> 
                </div>
            </div>
      </el-drawer>      
    </div>
</template>

<script setup>
import { ref } from 'vue'

const showDrawer = ref(false)
const loading = ref(false)
const showloading = ()=>{
    loading.value=true
}
const closeloading = ()=>{
    loading.value=false
}
const props = defineProps(
    {
        title:String,
        size:{
            type:String,
            default:"45%"
        },
        destoryOnClose:{
            type:Boolean,
            default:false
        },
        confirmText:{
            type:String,
            default:'提交'
        }
    }
)

const open = ()=>showDrawer.value=true
const close = ()=>showDrawer.value=false

defineExpose({
    open,
    close,
    showloading,
    closeloading
})

const emit = defineEmits(['submit'])
const submit = ()=>{
    emit('submit')
}
</script>

<style>
.formDrawer{
    width: 100%;
    height: 100%;
    position: relative;
    @apply flex
}
.formDrawer .body{
    flex:1;
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom: 50px;
    overflow-y: auto;
}
.formDrawer .btn{
    height: 50px;
    @apply flex items-center mt-auto
}
</style>