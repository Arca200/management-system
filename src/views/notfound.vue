<template>
    <el-row>
      <el-col :sm="12" :lg="6">
        <el-result
          icon="error"
          title="Error Tip"
          sub-title="Please follow the instructions"
        >
          <template #extra>
            <el-button type="primary" @click="back">Back</el-button>
          </template>
        </el-result>
      </el-col>
    </el-row>
  </template>
  
  <script setup>
    import { useRouter } from 'vue-router'

    const router = useRouter()
    function back(){
      router.back()
    }
  </script>