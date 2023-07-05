
## Vuex应用场景
>Vuex是基于Vue项目环境的状态管理。在Vue项目中，父子组件和兄弟组件传值给我们带来很多便捷，但是当多个组件嵌套，普通传值方法显得极为繁琐，并且很难维护。Vuex提供一个状态管理的平台和库，把全局需要共享的状态和数据放在VueX，任何组件都有权限调用并修改VueX的共享数据。
## 使用步骤
#### 1.安装VueX

``` javascript
npm install vuex --save
```

或者
``` javascript
yarn add vuex --save
```
#### 2. 引用VueX
在项目目录下新建一个store文件夹，创建index.js并引入Vuex和相应模块。

 ``` javascript
import Vue from 'vue'
import Vuex from 'vuex'
// 以下引入的是状态模块，仅是示例，根据实际项目情况而定
import shop from '@/modules/shop'
import payment from '@/modules/payment'
import news from '@/modules/news '
import workflow from '@/modules/workflow'
import notification from '@/modules/notification'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    shop,
    payment,
    news,
    workflow,
    notification 
  }
})
export default store
```
具体项目结构如图所示，仅作与参考
![在这里插入图片描述](https://img-blog.csdnimg.cn/42fc524279124b969ff5e572bb641148.png)
在main.js中引入
 ``` javascript
import store from '@/store/index'
const app = new Vue({
  store
})
```
## VueX五大核心概念
>State, Getter, Mutation, Action, Module
#### 1. State
State是VueX中用于存放数据的板块，类似于Vue单文件里面的data，允许全局访问。
在对应的JS文件中注册state
``` javascript
const state = {
  count: 1
}
```
Vue文件中访问State的数据
方法一：直接调用
``` javascript
<template>
  <div>
  {{ $store.state.count }}
  </div>
</template>
```
方法二：借助计算属性

``` javascript
<template>
  <div>
  {{ count }}
  </div>
</template>

<script>
export default {
  computed: {
    count () {
       return this.$store.state.count
    }
 }
}
</script>
```
方法三：利用辅助函数`mapState`
``` javascript
<template>
  <div>
  {{ count }}
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['count'])
  }
}
</script>
```
#### 2. Getter
有时候我们调用state数据，需要用到state的派生数据（例如过滤表格中的数据）
``` javascript
computed: {
  doneTodosCount () {
    return this.$store.state.todos.filter(todo => todo.done).length
  }
}
```
这样操作显得复杂，Getter就是State的计算属性，可以对State进行操作
``` javascript
const state = {
  count: 1
}

const getters = {
  getDoubleCount: (state) => state.count * 2
}
```
调用Getter写法
``` javascript
<template>
  <div>
  {{ $store.getters.getDoubleCount }}
  </div>
</template>
```
javascript中调用记得加`this`
``` javascript
<script>
export default {
  methods: {
    getDoubbleCount () {
      return this.$store.getters.getDoubleCount
    }
  }
}
</script>
```
Getter的第一个参数为State，Getter 也可以接受其他 getter 作为第二个参数：
``` javascript
<script>
const state = {
  count: 1
}

const getters = {
  getCount: (state) => state.count,
  getDoubleCount: (state, getters) => getters.count * 2
}
</script>
```
#### 3. Mutation
VueX是集中管理数据的平台，Mutation是对应的修改数据的方法
>Mutation更像是一个事件，有事件类型(type)和回调函数(handler)
``` javascript
const state = {
  count: 1
}

const getters = {
  getCount: state => state.count
}

const mutations = {
  setCount (state, n) {
    //这里setCount就是事件type，对应的回调函数如下
    state.count +=n
  },
}
```
调用Mutation
>`store.commit`的第一个参数对应哪个Mutation，第二个参数作为值传入该Mutation
``` javascript
<script>
export default {
  methods: {
    getDoubbleCount () {
      this.$store.commit('setCount', 10)
      //这里的10会作为第二个参数传入setCount
    }
  }
}
</script>
```
注意，`mutation的回调函数(handler)不能为异步函数`。
#### 4. Action
>Action 类似于 Mutation，不同在于：Action 提交的是 Mutation，而不是直接变更状态；并且Action可以包含任意异步操作

- 注册Action:
``` javascript
const state = {
  count: 1
}

const getters = {
  getCount: state => state.count
}

const mutations = {
  setCount: (state) => state.count
}

const action = {
  increment (context) {
    context.commit('setCount')
  }
}
```
注：这里的context是store实例对象，所以可以调用commit，也可以调用state和getters.
- 因为context是一个对象，也可以通过ES结构来书写
``` javascript
const action = {
  increment ({ context }) {
    commit('setCount')
  }
}
```
- 调用Action，通过`store.dispatch`触发
``` javascript
store.dispatch('setCount')
```
- Action跟Mutation的最大区别就是Action可以定义异步函数，而Mutation不行
``` javascript
const action = {
  increment ({ context }) {
    setTimeout(() => {
      commit('setCount')
     }, 1000)
  }
}
```
- `store.dispatch`支持多个参数

先在JS文件中声明
``` javascript
const mutations = {
  setCount (state, playLoad) {
    state.count += playLoad.count
  },
}

const action = {
  increment (context, count) {
    context.commit('setCount', conut)
  }
}
```
调用`dispatch`
``` javascript
// 以载荷形式分发
store.dispatch('setCount', {
  count: 10
})

// 以对象形式分发
store.dispatch({
  type: 'setCount',
  count: 10
})
```
#### 5. Module
> 当项目足够大时，Vuex的数据会变得冗余，庞大，为了方便管理，Module把VueX的数据分为不同的模块，每个模块都有独立的state，getter，mutation，action。

如图所示，modules文件夹下每一个JS文件都是单独的一个module模块
![在这里插入图片描述](https://img-blog.csdnimg.cn/42fc524279124b969ff5e572bb641148.png)
在单独的shop module模块下：
``` javascript
const shop = {
  state: () => ({
    count: 0
  }),
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },
  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}
```

index文件夹声明store实例
``` javascript
export default new Vuex.Store({
  state：{
  count: 100
  }，
  modules: {
  //上一段代码中的shop module文件
  shop
  }
})
```
如果在Vue文件中用`store.state`访问count属性
``` javascript
<template>
  <div>
    {{ $store.state.count }}
  </div>
</template>
//这里返回的count 等于100，访问的是store实例中的state
```
如果要访问shop module的count 属性，则需要增加module名：
``` javascript
<template>
  <div>
    {{ $store.state.shop.count }}
  </div>
</template>
//这里返回的count 等于0，访问的是shop模块中的state
```
>如果是访问module中的mutation方法，则会出现不同的情况。最好是不同的模块之间不要用相同的命名
``` javascript
<script>
export default {
  methods: {
    getDoubbleCount () {
      this.$store.commit('setCount')
      //如果其他模块中都有setCount方法，则所有的都会被调用
    }
  }
}
</script>
```
当然，遇到这种情况也可以添加 namespaced: true 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。例如：
``` javascript
const shop = {
  //调用时需要模块名为路径
  namespaced: true,
  state: () => ({
    count: 0
  }),
  //正确的调用方式：$store.commit('shop/increment')
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },
    //正确的调用方式：$store.getters['shop/doubleCount ']
  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}
```
## 总结
以上是关于Vuex的讲解，列举module的分类方法并不是唯一，也可以单独的把state, getter, action, mutation放入独立的js文件。Vuex帮助我们高效的解决了全局的数据传递，但是需要更加规范的分类，才能应对越来越冗余的数据。下一篇博客将会讲解如何进行Vuex数据持久化。
