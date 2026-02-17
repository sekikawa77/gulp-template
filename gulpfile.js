const {src, dest, watch, series, parallel} = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');

const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const changed = require('gulp-changed');
const browserSync = require('browser-sync');
const sourcemaps = require("gulp-sourcemaps");

//参照元パス
const srcPath = {
    pug: 'src/**/*.pug',
    css: 'src/asset/sass/**/*.scss',
    js: 'src/asset/js/**/*.js',
    img: 'src/asset/images/**',
}

//出力先パス
const destPath = {
    pug: 'dist/',
    css: 'dist/asset/css',
    js: 'dist/asset/js',
    img: 'dist/asset/images',
}

//pug
const htmlPug = () => {
    return src([srcPath.pug , '!src/**/_*.pug'])
    .pipe(plumber({
        errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(pug({
        pretty: true
    }))
    .pipe(dest(destPath.pug))
}

//sass
const cssSass = () => {
    return src(srcPath.css)
    .pipe(sourcemaps.init())
    .pipe(plumber({
        errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(postcss([
        autoprefixer(),
		cssnano()
    ]))
	.pipe(sourcemaps.write())
    .pipe(rename({extname: '.min.css'}))
    .pipe(dest(destPath.css))
}

//js
const js = () => {
    return src([
		'src/asset/js/jquery-4.0.0.min.js',
		'src/asset/js/slick.min.js',
		'src/asset/js/jquery.magnific-popup.min.js',
		'src/asset/js/run.js',
	])
    .pipe(plumber({
        errorHandler: notify.onError("Error: <%= error.message %>")
    }))
	.pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(dest(destPath.js))
}

//画像の圧縮
const imageMin = () => {
    return src(srcPath.img)
    .pipe(changed(destPath.img))
    .pipe(
        imagemin([
            pngquant({
                quality: [.70, .85],
                speed: 1
            }),
            mozjpeg({ quality: 90}),
            imagemin.svgo(),
            imagemin.optipng(),
            imagemin.gifsicle({ optimizationLevel: 3})
        ])
    )
    .pipe(dest(destPath.img));
}

//ローカルサーバー立ち上げ、ファイル監視と自動リロード
const browserSyncFunc = () => {
    browserSync({
        server: {
          baseDir: destPath.pug, // ルートとなるディレクトリを指定
        },
    });
}


//リロード
const browserSyncReload = (done) => {
    browserSync.reload();
    done();
}


const watchFiles = () => {
    watch(srcPath.pug, series(htmlPug, browserSyncReload))
    watch(srcPath.css, series(cssSass, browserSyncReload))
    watch(srcPath.js, series(js, browserSyncReload))
    watch(srcPath.img, series(imageMin, browserSyncReload))
}

exports.default = series(series(htmlPug, cssSass, js, imageMin), parallel(watchFiles, browserSyncFunc));


