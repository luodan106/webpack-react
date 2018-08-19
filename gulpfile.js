const gulp=require('gulp');
const uglify=require('gulp-uglify');
const gutil=require('gulp-util');
const rename=require('gulp-rename');

gulp.task('jscompress',()=>{
    return gulp.src('./canlendar.js')
               .pipe(rename({suffix:'.min'}))
               .pipe(uglify())
               .pipe(gulp.dest('compress/js'))
               .on('error', function (err) {
                  gutil.log(gutil.colors.red('[Error]'), err.toString());
            })
})