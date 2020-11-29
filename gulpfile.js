// move HTML
// move js
// watch
// default task

// ************************* Imports *************************

const gulp = require("gulp");
const { src, dest, series, parallel, watch } = require('gulp');
const webpack = require('webpack-stream');
// BrowserSync for dev server and hot reloading
const bs = require('browser-sync').create();
// Used to wipe contents of dist when running build task
const del = require('del');

// ************************* Folder Paths *************************

const paths = {
    input: 'src',
    output: 'dist',
    devHTML: 'src/*.html',
    //devCSS: 'src/css/*.css',
    //devSCSS: 'src/scss/*.scss',
    devJS: 'src/js/*.js',
    //devImages: 'src/img/*.{png,gif,jpg,jpeg,svg}',
    //devFavicons: 'src/*.{ico,png,xml,svg,webmanifest}',
    //prodCSS: 'dist/css',
    prodJS: 'dist/js',
    //prodImages: 'dist/img',
    //normalize: 'src/css/normalize.css',
};

// ************************* Development Tasks *************************

// Task to run the BrowserSync server
function browserSync() {
    // Run serveSass when starting the dev server to make sure the SCSS & dev CSS are the same
    //css();

    bs.init({
        // Dev server will run at localhost:8080
        server: {
        baseDir: paths.input,
        },
    });

    watch(paths.devHTML).on('change', bs.reload);
    //watch(paths.devCSS, css).on('change', bs.reload);
    watch(paths.devJS).on('change', bs.reload);
}

// ************************* Production Tasks *************************

// Wipe contents of dist folder
function clean() {
    return del([`${paths.output}/**`, `!${paths.output}`]);
}

// Minimize HTML files
function buildHTML() {
    return src(paths.devHTML)
        .pipe(dest(paths.output));
}

// Compiles CSS
function css () {
    // Inital sass file to grab for compile
    return src([
    // we will use concat to package these files together
    'src/css/*.css'
    ])
        // Saves compiled CSS to chosen folder
        .pipe(gulp.dest("dist/css"))

        // Reload live server to reflect new code
        .pipe(bs.stream())
}

// Pipe JavaScript files to dist folder
function buildJS() {
    return src(paths.devJS)
        .pipe(gulp.dest("dist/js"))
}

function webPack() {
    return src(paths.devJS)
        .pipe(webpack({
        output: {
            filename: "app.js"
        }
    }))
}

// ************************* Exported Tasks *************************

// Run gulp serve in the terminal to start development mode
exports.serve = browserSync;
// Run gulp clean to empty dist folder
exports.clean = clean;
// Run gulp build to run production build
exports.build = series(
    clean,
    parallel(
    buildHTML,
    css,
    //fonts,
    //buildFavicon,
    //buildCSS,
    //buildNormalize,
    buildJS,
    webPack,
    //buildImages,
    ),
);
