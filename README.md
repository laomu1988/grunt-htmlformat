grunt-htmlformat
============

html格式化

### grunt配置说明

      htmlformat: {
          test: {
              options:{
                tab:4//设置tab代表空格数目
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
### html网页格式


### 特别注意
1. 假如没有修改扩展名，请不要将网页输出到原目录，否则将被覆盖，不能撤销操作

### 版本记录

`0.0.1` 格式化html文件
