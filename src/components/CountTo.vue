<template>
    {{ d.num.toFixed(0) }}
</template>

<script setup>
import { reactive } from 'vue'
import gsap from 'gsap'

const props = defineProps({
    value:{
        type:Number,
        default:0
    }
})

const d = reactive({
    num: 0
})

function NumAnimate(){
    // 将d的num在duration的时间变为props.value
    gsap.to(d,{
        duration:0.5,
        num:props.value
    })
}

NumAnimate()

</script>