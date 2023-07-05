
## 一、配置
### 01 安装
```script
npm install moment
```
### 02 引入

``` javascript
const moment = require('moment')
// 或者
import moment from 'moment'
```

## 二、常用的moment方法
### 01 获取当前时间

``` javascript
// 不传入值，返回的则是当前时间
moment() // 返回的是一个对象，对象包含了当前的时间
moment().format() // 这样返回的才是时间，例如：2022-11-14T18:36:32+08:00
```

### 02 格式化时间
- 字符规则
![](https://img-blog.csdnimg.cn/6b8415c139e7446382316739650b0265.png)
![](https://img-blog.csdnimg.cn/81c15ac1b85743c48ce3f45098b3e941.png)

- 示例：
``` javascript
moment().format('YYYY-MM-DD')// 返回2022-11-15，因为moment()没传参，返回的是当前时间
```

- 格式化指定的时间（年月日）
``` javascript
moment('1998.12.25').format('YYYY-MM-DD')// 输出为1998-12-25
moment('1998.12.25').format('YYYY-MM-DDDD')// 输出为1998-12-359
moment('1998.12.25').format('YY-MM-DD')// 输出为98-12-25
moment('1998.12.25').format('YYYY-MM-DD-Q')// 输出为1998-12-25-4
moment('1998.12.25').format('YYYY-MM-Do')// 输出为1998-12-25th
moment('1998.12.25').format('YYYY-MMM-Do')// 输出为1998-Dec-25th
moment('1998.12.25').format('YYYY-MMMM-Do')// 输出为1998-December-25th
moment('1998.12.25').format('X')// 输出为914515200
moment('1998.12.25').format('x')// 输出为914515200000,毫秒时间戳
```
- 格式化指定的时间（时分秒）
``` javascript
moment(1318781876).format('HH:mm:ss')// 输出为14:19:41
moment(1318781876).format('hh:mm:ss')//  输出为02:19:41
moment(1318781876).format('HH:mm:ss a')// 输出为14:19:41 pm
moment(1318781876).format('HH:mm:ss A')//  输出为14:19:41 PM
```

### 03 转换时间戳
>有两种方式转换时间戳，`moment().valueOf()`转换为毫秒数和`moment.unix()`转换为秒数

``` javascript
moment().valueOf()// 返回当前时间的毫秒时间戳

// moment接收的是毫秒数，unix返回为秒数
moment(1318781876).unix()// 返回值1318781

//moment也能接收其他格式的时间，将之转换为时间戳
moment('2022/3/28').unix()// 返回1648396800
moment('2022/3/28').valueOf()// 返回1648396800000
```

### 04 get()获取时间
- 获取年份
``` javascript
moment().get('year') // 返回2022
```
- 获取月份
``` javascript
moment().get('month') // 返回0-11，假设当前12月，返回值就是11
```
- 获取日期
``` javascript
moment().get('date') // 返回当前月份的天数，11.17则返回17
```
- 获取时分秒
``` javascript
moment().get('hour');
moment().get('minute');
moment().get('second');
```
- 获取当月的天数
``` javascript
moment().daysInMonth()// 返回当前月份的天数
```

### 05 操作moment
#### add()
- 示例：
``` javascript
moment().add(7, 'days')// 在当前时间的基础上往后顺延7天，假设今天2022/11/17,返回的结果应是2022/11/24
// 另一种写法
moment().add(7, 'd')
// 链式写法
moment().add(7, 'days').add(1, 'months')
```
- 可选键位表
![](https://img-blog.csdnimg.cn/2ad98619ce564b1aac0186b3451ce384.png)

####  subtract()
- 与`add()`使用方法相同，键位也是一样
``` javascript
moment().subtract(7, 'days')
//或者
moment().subtract(7, 'd')
```

#### startOf
``` javascript
moment().startOf('year') //一年的最开始，例如：2022/1/1 00:00:00
moment().startOf('month') // 某个月的最开始 2022/11/01 00:00:00
moment().startOf('quarter') // 当前季度的开始，2022-10-01 00:00:00(当前11月)
moment().startOf('week') // 本周的第一天
moment().startOf('day') // 当天的0点
moment().startOf('date') //跟day一样，当天的0点
moment().startOf('hour') // 当前小时的最开始
moment().startOf('minute') // 当前分钟的最开始
moment().startOf('second') // 当前秒的最开始
```

####  endOf
- 跟 `startOf`同样的用法
``` javascript
moment().endOf('year') // 2022-12-31 23: 59: 59
```

###  06 比较moment(查询moment)
####  isBefore
- 查询某个时间是否在另一时间之前
``` javascript
// 第一个moment是否在before里的时间之前
moment('2022-11-17').isBefore('2022-11-18'); // 返回true
```
- `isBefore`接收第二个参数，作为比较的精度
``` javascript
// 两个时间只比较年份的先后
moment('2022-11-17').isBefore('2022-11-18', 'year'); // 返回false
moment('2021-11-17').isBefore('2022-11-18', 'year'); // 返回true
// 也可比较月份，日期，小时, 分钟，秒
moment('2022-10-17').isBefore('2022-11-18', 'month'); // 返回true
moment('2021-11-17').isBefore('2022-11-18', 'day'); // 返回true
moment('2022-11-17 17:53:24').isBefore('2022-11-17 18:53:24', 'hour'); // 返回true
moment('2022-11-17 17:54:24').isBefore('2022-11-17 18:53:24', 'minute'); // 返回false
moment('2022-11-17 17:53:23').isBefore('2022-11-17 18:53:24', 'second'); // 返回true
```

#### isSame
- 查询两个时间是否一致，用法跟`isBefore`一样，接收第二个参数作为比较精度
``` javascript
moment('2022-11-17').isSame('2022-11-17') // true
// 比较精度
moment('2021-11-17').isSame('2022-11-17', 'year');  // false
```
- 跟`isBefore`不一样的是，当接收第二个参数时，会比较精度之前的时间，例如：传入day为第二参数，会比较day之前的month和year，只有完全一样才会返回为true
``` javascript
moment('2021-11-17').isSame('2022-11-17', 'day'); //false
moment('2022-07-17').isSame('2022-11-17', 'day'); //false
```

#### isAfter
- 用于比较moment在某个时间之后，跟`isSame`一样，使用day为第二参数，将会检查年份、月份、日期。
``` javascript
moment('2021-11-19').isAfter('2021-11-17'); // true
moment('2022-07-18').isSame('2022-11-17', 'day'); //false
```

#### isSameOrBefore和isSameOrAfter
- `isSameOrBefore`判断是否一样或在某个时间之前，等同于`>=`和`<=`，第二参数会精准比较
``` javascript
moment('2022-10-20').isSameOrBefore('2021-12-31', 'year'); // false
```
- `isSameOrBefore`判断是否一样或在某个时间之后，第二参数会精准比较
``` javascript
moment('2022-10-20').isSameOrAfter('2023-12-31', 'year'); // false
```

#### isBetween
- `isBetween`接收两个时间参数作为范围，比较moment是否在这个范围之内
``` javascript
moment('2022-11-17').isBetween('2022-11-10', '2022-11-25'); // true
```
