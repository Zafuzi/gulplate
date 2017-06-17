var gulp = require('gulp'),
    pug = require('gulp-pug'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-csso'),
    watch = require('gulp-watch'),
    gp_rename = require('gulp-rename'),
    gp_concat = require('gulp-concat'),
    gp_uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    cleanCSS = require('gulp-clean-css');


var vendor = {
    "js": ["bower_components/modernizer/modernizr.js", "bower_components/onscrolling/dist/onscrolling.js", "bower_components/smooth-scroll/smooth-scroll.js"],
    "css": ["bower_components/typicons.font/src/font/typicons.min.css", "bower_components/normalize-css/normalize.css"]
}

gulp.task("minifyvendor", function() {
    gulp.src(vendor.js)
        .pipe(gp_concat('vendor.js'))
        .pipe(gulp.dest('.'))
        .pipe(gp_rename('vendor.min.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('production/scripts'));

    gulp.src(vendor.css)
        .pipe(cleanCSS())
        .pipe(gulp.dest("production/css"))
});

gulp.task('html', function() {
    return watch('./build/templates/*.pug', function() {
        gulp.src('./build/templates/*.pug')
            .pipe(pug())
            .pipe(gulp.dest('production'));
    });
});

gulp.task('css', function() {
    return watch('./build/styles/prefixed/*.less', function() {
        gulp.src('./build/styles/prefixed/*.less')
            .pipe(less())
            .pipe(minifyCSS())
            .pipe(gulp.dest('production/css'));
    });
});

// Auto prefixer for converting css to work on older browsers
gulp.task('autoprefixer', function() {
    var postcss = require('gulp-postcss');
    var sourcemaps = require('gulp-sourcemaps');
    var autoprefixer = require('autoprefixer');

    return watch('./build/styles/*.less', function() {
        gulp.src('./build/styles/*.less')
            .pipe(sourcemaps.init())
            .pipe(postcss([autoprefixer()]))
            .pipe(sourcemaps.write('./maps/'))
            .pipe(gulp.dest('./build/styles/prefixed/'));
    });
});

// Minify images on the fly
gulp.task('images', () =>
    gulp.src('build/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('production/images'))
);

gulp.task('default', ['html', 'autoprefixer', 'css', "minifyvendor", "images"]);