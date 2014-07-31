var gulp = require('gulp');

var mochaPhantomJS = require('gulp-mocha-phantomjs');

var jshint  = require('gulp-jshint');
var stylish = require('jshint-stylish');

var paths = {
  js:   ['./*.js', './test/**/*.js'],
  test: ['./test/**']
};

gulp.task('test', function () {
  return gulp
  .src('test/runner.html')
  .pipe(mochaPhantomJS());
});

gulp.task('test-watch', function() {
  return gulp.watch(paths.test.concat(paths.js), ['test']);
});

gulp.task('jshint', function() {
  return gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});
gulp.task('jshint-watch', function() {
  return gulp.watch(paths.js, ['jshint']);
});

gulp.task('watch', ['jshint-watch', 'test-watch']);
gulp.task('default', ['watch']);
