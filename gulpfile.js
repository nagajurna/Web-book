const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

const paths = {
	scripts: 'src/javascripts/*.js'
};
 
gulp.task('scripts', () => {
    return gulp.src(paths.scripts)
		.pipe(sourcemaps.init())
			.pipe(babel({
				presets: ['env']
			}))
		.pipe(sourcemaps.write())
		.pipe(uglify())
		.pipe(concat('wb.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
});


gulp.task('default', ['watch', 'scripts']);