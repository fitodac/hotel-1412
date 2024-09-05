const gulp = require('gulp')
const concat = require('gulp-concat')
const merge = require('merge-stream')

const routes = ['index', 'el-hotel', 'habitaciones', 'contacto']

function createHtmlTask(route) {
	return function () {
		return gulp
			.src([
				'./src/_layout/head-start.html',
				`./src/pages/${route}/title.html`,
				'./src/_layout/head-end.html',
				'./src/_layout/navbar.html',
				`./src/pages/${route}/content/*.html`,
				'./src/_layout/footer.html',
			])
			.pipe(concat(`${route}.html`))
			.pipe(gulp.dest('dist'))
	}
}

// Define individual tasks for each route
const htmlTasks = routes.map((route) => {
	const taskName = `compile-html-${route}`
	gulp.task(taskName, createHtmlTask(route))
	return taskName
})

// Define a main task that runs all individual tasks in parallel
gulp.task('compile-html', gulp.parallel(...htmlTasks))

// Copy resources
// gulp.task('copy-resources', function () {
// 	const cssStream = gulp.src('./src/css/**/*').pipe(gulp.dest('dist/css'))
// 	const fontsStream = gulp.src('./src/fonts/**/*').pipe(gulp.dest('dist/fonts'))
// 	const jsStream = gulp.src('./src/js/**/*').pipe(gulp.dest('dist/js'))
// 	const imgStream = gulp.src('./src/img/**/*').pipe(gulp.dest('dist/img'))

// 	return merge(cssStream, fontsStream, jsStream, imgStream)
// })

gulp.task('default', gulp.parallel('compile-html'))
