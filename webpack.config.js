const path=require("path"); //node js dizin işlemleri yapıyor

module.exports={
    mode: 'development',
    entry: './src/index.js',
    output:{
        path: path.resolve(__dirname, "dist"),
        filename: "bundleed_index.js"
    },
    devServer:{
        contentBase:path.resolve(__dirname, "dist"),
        historyApiFallback: true //Route için
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/             
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
            },
        ]
    }
}