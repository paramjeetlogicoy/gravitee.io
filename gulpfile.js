var gulp = require('gulp'),
    connect = require('gulp-connect'),
    less = require('gulp-less'),
    child = require('child_process'),
    fs = require('fs');

gulp.task('webserver', function() {
    connect.server({
        livereload: true
    });

});

gulp.task('server', function() {
    var server = child.spawn('node', ['./mailer/server.js']);
    var log = fs.createWriteStream('server.log', {flags: 'a'});
    server.stdout.pipe(log);
    server.stderr.pipe(log);
});

gulp.task('less', function() {
    gulp.src('styles/main.less')
        .pipe(less())
        .pipe(gulp.dest('styles'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('styles/*.less', ['less']);
});

gulp.task('default', ['less', 'webserver', 'server', 'watch']);