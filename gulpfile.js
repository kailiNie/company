var gulp = require('gulp');
 
//server服务
browserSync = require('browser-sync').create();

//sass预处理
var sass = require('gulp-sass');




 
var rootUrl, packUrl,revUrl,zipFile,zipName;

//使用connect启动一个Web服务器
gulp.task('default',function () {
  server('yunpay.jufu');
});


function server(fileUrl) {
    browserSync.init({
        server: {
            baseDir: "./",
            index: '/' + fileUrl + '/index.html',
            routes: {
                "/common": "common/js",
                "/html": fileUrl + "/html",
                "/json": fileUrl + "/json",
                "/img": fileUrl + "/img",
                '/html/popTem' : 'common/html/popTem',
                'img/bankicon' : 'common/img/bankicon'
            }
        },
    });
    gulp.watch('./yunpay.jufu/css/**/*.scss',['sass']);
};

 
gulp.task('sass', function () {
  return gulp.src(['./yunpay.jufu/css/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./yunpay.jufu/css'));
});
 

 



