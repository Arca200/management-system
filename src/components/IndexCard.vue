<template>
    <el-card shadow="never" class="border-0 mb-18px">
        <template #header>
            <div class="flex justify-between">
                <span class="text-sm">{{ title }}</span>
                <el-tag type="danger" effect="light">
                    {{ tip }}
                </el-tag>
            </div>
        </template>

        <el-row :gutter="20">
            <el-col :span="6" :offset="0" v-for="(item,index) in btns" :key="index">
                <el-card shadow="hover" class="bg-light-400 border-0">
                    <div class="flex flex-col items-center justify-between">
                        <span class="text-xl mb-2">{{ item.value }}</span>
                        <span class="text-xs text-gray-500">{{ item.label }}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        
    </el-card>
</template>

<script setup>
defineProps({
    title:String,
    tip:String,
    btns:Array
})
</script>