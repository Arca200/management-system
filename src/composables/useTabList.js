import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate, useRouter } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'

export function useTabList() {
    const route = useRoute()
    const router = useRouter()
    const cookie = useCookies()
    let tabIndex = 2
    const activeTab = ref(route.fullPath)
    const tabList = ref([
        {
            title: '后台首页',
            path: '/'
        }
    ])

    function changeTab(t) {
        router.push(t)
        activeTab.value = t
    }

    function addTab(tab) {
        if (tabList.value.findIndex(t => t.path == tab.path) == -1) {
            tabList.value.push(tab)
        }
        cookie.set('tabList', tabList.value)
    }
    onBeforeRouteUpdate((to) => {
        activeTab.value = to.path
        addTab({
            title: to.meta.title,
            path: to.path
        })
    })
    //刷新不改变导航栏
    function initTabList() {
        const tab = cookie.get('tabList')
        if (tab) {
            tabList.value = tab
        }
    }
    initTabList()

    // const addTab = (targetName) => {
    //     const newTabName = `${++tabIndex}`
    //     tabList.value.push({
    //         title: 'New Tab',
    //         name: newTabName,
    //         content: 'New Tab content',
    //     })
    //     activeTab.value = newTabName
    // }
    const removeTab = (t) => {
        let tabs = tabList.value
        let a = activeTab.value
        if (a == t) {
            tabs.forEach((tab, index) => {
                if (tab.path == t) {
                    const nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        a = nextTab.path
                    }
                }
            })
        }
        activeTab.value = a
        tabList.value = tabList.value.filter(tab => tab.path != t)
        cookie.set('tabList', tabList.value)
    }

    const handleClose = (c) => {
        if (c == 'clearAll') {
            // 切换回首页
            activeTab.value = '/'
            // 过滤cookie只保留首页
            tabList.value = [
                {
                    title: '后台首页',
                    path: '/'
                }
            ]
        } else if (c == 'clearOther') {
            // 过滤cookie只保留首页和当前
            tabList.value = tabList.value.filter(tab => tab.path == '/' ||
                tab.path == activeTab.value)
        }
        cookie.set('tabList', tabList.value)
    }
    return{
        activeTab,
        tabList,
        changeTab,
        removeTab,
        handleClose
    }
}
