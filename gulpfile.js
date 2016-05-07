/*=============================================
=            Gulp Startr2 by myles91          =
=============================================*/

/**
*
* packages
* No gulp-load-plugins as this is tidy
*
**/

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var browserSync  = require('browser-sync');
var prefix       = require('gulp-autoprefixer');
var plumber      = require('gulp-plumber');
var uglify       = require('gulp-uglify');
var concat       = require('gulp-concat');
var rename       = require("gulp-rename");
var imagemin     = require("gulp-imagemin");
var pngquant     = require('imagemin-pngquant');
var notify       = require('gulp-notify');
var sourcemaps   = require('gulp-sourcemaps');

/**
*
* Styles
* - Compile
* - Compress/Minify
* - Catch errors (gulp-plumber)
* - Autoprefixer
* - Create source maps
*
**/

gulp.task('sass', function() {
  gulp.src('sass/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(prefix('last 2 versions', '> 1%', 'ie 8', 'Android 2', 'Firefox ESR'))
  .pipe(plumber())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('css'))
  .pipe(notify({
      sound: 'Beep',
      message: 'Such minify, much develop'
    }
  ));
});

/**
*
* BrowserSync.io
* - Watch CSS, JS & HTML for changes
* - View project at: localhost:3000
*
**/

gulp.task('browser-sync', function() {
  browserSync.init(['css/*.css', 'js/**/*.js', 'index.html'], {
    server: {
      baseDir: './'
    }
  });
});


/**
*
* Javascript
* - Concat
* - Uglify
* - Create source maps
*
**/

gulp.task('scripts', function() {
  gulp.src('js/inc/*.js')
  .pipe(sourcemaps.init())
  .pipe(concat('app.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(rename({
    suffix: ".min",
  }))
  .pipe(gulp.dest('js'));
});

/**
*
* Images
* - Compress them!
*
**/

gulp.task('images', function () {
  return gulp.src('images/*')
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }))
  .pipe(gulp.dest('images'));
});


/**
*
* Default task
* - Runs sass, browser-sync, scripts and image tasks
* - Watchs for file changes for images, scripts and sass/css
*
**/

gulp.task('default', ['sass', 'browser-sync', 'scripts', 'images'], function () {
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('js/**/*.js', ['scripts']);
  gulp.watch('images/*', ['images']);
});
