# xq-confirm
基于Bootstrap5的Modal组件实现的确认提示框，支持确认按钮、取消按钮的回调，同时也可以自动确认和自动取消，不依赖Jquery库文件和Vue、React等框架技术。

## Install 安装

```bash
npm i xq-confirm
```

在代码中引入xq-confirm

```ts

import xqConfirm from 'xq-confirm';

```
配置项信息
```ts

{
    type: 'alert',//默认只提示，要有确认按钮请使用'confirm'
    size: 'modal-sm',
    position: 'modal-dialog-centered',
    title: '提示信息',//标题
    content: '您确认要进行操作吗?',//内容
    icon: 'info',//info信息，warn警告,danger危险
    confirmButton: '确认',
    cancelButton: '取消',
    confirmButtonClass: 'btn-primary',
    cancelButtonClass: 'btn-secondary',
    confirm:()=> {},//确认回调方法
    cancel:()=> {},//取消回调方法
    autoClose: false// confirm|3000表示3秒后自动确认，cancel|3000表示3秒后自动取消
}

```


1、默认调用(提示框)

```ts

xqConfirm({

})

```
2、自定义标题与内容

```ts

xqConfirm({
    'title':'自定义标题',
    'content':'自定义内容'
})

```

2、设置图标（info,warn,danger三种，也可以指定bootstrap-icon的一个图标样式
```ts

xqConfirm({
    icon:'info'//或者warn,error等，也可以指定bootstrap-icon，例如："bi bi-info-square link-primary"
})

```

3、自动确认（type:confirm为确认框）

```ts

xqConfirm({
    type:'confirm',
    autoClose:'confirm|3000'
})

```
4、自动取消

```ts

xqConfirm({
    type:'confirm',
    autoClose:'cancel|3000'
})

```

5、确认与取消的回调

```ts

xqConfirm({
    type:'confirm',
    confirm:function(){
        alert('点击了确认')
    },
    cancel:function(){
        alert('点击了取消')
    }
})

```

