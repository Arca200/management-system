import { ElNotification, ElMessageBox, ElMessage } from 'element-plus'
import nProgress from 'nprogress'

export function toast(message, type = 'success') {
  ElNotification({
    message,
    type,
    dangerouslyUseHTMLString: true,
    duration: 1000
  })
}

export function showModel(content = '确认要注销账号吗', title = '警告', type = 'warning') {
  return ElMessageBox.confirm(
    content,
    title,
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type,
    }
  )
  //   .then(() => {
  //     ElMessage({
  //       type: 'success',
  //       message: '已注销',
  //     })
  //   })
  //   .catch(() => {
  //     ElMessage({
  //       type: 'info',
  //       message: '注销失败',
  //     })
  //   })
}

//显示全屏loading
export function showFullloading() {
  nProgress.start()
}

//关闭全屏loading
export function hiddenFullloading() {
  nProgress.done()
}
//弹出输入框
export function showPrompt(tip, value = '') {
  return ElMessageBox.prompt(tip, '', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputValue: value
  })
}