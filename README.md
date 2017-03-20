# project_gulp
gulp构建用于html压缩，less编译，js合并混淆的gulpfile.js


 *压缩html文件，并复制到dist文件夹*
```javascript
gulp.task('html', function(){
    return  gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(reload({stream: true}));
})
```


*编译Less，并压缩CSS*

```javascript
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
```

 *Js的合并、压缩混淆*

```javascript
gulp.task('script', function(){
    return gulp.src('src/script/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/script/'))
        .pipe(reload({stream: true}));
})
```


 *IMG图片复制到dist文件夹*

```javascript
gulp.task('img', function(){
    return gulp.src('src/img/*')
        .pipe(gulp.dest('dist/img/'))
        .pipe(reload({stream: true}));
})
```


 *浏览器同步刷新*
 

```javascript
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
```

`gulp.task('default',['serve']);`


 *清理dist文件夹中内容*

```javascript
gulp.task('clean', function(){
    return gulp.src('dist/*')
        .pipe(clean())
})
```

**使用时，只需运行gulp clean，清空发布文件夹dist中的所有内容，然后运行gulp，根据src中内容自动生成dist中的内容。**
