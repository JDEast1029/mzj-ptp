# 说明

## 参数

1. `onlyOne` 是否为单选 (Boolean);
2. `disableArr` 禁止选择项 （array;
3. `paramInfo` 请求所需参数（obj);
4. `category_name` 分类名称 (string);
5. `title` 弹窗标题 (string);
6. `getDetail` 是否获取详细信息 （Boolean）;
7. `activeText` 按钮激活文案；(string);
8. `staticText` 按钮未激活文案；(string);
9. `disableText` 按钮不可点击文案文案；(string);
10. `min` 最少选中项 默认为0 （init);

## 用法

```js
import SelectCategory from '@common/SelectCategory/SelectCategory';
...
    SelectCategory.popup({
        ...obj
    }).then((res)=>{
        console.log('doing somestring')
    }).catch((error)=>{
        console.log('doing somestring')
    })
...
```
