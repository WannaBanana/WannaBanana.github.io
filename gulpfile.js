// Sass configuration
const gulp = require('gulp')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify')
const plumber = require('gulp-plumber')
const watch = require('gulp-watch')
const imagemin = require('gulp-imagemin')
const rename = require('gulp-rename');
// post css
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
// config
const config = require('./gulpconfig')

gulp.task('sass', () => {
  var processors = [autoprefixer(config.postcss.autoprefixer)]
  gulp.src([config.paths.sass + '**/**.scss'])
    .pipe(plumber())
    .pipe(sass(config.sass)
    .on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(cleanCSS())
    .pipe(rename((path) => {
      path.basename += ".min";
      path.extname = ".css";
    }))
    .pipe(rename({dirname: config.paths.sass_output}))
    .pipe(gulp.dest(config.paths.public))
})

gulp.task('imgmini', () =>
  gulp.src('img/' + '**/**')
      .pipe(imagemin())
      .pipe(gulp.dest(config.paths.public + '/img'))
)

watch([config.paths.sass + '**/*.scss'], () => {
  gulp.start('sass')
})

gulp.task('default', ['sass', 'imgmini'])
