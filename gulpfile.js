var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    md5 = require('gulp-md5-plus'),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    spriter = require('gulp-css-spriter'),
    base64 = require('gulp-css-base64'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js'),
    browserSync = require('browser-sync'),
    plumber = require('gulp-plumber'),
    runSequence = require('run-sequence')
    yargs = require('yargs').argv

var host = {
    ip: '172.16.33.130',
    path: 'dist/',
    port: 3000,
    html: 'index.html'
};

var jsSrc = 'src/js/*.js'
var sassSrc = 'src/sass/**/*.scss'
var imgSrc = 'src/img'
var comSrc = 'src/components/*.inc'
var htmlSrc = 'src/html/*.html'

//将图片拷贝到目标目录
gulp.task('copy:img', function (done) {
    gulp.src(['src/img/**/*']).pipe(gulp.dest('dist/img')).on('end', done);
});

//压缩合并css, css中既有自己写的.sass, 也有引入第三方库的.css
gulp.task('sassmin', function (done) {
    return sass(sassSrc, {style: 'compressed'})
        .on('error', sass.logError)
        .pipe(autoprefixer({
            browsers: ['last 5 versions', 'Android >= 2.0'],
                cascade: true,
                remove: true
            })
        )
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/css/'))
});

//将js加上10位md5,并修改html中的引用路径，该动作依赖build-js
gulp.task('md5:js', ['build-js'], function (done) {
    gulp.src('dist/js/*.js')
        .pipe(md5(10, 'dist/html/*.html'))
        .pipe(gulp.dest('dist/js'))
        .on('end', done);
});

//将css加上10位md5，并修改html中的引用路径，该动作依赖sprite
gulp.task('md5:css', ['sprite'], function (done) {
    gulp.src('dist/css/*.css')
        .pipe(md5(10, 'dist/html/*.html'))
        .pipe(gulp.dest('dist/css'))
        .on('end', done)
});

// 生成lib目录
gulp.task('lib:js', function(done){
    gulp.src('src/lib/*.js')
        .pipe(gulp.dest('dist/lib'))
        .on('end', done)
})

//用于在html文件中直接include文件
gulp.task('fileinclude', function (done) {
    gulp.src(['src/html/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist/html'))
        .on('end', done)
});

//雪碧图操作，应该先拷贝图片并压缩合并css
gulp.task('sprite', ['copy:img', 'sassmin'], function (done) {
    var timestamp = +new Date();
    gulp.src('dist/css/style.min.css')
        .pipe(spriter({
            spriteSheet: 'dist/img/spritesheet' + timestamp + '.png',
            pathToSpriteSheetFromCSS: '../img/spritesheet' + timestamp + '.png',
            spritesmithOptions: {
                padding: 10
            }
        }))
        .pipe(base64())
        .pipe(cssmin())
        .pipe(plumber())
        .pipe(gulp.dest('dist/css'))
        .on('end', done)
})

gulp.task('clean', function (done) {
    return del(['./dist'], done)
})

var myDevConfig = Object.create(webpackConfig);

var devCompiler = webpack(myDevConfig);

//引用webpack对js进行操作
gulp.task("build-js", ['fileinclude'], function(callback) {
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-js", err)
        gutil.log("[webpack:build-js]", stats.toString({
            colors: true
        }))
        callback()
    })
})

//文件变化监听
gulp.task('change-watch', ['build-js', 'sprite'], browserSync.reload)

//发布
gulp.task('publish', ['md5:css', 'md5:js', 'lib:js'])

//开发流, 先完成清理dist文件夹的任务, 然后再同步执行工作流
gulp.task('dev', ['clean'], function(){
    gulp.start('copy:img', 'fileinclude', 'sassmin', 'build-js', 'publish')
})

//创建服务器
gulp.task('server', ['dev'], function(){
    yargs.p = yargs.p || host.port;
    browserSync.init({
        server: {
            baseDir: ['dist', 'dist/html'],
            index: 'index.html'
        },
        ui: {
            port: yargs.p + 1,
            weinre: {
                port: yargs.p + 2
            }
        },
        open: "external",
        port: yargs.p,
        notify: false,
        // https: true
    });
    //监听
    gulp.watch(jsSrc, ['change-watch'])
    gulp.watch(sassSrc, ['change-watch'])
    gulp.watch(comSrc, ['change-watch'])
    gulp.watch(htmlSrc, ['change-watch'])
})
