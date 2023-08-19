import axios from "~/axios.js"

export function getImageClassList(page){
    return axios.get('/admin/image_class/'+page)
}
//data是发送axios请求的参数
export function createImageClass(data){
    return axios.post('/admin/image_class',data)
}

export function updateImageClass(id,data){
    return axios.post('/admin/image_class/'+id,data)
}

export function deleteImageClass(id){
    return axios.post('/admin/image_class/'+id+'/delete')
}