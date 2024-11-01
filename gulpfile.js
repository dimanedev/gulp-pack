const { src, dest, watch } = require('gulp');

const scss = require('gulp-sass')(require('sass'));

function styles() {
  return src('./app/scss/main.scss')
    .pipe(scss())
    .pipe(dest('./app/css'));
}

function watchProject() {
  watch(['app/scss/**/*.scss'], styles);
}

exports.styles = styles;
exports.watchProject = watchProject;