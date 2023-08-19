<template>
    <el-card shadow="never" class="border-0">
        <template #header>
            <div class="flex justify-between items-center">
                <span class="text-sm">订单统计</span>
                <div>
                    <el-check-tag v-for="(item, index) in options" :key="index" :checked="current == item.value"
                        style="margin-right: 8px" @click="handleChose(item.value)">
                        {{ item.text }}
                    </el-check-tag>
                </div>
            </div>
        </template>
        <!-- card body -->
        <div ref="el" id="chart" style="width: 100%; height: 300px;">

        </div>
    </el-card>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { getStatistics3 } from '~/api/index'
import { useResizeObserver } from '@vueuse/core'

// 在挂起时才加载图标，防止加载时页面还没有渲染
let myChart= null
onMounted(()=>{
    let chartDom = document.getElementById('chart')
    // 可能没有权限,所以这里判断一下
    if(chartDom){
        myChart = echarts.init(chartDom)
        getData()
    }
})
//销毁实例
onBeforeUnmount(() => {
    if(myChart){
        echarts.dispose(myChart)
    }
})
function getData(){
    var option
    option = {
        //x轴
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        //y轴
        series: [
            {
                data: [],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
    };
    myChart.showLoading()
    getStatistics3(current.value)
    .then(res=>{
        option.xAxis.data=res.x
        option.series[0].data=res.y

        myChart.setOption(option)
    })
    .finally(()=>{
        myChart.hideLoading()
    })

}

function handleChose(p) {
    current.value = p
    getData()
}
const current = ref('week')
const options = [
    {
        text: 'month',
        value: 'month'
    },
    {
        text: 'week',
        value: 'week'
    },
    {
        text: 'hour',
        value: 'hour'
    }
]

const el = ref(null)
useResizeObserver(el, (entries) => myChart.resize())

</script>