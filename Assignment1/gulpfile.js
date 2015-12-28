var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
// var eslint = require('gulp-eslint');
// var jasmine = require('gulp-jasmine-phantom');

gulp.task('default', function() {
  // place code for your default task here
  console.log("Running Gulp...");
  gulp.watch('sass/**/*.scss', ['styles']);
  gulp.watch('js/**/*.js', ['lint']);
  gulp.watch('./build/index.html').on('change', browserSync.reload);

});

gulp.task('styles', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
     .pipe(sass({
        outputStyle: 'compressed'    
    }))
    .pipe(concat('main.css'))
    .pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(gulp.dest('dist/css'));
});

gulp.task('copy-html', function() {
    gulp.src('./index.html');
      // pipe(gulp.dest('./dist'));
});

gulp.task('copy-images', function() {
    gulp.src('./img/*');
      // pipe(gulp.dest('dist/img'));
});

gulp.task('scripts-dist', function() {
    gulp.src('js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        // .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));
});

browserSync.init({
    server: "./"
});
browserSync.stream();

// gulp.task('sass:watch', function () {
//   gulp.watch('sass/**/*.scss', ['styles']);
// });




// gulp.task('tests', function ()) {
// 	gulp.src('tests/spec/extraSpec.js')
// 		.pipe(jasmine){
// 			integration: true,
// 			vendor: 'js/**/*.js'
// 		};
// })