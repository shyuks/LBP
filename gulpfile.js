var gulp = require('gulp')
var gutil = require('gulp-util')
var gulpif = require('gulp-if')
var autoprefixer = require('gulp-autoprefixer')
var cssmin = require('gulp-cssmin')
var less = require('gulp-less')
var concat = require('gulp-concat')
var plumber = require('gulp-plumber')
var buffer = require('vinyl-buffer')
var source = require('vinyl-source-stream')
var babelify = require('babelify')
var watchify = require('watchify')
var uglify = require('gulp-uglify')
var browserify = require('browserify')
var sourcemaps = require('gulp-sourcemaps')

// environment
var production = process.env.NODE_ENV === 'production'

// gulp dependencies
var dependencies = [
    'alt',
    'react',
    'react-dom',
    'react-router',
    'underscore'
]

// compile all JS libs into single file
gulp.task('vendor', function() {
    return gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap/dist/js/bootstrap.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulpif(production, uglify({ mangle: false })))
    .pipe(gulp.dest('public/js'))
})

// compile all third-party libs
gulp.task('browserify-vendor', function() {
    return browserify()
    .require(dependencies)
    .bundle()
    .pipe(source('vendor.bundle.js'))
    .pipe(buffer())
    .pipe(gulpif(production, uglify({ mangle: false})))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/js'))
})

// compile app files, EXCLUDING third-party files
gulp.task('browserify', ['browserify-vendor'], function() {
    return browserify({ entries: 'app/main.js', debug: true })
    .external(dependencies)
    .transform(babelify, { presets: ['es2015', 'react'] })
    .bundle()
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulpif(production, uglify({ mangle: false })))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/js'))
})

// compiles, Watch for changes, Compiles
gulp.task('browserify-watch', ['browserify-vendor'], function() {
    var bundler = watchify(browserify({ entries: 'app/main.js', debug: true }, watchify.args))
    bundler.external(dependencies)
    bundler.transform(babelify, { presets: ['es2015', 'react'] })
    bundler.on('update', rebundle)
    return rebundle()

    function rebundle() {
        var start = Date.now()
        return bundler.bundle()
        .on('error', function(err) {
            gutil.log(err.toString())
        })
        .on('end', function() {
            gutil.log('Finished Rebundling On ', (Date.now() - start))
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/js'))
    }
})

// compile less to css
gulp.task('styles', function() {
    return gulp.src('app/stylesheets/custom.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulpif(production, cssmin()))
    .pipe(gulp.dest('public/css'))
})

// loop css changes
gulp.task('watch', function() {
    gulp.watch('app/stylesheets/**/*.less', ['styles'])
})

gulp.task('default', ['styles', 'vendor', 'browserify-watch', 'watch'])
gulp.task('build', ['styles', 'vendor', 'browserify'])
