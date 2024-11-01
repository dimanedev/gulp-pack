const { src, dest, watch, parallel } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

function styles() {
  return src('./app/scss/main.scss')
    .pipe(scss())
    .pipe(dest('./app/css'))
    .pipe(browserSync.stream());
}

function watchProject() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/**/*.html']).on('change', browserSync.reload);
}

function initBrowserSync() {
  browserSync.init({
    server: './app',
  });
}

exports.styles = styles;
exports.watchProject = watchProject;

exports.default = parallel(styles, initBrowserSync, watchProject);