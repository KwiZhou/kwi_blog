---
title: 二叉树搜索树基础
date: 2022-1-25
sidebar: 'auto'
categories:
 - Javascript
tags:
 - 二叉树
 - BST
---
## 树的概念
![image.png](https://cdn.nlark.com/yuque/0/2022/png/21949136/1643284298267-2a4a77ca-224a-4cbe-ac87-c2b6f64bc89d.png#clientId=ubf65d061-1563-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=247&id=u9e5a91fe&margin=%5Bobject%20Object%5D&name=image.png&originHeight=247&originWidth=451&originalType=binary&ratio=1&rotation=0&showTitle=false&size=60053&status=done&style=none&taskId=u357cae72-77e1-46da-a7c9-b593a47ff84&title=&width=451)

- 深度：以3为例，深度为3
- 高度：高度为所有节点深度的最大值，上图的树高度为3
- 内部节点:至少有一个子节点的节点叫做内部节点
## 二叉搜索树（BST）

- 定义：左侧节点存储比父节点小的值，右侧节点存储比父节点大的值的树（左小右大）。注意：BST 左小右大的特性是指 父节点的值要比左子树的**所有**节点都更大，要比右子树的**所有**节点都小
- 代码实现
```javascript
class Node {
    constructor(key) {
        this.key= key
        this.left = null
        this.right = null
    }
}
class BST {
    constructor() {
        this.root = null//根节点
        this.size= 0
    }
    //插入一个新的键
    insert(key) {
        if (this.root == null) {
            this.root = new Node(key)//Node会自动初始化left和right指针为null
        } else {
            this.insertNode(this.root, key)//调用辅助函数来实现
        }
    }
    //insertNode辅助函数，通过递归来查找插入位置并插入新键
    insertNode(node, key) {
        //判断输入的key和当前节点的大小关系来决定左路查找还是右路查找
        //当前key小于当前节点那就左路查找（左小右大）
        if (key<node.key) {
            //左路查找
            if (node.left == null) {
                node.left = new Node(key)
            } else {
                this.insertNode(node.left, key)
            }
        } else {
            //右路查找
            if (node.right == null) {
                node.right = new Node(key)
            } else {
                this.insertNode(node.right, key)
            }
        }
    }
    
    //返回最大值，一个二叉树搜索树的最大值，在最右侧节点
    max() {
        return this.maxNode(this.root)
    }
    maxNode(node) {
        let current=node
        while(current!=null&&current.right!=null){
            current=current.right
        }
        return current
    }
    //返回最小值，一个二叉树搜索树的最小值，在最左侧节点
    min() {
        return this.minNode(this.root)
    }
    minNode(node) {
        let current = node
        while (current != null && current.left != null) {
            current = current.left
        }
        return current
    }
    //搜索特定的值
    search(key){
        return this.searchNode(this.root,key)
    }
    searchNode(node,key){
        //没有找到返回false
        if(node.key==null){
            return false
        }
        if(key<node.key){
            //key小于节点那就左路查找
            this.searchNode(node.left,key)
        }else if(key>node.key){
            //key大于节点那就右路查找
            this.searchNode(node.right,key)
        }else{
            //不大于不等于那就是等于，key=node.key
            return true
        }
    }
    //移除某个键
    remove(key){
        this.root=this.removeNode(this.root,key)
    }
    removeNode(node,key){
        if(node==null)return null
        if(key<node.key){
            node.left=this.removeNode(node.left,key)
            return node
        }else if(key>node.key){
            node.right=this.removeNode(node.right,key)
            return node
        }else{
            //所要删除的节点被查找到
            //删除需要分为3种情况
            //第一种：此节点没有子节点
            if(node.left==null&&node.right==null){
                node=null
                return node
            }
            //第二种：此节点有一个子节点,那么删除后直接拼接上就行了
            if(node.left==null){
                node=node.right
                return node
            }else if(node.right==null){
                node=node.left
                return node
            }
            //第三种：是最复杂的情况，此节点有两个子节点
            //删除了这个节点后，如何填补这个node的空缺呢？就是找到被删除节点的继承者
            //也就是被删节点右子树的最小值，将其移动到空缺位置
            //移动时候要删除继承者原先的node，那就由涉及到了递归调用removeNode()
            const aux=this.minNode(node.right)
            node.key=aux.key
            node.right=this.removeNode(node.right,aux.key)
            return node 
        }
    }
}

```

- 树的遍历-广度遍历
   - 递归实现，中，先，后序遍历
```javascript
let traversal=function(root){
    if(root){
      //  console.log(root);//先序遍历
        traversal(root.left)
      //  console.log(root);//中序遍历
        traversal(root.right)
      //  console.log(root);//后序遍历
    }
}
```

   - 迭代实现
      - 先序遍历（根左右），可用于打印树的结构

![image.png](https://cdn.nlark.com/yuque/0/2022/png/21949136/1643284757955-d317dbb0-ea5b-4501-80ee-747309378df9.png#clientId=ubf65d061-1563-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=199&id=J5TXj&margin=%5Bobject%20Object%5D&name=image.png&originHeight=199&originWidth=292&originalType=binary&ratio=1&rotation=0&showTitle=false&size=35022&status=done&style=none&taskId=u5ad288fd-51ee-4d4a-a7b0-e17b6c7b30b&title=&width=292)
```javascript
function pre(root){
    if(root){
        let stack=[]
        stack.push(root)
        while (stack.length>0){
            //更新root指向
            root=stack.pop()
            //根 左 右
            console.log(root);
            //栈是后进后出，所以先把右边push进栈，但实际是先访问左边，符合根-左-右
            if(root.right){
                stack.push(root.right)
            }
            if(root.left){
                stack.push(root.left)
            }
        }
    }
}
```

      - 中序遍历（左根右），可用于排序

![image.png](https://cdn.nlark.com/yuque/0/2022/png/21949136/1643284814619-33f8d445-c101-4ecc-8b68-e1e71948cc5d.png#clientId=ubf65d061-1563-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=176&id=u5cd0ee61&margin=%5Bobject%20Object%5D&name=image.png&originHeight=176&originWidth=289&originalType=binary&ratio=1&rotation=0&showTitle=false&size=38659&status=done&style=none&taskId=u1987fd18-e906-4752-9775-23cb4c2e9d0&title=&width=289)
```javascript
function mid(root) {
    if(root){
        let stack = []
        while (stack.length > 0 || root) {
            //首先应该先把最左边节点遍历到底依次 push 进栈
            if (root) {
                stack.push(root)
                root = root.left
            } else {
            //当左边没有节点时，就打印栈顶元素，然后寻找右节点
            // 对于最左边的叶节点来说，可以把它看成是两个 null 节点的父节点
            // 左边打印不出东西就把父节点拿出来打印，然后再看右节点
                root = stack.pop()
                console.log(root);
                root = root.right
            }
        }
    }
}
```


      - 后序遍历（左右根），可用于先操作子节点，再操作父节点的场景

![image.png](https://cdn.nlark.com/yuque/0/2022/png/21949136/1643284856131-720ee1fd-50a8-4fd3-a2de-4d02d62b0fac.png#clientId=ubf65d061-1563-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=182&id=ufddc4eee&margin=%5Bobject%20Object%5D&name=image.png&originHeight=182&originWidth=296&originalType=binary&ratio=1&rotation=0&showTitle=false&size=39310&status=done&style=none&taskId=u3e7a12f4-5d81-4488-af37-4871d3c9408&title=&width=296)
```javascript
function pos(root){
    if(root){
        let stack1=[],stack2=[]
        // 后序遍历是先左再右最后根
        // 所以对于一个栈来说，应该先push根节点
        // 然后push右节点，最后push左节点
        // 但是stack1，必须先push左，再push右，这样stack2，才会先接受右，再接受左
        // 最终出栈时候就是先左再根再右
        stack1.push(root)
        while(stack1.length>0){
            root=stack1.pop()
            stack2.push(root)
            if(root.left){
                stack1.push(root.left)
            }
            if(root.right) {
                stack1.push(root.right);
            }
            //依次打印Stack2
            while (stack2.length > 0) {
                console.log(s2.pop());
            }
        }
    }
}

```

- 树的遍历-广度遍历（一层一层遍历下来）
```javascript
breadthSearch() {
  if (!this.root) return null
  let q = new Queue()
  // 将根节点推入队列，先进先出
  q.enQueue(this.root)
  // 循环判断队列是否为空，为空
  // 代表树遍历完毕
  while (!q.isEmpty()) {
    // 将队首推出，并判断是否有左右子树
    let n = q.deQueue()
    console.log(n.value)
    if (n.left) q.enQueue(n.left)
    if (n.right) q.enQueue(n.right)
  }
}
```
