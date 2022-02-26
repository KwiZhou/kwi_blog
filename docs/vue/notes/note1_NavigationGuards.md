---
title: vue-router导航守卫
date: 2022-1-2
sidebar: 'auto'
categories:
 - Vue
tags:
 - vue-router
---
## 守卫分类（3类）：
1.全局守卫：	在路由配置上定义
2.路由独享守卫：在路由配置上定义
3.组件内守卫：	在组件内部定义
​

## 全局守卫（2个卫士持有1把钩子🪝）：
### 1.beforeEach：全局前置守卫，接受（to,from,next）3个参数
to表示往哪里去
from表示当前要离开在的路由
next()控制放不放行？，往哪里放行？
next有4种方法：
1.next()此守卫放行，但是能不能去往其他路由，还要看别的守卫是否也放行。
2.next(fasle)此守卫不放行，即中断当前导航，即使用户手动点击后退按钮也会重置到当前所在的路由。
3.next(' ')可以自己往next中传递路由，也就是可以决定守卫往哪里的路由放行。
4.next(error) 往next中传递一个Error实例，此守卫不放行，且error会被传递给router.onError()
```javascript
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```
注：next只能被严格调用一次，除非在if else等逻辑路径不重叠的情况下能被调用多次
### 2.beforeResolve:全局解析守卫（to,from,next）
用处：在 beforeRouteEnter 调用之后，导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后调用
### 3.afterEach：全局后置钩子（to,from）
已经进入目标路由了，所以没有next（）参数，
用处：类似于控制跳转后滚动条回到顶部
```javascript
router.afterEach((to, from) => {  
    // 跳转之后滚动条回到顶部  
    window.scrollTo(0,0);
});
```


# 路由独享守卫
beforeEnter:和beforeEach一样接受3个参数，直接在路由配置处定义
```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```


# 组件内守卫（3个）
均接受3个参数(to, from, next) 
### 1.beforeRouteEnter :		
1.无法获取this，因为此时组件还没有被创立，但是可以通过往next传入回调
方式来访问this，⚠️注意：beforeRouteEnter是唯一一个可以往next里面传入回调的守卫。
2.在渲染该组件的对应路由被confirm 前调用。
### 2.beforeRouteUpdate：	
1.能获取this
                       2.对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。即Foo组件被复用时，调用beforeRouteUpdate
                       3.此钩子调用后才调用beforeResolve全局解析守卫，因为在此之前beforeRouteEnter组件还没有被创建，而beforeResolve需要组件被解析之后才能调用。
### 3.beforeRouteLeave：
1.可以获取this，离开组件时候对应路由时候使用。
2.用途：通常用来禁止用户在还未保存修改前突然离开
```javascript
beforeRouteLeave (to, from, next) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
```


## 完整导航解析流程

1. 导航被触发。
1. 在失活的组件里调用 beforeRouteLeave 守卫。
1. 调用全局的 beforeEach 守卫。
1. 在重用的组件里调用 beforeRouteUpdate 守卫。
1. 在路由配置里调用 beforeEnter。
1. 解析异步路由组件。
1. 在被激活的组件里调用 beforeRouteEnter。
1. 调用全局的 beforeResolve 守卫 (2.5+)。
1. 导航被确认。
1. 调用全局的 afterEach 钩子。
1. 触发 DOM 更新。
1. 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

​

官方文档链接：[https://router.vuejs.org/zh/guide/advanced/navigation-guards.html](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)

