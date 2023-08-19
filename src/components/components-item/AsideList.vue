<template>
    <div class="aside-list" :class="{ 'active': active }">
        <span class="truncate">
            <slot />
        </span>
        <!-- text有必要,应为外层是弹性布局，所以ml-auto可以顶过去 -->
        <!-- 通过emit来通知父组件 -->
        <el-button class="ml-auto px-1" text type="primary" size="small" @click="$emit('edit')">
            <el-icon :size="12">
                <Edit />
            </el-icon>
        </el-button>

        <!-- 加了一个确认框的删除按钮,将el-button的@click事件转移到el-popconfirm的@confirm中 -->
        <el-popconfirm title="确定删除吗?" confirm-button-text="确认"
        cancel-button-text="取消" @confirm="$emit('delete')">
            <template #reference>
                <el-button class="px-1" text type="primary" size="small" @click="">
                    <el-icon :size="12">
                        <Close />
                    </el-icon>
                </el-button>
            </template>
        </el-popconfirm>

    </div>
</template>

<script setup>
defineProps({
    active: {
        type: Boolean,
        default: false
    }
})

defineEmits(['edit', 'delete'])
</script>

<style scoped>
/* 打开scoped可以看到引用情况 */
.aside-list {
    border-bottom: 1px solid #eeeeee;
    cursor: pointer;
    @apply flex items-center justify-center p-3 text-sm text-gray-600;
}

/* 被选中或激活时 */
.aside-list:hover,
.active {
    @apply bg-blue-50
}
</style>