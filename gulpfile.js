var gulp = require('gulp'),
    pug = require('gulp-pug'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-csso'),
    watch = require('gulp-watch');

gulp.task('html', function() {
    return watch('build/templates/*.pug', function() {
        gulp.src('build/templates/*.pug')
            .pipe(pug())
            .pipe(gulp.dest('production/html'))
    });
});

gulp.task('css', function() {
    return watch('build/styles/*.less', function() {
        gulp.src('build/styles/*.less')
            .pipe(less())
            .pipe(minifyCSS())
            .pipe(gulp.dest('production/css'))
    });
});

gulp.task('default', ['html', 'css']);