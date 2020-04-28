require('dotenv').config();

const { series, parallel, watch } = require('gulp');
const gulp = require('gulp');
const gls = require('gulp-live-server');
const ts = require('gulp-typescript');
const del = require("del");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const tsify = require("tsify");
const pgp = require('pg-promise')(/*options*/);

let server = null;

const buildTables = (cb) => {
    let db = pgp(process.env.DB_URL);
    db.none(`
        CREATE TABLE IF NOT EXISTS hardware(
            id int,
            name varchar(255),
            description varchar(4096)
        )
    `).then(() => {
        console.log('Created Hardware Table');
        return db.none(`
            CREATE TABLE IF NOT EXISTS software(
                 id int,
                 name varchar(255),
                 description varchar(4096)
            )
        `);
    }).then(() => {
        console.log('Created Software Table');
        cb();
    });
}

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
exports.buildTables = buildTables;
exports.build = build;
exports.clean = clean;