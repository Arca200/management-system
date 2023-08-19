<template>
    <el-main class="iamge-main" v-loading="loading">
        <div class="top p-3">
            <el-row :gutter="10">
                <el-col :span="6" :offset="0" v-for="(item, index) in list" :key="index">
                    <el-card shadow="hover" class="relative mb-3" :body-style="{ 'padding': 0 }"
                    :class="{'border-blue-500':item.checked}">
                        <el-image :src="item.url" fit="cover" :lazy="true" class="w-full h-[150px]"
                            :preview-src-list="[item.url]" :initial-index="0">
                        </el-image>
                        <div class="image-title">{{ item.name }}</div>
                        <div class="flex justify-center items-center p-2">

                            <el-checkbox v-model="item.checked" @change="handleChooseChange(item)"/>

                            <el-button type="primary" size="small" @click="handleEdit(item)" text>重命名</el-button>

                            <el-popconfirm title="确定删除吗?" confirm-button-text="确认" cancel-button-text="取消"
                                @confirm="handleDelete(item)">
                                <template #reference>
                                    <el-button class="!m-0" type="primary" size="small" text>删除</el-button>
                                </template>
                            </el-popconfirm>

                        </div>
                    </el-card>
                </el-col>
            </el-row>

        </div>
        <!-- 分页按钮 -->
        <div class="bottom">
            <el-pagination background layout="prev, pager,next" :total="total" :current-page="currentPage"
                :page-size="limit" @current-change="getData" />
        </div>
    </el-main>


    <!-- 上传 -->
    <el-drawer v-model="drawer" title="上传图片">
        <UploadFile :data="{image_class_id}" @success="handleUpload"></UploadFile>
    </el-drawer>
</template>

<script setup>
import {
    getImageList,
    updateImage,
    deleteImage
} from '~/api/image.js'
import { ref, computed } from 'vue'
import {
    showPrompt,
    toast
} from '~/composables/ulti.js'
import UploadFile from '~/components/UploadFile.vue'

//控制弹窗
const drawer = ref(false)
const openUploadFile = ()=>drawer.value=true
//加载动画
const loading = ref(false)
//接收数据
const list = ref([])
const currentPage = ref(1)
const total = ref(0) //所有页数的总条目数
const limit = ref(10) //每页最多显示

const image_class_id = ref(0)

function getData(p = null) {
    if (typeof p == "number") {
        currentPage.value = p
    }

    loading.value = true

    getImageList(image_class_id.value, currentPage.value)
        .then(res => {

            total.value = res.totalCount
            //接收数据
            list.value = res.list.map(o=>{
                o.checked=false
                return o
            })
        })
        .finally(() => {
            loading.value = false
        })
}
//不能在这里调用
// getData()
//根据分类id重新加载图片列表
const loadData = (id) => {
    currentPage.value = 1
    image_class_id.value = id
    getData()
}

defineExpose({
    loadData,
    openUploadFile
})

const handleEdit = (item) => {
    showPrompt('重命名', item.name)
        .then(({ value }) => {
            loading.value = true
            updateImage(item.id, value)
                .then(res => {
                    toast('修改成功')
                    //修改成功刷新页面
                    getData()
                })
                .finally(() => {
                    loading.value = false
                })
        })
}

const handleDelete = (item) => {
    deleteImage([item.id])
        .then(res => {
            toast('删除成功')
            getData()
        })
}

const handleUpload = ()=>{
    drawer.value=false
    getData(currentPage.value)
}

const emit = defineEmits(['choose'])

const checkedImage = computed(()=>list.value.filter(o=>o.checked))
const handleChooseChange=(item)=>{
    if(item.checked && checkedImage.value.length>1){
        item.checked=false
         return toast(`最多只能选择一张`,'error')
    }
    emit('choose',checkedImage.value)
}
</script>

<style scoped>
.iamge-main {
    position: relative;
}

.iamge-main .top {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    /* 翻页 */
    overflow-y: auto;
}

.iamge-main .bottom {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    height: 50px;
    @apply flex items-center justify-center
}

.image-title {
    position: absolute;
    top: 122px;
    left: -1px;
    right: -1px;
    @apply text-sm truncate text-gray-100 bg-opacity-50 bg-gray-800 px-2 py-1
}
</style>