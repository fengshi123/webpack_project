class CustomPlugin{
  constructor(doneCallback, failCallback){
     // 保存在创建插件实例时传入的回调函数
     this.doneCallback = doneCallback;
     this.failCallback = failCallback;
  }
  apply(compiler){
    // 成功完成一次完整的编译和输出流程时，会触发 done 事件
    compiler.plugin('done',(stats)=>{
      this.doneCallback(stats);
    })
    // 在编译和输出的流程中遇到异常时，会触发 failed 事件
    compiler.plugin('failed',(err)=>{
      this.failCallback(err);
    })
  }
}
module.exports = CustomPlugin;