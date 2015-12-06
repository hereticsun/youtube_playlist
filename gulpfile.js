var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('sass', function () {
  gulp.src('app/scss/**/*.scss')
    .pipe(sass({
      includePaths: require('node-bourbon').includePaths
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    })) // Refresh the page
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
  })
});

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']); // Watch for scss changes and run the sass compiler
  gulp.watch('app/*.html', browserSync.reload);  // Watch for html changes and refresh the browser
  gulp.watch('app/js/**/*.js', browserSync.reload); // Watch for js changes and refresh the browser
});
