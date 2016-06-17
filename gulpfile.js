/*
** Gulp Configuration
** SWAPI Example Application
*/

// Require Dependencies
var gulp = require('gulp'),
	cssmin = require('gulp-cssmin'),
	uglify = require('gulp-uglify'),
	nop = require('gulp-nop'),
	del = require('del'),
	rename = require('gulp-rename'),
	runSequence = require('run-sequence'),
	webpack = require('webpack-stream'),
	pathSrc = {
		assets: './src/_v1/assets',
		scripts: './src/_v1/http',
		vendor: './src/_v1/vendor',
		bundle: './src/_v1/bundle',
		view: './src/_v1/view',
		dist: './dist'
	},
	tasks = [];

// Global Vars
global.env_process = 'development';

// Set task base on env_process
if(env_process == 'development') {
	tasks = ['view', 'css', 'img', 'font', 'js', 'js_vendor', 'bundleScripts', 'watch'];

	var nodemon = require('gulp-nodemon'),
		livereload = require('gulp-livereload');
}
else {
	tasks = ['view', 'css', 'img', 'font', 'js', 'js_vendor', 'bundleScripts'];
}

gulp.task('css', function() {
	return gulp
		.src(pathSrc.assets+'/css/*')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(pathSrc.dist+'/assets/css/'))		
});

gulp.task('img', function() {
	return gulp
		.src(pathSrc.assets+'/img/**/*')
		.pipe(gulp.dest(pathSrc.dist+'/assets/img/'));
});

gulp.task('font', function() {
	return gulp
		.src(pathSrc.assets+'/fonts/**/*')
		.pipe(gulp.dest(pathSrc.dist+'/assets/fonts/'));
});

gulp.task('js', function() {
	return gulp
		.src(pathSrc.scripts+'/**/*')
		.pipe(env_process == 'development'? nop() : uglify({mangle: false}))
		.pipe(gulp.dest(pathSrc.dist+'/http/'));
});

gulp.task('js_vendor', function() {
	return gulp
		.src(pathSrc.vendor+'/*')
		.pipe(env_process == 'development'? nop() : uglify({mangle: false}))
		.pipe(gulp.dest(pathSrc.dist+'/vendor/'))		
});

gulp.task('bundleScripts', function() {
	return gulp
		.src(pathSrc.bundle+'/*')
		.pipe(webpack({
			output: {
				filename: 'bundle.js'
			}
		}))
		.pipe(env_process == 'development'? nop() : uglify({mangle: false}))
		.pipe(env_process == 'development'? nop() : rename({suffix: '.min'}))
		.pipe(gulp.dest(pathSrc.dist+'/bundle/'));
});

gulp.task('watch', function() {
	gulp.watch(pathSrc.assets+'/css/*', ['css'])
	gulp.watch(pathSrc.assets+'/img/*', ['img'])
	gulp.watch(pathSrc.scripts+'/**/*', ['js'])
	gulp.watch(pathSrc.vendor+'/*', ['js_vendor'])
	gulp.watch(pathSrc.bundle+'/*', ['bundleScripts'])
});

gulp.task('view', function() {
	return gulp
		.src(pathSrc.view+'/**/*')
		.pipe(gulp.dest(pathSrc.dist+'/bundle/'));
});

gulp.task('devServe', function() {
	livereload.listen(35729);

	nodemon({
		script: 'server.js',
		ext:'jade'
	});
});

gulp.task('clean_build', function() {
	return del(pathSrc.dist);
});

// Default Task
if(env_process == 'development') {
	gulp.task('default', function() {
		runSequence('clean_build', tasks, 'devServe', function() {
			console.log('++ files has been successfully streamed')
		});
	});
}
else {
	gulp.task('default', function() {
		runSequence('clean_build', tasks, function() {
			console.log('++ files has been successfully streamed')
		});
	});	
}