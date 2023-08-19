<template>
    <!-- 动态改变宽度:style="{ width:$store.state.asideWidth }" -->
    <div class="f-menu" :style="{ width:$store.state.asideWidth }">
        <el-menu :default-active="defaultActive" unique-opened class="border-0" default-active="2" 
        @select="handleSelect" :collapse="isCollapse" :collapse-transition="false">
            <template v-for="(item, index) in asideMenu" :key="index">
                <!-- 如果有子菜单 -->
                <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
                    <!-- 一级菜单 -->
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <!-- 子菜单 -->
                    <el-menu-item v-for="(item2, index2) in item.child" :key="index2" :index="item2.frontpath">
                        <el-icon>
                            <component :is="item2.icon"></component>
                        </el-icon>
                        <span>{{ item2.name }}</span>
                    </el-menu-item>
                </el-sub-menu>
                <!-- 如果没有子菜单 -->
                <el-menu-item v-else index="item.frontpath">
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'

const store = useStore()
const router = useRouter()
const route = useRoute()

const defaultActive = ref(route.path)

const isCollapse = computed(()=>{
    return !(store.state.asideWidth == '250px')
})
const asideMenu = computed(()=>{
    return store.state.menus
})

const handleSelect =(e)=>{
    router.push(e)
}

</script>

<style>
.f-menu {
    transition: all 0.2s;
    top: 64px;
    bottom: 0px;
    left: 0px;
    overflow-y: auto;
    overflow-x: hidden;
    @apply shadow-md fixed bg-white
}
/* 取消滚动条 */
.f-menu::-webkit-scrollbar{
    width: 0px;
}
</style>