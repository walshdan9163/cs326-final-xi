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
            id          SERIAL PRIMARY KEY,
            name        varchar(255) NOT NULL,
            description varchar(4096)
        )
    `).then(() => {
        return db.none(`
            CREATE TABLE IF NOT EXISTS software(
                id          SERIAL PRIMARY KEY,
                name        varchar(255) NOT NULL,
                description varchar(4096)
            )
        `);
    }).then(cb);
}

const addDummy = (cb) => {
    let db = pgp(process.env.DB_URL);

    db.none(`
        INSERT INTO hardware
        VALUES(DEFAULT, 'Apple II', 'The Apple II');
    `).then(() => {
        return db.none(`
            INSERT INTO hardware
            VALUES(DEFAULT, 'IBM PC', 'The IBM PC')
        `);
    }).then(cb);
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

const build = parallel(buildBackend, buildFrontend, buildTables);

exports.default = series(build, parallel(watchDir, startServer));
exports.buildTables = buildTables;
exports.addDummyData = addDummy;
exports.build = build;
exports.clean = clean;