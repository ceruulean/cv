var gulp = require('gulp');
var run = require('gulp-run');
var replace = require('gulp-replace');
var concatCss = require('gulp-concat-css');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var HTMLmin = require('gulp-htmlmin');
var rename = require("gulp-rename");
var del = require('del');
var fs = require('fs');

let cssVERSION = 5;
let jsVERSION = 3;

let pages = ['commissions', 'terms', 'gallery', 'freebies'];

let partials = {}

function getPartials(){
  let footer = fs.readFileSync('./src/footer.htm');
  let header = fs.readFileSync('./src/header.htm');
  let navbar = fs.readFileSync('./src/navbar.htm');
  partials['footer'] = footer;
  partials['header'] = header;
  partials['navbar'] = navbar;
  return Promise.resolve('partials');
}

function copyrightText(){
  let year = new Date().getFullYear();
  let string = `Copyright © 2020`;
  if (year != '2020') {string += `-${year}`}
  return string;
}

function rollupJS(){
  run('npm run roll').exec();
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
  .pipe(cleanCSS({
    compatibility: {
      properties: {
        urlQuotes: true, // controls keeping quoting inside `url()`
      },
    }
  }))
  .pipe(gulp.dest('public/'))
})


gulp.task('bundle', gulp.series(rollupJS, 'bundleCSS', getPartials));


gulp.task('index', function() {
  let siren = fs.readFileSync('./src/siren.html', 'utf8');
    return gulp.src('./src/index.html')
    .pipe(replace('{HEADER}', partials['header']))
    .pipe(replace('./includes/entoyment.css', '/dist.css'))
    .pipe(replace('{NAVBAR}', partials['navbar']))
    .pipe(replace('{SIREN}', siren))
    .pipe(replace('{cssVERSION}', cssVERSION))
    .pipe(replace('{jsVERSION}', jsVERSION))
    .pipe(replace('{FOOTER}', partials['footer']))
    .pipe(replace('{COPYRIGHT}', copyrightText()))
    .pipe(HTMLmin())
        .pipe(gulp.dest('public/'));
});

pages.forEach(function(pagename) {
  gulp.task(pagename, function() {
    return gulp.src(`./src/${pagename}.html`)
    .pipe(replace('{HEADER}', partials['header']))
    .pipe(replace('./includes/entoyment.css', '/dist.css'))
    .pipe(replace('{NAVBAR}', partials['navbar']))
    .pipe(replace('{cssVERSION}', cssVERSION))
    .pipe(replace('{jsVERSION}', jsVERSION))
    .pipe(replace('{FOOTER}', partials['footer']))
    .pipe(replace('{COPYRIGHT}', copyrightText()))
    .pipe(HTMLmin())
    .pipe(rename({
      dirname: pagename,
      basename: "index",
      extname: ".html"
    }))
        .pipe(gulp.dest(`public/`));
  });
});

gulp.task('static', function() {
  console.log("Static move to dist")
  return gulp.src('./src/static/**')
      .pipe(gulp.dest('public/static'));
});

gulp.task('scripts', function() {
  console.log("Scripts move to dist")
  return gulp.src('./src/scripts/**')
      .pipe(gulp.dest('public/scripts'));
});

gulp.task('default', gulp.series('bundle', 'index', gulp.parallel(pages)));