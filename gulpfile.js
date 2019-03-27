var gulp = require('gulp');
// var browserSync = require('browser-sync').create();
var sass = require('gulp-sass')

gulp.task('sass', function() {
    return gulp.src('sass/style.scss') 
      .pipe(sass())
      .pipe(gulp.dest('css'))
});

gulp.task('watchStyles', function(){
    gulp.watch('app/scss/**/*.scss', ['sass'])
})
  
