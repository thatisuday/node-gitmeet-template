var
	gulp 			= 		require('gulp'),
	concat 			= 		require('gulp-concat'),	
	rename 			= 		require('gulp-rename'),	
	cssmin 			= 		require('gulp-cssmin'),	
	sass 			= 		require('gulp-sass'),	
	autoprefixer 	= 		require('gulp-autoprefixer'),	
	uglify 			= 		require('gulp-uglify'),	
	sourcemaps 		= 		require('gulp-sourcemaps'),
	htmlmin			=		require('gulp-htmlmin')
;


// Build JavaScript
gulp.task('buildJS', function(){
	gulp
	.src(['copyrights.cmt', 'assets/js/src/app/**/*.js'])
	.pipe(concat('app.js'))
	.pipe(sourcemaps.init())
	.pipe(gulp.dest('assets/js/dist'))
	.pipe(rename({suffix:'.min'}))
	.pipe(uglify({preserveComments:'license'}))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('assets/js/dist'));


	gulp
	.src(['copyrights.cmt', 'assets/js/src/ctrl/**/*.js'])
	.pipe(concat('ctrl.js'))
	.pipe(sourcemaps.init())
	.pipe(gulp.dest('assets/js/dist'))
	.pipe(rename({suffix:'.min'}))
	.pipe(uglify({preserveComments:'license'}))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('assets/js/dist'));
});


// Build SASS
gulp.task('buildSASS', function(){
	gulp
	.src(['copyrights.cmt', 'assets/sass/src/**/*.scss'])
	.pipe(sass().on('error', sass.logError))
	.pipe(concat('main.css'))
	.pipe(autoprefixer())
	.pipe(sourcemaps.init())
	.pipe(gulp.dest('assets/sass/dist'))
	.pipe(rename({suffix:'.min'}))
	.pipe(cssmin())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('assets/sass/dist'))
});


// Build HTML
gulp.task('buildHTML', function(){
	gulp
	.src('index.html')
	.pipe(htmlmin({collapseWhitespace: true, removeComments:true}))
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('./'));

	gulp
	.src('templates/__unmin/**/*.html')
	.pipe(htmlmin({collapseWhitespace: true, removeComments:true}))
	.pipe(gulp.dest('templates'));
});


// Build all
gulp.task('build', ['buildJS', 'buildSASS', 'buildHTML']);


// Watch all
gulp.task('watch', ['build'], function(){
	gulp.watch('assets/js/src/**/*.js', ['buildJS']);
	gulp.watch('assets/sass/src/**/*.scss', ['buildSASS']);
	gulp.watch(['index.html', 'templates/__unmin/**/*.html'], ['buildHTML']);
});