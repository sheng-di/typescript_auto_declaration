# typescript 根据接口自动声明类型
## 简介
利用递归的方法，将一个`object`所有的子属性，输出为`typescript`支持的`interface`声明。
包括三种：
- 基本类型的
- 小程序中使用的
- 网页开发中使用的
## 使用
1、将函数绑定给一个全局变量，如小程序中就绑定给`wx`，网页中就绑定给`document`
```javascript
wx.getType = (data) => {
  if (typeof data === 'object') {
    if (typeof data.length !== 'undefined') {
      if (data.length > 0) {
        return `Array<${wx.getType(data[0])}>`
      } else {
        return 'Array<any>'
      }
    }
    const keys = Object.keys(data)
    if (keys.length === 0) {
      return 'object'
    }
    let a = Object.keys(data).map(v => {
      const type = wx.getType(data[v])
      return `${v}: ${type}`
    }).join(',\n')
    a = `{\n${a}\n}`
    return a
  } else {
    return typeof data
  }
}
```
2、开发的时候，将`network`中返回的数据存储为全局变量`temp1`，然后在`console`中执行`wx.getType`即可输出这段数据对应的声明。
具体的截图放在了[csdn](https://mp.csdn.net/mdeditor/102596090)
