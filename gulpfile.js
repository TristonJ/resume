var gulp = require('gulp'),
    path = require('path'),
    less = require('gulp-less'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    AutoPrefix = require('less-plugin-autoprefix');

var autoprefix = new AutoPrefix({browsers: ['last 2 versions']});

gulp.task('less', () =>
  gulp.src('./assets/less/**/*.less')
      .pipe(less({plugins: [autoprefix]}))
      .pipe(gulp.dest('./build/css'))
);

gulp.task('concatCSS', ['less'], () =>
  gulp.src('./build/css/**/*.css')
      .pipe(concat('app.css'))
      .pipe(gulp.dest('./build'))
);

gulp.task('minifyCSS', ['concatCSS'], () =>
  gulp.src('./build/app.css')
      .pipe(cleanCSS())
      .pipe(rename('app.min.css'))
      .pipe(gulp.dest('./public/css'))
);

gulp.task('buildCSS', ['minifyCSS']);

gulp.task('concatJS', () =>
  gulp.src('./assets/js/**/*.js')
      .pipe(concat('app.js'))
      .pipe(gulp.dest('./build'))
);

gulp.task('minifyJS', ['concatJS'], () =>
  gulp.src('./build/app.js')
      .pipe(uglify())
      .pipe(rename('app.min.js'))
      .pipe(gulp.dest('./public/js'))
);

gulp.task('buildJS', ['minifyJS']);

gulp.task('watch', () => {
  gulp.watch('./assets/js/*.js', ['buildJS']);
  gulp.watch('./assets/less/*.less', ['buildCSS']);
});

gulp.task('build', ['buildCSS', 'buildJS']);
gulp.task('default', ['build', 'watch']);
