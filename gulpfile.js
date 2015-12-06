var gulp        = require('gulp');
var sass        = require('gulp-sass');
var minifycss   = require('gulp-minify-css');
var rename      = require('gulp-rename');
var browserSync = require('browser-sync');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var jshint      = require('gulp-jshint');

/* BrowserSync task */
gulp.task('browserSync', function()
{
  browserSync({
    server: {
      baseDir: 'app'
    },
  })
});

/* Compile Sass and minify CSS */
gulp.task('sass', function ()
{
  gulp.src('app/scss/**/*.scss')
    .pipe(sass({
      includePaths: require('node-bourbon').includePaths
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

/* Lint Task */
gulp.task('lint', function()
{
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/* Concatenate & Minify JS */
gulp.task('scripts', function()
{
    return gulp.src('app/js/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('app/js'))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
	    .pipe(browserSync.reload({
	      stream: true
	    }));
});

/* Watch files for changes and run tasks */
gulp.task('watch', ['browserSync', 'sass', 'lint'], function ()
{
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/js/*.js', ['lint']);
  gulp.watch('app/*.html', browserSync.reload);
});
