'use strict';
 
var gulp = require('gulp');  
var gulPug = require('gulp-pug');
var sass = require('gulp-sass');
var smartgrid = require('smart-grid');
var autoprefixer = require('gulp-autoprefixer');
var htmlmin = require('gulp-htmlmin');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var useref = require('gulp-useref');
var clean = require('gulp-clean');
var sftp = require('gulp-sftp');




//компиляция всех файлов в папку dist
         // не забыть проделать в HTML для включения carry:
         //    <!-- build:css css/main.css -->
         // link(rel="stylesheet", href="css/main.css")
         // link(rel="stylesheet", href="css/normalize.css")
         //     <!-- endbuild -->
            
         //    <!-- build:js js/main.js -->
         // script(src="js/main.js")
         // script(src="js/two.js")
         //    <!-- endbuild -->
gulp.task('dist', [
    'carry',
    'img-min',
    'html-min'
]);




//Build dist css
gulp.task('carry', function () {
    return gulp.src('index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('css/*.css', cleanCSS()))
        .pipe(gulp.dest('dist/'));
});


//Build html-min

gulp.task('html-min', () => {
  return gulp.src('*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/'));
});


//Build img-min

gulp.task('img-min', () =>
    gulp.src('img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
);



 //Build sass/autoprefixer

gulp.task('sass', function () {
  gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))  
    .pipe(gulp.dest('./css'));
});
 
 


//Подключение хтмл с декомпилятором

gulp.task('pug', function() {
  return gulp.src("./pug/*.pug")
       .pipe(gulPug({
        pretty: true
        }))
      .pipe(gulp.dest("./"));

});



 //delete dist
gulp.task('clean', function () {
    return gulp.src('dist/', {read: false})
        .pipe(clean());
});



//watcher для html/css

gulp.task('watcher', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
   gulp.watch('pug/*.pug',['pug']);

});



//Build smartgrid

/* It's principal settings in smart grid project */
var settings = {
    outputStyle: 'scss', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: '30px', /* gutter width px || % */
    mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
        maxWidth: '1200px', /* max-width оn very large screen */
        fields: '0' /* side fields */
    },
    breakPoints: {
        lg: {
            width: '1100px', /* -> @media (max-width: 1100px) */
            fields: '20px'
        },
        md: {
            width: '960px'
        },
        sm: {
            width: '780px',
        },
        xs: {
            width: '560px'
        }
        /* 
        We can create any quantity of break points.

        some_name: {
            width: 'Npx',
            fields: 'N(px|%|rem)',
            offset: 'N(px|%|rem)'
        }
        */
    }
};

smartgrid('./sass', settings);





//host
gulp.task('sftp', function () {
    return gulp.src('dist/**/*')
        .pipe(sftp({
            host: 'levzikMySite.tmweb.ru',
            user: 'levzik',
            pass: '0000',
            remotePath: 'Имя хоста'
        }));
});
