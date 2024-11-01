const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');

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

function cleanDist() {
  return src("dist").pipe(clean());
}

function build() {
  return src(
    [
      "./app/css/main.css",
      "./app/js/main.js",
      "./app/**/*.html"
    ],
    { base: "app" }
  )
    .pipe(dest('dist'));
}

exports.styles = styles;
exports.watchProject = watchProject;
exports.build = series(cleanDist, build);

exports.default = parallel(styles, initBrowserSync, watchProject);