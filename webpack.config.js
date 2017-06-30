var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var srcDir = path.resolve(process.cwd(), 'src');
console.log(srcDir)

//获取多页面的每个入口文件，用于配置中的entry
function getEntry() {
    var jsPath = path.resolve(srcDir, 'js');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        console.log(matchs);
        if (matchs) {
            files[matchs[1]] = path.resolve(srcDir, 'js', item);
        }
    });
    console.log(JSON.stringify(files));
    return files;
}

module.exports = {
    cache: true,
    devtool: "#source-map",
    entry: getEntry(),
    output: {
        path: path.join(__dirname, "dist/js/"),
        publicPath: "dist/js/",
        filename: "[name].js",
        chunkFilename: "[chunkhash].js"
    },
    resolve: {
        alias: {
            jquery: srcDir + "/lib/jquery.min.js",
            // core: srcDir + "/js/core",
            // ui: srcDir + "/js/ui"
        }
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new CommonsChunkPlugin('common.js'),
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};