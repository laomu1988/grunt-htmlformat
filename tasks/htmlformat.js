var fs = require('fs');
module.exports = function (grunt) {
//格式化html文件
//查找未关闭的标签
//删除每一行前后多余空格
//判断后一行是否需要缩进

//不用关闭的标签<input,<hr,<br,<img
//代码匹配，css和js，行结尾有{则下一行增加缩进，开始位置有}则本行减少缩进




  "use strict";
  // Export the SpriteMaker function
  grunt.registerMultiTask('htmlformat', 'format html files', function () {
    var that = this,
      done = this.async(),
      //log = function(){};//
      log = console.log;//
    
    var options = this.options(
      {
        tab:2,
        xhtml:false
      }
    );
    var space = '';
    for(var i = 0;i<options.tab;i++){
      space += ' ';
    }
    var noNeedClose=['<input','<br','<hr','<img'];
    if(options.xhtml){
      noNeedClose=[];
    }
    var hasDelete = false;
    var myimport = function (file, callback) {
      //log("file\n");
      //log(file);
      try{
        var src = file.src[0];
        log("read file: "+src);
        var context = fs.readFileSync(src,'utf-8');
        var outdata = '';
        var lines = context.split("\n");
        var tabn = 0;
        var tabless = false;//是否是关闭节点部分</div>
        var i,j,k;
        var marks = [];
        var judge = delMarkStr(context);//.match(/(<\w+)|(<\/\s*\w+>)|(\/>)/g);//匹配开始标签和关闭标签<input,/>,</div>
 
        if(judge.length > 0){
          for(i = 0;i<judge.length;i++){
            if(isCloseMark(judge[i])){
              console.error("error: 未关闭的标签："+judge[i-1]);
              break;
            }
          }
        }
        if(lines){
          for(i = 0;i<lines.length;i++){
            var line = lines[i];
            line = line.replace(/(^\s*)|(\s*$)/, "");
            if(line.length === 0){
              continue;
            }
            judge = delMarkStr(line);
            var start = 0,end = 0;
            for(j = 0;j<judge.length;j++){
              if(isCloseMark(judge[j])){
                end += 1;
              }else{
                start += 1;
              }
            }
            if(line.charAt(0) === '}'){
              tabn -= 1;
            }
            if(line.substring(0,2)==='</'){
              tabn -= 1;
              tabless = true;
            }
            for(j = tabn;j>0;j--){
              line = space+line;
            }
            outdata +=line+'\n';
            if(line.charAt(line.length -2 ) === '{'){//以}结尾
              tabn += 1; 
              //log("{:"+line);
            }
            if(tabless){
              tabless = false;
              tabn += 1;
            }
            tabn += start - end;
          }
          outdata = outdata.substring(0,outdata.length-1);
        }else{
          outdata = context;
        }
        console.log("write to file:"+file.dest);
        fs.writeFileSync(file.dest,outdata,"utf-8");
        callback();
      }catch(err){
        throw err;
        callback();
      }
    };

    /*删除已经抵消的开始关闭标记，只留下剩余标签*/
    function delMarkStr(str){
      if(!str){
        return [];
      }
      var judge = str.match(/(<\w+)|(<\/\s*\w+>)|(\/>)/g);//匹配开始标签和关闭标签<input,/>,</div>
      if(judge){
        var len = judge.length;
        for(var j = judge.length -1;j>0;j--){
          var mark = judgeMark(judge[j-1],judge[j]);
          if(mark > 0){
            judge.splice(j-1,mark);
          }
        }
      }
      if(judge){
        return judge;
      }
      else{
        return [];
      }
    }

    //判断两个标签是否可以互相抵消，比如一个开始标签和一个关闭标签，将可以抵消
    function judgeMark(mark1,mark2){
      if(!mark1 || !mark2){
        return 0;
      }
      if(!mark1.match(/<\w+/)){
        return 0;
      }
      if(mark2 === '/>'){
        return 2;
      }

      if(mark2.substring(0,2) !== '</'){
        if(noNeedClose.indexOf(mark1)>=0){
          return 1;
        }
        return 0;
      }
      mark1 = mark1.match(/\w+/g);
      mark2 = mark2.match(/\w+/g);
      if(mark1 && mark2 && mark1[0] === mark2[0]){
        return 2;
      }
      return 0;
    }

    function isCloseMark(mark){
      if(mark === '/>'){
        return true;
      }
      if(mark.substring(0,2) === '</'){
        return true;
      }
      return false;
    }
    grunt.util.async.forEachSeries(this.files, myimport, function (err) {
      done();
    });

  });

};
