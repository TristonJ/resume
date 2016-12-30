var gulp = require('gulp'),
    path = require('path'),
    less = require('gulp-less'),
    AutoPrefix = require('less-plugin-autoprefix');

var autoprefix = new AutoPrefix({browsers: ['last 2 versions']});

gulp.task('less', () =>
  gulp.src('./assets/less/**/*.less')
      .pipe(less({plugins: [autoprefix]}))
      .pipe(gulp.dest('./public/css'))
);

gulp.task('buildCSS', ['less']);
gulp.task('buildJS', () =>
  gulp.src('assets')
      .pipe(gulp.dest('./public/js'))
);

gulp.task('watch', () => {
  gulp.watch('./assets/js/*.js', ['buildJS']);
  gulp.watch('./assets/less/*.less', ['buildCSS']);
});

gulp.task('build', ['buildCSS', 'buildJS']);
gulp.task('default', ['build', 'watch']);
