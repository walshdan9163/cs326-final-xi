const { series, parallel, watch } = require('gulp');
const gulp = require('gulp');
const gls = require('gulp-live-server');
const ts = require('gulp-typescript');
const del = require("del");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const tsify = require("tsify");

let server = null;


const buildBackend = () => {
    const tsProject = ts.createProject('tsconfig.json');
    const tsResult = tsProject.src()
        .pipe(tsProject());

    if (!server) {
        server = gls.new('./dist/index.js');
    }

    return tsResult.js.pipe(gulp.dest('dist'));
};

const buildFrontend = () => {
    return browserify({
        basedir: ".",
        debug: true,
        entries: ["src/views/FrontendEntry.ts"],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("dist-frontend"));
};

const startServer = (cb) => {
    server.start();
    cb();
};

const stopServer = (cb) => {
    return server.stop();
}

const watchDir = () => {
    watch(['./src/**/*.ts'], series(
        stopServer,
        build,
        startServer
    ));
};

const clean = () => {
    return del(["./dist/"]);
};

const build = parallel(buildBackend, buildFrontend);

exports.default = series(build, parallel(watchDir, startServer));
exports.build = build;
exports.clean = clean;