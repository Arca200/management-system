<template>
    <el-container class="bg-white rounded" :style="{ height: (h + 'px') }">
        <!-- 头部 -->
        <el-header class="image-header">
            <el-button type="primary" size="small" @click="handleOpenCreate">
                新增图片分类
            </el-button>

            <el-button type="primary" size="small" @click="handleOpenUpload">
                上传图片
            </el-button>
        </el-header>
        <el-container>
            <!-- 左侧 -->
            <ImageAside ref="ImageAsideRef" @change="handleAsideChange"></ImageAside>
            <!-- 右侧 -->
            <ImageMain ref="ImageMainRef"></ImageMain>
        </el-container>

    </el-container>
</template> 

<script setup>
import ImageAside from '~/components/ImageAside.vue'
import ImageMain from '~/components/ImageMain.vue'
import { ref } from 'vue';
const windowHeight = window.innerHeight || document.body.clientHeight
// 64是头部，44是laglist，40是padding的长度
const h = windowHeight - 64 - 44 - 40

const ImageMainRef = ref(null)
const ImageAsideRef = ref(null)
//为啥要写在箭头函数里面
const handleOpenCreate = ()=>ImageAsideRef.value.handleCreate()
const handleAsideChange =(id)=>{
    ImageMainRef.value.loadData(id)
}
const handleOpenUpload = ()=>{
    ImageMainRef.value.openUploadFile()
}
</script>

<style scoped>
/* 打开scoped可以看到引用情况 */
.image-header {
    border-bottom: 1px solid #eeeeee;
    @apply flex items-center
}
</style>