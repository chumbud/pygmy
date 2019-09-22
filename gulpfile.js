const gulp = require('gulp'),
sass = require('gulp-sass'),
livereload = require('gulp-refresh');

sass.compiler = require('node-sass');

function errorLog(error) {
	console.error.bind(error);
	this.emit('end');
}

gulp.task('styles', (done) => {
	gulp.src('source/stylesheets/sass/**/*.sass')
	.pipe(sass())
	.on('error', sass.logError)
	.pipe(gulp.dest('source/stylesheets/css/'))
	.pipe(livereload());
	done();
});

gulp.task('watch', (done) => {
	var server = livereload();
	gulp.watch('source/stylesheets/sass/**/*.sass', gulp.series('styles'));
	  done();
});

gulp.task('default', gulp.series('styles', 'watch'));