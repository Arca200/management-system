<template>
    <!-- 通过基础的 24 分栏，迅速简便地创建layout布局 -->
    <el-row class="login-container">
        <!-- 1左侧布局 -->
        <!-- lg和md是响应式布局 -->
        <el-col :lg="16" :md="12" class="left">
            <div>
                <div>Windi CSS</div>
                <div>如果你已经熟悉了Tailwind CSS,可以把 Windi CSS看作是按需供应的Tailwind替代方案,它为你提供了更快的加载体验,完美兼容Tailwind v2.0</div>
            </div>
        </el-col>

        <!-- 2右侧布局 -->
        <el-col :lg="8" :md="12" class="right">
            <!-- 2.1静态显示部分 -->
            <h2 class="title">欢迎回来</h2>
            <div>
                <span class="line"></span>
                <span>账号密码登录</span>
                <span class="line"></span>
            </div>
            <!-- 2.2输入信息部分 element-plus from表单,prop指定rules中的那个数据,model指明表单验证对象-->
            <!-- ref="formRef"是为了拿到el-form这个节点 -->
            <el-form ref="formRef" :rules="rules" :model="form" class="w-250px">
                <!-- 2.2.1用户名 -->
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="用户名">
                        <template #prefix>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <!-- 2.2.2密码 -->
                <el-form-item prop="password">
                    <!-- type="password"星号显示输入 show-password隐藏输入 -->
                    <el-input type="password" show-password v-model="form.password" placeholder="密码">
                        <!-- 插槽引入图标 -->
                        <template #prefix>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <!-- 2.2.3按钮 -->
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" class="w-250px" :loading="loading">登陆</el-button>
                </el-form-item>
            </el-form>

        </el-col>
    </el-row>
</template>

<script setup>
// reactive用于对象
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { toast } from '~/composables/ulti'

const router = useRouter()
const store = useStore()

const form = reactive({
    username: '',
    password: ''
})

//rules是一个数组对象，指明验证规则
const rules = {
    username: [
        {
            required: true,
            // 验证提示,用户名不能为空
            message: 'Please input Activity name',
            trigger: 'blur'
        },
        {
            min: 3,
            max: 5,
            message: 'Length should be 3 to 5',
            trigger: 'blur'
        },
    ],
    password: [
        {
            required: true,
            message: 'void',
        }
    ]
}

//取节点处理发送事件
const formRef = ref({})
//添加加载效果
let loading = ref(false)
//登陆的本质是发送axios请求，记录数据，然后页面跳转
const onSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            // 如果没有值
            return false
        }
        loading.value = true
        //登陆
        store.dispatch('login', form)
            .then(res => {
                toast('登陆成功')
                router.push('/')
            })

        loading.value = false
    })
}

//添加键盘监听
function onKeyUp(e) {
    if (e.key === 'Enter') {
        onSubmit()
    }
}
onMounted(() => {
    document.addEventListener('keyup', onKeyUp)
})
onBeforeUnmount(() => {
    document.removeEventListener('keyup', onKeyUp)
})
</script> 

<style scoped>
.login-container {
    @apply bg-indigo-500 min-h-screen
    /* 相当于style="min-height: 100vh"el-row的高度不小于100%的视窗高度 */
}

.login-container .left,
.login-container .right {
    @apply flex items-center justify-center
}

.right {
    @apply bg-light-50 flex-col
}

.left>div>div:first-child {
    @apply font-bold text-4xl text-light-50 mb-4
}

.left>div>div:last-child {
    @apply text-gray-200 text-sm
}

.right .title {
    @apply font-bold text-3xl text-gray-800
}

.right>div {
    @apply flex items-center justify-center text-gray-300 space-x-2 my-4
}

.right .line {
    @apply h-[1px] bg-gray-200 w-16
}</style>