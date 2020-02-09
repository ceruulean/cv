var gulp = require('gulp');
var run = require('gulp-run');
var replace = require('gulp-replace');
var concatCss = require('gulp-concat-css');


async function rollupJS(){
  await run('npm run roll').exec();
  return Promise.resolve('nice');
}

gulp.task('bundleCSS', function(){
  return gulp.src('./src/includes/**/*.css')
  .pipe(concatCss('dist.css', {
    inlineImports:true,
    rebaseUrls:true,
    commonBase:''
  }))
  .pipe(replace('../static', './static'))
  .pipe(gulp.dest('public/'))
})

gulp.task('bundle', gulp.series(rollupJS,'bundleCSS'));

gulp.task('index', function() {
  console.log("d")
    return gulp.src('./src/index.html')
    .pipe(replace('./includes/entoyment.css', 'dist.css'))
        .pipe(gulp.dest('public/'));
});


gulp.task('static', function() {
  console.log("Static move to dist")
  return gulp.src('./src/static/**')
      .pipe(gulp.dest('public/static'));
});

gulp.task('default', gulp.series('index','bundle'));