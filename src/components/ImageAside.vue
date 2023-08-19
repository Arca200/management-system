<template>
    <el-aside width="220px" class="iamge-aside" v-loading="loading">
        <div class="top">
            <AsideList :active="activeId == item.id" v-for="(item, index) in list" :key="index"
                @click="handleChangeActiveId(item.id)"
                @edit="handleEdit(item)"
                @delete="handleDelete(item.id)">
                <!-- 下面的内容放在插槽里 -->
                {{ item.name }}
            </AsideList>
        </div>
        <!-- 分页按钮 -->
        <div class="bottom">
            <el-pagination background layout="prev, next" 
            :total="total" :current-page="currentPage" :page-size="limit"
            @current-change="getData"/>
        </div>
    </el-aside>

    <FormDrawer :title="drawTitle" ref="formDrawerRef" @submit="handleSubmit">
        <el-form :model="form" ref="formRef" :rules="rules"
        label-width="80px" :inline="false">
        <!-- prop指定规则rules -->
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="排序" prop="order">
                <el-input-number v-model="form.order" :min="0" :max="1000"/>
            </el-form-item>
        </el-form>
    </FormDrawer>
</template>

<script setup>
import AsideList from './components-item/AsideList.vue'
import { 
    getImageClassList,
    createImageClass,
    updateImageClass,
    deleteImageClass
} from '~/api/image_class.js'
import { ref, reactive, computed }  from 'vue'
import FormDrawer from './FormDrawer.vue'
import { toast } from '../composables/ulti'

//记录被编辑的id
const editId=ref(0)
const drawTitle=computed(()=>editId.value?'修改':'新增')
const formDrawerRef = ref(null)
//点击 新增图片分类 按钮后初始化form并打开新增页面
const handleCreate = ()=>{
    editId.value=0,
    form.name='',
    form.order=50,
    formDrawerRef.value.open()
}

defineExpose({
    handleCreate
})

const form = reactive({
    name:'',
    order:50
})
const rules = {
    name:[{
        required:true,
        message:'图库分类不能为空',
        trigger:'blur'
    }]
}
const formRef=ref(null)
const handleSubmit = ()=>{
    formRef.value.validate((valid)=>{
        if(!valid) return
        
        formDrawerRef.value.showloading()
        //根据editId是否为0来判断是新增还是更新
        const fun = editId.value?updateImageClass(editId.value,form):createImageClass(form)
        
        fun
        .then(res=>{
            // toast(drawTitle.value+'成功')
            if(editId.value){
                // 修改要刷新当前页
                getData(currentPage.value)
                toast('修改成功')
            }
            else{
                // 新增要加载第一页
                getData(1)
                toast('新增成功')
            }
            //关闭formDrawer
            formDrawerRef.value.close()
        })
        .finally(()=>{
            formDrawerRef.value.closeloading()
        })
    })
}

//编辑方法,点击之后打开修改页面,并且自动将当前数据填充进去
const handleEdit=(i)=>{
    //记录被编辑的id
    editId.value=i.id
    form.name = i.name
    form.order = i.order
    formDrawerRef.value.open()
}
const handleDelete=(id)=>{
    deleteImageClass(id)
    .then(res=>{
        toast('删除成功')
        getData()
    })
}


//加载动画
const loading = ref(false)
//接收数据
const list = ref([])

//分页，后台中一共有两页,第一页有10个条目,第二页有三个条目
const currentPage=ref(1)
const total=ref(0) //所有页数的总条目数
const limit = ref(10) //每页最多显示
//获取数据的方法,p表示加载的页码    
function getData(p=null) {
    if(typeof p =="number"){
        currentPage.value=p
    }

    loading.value = true
    getImageClassList(currentPage.value)
        .then(res => {

            total.value=res.totalCount
            //接收数据
            list.value = res.list
            //默认激活第一个
            let item = list.value[0]
            if (item) {
                handleChangeActiveId(item.id) 
            }
        })
        .finally(() => {
            loading.value = false
        })
}
getData()

//记录激活的数据
const activeId = ref(0)
const emit = defineEmits(['change'])
//选中图库分类ID
function handleChangeActiveId(id){
    activeId.value=id
    emit('change',id)
}
</script>

<style scoped>
/* 打开scoped可以看到引用情况 */
.iamge-aside {
    border-right: 1px solid #eeeeee;
    /* 为了实现滚动 */
    position: relative;
}

.iamge-aside .top {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    /* 翻页 */
    overflow-y: auto;
}

.iamge-aside .bottom {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    height: 50px;
    @apply flex items-center justify-center
}
</style>