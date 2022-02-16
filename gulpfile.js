'use strict';


const { src, dest, watch, series, parallel } = require('gulp');

const sass        = require('gulp-sass')(require('sass'));
const concat      = require('gulp-concat');
const browserSync = require('browser-sync').create();
const minify      = require('gulp-terser');
const imagemin    = require('gulp-imagemin');
const del         = require('del');
const fileinclude = require('gulp-file-include');
const rename      = require('gulp-rename');


function browsersync() {
  browserSync.init({
    server: {
      baseDir: "src/",
    },
  });
  watch('src/*.html').on('change', browserSync.reload);
}

function clearDist() {
  return del('dist/');
}

function buildhtml() {
  return src('src/layouts/**/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest('src/'));
}

function styles() {
  return src([
    'src/sass/*.scss',
    '!src/sass/_fonts.scss',
    '!src/sass/_vars.scss'
  ])
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename({extname: '.min.css'}))
    .pipe(dest('src/css/'))
    .pipe(browserSync.stream());
}

function scripts() {
  return src('src/js/main.js')
    .pipe(concat('main.min.js'))
    .pipe(minify())
    .pipe(dest('src/js'))
    .pipe(browserSync.stream());
}

function images() {
  return src('src/images/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
          plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
          ]
      })
  ]))
    .pipe(dest('dist/images/'));
}

function build() {
  return src([
    'src/*.html',
    'src/css/style.min.css',
    'src/js/main.min.js',
    'src/fonts/**/*',
  ], {base: 'src/'})
    .pipe(dest('dist/'));
}

function watcher() {
  watch(['src/sass/**/*.scss'], styles);
  watch(['src/**/*.html', '!src/*.html'], buildhtml);
  watch(['src/js/**/*.js', '!src/js/main.min.js'], scripts);
}

exports.browsersync = browsersync;
exports.clearDist = clearDist;
exports.buildhtml = buildhtml;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.watcher = watcher;

exports.build = series(clearDist, images, build);
exports.default = parallel(buildhtml, styles, scripts, browsersync, watcher);