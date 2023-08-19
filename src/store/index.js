import { createStore } from 'vuex'
import { login, getInfo } from '~/api/manager'
import { setToken, removeToken } from '../composables/auth'

export default createStore({
    state () {
      return {
        user:{
          
        },
        // 侧边宽度,因为展开/收起侧边的功能设计到menu组件、header组件还有admin组件,比较复杂,所以放在vuex中处理
        asideWidth:"250px",
        menus:[
          
        ],
        ruleNames:[]
      }
    },
    mutations:{
      // 设置用户信息
      SET_USERINFO(state,user){
        state.user=user
      },
      //展开/收起侧边
      handleAsideWidth(state){
        state.asideWidth = state.asideWidth == "250px" ? "64px" : "250px"
      },
      SET_MENUS(state,menus){
        state.menus=menus
      },
      SET_RULENAMES(state,ruleNames){
        state.ruleNames=ruleNames
      }
    },
    actions:{
      // 解构获取{username,password}
      login({commit},{username,password}){
        return new Promise((resolve,reject)=>{
          login(username,password)
          .then(res=>{
            setToken(res.token)
            resolve(res)
          })
          .catch(err=>{
            reject(err)
          })
        })
      },
      getInfo({commit}){
        return new Promise((resolve,reject)=>{
          getInfo()
          .then(res=>{  
              commit('SET_USERINFO',res)
              commit('SET_MENUS',res.menus)
              commit('SET_RULENAMES',res.ruleNames)
              resolve(res)
          })
          .catch(err=>{
              reject(err)
          })
        })
      },
      logout({commit}){
              removeToken()
              commit('SET_USERINFO',{})
      }
    }
  })