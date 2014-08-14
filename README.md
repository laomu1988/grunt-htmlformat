grunt-htmlformat
============

html格式化

### 功能描述
1.查找未关闭的标签，比如<div><li></div>中的li标签
2.格式化html文档，自动排版页面
3.格式化css,javascript文档

### grunt配置说明

      htmlformat: {
          test: {
            options:{
                  tab:2,//格式化时多少个宫格代替一个tab键
                  xhtml:false //是否按照xhtml来判定节点开关
            },
              files: [
                  {
                      //启用动态扩展
                      expand: true,
                      // css文件源的文件夹
                      cwd: 'html/',
                      // 匹配规则
                      src: ['*.html'],
                      //导出的网页存放目录
                      dest: 'tmp/',
                      // 导出的网页扩展名
                      ext: '.html'
                  }
              ]
          }
      }

### 特别注意
1. 假如没有修改扩展名，请不要将网页输出到原目录，否则将被覆盖，不能撤销操作
2. 程序是根据{和}来格式化css和js的，假如一行中最后一个字符是{，则下一行增加缩进，一行中第一个字符是}，则下一行减少缩进。编写时请遵守规范。

### 版本记录

`0.0.1` 格式化html
`0.0.2` 格式化css和html
