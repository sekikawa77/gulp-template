const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const changed = require('gulp-changed');
const browserSync = require('browser-sync');

gulp.task('pug', function(done){
    gulp.src(['src/**/*.pug', '!src/**/_*.pug'])
    .pipe(plumber({
        errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());

    done();
});

gulp.task('sass', function(done){
    gulp.src('src/asset/sass/**/*.scss')
    .pipe(plumber({
        errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(postcss([
        autoprefixer()
    ]))
    .pipe(cssmin())
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest('./dist/asset/css'))
    .pipe(browserSync.stream());

    done();
});

gulp.task('js', function(done){
    gulp.src(['src/asset/js/**/*.js', '!dist/asset/js/**/*.min.js'])
    .pipe(plumber())
    // .pipe(uglify())
    // .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('./dist/asset/js'))
    .pipe(browserSync.stream());

    done();
});


gulp.task('imagemin', function(done){
    gulp.src('src/asset/images/**')
    .pipe(changed('dist/asset/images'))
    .pipe(
        imagemin([
            pngquant({
                quality: [.70, .85],
                speed: 1
            }),
            mozjpeg({ quality: 8}),
            imagemin.svgo(),
            imagemin.optipng(),
            imagemin.gifsicle({ optimizationLevel: 3})
        ])
    )
    .pipe(gulp.dest('dist/asset/images'));

    done();
});


gulp.task('default', function(){
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });

    gulp.watch('src/**/*.pug', gulp.task('pug'));
    gulp.watch('src/asset/sass/**/*.scss', gulp.task('sass'));
    gulp.watch('src/asset/js/**/*.js', gulp.task('js'));
    gulp.watch('src/asset/images/**', gulp.task('imagemin'));
});

