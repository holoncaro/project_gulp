/**
 * 注册任务
 */
var gulp = require('gulp');
var clean = require('gulp-clean');
var less = require('gulp-less');
var prefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

/**
 * 压缩html文件，并复制到dist文件夹
 * 
 */
gulp.task('html', function(){
	return	gulp.src('src/*.html')
						.pipe(htmlmin({
								collapseWhitespace: true,
								removeComments: true
							}))
						.pipe(gulp.dest('dist/'))
						.pipe(reload({stream: true}));
})

/**
 * 编译Less，并压缩CSS
 * 
 */
gulp.task('style', function(){
  return gulp.src('src/style/*.less')
			    .pipe(less())
			    .pipe(prefixer({
			    		browsers: ['last 2 versions'],
			    		cascade: true
			    	}))
			    .pipe(cssnano())
			    .pipe(gulp.dest('dist/style/'))
			    .pipe(reload({stream: true}));
})

/**
 * Js的合并、压缩混淆
 */
gulp.task('script', function(){
	return gulp.src('src/script/*.js')
					.pipe(concat('all.js'))
					.pipe(uglify())
					.pipe(gulp.dest('dist/script/'))
					.pipe(reload({stream: true}));
})
/**
 * IMG图片复制到dist文件夹
 */
gulp.task('img', function(){
	return gulp.src('src/img/*')
					.pipe(gulp.dest('dist/img/'))
					.pipe(reload({stream: true}));
})

/**
 * 浏览器同步刷新
 * 
 */

gulp.task('serve', ['html','style','script','img'], function(){
	browserSync.init({
		server: {
			baseDir:'./dist/'
		}
	})
	gulp.watch('src/index.html', ['html']);
	gulp.watch('src/style/*.less', ['style']);
	gulp.watch('src/script/*.js', ['script']);
})

gulp.task('default',['serve']);

/**
 * 清理dist文件夹中内容
 * 
 */
gulp.task('clean', function(){
	return gulp.src('dist/*')
					.pipe(clean())
})