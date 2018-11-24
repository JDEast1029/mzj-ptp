# 说明

## 参数

1. `extraTitle` 大标题 (string);
2. `onlyOne` 是否为单选 (Boolean);
3. `disableArr` 禁止选择项 （array;
4. `paramInfo` 请求所需参数（obj);
5. `describe` 小标题 (string);
6. `category_name` 分类名称 (string);
7. `category_id` 分类id （string）;
8. `getDetail` 是否获取详细信息 （Boolean）;
9. `activeText` 按钮激活文案；(string)
10. `staticText` 按钮未激活文案；(string)
11. `disableText` 按钮不可点击文案文案；(string)
12. `title` 弹窗标题
13. `min` 最少选中项 默认为1 （init）;

## 用法

```js
import SelectMaterial from '@common/SelectMaterial/SelectMaterial';
...
    SelectMaterial.popup({
        ...obj
    }).then((res)=>{
        console.log('doing somestring')
    }).catch((error)=>{
        console.log('doing somestring')
    })
...
```