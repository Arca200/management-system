import { ref, reactive } from 'vue'
import { showModel, toast } from '~/composables/ulti'
import { logout, updatepassword } from '~/api/manager'
import { removeToken } from '~/composables/auth'
import { useRouter } from 'vue-router'
import { useFullscreen } from '@vueuse/core'
import FormDrawer from '~/components/FormDrawer.vue'
import store from '~/store'

export function useRepassword(){
    const router = useRouter()
    const formDrawerRef = ref(null) 
    const form = reactive({
        oldpassword: '',
        password: '',
        repassword:''
    })
    const rules = {
        oldpassword:[
            { 
                required: true, 
                message: '必填',  
            }
        ],
        password:[
            {
                required: true, 
                message: '必填', 
            }
        ],
        repassword:[
            {
                required: true, 
                message: '必填', 
            }
        ]
    }
    const formRef = ref({})
    const onSubmit = () => {
        formRef.value.validate((valid)=>{
            if(!valid){
                return false
            }
            formDrawerRef.value.showloading()
            updatepassword(form)
            .then(res=>{
                toast('修改成功')
                logout()
                .then((res)=>{
                    removeToken()
                    router.push('/login')
                    toast('已注销')
                })
            })
            .finally(()=>{
                formDrawerRef.value.closeloading()
                }
            )
        })
    }
    return {
        formDrawerRef,
        form,
        rules,
        formRef,
        onSubmit
    }
}

export function uselogout(){
    const router = useRouter()
    function handellogout(){
        showModel('确认退出吗?').then(() => {
                logout() 
                .finally((res)=>{
                    removeToken()
                    store.dispatch('logout')
                    router.push('/login')
                    toast('已注销')
                })
            })
    }
    return{
        handellogout
    }
}