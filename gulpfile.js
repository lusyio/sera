const { src, dest, parallel, series, watch } = require('gulp');
const browserSync    = require('browser-sync').create();
const concat         = require('gulp-concat');
const uglify         = require('gulp-uglify-es').default;
const sass           = require('gulp-sass');
const autoprefixer   = require('gulp-autoprefixer');
const cleancss       = require('gulp-clean-css');
const newer          = require('gulp-newer');
const del            = require('del');

function browsersync() {
   browserSync.init({
      server: { baseDir: 'app/' },
      notify: false,
      online: true
   });
}

function scripts() {
   return src([
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
      'node_modules/swiper/swiper-bundle.min.js',
      'node_modules/jquery.maskedinput/src/jquery.maskedinput.js',
      'node_modules/wowjs/dist/wow.min.js',
      'app/js/app.js',
   ])
   .pipe(concat('app.min.js'))
   .pipe(uglify())
   .pipe(dest('app/js/'))
   .pipe(browserSync.stream());
}

function styles() {
   return src([
      'node_modules/swiper/swiper-bundle.min.css',
      'node_modules/animate.css/animate.min.css',
      'app/scss/main.scss',
   ])
   .pipe(sass())
   .pipe(concat('app.min.css'))
   .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
   .pipe(cleancss(( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )))
   .pipe(dest('app/css/'))
   .pipe(browserSync.stream());
}

function images() {
   return src('app/img/**/*')
}

function cleandist() {
   return del('dist/**/*', { force: true });
}

function buildcopy() {
   return src([
      'app/**/*.html',
      'app/css/**/*.min.css',
      'app/js/**/*.min.js',
      'app/svg/**/*.svg',
      'app/fonts/**/*.woff2',
      'app/favicon/*.ico',
      'app/img/**/*',
      'app/docs/**/*',
   ], { base: 'app' })
   .pipe(dest('dist'));
}

function startwatch() {
   watch(['app/**/**/*.scss'], styles);
   watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
   watch('app/**/*.html').on('change', browserSync.reload);
   watch('app/img/**/*', images);
}

exports.browsersync = browsersync;
exports.scripts     = scripts;
exports.styles      = styles;
exports.images      = images;
exports.build       = series(cleandist, styles, scripts, images, buildcopy);

exports.default     = parallel(styles, scripts, images, browsersync, startwatch);