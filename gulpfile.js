// Include plugins (https://gulpjs.com/plugins/)
var 
  gulp          = require('gulp'),
  autoprefixer  = require('autoprefixer'),
  browserSync   = require('browser-sync').create(),
  calc          = require('postcss-calc'),
  concat        = require('gulp-concat'),
  cssvariables  = require('postcss-css-variables'),
  gulpif        = require('gulp-if'),
  imagemin      = require('gulp-imagemin'),
  plumber       = require('gulp-plumber'),
  pngcrush      = require('imagemin-pngcrush'),
  postcss       = require('gulp-postcss'),
  pug           = require('gulp-pug'),
  sass          = require('gulp-sass'),
  sourcemaps    = require('gulp-sourcemaps'),
  uglify        = require('gulp-uglify');

// Define directories
var env,
    outputDir,
    // Src
    imgSrc,
    jsSrc,
    libSrc,
    pugSrc,
    sassSrc,
    // Dest
    imgDest,
    jsDest,
    libDest,
    pugDest,
    sassDest,
    // Styles
    pugStyle,
    sassStyle;

// Initialize environment
env = process.env.NODE_ENV || 'development';

if (env==='development') {
  outputDir = 'builds/development/';
  pugStyle = {
    doctype: 'html',
    pretty: true
  }
  sassStyle = 'expanded';
} else {
  outputDir = 'builds/production/';
  pugStyle = {
    doctype: 'html',
    pretty: false
  }
  sassStyle = 'compressed';
}

// Initialize sources
imgSrc    = ['process/img/**/*.*'];
jsSrc     = [
              'process/js/framework-util.js',
              'process/js/form.js'
            ];
libSrc    = ['process/lib/**/*.*'];
pugSrc    = [
              'process/pug/**/*.pug',
              '!process/pug/**/_*.pug'
            ];
sassSrc   = ['process/sass/styles.scss'];

// Initialize destinations
imgDest     = outputDir + 'img';
jsDest      = outputDir + 'js';
libDest     = outputDir + 'lib';
pugDest     = outputDir;
sassDest    = outputDir + 'css';

gulp.task('img', function() {
  return gulp.src(imgSrc)
    .pipe(plumber())
    .pipe(gulpif(env === 'production', imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngcrush()]
    })))
    .pipe(gulp.dest(imgDest));
});

gulp.task('js', function() {
  return gulp.src(jsSrc)
    .pipe(concat('main.js'))
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest(jsDest))
});

gulp.task('lib', function() {
  return gulp.src(libSrc)
    .pipe(gulp.dest(libDest));
});

gulp.task('pug', function() {
  return gulp.src(pugSrc)
    .pipe(plumber())
    .pipe(pug(pugStyle))
    .pipe(gulp.dest(pugDest));
});

gulp.task('sass', function() {
  return gulp.src(sassSrc)
    .pipe(plumber())
    .pipe(gulpif(env === 'development', sourcemaps.init()))
    .pipe(sass({outputStyle: sassStyle}))
    .pipe(postcss([autoprefixer(), cssvariables({preserve: true}), calc()]))
    .pipe(gulpif(env === 'development', sourcemaps.write()))
    .pipe(gulp.dest(sassDest))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: outputDir
    },
  });
});

// reloading browsers
function reloadPage(done) {
  browserSync.reload();
  done();
}
gulp.task('img-rl', ['img'], reloadPage);
gulp.task('js-rl', ['js'], reloadPage);
gulp.task('lib-rl', ['lib'], reloadPage);
gulp.task('pug-rl', ['pug'], reloadPage);

gulp.task('watch', ['browserSync', 'img', 'js', 'lib', 'pug', 'sass'], function () {
  gulp.watch(imgSrc, ['img-rl']);
  gulp.watch(jsSrc, ['js-rl']);
  gulp.watch(libSrc, ['lib-rl']);
  gulp.watch('process/pug/**/*.pug', ['pug-rl']);
  gulp.watch('process/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['watch']);