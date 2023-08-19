<template>
    <div class="header">
        <span class="logo">
            <el-icon class="text-4xl"><SwitchFilled /></el-icon>
            管理系统
        </span>

        <el-tooltip effect="dark" content="展开" placement="bottom-start">
            <el-icon class="icon-btn" @click="$store.commit('handleAsideWidth')">
                <Fold v-if="$store.state.asideWidth=='250px'"/>
                <Expand v-else/>
            </el-icon>
        </el-tooltip>
        <el-tooltip effect="dark" content="刷新" placement="bottom-start" @click="reload">
            <el-icon class="icon-btn" @click="reload"><Refresh /></el-icon>
        </el-tooltip>

        <div class="header-right">
            <!-- v-if必须写在外面 -->
            <el-tooltip v-if="!isFullscreen" effect="dark" content="全屏" placement="bottom-start">
                <el-icon class="icon-btn" @click="toggle"><FullScreen /></el-icon>
            </el-tooltip>

            <el-tooltip v-if ="isFullscreen" effect="dark" content="退出全屏" placement="bottom-start">
                <el-icon class="icon-btn" @click="toggle"><Aim /></el-icon>
            </el-tooltip>
            
            <el-dropdown class="dropdown" @command="commandhandler">
                <span class="flex justify-center items-center text-light-50">
                    <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar" />
                    {{ $store.state.user.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="rePassWord">修改密码</el-dropdown-item>
                            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
            </el-dropdown>
        </div>
    </div>
<!-- <div>
    <el-drawer
        v-model="drawer"
        title="修改密码"
        :append-to-body="true"
      >
        <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">

            <el-form-item prop="oldpassword" label="旧密码">
                <el-input type="password" show-password v-model="form.oldpassword"
                    Arca="password星号显示输入 show-password隐藏输入">
                </el-input>
            </el-form-item>

            <el-form-item prop="password" label="新密码">
                <el-input type="passwosrd" show-password v-model="form.password">
                </el-input>
            </el-form-item>

            <el-form-item prop="repassword" label="确认密码">
                <el-input type="password" show-password v-model="form.repassword">
                </el-input>
            </el-form-item>

            <el-form-item Arca="提交按钮">
                <el-button type="primary" @click="onSubmit" :loading="loading">提交</el-button> 
            </el-form-item>
        </el-form>
      </el-drawer> 
</div> -->
<FormDrawer ref="formDrawerRef" title="修改密码" destoryOnClose
    @submit="onSubmit">
    <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">

        <el-form-item prop="oldpassword" label="旧密码">
            <el-input type="password" show-password v-model="form.oldpassword"
                Arca="password星号显示输入 show-password隐藏输入">
            </el-input>
        </el-form-item>

        <el-form-item prop="password" label="新密码">
            <el-input type="password" show-password v-model="form.password">
            </el-input>
        </el-form-item>

        <el-form-item prop="repassword" label="确认密码">
            <el-input type="password" show-password v-model="form.repassword">
            </el-input>
        </el-form-item>
    </el-form>
</FormDrawer>
</template>

<script setup>
    import { useFullscreen } from '@vueuse/core'
    import FormDrawer from '~/components/FormDrawer.vue'
    import { useRepassword, uselogout } from '~/composables/useManager'
    const { isFullscreen, enter, exit, toggle } = useFullscreen()
    
    const {
            formDrawerRef,
            form,
            rules,
            formRef,
            onSubmit
    } = useRepassword()
    const {
        handellogout
    } = uselogout()
    //刷新   
    const reload = ()=>location.reload()
    //把修改密码相关的函数和数据封装在一个函数中,然后return出来，解构接收,现在放在了composables/useManager中
    // function handellogout(){
    //     showModel('确认退出吗?').then(() => {
    //             logout() 
    //             .finally((res)=>{
    //                 removeToken()
    //                 store.dispatch('logout')
    //                 router.push('/login')
    //                 toast('已注销')
    //             })
    //         })
    // }
    console.log()
    //把修改密码相关的函数和数据封装在一个函数中,然后return出来，解构接收,现在放在了composables/useManager中
    // function useRepassword(){
    //     const formDrawerRef = ref(null) 
    //     const form = reactive({
    //         oldpassword: '',
    //         password: '',
    //         repassword:''
    //     })
    //     const rules = {
    //         oldpassword:[
    //             { 
    //                 required: true, 
    //                 message: '必填',  
    //             }
    //         ],
    //         password:[
    //             {
    //                 required: true, 
    //                 message: '必填', 
    //             }
    //         ],
    //         repassword:[
    //             {
    //                 required: true, 
    //                 message: '必填', 
    //             }
    //         ]
    //     }
    //     const formRef = ref({})
    //     const onSubmit = () => {
    //         formRef.value.validate((valid)=>{
    //             if(!valid){
    //                 return false
    //             }
    //             formDrawerRef.value.showloading()
    //             updatepassword(form)
    //             .then(res=>{
    //                 toast('修改成功')
    //                 logout()
    //                 .then((res)=>{
    //                     removeToken()
    //                     router.push('/login')
    //                     toast('已注销')
    //                 })
    //             })
    //             .finally(()=>{
    //                 formDrawerRef.value.closeloading()
    //                 }
    //             )
    //         })
    //     }
    //     return {
    //         formDrawerRef,
    //         form,
    //         rules,
    //         formRef,
    //         onSubmit
    //     }
    // }

    const commandhandler = (c)=>{
        switch(c){
            case 'logout':
                handellogout()
                break
            case 'rePassWord':
                formDrawerRef.value.open()
                break
        }
     }    
</script>

<style scoped>
.header{
    @apply flex bg-indigo-600 text-light-50 fixed top-0 left-0 right-0 items-center font-thin;
     height:64px;
     z-index: 1000;
}
.header-right{
    @apply ml-auto flex justify-center items-center
}
.logo{
    @apply flex w-[250px] justify-center items-center text-3xl
}
.icon-btn{
    @apply flex w-[42px] h-[64px] justify-center items-center;
    cursor: pointer;
}
.icon-btn:hover{
    @apply bg-indigo-700
}
.dropdown{
    height: 64px;
    cursor: pointer;
    @apply flex justify-center items-center mx-5
}
</style>