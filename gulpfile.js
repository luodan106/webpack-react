const gulp=require('gulp');
const uglify=require('gulp-uglify');
const gutil=require('gulp-util');
const rename=require('gulp-rename');
const cleanCSS=require('gulp-clean-css');

gulp.task('jscompress',()=>{
    return gulp.src('public/data/compress.txt')
               .pipe(rename({suffix:'.min'}))
               .pipe(uglify())
               .pipe(gulp.dest('public/data'))
               .on('error', function (err) {
                  gutil.log(gutil.colors.red('[Error]'), err.toString());
            })
})
gulp.task('csscompress',()=>{
    return gulp.src('public/data/compress.txt')
               .pipe(rename({suffix:'.min'}))
               .pipe(cleanCSS())
               .pipe(gulp.dest('public/data'))
               .on('error', function (err) {
                  gutil.log(gutil.colors.red('[Error]'), err.toString());
            })
})