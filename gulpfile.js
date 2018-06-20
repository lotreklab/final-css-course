var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');


// CSS Tasks
gulp.task('css-build', function() {
  gulp.src('assets/scss/*.scss')
    .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('css-minify', function() {
    gulp.src(['./build/css/*.css', '!build/css/*.min.css'])
      .pipe(cssmin())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('./build/css'));
});

gulp.task('css', function() {
  gulp.src('assets/scss/*.scss')
    .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./build/css/'));

});

gulp.task('js', function(){
  return gulp.src([
      'assets/js/bootstrap.js',
  ])
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('build/js'))
});

// Build frontend stuff
gulp.task('default', function() {
  runSequence('css', 'js');
});

// Watch on CSS and JS
gulp.task('watch', function() {
  gulp.watch("assets/scss/*.scss", ['css']);
});
