var gulp = require('gulp'),
    header = require('gulp-header'),
    jshint = require('gulp-jshint'),
    minify = require('gulp-minify'),
    pkg = require('./package.json'),
    banner = ['/**',
        ' * <%= pkg.name %>',
        ' * <%= pkg.description %>',
        ' * <%= pkg.homepage %>',
        ' * @version v<%= pkg.version %>',
        ' * @license <%= pkg.license %>',
        ' * Copyright (c) <%= year %> <%= pkg.author %>',
        ' */',
        ''].join('\n'),
    year = new Date().getFullYear();


/* convert package name in `hello-world` format to `Hello World` format */
pkg.name = pkg.name.split('-').map(function (item) {
    return item[0].toUpperCase() + item.substr(1);
}).join(' ');

/* npm run friendly version of the jshint gulp task ( without jshint.reporter('fail') ) */
gulp.task('jshint:quiet', function () {
    return gulp.src('./src/*.js', {base: './src'})
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/* Linting: jshint */
gulp.task('jshint', function () {
    return gulp.src('./src/*.js', {base: './src'})
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

/* Build the full, unminfied file */
gulp.task('build:full', ['jshint'], function () {
    return gulp.src('./src/*.js', {base: './src'})
        .pipe(header(banner, {
            pkg: pkg,
            year: year
        }))
        .pipe(gulp.dest('./dist/'));
});

/* Build the minified file */
gulp.task('build:min', ['build:full'], function () {
    return gulp.src('./src/*.js', {base: './src'})
        .pipe(minify({
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(header(banner, {
            pkg: pkg,
            year: year
        }))
        .pipe(gulp.dest('./dist/'));
});

/* Build all files */
gulp.task('build', ['build:full', 'build:min']);

/* Watch source files and compile when changes are made */
gulp.task('watch', function () {
    gulp.watch('./src/*.js', ['build']);
});

/* Default task for development */
gulp.task('default', ['build', 'watch']);