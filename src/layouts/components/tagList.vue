<template>
    <div class="f-tag-list" :style="{ left: $store.state.asideWidth }">
        <el-tabs v-model="activeTab" type="card" class="flex-1" @tab-remove="removeTab" style="min-width: 100px;"
            @tab-change="changeTab">
            <!-- 父组件中添加closable子组件就会失效 -->
            <el-tab-pane :closable="item.path != '/'" v-for="item in tabList" :key="item.path" :label="item.title"
                :name="item.path">
            </el-tab-pane>
        </el-tabs>

        <span class="tag-btn">
            <el-dropdown @command="handleClose">
                <span class="el-dropdown-link">
                    <el-icon>
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="clearOther">关闭其他</el-dropdown-item>
                        <el-dropdown-item command="clearAll">全部关闭</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>
    </div>

    <div style="height: 44px;"></div>
</template>

<script setup>
import { useTabList } from '~/composables/useTabList.js'

const {
    activeTab, 
    tabList,
    changeTab,
    removeTab, 
    handleClose
} = useTabList()
</script>

<style scoped>
.f-tag-list {
    @apply fixed bg-gray-100 flex items-center;
    padding-left: 17px;
    padding-right: 20px;
    top: 66px;
    right: 0;
    height: 44px;
    z-index: 100;
    transition: all 0.2s
}

.tag-btn {
    @apply bg-white rounded ml-auto flex items-center justify-center px-2;
    height: 32px;
}

:deep(.el-tabs__header) {
    border: 0 !important;
    @apply mb-0
}

:deep(.el-tabs__nav) {
    @apply ;
    border: 0 !important;
    ;
}

:deep(.el-tabs__item) {
    @apply bg-white mx-1 rounded;
    border: 0 !important;
    height: 32px;
    line-height: 32px;
}

.el-tabs {
    --el-tabs-header-height: auto;
}

:deep(.el-tabs__nav-next),
:deep(.el-tabs__nav-prev) {
    line-height: 32px;
    height:
}

:deep(.is-disabled) {
    cursor: not-allowed;
    @apply text-gray-300
}
</style>