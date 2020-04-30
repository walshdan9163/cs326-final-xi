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
    }).then(() => {
        return db.none(`
            CREATE TABLE IF NOT EXISTS users(
                id          SERIAL,
                email       varchar(255) PRIMARY KEY,
                password    varchar(255) NOT NULL
            )
        `);
    }).then(() => {
        return db.none(`
            CREATE TABLE IF NOT EXISTS media(
                id          SERIAL PRIMARY KEY,
                name        varchar(255) NOT NULL,
                url         varchar(4096)
            )
        `);
    }).then(() => {
        return db.none(`
            CREATE TABLE IF NOT EXISTS mediaRelation(
                mediaId         int references media(id),
                techId          int NOT NULL,
                techType        varchar(255) NOT NULL,
                PRIMARY KEY (mediaId, techId, techtype)
            )
        `);
    }).then(() => {
        return db.none(`
            CREATE TABLE IF NOT EXISTS tag(
                id              SERIAL,
                name            varchar(255) NOT NULL
            )
        `);
    }).then(() => {
        return db.none(`
            CREATE TABLE IF NOT EXISTS trade(
                id              SERIAL,
                ownerId         int NOT NULL,
                recipId         int NOT NULL,
                techId          int NOT NULL,
                accept          boolean
            )
        `);
    }).then(() => {
        return db.none(`
            CREATE TABLE IF NOT EXISTS userOwnership(
                userId          int NOT NULL,
                techId          int NOT NULL,
                techType        varchar(255),
                PRIMARY KEY (userId, techId, techType)
            )
        `);
    }).then(() => {
        return db.none(`
            CREATE TABLE IF NOT EXISTS tagRelation(
                tagId           int NOT NULL,
                techId          int NOT NULL,
                type            varchar(255)
            )
        `);
    }).then(() => {
        return db.none(`
            CREATE TABLE IF NOT EXISTS authentication(
                userId          int NOT NULL,
                token           varchar(4096),
                exp             timestamp
            )
        `);
    }).then(cb);
}

const addDummy = (cb) => {
    let db = pgp(process.env.DB_URL);

    db.none(`
        INSERT INTO hardware
        VALUES(DEFAULT, 'Hardware item 1', 'The first hardware item');
    `).then(() => {
        return db.none(`
            INSERT INTO hardware
            VALUES(DEFAULT, 'Hardware item 2', 'The second hardware item');
        `);
    }).then(() => {
        return db.none(`
            INSERT INTO hardware
            VALUES(DEFAULT, 'Hardware item 3', 'The third hardware item');
        `);
    }).then(() => {
        return db.none(`
            INSERT INTO software
            VALUES(DEFAULT, 'Software item 1', 'The first software item');
        `);
    }).then(() => {
        return db.none(`
            INSERT INTO software
            VALUES(DEFAULT, 'Software Item 2', 'The second software item');
        `);
    }).then(() => {
        return db.none(`
            INSERT INTO media
            VALUES(DEFAULT, 'Media Item 1', 'https://i.redd.it/ole6mf1a45911.png');
        `);
    }).then(() => {
        return db.none(`
            INSERT INTO media
            VALUES(DEFAULT, 'Media Item 2', 'https://etc.usf.edu/presentations/extras/letters/fridge_magnets/yellow/03/2-400.png');
        `);
    }).then(() => {
        return db.none(`
            INSERT INTO users
            VALUES(DEFAULT, 'exampleOne@email.com', 'password');
        `);
    }).then(() => {
        return db.none(`
            INSERT INTO users
            VALUES(DEFAULT, 'exampleTwo@email.com', 'password');
        `);
    }).then(() => {
        return db.none(`
            INSERT INTO userOwnership
            VALUES(1, 1, 'software');
        `);
    }).then(() => {
        return db.none(`
            INSERT INTO userOwnership
            VALUES(1, 2, 'software');
        `);
    }).then(() => {
        return db.none(`
            INSERT INTO userOwnership
            VALUES(1, 2, 'hardware');
        `);
    }).then(() => {
        return db.none(`
            INSERT INTO userOwnership
            VALUES(2, 1, 'hardware');
        `);
    }).then(() => {
        return db.none(`
            INSERT INTO userOwnership
            VALUES(2, 2, 'software');
        `);
    }).then(() => {
        return db.none(`
            INSERT INTO mediaRelation
            VALUES(2, 2, 'software');
        `);
    }).then(() => {
        return db.none(`
            INSERT INTO mediaRelation
            VALUES(2, 2, 'hardware');
        `);
    }).then(() => {
        return db.none(`
            INSERT INTO mediaRelation
            VALUES(1, 1, 'software');
        `);
    }).then(() => {
        return db.none(`
            INSERT INTO mediaRelation
            VALUES(1, 1, 'hardware');
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