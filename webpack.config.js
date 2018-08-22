const webpack=require('webpack');

module.exports={
    entry:__dirname+"/app/main.js",
    output:{
        path:__dirname+"/",
        filename:"bundle-main.js"
    },
    module:{
        rules:[{
            test:/(\.js)$/,
            loader:"babel-loader",
            query:{
                presets:['react','es2015','stage-1'],
                plugins: [["import", { "libraryName": "antd", "style": "css" }]]
            },
            exclude:"/node_modules"
        }
    ]
    },
    devServer: {
        inline: true,
        port: 9080,
        open: true
        },
    externals:{
        'React':'react',
        'React-dom':'reactDom'
    }
}