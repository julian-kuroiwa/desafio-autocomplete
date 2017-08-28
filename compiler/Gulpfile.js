const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const pump = require('pump');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();


const path = {
    base: '../source',
    css: '../source/css',
    img: '../source/img',
    js: '../source/js',

    dist: {
        base: '../dist',
        css: '../dist/css',
        img: '../dist/img',
        js: '../dist/js'
    }

}

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: path.dist.base
        }
    });
});

gulp.task('minify-html', () => {
    return gulp.src('../source/index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(path.dist.base));
});

gulp.task('minify-css', () => {
    return gulp.src(path.css + '/**/*.css')
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest(path.dist.css));
});

gulp.task('minify-js', () => {
    pump([
        gulp.src(path.js + '/**/*.js'),
        uglify(),
        gulp.dest(path.dist.js)
    ]);
});

gulp.task('imagemin', () => {
    gulp.src(path.img + '/**')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 })
        ]))
        .pipe(gulp.dest(path.dist.img))
});

gulp.task('default', ['browser-sync', 'minify-html', 'minify-css', 'minify-js', 'imagemin', 'fonts'], () => {

    gulp.watch(path.dist.base + '/**/index.html').on('change', browserSync.reload);

    gulp.watch(path.dist.js + '/**/*.js').on('change', browserSync.reload);

    // Tasks Watch
    gulp.watch(path.base + '/**/index.html', ['minify-html'])

    gulp.watch(path.css + '/**/*.css', ['minify-css']);

    gulp.watch(path.js + '/**/*.js', ['minify-js']);

    gulp.watch(path.img + '/**/**', ['imagemin']);

});