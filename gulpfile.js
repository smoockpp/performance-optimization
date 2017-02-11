'use strict';

var    gulp = require('gulp'),
      babel = require("gulp-babel"),
      image = require('gulp-image'),
     concat = require('gulp-concat'),
     uglify = require('gulp-uglify'),
     rename = require('gulp-rename'),
       sass = require('gulp-sass'),
       maps = require('gulp-sourcemaps'),
   cleanCSS = require('gulp-clean-css'),
        del = require('del'),
browserSync = require('browser-sync').create(),
     reload = browserSync.reload;

gulp.task('concatScripts', function() {
  return gulp.src([

      'js/modal.js',
      'js/scripts.js'])
  .pipe(concat('app.js'))
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest('js'));
});

gulp.task('image', function () {
  gulp.src('img/**/*.* ')
    .pipe(image())
    .pipe(gulp.dest('./dest'));
});

gulp.task('minifyScripts', ['concatScripts'], function() {
  return gulp.src('js/app.js')
      .pipe(maps.init())
      .pipe(uglify())
      .pipe(rename('app.min.js'))
      .pipe(maps.write('./'))
      .pipe(gulp.dest('js'));
});



gulp.task('compileSass', function() {
  return gulp.src('scss/application.scss')
      .pipe(maps.init())
      .pipe(sass())
    .pipe(maps.write('./'))
      .pipe(gulp.dest('css'));
});

gulp.task('minifyCSS', ['compileSass'], function() {
    return gulp.src([
            'css/application.css'
            ])
        .pipe(cleanCSS())
        .pipe(rename('application.min.css'))
        .pipe(gulp.dest('css'));
});

gulp.task('watchFiles', function() {
  browserSync.init({
        server: {
            baseDir: "./"
        }
    });
  gulp.watch('scss/**/*.scss', ['compileSass', 'minifyCSS']).on('change', reload);

  gulp.watch('*.html').on('change', reload);
  gulp.watch('js/modal.js', ['concatScripts', 'minifyScripts']).on('change', reload);
  gulp.watch('js/scripts.js', ['concatScripts', 'minifyScripts']).on('change', reload);

});



gulp.task('clean', function() {
  del(['dist', 'css/application.css*', 'js/app.*.js*']);
});

gulp.task('build', ['compileSass', 'minifyCSS', 'concatScripts', 'minifyScripts'], function() {
  return gulp.src(['css/application.min.css','css/application.css.map', 'js/app.min.js', 'index.html',
                   'img/**'], { base: './' })
             .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['watchFiles']);

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});
