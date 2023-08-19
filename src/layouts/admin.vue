<template>
  <el-container>
    <el-header>
      <!-- 组件的命名一定要符合规范,否则组件标签会失效 -->
      <Header />
    </el-header>

    <el-container>
      <el-aside :width="$store.state.asideWidth">
        <Menu></Menu>
      </el-aside>
      <el-main>
        <tagList />
        <router-view v-slot="{ Component }">
          <!-- 最多缓存10个 -->
          <transition name="fade">
            <keep-alive :max="10">
              <component :is="Component"></component>
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Header from './components/FHeader.vue'
import Menu from './components/FMenu.vue'
import tagList from './components/tagList.vue'
</script>

<style>
/* 这里必须要加点我也不知道为什么,不应该是标签选择器吗? */
.el-aside {
  transition: all 0.2s;
}
.fade-enter-from{
  opacity: 0;
}
.fade-enter-to{
  opacity: 1;
}
.fade-leave-from{
  opacity: 1;
}
.fade-leave-to{
  opacity: 0;
}
.fade-enter-active,.fade-leave-active{
  transition: all 0.3s;
}
/* 保证丝滑 */
.fade-enter-active{
  transition-delay: 0.3s;
}
</style>