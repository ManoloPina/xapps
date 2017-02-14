const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const notify = require('gulp-notify');
const less  = require('gulp-less');
const webpackStream = require('webpack-stream');

gulp.task('default', ['watch'], () => {

});

gulp.task('webpack', () => {
   gulp.src('./app/controllers/**/*.js')
  .pipe(webpackStream(require('./webpack.config')))
  .on('error', function handleError() {
      this.emit('end'); // Recover from errors
  })
  .pipe(rename('bundle.js'))
  .pipe(gulp.dest('./vendor/js'))
  .pipe(notify('Bundle Compiled...'));
});

gulp.task('less', () => {
  gulp.src('./app/styles/less/*.less')
  .pipe(less())
  .pipe(concat("bundle.css"))
  .pipe(cleanCSS())
  .pipe(gulp.dest("./vendor/css"));
});

gulp.task('dependencies', () => {
  gulp.src([
    './node_modules/jquery/dist/jquery.min.js',
		'./node_modules/react/dist/react.min.js',
		'./node_modules/react-dom/dist/react-dom.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js'
  ])
  .pipe(concat('dependencies.js'))
  .pipe(gulp.dest('vendor/js'));

  gulp.src([
		'./node_modules/bootstrap/dist/css/bootstrap.min.css'
	])
  .pipe(concat('all.css'))
  .pipe(cleanCSS())
  .pipe(gulp.dest('./vendor/css'))
  .pipe(notify('Dependencies created...'));
});

gulp.task('images', () => {
	gulp.src('./app/styles/images/**/*')
	.pipe(gulp.dest('./vendor/images'));
});

gulp.task('watch', () => {
  gulp.watch([
		'./app/styles/less/*.less',
		'./app/controllers/**/*.js'
	], ['less', 'webpack']);
});
