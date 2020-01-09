const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); 

const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({size:5});

const CustomPlugin = require('custom-plugin'); 

module.exports = {
  // JavaScript 执行入口文件
  entry: './main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  module:{
    rules:[
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test:/\.css$/,
        // use:['style-loader','css-loader']
        use:ExtractTextPlugin.extract({
          // use:['css-loader']
          use:['happypack/loader?id=css']
        }),
      },
      {
        test:/\.js/,
        use:['happypack/loader?id=babel']
      },
      {
        test:/\.js/,
        use:['custom-loader'],
        include:path.resolve(__dirname,'show')
      }
    ]
  },
  // resolve:{
  //   enforceExtension:true,
  //   enforceModuleExtension:false
  // },
  plugins:[
    new HappyPack({
      id:'babel',
      loaders:['babel-loader'],
      threadPool: happyThreadPool
    }
    ),
    new HappyPack({
      id:'css',
      loaders:['css-loader'],
      threadPool: happyThreadPool
    }
    ),
    new ExtractTextPlugin({
       // 从 .js 文件中提取出来的 .css 文件的名称
       filename:`[name]_[hash:8].css`
    }),
    new CustomPlugin(
     stats => {console.info('编译成功!')},
     err => {console.error('编译失败!')}
   ),
  ],
  devServer:{
    open: true,
    hot:true,
    https:true,
    compress:true
  },
  devtool:'none'
};