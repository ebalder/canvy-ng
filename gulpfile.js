var watchify = require('watchify')
var browserify = require('browserify')
var gulp = require('gulp')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var gutil = require('gulp-util')
var sourcemaps = require('gulp-sourcemaps')
var assign = require('lodash.assign')
var stringify = require('stringify')

var opts = assign({
	entries: ['./js/canvas.js'],
	debug: true
}, watchify.args)

var b = watchify(watchify(
	browserify()
	.transform(stringify(['.html']))
	.add('./js/canvas.js', opts)
))

gulp.task('default', ['js'])

gulp.task('js', function(){
	return b.bundle()
		.on('error', gutil.log.bind(gutil, 'Browserify Error'))
		.pipe(source('./build.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./build'));
})

var watcher = gulp.watch('*.js', ['js'])
