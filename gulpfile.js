var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({pattern: '*'});

var paths = {
    templates: '**/*.tpl.html',
};

function minifyHtml() {
    return $.htmlmin({
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
    });
}

function minifyScript(dest) {
    var optionsEmbed = {
        basePath: 'src/' //Pegando os templates pela pasta src
    };
    return gulp.src('**/*.js', {cwd: 'src'})
        .pipe($.plumber())
        .pipe($.angularEmbedTemplates(optionsEmbed))
        .pipe($.angularFilesort())
        .pipe($.concat('gear.min.js'))
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe(gulp.dest(dest));
}

function minifyStyle(src, dest, concat) {
    return gulp.src(src, {cwd: 'src'})
        .pipe($.plumber())
        .pipe($.autoprefixer({
            browsers: ['> 1%', 'IE 7'],
            cascade: false
        }))
        .pipe($.if(concat, $.concatCss('gear.min.css')))
        .pipe($.cleanCss())
        .pipe(gulp.dest(dest));
}

gulp.task('template', () => {
    var templates = gulp.src(paths.templates, {cwd: 'src'}).pipe($.plumber());

    return templates.pipe(minifyHtml())
        .pipe($.angularTemplatecache('app.templates.js', {
            module: 'gear'
        }))
        .pipe(gulp.dest('src/'));
});

gulp.task('minify:css', () => {
    return minifyStyle('**/*.css', 'src/', true);
});

gulp.task('minify:js', () => {
    return minifyScript('src/');
});

gulp.task('clean', () => {
    return gulp.src(['dist', 'src/*.min.*', 'src/app.templates.js'], {read: false}).pipe($.clean());
});

gulp.task('dist', () => {
    gulp
        .src('src/*.min.*')
        .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['clean'], () => {
    $.runSequence('template', ['minify:css', 'minify:js'], 'dist');
});