var gulp = require('gulp'),
    path = require('path'),
    less = require('gulp-less'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    bust = require('gulp-buster'),
    AutoPrefix = require('less-plugin-autoprefix');

var autoprefix = new AutoPrefix({browsers: ['last 2 versions', '> 5%']});

gulp.task('cleanCSS', () =>
  gulp.src('build/css', {read:false})
      .pipe(clean())
);

gulp.task('cleanJS', () =>
  gulp.src('build/js', {read:false})
      .pipe(clean())
);

gulp.task('less', ['cleanCSS'], () =>
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

gulp.task('bustCSS', ['minifyCSS'], () =>
  gulp.src('./public/css/app.min.css')
      .pipe(bust({relativePath:'/public'}))
      .pipe(gulp.dest('.'))
);

gulp.task('buildCSS', ['bustCSS']);

gulp.task('concatJS', ['cleanJS'], () =>
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

gulp.task('bustJS', ['minifyJS'], () =>
  gulp.src('./public/js/app.min.js')
      .pipe(bust({relativePath:'/public'}))
      .pipe(gulp.dest('.'))
);

gulp.task('buildJS', ['bustJS']);

gulp.task('watch', () => {
  gulp.watch('./assets/js/*.js', ['buildJS']);
  gulp.watch('./assets/less/*.less', ['buildCSS']);
});

gulp.task('build', ['buildCSS', 'buildJS']);
gulp.task('default', ['build', 'watch']);
