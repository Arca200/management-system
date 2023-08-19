<script setup>

</script>

<template>
  <router-view></router-view>
</template>

<style>
/* 这里就不可以加scoped了 */
body{
  @apply bg-gray-100
}
/* 进度条 */
#nprogress .bar {
  background: #f9fbfc;
  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
}
/* 全局滚动条 */
::-webkit-scrollbar{
  width: 4px;
  height: 6px;
}
/* 边角部分 */
::-webkit-scrollbar-corner{
  display: block;
}
/* 小方块部分 */
::-webkit-scrollbar-thumb{
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-track{
  border-right-color: transparent;
  border-left-color: transparent;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
