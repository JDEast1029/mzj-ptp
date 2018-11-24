# 说明

## 参数

1. `onlyOne` 是否为单选 (Boolean);
2. `disableArr` 禁止选择项 （array;
3. `paramInfo` 请求所需参数（obj);
4. `describe` 小标题 (string);
5. `getDetail` 是否获取详细信息 （Boolean）;
6. `activeText` 按钮激活文案；(string);
7. `staticText` 按钮未激活文案；(string);
8. `disableText` 按钮不可点击文案文案；(string);
9. `title` 弹窗标题 （string）;
10. `min` 最少的选中个数 ，默认1 (init);

## 用法

```js
import SelectAgent from '@common/SelectAgent/SelectAgent';
...
    SelectAgent.popup({
        ...obj
    }).then((res)=>{
        console.log('doing somestring')
    }).catch((error)=>{
        console.log('doing somestring')
    })
...
```
