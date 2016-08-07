'use strict' // eslint-disable-line strict

const gulp = require('gulp')
const del = require('del')
const util = require('gulp-util')
const eslint = require('gulp-eslint')
const babel = require('gulp-babel')

gulp.task('clean', function(done) {
  del([
    'lib/**/*',
  ])
  done()
})

/**
 * Lints all the JavaScript in the project.
 * Ignores transpiled code & node_modules.
 */
gulp.task('lint', function(done) {
  gulp.src(['**/*.js', '!node_modules/**', '!lib/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
  done()
})

/**
 * Transpiles with Babel based on defined presets.
 */
gulp.task('build', function(done) {
  gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('lib'))
  done()
})

/**
 * Watches for changes in the src directory.
 * "on change" transpiles incrementally.
 * "on unlink" removes the transpiled version of the deleted file.
 */
gulp.task('watch', function() {
  gulp.watch('src/**/*.js')
    .on('change', function(path) {
      gulp.src(path)
        .pipe(babel())
        .pipe(gulp.dest('lib'))
      util.log(`File "${path}" rebuilt`)
    })
    .on('unlink', function(path) {
      util.log(`File "${path}" removed`)
      let filePathFromSrc = path.relative(path.resolve('src'))
      let destFilePath = path.resolve('build', filePathFromSrc)

      del.sync(destFilePath)
    })
})

/**
 * Entrypoint for running watch.
 */
gulp.task('build.watch', gulp.series('build', 'watch', function(done) {
  done()
}))

gulp.task('default', gulp.series('clean', 'lint', 'build', function(done) {
  done()
}))
